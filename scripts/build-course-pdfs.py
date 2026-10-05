#!/usr/bin/env python3
"""Build 28 naturally paginated bilingual course notes from shared JSON sources.

Usage: python scripts/build-course-pdfs.py [--weeks 1,2] [--locales tr,en]
Requires reportlab and pypdf. Outputs are git-backed notes/*.pdf. No external
services, generated translations, fixed page count, or truncated paragraphs.
"""
from __future__ import annotations

import argparse
import html
import json
import re
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate, Flowable, Frame, HRFlowable, PageBreak, PageTemplate,
    Paragraph, Spacer, Table, TableStyle,
)
from reportlab.platypus.tableofcontents import TableOfContents
from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
PAGE_W, PAGE_H = A4
MARGIN = 54
WIDTH = PAGE_W - MARGIN * 2
INK = colors.HexColor('#22363f')
BURGUNDY = colors.HexColor('#801c35')
GOLD = colors.HexColor('#c9a74f')
TEAL = colors.HexColor('#1b696b')
MUTED = colors.HexColor('#55696e')
PALE = colors.HexColor('#f6f3ed')
RULE = colors.HexColor('#d9dfdc')
PALE_TEAL = colors.HexColor('#edf5f3')
PALE_ROSE = colors.HexColor('#f8eef0')


LABELS = {
    'en': {
        'course': 'PUBLIC DIPLOMACY AND SOFT POWER', 'week': 'WEEK',
        'edition': 'Academic lecture notes', 'language': 'English edition',
        'contents': 'Contents and study guide', 'beginner': '1. Conceptual foundations and guided study',
        'deeper': '2. Detailed explanation and analytical application',
        'academic': '3. Academic analysis', 'sources': '4. Sources and seminar research',
        'idea': 'Central idea', 'analogy': 'Illustrative analogy',
        'objectives': 'Learning objectives', 'concepts': 'Concepts and distinctions',
        'steps': 'Analytical method', 'example': 'Worked example',
        'scenario': 'Scenario', 'conclusion': 'Analytical conclusion',
        'misconception': 'Common misconception', 'claim': 'Claim',
        'correction': 'Clarification', 'checkpoint': 'Review question', 'answer': 'Reasoned answer',
        'practice': 'Analytical exercise', 'hint': 'Guidance', 'takeaways': 'Key points',
        'why': 'Analytical significance', 'model': 'Model answer', 'faqs': 'Further questions and clarifications',
        'sourceNote': 'Scope and limitations of the sources', 'seminar': 'Seminar and source criticism',
        'question': 'Research question', 'historiography': 'Historiographical problem',
        'primaryTask': 'Evidence analysis', 'seminarTask': 'Seminar exercise',
        'discussion': 'Discussion questions', 'references': 'References and assigned reading',
        'assignment': 'Assigned reading', 'summary': 'Analytical relevance', 'page': 'Page',
        'figure': 'Figure', 'table': 'Table', 'term': 'Concept', 'meaning': 'Definition and example',
        'coverNote': 'Conceptual foundations, detailed explanations, visual comparisons, worked examples and source criticism.',
        'routeNote': 'Study the conceptual foundations and detailed explanations before assessing the academic arguments in relation to the assigned sources. Diagrams represent analytical relationships rather than measured effects.',
    },
    'tr': {
        'course': 'KAMU DİPLOMASİSİ VE YUMUŞAK GÜÇ', 'week': 'HAFTA',
        'edition': 'Akademik ders notları', 'language': 'Türkçe baskı',
        'contents': 'İçindekiler ve çalışma rehberi', 'beginner': '1. Kavramsal temeller ve rehberli çalışma',
        'deeper': '2. Ayrıntılı açıklama ve analitik uygulama',
        'academic': '3. Akademik analiz', 'sources': '4. Kaynaklar ve seminer araştırması',
        'idea': 'Ana düşünce', 'analogy': 'Açıklayıcı benzetme',
        'objectives': 'Öğrenme hedefleri', 'concepts': 'Kavramlar ve ayrımlar',
        'steps': 'Analiz yöntemi', 'example': 'Çözümlü örnek',
        'scenario': 'Vaka', 'conclusion': 'Analitik sonuç',
        'misconception': 'Sık karşılaşılan bir yanılgı', 'claim': 'İddia',
        'correction': 'Açıklama', 'checkpoint': 'Değerlendirme sorusu', 'answer': 'Gerekçeli yanıt',
        'practice': 'Analitik uygulama', 'hint': 'Yönlendirme', 'takeaways': 'Temel noktalar',
        'why': 'Analitik önemi', 'model': 'Örnek yanıt', 'faqs': 'İleri değerlendirme soruları ve açıklamalar',
        'sourceNote': 'Kaynakların kapsamı ve sınırlılıkları', 'seminar': 'Seminer ve kaynak eleştirisi',
        'question': 'Araştırma sorusu', 'historiography': 'Tarih yazımı sorunu',
        'primaryTask': 'Kanıtların analizi', 'seminarTask': 'Seminer çalışması',
        'discussion': 'Tartışma soruları', 'references': 'Kaynakça ve okuma ödevleri',
        'assignment': 'Okuma ödevi', 'summary': 'Analitik önemi', 'page': 'Sayfa',
        'figure': 'Şekil', 'table': 'Tablo', 'term': 'Kavram', 'meaning': 'Tanım ve örnek',
        'coverNote': 'Kavramsal temeller, ayrıntılı açıklamalar, görsel karşılaştırmalar, çözümlü örnekler ve kaynak eleştirisi.',
        'routeNote': 'Kavramsal temelleri ve ayrıntılı açıklamaları inceleyerek akademik argümanları okuma için verilen kaynaklar ışığında değerlendirin. Şemalar ölçülmüş etkileri değil, analitik ilişkileri gösterir.',
    },
}


