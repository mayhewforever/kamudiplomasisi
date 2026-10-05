(function () {
  "use strict";

  var STORAGE_KEY = "hitit-public-diplomacy-course-v3";
  var validLanguages = ["tr", "en"];
  var validTabs = ["lesson", "flashcards", "quiz", "game", "resources"];

  var UI_TEXT = {
    tr: {
      pageTitle: "Kamu Diplomasisi ve Yumuşak Güç | Hitit Üniversitesi",
      pageDescription: "Hitit Üniversitesi Kamu Diplomasisi ve Yumuşak Güç lisansüstü dersi: Dr Murat Toman'ın 14 haftalık ayrıntılı Türkçe ders notları, akademik tartışmalar, görsel şemalar, kaynak okumaları ve uygulamaları.",
      skipLink: "İçeriğe geç",
      homeLabel: "Ders portalı ana sayfa",
      university: "Hitit Üniversitesi",
      courseShort: "Kamu Diplomasisi ve Yumuşak Güç",
      menuOpen: "Menüyü aç veya kapat",
      mainNavigation: "Ana menü",
      languageSelection: "Dil seçimi",
      navOverview: "Genel bakış",
      navWeeks: "Haftalar",
      navSyllabus: "İzlence",
      navResources: "Kaynaklar",
      navDownloads: "Materyaller",
      printPdf: "Yazdır / PDF",
      courseEyebrow: "Hitit Üniversitesi · Lisansüstü Ders",
      courseTitle: "Kamu Diplomasisi ve Yumuşak Güç",
      courseLead: "Güç kavramlarından Benjamin Franklin’e; kamu-özel ortaklıklarından savaş zamanı bilgi kurumlarına uzanan etkileşimli bir tarih ve analiz dersi.",
      courseFeatures: "Dersin temel özellikleri",
      metaWeeks: "14 hafta",
      metaBilingual: "Türkçe + English",
      metaInteractive: "Etkileşimli çalışma",
      metaLevel: "Lisansüstü",
      startCourse: "Derse başla",
      continueCourse: "Kaldığın yerden devam et",
      yourProgress: "Çalışma ilerlemeniz",
      courseWorkspace: "Ders çalışma alanı",
      snapshotText: "Her hafta ders notunu ve atanan özgün kuramsal metni veya tarihsel belgeyi inceleyin; portalda 120 etkin dakikalık hedef ve kısa kanıt ödevi bulunur. Video, podcast, kart ve oyunlar tekrar desteğidir.",
      completedWeeks: "Tamamlanan haftalar",
      weeksLabel: "hafta",
      cardsLabel: "kart / dil",
      questionsLabel: "soru / dil",
      gamesLabel: "oyun",
      resetProgress: "Çalışma araçlarını sıfırla",
      resetConfirm: "Flashcard, mini test, oyun ve açık sekme durumunu bu tarayıcıdan silmek istediğinizden emin misiniz? Öğrenci hesabı, etkin süre ve ödevler silinmez.",
      resetDone: "Çalışma araçlarının yerel durumu sıfırlandı; öğrenci hesabı, etkin süre ve ödevler korundu.",
      courseMapKicker: "Dönem haritası",
      courseMapTitle: "On dört haftayı tek bakışta görün",
      courseMapText: "Bir hafta seçerek doğrudan çalışma alanına gidin. Giriş yaptığınızda tamamlanan haftalar hesabınızda gösterilir.",
      courseMapNavigation: "Haftalık ders haritası",
      centralQuestionLabel: "Dersin ana sorusu",
      centralQuestion: "Dersin ana sorusu",
      centralQuestionText: "Bir aktör yabancı bir kamuyla <strong>hangi kaynak</strong>, <strong>hangi araç</strong> ve <strong>hangi mekanizma</strong> üzerinden ilişki kurar; bu ilişkiyi bir politika sonucuyla bağlamak için <strong>hangi kanıt</strong> gerekir?",
      courseFlow: "Ders akışı",
      fourteenWeekProgramme: "14 haftalık program",
      programmeDescription: "Her haftanın çekirdeği ayrıntılı Türkçe akademik ders notu ile özgün kuramsal metin veya tarihsel belge incelemesidir. Kanıt notu seminer tartışmasını hazırlar; video, podcast, kavram kartları, test ve oyun isteğe bağlı öz denetim araçlarıdır.",
      searchLabel: "Ders içeriğinde ara",
      searchPlaceholder: "Örn. Franklin, propaganda, OWI",
      searchBothLanguages: "İki dilde ara",
      filterWeeks: "Haftaları konuya göre filtrele",
      filterAll: "Tümü",
      filterConcept: "Kavram",
      filterHistory: "Tarih",
      filterInstitutions: "Kurumlar",
      filterComparison: "Karşılaştırma",
      searchResults: "Arama sonuçları",
      studySuggestion: "<strong>Çalışma önerisi:</strong> Önce ayrıntılı ders notunu ve haftanın özgün kuramsal metnini veya tarihsel belgesini çözümleyin; ardından kanıt ödevini 120:00’a ulaşmadan yükleyin. Video, podcast, kart, test ve oyunları ihtiyaç duyduğunuz kavramlar için kullanın. Etkin süre hedefi lisansüstü araştırmanın tamamını ölçmez.",
      noResults: "Aramanızla eşleşen içerik bulunamadı.",
      historicalGallery: "Tarihsel belge galerisi",
      franklinPrintAlt: "Franklin’in bilimsel itibarı ile özgürlük fikrini ilişkilendiren 1778 tarihli alegorik baskı",
      franklinPrintCaption: "İtibar bir kaynaktır; etki ise ayrıca kanıtlanmalıdır.",
      sourceLiteracy: "Kaynak okuryazarlığı",
      sourceLiteracyTitle: "Görünürlük, alımlama ve sonuç aynı şey değildir.",
      sourceLiteracyText: "Portre, gazete, mektup ve antlaşma farklı sorulara cevap verir. Ders boyunca kaynaklar niyet, faaliyet, yabancı alımlama, karar süreci ve gözlenebilir sonuç düzeylerinde ayrıştırılır.",
      treatyAlt: "1778 Fransa-Amerika antlaşmalarının imzalanmasını gösteren tarihî baskı",
      treatyCaption: "Bir sonuç belgesi, sonucun tek nedenini göstermez.",
      syllabusEyebrow: "Ders izlencesi",
      syllabusTitle: "Kaynağa dayalı lisansüstü seminer",
      syllabusIntro: "Her hafta kuramsal bir iddiayı tarihsel belgeyle sınayın; aktörün niyetini, yabancı alımlamayı, rakip açıklamayı ve kanıt sınırını ayırın. Portalın 120 dakikalık etkin süre hedefi seminer hazırlığının tamamını ölçmez.",
      learningOutcomes: "Öğrenme çıktıları",
      outcome1: "Sert, yumuşak ve akıllı güç arasındaki farkı açıklamak.",
      outcome2: "Kamu diplomasisini propaganda, diplomasi ve halkla ilişkilerden ayırmak.",
      outcome3: "Tarihsel vakalarda hedef kitle, araç ve mekanizmayı belirlemek.",
      outcome4: "Faaliyet, alımlama ve politika sonucu arasındaki kanıt zincirini kurmak.",
      outcome5: "Devlet ve devlet dışı aktörlerin rollerini karşılaştırmak.",
      outcome6: "Bir kamu diplomasisi uygulamasını etik ve ölçüm açısından değerlendirmek.",
      sessionRhythm: "Her dersin ritmi",
      flowFrame: "Çerçeve",
      flowFrameText: "kısa kavramsal giriş",
      flowSourceLab: "Kaynak laboratuvarı",
      flowSourceLabText: "metin, görsel veya belge",
      flowVideo: "Video ve tartışma",
      flowVideoText: "iddia ve eksik kalan neden",
      flowWorkshop: "Atölye",
      flowWorkshopText: "harita, denetim veya mini vaka",
      flowExit: "Çıkış bileti",
      flowExitText: "tek cümlelik temkinli sonuç",
      flowAssignment: "Haftalık ödev",
      flowAssignmentText: "250–400 kelimelik kanıt notu; 120:00’dan önce yükleme",
      assessment: "Önerilen değerlendirme",
      assessmentWeekly: "Haftalık portal çalışması ve zamanında ödevler · 14 × 10 puan",
      assessmentParticipation: "Katılım ve sınıf atölyeleri",
      assessmentPresentation: "Grup vaka sunumu · 10 dakika",
      assessmentFinal: "Final vaka notu · 1.200–1.500 kelime",
      preparationTarget: "Her 12 etkin dakika 1 puandır; haftalık puanın geçerli olması için ödev birikimli süre 120:00’a ulaşmadan yüklenmelidir.",
      portalPolicyTitle: "Haftalık portal çalışma politikası",
      portalPolicyIntro: "Ders notu ve özgün kuramsal metin veya tarihsel belge okuması çekirdektir; kart, test, oyun, video ve podcast tekrar araçlarıdır. Portalda yapılan etkin çalışma tek bir birikimli sürede izlenir.",
      portalPolicyTime: "Süre hedefi",
      portalPolicyTimeText: "Her hafta, oturumlar arasında birikebilen 120 etkin dakika. Süre yalnız sayfa görünür ve pencere odaktayken işler; iki dakika etkileşim olmazsa duraklar. Görünür video veya podcast oynarken kesintisiz sayılır.",
      portalPolicyScore: "Zaman puanı",
      portalPolicyScoreText: "Her 12 etkin dakika 1 puandır; puan 10’da durur ve iki ondalık basamakla gösterilir. Formül: min(10, etkin saniye ÷ 7200 × 10). Örnek: 60 dakika 5,00; 90 dakika 7,50; 120 dakika 10,00.",
      portalPolicyAssignment: "Haftalık ödev",
      portalPolicyAssignmentText: "En az bir haftalık kaynağa dayalı 250–400 kelimelik kanıt notu veya 1–2 slayt/tablo eşdeğeri, birikimli etkin süre 120:00’a ulaşmadan yüklenir. Ödev panelindeki etkin çalışma aynı süreye dâhildir.",
      portalPolicyValidity: "Puanın geçerliliği",
      portalPolicyValidityText: "Ekrandaki zaman puanı yalnız etkin süreye göre hesaplanır ve ödev yüklenene kadar geçicidir. Zamanında ödev yoksa haftanın dönemlik katkısı 0’dır.",
      portalPolicyCompletion: "Tamamlama ölçütü",
      portalPolicyCompletionText: "Bir hafta, yalnızca 120 etkin dakika tamamlandığında ve ödev zamanında yüklendiğinde ‘tamamlandı’ sayılır. Zamanında ödev yükleyip 120 dakikadan az çalışan öğrenci oransal puanını alır; hafta henüz tamamlanmış görünmez.",
      portalPolicyConversion: "Dönem notuna dönüşüm",
      portalPolicyConversionText: "Portal katkısı = (14 geçerli haftalık puanın toplamı ÷ 140) × 30. Böylece bu bölüm dönem notunun en çok 30 puanını oluşturur.",
      portalPolicyStorage: "Öğrenci profili ve süreler sunucudaki veri tabanına, ödev dosyaları özel dosya deposuna kaydedilir; aynı hesapla farklı cihazlardan erişilebilir ve öğretim elemanı yönetici panelinden görebilir. Oturum ChatGPT hesabıyla açılır; öğrenci numarası öğrencinin beyanıdır. Bu alan Hitit Üniversitesi'nin resmî LMS/SSO veya not sistemi değildir; resmî not için kurumsal doğrulama ve onay gerekir.",
      footerAttribution: "Dr Murat Toman · Hitit Üniversitesi",
      comparativeWindow: "Karşılaştırmalı pencere",
      worldCases: "Dünyadan kısa vakalar",
      worldCasesText: "Bu kartlar başarı hikâyesi değil; aktör, araç, hedef kitle ve kanıt sınırı tartışmalarıdır.",
      resourceCentre: "Kaynak merkezi",
      readingsTitle: "Temel ve tamamlayıcı okumalar",
      readingsText: "Her hafta ayrı okuma verilmiştir. Aşağıdaki liste dönem boyunca başvurulacak ortak kitaplığı gösterir.",
      mainBook: "Ana eser",
      bookDescription: "Amerikan yabancı kamuoyu etkileşimini 1776’dan 1948’e uzanan altı tarihsel vaka üzerinden inceler.",
      bookLink: "Kitap ve bölüm bilgileri",
      accessNoteLabel: "Erişim notu:",
      accessNote: "Bazı kitap ve makaleler kurumsal abonelik gerektirebilir. Site yalnızca yasal yayıncı, DOI ve açık erişim bağlantılarını gösterir.",
      imageSourcesLabel: "Görsel kaynakları:",
      imageSourcesIntro: "Franklin portresi",
      treatyPrint: "1778 antlaşma baskısı",
      publicDomainImages: "Kamu malı tarihî görsellerdir.",
      courseMaterials: "Ders materyalleri",
      downloadsTitle: "Sunumlar ve çalışma dosyaları",
      downloadsText: "Her haftada ayrıntılı Türkçe web notu, PDF ve Excel uygulaması bulunur. Türkçe sunumları buradan indirin.",
      downloadWeek1Title: "1. Hafta · Gücü Anlamak",
      downloadWeek1Text: "Kavramsal çerçeve, sert güç, yumuşak güç ve mekanizmalar · 30 slayt",
      downloadWeek2Title: "2. Hafta · Kamu Diplomasisinden Önce",
      downloadWeek2Text: "Benjamin Franklin, Fransa ve yabancı kamuoylarıyla etkileşim · 30 slayt",
      syllabusDownload: "Ders izlencesi",
      syllabusDownloadText: "Programı, değerlendirmeyi ve kaynakları yazdırın veya PDF olarak kaydedin.",
      academicPrinciple: "Akademik çalışma ilkesi",
      academicPrincipleText: "Bir belgeyi gördüğümüz için etkisini varsaymayız. İddiaları kaynağın gerçekten gösterdiği düzeyle sınırlarız; niyet, faaliyet, alımlama, karar ve sonuç kanıtlarını birbirinden ayırırız.",
      backToTop: "Başa dön",
      closeVideo: "Videoyu kapat",
      weeklyVideo: "Haftanın videosu",
      openYouTube: "YouTube’da aç",
      youtubeCaptionHelp: "Türkçe altyazı tercih edilir. Görünmüyorsa YouTube ayarlarında Altyazılar → Otomatik çevir → Türkçe seçeneğini kontrol edin; kullanılabilirlik videoya bağlıdır.",
      week: "Hafta",
      weekLower: "hafta",
      lessonTab: "Ders notu",
      flashcardsTab: "Flashcard",
      quizTab: "10 soruluk mini test",
      gameTab: "Oyun",
      resourcesTab: "Haftalık çalışma",
      tabListLabel: "{week}. hafta çalışma alanları",
      weekPlan: "Bu hafta ne yapacağız?",
      classActivity: "Sınıf içi etkinlik",
      shortPreparation: "Kısa hazırlık:",
      youtubeEnglish: "YouTube · İngilizce",
      openVideo: "Videoyu aç",
      lessonNarrative: "Ders anlatımı",
      detailedTopic: "Haftanın ayrıntılı konu anlatımı",
      readingTime: "Kendi hızında oku",
      fiveTakeaways: "Beş temel çıkarım",
      discussInClass: "Derste tartışalım",
      activeRecall: "Aktif tekrar",
      flashcardHeading: "Kavramı düşünün, sonra kartı çevirin",
      flashcardInstruction: "Ezberlemekten önce kendi cevabınızı kurmaya çalışın.",
      tapForAnswer: "Cevabı görmek için dokunun",
      answer: "Yanıt",
      tapForQuestion: "Soruya dönmek için dokunun",
      cardsSeen: "{seen} / {total} kart görüldü",
      previousCard: "Önceki kart",
      nextCard: "Sonraki kart",
      shuffleCards: "Kartları karıştır",
      resetCards: "Kartları sıfırla",
      selfCheck: "Kendini kontrol et",
      quizHeading: "10 soruluk mini test",
      quizInstruction: "On sorunun tamamını yanıtlayın; her yanıttan sonra gerekçeyi okuyun.",
      questionProgress: "Soru {current} / {total}",
      previousQuestion: "Önceki soru",
      nextQuestion: "Sonraki soru",
      selectAnswer: "Önce bir yanıt seçin.",
      correctFeedback: "Doğru. Açıklamayı okuyun.",
      incorrectFeedback: "Bu yanıt doğru değil. Açıklamayı okuyun.",
      correctAnswer: "Doğru cevap:",
      checkAnswers: "Yanıtları kontrol et",
      solveAgain: "Yeniden çöz",
      answeredResult: "{answered} soru yanıtlandı. {correct} doğru. Boş bıraktığınız soruları da tamamlayın.",
      completeResult: "{total} soruda {correct} doğru. Açıklamaları okuyarak yanıtlarınızı değerlendirin.",
      weeklyGame: "Haftanın oyunu",
      matchingGame: "Kavram eşleştirme",
      matchingInstruction: "Önce bir kavramı, ardından ona karşılık gelen doğru açıklamayı seçin.",
      concepts: "Kavramlar",
      mixedDefinitions: "Karışık açıklamalar",
      gameStatus: "Doğru: {matches} / {total} · Deneme: {attempts}",
      gameComplete: "Tebrikler! Dört eşleştirmeyi {attempts} denemede tamamladınız.",
      correctMatch: "Doğru eşleşme. {matches} / {total} tamamlandı · Deneme: {attempts}",
      wrongMatch: "Bu eşleşme olmadı; yeniden deneyin. Doğru: {matches} / {total} · Deneme: {attempts}",
      restartGame: "Oyunu yeniden başlat",
      markComplete: "Tamamlanma durumunu gör",
      markedComplete: "Hafta tamamlandı",
      completionManagedInPortal: "{week}. haftanın süre, ödev ve tamamlanma durumu öğrenci alanında gösterilir.",
      printWeek: "Bu haftayı yazdır",
      evidenceLimit: "Kanıt sınırı:",
      inspectSource: "Kaynağı incele",
      publisherLink: "DOI / yayıncı",
      allWeeksShown: "14 haftanın tamamı gösteriliyor.",
      weeksShown: "{count} hafta gösteriliyor.",
      resultCount: "{count} sonuç bulundu",
      resultTypeLesson: "Ders notu",
      resultTypeCard: "Flashcard",
      resultTypeReading: "Okuma",
      resultTypeWeek: "Hafta özeti",
      openResult: "Sonucu aç",
      noSearchResults: "Bu aramayla eşleşen ayrıntılı içerik bulunamadı.",
      continueWeek: "{week}. haftaya devam et"
    },

    en: {
      pageTitle: "Public Diplomacy and Soft Power | Hitit University",
      pageDescription: "Public Diplomacy and Soft Power, a graduate course taught by Dr Murat Toman at Hitit University, with 14 weeks of detailed English lecture notes, academic discussion, visual diagrams, source readings and research exercises.",
      skipLink: "Skip to content",
      homeLabel: "Course portal home",
      university: "Hitit University",
      courseShort: "Public Diplomacy and Soft Power",
      menuOpen: "Open or close the menu",
      mainNavigation: "Main navigation",
      languageSelection: "Language selection",
      navOverview: "Overview",
      navWeeks: "Weeks",
      navSyllabus: "Syllabus",
      navResources: "Resources",
      navDownloads: "Downloads",
      printPdf: "Print / PDF",
      courseEyebrow: "Hitit University · Graduate Course",
      courseTitle: "Public Diplomacy and Soft Power",
      courseLead: "An interactive course in history and analysis, moving from concepts of power and Benjamin Franklin to public-private partnerships and wartime information institutions.",
      courseFeatures: "Core course features",
      metaWeeks: "14 weeks",
      metaBilingual: "Türkçe + English",
      metaInteractive: "Interactive study",
      metaLevel: "Graduate",
      startCourse: "Start the course",
      continueCourse: "Continue studying",
      yourProgress: "Your study progress",
      courseWorkspace: "Course workspace",
      snapshotText: "Examine the lecture notes and an assigned original theoretical text or historical document each week. The portal has a 120-minute active-study target and a short evidence assignment; video, podcast, cards and game support review.",
      completedWeeks: "Completed weeks",
      weeksLabel: "weeks",
      cardsLabel: "cards / language",
      questionsLabel: "questions / language",
      gamesLabel: "games",
      resetProgress: "Reset study tools",
      resetConfirm: "Remove the saved flashcard, mini-quiz, game and open-tab state from this browser? The student account, active time and assignments will not be deleted.",
      resetDone: "The local study-tool state was reset; the student account, active time and assignments were preserved.",
      courseMapKicker: "Course map",
      courseMapTitle: "Fourteen weeks at a glance",
      courseMapText: "Select a week to open its workspace. After sign-in, completed weeks appear in your account.",
      courseMapNavigation: "Weekly course map",
      centralQuestionLabel: "The course’s central question",
      centralQuestion: "The course’s central question",
      centralQuestionText: "Through <strong>which resource</strong>, <strong>which instrument</strong> and <strong>which mechanism</strong> does an actor engage a foreign public, and <strong>what evidence</strong> connects that engagement to a policy outcome?",
      courseFlow: "Course sequence",
      fourteenWeekProgramme: "Fourteen-week programme",
      programmeDescription: "The core of each week is a detailed academic note in English and an original theoretical text or historical document. An evidence brief prepares the seminar discussion; video, podcast, flashcards, quiz and game are optional self-check tools.",
      searchLabel: "Search course content",
      searchPlaceholder: "For example, Franklin, propaganda, OWI",
      searchBothLanguages: "Search both languages",
      filterWeeks: "Filter weeks by topic",
      filterAll: "All",
      filterConcept: "Concepts",
      filterHistory: "History",
      filterInstitutions: "Institutions",
      filterComparison: "Comparison",
      searchResults: "Search results",
      studySuggestion: "<strong>Study suggestion:</strong> Analyze the detailed lecture note and the assigned original theoretical text or historical document first, then upload the evidence assignment before the timer reaches 120:00. Use the video, podcast, cards, quiz and game to revisit difficult concepts. The active-time target does not measure all graduate research work.",
      noResults: "No course content matches your search.",
      historicalGallery: "Historical document gallery",
      franklinPrintAlt: "A 1778 allegorical print linking Franklin’s scientific reputation with the idea of liberty",
      franklinPrintCaption: "Reputation is a resource; its effect still requires evidence.",
      sourceLiteracy: "Source literacy",
      sourceLiteracyTitle: "Visibility, reception and outcomes are different things.",
      sourceLiteracyText: "A portrait, newspaper, letter and treaty answer different questions. Throughout the course, sources are separated according to intention, activity, foreign reception, decision process and observable outcome.",
      treatyAlt: "Historical print depicting the signing of the 1778 Franco-American treaties",
      treatyCaption: "An outcome document does not identify the outcome’s sole cause.",
      syllabusEyebrow: "Course syllabus",
      syllabusTitle: "A source-based graduate seminar",
      syllabusIntro: "Test a theoretical claim against a historical document each week. Distinguish actors' intentions, foreign reception, rival explanations and evidentiary limits. The portal's 120-minute active-time target does not measure all seminar preparation.",
      learningOutcomes: "Learning outcomes",
      outcome1: "Explain the differences among hard, soft and smart power.",
      outcome2: "Distinguish public diplomacy from propaganda, diplomacy and public relations.",
      outcome3: "Identify audiences, instruments and mechanisms in historical cases.",
      outcome4: "Construct an evidence chain from activity and reception to policy outcome.",
      outcome5: "Compare the roles of state and non-state actors.",
      outcome6: "Evaluate a public-diplomacy practice in terms of ethics and measurement.",
      sessionRhythm: "The rhythm of each class",
      flowFrame: "Framework",
      flowFrameText: "a short conceptual introduction",
      flowSourceLab: "Source laboratory",
      flowSourceLabText: "a text, image or document",
      flowVideo: "Video and discussion",
      flowVideoText: "the claim and the missing cause",
      flowWorkshop: "Workshop",
      flowWorkshopText: "a map, audit or mini case",
      flowExit: "Exit ticket",
      flowExitText: "one cautious concluding sentence",
      flowAssignment: "Weekly assignment",
      flowAssignmentText: "a 250–400-word evidence brief uploaded before 120:00",
      assessment: "Suggested assessment",
      assessmentWeekly: "Weekly portal study and on-time assignments · 14 × 10 points",
      assessmentParticipation: "Participation and class workshops",
      assessmentPresentation: "Group case presentation · 10 minutes",
      assessmentFinal: "Final case brief · 1,200–1,500 words",
      preparationTarget: "Every 12 active minutes earns 1 point; for the weekly score to be valid, the assignment must be uploaded before cumulative time reaches 120:00.",
      portalPolicyTitle: "Weekly portal study policy",
      portalPolicyIntro: "The notes and assigned original theoretical texts or historical documents are core reading; cards, quiz, game, video and podcast support review. Active work in the portal is tracked in one cumulative total.",
      portalPolicyTime: "Time target",
      portalPolicyTimeText: "120 active minutes each week, accumulated across sessions. Time runs only while the page is visible and the window has focus; it pauses after two minutes without interaction. A visible, playing video or podcast counts continuously.",
      portalPolicyScore: "Time score",
      portalPolicyScoreText: "Every 12 active minutes earns 1 point, capped at 10 and displayed to two decimal places. Formula: min(10, active seconds ÷ 7200 × 10). Examples: 60 minutes earns 5.00; 90 minutes 7.50; and 120 minutes 10.00.",
      portalPolicyAssignment: "Weekly assignment",
      portalPolicyAssignmentText: "A 250–400-word evidence brief, or a one- to two-slide/table equivalent, drawing on at least one weekly source must be uploaded before cumulative active time reaches 120:00. Active work in the assignment panel counts towards the same total.",
      portalPolicyValidity: "Score validity",
      portalPolicyValidityText: "The displayed time score is based only on active time and remains provisional until the assignment is uploaded. Without an on-time assignment, that week contributes 0 to the course component.",
      portalPolicyCompletion: "Completion rule",
      portalPolicyCompletionText: "A week is marked complete only after the student accumulates 120 active minutes and uploads the assignment on time. A student who uploads on time but studies for less than 120 minutes receives the proportional score, while the week remains incomplete.",
      portalPolicyConversion: "Course-grade conversion",
      portalPolicyConversionText: "Portal contribution = (sum of 14 valid weekly scores ÷ 140) × 30. This component therefore contributes up to 30 points to the final course grade.",
      portalPolicyStorage: "Student profiles and time records are saved in a server database and assignment files in private storage. The same account can access them across devices, and the instructor can view them in an authorised dashboard. Sign-in uses a ChatGPT account; student numbers are self-reported. This is not Hitit University's official LMS/SSO or gradebook; institutional verification and approval are needed for official grades.",
      footerAttribution: "Dr Murat Toman · Hitit University",
      comparativeWindow: "Comparative window",
      worldCases: "Brief cases from around the world",
      worldCasesText: "These cards are not success stories. They support discussion of actors, instruments, audiences and evidentiary limits.",
      resourceCentre: "Resource centre",
      readingsTitle: "Core and supplementary readings",
      readingsText: "Every week has a separate reading. The list below forms the shared library for the course.",
      mainBook: "Core book",
      bookDescription: "The book examines American foreign public engagement through six historical cases spanning 1776 to 1948.",
      bookLink: "Book and chapter information",
      accessNoteLabel: "Access note:",
      accessNote: "Some books and articles may require an institutional subscription. The site links only to lawful publisher, DOI and open-access pages.",
      imageSourcesLabel: "Image sources:",
      imageSourcesIntro: "Franklin portrait",
      treatyPrint: "1778 treaty print",
      publicDomainImages: "These are public-domain historical images.",
      courseMaterials: "Course materials",
      downloadsTitle: "Presentations and study files",
      downloadsText: "Each week has detailed English online notes, a PDF and Excel exercises. Download the English presentations here.",
      downloadWeek1Title: "Week 1 · Understanding Power",
      downloadWeek1Text: "Conceptual framework, hard power, soft power and mechanisms · 30 slides",
      downloadWeek2Title: "Week 2 · Before Public Diplomacy",
      downloadWeek2Text: "Benjamin Franklin, France and engagement with foreign publics · 30 slides",
      syllabusDownload: "Course syllabus",
      syllabusDownloadText: "Print or save the programme, assessment and resources as a PDF.",
      academicPrinciple: "Principle of academic work",
      academicPrincipleText: "We do not infer influence merely because a document exists. We limit claims to what the source can show and distinguish evidence of intention, activity, reception, decision and outcome.",
      backToTop: "Back to top",
      closeVideo: "Close video",
      weeklyVideo: "Weekly video",
      openYouTube: "Open on YouTube",
      youtubeCaptionHelp: "Turkish subtitles are requested. If they do not appear, check YouTube Settings → Subtitles/CC → Auto-translate → Turkish; availability depends on the video.",
      week: "Week",
      weekLower: "week",
      lessonTab: "Lesson",
      flashcardsTab: "Flashcards",
      quizTab: "10-question mini quiz",
      gameTab: "Game",
      resourcesTab: "Weekly study",
      tabListLabel: "Week {week} study areas",
      weekPlan: "What will we do this week?",
      classActivity: "Class activity",
      shortPreparation: "Short preparation:",
      youtubeEnglish: "YouTube · English",
      openVideo: "Open video",
      lessonNarrative: "Lesson narrative",
      detailedTopic: "Detailed account of this week’s topic",
      readingTime: "Read at your own pace",
      fiveTakeaways: "Five key takeaways",
      discussInClass: "Discuss in class",
      activeRecall: "Active recall",
      flashcardHeading: "Think through the concept, then turn the card",
      flashcardInstruction: "Try to form your own answer before revealing the reverse.",
      tapForAnswer: "Select to reveal the answer",
      answer: "Answer",
      tapForQuestion: "Select to return to the question",
      cardsSeen: "{seen} / {total} cards reviewed",
      previousCard: "Previous card",
      nextCard: "Next card",
      shuffleCards: "Shuffle cards",
      resetCards: "Reset cards",
      selfCheck: "Check your understanding",
      quizHeading: "10-question mini quiz",
      quizInstruction: "Answer all ten questions, then read the explanation for each response.",
      questionProgress: "Question {current} of {total}",
      previousQuestion: "Previous question",
      nextQuestion: "Next question",
      selectAnswer: "Select an answer first.",
      correctFeedback: "Correct. Read the explanation.",
      incorrectFeedback: "That answer is not correct. Read the explanation.",
      correctAnswer: "Correct answer:",
      checkAnswers: "Check answers",
      solveAgain: "Try again",
      answeredResult: "{answered} questions answered. {correct} correct. Complete the unanswered questions as well.",
      completeResult: "{correct} correct out of {total}. Read the explanations and review your answers.",
      weeklyGame: "Weekly game",
      matchingGame: "Concept matching",
      matchingInstruction: "Choose a concept first, then select its matching explanation.",
      concepts: "Concepts",
      mixedDefinitions: "Shuffled explanations",
      gameStatus: "Correct: {matches} / {total} · Attempts: {attempts}",
      gameComplete: "Well done. You completed all four matches in {attempts} attempts.",
      correctMatch: "Correct match. {matches} / {total} completed · Attempts: {attempts}",
      wrongMatch: "That pair does not match. Try again. Correct: {matches} / {total} · Attempts: {attempts}",
      restartGame: "Restart game",
      markComplete: "View completion status",
      markedComplete: "Week completed",
      completionManagedInPortal: "Time, assignment and completion status for week {week} are shown in the student area.",
      printWeek: "Print this week",
      evidenceLimit: "Evidentiary limit:",
      inspectSource: "View source",
      publisherLink: "DOI / publisher",
      allWeeksShown: "All fourteen weeks are shown.",
      weeksShown: "{count} weeks shown.",
      resultCount: "{count} results found",
      resultTypeLesson: "Lesson",
      resultTypeCard: "Flashcard",
      resultTypeReading: "Reading",
      resultTypeWeek: "Week summary",
      openResult: "Open result",
      noSearchResults: "No detailed content matches this search.",
      continueWeek: "Continue with Week {week}"
    }
  };

  function safeParse(value, fallback) {
    try {
      var parsed = JSON.parse(value);
      return parsed && typeof parsed === "object" ? parsed : fallback;
    } catch (_error) {
      return fallback;
    }
  }

  var stored = null;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch (_error) { /* Private or restricted storage must not prevent reading the course. */ }
  var saved = safeParse(stored, {});
  function validWeek(week) { return Number.isInteger(Number(week)) && Number(week) >= 1 && Number(week) <= 14; }
  var params = new URLSearchParams(window.location.search);
  var urlLanguage = params.get("lang");
  var language = validLanguages.indexOf(urlLanguage) >= 0
    ? urlLanguage
    : (validLanguages.indexOf(saved.language) >= 0 ? saved.language : "tr");
  var urlWeek = Number(params.get("week"));
  var urlTab = params.get("tab");

  var state = {
    language: language,
    openWeek: validWeek(urlWeek) ? urlWeek : (validWeek(saved.openWeek) ? Number(saved.openWeek) : 1),
    activeTabs: Object.assign({}, saved.activeTabs || {}),
    flashcards: Object.assign({}, saved.flashcards || {}),
    quizzes: Object.assign({}, saved.quizzes || {}),
    games: Object.assign({}, saved.games || {}),
    // Completion is derived by student-portal.js from active time plus an on-time assignment.
    // Legacy manual completion flags are intentionally ignored.
    completedWeeks: []
  };
  if (validWeek(urlWeek) && validTabs.indexOf(urlTab) >= 0) {
    state.activeTabs[String(urlWeek)] = urlTab;
  }

  var subscribers = [];

  function interpolate(value, variables) {
    var output = String(value == null ? "" : value);
    Object.keys(variables || {}).forEach(function (key) {
      output = output.split("{" + key + "}").join(String(variables[key]));
    });
    return output;
  }

  function t(key, variables) {
    var table = UI_TEXT[state.language] || UI_TEXT.tr;
    return interpolate(table[key] != null ? table[key] : (UI_TEXT.tr[key] || key), variables);
  }

  function persist() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_error) { /* Storage may be unavailable. */ }
  }

  function updateUrl(options) {
    var settings = options || {};
    var next = new URL(window.location.href);
    next.searchParams.set("lang", state.language);
    if (state.openWeek >= 1 && state.openWeek <= 14) next.searchParams.set("week", String(state.openWeek));
    var tab = state.activeTabs[String(state.openWeek)];
    if (validTabs.indexOf(tab) >= 0) next.searchParams.set("tab", tab);
    else next.searchParams.delete("tab");
    window.history[settings.push ? "pushState" : "replaceState"]({}, "", next.pathname + next.search + next.hash);
  }

  function translateStatic() {
    document.documentElement.lang = state.language;
    document.title = t("pageTitle");
    var description = document.querySelector('meta[name="description"]');
    if (description) description.content = t("pageDescription");

    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      element.textContent = t(element.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (element) {
      element.innerHTML = t(element.dataset.i18nHtml);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (element) {
      element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach(function (element) {
      element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (element) {
      element.setAttribute("alt", t(element.dataset.i18nAlt));
    });
    document.querySelectorAll("[data-language]").forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.language === state.language));
    });
  }

  function setLanguage(nextLanguage) {
    if (validLanguages.indexOf(nextLanguage) < 0 || nextLanguage === state.language) return;
    var previousY = window.scrollY;
    state.language = nextLanguage;
    persist();
    updateUrl();
    translateStatic();
    subscribers.slice().forEach(function (subscriber) { subscriber(state.language); });
    window.dispatchEvent(new CustomEvent("course-language-change", { detail: { language: state.language } }));
    window.requestAnimationFrame(function () { window.scrollTo(0, previousY); });
  }

  function setView(week, tab, options) {
    var weekNumber = Number(week);
    if (validWeek(weekNumber)) state.openWeek = weekNumber;
    if (validTabs.indexOf(tab) >= 0) state.activeTabs[String(state.openWeek)] = tab;
    persist();
    updateUrl(options);
    window.dispatchEvent(new CustomEvent("course-view-change", { detail: { week: state.openWeek } }));
  }

  function subscribe(callback) {
    if (typeof callback === "function" && subscribers.indexOf(callback) < 0) subscribers.push(callback);
  }

  function resetProgress() {
    state.openWeek = 1;
    state.activeTabs = {};
    state.flashcards = {};
    state.quizzes = {};
    state.games = {};
    persist();
    updateUrl();
  }

  function toast(message) {
    var element = document.querySelector("#courseToast");
    if (!element) return;
    element.textContent = message;
    element.hidden = false;
    window.clearTimeout(toast.timer);
    toast.timer = window.setTimeout(function () { element.hidden = true; }, 2600);
  }

  function bindShell() {
    document.querySelectorAll("[data-language]").forEach(function (button) {
      button.addEventListener("click", function () { setLanguage(button.dataset.language); });
    });
    var menuToggle = document.querySelector("#menuToggle");
    var navigation = document.querySelector("#mainNav");
    if (menuToggle && navigation) {
      function closeMenu(restoreFocus) {
        if (menuToggle.getAttribute("aria-expanded") !== "true") return;
        menuToggle.setAttribute("aria-expanded", "false");
        navigation.classList.remove("is-open");
        if (restoreFocus) menuToggle.focus();
      }
      menuToggle.addEventListener("click", function () {
        var open = menuToggle.getAttribute("aria-expanded") !== "true";
        menuToggle.setAttribute("aria-expanded", String(open));
        navigation.classList.toggle("is-open", open);
      });
      navigation.addEventListener("click", function (event) {
        if (event.target.closest("a")) closeMenu(false);
      });
      document.addEventListener("keydown", function (event) { if (event.key === "Escape") closeMenu(true); });
      document.addEventListener("pointerdown", function (event) {
        if (!navigation.contains(event.target) && !menuToggle.contains(event.target)) closeMenu(false);
      });
    }
  }

  window.CourseApp = {
    UI_TEXT: UI_TEXT,
    state: state,
    t: t,
    persist: persist,
    updateUrl: updateUrl,
    setLanguage: setLanguage,
    setView: setView,
    subscribe: subscribe,
    translateStatic: translateStatic,
    resetProgress: resetProgress,
    toast: toast,
    validTabs: validTabs.slice()
  };

  translateStatic();
  bindShell();

  window.addEventListener("popstate", function () {
    var nextParams = new URLSearchParams(window.location.search);
    var nextLanguage = nextParams.get("lang");
    var nextWeek = Number(nextParams.get("week"));
    var nextTab = nextParams.get("tab");
    if (validLanguages.indexOf(nextLanguage) >= 0) state.language = nextLanguage;
    if (validWeek(nextWeek)) state.openWeek = nextWeek;
    if (validTabs.indexOf(nextTab) >= 0) state.activeTabs[String(state.openWeek)] = nextTab;
    translateStatic();
    subscribers.slice().forEach(function (subscriber) { subscriber(state.language); });
    window.dispatchEvent(new CustomEvent("course-language-change", { detail: { language: state.language } }));
    window.dispatchEvent(new CustomEvent("course-view-change", { detail: { week: state.openWeek } }));
  });
})();
