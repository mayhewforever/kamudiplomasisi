(function(){
 'use strict';
 const week=Number(document.body.dataset.noteWeek),lang=document.documentElement.lang==='en'?'en':'tr',secure='https://kamu-diplomasisi-yumusak-guc.mtoman.chatgpt.site',status=document.getElementById('studyStatus');
 if(!status||!week)return;
 const l=lang==='en'?{secure:'Read on the secure course site to record study time',profile:'Complete your student profile to record study time',login:'Sign in to record study time',active:'Active reading time is being saved to your account.',paused:'Timer paused; it resumes when you continue reading.',offline:'Connection unavailable; the study timer is paused.'}:{secure:'Çalışma süresini kaydetmek için güvenli ders sitesinde oku',profile:'Çalışma süresini kaydetmek için öğrenci profilini tamamla',login:'Çalışma süresini kaydetmek için giriş yap',active:'Etkin okuma süresi hesabınıza kaydediliyor.',paused:'Süre duraklatıldı; okumaya devam edince yeniden başlar.',offline:'Bağlantı yok; süre kaydı duraklatıldı.'};
 function link(text,url){status.textContent='';const a=document.createElement('a');a.textContent=text+' ↗';a.href=url;status.append(a);}
 if(location.origin!==secure){link(l.secure,secure+'/course/notes/'+location.pathname.split('/').pop());return;}
 let enrolled=false,token='',busy=false,lastActivity=Date.now();
 const active=()=>document.visibilityState==='visible'&&document.hasFocus()&&Date.now()-lastActivity<120000;
 async function request(action,body){const r=await fetch('/api/portal?action='+action,{method:body?'POST':'GET',headers:body?{'Content-Type':'application/json','X-Course-Portal':'1'}:undefined,body:body?JSON.stringify(body):undefined,credentials:'same-origin',cache:'no-store'});if(!r.ok)throw Error(String(r.status));return r.json();}
 async function tick(){if(!enrolled||busy)return;busy=true;try{const studying=active();if(studying&&!token)token=crypto.randomUUID();if(token){await request('heartbeat',{week,token,active:studying});if(!studying)token='';}status.textContent=studying?l.active:l.paused;}catch(e){token='';status.textContent=l.offline;}finally{busy=false;}}
 ['pointerdown','keydown','wheel','touchstart','scroll'].forEach(name=>document.addEventListener(name,()=>{lastActivity=Date.now();},{passive:name!=='keydown'}));
 document.addEventListener('visibilitychange',tick);window.addEventListener('focus',tick);window.addEventListener('blur',tick);
 request('me').then(data=>{enrolled=!!data.profile;if(!enrolled){link(l.profile,secure+'/student?week='+week);return;}tick();setInterval(tick,10000);}).catch(()=>link(l.login,secure+'/student?week='+week));
})();
