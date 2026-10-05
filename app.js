(function () {
  "use strict";

  var app = window.CourseApp;
  var overviewI18n = window.SITE_UI_I18N_PROPOSAL || { tr: {}, en: {} };

  var weekBase = [
    { week: 1, category: "kavram", primaryUrl: "https://doi.org/10.1007/978-3-319-57279-6_1", optionalUrl: "https://doi.org/10.1177/0002716207311699", video: { title: "What Is Public Diplomacy?", channel: "National Museum of American Diplomacy", id: "JuxYZY50vPs" } },
    { week: 2, category: "tarih", primaryUrl: "https://doi.org/10.1007/978-3-319-57279-6_2", optionalUrl: "https://www.pennpress.org/9780871697219/franklin-the-diplomat/", video: { title: "Revolutionary Diplomats: Franklin and Adams", channel: "American Battlefield Trust", id: "qHkjZOj8CiE" } },
    { week: 3, category: "tarih", primaryUrl: "https://doi.org/10.1007/978-3-319-57279-6_3", optionalUrl: "https://rowman.com/ISBN/9780739185100/Persuading-John-Bull-Union-and-Confederate-Propaganda-in-Britain-1860-65", video: { title: "Politics, Diplomacy, Emancipation", channel: "ColumbiaLearn", id: "YEpGMOx8lCU" } },
    { week: 4, category: "tarih", primaryUrl: "https://doi.org/10.1007/978-3-319-57279-6_3", optionalUrl: "https://boydellandbrewer.com/9780861932634/english-public-opinion-and-the-american-civil-war/", video: { title: "How the Confederacy Almost Survived: King Cotton and Queen Victoria", channel: "Georgetown Institute for the Study of Diplomacy", id: "2i6RcqdZZSw" } },
    { week: 5, category: "kurum", primaryUrl: "https://doi.org/10.1007/978-3-319-57279-6_4", optionalUrl: "https://global.oup.com/academic/product/making-the-world-safe-9780199990086", video: { title: "United States Motivations for Cuba in the Spanish-American War", channel: "National Museum of American Diplomacy", id: "gAeGM386XP8" } },
    { week: 6, category: "kurum", primaryUrl: "https://doi.org/10.1007/978-3-319-57279-6_4", optionalUrl: "https://www.bloomsbury.com/us/making-the-world-like-us-9780313322303/", video: { title: "Fulbright: Engage the World!", channel: "Bureau of Educational and Cultural Affairs", id: "0eC8W52eumc" } },
    { week: 7, category: "kurum", primaryUrl: "https://doi.org/10.1007/978-3-319-57279-6_5", optionalUrl: "https://lsupress.org/9780807170779/manipulating-the-masses/", video: { title: "George Creel | The Great War", channel: "American Experience · PBS", id: "5TPjRE-bwvs" } },
    { week: 8, category: "kurum", primaryUrl: "https://doi.org/10.1007/978-3-319-57279-6_5", optionalUrl: "https://doi.org/10.1177/0002716207312142", video: { title: "Propaganda War: The Committee on Public Information and World War I at the Library", channel: "Library of Congress", id: "8BWXH8ec0oc" } },
    { week: 9, category: "kurum", primaryUrl: "https://doi.org/10.1007/978-3-319-57279-6_6", optionalUrl: "https://doi.org/10.1111/j.1468-2281.2010.00548.x", video: { title: "Dr. Rajiv J. Shah on Making Big Bets for Humanity", channel: "The Rockefeller Foundation", id: "2zJgfBh17JU" } },
    { week: 10, category: "kurum", primaryUrl: "https://doi.org/10.1007/978-3-319-57279-6_7", optionalUrl: "https://yalebooks.yale.edu/book/9780300021486/the-politics-of-propaganda/", video: { title: "A Reel Story of World War II: United News Collection in Prologue", channel: "US National Archives", id: "UuQ_NykkP4g" } },
    { week: 11, category: "tarih", primaryUrl: "https://doi.org/10.1007/978-3-319-57279-6_7", optionalUrl: "https://uwpress.wisc.edu/books/0195.htm", video: { title: "America Presents America, 1956", channel: "US National Archives", id: "wPiOTyh8Tg8" } },
    { week: 12, category: "kurum", primaryUrl: "https://doi.org/10.1007/978-3-319-57279-6_7", optionalUrl: "https://www.govinfo.gov/app/details/COMPS-1091", video: { title: "Matt Armstrong on the Smith-Mundt Act", channel: "Information Professionals Association", id: "O7w9wA24HTs" } },
    { week: 13, category: "karsilastirma", primaryUrl: "https://doi.org/10.1007/978-3-319-57279-6_8", optionalUrl: "https://doi.org/10.1163/187119111X583941", video: { title: "What Is Digital Diplomacy?", channel: "Lee Kuan Yew School of Public Policy", id: "e-KHxOpM7sk" } },
    { week: 14, category: "karsilastirma", primaryUrl: "https://doi.org/10.1007/978-3-319-57279-6_8", optionalUrl: "https://doi.org/10.1007/978-3-030-04405-3", video: { title: "Does Public Diplomacy Sway Foreign Public Opinion?", channel: "USC Annenberg", id: "wFbvQA8G-SQ" } }
  ];

  var presentationFiles = [
    { week: 1, tr: "Hafta_01_Gucu_Anlamak_TR.pptx", en: "Week_01_Understanding_Power_EN.pptx" },
    { week: 2, tr: "Hafta_02_Franklin_ve_Fransa_TR.pptx", en: "Week_02_Franklin_and_France_EN.pptx" },
    { week: 3, tr: "Hafta_03_Birlik_Kamu_Diplomasisi_TR.pptx", en: "Week_03_Union_Public_Diplomacy_EN.pptx" },
    { week: 4, tr: "Hafta_04_Konfederasyon_ve_King_Cotton_TR.pptx", en: "Week_04_Confederacy_and_King_Cotton_EN.pptx" },
    { week: 5, tr: "Hafta_05_Insani_Yardim_ve_Kuba_TR.pptx", en: "Week_05_Humanitarian_Aid_and_Cuba_EN.pptx" },
    { week: 6, tr: "Hafta_06_Pan_Amerikan_Degisimleri_TR.pptx", en: "Week_06_Pan_American_Exchanges_EN.pptx" },
    { week: 7, tr: "Hafta_07_Committee_on_Public_Information_TR.pptx", en: "Week_07_Committee_on_Public_Information_EN.pptx" },
    { week: 8, tr: "Hafta_08_Propaganda_ve_Guvenilirlik_TR.pptx", en: "Week_08_Propaganda_and_Credibility_EN.pptx" },
    { week: 9, tr: "Hafta_09_Vakiflar_ve_Ozel_Diplomasi_TR.pptx", en: "Week_09_Foundations_and_Private_Diplomacy_EN.pptx" },
    { week: 10, tr: "Hafta_10_DCR_CIAA_OWI_TR.pptx", en: "Week_10_DCR_CIAA_OWI_EN.pptx" },
    { week: 11, tr: "Hafta_11_Radyo_Film_Basin_TR.pptx", en: "Week_11_Radio_Film_Press_EN.pptx" },
    { week: 12, tr: "Hafta_12_Smith_Mundt_ve_Kurumsallasma_TR.pptx", en: "Week_12_Smith_Mundt_and_Institutionalisation_EN.pptx" },
    { week: 13, tr: "Hafta_13_Dunya_Modelleri_TR.pptx", en: "Week_13_Global_Models_EN.pptx" },
    { week: 14, tr: "Hafta_14_Etki_Etik_Final_Laboratuvari_TR.pptx", en: "Week_14_Influence_Ethics_Final_Lab_EN.pptx" }
  ];

  var downloadI18n = {
    tr: {
      gridLabel: "14 haftalık Türkçe sunum indirmeleri",
      sectionText: "Her hafta için 30 slaytlık Türkçe sunumu indirin.",
      week: "Hafta",
      slideCount: "30 slayt",
      turkish: "Türkçe",
      english: "İngilizce",
      downloadLabel: "{week}. hafta {language} sunumunu indir, 30 slayt",
      bundleTitle: "Tüm sunumları indir",
      bundleText: "14 hafta · 14 PPTX · Türkçe",
      bundleLabel: "Tüm Türkçe sunumları ZIP dosyası olarak indir"
    },
    en: {
      gridLabel: "English presentation downloads for all 14 weeks",
      sectionText: "Download a 30-slide English presentation for every week.",
      week: "Week",
      slideCount: "30 slides",
      turkish: "Turkish",
      english: "English",
      downloadLabel: "Download the {language} presentation for week {week}, 30 slides",
      bundleTitle: "Download all presentations",
      bundleText: "14 weeks · 14 PPTX files · English",
      bundleLabel: "Download all English presentations as a ZIP file"
    }
  };

  var aiVideoDurations = {
    1: 1249.810,
    2: 1252.468,
    3: 1220.471,
    4: 1165.974,
    5: 1234.903,
    6: 1228.500,
    7: 1166.369,
    8: 1184.887,
    9: 1219.415,
    10: 1241.000,
    11: 1225.500,
    12: 1187.000,
    13: 1247.000,
    14: 1183.772
  };

  var aiVideoI18n = {
    tr: {
      nav: "Yapay zekâ videoları",
      kicker: "İngilizce video dersler",
      title: "Yapay Zekâ Anlatımlı Ders Videoları",
      intro: "Her hafta için 30 slaytlık sunumla eşleştirilmiş, yaklaşık 20 dakikalık İngilizce video dersi Türkçe altyazıyla izleyin.",
      gridLabel: "On dört haftalık yapay zekâ anlatımlı İngilizce ders videoları",
      transparencyTitle: "Şeffaflık notu",
      transparencyText: "Bu videolar yapay zekâ ile üretilmiş İngilizce erkek sesi kullanır. Herhangi bir gerçek kişinin sesi taklit edilmemiştir.",
      modelCredit: "Ses modeli:",
      week: "Hafta",
      duration: "Süre",
      english: "İngilizce",
      maleVoice: "Sentetik erkek sesi",
      captions: "Türkçe altyazı",
      features: "Video özellikleri",
      watch: "Videoyu izle",
      watchLabel: "{week}. haftanın İngilizce yapay zekâ ders videosunu izle",
      transcript: "Türkçe ders metnini aç",
      turkishTranscript: "Türkçe altyazı metnini oku",
      captionLoading: "Türkçe metin yükleniyor…",
      captionError: "Türkçe metin yüklenemedi. Videoyu kapatıp yeniden açın.",
      shortCaptionNote: "Bu videonun 16:45–16:53 bölümünde altyazılar için çok kısa süre var. Bu bölümü aşağıdaki Türkçe metinden okuyabilirsiniz.",
      perWeekOverline: "Yapay zekâ ders anlatımı · İngilizce",
      perWeekDescription: "Yaklaşık 20 dakikalık, 30 slaytla eşleşen İngilizce anlatım; Türkçe altyazı ve tam Türkçe ders metni.",
      dialogKicker: "İngilizce yapay zekâ ders videosu",
      close: "Yapay zekâ ders videosunu kapat",
      playerLabel: "{week}. hafta yapay zekâ ders videosu: {title}",
      disclosure: "Yapay zekâ ile üretilmiş İngilizce erkek sesi kullanılmıştır; gerçek bir kişinin sesi taklit edilmemiştir."
    },
    en: {
      nav: "AI lecture videos",
      kicker: "English video lectures",
      title: "AI-Narrated Lecture Videos",
      intro: "Watch an approximately 20-minute English lecture for every week, synchronised with the 30-slide presentation, with Turkish subtitles on by default.",
      gridLabel: "AI-narrated English lecture videos for all fourteen weeks",
      transparencyTitle: "Transparency note",
      transparencyText: "These videos use an AI-generated English male voice. They do not imitate the voice of any real person.",
      modelCredit: "Voice model:",
      week: "Week",
      duration: "Duration",
      english: "English",
      maleVoice: "Synthetic male voice",
      captions: "Turkish subtitles",
      features: "Video features",
      watch: "Watch lecture",
      watchLabel: "Watch the English AI lecture video for week {week}",
      transcript: "Open the English transcript",
      turkishTranscript: "Read the Turkish subtitle text",
      captionLoading: "Loading the Turkish text…",
      captionError: "The Turkish text could not load. Close and reopen the video to try again.",
      shortCaptionNote: "The original video gives subtitles very little time at 16:45–16:53. You can read that passage in the English transcript below.",
      perWeekOverline: "AI-narrated lecture · English",
      perWeekDescription: "An approximately 20-minute English narration synchronised with 30 slides, Turkish subtitles and a full English transcript.",
      dialogKicker: "English AI-narrated lecture",
      close: "Close the AI lecture video",
      playerLabel: "Week {week} AI lecture video: {title}",
      disclosure: "This video uses an AI-generated English male voice; it does not imitate the voice of any real person."
    }
  };

  var caseKeys = ["case-uk", "case-germany", "case-france", "case-eu", "case-turkiye", "case-korea", "case-china", "case-qatar"];
  var caseUrls = [
    "https://www.britishcouncil.org/about-us",
    "https://www.goethe.de/en/uun/auf.html",
    "https://www.fondation-alliancefr.org/",
    "https://erasmus-plus.ec.europa.eu/",
    "https://www.yee.org.tr/en",
    "https://en.kf.or.kr/",
    "https://doi.org/10.1163/9789004283954",
    "https://network.aljazeera.net/en/about-us"
  ];

  var commonResources = [
    { author: "Robert A. Dahl", title: "The Concept of Power", meta: "Behavioral Science 2/3 (1957), 201–215", url: "https://doi.org/10.1002/bs.3830020303" },
    { author: "Steven Lukes", title: "Power: A Radical View", meta: "Bloomsbury Academic, revised edition, 2026", url: "https://www.bloomsbury.com/uk/power-9781350544772/" },
    { author: "Nicholas J. Cull", title: "Public Diplomacy: Taxonomies and Histories", meta: "The ANNALS 616/1 (2008), 31–54", url: "https://doi.org/10.1177/0002716207311952" },
    { author: "Joseph S. Nye", title: "Public Diplomacy and Soft Power", meta: "The ANNALS 616/1 (2008), 94–109", url: "https://doi.org/10.1177/0002716207311699" },
    { author: "Jan Melissen, ed.", title: "The New Public Diplomacy", meta: "Palgrave Macmillan, 2005", url: "https://doi.org/10.1057/9780230554931" },
    { author: "Eytan Gilboa", title: "Searching for a Theory of Public Diplomacy", meta: "The ANNALS 616/1 (2008), 55–77", url: "https://doi.org/10.1177/0002716207312142" },
    { author: "Justin Hart", title: "Empire of Ideas", meta: "Oxford University Press, 2013", url: "https://doi.org/10.1093/acprof:osobl/9780199777945.001.0001" },
    { author: "Mai’a K. Davis Cross & Jan Melissen, eds", title: "European Public Diplomacy", meta: "Palgrave Macmillan, 2013", url: "https://doi.org/10.1057/9781137315144" },
    { author: "B. Senem Çevik & Philip Seib, eds", title: "Turkey’s Public Diplomacy", meta: "Palgrave Macmillan, 2015", url: "https://doi.org/10.1057/9781137466983" },
    { author: "Ilan Manor", title: "The Digitalization of Public Diplomacy", meta: "Palgrave Macmillan, 2019", url: "https://doi.org/10.1007/978-3-030-04405-3" }
  ];

  var weeklyStudyI18n = {
    tr: {
      kicker: "HAFTALIK ÇALIŞMA PLANI", title: "Okuma, karşılaştırma ve çoklu ortam kaynakları",
      intro: "Ders notları ve birincil metinler temel okuma çerçevesini oluşturur. Video ve sesli dersler kavramsal açıklamaları tamamlar; tarihsel iddiaların değerlendirilmesi kaynak eleştirisini gerektirir.",
      notes: "AKADEMİK DERS NOTLARI", notesTitle: "Kavramsal temeller, kanıtlar ve uygulamalı çözümleme", notesDescription: "Ayrıntılı kavram açıklamaları, kuramsal tartışmalar, kaynak eleştirisi, görsel modeller, vaka analizleri ve Excel araştırma uygulamaları. Çevrim içi notlar ve PDF Türkçedir.", notesRead: "Çevrim içi oku", notesOpen: "Akademik PDF", notesDownload: "Akademik PDF indir",
      youtube: "01 / YOUTUBE VİDEOSU", watch: "Videoyu aç", podcast: "02 / PODCAST",
      audioNote: "Bu İngilizce ses bölümü, haftanın yapay zekâ anlatımlı ders videosunun podcast sürümüdür. Gerçek bir kişinin sesi taklit edilmemiştir.",
      download: "Podcast'i indir", transcript: "Tam Türkçe metin video ders penceresinde bulunur.",
      sources: "03 / KAYNAK METİNLER", book: "Ana kitap · kütüphane erişimi gerekebilir",
      open: "Açık erişimli metin", read: "İlgili bölümü aç", task: "Kısa çalışma sorusu"
    },
    en: {
      kicker: "WEEKLY STUDY PLAN", title: "Reading, comparison and multimedia resources",
      intro: "The lecture notes and primary texts constitute the core reading. Video and audio lectures complement the conceptual explanations; the assessment of historical claims requires source criticism.",
      notes: "ACADEMIC LECTURE NOTES", notesTitle: "Conceptual foundations, evidence and applied analysis", notesDescription: "Detailed conceptual explanations, theoretical debates, source criticism, visual models, case analyses and Excel research exercises. The online notes and PDF are entirely in English.", notesRead: "Read online", notesOpen: "Academic PDF", notesDownload: "Download academic PDF",
      youtube: "01 / YOUTUBE VIDEO", watch: "Watch video", podcast: "02 / PODCAST",
      audioNote: "This English audio episode is the podcast edition of the week's AI-narrated lecture. It does not imitate a real person's voice.",
      download: "Download podcast", transcript: "The full English transcript is available in the lecture video window.",
      sources: "03 / SOURCE TEXTS", book: "Core book · library access may be required",
      open: "Open-access text", read: "Open assigned section", task: "Brief study question"
    }
  };

  var activeFilter = "all";
  var lastVideoButton = null;
  var lastAiVideoButton = null;
  var currentAiVideoWeek = null;
  var currentYouTubeWeek = null;
  var youtubeApiPromise = null;
  var youtubePlayer = null;
  var youtubePlayerGeneration = 0;

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function localeLower(value, language) {
    return String(value == null ? "" : value).toLocaleLowerCase(language === "en" ? "en-GB" : "tr-TR");
  }

  function weekId(number) {
    return "week-" + String(number).padStart(2, "0");
  }

  function overviewFor(number, language) {
    var locale = overviewI18n[language] || overviewI18n.tr || {};
    var records = locale.weeklyOverview || {};
    return records[weekId(number)] || {};
  }

  function studyFor(number, language) {
    var item = (window.COURSE_STUDY || {})[number] || {};
    return language === "en" && item.en ? item.en : item;
  }

  function mergedWeek(base, language) {
    var words = overviewFor(base.week, language);
    return {
      week: base.week,
      id: weekId(base.week),
      category: base.category,
      tag: words.tag || "",
      title: words.title || "",
      summary: words.summary || "",
      goals: words.goals || [],
      primary: { label: words.primaryLabel || "", text: words.primaryText || "", url: base.primaryUrl },
      optional: { label: words.optionalLabel || "", text: words.optionalText || "", url: base.optionalUrl },
      activity: words.activity || "",
      prep: words.prep || "",
      video: {
        title: base.video.title,
        channel: base.video.channel,
        duration: words.videoDuration || "",
        id: base.video.id,
        note: words.videoNote || ""
      }
    };
  }

  function currentWeeks() {
    return weekBase.map(function (base) { return mergedWeek(base, app.state.language); });
  }

  function formatDownloadLabel(template, week, language) {
    return template.replace("{week}", String(week)).replace("{language}", language);
  }

  function presentationDownloadLink(file, language, labels) {
    var languageCode = language.toUpperCase();
    var languageName = language === "tr" ? labels.turkish : labels.english;
    var filename = file[language];
    var ariaLabel = formatDownloadLabel(labels.downloadLabel, file.week, languageName);
    return [
      "<a class=\"presentation-download presentation-download-" + language + "\" href=\"downloads/" + escapeHtml(filename) + "\" download=\"" + escapeHtml(filename) + "\" hreflang=\"" + language + "\" aria-label=\"" + escapeHtml(ariaLabel) + "\">",
      "<span class=\"language-badge\" aria-hidden=\"true\">" + languageCode + "</span>",
      "<span class=\"download-link-copy\"><strong>" + escapeHtml(languageName) + "</strong><small>PPTX · " + escapeHtml(labels.slideCount) + "</small></span>",
      "<span class=\"download-icon\" aria-hidden=\"true\">↓</span>",
      "</a>"
    ].join("");
  }

  function renderDownloads() {
    var grid = document.querySelector("#downloadGrid");
    if (!grid) return;
    var labels = downloadI18n[app.state.language] || downloadI18n.tr;
    var weeks = currentWeeks();
    var description = document.querySelector('[data-i18n="downloadsText"]');
    if (description) description.textContent = labels.sectionText;
    grid.setAttribute("aria-label", labels.gridLabel);
    grid.innerHTML = presentationFiles.map(function (file) {
      var item = weeks[file.week - 1] || { title: "" };
      var padded = String(file.week).padStart(2, "0");
      var headingId = "presentation-week-" + padded + "-title";
      return [
        "<article class=\"download-week-card\" role=\"listitem\" aria-labelledby=\"" + headingId + "\">",
        "<header class=\"download-week-heading\"><span class=\"download-week-number\" aria-hidden=\"true\">" + padded + "</span><div>",
        "<p>" + escapeHtml(labels.week + " " + file.week + " · " + labels.slideCount) + "</p>",
        "<h3 id=\"" + headingId + "\">" + escapeHtml(item.title) + "</h3>",
        "</div></header>",
        "<div class=\"presentation-downloads\">",
        presentationDownloadLink(file, app.state.language, labels),
        "</div></article>"
      ].join("");
    }).join("");
    var bundle = document.querySelector("#downloadBundle");
    var bundleTitle = document.querySelector("#downloadBundleTitle");
    var bundleText = document.querySelector("#downloadBundleText");
    if (bundle) { bundle.setAttribute("aria-label", labels.bundleLabel); bundle.href = "downloads/" + (app.state.language === "en" ? "Public_Diplomacy_Presentations_EN.zip" : "Kamu_Diplomasisi_Sunumlar_TR.zip"); bundle.download = bundle.href.split("/").pop(); }
    if (bundleTitle) bundleTitle.textContent = labels.bundleTitle;
    if (bundleText) bundleText.textContent = labels.bundleText;
  }

  function aiLabels() {
    return aiVideoI18n[app.state.language] || aiVideoI18n.tr;
  }

  function aiHistoricalNote(week) {
    if (Number(week) !== 7) return "";
    var en = app.state.language === "en";
    return (en ? "Historical correction: the narration says 14 April. Executive Order 2594, which established the Committee on Public Information, is dated 13 April 1917. " : "Tarih düzeltmesi: anlatımda 14 Nisan deniyor. Kamuoyu Bilgilendirme Komitesi’ni kuran 2594 sayılı başkanlık emri 13 Nisan 1917 tarihlidir. ") + '<a href="https://www.presidency.ucsb.edu/documents/executive-order-2594-creating-committee-public-information" target="_blank" rel="noopener">' + (en ? "Read the original order" : "Özgün emri oku") + '</a>';
  }

  function aiScriptFor(week) {
    return (window.AI_LECTURE_SCRIPTS_EN || []).filter(function (item) {
      return Number(item.week) === Number(week);
    })[0] || { week: week, title: "", transcript: "", chapters: [] };
  }

  function aiLectureFor(week) {
    var deck = presentationFiles.filter(function (item) { return item.week === Number(week); })[0];
    var padded = String(week).padStart(2, "0");
    var stem = deck ? deck.en.replace(/_EN\.pptx$/, "") : "Week_" + padded;
    var script = aiScriptFor(week);
    return {
      week: Number(week),
      title: app.state.language === "en" ? (script.title || overviewFor(week, "en").title || "") : (overviewFor(week, "tr").title || ""),
      transcript: app.state.language === "en" ? (script.transcript || "") : ((window.AI_LECTURE_TRANSCRIPTS_TR || {})[week] || ""),
      chapters: script.chapters || [],
      duration: Number(aiVideoDurations[week] || 0),
      video: "videos/" + stem + "_AI_Lecture_EN.mp4",
      captions: "videos/" + stem + "_AI_Lecture_TR.vtt",
      englishCaptions: "videos/" + stem + "_AI_Lecture_EN.vtt",
      poster: "videos/posters/week-" + padded + ".png"
    };
  }

  function formatAiDuration(seconds) {
    var total = Math.max(0, Math.round(Number(seconds) || 0));
    return Math.floor(total / 60) + ":" + String(total % 60).padStart(2, "0");
  }

  function aiTemplateText(template, item) {
    return String(template || "")
      .replace("{week}", String(item.week))
      .replace("{title}", item.title || "");
  }

  function transcriptHtml(transcript) {
    return String(transcript || "").split(/\n{2,}/).filter(Boolean).map(function (paragraph) {
      return "<p>" + escapeHtml(paragraph).replace(/\n/g, "<br>") + "</p>";
    }).join("");
  }

  function aiBadgesHtml(labels) {
    return [labels.english, labels.maleVoice, labels.captions].map(function (label) {
      return "<span>" + escapeHtml(label) + "</span>";
    }).join("");
  }

  function aiWeekCardTemplate(week) {
    var labels = aiLabels();
    var item = aiLectureFor(week);
    return [
      "<article class=\"video-card ai-week-video-card\">",
      "<span class=\"video-overline\">" + escapeHtml(labels.perWeekOverline) + "</span>",
      "<h4 lang=\"" + app.state.language + "\">" + escapeHtml(item.title) + "</h4>",
      "<p>" + escapeHtml(labels.perWeekDescription) + "</p>",
      "<div class=\"ai-badge-row compact\" aria-label=\"" + escapeHtml(labels.features) + "\">" + aiBadgesHtml(labels) + "</div>",
      "<div class=\"video-meta-line\"><span>" + escapeHtml(labels.duration) + "</span><span>" + escapeHtml(formatAiDuration(item.duration)) + "</span></div>",
      "<button class=\"play-ai-video\" type=\"button\" data-ai-week=\"" + item.week + "\" aria-label=\"" + escapeHtml(aiTemplateText(labels.watchLabel, item)) + "\">" + escapeHtml(labels.watch) + "</button>",
      "</article>"
    ].join("");
  }

  function weeklyStudyTemplate(item) {
    var guide = (window.WEEKLY_STUDY_GUIDES || {})[item.week];
    if (!guide) return "";
    var lang = app.state.language === "en" ? "en" : "tr";
    var labels = weeklyStudyI18n[lang];
    var book = lang === "en" ? (guide.bookEN || item.primary.text) : (guide.bookTR || item.primary.text);
    var audio = "podcasts/week-" + String(item.week).padStart(2, "0") + "-lecture-audio.opus";
    var noteFile = lang === "en" ? "notes/Week_" + String(item.week).padStart(2, "0") + "_Lecture_Notes_EN.pdf" : "notes/Hafta_" + String(item.week).padStart(2, "0") + "_Ders_Notu_TR.pdf";
    var notePage = noteFile.replace(/\.pdf$/, ".html");
    var fallbackAudio = aiLectureFor(item.week).video;
    var sources = (guide.texts || []).map(function (source) {
      return "<li><strong lang=\"en\">" + escapeHtml(source.title) + "</strong><span>" + escapeHtml(source[lang]) + "</span><p class=\"study-guide-source-summary\">" + escapeHtml(source[lang === "en" ? "summaryEN" : "summaryTR"]) + "</p><a href=\"" + escapeHtml(source.url) + "\" target=\"_blank\" rel=\"noopener\" aria-label=\"" + escapeHtml(labels.read + ": " + source.title) + "\">" + escapeHtml(labels.read) + " ↗</a></li>";
    }).join("");
    var frame = ((window.GRADUATE_SEMINAR_FRAMES || {})[lang] || {})[item.week];
    var frameLabels = lang === "en" ? {
      kicker: "Graduate research seminar", title: "Research frame", question: "Research question",
      debate: "Historiography and rival account", primary: "Document and source criticism",
      task: "Evidence brief for seminar"
    } : {
      kicker: "Lisansüstü araştırma semineri", title: "Araştırma çerçevesi", question: "Araştırma sorusu",
      debate: "Tarih yazımı ve rakip açıklama", primary: "Belge ve kaynak eleştirisi",
      task: "Seminer için kanıt brifingi"
    };
    var frameHtml = frame ? [
      "<article class=\"graduate-frame\" aria-labelledby=\"graduate-frame-" + item.week + "\">",
      "<div class=\"graduate-frame-heading\"><span class=\"study-guide-index\">" + escapeHtml(frameLabels.kicker) + "</span><h4 id=\"graduate-frame-" + item.week + "\">" + escapeHtml(frameLabels.title) + "</h4></div>",
      "<div class=\"graduate-frame-question\"><strong>" + escapeHtml(frameLabels.question) + "</strong><p>" + escapeHtml(frame.question) + "</p></div>",
      "<div class=\"graduate-frame-grid\"><section><h5>" + escapeHtml(frameLabels.debate) + "</h5><p>" + escapeHtml(frame.historiography) + "</p></section><section><h5>" + escapeHtml(frameLabels.primary) + "</h5><p>" + escapeHtml(frame.primaryTask) + "</p></section></div>",
      "<div class=\"graduate-frame-task\"><h5>" + escapeHtml(frameLabels.task) + "</h5><p>" + escapeHtml(frame.seminarTask) + "</p></div></article>"
    ].join("") : "";
    return [
      "<section class=\"weekly-study-guide\" aria-labelledby=\"weekly-study-" + item.week + "\">",
      "<header><span>" + escapeHtml(labels.kicker) + "</span><h3 id=\"weekly-study-" + item.week + "\">" + escapeHtml(labels.title) + "</h3><p>" + escapeHtml(labels.intro) + "</p></header>",
      frameHtml,
      "<article class=\"weekly-note-card\"><div><span class=\"study-guide-index\">" + escapeHtml(labels.notes) + "</span><h4>" + escapeHtml(labels.notesTitle) + "</h4><p>" + escapeHtml(labels.notesDescription) + "</p></div><div class=\"weekly-note-actions\"><a href=\"" + notePage + "\" target=\"_blank\" rel=\"noopener\" aria-label=\"" + escapeHtml(labels.notesRead + " · " + app.t("week") + " " + item.week) + "\">" + escapeHtml(labels.notesRead) + " ↗</a><a href=\"" + noteFile + "\" target=\"_blank\" rel=\"noopener\">" + escapeHtml(labels.notesOpen) + " ↗</a><a href=\"" + noteFile + "\" download=\"" + noteFile.split("/").pop() + "\">" + escapeHtml(labels.notesDownload) + " ↓</a></div></article>",
      "<div class=\"weekly-study-grid\">",
      "<article class=\"study-guide-card study-guide-video\"><span class=\"study-guide-index\">" + escapeHtml(labels.youtube) + "</span><h4 lang=\"" + lang + "\">" + escapeHtml(lang === "tr" ? item.title : item.video.title) + "</h4><p>" + escapeHtml(item.video.note) + "</p><small>" + escapeHtml(item.video.channel + " · " + item.video.duration) + "</small><button class=\"play-video\" type=\"button\" data-video-week=\"" + item.week + "\" data-video-id=\"" + escapeHtml(item.video.id) + "\" data-video-title=\"" + escapeHtml(lang === "tr" ? item.title : item.video.title) + "\" data-video-meta=\"" + escapeHtml(item.video.channel + " · " + item.video.duration) + "\">" + escapeHtml(labels.watch) + " ▶</button></article>",
      "<article class=\"study-guide-card study-guide-podcast\"><span class=\"study-guide-index\">" + escapeHtml(labels.podcast) + "</span><h4>" + escapeHtml(item.title) + "</h4><p>" + escapeHtml(labels.audioNote) + "</p><small>" + (lang === "en" ? "English" : "İngilizce") + " · " + escapeHtml(formatAiDuration(aiVideoDurations[item.week])) + "</small><audio controls preload=\"none\" data-podcast-week=\"" + item.week + "\" aria-label=\"" + escapeHtml(labels.podcast + " · " + item.title) + "\"><source src=\"" + audio + "\" type=\"audio/ogg; codecs=opus\"><source src=\"" + escapeHtml(fallbackAudio) + "\" type=\"audio/mp4\"></audio><a href=\"" + audio + "\" download>" + escapeHtml(labels.download) + " ↓</a><small>" + escapeHtml(labels.transcript) + "</small></article>",
      "<article class=\"study-guide-card study-guide-readings\"><span class=\"study-guide-index\">" + escapeHtml(labels.sources) + "</span><div class=\"study-guide-book\"><small>" + escapeHtml(labels.book) + "</small><strong>" + escapeHtml(book) + "</strong><a href=\"" + escapeHtml(item.primary.url) + "\" target=\"_blank\" rel=\"noopener\">" + escapeHtml(labels.read) + " ↗</a></div><div class=\"study-guide-open\"><small>" + escapeHtml(labels.open) + "</small><ul>" + sources + "</ul></div></article>",
      "</div><p class=\"weekly-study-question\"><strong>" + escapeHtml(labels.task) + ":</strong> " + escapeHtml(guide[lang]) + "</p></section>"
    ].join("");
  }

  function renderAiVideos() {
    var labels = aiLabels();
    var textById = {
      aiVideoNav: labels.nav,
      aiLecturesKicker: labels.kicker,
      "ai-lectures-title": labels.title,
      aiLecturesIntro: labels.intro,
      "ai-transparency-title": labels.transparencyTitle,
      aiTransparencyText: labels.transparencyText,
      aiModelCredit: labels.modelCredit
    };
    Object.keys(textById).forEach(function (id) {
      var element = document.getElementById(id);
      if (element) element.textContent = textById[id];
    });

    var grid = document.querySelector("#aiLectureGrid");
    if (!grid) return;
    grid.setAttribute("aria-label", labels.gridLabel);
    grid.innerHTML = presentationFiles.map(function (deck) {
      var item = aiLectureFor(deck.week);
      var padded = String(item.week).padStart(2, "0");
      var headingId = "ai-lecture-week-" + padded + "-title";
      return [
        "<article class=\"ai-lecture-card\" role=\"listitem\" aria-labelledby=\"" + headingId + "\">",
        "<header class=\"ai-lecture-card-header\"><span>" + escapeHtml(labels.week + " " + padded) + "</span><strong>" + escapeHtml(labels.duration + " · " + formatAiDuration(item.duration)) + "</strong></header>",
        "<h3 id=\"" + headingId + "\" lang=\"" + app.state.language + "\">" + escapeHtml(item.title) + "</h3>",
        "<div class=\"ai-badge-row\" aria-label=\"" + escapeHtml(labels.features) + "\">" + aiBadgesHtml(labels) + "</div>",
        "<button class=\"play-ai-video\" type=\"button\" data-ai-week=\"" + item.week + "\" aria-label=\"" + escapeHtml(aiTemplateText(labels.watchLabel, item)) + "\">" + escapeHtml(labels.watch) + " <span aria-hidden=\"true\">▶</span></button>",
        item.week === 7 ? "<p class=\"ai-caption-help\">" + aiHistoricalNote(item.week) + "</p>" : "",
        "<details class=\"ai-transcript-details\"><summary>" + escapeHtml(labels.transcript) + "</summary><div class=\"ai-transcript-copy\" lang=\"" + app.state.language + "\">" + transcriptHtml(item.transcript) + "</div></details>",
        "</article>"
      ].join("");
    }).join("");
    grid.querySelectorAll(".play-ai-video").forEach(function (button) {
      button.addEventListener("click", function () { openLectureVideo(button); });
    });
    updateAiDialogLanguage();
  }

  function weekTemplate(item) {
    var padded = String(item.week).padStart(2, "0");
    var isOpen = Number(app.state.openWeek) === item.week;
    var completed = app.state.completedWeeks.indexOf(item.week) >= 0;
    var searchText = [item.title, item.summary, item.tag].concat(item.goals).concat([item.activity, item.prep, item.primary.text, item.optional.text, item.video.title, item.video.channel, JSON.stringify(studyFor(item.week, app.state.language)), JSON.stringify((window.WEEKLY_STUDY_GUIDES || {})[item.week] || {}), JSON.stringify((((window.GRADUATE_SEMINAR_FRAMES || {})[app.state.language] || {})[item.week]) || {})]).join(" ");

    return [
      "<details class=\"week-card\" id=\"" + item.id + "\" data-week=\"" + item.week + "\" data-category=\"" + item.category + "\" data-search=\"" + escapeHtml(localeLower(searchText, app.state.language)) + "\"" + (isOpen ? " open" : "") + ">",
      "<summary>",
      "<span class=\"week-no\">" + padded + "</span>",
      "<span class=\"week-title-block\"><span class=\"week-kicker\">" + escapeHtml(item.tag) + "</span><span class=\"week-title\">" + escapeHtml(item.title) + "</span><span class=\"week-summary\">" + escapeHtml(item.summary) + "</span><span class=\"week-note-badge\">" + escapeHtml(app.state.language === "en" ? "Step-by-step guide · Diagram · Excel" : "Adım adım rehber · Şema · Excel") + "</span></span>",
      "<span class=\"week-summary-actions\"><span class=\"week-complete-indicator\"" + (completed ? "" : " hidden") + " aria-label=\"" + escapeHtml(app.t("markedComplete")) + "\">✓</span><span class=\"week-chevron\" aria-hidden=\"true\">+</span></span>",
      "</summary>",
      "<div class=\"week-body\">",
      weeklyStudyTemplate(item),
      "<div class=\"week-column\"><p class=\"week-section-label\">" + escapeHtml(app.t("weekPlan")) + "</p><ul>" + item.goals.map(function (goal) { return "<li>" + escapeHtml(goal) + "</li>"; }).join("") + "</ul>",
      "<div class=\"reading-card optional\"><span>" + escapeHtml(item.optional.label) + "</span><a lang=\"en\" href=\"" + escapeHtml(item.optional.url) + "\" target=\"_blank\" rel=\"noopener\">" + escapeHtml(item.optional.text) + "</a></div>",
      "<div class=\"activity-card\"><strong>" + escapeHtml(app.t("classActivity")) + "</strong>" + escapeHtml(item.activity) + "</div>",
      "<div class=\"prep-note\"><strong>" + escapeHtml(app.t("shortPreparation")) + "</strong> " + escapeHtml(item.prep) + "</div></div>",
      "<div class=\"week-column weekly-video-stack\">" + aiWeekCardTemplate(item.week) + "</div>",
      "<div class=\"week-action-row\"><button class=\"complete-week" + (completed ? " is-complete" : "") + "\" type=\"button\" data-week=\"" + item.week + "\">" + escapeHtml(completed ? app.t("markedComplete") : app.t("markComplete")) + "</button><button class=\"print-week\" type=\"button\" data-week=\"" + item.week + "\">" + escapeHtml(app.t("printWeek")) + "</button></div>",
      "</div></details>"
    ].join("");
  }

  function renderWeeks() {
    var container = document.querySelector("#weeksContainer");
    if (!container) return;
    container.innerHTML = currentWeeks().map(weekTemplate).join("");
    bindWeekEvents();
    if (window.CourseStudyUI && typeof window.CourseStudyUI.enhanceAll === "function") window.CourseStudyUI.enhanceAll();
    applyFilters();
  }

  function renderCourseMap() {
    var map = document.querySelector("#courseMap");
    if (!map) return;
    map.innerHTML = currentWeeks().map(function (item) {
      var complete = app.state.completedWeeks.indexOf(item.week) >= 0;
      return "<button type=\"button\" class=\"course-map-item" + (complete ? " is-complete" : "") + "\" data-map-week=\"" + item.week + "\"><span>" + String(item.week).padStart(2, "0") + "</span><strong>" + escapeHtml(item.title) + "</strong><small>" + escapeHtml(item.tag) + "</small></button>";
    }).join("");
    map.querySelectorAll("[data-map-week]").forEach(function (button) {
      button.addEventListener("click", function () { openWeek(Number(button.dataset.mapWeek), "lesson", true); });
    });
  }

  function renderCases() {
    var grid = document.querySelector("#caseGrid");
    if (!grid) return;
    var localeCases = ((overviewI18n[app.state.language] || {}).cases) || {};
    grid.innerHTML = caseKeys.map(function (key, index) {
      var item = localeCases[key] || {};
      return "<article class=\"case-card\"><span class=\"case-country\">" + escapeHtml(item.country || "") + "</span><h3>" + escapeHtml(item.institution || "") + "</h3><p>" + escapeHtml(item.tool || "") + "</p><p class=\"case-limit\"><strong>" + escapeHtml(app.t("evidenceLimit")) + "</strong> " + escapeHtml(item.limit || "") + "</p><a href=\"" + escapeHtml(caseUrls[index]) + "\" target=\"_blank\" rel=\"noopener\" aria-label=\"" + escapeHtml(app.t("inspectSource") + ": " + (item.institution || "")) + "\">" + escapeHtml(app.t("inspectSource")) + " ↗</a></article>";
    }).join("");
  }

  function renderResources() {
    var list = document.querySelector("#resourceList");
    if (!list) return;
    list.innerHTML = commonResources.map(function (item, index) {
      return "<article class=\"resource-item\"><span class=\"resource-index\">" + String(index + 1).padStart(2, "0") + "</span><div><strong lang=\"en\">" + escapeHtml(item.author + " · " + item.title) + "</strong><span>" + escapeHtml(item.meta) + "</span><a href=\"" + escapeHtml(item.url) + "\" target=\"_blank\" rel=\"noopener\" aria-label=\"" + escapeHtml(app.t("publisherLink") + ": " + item.author + ", " + item.title) + "\">" + escapeHtml(app.t("publisherLink")) + " ↗</a></div></article>";
    }).join("");
  }

  function buildSearchRecords(language) {
    var records = [];
    weekBase.forEach(function (base) {
      var week = mergedWeek(base, language);
      var study = studyFor(base.week, language);
      records.push({ language: language, week: base.week, tab: "lesson", type: app.t("resultTypeWeek"), title: week.title, text: week.summary });
      var beginner = ((window.COURSE_BEGINNER || {})[base.week] || {})[language];
      if (beginner) records.push({ language: language, week: base.week, tab: "lesson", type: app.t("resultTypeLesson"), title: beginner.title, text: JSON.stringify(beginner) });
      var detailed = ((window.COURSE_DEPTH || {})[base.week] || {})[language];
      if (detailed) detailed.sections.forEach(function (section) { records.push({ language: language, week: base.week, tab: "lesson", type: app.t("resultTypeLesson"), title: section.title, text: [section.title, section.why].concat(section.paragraphs).concat([section.example.title, section.example.text, section.checkpoint.question, section.checkpoint.answer]).join(" ") }); });
      (study.sections || []).forEach(function (section) {
        records.push({ language: language, week: base.week, tab: "lesson", type: app.t("resultTypeLesson"), title: section.heading, text: (section.paragraphs || []).join(" ") });
      });
      (study.flashcards || []).forEach(function (card) {
        records.push({ language: language, week: base.week, tab: "flashcards", type: app.t("resultTypeCard"), title: card.front, text: card.back });
      });
      records.push({ language: language, week: base.week, tab: "resources", type: app.t("resultTypeReading"), title: week.primary.text, text: week.optional.text });
    });
    return records;
  }

  function excerpt(text, query, language) {
    var source = String(text || "").replace(/\s+/g, " ").trim();
    var lower = localeLower(source, language);
    var index = lower.indexOf(localeLower(query, language));
    var start = Math.max(0, index >= 0 ? index - 75 : 0);
    var end = Math.min(source.length, start + 190);
    return (start > 0 ? "…" : "") + source.slice(start, end) + (end < source.length ? "…" : "");
  }

  function renderSearchResults(query) {
    var element = document.querySelector("#searchResults");
    if (!element) return [];
    if (!query || query.length < 2) {
      element.hidden = true;
      element.innerHTML = "";
      return [];
    }
    var both = Boolean(document.querySelector("#searchBothLanguages") && document.querySelector("#searchBothLanguages").checked);
    var languages = both ? ["tr", "en"] : [app.state.language];
    var results = [];
    languages.forEach(function (language) {
      buildSearchRecords(language).forEach(function (record) {
        var haystack = localeLower(record.title + " " + record.text, language);
        if (haystack.indexOf(localeLower(query, language)) >= 0) results.push(record);
      });
    });
    results = results.filter(function (result) {
      return activeFilter === "all" || weekBase.some(function (week) {
        return week.week === result.week && week.category === activeFilter;
      });
    });
    element.hidden = false;
    element.innerHTML = "<div class=\"search-results-heading\"><strong>" + escapeHtml(app.t("resultCount", { count: results.length })) + "</strong></div>" + (results.length ? results.slice(0, 24).map(function (result) {
      return "<button type=\"button\" class=\"search-result\" data-result-week=\"" + result.week + "\" data-result-tab=\"" + result.tab + "\" data-result-language=\"" + result.language + "\"><span class=\"search-result-meta\">" + escapeHtml((result.language === "tr" ? "TR" : "EN") + " · " + app.t("week") + " " + result.week + " · " + result.type) + "</span><strong>" + escapeHtml(result.title) + "</strong><small>" + escapeHtml(excerpt(result.text, query, result.language)) + "</small><span class=\"search-result-action\">" + escapeHtml(app.t("openResult")) + " →</span></button>";
    }).join("") : "<p class=\"search-no-results\">" + escapeHtml(app.t("noSearchResults")) + "</p>");
    element.querySelectorAll("[data-result-week]").forEach(function (button) {
      button.addEventListener("click", function () {
        var targetLanguage = button.dataset.resultLanguage;
        var targetWeek = Number(button.dataset.resultWeek);
        var targetTab = button.dataset.resultTab;
        clearWeekFilters();
        if (targetLanguage !== app.state.language) {
          app.state.openWeek = targetWeek;
          app.state.activeTabs[String(targetWeek)] = targetTab;
          app.setLanguage(targetLanguage);
          window.setTimeout(function () { scrollToWeek(targetWeek); }, 50);
        } else {
          openWeek(targetWeek, targetTab, true);
        }
      });
    });
    return results;
  }

  function applyFilters() {
    var searchInput = document.querySelector("#weekSearch");
    var query = (searchInput ? searchInput.value : "").trim();
    var queryLower = localeLower(query, app.state.language);
    var visible = 0;
    var matchingWeeks = {};
    if (query.length >= 2) renderSearchResults(query).forEach(function (result) { matchingWeeks[String(result.week)] = true; });
    else renderSearchResults("");

    document.querySelectorAll(".week-card").forEach(function (card) {
      var matchesCategory = activeFilter === "all" || card.dataset.category === activeFilter;
      var matchesQuery = !queryLower || card.dataset.search.indexOf(queryLower) >= 0 || matchingWeeks[card.dataset.week];
      var show = matchesCategory && matchesQuery;
      card.hidden = !show;
      if (show) visible += 1;
    });
    var empty = document.querySelector("#emptyState");
    if (empty) empty.hidden = visible !== 0;
    var status = document.querySelector("#weekResultStatus");
    if (status) status.textContent = visible === weekBase.length ? app.t("allWeeksShown") : app.t("weeksShown", { count: visible });
  }

  function bindWeekEvents() {
    document.querySelectorAll(".week-card").forEach(function (card) {
      card.addEventListener("toggle", function () {
        if (card.open) {
          var week = Number(card.dataset.week);
          app.setView(week, app.state.activeTabs[String(week)] || "lesson");
        }
      });
    });
    document.querySelectorAll(".play-video").forEach(function (button) {
      button.addEventListener("click", function () { openVideo(button); });
    });
    document.querySelectorAll(".week-card .play-ai-video").forEach(function (button) {
      button.addEventListener("click", function () { openLectureVideo(button); });
    });
    document.querySelectorAll(".complete-week").forEach(function (button) {
      button.addEventListener("click", function () {
        var week = Number(button.dataset.week);
        if (window.StudentPortal && typeof window.StudentPortal.startWeek === "function") {
          window.StudentPortal.startWeek(week);
        }
        var portal = document.querySelector("#ogrenci-alani");
        if (portal) {
          var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          portal.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
        }
        app.toast(app.t("completionManagedInPortal", { week: week }));
      });
    });
    document.querySelectorAll(".print-week").forEach(function (button) {
      button.addEventListener("click", function () { printWeek(Number(button.dataset.week)); });
    });
  }

  function scrollToWeek(week) {
    var target = document.querySelector("#" + weekId(week));
    if (!target) return;
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    window.requestAnimationFrame(function () {
      var summary = target.querySelector("summary");
      if (summary) summary.focus({ preventScroll: true });
    });
  }

  function openWeek(week, tab, push) {
    clearWeekFilters();
    app.setView(week, tab || "lesson", { push: Boolean(push) });
    document.querySelectorAll(".week-card").forEach(function (card) { card.open = Number(card.dataset.week) === week; });
    if (window.CourseStudyUI && typeof window.CourseStudyUI.activateWeekTab === "function") window.CourseStudyUI.activateWeekTab(week, tab || "lesson");
    scrollToWeek(week);
  }

  function clearWeekFilters() {
    activeFilter = "all";
    var search = document.querySelector("#weekSearch");
    if (search) search.value = "";
    document.querySelectorAll(".filter").forEach(function (button) {
      var selected = button.dataset.filter === "all";
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    applyFilters();
  }

  function renderProgressControls() {
    var button = document.querySelector("#continueCourse");
    if (button) button.textContent = app.t("continueWeek", { week: app.state.openWeek || 1 });
    updateProgress();
  }

  function updateProgress() {
    var count = app.state.completedWeeks.length;
    var progress = document.querySelector("#courseProgress");
    var percentage = document.querySelector("#progressPercent");
    if (progress) progress.value = count;
    if (percentage) percentage.textContent = Math.round((count / 14) * 100) + "%";
  }

  function dispatchYouTubePlayback(week, playing, state, active) {
    document.dispatchEvent(new CustomEvent("course:youtube-playback", {
      detail: {
        week: Number(week) || null,
        playing: Boolean(playing),
        state: state,
        active: active !== false
      }
    }));
  }

  function loadYouTubeIframeApi() {
    if (window.YT && typeof window.YT.Player === "function") return Promise.resolve(window.YT);
    if (youtubeApiPromise) return youtubeApiPromise;

    youtubeApiPromise = new Promise(function (resolve, reject) {
      var previousReady = window.onYouTubeIframeAPIReady;
      var settled = false;
      function resolveWhenReady() {
        if (!settled && window.YT && typeof window.YT.Player === "function") {
          settled = true;
          resolve(window.YT);
        }
      }
      window.onYouTubeIframeAPIReady = function () {
        if (typeof previousReady === "function") {
          try { previousReady(); } catch (_error) { /* Keep this player independent of other integrations. */ }
        }
        resolveWhenReady();
      };

      var script = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
      if (!script) {
        script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        var firstScript = document.querySelector("script");
        if (firstScript && firstScript.parentNode) firstScript.parentNode.insertBefore(script, firstScript);
        else document.head.appendChild(script);
      }
      script.addEventListener("load", resolveWhenReady, { once: true });
      script.addEventListener("error", function () {
        if (!settled) {
          settled = true;
          reject(new Error("YouTube IFrame Player API could not be loaded."));
        }
      }, { once: true });
    });
    return youtubeApiPromise;
  }

  function initialiseYouTubePlayer(iframe, week, generation) {
    loadYouTubeIframeApi().then(function (YT) {
      if (generation !== youtubePlayerGeneration || currentYouTubeWeek !== week || !document.contains(iframe)) return;
      try {
        youtubePlayer = new YT.Player(iframe.id, {
          events: {
            onStateChange: function (event) {
              if (generation !== youtubePlayerGeneration || currentYouTubeWeek !== week || event.target !== youtubePlayer) return;
              var playingState = YT.PlayerState && typeof YT.PlayerState.PLAYING === "number" ? YT.PlayerState.PLAYING : 1;
              dispatchYouTubePlayback(week, event.data === playingState, event.data, true);
            },
            onError: function (event) {
              if (generation === youtubePlayerGeneration && currentYouTubeWeek === week) {
                dispatchYouTubePlayback(week, false, event.data, true);
              }
            }
          }
        });
      } catch (_error) {
        youtubePlayer = null;
      }
    }).catch(function () {
      /* The ordinary iframe remains fully usable if the optional API is unavailable. */
    });
  }

  function resetYouTubePlayer(restoreFocus) {
    var week = currentYouTubeWeek;
    currentYouTubeWeek = null;
    youtubePlayerGeneration += 1;
    if (week) dispatchYouTubePlayback(week, false, "closed", false);
    var player = youtubePlayer;
    youtubePlayer = null;
    if (player && typeof player.destroy === "function") {
      try { player.destroy(); } catch (_error) { /* The frame is cleared below as a fallback. */ }
    }
    var frame = document.querySelector("#videoFrame");
    if (frame) frame.innerHTML = "";
    if (restoreFocus !== false && lastVideoButton && document.contains(lastVideoButton)) lastVideoButton.focus();
  }

  function openVideo(button) {
    var dialog = document.querySelector("#videoDialog");
    var frame = document.querySelector("#videoFrame");
    var title = document.querySelector("#videoTitle");
    var meta = document.querySelector("#videoMeta");
    var link = document.querySelector("#youtubeLink");
    if (!dialog || !frame || !title || !meta || !link) return;
    resetYouTubePlayer(false);
    lastVideoButton = button;
    var id = button.dataset.videoId;
    var week = Number(button.dataset.videoWeek);
    currentYouTubeWeek = week;
    title.textContent = button.dataset.videoTitle;
    title.lang = app.state.language;
    meta.textContent = button.dataset.videoMeta;
    meta.lang = "en";
    link.href = "https://www.youtube.com/watch?v=" + encodeURIComponent(id);
    var parameters = ["rel=0", "enablejsapi=1", "cc_lang_pref=tr", "cc_load_policy=1", "hl=" + app.state.language];
    if (window.location.protocol === "http:" || window.location.protocol === "https:") {
      parameters.push("origin=" + encodeURIComponent(window.location.origin));
    }
    frame.innerHTML = "<iframe id=\"weeklyYouTubePlayer\" src=\"https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) + "?" + parameters.join("&amp;") + "\" title=\"" + escapeHtml(button.dataset.videoTitle) + "\" loading=\"lazy\" allow=\"accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen></iframe>";
    if (!dialog.open) dialog.showModal();
    var iframe = frame.querySelector("#weeklyYouTubePlayer");
    var generation = ++youtubePlayerGeneration;
    dispatchYouTubePlayback(week, false, "loading", true);
    if (iframe) initialiseYouTubePlayer(iframe, week, generation);
  }

  function closeVideo() {
    var dialog = document.querySelector("#videoDialog");
    if (dialog && dialog.open) dialog.close();
    else resetYouTubePlayer(true);
  }

  function updateAiDialogLanguage() {
    var labels = aiLabels();
    var item = currentAiVideoWeek ? aiLectureFor(currentAiVideoWeek) : { week: "", title: "" };
    var kicker = document.querySelector("#aiVideoDialogKicker");
    var meta = document.querySelector("#aiVideoDialogMeta");
    var badges = document.querySelector("#aiVideoDialogBadges");
    var summary = document.querySelector("#aiVideoTranscriptSummary");
    var trSummary = document.querySelector("#aiVideoTranscriptTrSummary");
    var timingNote = document.querySelector("#aiVideoTimingNote");
    var historicalNote = document.querySelector("#aiVideoHistoricalNote");
    var disclosure = document.querySelector("#aiVideoDisclosure");
    var closeButton = document.querySelector("#closeAiVideo");
    var player = document.querySelector("#aiVideoPlayer");
    if (kicker) kicker.textContent = labels.dialogKicker;
    if (meta && currentAiVideoWeek) meta.textContent = labels.week + " " + item.week + " · " + labels.duration + " " + formatAiDuration(item.duration);
    if (badges) {
      badges.setAttribute("aria-label", labels.features);
      badges.innerHTML = aiBadgesHtml(labels);
    }
    if (summary) summary.textContent = labels.transcript;
    if (trSummary) { trSummary.textContent = labels.turkishTranscript; trSummary.parentElement.hidden = true; }
    if (timingNote) { timingNote.hidden = currentAiVideoWeek !== 12; timingNote.textContent = labels.shortCaptionNote; }
    if (historicalNote) { historicalNote.hidden = currentAiVideoWeek !== 7; historicalNote.innerHTML = aiHistoricalNote(currentAiVideoWeek); }
    if (disclosure) disclosure.textContent = labels.disclosure;
    if (closeButton) closeButton.setAttribute("aria-label", labels.close);
    if (player && currentAiVideoWeek) player.setAttribute("aria-label", aiTemplateText(labels.playerLabel, item));
  }

  function showTurkishAiSubtitles() {
    var player = document.querySelector("#aiVideoPlayer");
    if (!player || !player.textTracks) return;
    for (var i = 0; i < player.textTracks.length; i += 1) {
      player.textTracks[i].mode = player.textTracks[i].language === "tr" ? "showing" : "disabled";
    }
  }

  function loadTurkishCaptionText(item) {
    var target = document.querySelector("#aiVideoTranscriptTr");
    if (!target) return;
    target.textContent = aiLabels().captionLoading;
    fetch(item.captions).then(function (response) {
      if (!response.ok) throw new Error("Subtitle text unavailable");
      return response.text();
    }).then(function (text) {
      if (currentAiVideoWeek !== item.week) return;
      var copy = text.trim().split(/\r?\n\s*\r?\n/).slice(1).map(function (block) { return block.split(/\r?\n/).slice(2).join(" "); }).join(" ");
      var sentences = copy.replace(/([.!?])\s+/g, "$1\n").split("\n");
      var paragraphs = [];
      for (var i = 0; i < sentences.length; i += 4) paragraphs.push("<p>" + escapeHtml(sentences.slice(i, i + 4).join(" ")) + "</p>");
      target.innerHTML = paragraphs.join("");
    }).catch(function () { if (currentAiVideoWeek === item.week) target.textContent = aiLabels().captionError; });
  }

  function openLectureVideo(button) {
    var dialog = document.querySelector("#aiVideoDialog");
    var player = document.querySelector("#aiVideoPlayer");
    var source = document.querySelector("#aiVideoSource");
    var captions = document.querySelector("#aiVideoCaptions");
    var englishCaptions = document.querySelector("#aiVideoCaptionsEn");
    var title = document.querySelector("#aiVideoTitle");
    var transcript = document.querySelector("#aiVideoTranscript");
    if (!dialog || !player || !source || !captions || !title || !transcript) return;
    var week = Number(button.dataset.aiWeek);
    var item = aiLectureFor(week);
    lastAiVideoButton = button;
    currentAiVideoWeek = week;
    title.textContent = item.title;
    source.src = item.video;
    captions.src = item.captions;
    captions.label = "Türkçe";
    captions.default = true;
    if (englishCaptions) englishCaptions.src = item.englishCaptions;
    player.poster = item.poster;
    transcript.innerHTML = transcriptHtml(item.transcript);
    transcript.lang = app.state.language;
    title.lang = app.state.language;
    updateAiDialogLanguage();
    player.load();
    showTurkishAiSubtitles();
    dialog.showModal();

  }

  function resetAiVideoPlayer() {
    var player = document.querySelector("#aiVideoPlayer");
    var source = document.querySelector("#aiVideoSource");
    var captions = document.querySelector("#aiVideoCaptions");
    var englishCaptions = document.querySelector("#aiVideoCaptionsEn");
    if (player) player.pause();
    if (source) source.removeAttribute("src");
    if (captions) captions.removeAttribute("src");
    if (englishCaptions) englishCaptions.removeAttribute("src");
    if (player) {
      player.removeAttribute("poster");
      player.load();
    }
    currentAiVideoWeek = null;
    if (lastAiVideoButton && document.contains(lastAiVideoButton)) lastAiVideoButton.focus();
  }

  function closeAiVideo() {
    var dialog = document.querySelector("#aiVideoDialog");
    if (dialog && dialog.open) dialog.close();
    else resetAiVideoPlayer();
  }

  function expandForPrint(cards) {
    return cards.map(function (card) {
      var panels = Array.from(card.querySelectorAll(".study-panel"));
      var sections = Array.from(card.querySelectorAll(".lesson-section, .lg-deep, .lg-answer"));
      var snapshot = { card: card, open: card.open, hidden: card.hidden, panels: panels.map(function (p) { return p.hidden; }), sections: sections.map(function (s) { return s.open; }) };
      card.open = true;
      card.hidden = false;
      panels.forEach(function (panel) { panel.hidden = !panel.classList.contains("lesson-panel") && !panel.classList.contains("resources-panel"); });
      sections.forEach(function (section) { section.open = true; });
      return snapshot;
    });
  }

  function restoreAfterPrint(snapshots) {
    snapshots.forEach(function (snapshot) {
      snapshot.card.open = snapshot.open;
      snapshot.card.hidden = snapshot.hidden;
      snapshot.card.querySelectorAll(".study-panel").forEach(function (panel, index) { panel.hidden = snapshot.panels[index]; });
      snapshot.card.querySelectorAll(".lesson-section, .lg-deep, .lg-answer").forEach(function (section, index) { section.open = snapshot.sections[index]; });
    });
    document.body.classList.remove("print-single-week");
    document.querySelectorAll(".week-card.print-excluded").forEach(function (card) { card.classList.remove("print-excluded"); });
    applyFilters();
  }

  function printAll() {
    var snapshots = expandForPrint(Array.from(document.querySelectorAll(".week-card")));
    window.print();
    restoreAfterPrint(snapshots);
  }

  function printWeek(week) {
    var cards = Array.from(document.querySelectorAll(".week-card"));
    cards.forEach(function (card) { card.classList.toggle("print-excluded", Number(card.dataset.week) !== week); });
    document.body.classList.add("print-single-week");
    var target = cards.filter(function (card) { return Number(card.dataset.week) === week; });
    var snapshots = expandForPrint(target);
    window.print();
    restoreAfterPrint(snapshots);
  }

  function bindStaticEvents() {
    document.querySelectorAll(".filter").forEach(function (button) {
      button.addEventListener("click", function () {
        activeFilter = button.dataset.filter;
        document.querySelectorAll(".filter").forEach(function (item) {
          var selected = item === button;
          item.classList.toggle("active", selected);
          item.setAttribute("aria-pressed", String(selected));
        });
        applyFilters();
      });
    });
    var search = document.querySelector("#weekSearch");
    if (search) search.addEventListener("input", applyFilters);
    var searchBoth = document.querySelector("#searchBothLanguages");
    if (searchBoth) searchBoth.addEventListener("change", applyFilters);

    document.querySelector("#continueCourse")?.addEventListener("click", function () { openWeek(app.state.openWeek || 1, app.state.activeTabs[String(app.state.openWeek || 1)] || "lesson", true); });
    document.querySelector("#resetProgress")?.addEventListener("click", function () {
      if (window.confirm(app.t("resetConfirm"))) {
        app.resetProgress();
        renderAll();
        app.toast(app.t("resetDone"));
      }
    });
    document.querySelector("#printSyllabus")?.addEventListener("click", printAll);
    document.querySelector("#printSyllabusCard")?.addEventListener("click", printAll);
    document.querySelector("#closeVideo")?.addEventListener("click", closeVideo);
    var dialog = document.querySelector("#videoDialog");
    if (dialog) {
      dialog.addEventListener("click", function (event) {
        var rect = dialog.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeVideo();
      });
      dialog.addEventListener("close", function () {
        resetYouTubePlayer(true);
      });
    }

    document.querySelector("#closeAiVideo")?.addEventListener("click", closeAiVideo);
    var aiDialog = document.querySelector("#aiVideoDialog");
    if (aiDialog) {
      aiDialog.addEventListener("click", function (event) {
        var rect = aiDialog.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) aiDialog.close();
      });
      aiDialog.addEventListener("close", resetAiVideoPlayer);
    }
    var aiPlayer = document.querySelector("#aiVideoPlayer");
    if (aiPlayer) {
      aiPlayer.addEventListener("loadedmetadata", showTurkishAiSubtitles);
    }
  }

  function renderAll() {
    app.translateStatic();
    renderWeeks();
    renderCourseMap();
    renderCases();
    renderResources();
    renderAiVideos();
    renderDownloads();
    renderProgressControls();
  }

  window.CourseSite = {
    weekBase: weekBase,
    currentWeeks: currentWeeks,
    overviewFor: overviewFor,
    studyFor: studyFor,
    openWeek: openWeek,
    renderAll: renderAll,
    applyFilters: applyFilters,
    escapeHtml: escapeHtml
  };

  window.addEventListener("course-view-change", renderProgressControls);
  window.addEventListener("popstate", function () {
    clearWeekFilters();
    scrollToWeek(app.state.openWeek);
  });
  document.addEventListener("DOMContentLoaded", function () {
    if (new URLSearchParams(location.search).has("week") && !location.hash) scrollToWeek(app.state.openWeek);
  }, { once: true });
  bindStaticEvents();
  app.subscribe(renderAll);
  renderAll();
})();