def register_fonts():
    folder = Path('/usr/share/fonts/truetype/dejavu')
    for family, stem in [('Body', 'DejaVuSerif'), ('Sans', 'DejaVuSans')]:
        suffixes = [('Regular', ''), ('Bold', '-Bold'), ('Italic', '-Italic' if family == 'Body' else '-Oblique'), ('BoldItalic', '-BoldItalic' if family == 'Body' else '-BoldOblique')]
        for style, suffix in suffixes:
            font_file = folder / f'{stem}{suffix}.ttf'
            if not font_file.exists():
                font_file = folder / f'{stem}{"-Bold" if "Bold" in style else ""}.ttf'
            pdfmetrics.registerFont(TTFont(f'{family}-{style}', str(font_file)))
        pdfmetrics.registerFontFamily(family, normal=f'{family}-Regular', bold=f'{family}-Bold', italic=f'{family}-Italic', boldItalic=f'{family}-BoldItalic')
    # Family names must also be valid base font names for Paragraph's <b>/<i>.
    pdfmetrics.registerFont(TTFont('Body', str(folder / 'DejaVuSerif.ttf')))
    pdfmetrics.registerFont(TTFont('Sans', str(folder / 'DejaVuSans.ttf')))


def clean(value):
    """Keep content verbatim except typography incompatible with some PDF readers."""
    return str(value or '').replace('\u2011', '-').replace('\u2013', '-').replace('\u2014', ' - ').replace('\u00ad', '')


def escaped(value):
    return html.escape(clean(value)).replace('\n', '<br/>')


