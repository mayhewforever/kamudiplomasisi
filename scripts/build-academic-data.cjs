// Export the existing bilingual readings without translating or duplicating source prose.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const candidate = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve(__dirname, '..');
const root = fs.existsSync(path.join(candidate,'learning')) ? candidate : path.join(candidate,'public','course');
const context = {window: {}};
vm.createContext(context);
for (const file of ['content_weeks_1_5.js','content_weeks_6_10.js','content_weeks_11_14.js','weekly-study-guide.js','seminar-frames.js']) {
  vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context);
}
const data={};
for(let week=1;week<=14;week++) {
  const brief=JSON.parse(fs.readFileSync(path.join(root,'learning',`week-${String(week).padStart(2,'0')}.json`),'utf8'));
  const study=context.window.COURSE_STUDY[week], guide=context.window.WEEKLY_STUDY_GUIDES[week];
  data[week]={week};
  for(const lang of ['tr','en']) {
    const s=lang==='en'?study.en:study;
    data[week][lang]={title:brief[lang].title,lead:s.lead,sections:s.sections,keyTakeaways:s.keyTakeaways,discussionQuestions:s.discussionQuestions,
      frame:context.window.GRADUATE_SEMINAR_FRAMES[lang][week],
      book:guide[lang==='en'?'bookEN':'bookTR'],task:guide[lang],
      references:guide.texts.map(r=>({title:r.title,url:r.url,assignment:r[lang],summary:r[lang==='en'?'summaryEN':'summaryTR']}))};
  }
}
fs.writeFileSync(path.join(root,'learning','academic-readings.json'),JSON.stringify(data,null,2)+'\n');
console.log('Exported 14 bilingual academic readings and source guides.');
