/* The syllabus is the source of course requirements; long readings remain available. */
(function () {
  'use strict';
  var app = window.CourseApp;
  var copy = {
    tr: {
      courseLead: 'Kamu diplomasisi ve yumuşak gücü tarihsel örneklerle öğrenin. Her hafta ders notunu okuyun, kaynakları inceleyin ve kısa bir kanıt notu hazırlayın.',
      courseWorkspace: 'Her hafta üç adım', snapshotText: 'Ders notu ve kaynak okuması temel çalışmadır. Video, podcast, kartlar, test ve oyun isteğe bağlıdır.',
      courseMapTitle: 'Haftanı seç', courseMapText: 'Bir numaraya dokunarak o haftanın dersini açın.',
      programmeDescription: 'Haftayı açın. Önce ders notunu, ardından “Kaynaklar ve ödev” bölümünü inceleyin.',
      studySuggestion: '<strong>Haftalık görev:</strong> En az bir kaynağa dayalı 250–400 kelimelik kanıt notu veya 1–2 slayt/tablo hazırlayın. Ödevinizi öğrenci alanında etkin süre 120:00’a ulaşmadan yükleyin.',
      syllabusTitle: 'Ders planı ve değerlendirme', syllabusIntro: '14 hafta · 5 öğrenme çıktısı · Türkçe ve İngilizce. 18 Ekim 2026 tarihli ders izlencesine göre düzenlenmiştir.',
      lessonTab: 'Ders notu', resourcesTab: 'Kaynaklar ve ödev', flashcardsTab: 'Kartlar', quizTab: 'Mini test', gameTab: 'Oyun',
      navSyllabus: 'Ders planı', navDownloads: 'Materyaller', stepRead: 'Ders notunu oku', stepSource: 'Kaynağı incele', stepAssignment: 'Ödevini hazırla',
      courseAim: 'Dersin amacı', courseContent: 'Dersin kapsamı', courseMethods: 'Ders nasıl işlenir?', coursePrinciples: 'Kaynakları nasıl kullanmalısınız?',
      policyDetails: 'Süre ve puanlama ayrıntıları', optionalMedia: 'Video ve podcast · isteğe bağlı', optionalPractice: 'Kartlar, mini test ve oyun isteğe bağlı tekrar araçlarıdır.',
      overviewLabel: 'Bu hafta ne öğreneceksiniz?', noteLink: 'Tam ders notunu oku', pdfLink: 'Ders notu PDF', readExamples: 'Kavramlar ve açıklamalı örnekler', readDepth: 'Ayrıntılı açıklamalar ve vaka analizleri', readAcademic: 'Akademik tartışma ve sorular',
      requiredReading: '2. Kaynağı incele', requiredReadingHelp: 'Kitap seçkisini ve aşağıdaki metinleri ders notuyla birlikte okuyun.',
      assignmentTitle: '3. Kanıt notunu hazırla ve yükle', assignmentHelp: '250–400 kelime veya 1–2 slayt/tablo. En az bir haftalık kaynak kullanın. Belgeyi, iddianızı, rakip açıklamayı ve kanıtın sınırını belirtin.',
      assignmentDeadline: 'Ödevinizi birikimli etkin süre 120:00’a ulaşmadan yükleyin. Zamanında ödev yoksa haftanın dönemlik katkısı 0 olur.',
      assignmentLink: 'Ödev teslim alanını aç', trackingLink: 'Süre kaydıyla çalış', trackingHelp: 'Bu açık sitede süre kaydedilmez. Süre kaydı ve ödev teslimi için hesabınızla öğrenci alanına geçin.',
      preparation: 'Dersten önce', practice: 'Sınıf içi uygulama', seminarDetail: 'Araştırma sorusu ve kaynak eleştirisi',
      learningLabel: 'Öğrenme çıktıları', timeLabel: 'Portal hedefi: 120 etkin dakika', contactLabel: 'Ders saati', unspecifiedHours: 'Diğer haftaların ders saatleri izlencede belirtilmemiştir.',
      optionalSource: 'Tamamlayıcı okuma', mediaTitle: 'Video, podcast ve diğer tekrar araçları',
      mainText: 'Ana kitap seçkisi', originalText: 'Haftalık kaynaklar', syllabusVersion: 'İzlence: 18 Ekim 2026',
      flowVideo: 'Tartışma', flowVideoText: 'iddia, kanıt ve eksik bağlantılar',
      portalPolicyStorage: 'Süre ve ödev kaydı öğrenci hesabında tutulur. Portal Hitit Üniversitesi’nin resmî not sistemi değildir; resmî notlar kurumsal doğrulama ve onay gerektirir.',
      optionalLibrary: 'Tamamlayıcı karşılaştırma örnekleri', printPdf: 'İzlenceyi yazdır',
      scoreBrief: 'Haftalık portal çalışması %30, katılım %20, grup sunumu %20, final vaka notu %30. Bunlar izlencedeki önerilen ağırlıklardır.'
    },
    en: {
      courseLead: 'Study public diplomacy and soft power through historical examples. Read the lecture note, examine the sources and prepare a short evidence brief each week.',
      courseWorkspace: 'Three steps each week', snapshotText: 'Lecture notes and assigned sources are the core work. Videos, podcasts, flashcards, quizzes and games are optional.',
      courseMapTitle: 'Choose your week', courseMapText: 'Select a number to open that week’s lesson.',
      programmeDescription: 'Open a week. Start with the lecture note, then use “Sources and assignment”.',
      studySuggestion: '<strong>Weekly task:</strong> Prepare a 250–400-word evidence brief or 1–2 slides/a table using at least one weekly source. Upload it in the student workspace before active time reaches 120:00.',
      syllabusTitle: 'Course plan and assessment', syllabusIntro: '14 weeks · 5 learning outcomes · Turkish and English. Aligned with the course syllabus dated 18 October 2026.',
      lessonTab: 'Lecture note', resourcesTab: 'Sources and assignment', flashcardsTab: 'Flashcards', quizTab: 'Mini quiz', gameTab: 'Game',
      navSyllabus: 'Course plan', navDownloads: 'Materials', stepRead: 'Read the lecture note', stepSource: 'Examine the source', stepAssignment: 'Prepare your assignment',
      courseAim: 'Course aim', courseContent: 'Course scope', courseMethods: 'How the class works', coursePrinciples: 'How to use sources',
      policyDetails: 'Time and scoring details', optionalMedia: 'Video and podcast · optional', optionalPractice: 'Flashcards, the mini quiz and game are optional review tools.',
      overviewLabel: 'What will you learn this week?', noteLink: 'Read the full lecture note', pdfLink: 'Lecture note PDF', readExamples: 'Concepts and worked examples', readDepth: 'Detailed explanations and case studies', readAcademic: 'Academic discussion and questions',
      requiredReading: '2. Examine the source', requiredReadingHelp: 'Read the assigned book selection and the texts below alongside the lecture note.',
      assignmentTitle: '3. Prepare and upload your evidence brief', assignmentHelp: '250–400 words or 1–2 slides/a table. Use at least one weekly source. Identify the document, your claim, a rival explanation and the limits of the evidence.',
      assignmentDeadline: 'Upload before cumulative active time reaches 120:00. Without an on-time assignment, that week contributes 0 to the course component.',
      assignmentLink: 'Open assignment submission', trackingLink: 'Study with time tracking', trackingHelp: 'Time is not recorded on this open site. Sign in to the student workspace to record time and submit assignments.',
      preparation: 'Before class', practice: 'In-class activity', seminarDetail: 'Research question and source criticism',
      learningLabel: 'Learning outcomes', timeLabel: 'Portal target: 120 active minutes', contactLabel: 'Class time', unspecifiedHours: 'Class times for the other weeks are not specified in the syllabus.',
      optionalSource: 'Supplementary reading', mediaTitle: 'Videos, podcasts and other review tools',
      mainText: 'Assigned book selection', originalText: 'Weekly sources', syllabusVersion: 'Syllabus: 18 October 2026',
      flowVideo: 'Discussion', flowVideoText: 'claims, evidence and missing links',
      portalPolicyStorage: 'Study time and assignments are recorded in the student account. This portal is not Hitit University’s official gradebook; official grades require institutional verification and approval.',
      optionalLibrary: 'Additional comparative examples', printPdf: 'Print syllabus',
      scoreBrief: 'Weekly portal work 30%, participation 20%, group presentation 20%, final case brief 30%. These are the suggested weights in the syllabus.'
    }
  };
  ['tr', 'en'].forEach(function (lang) {
    var data = window.COURSE_SYLLABUS[lang];
    Object.assign(app.UI_TEXT[lang], copy[lang]);
    data.outcomes.forEach(function (text, i) { app.UI_TEXT[lang]['outcome' + (i + 1)] = text; });
    delete app.UI_TEXT[lang].outcome6;
    var overview = window.SITE_UI_I18N_PROPOSAL[lang];
    overview.syllabus.outcomes = data.outcomes.slice();
    data.weeks.forEach(function (week) {
      var item = overview.weeklyOverview['week-' + String(week.week).padStart(2, '0')];
      Object.assign(item, {title: week.title, summary: week.summary, activity: week.activity, prep: week.prep});
    });
  });
  function e(s) { return String(s || '').replace(/[&<>"']/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function weekData(week) { return window.COURSE_SYLLABUS[app.state.language].weeks[week - 1]; }
  function notePath(week) { return 'notes/' + (app.state.language === 'en' ? 'Week_' + String(week).padStart(2,'0') + '_Lecture_Notes_EN' : 'Hafta_' + String(week).padStart(2,'0') + '_Ders_Notu_TR'); }
  function lessonStart(week) {
    var d = weekData(week), lang = app.state.language;
    var link = '?lang=' + lang + '&week=' + week + '&tab=resources#week-' + String(week).padStart(2, '0');
    var prefix = lang === 'en' ? 'LO ' : 'ÖÇ ';
    return '<div class="week-start"><p class="study-kicker">' + e(app.t('overviewLabel')) + '</p><h3>' + e(d.summary) + '</h3><p class="week-meta">' + e(app.t('learningLabel')) + ': ' + d.outcomes.map(function (n) { return '<a href="#izlence" title="' + e(window.COURSE_SYLLABUS[lang].outcomes[n-1]) + '">' + prefix + n + '</a>'; }).join(' · ') + ' <span>· ' + e(app.t('timeLabel')) + '</span>' + (d.hours ? '<span> · ' + e(app.t('contactLabel')) + ': ' + d.hours + '</span>' : '') + '</p><ol class="weekly-steps"><li><strong>1. ' + e(app.t('stepRead')) + '</strong><div class="weekly-note-actions"><a href="' + notePath(week) + '.html">' + e(app.t('noteLink')) + ' →</a><a href="' + notePath(week) + '.pdf">' + e(app.t('pdfLink')) + ' ↓</a></div></li><li><strong>2. ' + e(app.t('stepSource')) + '</strong><a href="' + link + '" data-study-link="resources" data-study-week="' + week + '">' + e(app.t('resourcesTab')) + ' →</a></li><li><strong>3. ' + e(app.t('stepAssignment')) + '</strong><p>' + e(app.t('assignmentHelp')) + '</p></li></ol><p class="assignment-deadline">' + e(app.t('assignmentDeadline')) + '</p></div>';
  }
  function renderSyllabus() {
    var data = window.COURSE_SYLLABUS[app.state.language], target = document.getElementById('syllabusSummary');
    if (target) target.innerHTML = '<p>' + e(data.aim) + '</p><details class="simple-details"><summary>' + e(app.t('centralQuestion')) + '</summary><p>' + app.t('centralQuestionText') + '</p></details>' + [['courseContent','content'],['courseMethods','methods'],['coursePrinciples','principles']].map(function (pair) { return '<details class="simple-details"><summary>' + e(app.t(pair[0])) + '</summary><p>' + e(data[pair[1]]) + '</p></details>'; }).join('');
    document.querySelectorAll('[data-optional-nav]').forEach(function (node) { node.textContent = app.t('optionalPractice'); });
  }
  window.CourseSimple = {weekData:weekData, notePath:notePath, lessonStart:lessonStart, renderSyllabus:renderSyllabus};
  document.addEventListener('click', function (event) {
    var link = event.target.closest('[data-study-link]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    window.CourseSite.openWeek(Number(link.dataset.studyWeek), link.dataset.studyLink, true);
    var tab = document.getElementById('week-' + link.dataset.studyWeek + '-' + link.dataset.studyLink + '-tab');
    if (tab) tab.focus({preventScroll:true});
  });
  app.subscribe(renderSyllabus);
  document.addEventListener('DOMContentLoaded', renderSyllabus);
})();