def styles():
    body = dict(fontName='Body', fontSize=10.5, leading=15.4, textColor=INK, alignment=TA_LEFT, spaceAfter=9, allowWidows=0, allowOrphans=0, splitLongWords=1)
    return {
        'body': ParagraphStyle('Body', **body),
        'lead': ParagraphStyle('Lead', **{**body, 'fontSize': 11.5, 'leading': 17.4, 'textColor': MUTED, 'spaceAfter': 14}),
        'small': ParagraphStyle('Small', fontName='Sans', fontSize=8.6, leading=12.3, textColor=MUTED, spaceAfter=6, allowWidows=0, allowOrphans=0),
        'caption': ParagraphStyle('Caption', fontName='Sans', fontSize=8.6, leading=12.3, textColor=MUTED, spaceAfter=12, allowWidows=0, allowOrphans=0),
        'h1': ParagraphStyle('H1', fontName='Sans-Bold', fontSize=19, leading=24, textColor=BURGUNDY, spaceBefore=21, spaceAfter=12, keepWithNext=1),
        'h2': ParagraphStyle('H2', fontName='Sans-Bold', fontSize=13.2, leading=18, textColor=TEAL, spaceBefore=17, spaceAfter=8, keepWithNext=1),
        'h3': ParagraphStyle('H3', fontName='Sans-Bold', fontSize=10.4, leading=14.4, textColor=BURGUNDY, spaceBefore=10, spaceAfter=6, keepWithNext=1),
        'coverKicker': ParagraphStyle('CoverKicker', fontName='Sans-Bold', fontSize=11, leading=16, textColor=BURGUNDY, spaceAfter=15),
        'coverTitle': ParagraphStyle('CoverTitle', fontName='Body-Bold', fontSize=28, leading=35, textColor=INK, spaceAfter=21),
        'coverMeta': ParagraphStyle('CoverMeta', fontName='Sans', fontSize=11, leading=17, textColor=MUTED, spaceAfter=15),
        'table': ParagraphStyle('TableCell', fontName='Sans', fontSize=8.8, leading=12.5, textColor=INK, spaceAfter=0, splitLongWords=1, allowWidows=0, allowOrphans=0),
        'tableHead': ParagraphStyle('TableHead', fontName='Sans-Bold', fontSize=8.8, leading=12.5, textColor=colors.white, spaceAfter=0),
        'nodeTitle': ParagraphStyle('NodeTitle', fontName='Sans-Bold', fontSize=9.2, leading=12, textColor=TEAL, spaceAfter=5),
        'nodeText': ParagraphStyle('NodeText', fontName='Sans', fontSize=8.5, leading=11.5, textColor=INK, spaceAfter=0),
        'toc0': ParagraphStyle('TocMain', fontName='Sans-Bold', fontSize=10, leading=15, textColor=BURGUNDY, spaceBefore=8, leftIndent=0, firstLineIndent=0),
        'toc1': ParagraphStyle('TocSub', fontName='Sans', fontSize=8.7, leading=12, textColor=INK, spaceBefore=0, leftIndent=14, firstLineIndent=0),
    }


class FlowDiagram(Flowable):
    """Four readable nodes with real vector connectors, fitted to text height."""
    def __init__(self, nodes, sty):
        super().__init__()
        self.nodes = nodes
        self.sty = sty
        self.spaceAfter = 10

    def wrap(self, availWidth, availHeight):
        self.width = availWidth
        self.gap = 15
        self.nodeWidth = (availWidth - self.gap * (len(self.nodes) - 1)) / len(self.nodes)
        self.parts = []
        max_h = 0
        for i, node in enumerate(self.nodes):
            title = Paragraph(f'{i + 1:02d}<br/>{escaped(node["title"])}', self.sty['nodeTitle'])
            text = Paragraph(escaped(node['text']), self.sty['nodeText'])
            _, th = title.wrap(self.nodeWidth - 18, 1000)
            _, bh = text.wrap(self.nodeWidth - 18, 1000)
            self.parts.append((title, text, th, bh))
            max_h = max(max_h, th + bh + 30)
        self.height = max_h
        return self.width, self.height

    def draw(self):
        c = self.canv
        for i, (title, text, th, bh) in enumerate(self.parts):
            x = i * (self.nodeWidth + self.gap)
            c.setFillColor(PALE_TEAL if i % 2 == 0 else PALE)
            c.setStrokeColor(RULE)
            c.roundRect(x, 0, self.nodeWidth, self.height, 7, fill=1, stroke=1)
            c.setStrokeColor(GOLD)
            c.setLineWidth(2)
            c.line(x + 9, self.height - 8, x + self.nodeWidth - 9, self.height - 8)
            title.drawOn(c, x + 9, self.height - 16 - th)
            text.drawOn(c, x + 9, self.height - 21 - th - bh)
            if i < len(self.parts) - 1:
                a, b, y = x + self.nodeWidth + 2, x + self.nodeWidth + self.gap - 2, self.height / 2
                c.setStrokeColor(TEAL)
                c.setLineWidth(1)
                c.line(a, y, b, y)
                c.line(b - 4, y + 3, b, y)
                c.line(b - 4, y - 3, b, y)


