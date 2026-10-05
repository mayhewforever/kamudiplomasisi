// Build the shared bilingual guide and add the Turkish guide to the existing notes.
// Usage: node scripts/build-beginner-notes.cjs [course-directory]
const fs=require('node:fs');
const path=require('node:path');
const root=process.argv[2]?path.resolve(process.argv[2]):path.resolve(__dirname,'..');
const {render,labels}=require(path.join(root,'learning-guide.js'));
const data={};
for(let week=1;week<=14;week++){
 const padded=String(week).padStart(2,'0');
 const doc=JSON.parse(fs.readFileSync(path.join(root,'learning','week-'+padded+'.json'),'utf8'));
 if(doc.week!==week||!doc.tr||!doc.en)throw new Error('Invalid week '+week);
 data[week]=doc;
 const file=path.join(root,'notes','Hafta_'+padded+'_Ders_Notu_TR.html');
 let html=fs.readFileSync(file,'utf8');
 html=html.replace(/<!-- BEGINNER START -->[\s\S]*?<!-- BEGINNER END -->/g,'');
 html=html.replace(/<!-- DEEP START -->[\s\S]*?<!-- DEEP CONTENT -->/g,'').replace(/<!-- DEEP CLOSE -->[\s\S]*?<!-- DEEP END -->/g,'');
 html=html.replace(/<!-- BEGINNER CSS -->[\s\S]*?<!-- BEGINNER CSS END -->/g,'');
 html=html.replace(/<!-- BEGINNER SCRIPT -->[\s\S]*?<!-- BEGINNER SCRIPT END -->/g,'');
 html=html.replace('</head>','<!-- BEGINNER CSS --><link rel="stylesheet" href="../learning-guide.css?v=20261005-learning1"><!-- BEGINNER CSS END --></head>');
 const guide=render(doc,'tr','../');
 html=html.replace('<main>','<main><!-- BEGINNER START -->'+guide+'<!-- BEGINNER END --><!-- DEEP START --><details class="lg-deep" id="deep-reading"><summary>'+labels.tr.deeper+' · 30 bölüm</summary><p class="lg-deep-intro">'+labels.tr.deeperHelp+'</p><!-- DEEP CONTENT -->');
 html=html.replace('</main>','<!-- DEEP CLOSE --></details><!-- DEEP END --></main>');
 html=html.replace('class="skip" href="#seminar"','class="skip" href="#learning-start-'+week+'"');
 html=html.replace(/<summary>İçindekiler · 30 bölüm<\/summary>/,'<summary>Öğrenme rehberi</summary>');
 html=html.replace(/<nav aria-label="Ders notu içindekiler">([\s\S]*?)<\/nav>/,function(_,old){
   let advanced=old.match(/<!-- ORIGINAL TOC -->([\s\S]*?)<!-- ORIGINAL TOC END -->/);
   const original=advanced?advanced[1]:old;
   const basic=['Ana fikir','Dört temel kavram','Adımlar ve görsel şema','Çözülmüş örnek','Kontrol ve Excel uygulaması'];
   const ids=['idea','terms','steps','example','practice'];
   return '<nav aria-label="Ders notu içindekiler"><ol class="lg-toc-basics">'+basic.map((name,i)=>'<li><a href="#learning-'+week+'-'+ids[i]+'">'+name+'</a></li>').join('')+'</ol><details class="lg-toc-advanced"><summary>Ayrıntılı okuma · 30 bölüm</summary><!-- ORIGINAL TOC -->'+original+'<!-- ORIGINAL TOC END --></details></nav>';
 });
 html=html.replace('download>PDF indir ↓','download>Ayrıntılı PDF indir ↓');
 html=html.replace('</body>','<!-- BEGINNER SCRIPT --><script src="../learning-guide.js?v=20261005-learning1"></script><!-- BEGINNER SCRIPT END --></body>');
 fs.writeFileSync(file,html);
}
fs.writeFileSync(path.join(root,'learning-content.js'),'/* Beginner learning guides. Edit learning/week-XX.json and run scripts/build-beginner-notes.cjs. */\nwindow.COURSE_BEGINNER = '+JSON.stringify(data,null,2)+';\n');
console.log('Built 14 bilingual beginner guides and updated 14 Turkish reading pages.');
