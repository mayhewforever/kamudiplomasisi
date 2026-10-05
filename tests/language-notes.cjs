// Verify language routing and complete reading assets, including language changes in-place.
const {JSDOM,VirtualConsole}=require('jsdom');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const dom=new JSDOM(fs.readFileSync(path.join(root,'index.html'),'utf8'),{url:'https://mayhewforever.github.io/kamudiplomasisi/?lang=en&week=1&tab=lesson',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:new VirtualConsole()});
const w=dom.window,d=w.document;
w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=function(){};w.matchMedia=()=>({matches:true});
w.fetch=async()=>({ok:false,status:401,json:async()=>({})});
w.HTMLMediaElement.prototype.pause=function(){};w.HTMLMediaElement.prototype.load=function(){};
w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};
for(const script of [...d.querySelectorAll('script[src]')])w.eval(fs.readFileSync(path.join(root,script.getAttribute('src').split('?')[0]),'utf8'));
function check(lang){
 assert.equal(d.documentElement.lang,lang);
 const other=lang==='en'?'TR':'EN',suffix=lang.toUpperCase();
 for(const a of d.querySelectorAll('.weekly-note-actions a,.lg-download,.lg-footer a[href$=".pdf"],.presentation-download'))assert.ok(!a.getAttribute('href').includes('_'+other+'.'),a.outerHTML);
 assert.equal(d.querySelectorAll('.presentation-download').length,14);
 assert.equal(d.querySelectorAll('.depth-guide').length,14);
 for(const article of d.querySelectorAll('.depth-guide')){
  assert.equal(article.lang,lang);assert.equal(article.querySelectorAll('.dg-section').length,6);assert.equal(article.querySelectorAll('.dg-visual').length,3);
  assert.equal(article.querySelectorAll('.dg-case').length,2);
 }
 for(let week=1;week<=14;week++){
  const stem=lang==='en'?`Week_${String(week).padStart(2,'0')}_Lecture_Notes_EN`:`Hafta_${String(week).padStart(2,'0')}_Ders_Notu_TR`;
  const page=new JSDOM(fs.readFileSync(path.join(root,'notes',stem+'.html'),'utf8')).window.document;
  assert.equal(page.documentElement.lang,lang);
  assert.ok(fs.statSync(path.join(root,'notes',stem+'.pdf')).size>20000);
  const ids=[...page.querySelectorAll('[id]')].map(x=>x.id);assert.equal(new Set(ids).size,ids.length,'Duplicate IDs '+stem);
  for(const a of page.querySelectorAll('a[href^="#"]'))assert.ok(page.getElementById(a.getAttribute('href').slice(1)),'Broken anchor '+stem+': '+a.href);
  for(const a of page.querySelectorAll('.lg-download,.note-pdf'))assert.ok(a.href.includes('_'+suffix+'.'),'Wrong language '+a.href);
  const text=page.querySelector('main').textContent;
  assert.ok(text.split(/\s+/).length>4500,'Incomplete detailed note '+stem);
  if(lang==='en')assert.ok(!/\b(Türkçe|öğrenci|yanıt|kaynaklar|haftalık)\b/i.test(text),'Turkish prose in English '+stem);
  const button=d.querySelector('[data-ai-week="'+week+'"]');button.click();
  assert.equal(d.querySelector('#aiVideoTranscript').lang,lang);
  assert.ok(d.querySelector('#aiVideoTranscript').textContent.length>10000);
  assert.equal(d.querySelector('#aiVideoCaptions').srclang,'tr');
  assert.equal(d.querySelector('#aiVideoCaptions').default,true);
 }
}
check('en');
d.querySelector('[data-language="tr"]').click();check('tr');
dom.window.close();
console.log('PASS: 28 complete notes/PDFs, language-matched downloads, 84 visual structures, 56 worked cases, valid anchors and locale transcripts with Turkish subtitles retained.');
