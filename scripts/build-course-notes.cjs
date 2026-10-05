// Build complete, language-specific notes. Content determines length; no page cap.
const fs=require('node:fs'), path=require('node:path');
const candidate=process.argv[2]?path.resolve(process.argv[2]):path.resolve(__dirname,'..');
const root=fs.existsSync(path.join(candidate,'learning'))?candidate:path.join(candidate,'public','course');
const learning=require(path.join(root,'learning-guide.js'));
const depth=require(path.join(root,'depth-guide.js'));
require('./build-academic-data.cjs');
const academic=JSON.parse(fs.readFileSync(path.join(root,'learning/academic-readings.json'),'utf8'));
const brief={},deep={};
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const labels={en:{back:'Back to course',institution:'HITIT UNIVERSITY',course:'PUBLIC DIPLOMACY AND SOFT POWER',week:'Week',download:'Download full PDF',other:'Turkish version',skip:'Skip to content',contents:'Reading guide',basics:'Start with the fundamentals',depth:'Detailed explanations',cases:'Worked cases',practice:'Research exercise',academic:'Academic analysis and sources',status:'Loading reading status…',intro:'Concepts, explanations, visual synthesis and evidence-based academic discussion.',previous:'Previous week',next:'Next week'},tr:{back:'Derse dön',institution:'HİTİT ÜNİVERSİTESİ',course:'KAMU DİPLOMASİSİ VE YUMUŞAK GÜÇ',week:'Hafta',download:'Tam PDF indir',other:'İngilizce sürüm',skip:'İçeriğe geç',contents:'Okuma rehberi',basics:'Temel kavramlarla başla',depth:'Ayrıntılı açıklamalar',cases:'Çözülmüş vakalar',practice:'Araştırma uygulaması',academic:'Akademik çözümleme ve kaynaklar',status:'Okuma durumu yükleniyor…',intro:'Kavramlar, açıklamalar, görsel sentez ve kanıta dayalı akademik tartışma.',previous:'Önceki hafta',next:'Sonraki hafta'}};
function filename(w,l){return l==='en'?`Week_${String(w).padStart(2,'0')}_Lecture_Notes_EN`:`Hafta_${String(w).padStart(2,'0')}_Ders_Notu_TR`;}
for(let w=1;w<=14;w++){
 const pad=String(w).padStart(2,'0');
 brief[w]=JSON.parse(fs.readFileSync(path.join(root,`learning/week-${pad}.json`),'utf8'));
 deep[w]=JSON.parse(fs.readFileSync(path.join(root,`learning/deep-week-${pad}.json`),'utf8'));
 for(const lang of ['tr','en']) {
  const l=labels[lang],d=brief[w][lang],file=path.join(root,'notes',filename(w,lang)+'.html');
  let archive='';
  if(lang==='tr'&&fs.existsSync(file)) {
   const old=fs.readFileSync(file,'utf8');
   const found=old.match(/<!-- ARCHIVE CONTENT -->([\s\S]*?)<!-- ARCHIVE END -->/)||old.match(/<!-- DEEP CONTENT -->([\s\S]*?)<!-- DEEP CLOSE -->/);
   if(found)archive='<details class="lg-deep note-archive" id="extended-archive"><summary>Ek okuma: önceki 30 bölümlük kaynak incelemesi</summary><div class="lg-deep-content"><!-- ARCHIVE CONTENT -->'+found[1]+'<!-- ARCHIVE END --></div></details>';
  }
  const unitLinks=deep[w][lang].sections.map(s=>`<li><a href="#depth-${w}-${escape(s.id)}">${escape(s.title)}</a></li>`).join('');
  const nav=`<a href="#learning-start-${w}">${l.basics}</a><details open><summary>${l.depth}</summary><ol>${unitLinks}</ol></details><a href="#depth-${w}-cases">${l.cases}</a><a href="#depth-${w}-practice">${l.practice}</a><a href="#academic-reading">${l.academic}</a>`;
  const h=`<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#801c35"><title>${l.week} ${pad} · ${escape(d.title)} | ${l.institution}</title><meta name="description" content="${escape(l.intro)}"><link rel="stylesheet" href="../learning-guide.css?v=20261005-academic2"><link rel="stylesheet" href="../depth-guide.css?v=20261005-academic2"><link rel="stylesheet" href="../notes-layout.css?v=20261005-academic2"></head><body id="top" data-note-week="${w}"><a class="note-skip" href="#learning-start-${w}">${l.skip}</a><header class="note-top"><a href="../?lang=${lang}&week=${w}&tab=lesson">← ${l.back}</a><strong>${l.institution}</strong><nav><a href="${filename(w,lang==='en'?'tr':'en')}.html">${l.other}</a><a class="note-pdf" href="${filename(w,lang)}.pdf" download>${l.download} ↓</a></nav></header><section class="note-hero"><p>${l.course} · ${l.week} ${pad}</p><h1>${escape(d.title)}</h1><p>${l.intro}</p><ul>${d.objectives.map(x=>'<li>'+escape(x)+'</li>').join('')}</ul><span id="studyStatus" aria-live="polite">${l.status}</span></section><div class="note-layout"><aside class="note-toc"><details open><summary>${l.contents}</summary><nav>${nav}</nav></details></aside><main>${learning.render(brief[w],lang,'../')}${depth.render(deep[w],lang)}${depth.academic(academic[w][lang],lang,w)}${archive}<nav class="note-pagination">${w>1?`<a href="${filename(w-1,lang)}.html">← ${l.previous}</a>`:'<span></span>'}${w<14?`<a href="${filename(w+1,lang)}.html">${l.next} →</a>`:''}</nav></main></div><script src="../learning-guide.js?v=20261005-academic2"></script><script src="../notes-reading.js?v=20261005-academic2"></script></body></html>`;
  fs.writeFileSync(file,h);
 }
}
fs.writeFileSync(path.join(root,'learning-content.js'),'/* Generated by scripts/build-course-notes.cjs */\nwindow.COURSE_BEGINNER = '+JSON.stringify(brief)+';\nwindow.COURSE_DEPTH = '+JSON.stringify(deep)+';\n');
const transcripts={};
for(const file of fs.readdirSync(path.join(root,'videos')).filter(f=>f.endsWith('_AI_Lecture_TR.vtt'))) {
 const w=Number(file.match(/Week_(\d+)/)[1]);
 const text=fs.readFileSync(path.join(root,'videos',file),'utf8').trim().split(/\r?\n\s*\r?\n/).slice(1).map(b=>b.split(/\r?\n/).slice(2).join(' ')).join(' ');
 const sentences=text.split(/(?<=[.!?])\s+/),paragraphs=[];
 for(let i=0;i<sentences.length;i+=4)paragraphs.push(sentences.slice(i,i+4).join(' '));
 transcripts[w]=paragraphs.join('\n\n');
}
fs.writeFileSync(path.join(root,'caption-transcripts-tr.js'),'/* Turkish transcript derived from the published caption tracks. */\nwindow.AI_LECTURE_TRANSCRIPTS_TR = '+JSON.stringify(transcripts)+';\n');
console.log('Built 28 complete language-specific notes with 84 detailed sections per language.');