class CourseDoc(BaseDocTemplate):
    def __init__(self, filename, locale, week, title, sty):
        super().__init__(str(filename), pagesize=A4, leftMargin=MARGIN, rightMargin=MARGIN,
                         topMargin=57, bottomMargin=50, title=clean(title),
                         author='Public Diplomacy and Soft Power - Course materials',
                         subject=LABELS[locale]['edition'], pageCompression=1)
        self.locale, self.week, self.label, self.sty = locale, week, LABELS[locale], sty
        self.running = self.label['edition']
        self.addPageTemplates([PageTemplate('Course', frames=[Frame(MARGIN, 50, WIDTH, PAGE_H - 107, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)], onPage=self.decorate)])

    def decorate(self, canvas, doc):
        canvas.saveState()
        if doc.page == 1:
            canvas.setFillColor(BURGUNDY)
            canvas.rect(0, PAGE_H - 16, PAGE_W, 16, fill=1, stroke=0)
            canvas.setFillColor(GOLD)
            canvas.rect(MARGIN, PAGE_H - 35, 70, 3, fill=1, stroke=0)
        else:
            canvas.setFont('Sans', 7.5)
            canvas.setFillColor(MUTED)
            canvas.drawString(MARGIN, PAGE_H - 31, self.label['course'])
            canvas.drawRightString(PAGE_W - MARGIN, PAGE_H - 31, f'{self.label["week"]} {self.week:02d}')
            canvas.setStrokeColor(RULE)
            canvas.setLineWidth(.5)
            canvas.line(MARGIN, PAGE_H - 40, PAGE_W - MARGIN, PAGE_H - 40)
        canvas.setStrokeColor(RULE)
        canvas.line(MARGIN, 37, PAGE_W - MARGIN, 37)
        canvas.setFillColor(MUTED)
        canvas.setFont('Sans', 7.5)
        canvas.drawString(MARGIN, 24, self.label['language'])
        canvas.drawRightString(PAGE_W - MARGIN, 24, f'{self.label["page"]} {doc.page}')
        canvas.restoreState()

    def afterFlowable(self, flowable):
        if hasattr(flowable, '_tocLevel'):
            level, key = flowable._tocLevel, flowable._bookmarkKey
            title = flowable.getPlainText()
            self.canv.bookmarkPage(key)
            self.canv.addOutlineEntry(title, key, level, False)
            self.notify('TOCEntry', (level, title, self.page, key))


