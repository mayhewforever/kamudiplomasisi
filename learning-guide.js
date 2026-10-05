(function (root) {
  "use strict";
  var labels = {
    tr: {start:"Sıfırdan başla", week:"Hafta", intro:"Bir dakikada ana fikir", analogy:"Günlük hayattan düşün", goals:"Bu hafta ne öğreneceksin?", concepts:"Önce bu dört kavram", example:"Örnek", steps:"Adım adım anlayalım", map:"Görerek öğren", solved:"Birlikte çözelim", mistake:"Sık yapılan hata", correction:"Doğrusu", check:"Kendini kontrol et", answer:"Cevabı ve açıklamayı gör", practice:"Şimdi sen dene", hint:"Başlamak için ipucu", excel:"Excel çalışma dosyasını indir", excelHelp:"Türkçe çalışma kitabı. Önce «1 Başla ve Haftalar» sayfasında bu haftayı bul; sonra örneği inceleyip kendi alanını doldur.", keep:"Aklında kalsın", source:"Ayrıntılı ders notunu aç", pdf:"Ayrıntılı akademik not (PDF)", deeper:"Bir adım ileri: ayrıntılı akademik okuma", deeperHelp:"Temel fikri kavradıysan kaynakları, farklı yorumları ve ayrıntılı açıklamaları burada inceleyebilirsin.", path:["Ana fikir","Kavramlar","Adımlar","Örnek","Uygulama"]},
    en: {start:"Start from scratch", week:"Week", intro:"The main idea in a minute", analogy:"Think of an everyday example", goals:"What will you learn?", concepts:"Start with these four terms", example:"Example", steps:"Understand it step by step", map:"See how it works", solved:"Let's work through an example", mistake:"A common mistake", correction:"What to remember", check:"Check your understanding", answer:"Show the answer and explanation", practice:"Now try it yourself", hint:"A hint to get started", excel:"Download the Excel workbook (Turkish)", excelHelp:"The workbook is in Turkish. Find this week on «1 Başla ve Haftalar», study the worked example, then fill in your own practice area.", keep:"Three things to remember", source:"Open the detailed lecture note (Turkish)", pdf:"Detailed academic note (PDF, Turkish)", deeper:"Go further: detailed academic reading", deeperHelp:"Once the basics make sense, explore the sources, alternative interpretations and detailed explanations here.", path:["Main idea","Terms","Steps","Example","Practice"]}
  };
  function esc(value) {return String(value == null ? "" : value).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
  function list(items) {return items.map(function(s){return "<li>"+esc(s)+"</li>";}).join("");}
  function render(doc, language, base) {
    if (!doc) return "";
    language = language === "en" ? "en" : "tr";
    var d=doc[language], l=labels[language], w=doc.week, id="learning-"+w+"-", prefix=base||"";
    var ids=["idea","terms","steps","example","practice"];
    var arrow='<svg viewBox="0 0 32 20" aria-hidden="true" focusable="false"><path d="M2 10h24M20 3l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    return [
      '<article class="learning-guide" id="learning-start-'+w+'" aria-labelledby="'+id+'title" lang="'+language+'">',
      '<header class="lg-header"><p class="lg-kicker">'+l.week+' '+String(w).padStart(2,"0")+' · '+l.start+'</p><h3 id="'+id+'title">'+esc(d.title)+'</h3><nav class="lg-path" aria-label="'+esc(l.start)+'">'+ids.map(function(key,i){return '<a href="#'+id+key+'"><b>'+String(i+1).padStart(2,"0")+'</b>'+l.path[i]+'</a>';}).join("")+'</nav></header>',
      '<section class="lg-idea" id="'+id+'idea"><h4>'+l.intro+'</h4><p class="lg-lead">'+esc(d.nutshell)+'</p><aside class="lg-analogy"><strong>'+l.analogy+'</strong><p>'+esc(d.analogy)+'</p></aside><h4>'+l.goals+'</h4><ul class="lg-goals">'+list(d.objectives)+'</ul></section>',
      '<section id="'+id+'terms"><h4>'+l.concepts+'</h4><dl class="lg-concepts">'+d.concepts.map(function(c,i){return '<div><dt><span aria-hidden="true">'+String(i+1).padStart(2,"0")+'</span>'+esc(c.term)+'</dt><dd>'+esc(c.meaning)+'</dd><dd class="lg-term-example"><strong>'+l.example+':</strong> '+esc(c.example)+'</dd></div>';}).join("")+'</dl></section>',
      '<section id="'+id+'steps"><h4>'+l.steps+'</h4><ol class="lg-steps">'+d.steps.map(function(s,i){return '<li><span class="lg-step-no" aria-hidden="true">'+(i+1)+'</span><div><h5>'+esc(s.title)+'</h5><p>'+esc(s.text)+'</p></div></li>';}).join("")+'</ol>',
      '<figure class="lg-map"><div class="lg-map-heading"><span>'+l.map+'</span><h5>'+esc(d.diagram.title)+'</h5></div><ol class="lg-nodes">'+d.diagram.nodes.map(function(n,i){return '<li><div class="lg-node"><span class="lg-node-no" aria-hidden="true">'+String(i+1).padStart(2,"0")+'</span><strong>'+esc(n.title)+'</strong><p>'+esc(n.text)+'</p></div>'+(i<3?'<span class="lg-arrow">'+arrow+'</span>':"")+'</li>';}).join("")+'</ol><figcaption>'+esc(d.diagram.caption)+'</figcaption></figure></section>',
      '<section class="lg-worked" id="'+id+'example"><p class="lg-kicker">'+l.solved+'</p><h4>'+esc(d.workedExample.title)+'</h4><p>'+esc(d.workedExample.scenario)+'</p><ol>'+list(d.workedExample.steps)+'</ol><p class="lg-example-lesson">'+esc(d.workedExample.lesson)+'</p></section>',
      '<aside class="lg-misconception"><div><strong>'+l.mistake+'</strong><p>'+esc(d.misconception.claim)+'</p></div><div><strong>'+l.correction+'</strong><p>'+esc(d.misconception.correction)+'</p></div></aside>',
      '<section class="lg-practice" id="'+id+'practice"><h4>'+l.check+'</h4><p>'+esc(d.quickCheck.question)+'</p><details class="lg-answer"><summary>'+l.answer+'</summary><p>'+esc(d.quickCheck.answer)+'</p></details><h4>'+l.practice+'</h4><p>'+esc(d.practice.task)+'</p><p class="lg-hint"><strong>'+l.hint+':</strong> '+esc(d.practice.hint)+'</p><a class="lg-download" href="'+prefix+'workbooks/Kamu_Diplomasisi_Ogrenme_Atolyesi_TR.xlsx" download>'+l.excel+' <span aria-hidden="true">↓</span></a><p class="lg-download-help">'+l.excelHelp+'</p></section>',
      '<section class="lg-takeaways"><h4>'+l.keep+'</h4><ol>'+list(d.takeaways)+'</ol></section>',
      '<footer class="lg-footer"><a href="'+(prefix==="../"?'#deep-reading':prefix+'notes/Hafta_'+String(w).padStart(2,"0")+'_Ders_Notu_TR.html')+'">'+(prefix==="../"?l.deeper:l.source)+' <span aria-hidden="true">↗</span></a><a href="'+prefix+'notes/Hafta_'+String(w).padStart(2,"0")+'_Ders_Notu_TR.pdf">'+l.pdf+'</a></footer>',
      '</article>'
    ].join("");
  }
  var api={render:render,labels:labels};
  if (typeof module !== "undefined" && module.exports) module.exports=api;
  if (root) {
    root.CourseLearning=api;
    function openParents(target) {if(!target)return;for(var parent=target.tagName==="DETAILS"?target:target.parentElement;parent;parent=parent.parentElement){if(parent.tagName==="DETAILS")parent.open=true;}}
    if(root.document) {
      root.document.addEventListener("click",function(event){
      var link=event.target.closest && event.target.closest('a[href^="#"]');
      if(!link)return;var target=root.document.getElementById(link.getAttribute("href").slice(1));
      openParents(target);
      });
      var openHash=function(){openParents(root.document.getElementById(root.location.hash.slice(1)));};
      root.addEventListener("hashchange",openHash);
      if(root.document.readyState==="loading")root.document.addEventListener("DOMContentLoaded",openHash,{once:true});else openHash();
    }
  }
})(typeof window !== "undefined" ? window : null);
