(function(root){
  'use strict';
  var copy={
    en:{kicker:'Explain · examine · apply',title:'A closer academic reading',intro:'Read in stages',why:'Why this matters',example:'Worked illustration',check:'Pause and reason',answer:'Show the reasoning',visual:'Visual synthesis',case:'Case workshop',conclusion:'A defensible conclusion',practice:'Research practice',model:'Read a model response',faq:'Questions worth asking',sources:'Sources and critical reading',sourceHelp:'Read these alongside the explanations. A source can document an intention or an activity without establishing reception or impact. Original publication titles are retained for accurate identification.',academic:'The academic argument',frame:'Research seminar',question:'Research question',debate:'Competing interpretations',primary:'Source criticism',seminar:'Seminar task',takeaways:'Synthesis',discussion:'Questions for discussion',book:'Core reading'},
    tr:{kicker:'Açıkla · incele · uygula',title:'Ayrıntılı akademik okuma',intro:'Bölüm bölüm oku',why:'Bu ayrım neden önemli?',example:'Açıklamalı örnek',check:'Dur ve düşün',answer:'Gerekçeli cevabı gör',visual:'Görsel sentez',case:'Vaka atölyesi',conclusion:'Savunulabilir bir sonuç',practice:'Araştırma uygulaması',model:'Örnek yanıtı oku',faq:'Sık sorulan önemli sorular',sources:'Kaynaklar ve eleştirel okuma',sourceHelp:'Açıklamaları bu metinlerle birlikte okuyun. Bir kaynak niyeti veya faaliyeti belgeleyebilir; bu, alımlamayı ya da etkiyi kanıtladığı anlamına gelmez. Yayınların doğru bulunabilmesi için özgün eser adları korunmuştur.',academic:'Akademik tartışma',frame:'Araştırma semineri',question:'Araştırma sorusu',debate:'Rakip yorumlar',primary:'Kaynak eleştirisi',seminar:'Seminer çalışması',takeaways:'Sentez',discussion:'Tartışma soruları',book:'Temel okuma'}
  };
  function e(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function heading(s){return String(s).replace(/^\d+[.)]\s*/,'');}
  function paragraphs(a){return a.map(function(p){return '<p>'+e(p)+'</p>';}).join('');}
  function list(a){return '<ol>'+a.map(function(p){return '<li>'+e(p)+'</li>';}).join('')+'</ol>';}
  function visual(v,lang,index){
    var l=copy[lang],body;
    if(v.kind==='flow'){
      body='<ol class="dg-flow">'+v.nodes.map(function(n,i){return '<li><span class="dg-number">'+String(i+1).padStart(2,'0')+'</span><strong>'+e(n.title)+'</strong><p>'+e(n.text)+'</p></li>';}).join('')+'</ol>';
    }else{
      body='<div class="dg-table-scroll" tabindex="0" role="region" aria-label="'+e(v.title)+'"><table><thead><tr>'+v.columns.map(function(c){return '<th scope="col">'+e(c)+'</th>';}).join('')+'</tr></thead><tbody>'+v.rows.map(function(row){return '<tr>'+row.map(function(cell,i){return i===0?'<th scope="row">'+e(cell)+'</th>':'<td>'+e(cell)+'</td>';}).join('')+'</tr>';}).join('')+'</tbody></table></div>';
    }
    return '<figure class="dg-visual dg-'+e(v.kind)+'"><div class="dg-visual-heading"><span>'+l.visual+' '+String(index+1).padStart(2,'0')+'</span><h4>'+e(v.title)+'</h4></div>'+body+'<figcaption>'+e(v.caption)+'</figcaption></figure>';
  }
  function render(doc,lang){
    if(!doc)return '';lang=lang==='en'?'en':'tr';
    var d=doc[lang],l=copy[lang],id='depth-'+doc.week+'-';
    return '<article class="depth-guide" id="'+id+'start" lang="'+lang+'" aria-labelledby="'+id+'title">'+
      '<header class="dg-header"><p class="dg-kicker">'+l.kicker+'</p><h3 id="'+id+'title">'+l.title+'</h3><p>'+e(d.orientation)+'</p></header>'+
      '<nav class="dg-contents" aria-label="'+l.intro+'"><strong>'+l.intro+'</strong>'+list(d.sections.map(function(s){return heading(s.title);})).replace(/<li>(.*?)<\/li>/g,(function(){var i=0;return function(_,text){return '<li><a href="#'+id+d.sections[i++].id+'">'+text+'</a></li>';};})())+'</nav>'+
      d.sections.map(function(s,i){return '<section class="dg-section" id="'+id+e(s.id)+'"><div class="dg-section-title"><span>'+String(i+1).padStart(2,'0')+'</span><h4>'+e(heading(s.title))+'</h4></div><aside class="dg-why"><strong>'+l.why+'</strong><p>'+e(s.why)+'</p></aside>'+paragraphs(s.paragraphs)+'<aside class="dg-illustration"><p class="dg-kicker">'+l.example+'</p><h5>'+e(s.example.title)+'</h5><p>'+e(s.example.text)+'</p></aside><div class="dg-check"><strong>'+l.check+'</strong><p>'+e(s.checkpoint.question)+'</p><details class="lg-answer"><summary>'+l.answer+'</summary><p>'+e(s.checkpoint.answer)+'</p></details></div></section>'+(i%2===1&&d.visuals[(i-1)/2]?visual(d.visuals[(i-1)/2],lang,(i-1)/2):'');}).join('')+
      '<section class="dg-cases" id="'+id+'cases"><h4>'+l.case+'</h4>'+d.cases.map(function(c,i){return '<article class="dg-case"><p class="dg-kicker">'+l.case+' '+(i+1)+'</p><h5>'+e(c.title)+'</h5><p>'+e(c.scenario)+'</p>'+list(c.steps)+'<div class="dg-conclusion"><strong>'+l.conclusion+'</strong><p>'+e(c.conclusion)+'</p></div></article>';}).join('')+'</section>'+
      '<section class="dg-practice" id="'+id+'practice"><p class="dg-kicker">'+l.practice+'</p><h4>'+e(d.practice.title)+'</h4><p>'+e(d.practice.task)+'</p>'+list(d.practice.steps)+'<details class="lg-answer"><summary>'+l.model+'</summary><p>'+e(d.practice.modelAnswer)+'</p></details></section>'+
      '<section class="dg-faq"><h4>'+l.faq+'</h4>'+d.faqs.map(function(f){return '<details class="lg-answer"><summary>'+e(f.question)+'</summary><p>'+e(f.answer)+'</p></details>';}).join('')+'</section><p class="dg-source-note">'+e(d.sourceNote)+'</p></article>';
  }
  function sources(data,lang){var l=copy[lang];return '<section class="dg-sources"><h4>'+l.sources+'</h4><p>'+l.sourceHelp+'</p>'+(data.book?'<p><strong>'+l.book+':</strong> '+e(data.book)+'</p>':'')+'<ol>'+(data.references||[]).map(function(r){return '<li><a href="'+e(r.url)+'" target="_blank" rel="noopener">'+e(r.title)+'</a><p class="dg-assignment">'+e(r.assignment)+'</p><p>'+e(r.summary)+'</p></li>';}).join('')+'</ol></section>';}
  function academic(data,lang,week){var l=copy[lang],f=data.frame;return '<article class="depth-guide dg-academic" id="academic-reading"><header class="dg-header"><p class="dg-kicker">'+l.academic+'</p><h3>'+e(data.title)+'</h3><p>'+e(data.lead)+'</p></header>'+data.sections.map(function(s,i){return '<section class="dg-section" id="academic-'+week+'-'+(i+1)+'"><h4>'+e(s.heading)+'</h4>'+paragraphs(s.paragraphs)+'</section>';}).join('')+'<section class="dg-practice"><h4>'+l.frame+'</h4><h5>'+l.question+'</h5><p>'+e(f.question)+'</p><h5>'+l.debate+'</h5><p>'+e(f.historiography)+'</p><h5>'+l.primary+'</h5><p>'+e(f.primaryTask)+'</p><h5>'+l.seminar+'</h5><p>'+e(f.seminarTask)+'</p></section><section><h4>'+l.takeaways+'</h4>'+list(data.keyTakeaways)+'<h4>'+l.discussion+'</h4>'+list(data.discussionQuestions)+'</section>'+sources(data,lang)+'</article>';}
  var api={render:render,academic:academic,sources:sources,labels:copy};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  if(root)root.CourseDepth=api;
})(typeof window!=='undefined'?window:null);
