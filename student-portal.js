/* Server-backed course activity bridge. Legacy browser records remain untouched for import. */
(function () {
  "use strict";
  var TARGET = 7200;
  var mirror = location.hostname.endsWith("github.io");
  var secureOrigin = "https://kamu-diplomasisi-yumusak-guc.mtoman.chatgpt.site";
  var studentPath = mirror ? secureOrigin + "/student" : "/student";
  var adminPath = mirror ? secureOrigin + "/admin" : "/admin";
  function selectedRoute(path) { return path + "?week=" + selectedWeek; }
  function courseRoute() { return secureOrigin + "/course/?lang=" + locale() + "&week=" + selectedWeek + "&tab=" + (window.CourseApp?.state.activeTabs[String(selectedWeek)] || "lesson"); }
  var student = null, progress = {}, assignments = {}, activeWeek = 0, token = "", selectedWeek = 1;
  var lastActivity = Date.now(), lastResponse = 0, busy = false, youtubePlaying = false, youtubeWeek = 0;
  var shell;
  var locale = function () { return document.documentElement.lang === "en" ? "en" : "tr"; };
  var words = function () { return locale() === "en" ? {
    title:"Student workspace", intro:"Your work time and assignments are saved to your account and available on your phone. In the evidence brief, identify the document, claim, rival explanation and evidentiary limit.",
    open:"Open my progress", sign:"Sign in", profile:"Complete your profile", saving:"Recording active study", idle:"Open a week and study to record time", unavailable:"The connection is unavailable; study time is paused until it returns.", mirror:"Use the secure course site to record your study time.", server:"Server-saved", week:"Week", publicMode:"Open course materials", mirrorIntro:"Read the lessons and use the study tools here. To record study time or submit an assignment, continue in the signed-in course workspace.", track:"Continue with time tracking", account:"Progress and assignments", admin:"Instructor dashboard", legacy:"Download old browser records and assignments", signRequired:"Sign in to record your study time.", profileRequired:"Complete your student profile to record study time."
  } : {
    title:"Öğrenci alanı", intro:"Çalışma süresi ve ödevler hesabınıza kaydedilir; telefonunuzdan da erişebilirsiniz. Kanıt notunda belgeyi, iddiayı, rakip açıklamayı ve kanıt sınırını belirtin.",
    open:"İlerlememi aç", sign:"Giriş yap", profile:"Profili tamamla", saving:"Etkin çalışma kaydediliyor", idle:"Süre kaydı için bir haftayı açıp çalışın", unavailable:"Bağlantı kurulamadı; yeniden bağlanana kadar süre duraklatıldı.", mirror:"Çalışma sürenizin kaydı için güvenli ders sitesini açın.", server:"Sunucuda kayıtlı", week:"Hafta", publicMode:"Açık ders materyalleri", mirrorIntro:"Dersleri burada okuyabilir, çalışma araçlarını kullanabilirsiniz. Süre kaydı ve ödev teslimi için hesabınızla ders çalışma alanına geçin.", track:"Süre kaydıyla devam et", account:"İlerleme ve ödevler", admin:"Yönetici paneli", legacy:"Eski tarayıcı kayıtlarını ve ödev dosyalarını indir", signRequired:"Çalışma süresini kaydetmek için giriş yapın.", profileRequired:"Süre kaydı için öğrenci profilinizi tamamlayın."
  }; };
  function format(seconds) { var total=Math.floor(Math.max(0,Number(seconds)||0)); return String(Math.floor(total/3600)).padStart(2,"0")+":"+String(Math.floor(total%3600/60)).padStart(2,"0")+":"+String(total%60).padStart(2,"0"); }
  function inject() {
    var main=document.querySelector("#main")||document.querySelector("main"); if(!main) return;
    shell=document.createElement("section"); shell.className="student-portal"; shell.id="ogrenci-alani"; shell.setAttribute("aria-labelledby","student-portal-title");
    var thesis=main.querySelector(".course-thesis"); if(thesis) thesis.insertAdjacentElement("afterend",shell); else main.prepend(shell);
    var nav=document.querySelector("#mainNav"); if(nav && !nav.querySelector("[data-sp-nav]")) { var link=document.createElement("a");link.href=studentPath;link.dataset.spNav="true";link.textContent=words().title;nav.appendChild(link); }
    render();
  }
  function render(message) {
    if(!shell) return;
    var w=words();
    var current=activeWeek ? progress[activeWeek]||0 : progress[selectedWeek]||0;
    var action=mirror ? w.track : student ? w.open : (lastResponse===401 ? w.sign : w.profile);
    var returnTo=selectedRoute("/student");
    var link=mirror ? courseRoute() : student||lastResponse!==401 ? selectedRoute(studentPath) : "/signin-with-chatgpt?return_to="+encodeURIComponent(returnTo);
    var status=message || (mirror ? w.mirror : !student ? (lastResponse===401?w.signRequired:w.profileRequired) : activeWeek?w.saving:w.idle);
    var mode=mirror?w.publicMode:w.server;
    shell.innerHTML='<div class="sp-shell"><div class="sp-heading"><div><p class="sp-eyebrow">'+mode+'</p><h2 id="student-portal-title">'+w.title+'</h2><p>'+(mirror?w.mirrorIntro:w.intro)+'</p></div><div class="sp-rule-card"><span><small>'+w.week+' '+(activeWeek||selectedWeek)+'</small><strong>'+(mirror?"—":format(current)+' / 02:00:00')+'</strong></span><span><small>'+mode+'</small><strong aria-live="polite">'+status+'</strong></span></div></div><div class="sp-completion-rule sp-route-actions"><a class="sp-button sp-button-primary" href="'+link+'">'+action+' →</a>'+(mirror?'<a class="sp-button" href="'+selectedRoute(studentPath)+'">'+w.account+' →</a>':'')+'<a href="'+adminPath+'">'+w.admin+' →</a></div>'+(mirror?'<p class="sp-completion-rule"><a href="legacy-export.html">'+w.legacy+' →</a></p>':'')+'</div>';
    var nav=document.querySelector("[data-sp-nav]");
    if(nav) { nav.textContent=w.title; nav.href=selectedRoute(studentPath); }
    if(mirror) {
      var percent=document.querySelector("#progressPercent"), bar=document.querySelector("#courseProgress");
      if(percent)percent.textContent="—";
      if(bar)bar.hidden=true;
    }
  }
  async function call(action,body) {
    var response=await fetch("/api/portal?action="+action,{method:body?"POST":"GET",headers:body?{"X-Course-Portal":"1","Content-Type":"application/json"}:undefined,body:body?JSON.stringify(body):undefined,credentials:"same-origin",cache:"no-store"});
    if(!response.ok) {lastResponse=response.status; throw new Error("connection");} lastResponse=200; return response.json();
  }
  function syncCompletion() {
    var completed=[]; for(var week=1;week<=14;week++) if((progress[week]||0)>=TARGET && assignments[week] && assignments[week].submittedSeconds<TARGET) completed.push(week);
    if(window.CourseApp && window.CourseApp.state) {window.CourseApp.state.completedWeeks=completed; if(window.CourseApp.persist) window.CourseApp.persist();}
    document.querySelectorAll(".week-card[data-week]").forEach(function(card){var indicator=card.querySelector(".week-complete-indicator");if(indicator) indicator.hidden=completed.indexOf(Number(card.dataset.week))<0;});
    document.querySelectorAll("[data-map-week]").forEach(function(card){card.classList.toggle("is-complete",completed.indexOf(Number(card.dataset.mapWeek))>=0);});
    var bar=document.querySelector("#courseProgress"),percent=document.querySelector("#progressPercent");if(bar)bar.value=completed.length;if(percent)percent.textContent=Math.round(completed.length/14*100)+"%";
  }
  async function load() {
    try { var data=await call("me"); student=data.profile; progress=Object.fromEntries((data.progress||[]).map(function(item){return [item.week,item.seconds];})); assignments=Object.fromEntries((data.assignments||[]).map(function(item){return [item.week,item];}));syncCompletion();render(); }
    catch (_) {student=null;progress={};assignments={};syncCompletion();render(lastResponse===401?null:words().unavailable);}
  }
  function video() {
    var player=document.querySelector("#aiVideoPlayer"),dialog=document.querySelector("#aiVideoDialog");
    if(player&&dialog&&dialog.open&&!player.paused&&!player.ended&&player.readyState>=3) return Number(player.dataset.spWeek||document.querySelector(".play-ai-video:focus")?.dataset.aiWeek||selectedWeek);
    if(youtubePlaying&&document.querySelector("#videoDialog")?.open) return youtubeWeek;
    var playing=Array.from(document.querySelectorAll(".weekly-study-guide audio[data-podcast-week]")).find(function(audio){return !audio.paused&&!audio.ended&&audio.readyState>=3 && audio.closest(".week-card")?.open;});
    return playing ? Number(playing.dataset.podcastWeek) : 0;
  }
  function current() {
    if(!student||document.visibilityState!=="visible" || !document.hasFocus()) return 0;
    var media=video(); if(media>=1&&media<=14) return (progress[media]||0)<TARGET?media:0;
    if(Date.now()-lastActivity>120000) return 0;
    var card=document.querySelector('.week-card[data-week="'+selectedWeek+'"]');
    if(!card||!card.open||card.hidden||(progress[selectedWeek]||0)>=TARGET) return 0;
    var rect=card.getBoundingClientRect();return rect.bottom>80&&rect.top<innerHeight-40?selectedWeek:0;
  }
  async function update() {
    if(busy||!student) return;busy=true;
    try {var week=current(); if(week!==activeWeek){if(activeWeek)await call("heartbeat",{week:activeWeek,token:token,active:false});activeWeek=0;token="";if(week){activeWeek=week;token=crypto.randomUUID();}}
      if(activeWeek){var result=await call("heartbeat",{week:activeWeek,token:token,active:true});progress[activeWeek]=result.seconds;syncCompletion();}render();
    }catch(_){activeWeek=0;token="";render(words().unavailable);}finally{busy=false;}
  }
  function activity(event) {lastActivity=Date.now();var card=event.target?.closest?.(".week-card[data-week]");if(card)selectedWeek=Number(card.dataset.week)||selectedWeek;}
  function init(){
    selectedWeek=window.CourseApp?.state.openWeek||1;
    inject();
    window.addEventListener("course-language-change",function(){render();});
    window.addEventListener("course-view-change",function(event){selectedWeek=event.detail.week;render();});
    if(mirror)return;
    load();["pointerdown","keydown","wheel","touchstart","scroll"].forEach(function(name){document.addEventListener(name,activity,{capture:true,passive:name!=="keydown"});});document.addEventListener("toggle",function(event){var card=event.target?.closest?.(".week-card[data-week]");if(card&&card.open)selectedWeek=Number(card.dataset.week)||selectedWeek;},true);document.addEventListener("click",function(event){var button=event.target?.closest?.(".play-ai-video[data-ai-week]");if(button){selectedWeek=Number(button.dataset.aiWeek);var player=document.querySelector("#aiVideoPlayer");if(player)player.dataset.spWeek=String(selectedWeek);}});document.addEventListener("course:youtube-playback",function(event){var detail=event.detail||{};youtubePlaying=!!detail.playing&&detail.active!==false;youtubeWeek=Number(detail.week)||0;if(youtubeWeek)selectedWeek=youtubeWeek;});document.addEventListener("course:quiz-result",function(event){if(student)call("quiz",event.detail).catch(function(){render(words().unavailable);});});document.addEventListener("visibilitychange",update);window.addEventListener("focus",update);window.addEventListener("blur",update);setInterval(update,10000);setInterval(load,60000);}
  window.StudentPortal={startWeek:function(week){selectedWeek=Number(week)||1;render();},showAssignment:function(week){selectedWeek=Number(week)||1;location.href=selectedRoute(studentPath);},refresh:load};
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();
