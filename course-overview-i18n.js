/*
 * Proposed bilingual dictionary for the static HTML course portal.
 *
 * Conventions
 * - Turkish is the default language.
 * - Values in braces are runtime placeholders, e.g. {week}, {count}, {title}.
 * - Bibliographic titles, institutional names, URLs and video titles remain in
 *   their published/original form unless an established English name exists.
 * - `html` values contain trusted, author-controlled emphasis only. All other
 *   values are intended for `textContent`/attribute assignment.
 * - `weeklyOverview` is a translation overlay for the overview data in app.js;
 *   stable URLs and YouTube IDs should remain in the language-neutral dataset.
 */
(function (root) {
  "use strict";

  var SITE_UI_I18N = {
    defaultLanguage: "tr",
    supportedLanguages: ["tr", "en"],

    tr: {
      language: {
        code: "tr",
        locale: "tr-TR",
        name: "Türkçe",
        switcherLabel: "Dil seçimi",
        currentLanguage: "Geçerli dil: Türkçe",
        switchTo: "Site dilini Türkçe yap",
        changedAnnouncement: "Site dili Türkçe olarak değiştirildi."
      },

      meta: {
        title: "Kamu Diplomasisi ve Yumuşak Güç | Ders Portalı",
        description: "Hitit Üniversitesi Kamu Diplomasisi ve Yumuşak Güç lisansüstü dersi için Dr Murat Toman'ın 14 haftalık notları, kaynak okumaları, YouTube videoları, podcastleri, testleri ve sunumları.",
        ogTitle: "Kamu Diplomasisi ve Yumuşak Güç",
        ogDescription: "Hitit Üniversitesi Kamu Diplomasisi ve Yumuşak Güç lisansüstü dersi için Dr Murat Toman'ın iki dilli ders sitesi."
      },

      header: {
        skipLink: "İçeriğe geç",
        brandAria: "Ders portalı ana sayfa",
        brandPrimary: "Kamu Diplomasisi",
        brandSecondary: "ve Yumuşak Güç",
        mainNavAria: "Ana menü",
        mobileMenuOpen: "Menüyü aç",
        mobileMenuClose: "Menüyü kapat",
        nav: {
          home: "Ana sayfa",
          weeks: "Haftalar",
          syllabus: "İzlence",
          studyCentre: "Çalışma merkezi",
          resources: "Kaynaklar",
          materials: "Materyaller",
          about: "Ders hakkında"
        },
        printAria: "İzlenceyi yazdır",
        printButton: "Yazdır / PDF"
      },

      intro: {
        eyebrow: "Hitit Üniversitesi · Lisansüstü Ders",
        titlePrimary: "Kamu Diplomasisi ve",
        titleSecondary: "Yumuşak Güç",
        lead: "Gücün kavramlarından Benjamin Franklin’e, kamu–özel ortaklıklarından savaş zamanı bilgi kurumlarına uzanan etkileşimli bir tarih ve analiz dersi.",
        featuresAria: "Dersin temel özellikleri",
        features: [
          "14 hafta",
          "Türkçe",
          "İnteraktif çalışma alanı",
          "140 kavram kartı / dil",
          "140 mini test sorusu / dil",
          "14 haftalık oyun",
          "120 etkin dakika"
        ],
        goToProgramme: "Haftalık programa git",
        downloadPresentations: "Sunumları indir",
        portraitAlt: "Joseph Siffred Duplessis tarafından yapılan Benjamin Franklin portresi",
        openingCaseLabel: "Başlangıç vakası:",
        openingCaseText: "Benjamin Franklin ve Fransa, 1776–1778"
      },

      thesis: {
        aria: "Dersin ana sorusu",
        kicker: "Dersin ana sorusu",
        html: "Bir aktör yabancı bir kamuyla <strong>hangi kaynak</strong>, <strong>hangi aracı</strong> ve <strong>hangi mekanizma</strong> üzerinden ilişki kurar; bu ilişkiyi bir politika sonucuyla bağlamak için <strong>hangi kanıt</strong> gerekir?"
      },

      weeklyProgramme: {
        eyebrow: "Ders akışı",
        title: "14 haftalık program",
        description: "Her haftada ayrıntılı ders anlatımı, 10 kavram kartı, mini test, oyun, video, podcast, bölüm bölüm kaynak okuması ve kısa ödev bulunur.",
        searchLabel: "Haftalarda ara",
        searchPlaceholder: "Örn. Franklin, propaganda, OWI",
        filterAria: "Haftaları konuya göre filtrele",
        filters: {
          all: "Tümü",
          concept: "Kavram",
          history: "Tarih",
          institutions: "Kurumlar",
          comparison: "Karşılaştırma"
        },
        studyAdviceLabel: "Çalışma önerisi:",
        studyAdvice: "Birikimli 120 etkin dakikayı ders notu, kartlar, mini test, oyun, kaynak, video, podcast ve ödev arasında bölün. Ödevi süre 120:00’a ulaşmadan yükleyin. Görsel ve işitsel anlatım tek başına tarihsel veya nedensel kanıt sayılmaz.",
        emptyState: "Aramanızla eşleşen hafta bulunamadı.",
        allWeeksShown: "{count} haftanın tamamı gösteriliyor.",
        oneWeekShown: "1 hafta gösteriliyor.",
        weeksShown: "{count} hafta gösteriliyor."
      },

      sourceLiteracy: {
        galleryAria: "Tarihsel belge galerisi",
        franklinPrintAlt: "Franklin’in bilimsel itibarı ile özgürlük fikrini ilişkilendiren 1778 tarihli alegorik baskı",
        franklinPrintCaption: "İtibar bir kaynaktır; etki ise ayrıca kanıtlanmalıdır.",
        eyebrow: "Kaynak okuryazarlığı",
        title: "Görünürlük, alımlama ve sonuç aynı şey değildir.",
        paragraph: "Portre, gazete, mektup ve antlaşma farklı sorulara cevap verir. Ders boyunca kaynaklar niyet, faaliyet, yabancı alımlama, karar süreci ve gözlenebilir sonuç düzeylerinde ayrıştırılır.",
        treatyPrintAlt: "1778 Fransa–Amerika antlaşmalarının imzalanmasını gösteren tarihî baskı",
        treatyPrintCaption: "Bir sonuç belgesi, sonucun tek nedenini göstermez."
      },

      syllabus: {
        eyebrow: "Ders izlencesi",
        title: "Kaynağa dayalı lisansüstü seminer",
        outcomesTitle: "Öğrenme çıktıları",
        outcomes: [
          "Sert, yumuşak ve akıllı güç arasındaki farkı açıklamak.",
          "Kamu diplomasisini propaganda, diplomasi ve halkla ilişkilerden ayırmak.",
          "Tarihsel vakalarda hedef kitle, araç ve mekanizmayı belirlemek.",
          "Faaliyet, alımlama ve politika sonucu arasındaki kanıt zincirini kurmak.",
          "Devlet ve devlet dışı aktörlerin rollerini karşılaştırmak.",
          "Bir kamu diplomasisi uygulamasını etik ve ölçüm açısından değerlendirmek."
        ],
        sessionTitle: "Ders oturumunun yapısı",
        sessionFlow: [
          { title: "Çerçeve", description: "kısa kavramsal giriş" },
          { title: "Kaynak laboratuvarı", description: "metin, görsel veya belge" },
          { title: "Video ve tartışma", description: "iddia ve eksik kalan neden" },
          { title: "Atölye", description: "harita, denetim veya mini vaka" },
          { title: "Oturum sonu değerlendirmesi", description: "tek cümlelik temkinli sonuç" },
          { title: "Haftalık ödev", description: "250–400 kelimelik kanıt notu; 120:00’dan önce yükleme" }
        ],
        assessmentTitle: "Önerilen değerlendirme",
        assessment: [
          { label: "Haftalık portal çalışması ve zamanında ödevler · 14 × 10 puan", weight: "%30" },
          { label: "Katılım ve sınıf atölyeleri", weight: "%20" },
          { label: "Grup vaka sunumu · 10 dakika", weight: "%20" },
          { label: "Final vaka notu · 1.200–1.500 kelime", weight: "%30" }
        ],
        preparationTarget: "Her 12 etkin dakika 1 puandır; haftalık puanın geçerli olması için ödev birikimli süre 120:00’a ulaşmadan yüklenmelidir."
      },

      comparativeCases: {
        eyebrow: "Karşılaştırmalı pencere",
        title: "Dünyadan kısa vakalar",
        description: "Bu kartlar ‘başarı hikâyesi’ değil; aktör, araç, hedef kitle ve kanıt sınırı tartışmalarıdır.",
        evidenceLimitLabel: "Kanıt sınırı:",
        inspectSource: "Kaynağı incele ↗",
        inspectSourceAria: "Kaynağı incele: {institution}"
      },

      resourceCentre: {
        eyebrow: "Kaynak merkezi",
        title: "Temel ve tamamlayıcı okumalar",
        description: "Her hafta ayrı okuma verilmiştir. Aşağıdaki liste dönem boyunca başvurulacak ortak kitaplığı gösterir.",
        mainWork: "Ana eser",
        schindlerDescription: "Amerikan yabancı kamuoyu etkileşimini 1776’dan 1948’e uzanan altı tarihsel vaka üzerinden inceler.",
        bookLink: "Kitap ve bölüm bilgilerine git ↗",
        bookLinkAria: "Schindler, The Origins of Public Diplomacy in US Statecraft kitap ve bölüm bilgileri",
        accessNoteLabel: "Erişim notu:",
        accessNote: "Bazı kitap ve makaleler kurumsal abonelik gerektirebilir. Site yalnızca yasal yayıncı, DOI ve açık erişim bağlantılarını gösterir.",
        imageSourcesLabel: "Görsel kaynakları:",
        imageSourcesPrefix: "Franklin portresi,",
        imageSourcesMiddle: "; Au Génie de Franklin,",
        imageSourcesEnd: "; 1778 antlaşma baskısı,",
        publicDomainStatement: "Kamu malı tarihî görsellerdir.",
        publisherLink: "DOI / yayıncı ↗",
        publisherLinkAria: "DOI veya yayıncı: {author}, {title}"
      },

      materials: {
        eyebrow: "Ders materyalleri",
        title: "Hazır sunumlar ve çalışma dosyaları",
        description: "14 haftanın her biri için 30 slaytlık Türkçe ve İngilizce sunumları tek tek veya toplu olarak indirin.",
        week1Title: "1. Hafta · Gücü Anlamak",
        week1Description: "Kavramsal çerçeve, sert güç, yumuşak güç ve mekanizmalar · 30 slayt",
        week2Title: "2. Hafta · Kamu Diplomasisinden Önce",
        week2Description: "Benjamin Franklin, Fransa ve yabancı kamuoylarıyla etkileşim · 30 slayt",
        syllabusTitle: "Ders izlencesi",
        syllabusDescription: "Haftalık programı, değerlendirmeyi ve kaynakları yazdırın veya PDF olarak kaydedin."
      },

      academicIntegrity: {
        title: "Akademik çalışma ilkesi",
        paragraph: "Bir belgenin varlığı, belgelenen faaliyetin etkisini tek başına göstermez. İddialar, kaynağın desteklediği çıkarımlarla sınırlandırılmalı; niyet, faaliyet, alımlama, karar ve sonuç düzeylerindeki kanıtlar birbirinden ayrılmalıdır."
      },

      footer: {
        courseTitle: "Kamu Diplomasisi ve Yumuşak Güç",
        attribution: "Dr Murat Toman · Hitit Üniversitesi",
        weeks: "Haftalar",
        syllabus: "İzlence",
        resources: "Kaynaklar",
        backToTop: "Başa dön ↑"
      },

      videoDialog: {
        closeAria: "Videoyu kapat",
        eyebrow: "Haftanın videosu",
        openOnYouTube: "YouTube’da aç ↗",
        iframeTitle: "{title} videosu"
      },

      noScript: "Haftalık kartları ve video oynatıcıyı görmek için JavaScript’i etkinleştirin.",

      weekCard: {
        goalsTitle: "Haftalık öğrenme hedefleri",
        inClassActivity: "Sınıf içi etkinlik",
        shortPreparation: "Kısa hazırlık:",
        videoOverline: "YouTube · İngilizce",
        openVideo: "Videoyu aç"
      },

      studyUi: {
        tabs: {
          tablistAria: "{week}. hafta çalışma alanları",
          lesson: "Ders notu",
          lessonLong: "Ayrıntılı ders notu",
          cards: "Kavram kartları",
          cardsLong: "Kavram kartları",
          quiz: "10 soruluk mini test",
          game: "Oyun",
          resources: "Kaynaklar",
          resourcesLong: "Kaynak, etkinlik ve video"
        },
        lesson: {
          kicker: "Hafta {week} · Ders anlatımı",
          fallbackTitle: "Haftanın ayrıntılı konu anlatımı",
          estimatedTime: "Yaklaşık 10–12 dk.",
          takeawaysTitle: "Beş temel çıkarım",
          discussionTitle: "Seminer tartışması"
        },
        flashcards: {
          cardAria: "Kart {index}: {front}. Cevabı görmek için seçin.",
          questionAria: "Soru: {front}. Cevabı görmek için seçin.",
          answerAria: "Yanıt: {back}. Soruya dönmek için seçin.",
          frontHint: "Cevabı görmek için dokunun",
          answerTag: "Yanıt",
          backHint: "Soruya dönmek için dokunun",
          kicker: "Aktif tekrar",
          title: "Kavramların tanımlanması ve karşılaştırılması",
          instruction: "Tanımı görüntülemeden önce kavramı açıklayınız; ardından yanıtı verilen açıklamayla karşılaştırınız.",
          progress: "{seen} / {total} kart görüldü",
          reset: "Kartları sıfırla"
        },
        quiz: {
          correctAnswer: "Doğru cevap: {answer}",
          kicker: "Kavramsal değerlendirme",
          title: "10 soruluk mini test",
          instruction: "Yanıtladıktan sonra gerekçeyi okuyun; puan yalnızca geri bildirimdir.",
          checkAnswers: "Yanıtları kontrol et",
          retry: "Yeniden çöz",
          incompleteFeedback: "{answered} soru yanıtlandı. {correct} doğru. Boş bıraktığınız soruları da tamamlayın.",
          completeFeedback: "{total} soruda {correct} doğru. Açıklamaları okuyarak yanıtlarınızı değerlendirin."
        },
        game: {
          kicker: "Haftanın oyunu",
          title: "Kavram eşleştirme",
          instruction: "Önce bir kavramı, ardından ona karşılık gelen doğru açıklamayı seçin.",
          termsAria: "Kavramlar",
          termsHeading: "Kavramlar",
          definitionsAria: "Açıklamalar",
          definitionsHeading: "Karışık açıklamalar",
          status: "Doğru: {matches} / {total} · Deneme: {attempts}",
          reset: "Oyunu yeniden başlat",
          complete: "Dört kavram eşleştirmesi {attempts} denemede tamamlandı.",
          correct: "Doğru eşleşme. {matches} / {total} tamamlandı · Deneme: {attempts}",
          incorrect: "Bu eşleşme olmadı; yeniden deneyin. Doğru: {matches} / {total} · Deneme: {attempts}"
        }
      },

      progress: {
        title: "İlerlemem",
        continueStudying: "Çalışmaya devam et",
        completedWeeks: "{completed} / {total} hafta tamamlandı",
        markComplete: "Tamamlanma durumunu gör",
        markedComplete: "Hafta tamamlandı",
        completionManagedInPortal: "{week}. haftanın süre, ödev ve tamamlanma durumu öğrenci alanında gösterilir.",
        reset: "Çalışma araçlarını sıfırla",
        resetConfirmTitle: "Çalışma araçları sıfırlansın mı?",
        resetConfirmText: "Kavram kartı, mini test, oyun ve açık sekme durumunuz bu tarayıcıdan silinecek. Öğrenci hesabı, etkin süre ve ödevler silinmez.",
        cancel: "Vazgeç",
        confirmReset: "Evet, sıfırla"
      },

      bilingualSearch: {
        resultsTitle: "Arama sonuçları",
        searchCurrentLanguage: "Yalnızca Türkçe içerikte ara",
        searchBothLanguages: "Her iki dilde ara",
        noResults: "Bu aramayla eşleşen içerik bulunamadı.",
        oneResultFound: "1 sonuç bulundu",
        resultCount: "{count} sonuç bulundu",
        resultTypeWeek: "Hafta",
        resultTypeLesson: "Ders notu",
        resultTypeConcept: "Kavram",
        resultTypeFlashcard: "Kavram kartı",
        resultTypeReading: "Okuma",
        resultTypeCase: "Vaka",
        goToResult: "Sonuca git: {title}"
      },

      cases: {
        "case-uk": { country: "Birleşik Krallık", institution: "British Council", tool: "Dil, eğitim ve kültürel ilişkiler", limit: "Program erişimi, dış politika desteğini tek başına göstermez." },
        "case-germany": { country: "Almanya", institution: "Goethe-Institut", tool: "Dil öğretimi ve merkez ağı", limit: "Katılım ile ülke imajındaki değişim ayrı ölçülmelidir." },
        "case-france": { country: "Fransa", institution: "Alliance Française", tool: "Yerel ortaklıklarla dil ve kültür", limit: "Dağıtık örgüt yapısı, doğrudan devlet kontrolü varsayımını zayıflatır." },
        "case-eu": { country: "Avrupa Birliği", institution: "Erasmus+", tool: "Öğrenci ve personel hareketliliği", limit: "Hareketlilik ve ağ oluşumu, siyasi uyumun otomatik kanıtı değildir." },
        "case-turkiye": { country: "Türkiye", institution: "Yunus Emre Enstitüsü", tool: "Türkçe öğretimi ve kültür programları", limit: "Faaliyet sayısı, yabancı alımlama ve davranış değişimini ölçmez." },
        "case-korea": { country: "Güney Kore", institution: "Korea Foundation", tool: "Akademik değişim ve kültür ağları", limit: "Kore kültürüne ilgi ile devlet politikalarına destek ayrıştırılmalıdır." },
        "case-china": { country: "Çin", institution: "Kültür ve eğitim ağları", tool: "Dil, burs, medya ve dijital kanallar", limit: "Kapasite ve görünürlük; güven, kabul veya etkiyle aynı değildir." },
        "case-qatar": { country: "Katar", institution: "Al Jazeera Media Network", tool: "Sınır ötesi haber ve gündem kurma", limit: "İzleyici erişimi ile devlet nüfuzu arasında bağımsız kanıt gerekir." }
      },

      weeklyOverview: {
        "week-01": {
          tag: "Kavram",
          title: "Gücü anlamak: sert, yumuşak ve ilişkisel güç",
          summary: "Kamu diplomasisini tanımlamadan önce güç, çekicilik, ikna ve bağlamı ayırıyoruz.",
          goals: ["Sert güç, yumuşak güç ve akıllı güç arasındaki farkı açıklamak", "Kamu diplomasisini propaganda ve geleneksel diplomasiden ayırmak", "Kaynak, araç, mekanizma ve sonuç kavramlarını doğru sıraya yerleştirmek"],
          primaryLabel: "Zorunlu · seçilmiş 18–20 sayfa",
          primaryText: "Caitlin E. Schindler, ‘Reconnecting the Past and Present’, ss. 1–39’dan seçmeler",
          optionalLabel: "Tamamlayıcı",
          optionalText: "Joseph S. Nye, ‘Public Diplomacy and Soft Power’, The ANNALS 616/1 (2008), ss. 94–109",
          activity: "Güç kartları: Sekiz dış politika örneğini kaynak, mekanizma ve olası sonuç bakımından sınıflandırın.",
          prep: "Dersten önce gündelik hayattan bir ‘çekicilik’ ve bir ‘zorlama’ örneği getirin.",
          videoDuration: "5:28",
          videoNote: "Tanımı izlerken tek yönlü anlatım ile karşılıklı ilişki arasındaki farkı not edin."
        },
        "week-02": {
          tag: "Erken dönem",
          title: "Kamu diplomasisinden önce: Benjamin Franklin ve Fransa",
          summary: "İtibar, ağlar, basılı dolaşım ve Fransız kamuoylarıyla etkileşim.",
          goals: ["Franklin’in bilimsel ve kamusal itibarını diplomatik bir kaynak olarak incelemek", "Fransız kamuoyunun tek ve homojen bir aktör olmadığını göstermek", "Franklin’in katkısını Saratoga ve Fransız stratejisinden ayırarak değerlendirmek"],
          primaryLabel: "Zorunlu · yaklaşık 20 sayfa",
          primaryText: "Schindler, ‘America’s First Public Diplomat’, ss. 41–60",
          optionalLabel: "Tamamlayıcı",
          optionalText: "Jonathan R. Dull, ‘Franklin the Diplomat: The French Mission’, Transactions of the American Philosophical Society, New Series 72/1 (1982), seçilmiş sayfalar",
          activity: "Kanıt mı, çıkarım mı? Franklin portresi, mektup ve antlaşma belgesinin hangi iddiayı desteklediğini sınıflandırın.",
          prep: "Bir görsel seçin: Görselin gösterdiği şey ile yalnızca ima ettiği şeyi iki cümlede ayırın.",
          videoDuration: "2:21",
          videoNote: "Video hangi aktörü ve hangi nedeni öne çıkarıyor? Hangi yapısal koşullar arka planda kalıyor?"
        },
        "week-03": {
          tag: "İç Savaş",
          title: "Birlik’in kamu diplomasisi: tanınma, kölelik ve dış kamuoyu",
          summary: "Amerikan İç Savaşı sırasında Britanya ve Fransa’daki tanınma mücadelesi.",
          goals: ["Birlik’in yabancı kamuoyuna yönelik amaç ve araçlarını belirlemek", "Emansipasyonun anlatı ve politika bağlamındaki rolünü tartışmak", "Basın görünürlüğü ile hükümet kararını aynı şey saymamak"],
          primaryLabel: "Zorunlu · yaklaşık 16 sayfa",
          primaryText: "Schindler, ‘Public Diplomacy of the Union’, ss. 94–109",
          optionalLabel: "Tamamlayıcı",
          optionalText: "Thomas E. Sebrell II, Persuading John Bull’dan seçilmiş bölüm",
          activity: "Hedef kitle haritası: Kabine, işçiler, kölelik karşıtları, basın ve tüccarlar için farklı mesaj–aracı kombinasyonları tasarlayın.",
          prep: "Birlik’in dış kamuoyu için kullanabileceği iki iddia ve bu iddialara karşı bir rakip açıklama yazın.",
          videoDuration: "8:03",
          videoNote: "Diplomasi ile emansipasyon arasındaki bağlantının hangi kanıta dayandığını sorgulayın."
        },
        "week-04": {
          tag: "Karşı anlatı",
          title: "Konfederasyon, ‘King Cotton’ ve dış kamuoyu",
          summary: "Aynı yabancı kamuoyu üzerinde yarışan anlatılar ve başarısız ikna stratejileri.",
          goals: ["Birlik ve Konfederasyonun hedef kitlelerini karşılaştırmak", "Ekonomik bağımlılık iddiasının siyasal iknaya nasıl çevrildiğini incelemek", "Başarısız bir kampanyanın sonuçlarını nedenleriyle birlikte açıklamak"],
          primaryLabel: "Zorunlu · kısa seçmeler",
          primaryText: "Schindler, ‘Public Diplomacy of the Union’, ss. 75–93 (Birlik karşılaştırması; Konfederasyonun doğrudan kaynağı değil)",
          optionalLabel: "Tamamlayıcı",
          optionalText: "Duncan Andrew Campbell, English Public Opinion and the American Civil War’dan seçme",
          activity: "Karşı anlatı denetimi: ‘King Cotton’ tezinin varsayımlarını, hedef kitlesini ve gözlenebilir başarısızlık göstergelerini çıkarın.",
          prep: "Bir propaganda iddiasını çürütebilecek tek bir kanıt türü belirleyin.",
          videoDuration: "İlk 12 dakika",
          videoNote: "İlk 12 dakikayı izleyin; ekonomik çıkarın otomatik olarak diplomatik desteğe dönüşüp dönüşmediğini tartışın."
        },
        "week-05": {
          tag: "Kamu–özel ortaklığı",
          title: "İnsani yardım ve dış politika: Küba vakası",
          summary: "Reconcentrados yardımı, Kızılhaç ve siyasi amaç arasındaki gerilim.",
          goals: ["İnsani yardımın dış kamuoyu etkileşimindeki rolünü açıklamak", "Devlet, iş dünyası, dinî gruplar ve Kızılhaç arasındaki ilişkiyi haritalamak", "İnsani sonuç ile siyasi etkiyi birbirinden ayırmak"],
          primaryLabel: "Zorunlu · yaklaşık 16 sayfa",
          primaryText: "Schindler, ‘Early Public-Private Partnerships for Public Diplomacy’, ss. 111–127",
          optionalLabel: "Tamamlayıcı",
          optionalText: "Julia F. Irwin, Making the World Safe’dan seçilmiş bölüm",
          activity: "Yardım diplomasisi matrisi: insani amaç, siyasi hedef, aracı aktör ve kanıtlanabilir sonucu ayrı sütunlara yerleştirin.",
          prep: "Bir yardım faaliyetinin siyasi etki yarattığını göstermek için gerekli iki ek kaynak türünü yazın.",
          videoDuration: "2:15",
          videoNote: "İnsani gerekçe ile stratejik motivasyonların birbirine nasıl bağlandığını not edin."
        },
        "week-06": {
          tag: "Değişim",
          title: "Pan-Amerikan eğitim değişimleri ve ilişki kurma",
          summary: "Kısa mesaj kampanyasından uzun vadeli ağlara geçiş.",
          goals: ["Eğitim değişiminin varsayılan etki mekanizmasını kurmak", "Değişim programı katılımı ile politika etkisini ayırmak", "Pan-Amerikan ağları Fulbright ve Erasmus+ ile karşılaştırmak"],
          primaryLabel: "Zorunlu · yaklaşık 16 sayfa",
          primaryText: "Schindler, ‘Early Public-Private Partnerships for Public Diplomacy’, ss. 128–144",
          optionalLabel: "Tamamlayıcı",
          optionalText: "Liping Bu, Making the World Like Us’dan seçilmiş bölüm",
          activity: "Değişim programı mekanizma haritası: seçim → temas → öğrenme → ağ → olası sonuç zincirindeki en zayıf bağlantıyı bulun.",
          prep: "Bir değişim programının kısa ve uzun vadeli çıktılarından birer örnek verin.",
          videoDuration: "1:41",
          videoNote: "1946 sonrası Fulbright örneğini daha erken Pan-Amerikan değişim tasarılarıyla karşılaştırın; hedef, faaliyet ve sonucu ayırın."
        },
        "week-07": {
          tag: "I. Dünya Savaşı",
          title: "Committee on Public Information: ilk kamu diplomasisi ajansı mı?",
          summary: "CPI Foreign Section, özel ortaklar ve savaş zamanı bilgi üretimi.",
          goals: ["CPI’nin kuruluş gerekçesini ve dış faaliyetlerini açıklamak", "Ajans, ağ ve ad hoc komite arasındaki farkı tartışmak", "Bilgilendirme ile propaganda arasındaki adlandırma siyasetini incelemek"],
          primaryLabel: "Zorunlu · seçilmiş 18 sayfa",
          primaryText: "Schindler, ‘America’s First Public Diplomacy Agency?’, ss. 145–162",
          optionalLabel: "Tamamlayıcı",
          optionalText: "John Maxwell Hamilton, Manipulating the Masses’dan seçilmiş bölüm",
          activity: "Ajans tasarım atölyesi: görev, hedef kitle, ortak, geri bildirim ve hesap verebilirlik kutularını doldurun.",
          prep: "‘Bilgi’ ve ‘propaganda’ için birer çalışma tanımı hazırlayın.",
          videoDuration: "1:38",
          videoNote: "Creel’in faaliyeti nasıl adlandırdığını ve videonun onu nasıl çerçevelediğini karşılaştırın."
        },
        "week-08": {
          tag: "Etik ve miras",
          title: "Propaganda, güvenilirlik ve savaş sonrası geri çekilme",
          summary: "CPI’nin mirası, propaganda karşıtlığı ve özel aktörlere dönüş.",
          goals: ["CPI’nin dağıtım kapasitesi ile ikna etkisini ayırmak", "Doğruluk, kaynak açıklığı ve hedef kitle etiğini tartışmak", "Savaş sonrası kurumsal kesinti ile faaliyet sürekliliğini karşılaştırmak"],
          primaryLabel: "Zorunlu · yaklaşık 17 sayfa",
          primaryText: "Schindler, ‘America’s First Public Diplomacy Agency?’, ss. 163–179",
          optionalLabel: "Tamamlayıcı",
          optionalText: "Eytan Gilboa, ‘Searching for a Theory of Public Diplomacy’, The ANNALS 616/1 (2008), ss. 55–77",
          activity: "Etik jüri: Şeffaflık, doğruluk, hedefleme ve aciliyet ölçütleriyle üç savaş zamanı uygulamasını değerlendirin.",
          prep: "Güvenilirliği korumak için vazgeçilmez gördüğünüz tek ilkeyi yazın.",
          videoDuration: "58:41 · uzun söyleşi",
          videoNote: "Söyleşide araç, hedef kitle, doğruluk ve hesap verebilirlik sorunlarını işaretleyin. Çalışma sorusuna yanıt veren bir kesitin başlangıç ve bitiş zamanını not edin."
        },
        "week-09": {
          tag: "İki savaş arası",
          title: "Vakıflar, uzman ağları ve özel diplomasi",
          summary: "Rockefeller, Carnegie ve IIE üzerinden özel kapasite ve devletle paralellik.",
          goals: ["İki savaş arası dönemde özel aktörlerin süreklilik rolünü göstermek", "Paralel faaliyet, kolaylaştırma ve resmî ortaklığı birbirinden ayırmak", "Uzman ağlarının erişim ve öğrenme mekanizmalarını değerlendirmek"],
          primaryLabel: "Zorunlu · seçilmiş 18 sayfa",
          primaryText: "Schindler, ‘InterWar Public Diplomacy’, ss. 181–200",
          optionalLabel: "Tamamlayıcı",
          optionalText: "Katharina Rietzler, ‘Before the Cultural Cold Wars’, Historical Research 84/223 (2011), ss. 148–164",
          activity: "Yetki matrisi: fonlayan, uygulayan, seçen, denetleyen ve faydalanan aktörleri ayrı kutulara yerleştirin.",
          prep: "Bir vakfın kamu diplomasisi aktörü sayılması için gerekli iki ölçüt önerin.",
          videoDuration: "2023 · sonraki dönem karşılaştırması",
          videoNote: "2023 tarihli vakıf anlatısını 1923–1938 International Education Board metniyle karşılaştırın; kurumun kendi başarı iddiasını kanıt saymayın."
        },
        "week-10": {
          tag: "II. Dünya Savaşı",
          title: "Kurumsal karmaşa: DCR, CIAA ve OWI",
          summary: "Örtüşen görevler, farklı bölgeler ve savaş zamanı koordinasyon sorunu.",
          goals: ["Üç kurumun görev ve hedef kitlelerini karşılaştırmak", "Kurumsal örtüşmenin maliyet ve fırsatlarını açıklamak", "Hedef belirlemek ile uygun mekanizma seçmek arasındaki farkı göstermek"],
          primaryLabel: "Zorunlu · seçilmiş 20 sayfa",
          primaryText: "Schindler, ‘Public Diplomacy in Chaos and Ambiguity’, ss. 219–245",
          optionalLabel: "Tamamlayıcı",
          optionalText: "Allan M. Winkler, The Politics of Propaganda’dan seçilmiş bölüm",
          activity: "Kurumsal harita: Aynı hedefe çalışan üç kurum için yetki, araç, bölge ve geri bildirim kanallarını çakıştırın.",
          prep: "Bir kurumun koordinasyon sorununu gösteren tek bir gözlenebilir belirti yazın.",
          videoDuration: "2:37",
          videoNote: "Bir filmin üretilmiş olması ile yabancı izleyicide etki yaratması arasındaki eksik kanıtı bulun."
        },
        "week-11": {
          tag: "Araçlar",
          title: "Radyo, film, basın ve İyi Komşuluk",
          summary: "Uluslararası yayıncılık, kültürel anlatı ve Latin Amerika’ya yönelik faaliyetler.",
          goals: ["Farklı iletişim araçlarının erişim ve güven özelliklerini karşılaştırmak", "İyi Komşuluk anlatısının hedef kitlesini ve bağlamını açıklamak", "Üretim, dağıtım, alımlama ve etki göstergelerini ayırmak"],
          primaryLabel: "Zorunlu · seçilmiş 18 sayfa",
          primaryText: "Schindler, ‘Public Diplomacy in Chaos and Ambiguity’, ss. 246–265",
          optionalLabel: "Tamamlayıcı",
          optionalText: "Holly Cowan Shulman, The Voice of America’dan seçilmiş bölüm",
          activity: "Etki merdiveni: film gösterimi ve radyo yayını için çıktı → erişim → alımlama → ara etki → politika sonucu zinciri kurun.",
          prep: "Bir medya metriğinin neyi gösterdiğini ve neyi gösteremediğini yazın.",
          videoDuration: "2:09",
          videoNote: "Bu erken Soğuk Savaş filmi üzerinden savaş zamanı araçlarının devamlılığını ve değişimini tartışın."
        },
        "week-12": {
          tag: "Kurumsallaşma",
          title: "1945–1948: Smith–Mundt ve kalıcı kamu diplomasisi",
          summary: "Savaş aygıtından yasal yetkiye, kurumlaşmaya ve hedef kitle sınırlarına geçiş.",
          goals: ["Smith–Mundt Yasası’nın kurumsallaşmadaki rolünü açıklamak", "Yasal yetki ile kurumsal etkinliği aynı şey saymamak", "İç ve dış hedef kitle ayrımının tarihsel mantığını tartışmak"],
          primaryLabel: "Zorunlu · kısa seçme",
          primaryText: "Schindler, ‘Public Diplomacy in Chaos and Ambiguity’, ss. 266–275 ve Smith–Mundt Yasası özeti",
          optionalLabel: "Birincil resmî belge",
          optionalText: "United States Information and Educational Exchange Act of 1948 — Smith–Mundt Yasası (GovInfo)",
          activity: "Kurumsal tasarım: Yetki, denetim, hedef kitle, medya bağımsızlığı ve değerlendirme maddelerinden beş maddelik bir yasa özeti yazın.",
          prep: "Kurumsallaşmanın başarısını ölçmek için tek bir süreç ve tek bir sonuç göstergesi belirleyin.",
          videoDuration: "1:26:41 · uzun söyleşi",
          videoNote: "Yasal düzenleme ile uygulama kapasitesini ayıran bir kesit seçip başlangıç ve bitiş zamanını not edin."
        },
        "week-13": {
          tag: "Karşılaştırma",
          title: "Tarihsel örüntüler: Birleşik Krallık ve Almanya kurumları",
          summary: "ABD tarihinden çıkarılan örüntüleri Britanya ve Almanya kültür enstitüleri ile yayıncılarının yönetişimi üzerinden sınamak.",
          goals: ["Schindler’in beş tarihsel örüntüsünü özetlemek", "Bir Amerikan tarihsel bulgusunu evrensel yasa gibi aktarmamak", "Kültür enstitüsü, yayıncı ve değişim programı modellerini karşılaştırmak"],
          primaryLabel: "Zorunlu · yaklaşık 18 sayfa",
          primaryText: "Schindler, ‘Foreign Public Engagement: An American Tradition in Context’, ss. 277–295",
          optionalLabel: "Tamamlayıcı",
          optionalText: "Bruce Gregory, ‘American Public Diplomacy: Enduring Characteristics, Elusive Transformation’, HJD 6/3–4 (2011)",
          activity: "British Council/BBC ile Goethe-Institut/Deutsche Welle öz tanımlarını aynı yönetişim ölçütleriyle karşılaştırın; bu metinlerin etkiyi kanıtlamadığını belirtin.",
          prep: "İki kurum için resmî amaç ve fiilî uygulama ayrımını sınayacak bağımsız birer kayıt türü önerin.",
          videoDuration: "2:23",
          videoNote: "Dijital aracın tarihsel mekanizmayı gerçekten değiştirip değiştirmediğini tartışın."
        },
        "week-14": {
          tag: "Sentez",
          title: "Etkiyi ölçmek, etik sınırlar ve final vaka laboratuvarı",
          summary: "Tarihsel dersleri dijital döneme taşırken kanıt, karşılıklılık ve belirsizlik.",
          goals: ["Faaliyet, erişim, alımlama, ara etki ve sonuç göstergelerini birlikte kullanmak", "Karşılıklılık, doğruluk ve hedefleme bakımından etik sınırlar kurmak", "Bir vakaya koşullu ve kanıta uygun sonuç cümlesi yazmak"],
          primaryLabel: "Zorunlu · yaklaşık 18 sayfa",
          primaryText: "Schindler, ‘Foreign Public Engagement: An American Tradition in Context’, ss. 296–313",
          optionalLabel: "Tamamlayıcı",
          optionalText: "Ilan Manor, The Digitalization of Public Diplomacy’den seçilmiş bölüm",
          activity: "Final kanıt kliniği: Her öğrenci vaka iddiasını, mekanizmasını, rakip açıklamasını, iki kanıtını ve bir sınırını 90 saniyede sunar.",
          prep: "Final vaka notunuz için tek cümlelik iddia, bir rakip açıklama ve eksik kalan kaynağı getirin.",
          videoDuration: "59:13 · araştırma sunumu",
          videoNote: "Araştırma tasarımının ‘etki’ iddiasını nasıl sınadığını gösteren bir kesit seçin; zamanını ve korunan belirsizliği not edin."
        }
      }
    },

    en: {
      language: {
        code: "en",
        locale: "en-GB",
        name: "English",
        switcherLabel: "Language selection",
        currentLanguage: "Current language: English",
        switchTo: "Change the site language to English",
        changedAnnouncement: "The site language has been changed to English."
      },

      meta: {
        title: "Public Diplomacy and Soft Power | Course Portal",
        description: "Fourteen weeks of bilingual notes, source readings, YouTube videos, podcasts, quizzes and presentations for Dr Murat Toman's graduate course at Hitit University.",
        ogTitle: "Public Diplomacy and Soft Power",
        ogDescription: "Dr Murat Toman's bilingual course site for Public Diplomacy and Soft Power at Hitit University."
      },

      header: {
        skipLink: "Skip to content",
        brandAria: "Course portal home",
        brandPrimary: "Public Diplomacy",
        brandSecondary: "and Soft Power",
        mainNavAria: "Main navigation",
        mobileMenuOpen: "Open menu",
        mobileMenuClose: "Close menu",
        nav: {
          home: "Home",
          weeks: "Weeks",
          syllabus: "Syllabus",
          studyCentre: "Study Centre",
          resources: "Resources",
          materials: "Materials",
          about: "About the Course"
        },
        printAria: "Print the syllabus",
        printButton: "Print / PDF"
      },

      intro: {
        eyebrow: "Hitit University · Graduate Course",
        titlePrimary: "Public Diplomacy and",
        titleSecondary: "Soft Power",
        lead: "An interactive course in history and analysis, ranging from concepts of power and Benjamin Franklin to public–private partnerships and wartime information institutions.",
        featuresAria: "Key course features",
        features: [
          "14 weeks",
          "English",
          "Interactive study area",
          "140 flashcards / language",
          "140 mini-quiz questions / language",
          "14 weekly games",
          "120 active minutes"
        ],
        goToProgramme: "Go to the weekly programme",
        downloadPresentations: "Download presentations",
        portraitAlt: "Portrait of Benjamin Franklin by Joseph Siffred Duplessis",
        openingCaseLabel: "Opening case:",
        openingCaseText: "Benjamin Franklin and France, 1776–1778"
      },

      thesis: {
        aria: "The course’s central question",
        kicker: "The course’s central question",
        html: "Through <strong>which resource</strong>, <strong>which instrument</strong> and <strong>which mechanism</strong> does an actor engage a foreign public; and <strong>what evidence</strong> is needed to link that engagement to a policy outcome?"
      },

      weeklyProgramme: {
        eyebrow: "Course sequence",
        title: "14-week programme",
        description: "Each week contains a detailed lesson, 10 flashcards, an explained mini quiz, a game, a video, a podcast, assigned source passages and a short assignment.",
        searchLabel: "Search the weeks",
        searchPlaceholder: "e.g. Franklin, propaganda, OWI",
        filterAria: "Filter weeks by topic",
        filters: {
          all: "All",
          concept: "Concepts",
          history: "History",
          institutions: "Institutions",
          comparison: "Comparison"
        },
        studyAdviceLabel: "Study suggestion:",
        studyAdvice: "Divide the cumulative 120 active minutes among the lesson, cards, mini quiz, game, sources, video, podcast and assignment. Upload the assignment before the timer reaches 120:00. Visual and audio accounts do not by themselves establish historical or causal claims.",
        emptyState: "No week matches your search.",
        allWeeksShown: "All {count} weeks are displayed.",
        oneWeekShown: "1 week displayed.",
        weeksShown: "{count} weeks displayed."
      },

      sourceLiteracy: {
        galleryAria: "Historical document gallery",
        franklinPrintAlt: "An allegorical print from 1778 linking Franklin’s scientific reputation with the idea of liberty",
        franklinPrintCaption: "Reputation is a resource; influence must still be demonstrated.",
        eyebrow: "Source literacy",
        title: "Visibility, reception and outcome are not the same thing.",
        paragraph: "Portraits, newspapers, letters and treaties answer different questions. Throughout the course, sources are separated according to whether they demonstrate intention, activity, foreign reception, decision-making or an observable outcome.",
        treatyPrintAlt: "Historical print showing the signing of the 1778 Franco-American treaties",
        treatyPrintCaption: "An outcome document does not identify the outcome’s sole cause."
      },

      syllabus: {
        eyebrow: "Course syllabus",
        title: "Source-based graduate seminar",
        outcomesTitle: "Learning outcomes",
        outcomes: [
          "Explain the differences between hard, soft and smart power.",
          "Distinguish public diplomacy from propaganda, diplomacy and public relations.",
          "Identify the target public, instrument and mechanism in historical cases.",
          "Construct an evidence chain linking activity, reception and policy outcome.",
          "Compare the roles of state and non-state actors.",
          "Assess a public diplomacy practice in ethical and measurement terms."
        ],
        sessionTitle: "Structure of each seminar",
        sessionFlow: [
          { title: "Framework", description: "a short conceptual introduction" },
          { title: "Source laboratory", description: "a text, image or document" },
          { title: "Video and discussion", description: "the claim and the missing cause" },
          { title: "Workshop", description: "a map, audit or mini-case" },
          { title: "Concluding assessment", description: "a cautious one-sentence conclusion" },
          { title: "Weekly assignment", description: "a 250–400-word evidence brief uploaded before 120:00" }
        ],
        assessmentTitle: "Suggested assessment",
        assessment: [
          { label: "Weekly portal study and on-time assignments · 14 × 10 points", weight: "30%" },
          { label: "Participation and in-class workshops", weight: "20%" },
          { label: "Group case presentation · 10 minutes", weight: "20%" },
          { label: "Final case brief · 1,200–1,500 words", weight: "30%" }
        ],
        preparationTarget: "Every 12 active minutes earns 1 point; for the weekly score to be valid, the assignment must be uploaded before cumulative time reaches 120:00."
      },

      comparativeCases: {
        eyebrow: "Comparative window",
        title: "Brief cases from around the world",
        description: "These cards are not ‘success stories’; they are prompts for discussing actors, instruments, target publics and the limits of the evidence.",
        evidenceLimitLabel: "Evidentiary limit:",
        inspectSource: "Examine the source ↗",
        inspectSourceAria: "Examine the source: {institution}"
      },

      resourceCentre: {
        eyebrow: "Resource centre",
        title: "Core and supplementary readings",
        description: "A separate reading is assigned for each week. The list below presents the shared library used throughout the semester.",
        mainWork: "Core book",
        schindlerDescription: "Examines American engagement with foreign publics through six historical cases spanning 1776 to 1948.",
        bookLink: "View book and chapter details ↗",
        bookLinkAria: "Book and chapter details for Schindler, The Origins of Public Diplomacy in US Statecraft",
        accessNoteLabel: "Access note:",
        accessNote: "Some books and articles may require an institutional subscription. The site links only to lawful publisher, DOI and open-access sources.",
        imageSourcesLabel: "Image sources:",
        imageSourcesPrefix: "Franklin portrait,",
        imageSourcesMiddle: "; Au Génie de Franklin,",
        imageSourcesEnd: "; print of the 1778 treaties,",
        publicDomainStatement: "These are public-domain historical images.",
        publisherLink: "DOI / publisher ↗",
        publisherLinkAria: "DOI or publisher: {author}, {title}"
      },

      materials: {
        eyebrow: "Course materials",
        title: "Ready-made presentations and study files",
        description: "Download the 30-slide Turkish and English presentations for each of the 14 weeks individually or as a complete set.",
        week1Title: "Week 1 · Understanding Power",
        week1Description: "Conceptual framework, hard power, soft power and mechanisms · 30 slides",
        week2Title: "Week 2 · Before Public Diplomacy",
        week2Description: "Benjamin Franklin, France and engagement with foreign publics · 30 slides",
        syllabusTitle: "Course syllabus",
        syllabusDescription: "Print the weekly programme, assessment and resources, or save them as a PDF."
      },

      academicIntegrity: {
        title: "Principle of academic inquiry",
        paragraph: "The existence of a document does not establish the influence of the activity it records. Claims should remain proportionate to the evidence, with intention, activity, reception, decision and outcome assessed separately."
      },

      footer: {
        courseTitle: "Public Diplomacy and Soft Power",
        attribution: "Dr Murat Toman · Hitit University",
        weeks: "Weeks",
        syllabus: "Syllabus",
        resources: "Resources",
        backToTop: "Back to top ↑"
      },

      videoDialog: {
        closeAria: "Close video",
        eyebrow: "Video of the week",
        openOnYouTube: "Open on YouTube ↗",
        iframeTitle: "Video: {title}"
      },

      noScript: "Enable JavaScript to view the weekly cards and video player.",

      weekCard: {
        goalsTitle: "Weekly learning objectives",
        inClassActivity: "In-class activity",
        shortPreparation: "Short preparation:",
        videoOverline: "YouTube · English",
        openVideo: "Open video"
      },

      studyUi: {
        tabs: {
          tablistAria: "Study areas for week {week}",
          lesson: "Lesson notes",
          lessonLong: "Detailed lesson notes",
          cards: "Flashcards",
          cardsLong: "Concept flashcards",
          quiz: "10-question mini-quiz",
          game: "Game",
          resources: "Resources",
          resourcesLong: "Resources, activity and video"
        },
        lesson: {
          kicker: "Week {week} · Lesson",
          fallbackTitle: "Detailed lesson for the week",
          estimatedTime: "Approximately 10–12 min.",
          takeawaysTitle: "Five key takeaways",
          discussionTitle: "Seminar discussion"
        },
        flashcards: {
          cardAria: "Card {index}: {front}. Select to reveal the answer.",
          questionAria: "Question: {front}. Select to reveal the answer.",
          answerAria: "Answer: {back}. Select to return to the question.",
          frontHint: "Select to reveal the answer",
          answerTag: "Answer",
          backHint: "Select to return to the question",
          kicker: "Active recall",
          title: "Conceptual definition and comparison",
          instruction: "Formulate a definition before revealing the answer, then compare it with the explanation provided.",
          progress: "{seen} / {total} cards viewed",
          reset: "Reset cards"
        },
        quiz: {
          correctAnswer: "Correct answer: {answer}",
          kicker: "Conceptual assessment",
          title: "10-question mini-quiz",
          instruction: "Read the explanation after answering; the score is feedback only.",
          checkAnswers: "Check answers",
          retry: "Try again",
          incompleteFeedback: "You answered {answered} questions, with {correct} correct. Complete the unanswered questions as well.",
          completeFeedback: "You answered {correct} of {total} questions correctly. Read the explanations to review your answers."
        },
        game: {
          kicker: "Game of the week",
          title: "Concept matching",
          instruction: "Select a concept first, then select its correct explanation.",
          termsAria: "Concepts",
          termsHeading: "Concepts",
          definitionsAria: "Explanations",
          definitionsHeading: "Shuffled explanations",
          status: "Correct: {matches} / {total} · Attempts: {attempts}",
          reset: "Restart game",
          complete: "All four concept matches were completed in {attempts} attempts.",
          correct: "Correct match. {matches} / {total} completed · Attempts: {attempts}",
          incorrect: "That is not a match; try again. Correct: {matches} / {total} · Attempts: {attempts}"
        }
      },

      progress: {
        title: "My progress",
        continueStudying: "Continue studying",
        completedWeeks: "{completed} / {total} weeks completed",
        markComplete: "View completion status",
        markedComplete: "Week completed",
        completionManagedInPortal: "Time, assignment and completion status for week {week} are shown in the student area.",
        reset: "Reset study tools",
        resetConfirmTitle: "Reset the study tools?",
        resetConfirmText: "Your flashcard, mini-quiz, game and open-tab state will be removed from this browser. The student account, active time and assignments will not be deleted.",
        cancel: "Cancel",
        confirmReset: "Yes, reset"
      },

      bilingualSearch: {
        resultsTitle: "Search results",
        searchCurrentLanguage: "Search English content only",
        searchBothLanguages: "Search both languages",
        noResults: "No content matches this search.",
        oneResultFound: "1 result found",
        resultCount: "{count} results found",
        resultTypeWeek: "Week",
        resultTypeLesson: "Lesson notes",
        resultTypeConcept: "Concept",
        resultTypeFlashcard: "Flashcard",
        resultTypeReading: "Reading",
        resultTypeCase: "Case",
        goToResult: "Go to result: {title}"
      },

      cases: {
        "case-uk": { country: "United Kingdom", institution: "British Council", tool: "Language, education and cultural relations", limit: "Programme reach does not by itself demonstrate support for foreign policy." },
        "case-germany": { country: "Germany", institution: "Goethe-Institut", tool: "Language teaching and a network of centres", limit: "Participation and changes in perceptions of the country must be measured separately." },
        "case-france": { country: "France", institution: "Alliance Française", tool: "Language and culture through local partnerships", limit: "Its distributed organisational structure weakens any assumption of direct state control." },
        "case-eu": { country: "European Union", institution: "Erasmus+", tool: "Student and staff mobility", limit: "Mobility and network formation do not automatically demonstrate political alignment." },
        "case-turkiye": { country: "Türkiye", institution: "Yunus Emre Institute", tool: "Turkish-language teaching and cultural programmes", limit: "The number of activities does not measure foreign reception or behavioural change." },
        "case-korea": { country: "South Korea", institution: "Korea Foundation", tool: "Academic exchange and cultural networks", limit: "Interest in Korean culture must be distinguished from support for government policies." },
        "case-china": { country: "China", institution: "Cultural and educational networks", tool: "Language, scholarships, media and digital channels", limit: "Capacity and visibility are not the same as trust, acceptance or influence." },
        "case-qatar": { country: "Qatar", institution: "Al Jazeera Media Network", tool: "Cross-border news and agenda-setting", limit: "Independent evidence is needed to link audience reach to state influence." }
      },

      weeklyOverview: {
        "week-01": {
          tag: "Concepts",
          title: "Understanding power: hard, soft and relational power",
          summary: "Before defining public diplomacy, we distinguish power, attraction, persuasion and context.",
          goals: ["Explain the differences between hard, soft and smart power", "Distinguish public diplomacy from propaganda and traditional diplomacy", "Place resources, instruments, mechanisms and outcomes in the correct sequence"],
          primaryLabel: "Required · selected 18–20 pages",
          primaryText: "Caitlin E. Schindler, ‘Reconnecting the Past and Present’, selections from pp. 1–39",
          optionalLabel: "Supplementary",
          optionalText: "Joseph S. Nye, ‘Public Diplomacy and Soft Power’, The ANNALS 616/1 (2008), pp. 94–109",
          activity: "Power cards: classify eight foreign-policy examples by resource, mechanism and possible outcome.",
          prep: "Before class, bring one everyday example of ‘attraction’ and one of ‘coercion’.",
          videoDuration: "5:28",
          videoNote: "As you watch the definition, note the difference between one-way communication and a reciprocal relationship."
        },
        "week-02": {
          tag: "Early period",
          title: "Before public diplomacy: Benjamin Franklin and France",
          summary: "Reputation, networks, print circulation and engagement with French publics.",
          goals: ["Examine Franklin’s scientific and public reputation as a diplomatic resource", "Show that the French public was not a single, homogeneous actor", "Assess Franklin’s contribution separately from Saratoga and French strategy"],
          primaryLabel: "Required · approximately 20 pages",
          primaryText: "Schindler, ‘America’s First Public Diplomat’, pp. 41–60",
          optionalLabel: "Supplementary",
          optionalText: "Selected pages from Jonathan R. Dull, ‘Franklin the Diplomat: The French Mission’, Transactions of the American Philosophical Society, New Series 72/1 (1982)",
          activity: "Evidence or inference? Classify which claims are supported by Franklin’s portrait, a letter and the treaty document.",
          prep: "Choose one image and distinguish in two sentences between what it shows and what it merely implies.",
          videoDuration: "2:21",
          videoNote: "Which actor and cause does the video foreground? Which structural conditions remain in the background?"
        },
        "week-03": {
          tag: "Civil War",
          title: "Union public diplomacy: recognition, slavery and foreign public opinion",
          summary: "The contest for recognition in Britain and France during the American Civil War.",
          goals: ["Identify the Union’s aims and instruments for engaging foreign publics", "Discuss emancipation’s role in the narrative and policy context", "Avoid treating press visibility and government decisions as the same thing"],
          primaryLabel: "Required · approximately 16 pages",
          primaryText: "Schindler, ‘Public Diplomacy of the Union’, pp. 94–109",
          optionalLabel: "Supplementary",
          optionalText: "Selected chapter from Thomas E. Sebrell II, Persuading John Bull",
          activity: "Target-public map: design different message-and-instrument combinations for cabinets, workers, abolitionists, the press and merchants.",
          prep: "Write two claims the Union could use with foreign publics and one rival explanation for those claims.",
          videoDuration: "8:03",
          videoNote: "Question what evidence supports the proposed connection between diplomacy and emancipation."
        },
        "week-04": {
          tag: "Counter-narrative",
          title: "The Confederacy, ‘King Cotton’ and foreign public opinion",
          summary: "Competing narratives and failed persuasion strategies directed at the same foreign publics.",
          goals: ["Compare the target publics of the Union and the Confederacy", "Examine how a claim of economic dependence was translated into political persuasion", "Explain the outcomes of a failed campaign together with their causes"],
          primaryLabel: "Required · short selections",
          primaryText: "Schindler, ‘Public Diplomacy of the Union’, pp. 75–93 (a Union comparison, not a direct Confederate source)",
          optionalLabel: "Supplementary",
          optionalText: "Selection from Duncan Andrew Campbell, English Public Opinion and the American Civil War",
          activity: "Counter-narrative audit: identify the assumptions, target public and observable indicators of failure in the ‘King Cotton’ thesis.",
          prep: "Identify one type of evidence that could disconfirm a propaganda claim.",
          videoDuration: "First 12 minutes",
          videoNote: "Watch the first 12 minutes and discuss whether economic interest automatically translated into diplomatic support."
        },
        "week-05": {
          tag: "Public–private partnership",
          title: "Humanitarian relief and foreign policy: the Cuban case",
          summary: "The tension among relief for the reconcentrados, the Red Cross and political objectives.",
          goals: ["Explain humanitarian relief’s role in engagement with foreign publics", "Map the relationships among the state, business, religious groups and the Red Cross", "Distinguish humanitarian outcomes from political influence"],
          primaryLabel: "Required · approximately 16 pages",
          primaryText: "Schindler, ‘Early Public-Private Partnerships for Public Diplomacy’, pp. 111–127",
          optionalLabel: "Supplementary",
          optionalText: "Selected chapter from Julia F. Irwin, Making the World Safe",
          activity: "Relief-diplomacy matrix: place the humanitarian purpose, political objective, intermediary actor and demonstrable outcome in separate columns.",
          prep: "Name two additional types of source needed to show that a relief activity produced political influence.",
          videoDuration: "2:15",
          videoNote: "Note how humanitarian justification and strategic motivations are connected."
        },
        "week-06": {
          tag: "Exchange",
          title: "Pan-American educational exchanges and relationship building",
          summary: "A shift from short message campaigns to long-term networks.",
          goals: ["Construct the presumed mechanism of influence for educational exchange", "Distinguish participation in an exchange programme from policy influence", "Compare Pan-American networks with Fulbright and Erasmus+"],
          primaryLabel: "Required · approximately 16 pages",
          primaryText: "Schindler, ‘Early Public-Private Partnerships for Public Diplomacy’, pp. 128–144",
          optionalLabel: "Supplementary",
          optionalText: "Selected chapter from Liping Bu, Making the World Like Us",
          activity: "Exchange-programme mechanism map: find the weakest link in the selection → contact → learning → network → possible outcome chain.",
          prep: "Give one example each of a short-term and a long-term output of an exchange programme.",
          videoDuration: "1:41",
          videoNote: "Compare the later Fulbright example with earlier Pan-American exchange plans; distinguish the objective, activity and outcome."
        },
        "week-07": {
          tag: "First World War",
          title: "Committee on Public Information: the first public diplomacy agency?",
          summary: "The CPI Foreign Section, private partners and wartime information production.",
          goals: ["Explain the rationale for the CPI and its foreign activities", "Discuss the difference among an agency, a network and an ad hoc committee", "Examine the politics of labelling information and propaganda"],
          primaryLabel: "Required · selected 18 pages",
          primaryText: "Schindler, ‘America’s First Public Diplomacy Agency?’, pp. 145–162",
          optionalLabel: "Supplementary",
          optionalText: "Selected chapter from John Maxwell Hamilton, Manipulating the Masses",
          activity: "Agency-design workshop: complete the boxes for mission, target public, partner, feedback and accountability.",
          prep: "Prepare working definitions of ‘information’ and ‘propaganda’.",
          videoDuration: "1:38",
          videoNote: "Compare how Creel labelled his activity with how the video frames it."
        },
        "week-08": {
          tag: "Ethics and legacy",
          title: "Propaganda, credibility and post-war retrenchment",
          summary: "The CPI’s legacy, opposition to propaganda and a return to private actors.",
          goals: ["Distinguish the CPI’s distribution capacity from its persuasive effect", "Discuss truthfulness, source transparency and ethics towards target publics", "Compare post-war institutional discontinuity with continuity of activity"],
          primaryLabel: "Required · approximately 17 pages",
          primaryText: "Schindler, ‘America’s First Public Diplomacy Agency?’, pp. 163–179",
          optionalLabel: "Supplementary",
          optionalText: "Eytan Gilboa, ‘Searching for a Theory of Public Diplomacy’, The ANNALS 616/1 (2008), pp. 55–77",
          activity: "Ethics jury: assess three wartime practices using the criteria of transparency, truthfulness, targeting and urgency.",
          prep: "Write down the one principle you consider indispensable for preserving credibility.",
          videoDuration: "58:41 · long-form discussion",
          videoNote: "Identify issues involving instruments, target publics, truthfulness and accountability. Record the start and end time of a segment that answers the study question."
        },
        "week-09": {
          tag: "Interwar period",
          title: "Foundations, expert networks and private diplomacy",
          summary: "Private capacity and parallel activity with the state through Rockefeller, Carnegie and the IIE.",
          goals: ["Show how private actors provided continuity during the interwar period", "Distinguish parallel activity, facilitation and formal partnership", "Assess the access and learning mechanisms of expert networks"],
          primaryLabel: "Required · selected 18 pages",
          primaryText: "Schindler, ‘InterWar Public Diplomacy’, pp. 181–200",
          optionalLabel: "Supplementary",
          optionalText: "Katharina Rietzler, ‘Before the Cultural Cold Wars’, Historical Research 84/223 (2011), pp. 148–164",
          activity: "Authority matrix: place the funder, implementer, selector, supervisor and beneficiary in separate boxes.",
          prep: "Propose two criteria that a foundation should meet to qualify as a public diplomacy actor.",
          videoDuration: "2023 · later comparison",
          videoNote: "Compare this 2023 foundation account with the 1923–1938 International Education Board text; do not treat an institution's own success claim as proof."
        },
        "week-10": {
          tag: "Second World War",
          title: "Institutional confusion: DCR, CIAA and OWI",
          summary: "Overlapping mandates, different regions and the problem of wartime coordination.",
          goals: ["Compare the mandates and target publics of the three institutions", "Explain the costs and opportunities of institutional overlap", "Show the difference between defining a target and selecting an appropriate mechanism"],
          primaryLabel: "Required · selected 20 pages",
          primaryText: "Schindler, ‘Public Diplomacy in Chaos and Ambiguity’, pp. 219–245",
          optionalLabel: "Supplementary",
          optionalText: "Selected chapter from Allan M. Winkler, The Politics of Propaganda",
          activity: "Institutional map: overlay authority, instruments, regions and feedback channels for three institutions pursuing the same objective.",
          prep: "Write down one observable indicator of an institution’s coordination problem.",
          videoDuration: "2:37",
          videoNote: "Identify the missing evidence between producing a film and influencing a foreign audience."
        },
        "week-11": {
          tag: "Instruments",
          title: "Radio, film, press and the Good Neighbour policy",
          summary: "International broadcasting, cultural narratives and activities directed towards Latin America.",
          goals: ["Compare the reach and credibility characteristics of different communication media", "Explain the target public and context of the Good Neighbour narrative", "Distinguish indicators of production, distribution, reception and influence"],
          primaryLabel: "Required · selected 18 pages",
          primaryText: "Schindler, ‘Public Diplomacy in Chaos and Ambiguity’, pp. 246–265",
          optionalLabel: "Supplementary",
          optionalText: "Selected chapter from Holly Cowan Shulman, The Voice of America",
          activity: "Influence ladder: construct an output → reach → reception → intermediate effect → policy outcome chain for a film screening and a radio broadcast.",
          prep: "State what one media metric can and cannot demonstrate.",
          videoDuration: "2:09",
          videoNote: "Use this early Cold War film to discuss continuity and change in wartime instruments."
        },
        "week-12": {
          tag: "Institutionalisation",
          title: "1945–1948: Smith–Mundt and permanent public diplomacy",
          summary: "The transition from a wartime apparatus to statutory authority, institutionalisation and limits on target publics.",
          goals: ["Explain the Smith–Mundt Act’s role in institutionalisation", "Avoid treating statutory authority and institutional effectiveness as the same thing", "Discuss the historical logic of distinguishing domestic and foreign target publics"],
          primaryLabel: "Required · short selection",
          primaryText: "Schindler, ‘Public Diplomacy in Chaos and Ambiguity’, pp. 266–275, and a summary of the Smith–Mundt Act",
          optionalLabel: "Primary official document",
          optionalText: "United States Information and Educational Exchange Act of 1948 — Smith–Mundt Act (GovInfo)",
          activity: "Institutional design: write a five-clause summary of a law covering authority, oversight, target publics, media independence and evaluation.",
          prep: "Identify one process indicator and one outcome indicator for measuring successful institutionalisation.",
          videoDuration: "1:26:41 · long-form discussion",
          videoNote: "Choose a segment that separates legal regulation from implementation capacity and record its start and end time."
        },
        "week-13": {
          tag: "Comparison",
          title: "Historical patterns: institutions in the UK and Germany",
          summary: "Testing patterns drawn from US history against the governance of British and German cultural institutes and broadcasters.",
          goals: ["Summarise Schindler’s five historical patterns", "Avoid treating an American historical finding as a universal law", "Compare models based on cultural institutes, broadcasters and exchange programmes"],
          primaryLabel: "Required · approximately 18 pages",
          primaryText: "Schindler, ‘Foreign Public Engagement: An American Tradition in Context’, pp. 277–295",
          optionalLabel: "Supplementary",
          optionalText: "Bruce Gregory, ‘American Public Diplomacy: Enduring Characteristics, Elusive Transformation’, HJD 6/3–4 (2011)",
          activity: "Compare the British Council/BBC and Goethe-Institut/Deutsche Welle self-descriptions using the same governance criteria; state why these texts do not prove impact.",
          prep: "For two institutions, propose an independent record type that could test the gap between formal purpose and practice.",
          videoDuration: "2:23",
          videoNote: "Discuss whether the digital instrument genuinely changes the historical mechanism."
        },
        "week-14": {
          tag: "Synthesis",
          title: "Measuring influence, ethical limits and the final case laboratory",
          summary: "Evidence, reciprocity and uncertainty when carrying historical lessons into the digital era.",
          goals: ["Use indicators of activity, reach, reception, intermediate effect and outcome together", "Establish ethical limits for reciprocity, truthfulness and targeting", "Write a conditional, evidence-appropriate conclusion for a case"],
          primaryLabel: "Required · approximately 18 pages",
          primaryText: "Schindler, ‘Foreign Public Engagement: An American Tradition in Context’, pp. 296–313",
          optionalLabel: "Supplementary",
          optionalText: "Selected chapter from Ilan Manor, The Digitalization of Public Diplomacy",
          activity: "Final evidence clinic: each student has 90 seconds to present a case claim, mechanism, rival explanation, two pieces of evidence and one limitation.",
          prep: "Bring a one-sentence claim, one rival explanation and the missing source for your final case brief.",
          videoDuration: "59:13 · research presentation",
          videoNote: "Choose a segment showing how the research design tests a claim about ‘influence’; note its timestamp and the uncertainties it preserves."
        }
      }
    }
  };

  root.SITE_UI_I18N_PROPOSAL = SITE_UI_I18N;
})(typeof window !== "undefined" ? window : globalThis);
