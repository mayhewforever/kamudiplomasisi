// DOM regression checks; no browser or production student records are used.
// Run with NODE_PATH pointing to an installation of jsdom.
const {JSDOM, VirtualConsole}=require('jsdom');
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const scripts=['i18n.js','course-overview-i18n.js','content_weeks_1_5.js','content_weeks_6_10.js','content_weeks_11_14.js','video-scripts-en.js','weekly-study-guide.js','seminar-frames.js','app.js','study-ui.js','student-portal.js'];
const pause=()=>new Promise(resolve=>setTimeout(resolve,20));
async function boot({denied=false,query='?lang=en&week=1&tab=lesson',origin='https://mayhewforever.github.io/kamudiplomasisi/'}={}) {
 const errors=[];const vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e));
 const dom=new JSDOM(fs.readFileSync(path.join(root,'index.html'),'utf8'),{url:origin+query,runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc});
 const w=dom.window;
 w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=function(){};w.matchMedia=()=>({matches:true});
 w.fetch=async()=>({ok:false,status:401,json:async()=>({})});
 if(denied)Object.defineProperty(w,'localStorage',{get(){throw new w.DOMException('Storage blocked','SecurityError');}});
 for(const script of scripts)w.eval(fs.readFileSync(path.join(root,script),'utf8'));
 await pause();
 return {dom,w,d:w.document,errors};
}
(async()=>{
 const {dom,w,d,errors}=await boot();
 assert.equal(d.querySelectorAll('.week-card').length,14);
 assert.equal(d.querySelectorAll('.study-workspace').length,14);
 assert.match(d.querySelector('#ogrenci-alani').textContent,/Open course materials/);
 assert.equal(d.querySelector('#progressPercent').textContent,'—');
 assert.equal(d.querySelector('#courseProgress').hidden,true);
 d.querySelector('[data-filter="tarih"]').click();
 assert.equal(d.querySelector('#week-01').hidden,true);
 d.querySelector('[data-map-week="1"]').click();
 assert.equal(d.querySelector('#week-01').hidden,false);
 assert.equal(d.querySelector('[data-filter="all"]').getAttribute('aria-pressed'),'true');
 d.querySelector('[data-language="tr"]').click();await pause();
 assert.match(d.querySelector('#ogrenci-alani').textContent,/Öğrenci alanı/);
 assert.doesNotMatch(d.querySelector('#ogrenci-alani').textContent,/Student workspace/);
 assert.equal(d.querySelector('[data-home-link]').getAttribute('aria-label'),'Ders portalı ana sayfa');
 d.querySelector('[data-map-week="12"]').click();await pause();
 assert.match(d.querySelector('#ogrenci-alani').textContent,/Hafta 12/);
 assert.match(d.querySelector('#ogrenci-alani .sp-button-primary').href,/lang=tr&week=12&tab=lesson/);
 assert.match(d.querySelector('[data-sp-nav]').href,/student\?week=12$/);
 d.querySelector('[data-language="en"]').click();await pause();
 const search=d.querySelector('#weekSearch');search.value='power';search.dispatchEvent(new w.Event('input'));
 const expected=w.CourseSite.currentWeeks().filter(item=>d.querySelector('[data-week="'+item.week+'"]')).length;assert.equal(expected,14);
 d.querySelector('[data-filter="tarih"]').click();
 assert.ok([...d.querySelectorAll('[data-result-week]')].every(e=>[2,3,4,11].includes(Number(e.dataset.resultWeek))));
 d.querySelector('[data-map-week="1"]').click();await pause();
 assert.equal(search.value,'');
 for(let week=1;week<=14;week++){
  d.querySelector('[data-map-week="'+week+'"]').click();await pause();
  for(const tab of ['lesson','flashcards','quiz','game','resources']){
   d.querySelector('#week-'+week+'-'+tab+'-tab').click();
   assert.equal(d.querySelector('#week-'+week+'-'+tab).hidden,false);
   assert.equal(d.querySelectorAll('#week-'+String(week).padStart(2,'0')+' .study-panel:not([hidden])').length,1);
  }
 }
 d.querySelector('[data-map-week="1"]').click();await pause();
 d.querySelector('#week-1-flashcards-tab').click();
 d.querySelector('#week-1-flashcards .flashcard').click();
 assert.equal(d.querySelector('#week-1-flashcards .flashcard').getAttribute('aria-pressed'),'true');
 d.querySelector('#week-1-quiz-tab').click();
 d.querySelector('#week-1-quiz .check-question').click();
 assert.ok(d.querySelector('#week-1-quiz .quiz-result').textContent);
 const radio=d.querySelector('#week-1-quiz input');radio.checked=true;radio.dispatchEvent(new w.Event('change',{bubbles:true}));
 d.querySelector('#week-1-quiz .check-question').click();
 assert.equal(d.querySelector('#week-1-quiz .quiz-explanation').hidden,false);
 d.querySelector('#week-1-game-tab').click();
 d.querySelector('#week-1-game .match-term[data-pair="0"]').click();
 d.querySelector('#week-1-game .match-definition[data-pair="0"]').click();
 assert.equal(d.querySelectorAll('#week-1-game .is-matched').length,2);
 w.CourseApp.state.completedWeeks=[2];w.CourseApp.resetProgress();assert.deepEqual([...w.CourseApp.state.completedWeeks],[2]);
 assert.equal(errors.length,0,errors.map(e=>e.message).join('\n'));dom.window.close();
 const denied=await boot({denied:true,query:'?lang=en&week=2.5&tab=lesson'});
 assert.equal(denied.w.CourseApp.state.openWeek,1);assert.equal(denied.d.querySelectorAll('.week-card').length,14);assert.equal(denied.errors.length,0);denied.dom.window.close();
 const native=await boot({origin:'https://kamu-diplomasisi-yumusak-guc.mtoman.chatgpt.site/course/',query:'?lang=en&week=7&tab=lesson'});
 assert.match(native.d.querySelector('#ogrenci-alani').textContent,/Sign in to record/);
 assert.match(native.d.querySelector('#ogrenci-alani .sp-button-primary').href,/return_to=%2Fstudent%3Fweek%3D7/);
 assert.equal(native.errors.length,0);native.dom.window.close();
 console.log('PASS: 14 weeks × 5 tabs; filters, bilingual portal, week routing, flashcards, quiz, matching game, reset semantics, blocked storage and sign-in links.');
})().catch(e=>{console.error(e);process.exit(1);});