class Builder:
    def __init__(self, locale, week, sty):
        self.l = LABELS[locale]
        self.locale, self.week, self.s = locale, week, sty
        self.story = []
        self.serial = self.figure = self.table = 0

    def p(self, text, style='body'):
        if isinstance(text, list):
            for t in text:
                self.p(t, style)
        elif text:
            self.story.append(Paragraph(escaped(text), self.s[style]))

    def heading(self, title, level=2, toc=True):
        h = Paragraph(escaped(title), self.s[f'h{level}'])
        if toc and level <= 2:
            self.serial += 1
            h._tocLevel = level - 1
            h._bookmarkKey = f'section-{self.serial}'
        self.story.append(h)

    def labeled(self, label, text, style='body'):
        if text:
            self.story.append(Paragraph(f'<b>{escaped(label)}</b> {escaped(text)}', self.s[style]))

    def bullets(self, items, numbered=False):
        for i, item in enumerate(items):
            value = item if isinstance(item, str) else item.get('text', str(item))
            mark = str(i + 1) + '.' if numbered else '•'
            para = Paragraph(f'<font color="#1b696b"><b>{mark}</b></font>  {escaped(value)}', self.s['body'])
            self.story.append(para)

    def box(self, label, text, colour=PALE_TEAL):
        paragraphs = [Paragraph(escaped(label), self.s['h3'])]
        for t in text if isinstance(text, list) else [text]:
            paragraphs.append(Paragraph(escaped(t), self.s['body']))
        # Keep enough of a split callout together for its heading and body text;
        # smaller fragments otherwise render as empty shaded strips at page ends.
        table = Table([[paragraphs]], colWidths=[WIDTH], splitByRow=1, splitInRow=64)
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), colour),
            ('LINEBEFORE', (0, 0), (0, -1), 3, TEAL if colour == PALE_TEAL else BURGUNDY),
            ('LEFTPADDING', (0, 0), (-1, -1), 13), ('RIGHTPADDING', (0, 0), (-1, -1), 13),
            ('TOPPADDING', (0, 0), (-1, -1), 8), ('BOTTOMPADDING', (0, 0), (-1, -1), 7),
        ]))
        table.spaceBefore, table.spaceAfter = 6, 12
        self.story.append(table)

    def diagram(self, data):
        self.figure += 1
        self.heading(f'{self.l["figure"]} {self.figure}. {data["title"]}', 3, False)
        self.story.append(FlowDiagram(data['nodes'], self.s))
        self.p(data.get('caption', ''), 'caption')

    def grid(self, data, numbered=True):
        if numbered:
            self.table += 1
            self.heading(f'{self.l["table"]} {self.table}. {data["title"]}', 3, False)
        columns, rows = data['columns'], data['rows']
        assert all(len(row) == len(columns) for row in rows), data.get('title')
        def cell(value, header=False):
            # Individual paragraphs can split within rows across natural page breaks.
            if isinstance(value, list):
                return [Paragraph(escaped(t), self.s['tableHead' if header else 'table']) for t in value]
            return Paragraph(escaped(value), self.s['tableHead' if header else 'table'])
        table = Table([[cell(c, True) for c in columns]] + [[cell(c) for c in row] for row in rows],
                      colWidths=[WIDTH / len(columns)] * len(columns), repeatRows=1, splitByRow=1, splitInRow=1, hAlign='LEFT')
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), TEAL),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [PALE_TEAL, colors.white]),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('LEFTPADDING', (0, 0), (-1, -1), 9), ('RIGHTPADDING', (0, 0), (-1, -1), 9),
            ('TOPPADDING', (0, 0), (-1, -1), 9), ('BOTTOMPADDING', (0, 0), (-1, -1), 9),
            ('LINEBELOW', (0, 0), (-1, 0), 1.5, GOLD),
            ('LINEBELOW', (0, 1), (-1, -1), .4, RULE),
        ]))
        table.spaceAfter = 10
        self.story.append(table)
        self.p(data.get('caption', ''), 'caption')

    def worked(self, item):
        self.heading(item['title'], 3, False)
        self.labeled(self.l['scenario'] + ':', item.get('scenario', ''))
        self.bullets(item.get('steps', []), True)
        self.box(self.l['conclusion'], item.get('conclusion', item.get('lesson', '')))

    def beginner(self, data):
        self.heading(self.l['beginner'], 1)
        self.heading(self.l['idea'])
        self.p(data['nutshell'], 'lead')
        self.box(self.l['analogy'], data['analogy'])
        self.heading(self.l['objectives'], 3, False)
        self.bullets(data['objectives'])
        self.heading(self.l['concepts'])
        for c in data['concepts']:
            self.heading(c['term'], 3, False)
            self.p(c['meaning'])
            self.labeled(self.l['example'] + ':', c['example'])
        self.heading(self.l['steps'])
        for step in data['steps']:
            self.heading(step['title'], 3, False)
            self.p(step['text'])
        self.diagram(data['diagram'])
        self.heading(self.l['example'])
        self.worked(data['workedExample'])
        self.box(self.l['misconception'], [self.l['claim'] + ': ' + data['misconception']['claim'], self.l['correction'] + ': ' + data['misconception']['correction']], PALE_ROSE)
        self.heading(self.l['checkpoint'], 3, False)
        self.p(data['quickCheck']['question'])
        self.labeled(self.l['answer'] + ':', data['quickCheck']['answer'])
        self.heading(self.l['practice'], 3, False)
        self.p(data['practice']['task'])
        self.labeled(self.l['hint'] + ':', data['practice']['hint'])
        self.heading(self.l['takeaways'], 3, False)
        self.bullets(data['takeaways'])

    def deep(self, data):
        self.heading(self.l['deeper'], 1)
        self.p(data['orientation'], 'lead')
        visuals = data['visuals']
        for i, section in enumerate(data['sections']):
            self.heading(section['title'])
            self.box(self.l['why'], section['why'])
            self.p(section['paragraphs'])
            self.heading(section['example']['title'], 3, False)
            self.p(section['example']['text'])
            self.heading(self.l['checkpoint'], 3, False)
            self.p(section['checkpoint']['question'])
            self.labeled(self.l['answer'] + ':', section['checkpoint']['answer'])
            # Distribute the three visuals through the six explanations.
            if i in (1, 3, 5) and i // 2 < len(visuals):
                visual = visuals[i // 2]
                self.diagram(visual) if visual['kind'] == 'flow' else self.grid(visual)
        for visual in visuals[3:]:
            self.diagram(visual) if visual['kind'] == 'flow' else self.grid(visual)
        for case in data['cases']:
            self.heading(case['title'])
            copy = dict(case)
            copy['title'] = self.l['example']
            self.worked(copy)
        practice = data['practice']
        self.heading(practice['title'])
        self.p(practice['task'])
        self.bullets(practice['steps'], True)
        self.box(self.l['model'], practice['modelAnswer'])
        self.heading(self.l['faqs'])
        for item in data['faqs']:
            self.heading(item['question'], 3, False)
            self.p(item['answer'])
        self.box(self.l['sourceNote'], data['sourceNote'], PALE_ROSE)

    def academic(self, data):
        self.heading(self.l['academic'], 1)
        self.p(data['lead'], 'lead')
        for section in data['sections']:
            self.heading(section['heading'])
            self.p(section['paragraphs'])
        self.heading(self.l['takeaways'])
        self.bullets(data.get('keyTakeaways', []))
        self.heading(self.l['sources'], 1)
        self.heading(self.l['seminar'])
        frame = data.get('frame', {})
        for key in ('question', 'historiography', 'primaryTask', 'seminarTask'):
            if frame.get(key):
                self.heading(self.l[key], 3, False)
                self.p(frame[key])
        if data.get('task'):
            self.box(self.l['practice'], data['task'])
        self.heading(self.l['discussion'])
        self.bullets(data.get('discussionQuestions', []), True)
        self.heading(self.l['references'])
        if data.get('book'):
            self.p(data['book'] if isinstance(data['book'], str) else json.dumps(data['book'], ensure_ascii=False))
        for index, ref in enumerate(data.get('references', [])):
            reference_start = len(self.story)
            self.heading(f'{index + 1}. {ref["title"]}', 3, False)
            self.labeled(self.l['assignment'] + ':', ref.get('assignment', ''))
            self.labeled(self.l['summary'] + ':', ref.get('summary', ''))
            if ref.get('url'):
                url = html.escape(ref['url'], quote=True)
                self.story.append(Paragraph(f'<link href="{url}" color="#1b696b">{html.escape(ref["url"])}</link>', self.s['small']))
            # Keep a source link with its short reference entry, avoiding an
            # isolated URL on the following page. Long entries can still split.
            for paragraph in self.story[reference_start:-1]:
                paragraph.keepWithNext = True


def build(root, week, locale, academic, sty):
    basic_path = root / 'learning' / f'week-{week:02d}.json'
    deep_path = root / 'learning' / f'deep-week-{week:02d}.json'
    basic_doc = json.loads(basic_path.read_text())
    deep_doc = json.loads(deep_path.read_text())
    assert basic_doc['week'] == deep_doc['week'] == week
    basic, deep, acad = basic_doc[locale], deep_doc[locale], academic[str(week)][locale]
    assert len(deep['sections']) >= 6 and len(deep['visuals']) >= 3 and len(deep['cases']) >= 2
    assert all(len(s['paragraphs']) >= 3 for s in deep['sections'])
    filename = f'Week_{week:02d}_Lecture_Notes_EN.pdf' if locale == 'en' else f'Hafta_{week:02d}_Ders_Notu_TR.pdf'
    out = root / 'notes' / filename
    out.parent.mkdir(exist_ok=True)
    b = Builder(locale, week, sty)
    l = b.l
    b.story.append(Spacer(1, 26))
    b.p(f'{l["course"]}\n{l["week"]} {week:02d}', 'coverKicker')
    b.p(basic['title'], 'coverTitle')
    b.p(f'{l["edition"]} | {l["language"]}', 'coverMeta')
    b.story.append(HRFlowable(width='100%', thickness=1.4, color=GOLD, spaceAfter=21))
    b.p(acad['lead'], 'lead')
    b.p(l['coverNote'], 'coverMeta')
    b.story.append(Spacer(1, 10))
    b.story.append(FlowDiagram(basic['diagram']['nodes'], sty))
    b.p(basic['diagram']['caption'], 'caption')
    b.story.append(PageBreak())
    b.heading(l['contents'], 1, False)
    b.p(l['routeNote'], 'small')
    toc = TableOfContents()
    toc.levelStyles = [sty['toc0'], sty['toc1']]
    toc.dotsMinLevel = 0
    toc.tableStyle = TableStyle([('LEFTPADDING', (0, 0), (-1, -1), 0), ('RIGHTPADDING', (0, 0), (-1, -1), 0), ('TOPPADDING', (0, 0), (-1, -1), 1), ('BOTTOMPADDING', (0, 0), (-1, -1), 1), ('VALIGN', (0, 0), (-1, -1), 'TOP')])
    b.story.append(toc)
    b.story.append(PageBreak())
    b.beginner(basic)
    b.deep(deep)
    b.academic(acad)
    doc = CourseDoc(out, locale, week, basic['title'], sty)
    doc.multiBuild(b.story)
    reader = PdfReader(out)
    page_texts = []
    for page in reader.pages:
        lines = (page.extract_text() or '').splitlines()
        # Running matter otherwise interrupts paragraphs that cross a page.
        lines = [line for line in lines if line.strip() not in (l['course'], l['language'], f'{l["week"]} {week:02d}')
                 and not re.fullmatch(re.escape(l['page']) + r' \d+', line.strip())]
        page_texts.append('\n'.join(lines))
    text = '\n'.join(page_texts)
    assert '\ufffd' not in text and 'PLACEHOLDER' not in text and 'TODO' not in text, filename
    assert len(reader.pages) >= 8, (filename, 'Unexpectedly short output')
    assert len(text.split()) >= 3000, (filename, 'Unexpectedly little text')
    # Every source paragraph must survive pagination and remain searchable.
    normal = lambda value: re.sub(r'\s+', '', clean(value))
    haystack = normal(text)
    missing = []
    for section in deep['sections'] + acad['sections']:
        for paragraph in section['paragraphs']:
            needle = normal(paragraph)
            if needle not in haystack:
                missing.append(clean(paragraph)[:80])
    assert not missing, (filename, 'Missing paragraph content', missing[:3])
    def outline_count(items):
        return sum(outline_count(item) if isinstance(item, list) else 1 for item in items)
    return {'file': str(out), 'week': week, 'locale': locale, 'pages': len(reader.pages), 'words': len(text.split()), 'bytes': out.stat().st_size, 'paragraphs_complete': True, 'bookmarks': outline_count(reader.outline)}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=ROOT)
    parser.add_argument('--weeks', default=','.join(str(n) for n in range(1, 15)))
    parser.add_argument('--locales', default='tr,en')
    parser.add_argument('--qa-dir', type=Path)
    args = parser.parse_args()
    academic = json.loads((args.root / 'learning' / 'academic-readings.json').read_text())
    register_fonts()
    sty = styles()
    records = []
    for week in map(int, args.weeks.split(',')):
        for locale in args.locales.split(','):
            record = build(args.root, week, locale, academic, sty)
            records.append(record)
            print(json.dumps(record, ensure_ascii=False), flush=True)
    if args.qa_dir:
        args.qa_dir.mkdir(parents=True, exist_ok=True)
        (args.qa_dir / 'course-pdf-validation.json').write_text(json.dumps(records, ensure_ascii=False, indent=2) + '\n')


if __name__ == '__main__':
    main()
