/**
 * Rebuild matching Turkish and English learning workbooks with @oai/artifact-tool.
 * Copy this one file to a writable temporary directory and symlink node_modules
 * there to $CODEX_PRIMARY_RUNTIME_NODE_MODULES. Run with
 * $CODEX_PRIMARY_RUNTIME_NODE build-learning-workbook.mjs /path/to/kamudiplomasisi
 * Optional QA images and reports are written only to that temporary directory.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { SpreadsheetFile, Workbook } from '@oai/artifact-tool';

const repo = path.resolve(process.argv[2] || process.cwd());
const EN = {
 '1 Başla ve Haftalar':'1 Start and Weekly Guide',
 '2 Kanıt Çalışması':'2 Evidence Practice',
 '3 Ölçüm Deneyi':'3 Measurement Lab',
 '4 Kavram Rehberi':'4 Concept Guide',
 '5 Araştırma Tasarımı':'5 Research Design',
 'Ders notunu aç':'Open lecture notes',
 'Kamu diplomasisi: haftalık çalışma rehberi':'Public diplomacy: weekly study guide',
 '1. İlgili haftanın satırını belirleyiniz. “Ders notunu aç” bağlantısından haftalık okuma metnine ulaşınız.':'1. Locate the relevant week. Select “Open lecture notes” to access the assigned reading.',
 '2. “Uygulama” sütunundaki çalışmayı tamamlayınız. “Beklenen çıktı” sütununda belirtilen kapsamda kısa bir yanıt hazırlayınız.':'2. Complete the exercise. Prepare a concise response in the form specified under “Expected output”.',
 '3. Sarı hücrede çalışma durumunu seçiniz. Ardından 2. sayfadaki örneği inceleyerek kanıt tablosunda bir satır doldurunuz.':'3. Record progress in the yellow status cell. Review the example on sheet 2, then complete an evidence row.',
 'Açıklayıcı benzetme: Bir afişle karşılaşılması, tanıtılan ürünün beğenildiğini veya satın alındığını tek başına göstermez.':'Illustrative analogy: Exposure to a poster does not by itself establish approval or purchase of the advertised product.',
 'Çalışma kitabının kullanımı: Sarı hücreyi seçip veriyi giriniz ve Enter’a basınız. Sayfalar arasında alt sekmelerden geçiş yapınız.':'Workbook instructions: Select a yellow cell, enter a value and press Enter. Use the tabs below to navigate between sheets.',
 'Hafta':'Week','Konu':'Topic','Uygulama':'Exercise','Beklenen çıktı':'Expected output','Ders notu':'Lecture notes','Çalışma durumu':'Progress status',
 'Güç türlerini ayırmak':'Distinguishing types of power',
 'Bir burs örneği seçiniz. Finansman kaynağını, çekiciliği ve beklenen sonucu ayrı ayrı belirtiniz.':'Select a scholarship example. Distinguish funding, attraction and the expected outcome.',
 'Üç cümlede kaynağı, aracı ve sonucu değerlendirmek için gereken ek kanıtı belirtiniz.':'Three sentences identifying the resource, instrument and additional evidence required to assess the outcome.',
 'Franklin ve Fransa':'Franklin and France',
 'Franklin’in bilimsel veya toplumsal ağlardaki bir temasını seçiniz. Bu teması ittifak kararından analitik olarak ayırınız.':'Select one of Franklin’s contacts in a scientific or social network. Distinguish this contact from the alliance decision.',
 'Temasın olası katkısına ve kararı açıklayabilecek başka bir nedene ilişkin iki açıklama.':'Two explanations addressing the contact’s possible contribution and an alternative cause of the decision.',
 'Birlik ve Avrupa':'The Union and Europe',
 'Birlik yönetiminin kullandığı bir anlatıyı belirleyiniz. Avrupa’da yöneldiği hedef kitleyi açıklayınız.':'Identify a narrative used by the Union government and the European audience it addressed.',
 'Bir mesaj, bir kitle, mesajın nasıl karşılandığını gösterecek bir belge türü.':'One message, one audience and one type of document that could reveal reception.',
 'Konfederasyon ve pamuk':'The Confederacy and cotton',
 'Pamuk kaynağının neden kendiliğinden siyasi desteğe dönüşmediğini açıklayınız.':'Explain why cotton as a resource did not automatically produce political support.',
 'Bir kaynak, bir beklenen sonuç ve öngörülen süreci kesintiye uğratabilecek iki koşul.':'One resource, one expected outcome and two conditions that might interrupt the proposed process.',
 'Küba ve insani yardım':'Cuba and humanitarian aid',
 'Yardım faaliyetini, bu faaliyetin medyadaki temsilinden ayırarak inceleyiniz.':'Distinguish the delivery of aid from its representation in media accounts.',
 'Faaliyete ve haberciliğe ilişkin birer kanıt ile etkiyi değerlendirmek için gereken ek kanıt.':'One item of evidence for the activity, one for its reporting and one additional item needed to assess influence.',
 'Eğitim değişimleri':'Educational exchanges',
 'Bir öğrenci değişim programında ev sahibi ile katılımcının öğrenme deneyimlerini ayrı ayrı açıklayınız.':'Identify the learning experiences of the host and participant in a student exchange.',
 'Katılım sayısına ek olarak izlenebilecek bir ilişki göstergesi.':'One indicator of relationships to track alongside participation numbers.',
 'CPI ve iletişim ağı':'The CPI and communication networks',
 'Kamuoyu Bilgilendirme Komitesinin (CPI) iletişim ağını merkez, aracı ve kitle başlıklarıyla üç kutuda gösteriniz.':'Represent the communication network of the Committee on Public Information (CPI) in three boxes: centre, intermediary and audience.',
 'Bir afişin üretilmesi ile bir kişinin ikna olması arasındaki eksik adım.':'One missing step between producing a poster and persuading a person.',
 'Propaganda ve etik':'Propaganda and ethics',
 'Doğru bilgiler içeren ancak kaynağı açıklanmayan bir mesajı değerlendiriniz.':'Assess a message containing accurate information but concealing its source.',
 'Kaynak, eksik bağlam ve düzeltme yolu hakkında üç soru.':'Three questions about the source, missing context and a route for correction.',
 'Vakıflar ve özel ağlar':'Foundations and private networks',
 'Bir vakıf veya üniversite örneği seçiniz. Finansman sağlayan aktörlerle karar alan aktörleri ayırınız.':'Select a foundation or university example. Distinguish funding providers from decision-makers.',
 'İki aktör ve birbirlerinden bağımsız olabilecekleri bir nokta.':'Two actors and one area in which they may act independently.',
 'Savaş dönemi kurumları':'Wartime institutions',
 'Ders notundaki üç kurumu amaç, hedef kamu ve kullanılan araç bakımından karşılaştırınız.':'Compare the three institutions in the notes by purpose, intended audience and instruments.',
 'Üç kısa karşılaştırma satırı. Aynı aracın kullanılmasının neden aynı kurumsal göreve işaret etmediğini açıklayınız.':'Three concise comparison rows explaining why use of the same instrument does not imply an identical mandate.',
 'Radyo, sinema ve basın':'Radio, film and the press',
 'Aynı mesajın radyo, sinema ve gazetede nasıl farklı alımlanabileceğini değerlendiriniz.':'Consider how audiences might interpret the same message differently on radio, film and in newspapers.',
 'Üç mecranın her biri için bir avantaj ve bir sınırlılık.':'One advantage and one limitation for each of the three media.',
 'Smith–Mundt ve kurumlar':'Smith–Mundt and institutions',
 'Yasal yetki, uygulama kapasitesi ve sonuç için ayrı kanıtlar belirleyiniz.':'Identify separate evidence for legal authority, implementation capacity and outcomes.',
 'Bir yasanın neyi mümkün kıldığı ve neyi tek başına kanıtlamadığı.':'What a law makes possible and what it does not establish by itself.',
 'Ülkeler arası karşılaştırma':'Cross-country comparison',
 'İki kültür kurumunu veya yayıncıyı yönetim, hedef kitle ve geri bildirim süreçleri bakımından karşılaştırınız.':'Compare two cultural institutions or broadcasters in terms of governance, audiences reached and feedback processes.',
 'İki satırlık karşılaştırma ve sonucu etkileyebilecek bir bağlam farkı.':'A two-row comparison and one contextual difference that might affect the outcome.',
 'Etkiyi değerlendirmek':'Evaluating influence',
 '3. sayfadaki sarı girdi hücrelerinden birini değiştiriniz. Erişimi ve destek değişimini ayrı ayrı yorumlayınız.':'Change one yellow input on sheet 3. Interpret reach and the change in support separately.',
 'Dört cümle: amaç, gözlem, başka açıklama ve ek kanıt ihtiyacı.':'Four sentences: purpose, observation, a rival explanation and further evidence needed.',
 'Başlamadım':'Not started','Üzerinde çalışıyorum':'In progress','Tamamladım':'Completed',
 'Analitik ifade şablonu: “Bu kaynak … göstermektedir. … sonucuna ulaşmak için ayrıca … kanıtı gereklidir.”':'Analytical sentence template: “This source indicates … . The conclusion that … requires additional evidence of … .”',
 'Örnek: “Afiş, mesajın üretildiğini göstermektedir. İkna sonucuna ulaşmak için kitlenin tepkisine ilişkin kanıt da gereklidir.”':'Example: “The poster establishes that the message was produced. Assessing persuasion also requires evidence of audience responses.”',
 'Kaynak: Bu sitedeki 14 haftalık Türkçe ders notu. Bağlantılar yukarıdaki ilgili hafta satırındadır.':'Source: The 14 weeks of English lecture notes on this site. Each weekly row links to the corresponding notes.',
 'İddiaların kanıt temelinde sınanması':'Testing claims against evidence',
 '1. İddiayı tek cümleyle ifade ediniz. 2. İncelenen belgeyi belirtiniz. 3. Belgenin kanıtlama sınırlarını açıklayınız.':'1. State the claim in one sentence. 2. Identify the document. 3. Specify the limits of what it can establish.',
 'Kanıt, bir iddiayı destekleyen izdir. Aşağıdaki kanıt matrisi, bu izlerin ortak sorular temelinde karşılaştırılmasını sağlar.':'Evidence is a trace supporting a claim. The evidence matrix below compares these traces using a common set of questions.',
 'Açıklayıcı örnek: Kafe ilanıyla karşılaşılması, kahve satın alındığını göstermez. İki olay arasındaki eksik adımı belirleyiniz.':'Illustrative example: Exposure to a café advertisement does not establish a purchase. Identify the missing step between the two.',
 'Çözülmüş örnekler: Aşağıdaki belge türleri öğretim içindir. Bunlar bulunmuş gerçek arşiv belgeleri değildir.':'Worked examples: These document types illustrate reasoning. They are not actual archival discoveries.',
 'Örnek':'Example','Sınanan iddia':'Claim under examination','İncelenen belge türü':'Document type examined',
 'Belgenin gösterebileceği husus':'What the source can establish','Tek başına gösteremeyeceği husus':'Limits of the source alone','Olası rakip açıklama':'Possible rival explanation','Ders bağlantısı':'Lecture link',
 '1. Üniversite değişimi':'1. University exchange','“Programa katılım oldu.”':'“Participation occurred.”','Varsayılan katılım listesi.':'An illustrative participation list.',
 'Listelenen kişilerin programa katılımını.':'Participation by the listed people.','Katılımcıların ülkeye güveninin arttığını.':'Increased trust in the country.',
 'Başvuranlar ülkeye zaten ilgi duyuyor olabilir.':'Applicants may already have been interested in the country.',
 '2. CPI afişi':'2. CPI poster','“Komite bu mesajı üretti.”':'“The committee produced this message.”','Varsayılan CPI afişi ve üretim kaydı.':'An illustrative CPI poster and production record.',
 'Mesajın içeriğini ve üretimini.':'The content and production of the message.','Kaç kişinin gördüğünü veya ikna olduğunu.':'How many people saw it or were persuaded.',
 'Destek, mesajdan önce var olmuş olabilir.':'Support may have existed before the message.',
 '3. Sinema gösterimi':'3. Film screening','“Film gösterime sunuldu.”':'“The film was offered for screening.”','Varsayılan sinema programı.':'An illustrative cinema programme.',
 'Belirli yerde gösterim planlandığını.':'That a screening was scheduled at a particular venue.','Her izleyicinin aynı anlamı çıkardığını.':'That every viewer interpreted it in the same way.',
 'Yerel yorumlar ve mevcut görüşler farklı olabilir.':'Local interpretations and existing opinions may differ.',
 'Uygulama: Ders notundan bir vaka seçerek sarı satırı doldurunuz. İncelenmemiş belgeleri “aranacak belge” olarak belirtiniz.':'Exercise: Select a case from the lecture notes and complete a yellow row. Label any unexamined source “document to locate”.',
 'Vaka / hafta':'Case / week','Sınanan iddia':'Claim under examination','Belge / aranacak belge':'Document / document to locate',
 'Belgeden çıkarılabilecek bilgi':'Information established','Yanıtlanmamış sorular':'Unresolved questions','Başka açıklama':'Rival explanation','Kaynak veya sayfa':'Source or page',
 'Değerlendirme: Belgenin varlığı ile etkiye ilişkin iddia ayrılmış mıdır? Etki iddiası varsa bağlantıyı kuran adımlar gösterilmiş midir?':'Review: Distinguish the existence of a document from evidence of an effect. Does any claim of influence identify the connecting steps?',
 'Örneklere temel: 6. hafta eğitim değişimi, 7. hafta CPI, 11. hafta medya. İlgili ders notları örnek satırlarında bağlıdır.':'Basis: Week 6 on exchanges, week 7 on the CPI and week 11 on media. The example rows link to the relevant notes.',
 'Erişim ve destek değişiminin karşılaştırılması':'Comparing reach and changes in support',
 'Tamamen varsayımsal veri: A ve B hayalî kampanyalardır. Sayılar gerçek kişi, öğrenci veya tarihsel olay verisi değildir.':'Entirely hypothetical data: A and B are fictional campaigns. These are not records of real people, students or historical events.',
 '1. Sarı girdi hücrelerini inceleyiniz. 2. Aşağıdaki çözülmüş örneği okuyunuz. 3. D10’a 600 girerek sonuçlardaki değişimi gözlemleyiniz.':'1. Examine the yellow input cells. 2. Read the worked example below. 3. Set D10 to 600 and observe the resulting changes.',
 'Başlangıç örneğinde, her kampanyada ulaşılanlardan seçilmiş aynı 100 kişiye önce ve sonra aynı destek sorusu soruldu.':'In each initial example, the same 100 people selected from those reached answered the same support question before and after.',
 '“Destek”, soruya verilen olumlu yanıttır. İkna iddiası daha güçlü kanıt gerektirir. Kontrol grubu bulunmayan bu gözlem nedenselliği kanıtlamaz.':'“Support” denotes a positive response. A claim of persuasion requires stronger evidence. Without a control group, this observation cannot establish causation.',
 'Kontrol grubu, kampanyaya maruz kalmayan ve karşılaştırma amacıyla izlenen benzer kişilerden oluşur. Bu örnekte kontrol grubu bulunmamaktadır.':'A control group consists of similar people who are not exposed to the campaign and are observed for comparison. This example includes no control group.',
 'Kampanya':'Campaign','Hedef kitle (kişi)':'Target audience (people)','Ulaşılan (kişi)':'Reached (people)','İki ankette aynı grup (kişi)':'Same panel in both surveys (people)',
 'Önce destekleyen (kişi)':'Support before (people)','Sonra destekleyen (kişi)':'Support after (people)','Girdi durumu':'Input status',
 'A kampanyası':'Campaign A','B kampanyası':'Campaign B','Sayı eksik':'Missing number','Sayıları kontrol et':'Check the numbers','Hazır':'Ready','Sayı':'number',
 'Sarı olmayan sonuç hücreleri otomatik hesaplanır. Hedef, anket grubu ve destek sayıları tutarlı olmalıdır.':'Results outside the yellow cells calculate automatically. Audience, panel and support counts must be consistent.',
 'Erişim oranı':'Reach rate','Önce destek oranı':'Support before','Sonra destek oranı':'Support after','Değişim (yüzde puan)':'Change (percentage points)',
 'Hesaplama yöntemi':'Calculation method','Sonucun yorumu':'Interpretation',
 'Destek değişimi: ':'Change in support: ',' yüzde puan. Nedeni henüz bilinmiyor.':' percentage points. The cause is still unknown.',
 'Erişim = ulaşan ÷ hedef.':'Reach = reached ÷ target.','Değişim = sonra % − önce %.':'Change = after % − before %.',
 'Çözülmüş başlangıç örneği: A’da 800 ÷ 1.000 = %80 erişim. Destek %40’tan %44’e çıkar: 4 yüzde puan.':'Initial worked example: In A, 800 ÷ 1,000 = 80% reach. Support rises from 40% to 44%: 4 percentage points.',
 'B’de başlangıç erişimi daha düşük (%40), destek artışı daha yüksektir (15 yüzde puan). Maruz kalma ile ikna ayrı ayrı değerlendirilmelidir.':'B has lower initial reach (40%) and a larger increase in support (15 percentage points). Exposure and persuasion require separate assessment.',
 'Varsayımsal kampanyalarda erişim ve destek (%)':'Reach and support in hypothetical campaigns (%)',
 'Alıştırma 1: D10’u 800’den 600’e değiştiriniz. Erişim %60 olur. Destek değişiminin neden sabit kaldığını açıklayınız.':'Exercise 1: Change D10 from 800 to 600. Reach becomes 60%. Explain why the change in support remains constant.',
 'Alıştırma 2: G10’u 44’ten 60’a değiştiriniz. Destek %60, artış 20 yüzde puan olur. Değişen girdiyi belirleyiniz.':'Exercise 2: Change G10 from 44 to 60. Support becomes 60%, an increase of 20 percentage points. Identify the input that changed.',
 'Alıştırma 3: E10’u boş bırakınız. Eksik veri için sonucun boş kalmasının neden %0 gösterilmesinden uygun olduğunu açıklayınız. Ardından 100 giriniz.':'Exercise 3: Clear E10. Explain why a blank result represents missing data more accurately than 0%. Then restore the value 100.',
 'Alıştırma 4: B’nin daha fazla ikna sağladığı iddiası için gereken ek kanıtı belirtiniz. Başlangıç farklarını ve diğer olayları değerlendiriniz.':'Exercise 4: Identify the additional evidence needed to claim that B persuaded more people. Consider initial differences and other events.',
 'Yanıt':'Response','Erişim neyi ölçer?':'What does reach measure?','Destek neyi ölçer?':'What does support measure?',
 'Başka olası neden':'Another possible cause','Hangi ek veri gerekir?':'What further data are needed?','Sonucun sınırlılığı':'Limit of the conclusion','Bir cümlelik sonuç':'One-sentence conclusion','Analitik açıklama':'Analytical explanation',
 'Formülü incelemek için C16’yı seçiniz. Formül çubuğundaki D10/C10, “ulaşılan kişi sayısı / hedef kişi sayısı” oranını ifade eder.':'Select C16 to inspect the formula. D10/C10 in the formula bar represents the ratio of people reached to people targeted.',
 'Yüzde puan: %40 ile %44 arasındaki fark 4 puandır. Göreli yüzde artışı ise %10’dur. Bunlar farklı ölçülerdir.':'Percentage points: The difference between 40% and 44% is 4 points. The relative increase is 10%. These are different measures.',
 'Kaynak: Bu sayfadaki sayılar öğretim amacıyla kuruldu. Kavramlar dersin 1. ve 14. hafta notlarına dayanır.':'Source: The numbers were constructed for teaching. Concepts draw on the course notes for weeks 1 and 14.',
 '1. hafta notu':'Week 1 notes','14. hafta notu':'Week 14 notes',
 'Temel kavramlar ve açıklayıcı benzetmeler':'Core concepts and illustrative analogies',
 '1. İncelenecek kavramı belirleyiniz. 2. Açıklayıcı örneği okuyunuz. 3. Son sütundaki soruyu seçilen ders vakasına uygulayınız.':'1. Identify the concept to examine. 2. Read the illustrative example. 3. Apply the final question to the selected course case.',
 'Kavram':'Concept','Kısa tanım':'Concise definition','Açıklayıcı benzetme':'Illustrative analogy','Analitik soru':'Analytical question',
 'Aktör':'Actor','Belirli bir amacı gerçekleştirmeye çalışan kişi veya kuruluş.':'A person or organisation pursuing a particular objective.','Bir kafe sahibinin ilan hazırlatması.':'A café owner commissions an advert.','Kim, neyi değiştirmeye çalışıyor?':'Who is trying to change what?',
 'Hedef kamu':'Target public','Mesajla veya programla ilişki kurulan insan topluluğu.':'The people engaged through a message or programme.','Kafenin çevresindeki öğrenciler.':'Students living near the café.','Hangi gruplar incelenmektedir? Aralarındaki farklılıklar dikkate alınmış mıdır?':'Which groups are examined? Are differences between them recognised?',
 'Kaynak':'Resource','Kullanılabilecek para, bilgi, ilişki veya itibar.':'Available money, knowledge, relationships or reputation.','Kafenin bütçesi ve iyi adı.':'The café’s budget and good reputation.','Sahip olunan imkân mı, gözlenmiş sonuç mu?':'An available resource or an observed result?',
 'Araç':'Instrument','Bir kaynağın insanlarla etkileşim kurmak için kullanılma biçimi.':'How a resource is used to engage people.','İlan, tanıtım etkinliği veya davet.':'An advert, promotional event or invitation.','Temas nasıl kuruluyor?':'How does contact occur?',
 'Mekanizma':'Mechanism','Bir etkenin başka bir etkeni nasıl değiştirebileceğini açıklayan süreç.':'The process through which one factor may produce a change in another.','Güvenilir bir tavsiyenin deneme isteğini artırması.':'A trusted recommendation encourages a trial.','Ara aşama nedir? Bu aşama gözlemlenebilir mi?':'What is the intermediate step, and can it be observed?',
 'Erişim':'Reach','İnsanların içerikle karşılaşması. Tanımın ve sayım yönteminin belirtilmesi gerekir.':'People’s exposure to content. The definition and counting method must be specified.','Kaç kişi ilanı gerçekten gördü?':'How many people actually saw the advert?','Görüntülenme mi, tekil kişi mi, olası erişim mi?':'Views, unique people or potential reach?',
 'Alımlama':'Reception','İnsanların mesajı nasıl anladığı ve değerlendirdiği.':'How people understand and assess a message.','Aynı ilanın bir kişi tarafından yararlı, diğeri tarafından itici bulunması.':'The same advertisement is perceived as useful by one person and unappealing by another.','Kitle mesajı nasıl yorumlamıştır? Kitlenin kendi ifadelerine ilişkin kanıt var mıdır?':'How did the audience interpret the message? Is evidence of its own account available?',
 'Tutum ve davranış':'Attitude and behaviour','Tutum düşünce/değerlendirme, davranış gözlenebilir eylemdir.':'Attitude is an evaluation; behaviour is an observable action.','Kafeyi sevmek tutum, alışveriş yapmak davranıştır.':'Liking the café is an attitude; buying is behaviour.','Ölçülen unsur bir değerlendirme mi, gözlenebilir eylem mi?':'Does the measure concern an evaluation or an observable action?',
 'Sert güç':'Hard power','Maliyet veya maddi kazancı değiştirerek davranışı etkileme.':'Influencing behaviour by changing costs or material benefits.','Koşullu ödül veya yaptırım günlük benzetme olabilir.':'A conditional reward or penalty offers an everyday analogy.','Değişim maddi hesaptan mı kaynaklanıyor?':'Does the change reflect a material calculation?',
 'Yumuşak güç':'Soft power','Çekicilik ve meşru bulma yoluyla tercihleri şekillendirme kapasitesi.':'The capacity to shape preferences through attraction and perceived legitimacy.','Birini, iyi örnek olduğu için izlemek.':'Following someone because they set an appealing example.','Hayranlık ile politika desteği analitik olarak ayrılmış mıdır?':'Are admiration and support for a policy analytically distinguished?',
 'Kamu diplomasisi':'Public diplomacy','Dış amaçlarla bağlantılı olarak yabancı kamularla örgütlü etkileşim.':'Organised engagement with foreign publics connected to external objectives.','Dinleme ve ortak çalışma, tek yönlü duyurudan farklı işler.':'Listening and joint work operate differently from a one-way announcement.','Hangi dış amaç, hangi kamu, hangi geri bildirim?':'Which external purpose, public and feedback?',
 'Propaganda':'Propaganda','Siyasal amaçla algı ve davranışı sistemli yönlendiren iletişim.':'Communication systematically directing perceptions and behaviour towards political ends.','Doğru bir parçayı seçip geri kalanını saklamak mümkün.':'A true fragment can be selected while the rest is concealed.','Kaynak, eksik bağlam ve seçme özgürlüğü açık mı?':'Are the source, omitted context and freedom to choose clear?',
 'Güvenilirlik':'Credibility','Bir kaynağın inanılır ve güvenilmeye değer bulunması.':'A source being considered believable and trustworthy.','Yanlışını açıkça düzelten bir konuşmacı.':'A speaker who openly corrects an error.','Kaynağa duyulan güvenin nedenleri hangi kanıta dayanmaktadır?':'What evidence explains why the source is trusted?',
 'Karşılıklılık':'Reciprocity','Tarafların birbirini dinleyip sürece katkı sunabilmesi.':'Parties being able to listen and contribute to the process.','Birlikte karar vermek, yalnız emir almak değildir.':'Joint decision-making differs from simply receiving orders.','Diğer taraf programı değiştirebiliyor mu?':'Can the other party change the programme?',
 'Rakip açıklama':'Rival explanation','Gözlenen sonucu açıklayabilecek başka bir neden.':'Another cause that could explain the observed result.','Yeni müşteri ilan yerine yakın arkadaşının önerisiyle gelmiş olabilir.':'A new customer may have followed a friend’s advice rather than the advert.','Sonuç zaten oluşacak mıydı? Başka ne değişti?':'Would the result have occurred anyway? What else changed?',
 'Karşı olgu':'Counterfactual','Bu faaliyet yapılmasaydı ne olacağını soran karşılaştırma.':'A comparison asking what would have happened without the activity.','İlan verilmeseydi satışlar nasıl giderdi?':'What would sales have been without the advert?','Uygun karşılaştırma veya önceki eğilim var mı?':'Is there a suitable comparison or prior trend?',
 'Pay ve payda':'Numerator and denominator','Oranda pay sayılan miktar, payda ilgili toplamdır.':'The numerator is the counted amount; the denominator is the relevant total.','800 ulaşan / 1.000 hedef = %80.':'800 reached / 1,000 targeted = 80%.','Pay ve payda aynı kitleye ve döneme mi ilişkindir?':'Do both counts refer to the same population and period?',
 'Yüzde puan':'Percentage points','İki yüzde arasındaki aritmetik fark.':'The arithmetic difference between two percentages.','%40’tan %44’e geçiş 4 yüzde puandır.':'A move from 40% to 44% is 4 percentage points.','Yüzde puan ile göreli yüzde artışı ayrılmış mıdır?':'Are percentage points distinguished from relative percentage increases?',
 'Kaynak: Dersin Türkçe notlarındaki kavramsal açıklamalar. Açıklayıcı benzetmeler yalnızca öğrenmeyi kolaylaştıran örneklerdir.':'Source: Conceptual explanations in the English course notes. Everyday analogies serve only to support learning.',
 '1. hafta: kavramlar':'Week 1: concepts','14. hafta: ölçüm':'Week 14: measurement',
};

for (const locale of ['tr','en']) {
const T = value => {
 if (typeof value !== 'string' || locale === 'tr') return value;
 if (Object.hasOwn(EN,value)) return EN[value];
 if (/^Uygulama \d+$/.test(value)) return value.replace('Uygulama','Practice');
 throw new Error(`Missing English translation: ${value}`);
};
const out = path.join(repo, 'workbooks',locale==='tr'?'Kamu_Diplomasisi_Ogrenme_Atolyesi_TR.xlsx':'Public_Diplomacy_Learning_Workshop_EN.xlsx');
const qa = path.join(process.cwd(), `qa-workbook-${locale}`);
await fs.mkdir(path.dirname(out), { recursive: true });
await fs.mkdir(qa, { recursive: true });
const wb = Workbook.create();
const P = { burgundy: '#801c35', navy: '#182b3a', gold: '#d9b864', cream: '#fcfaf6', input: '#fff1c9', light: '#eee8e2', muted: '#53616c', white: '#ffffff' };
const font = 'Arial';
const names = ['1 Başla ve Haftalar', '2 Kanıt Çalışması', '3 Ölçüm Deneyi', '4 Kavram Rehberi','5 Araştırma Tasarımı'].map(T);
const sheets = names.map(n => wb.worksheets.add(n));
const links = [];
const noteURL = week => `https://mayhewforever.github.io/kamudiplomasisi/notes/${locale==='tr'?`Hafta_${String(week).padStart(2, '0')}_Ders_Notu_TR.html`:`Week_${String(week).padStart(2, '0')}_Lecture_Notes_EN.html`}`;
const set = (s, a, values) => { s.getRange(a).values = values.map(row=>row.map(T)); };
function base(s, last, widths) {
  s.showGridLines = false;
  s.tabColor = P.burgundy;
  const r = s.getRange(`A1:${last}`);
  r.format.font = { name: font, size: 11, color: P.navy };
  r.format.fill = P.cream;
  r.format.verticalAlignment = 'center';
  r.format.rowHeight = 25;
  s.getRange('A:A').format.columnWidthPx = 24;
  widths.forEach((w, i) => { s.getRange(`${String.fromCharCode(66 + i)}:${String.fromCharCode(66 + i)}`).format.columnWidthPx = w; });
}
function title(s, text, to) {
  set(s, 'B2', [[text]]);
  s.getRange('B2').format.font = { name: font, size: 17, bold: true, color: P.burgundy };
  s.getRange('B2').format.rowHeight = 31;
  s.getRange(`B3:${to}3`).format.borders = { bottom: { style: 'thin', color: P.gold } };
}
function prose(s, row, text, end='G', height=26) {
  set(s, `B${row}`, [[text]]);
  s.getRange(`B${row}:${end}${row}`).format.rowHeight = height;
  // Ordinary unmerged prose can flow into the intentionally empty cells.
}
function head(s, range, labels) {
  const r = s.getRange(range); r.values = [labels.map(T)];
  r.format = { fill: P.navy, font: { name: font, size: 11, bold: true, color: P.white }, wrapText: true, verticalAlignment: 'center', horizontalAlignment: 'center', rowHeight: 42 };
}
function tableBody(s, range) {
  const r=s.getRange(range); r.format.wrapText=true; r.format.verticalAlignment='top';
  r.format.borders={insideHorizontal:{style:'thin',color:P.light}};
}
function input(s, range) { s.getRange(range).format.fill=P.input; }
function link(s, cell, week, label='Ders notunu aç') {
  // Native hyperlink formulas are inserted after layout rendering. The artifact
  // renderer does not evaluate HYPERLINK; the native recalculation below does.
  label=T(label);
  links.push({s,cell,week,label});
  s.getRange(cell).values=[[label]];
  s.getRange(cell).format.font={name:font,size:11,color:P.burgundy,underline:'single'};
}

// 1. A weekly route with one small task and one concrete learning product.
const guide=sheets[0];
base(guide,'H34',[55,205,365,300,120,160,24]);
title(guide,'Kamu diplomasisi: haftalık çalışma rehberi','G');
prose(guide,4,'1. İlgili haftanın satırını belirleyiniz. “Ders notunu aç” bağlantısından haftalık okuma metnine ulaşınız.');
prose(guide,5,'2. “Uygulama” sütunundaki çalışmayı tamamlayınız. “Beklenen çıktı” sütununda belirtilen kapsamda kısa bir yanıt hazırlayınız.');
prose(guide,6,'3. Sarı hücrede çalışma durumunu seçiniz. Ardından 2. sayfadaki örneği inceleyerek kanıt tablosunda bir satır doldurunuz.');
prose(guide,8,'Açıklayıcı benzetme: Bir afişle karşılaşılması, tanıtılan ürünün beğenildiğini veya satın alındığını tek başına göstermez.');
prose(guide,9,'Çalışma kitabının kullanımı: Sarı hücreyi seçip veriyi giriniz ve Enter’a basınız. Sayfalar arasında alt sekmelerden geçiş yapınız.');
head(guide,'B11:G11',['Hafta','Konu','Uygulama','Beklenen çıktı','Ders notu','Çalışma durumu']);
const weekly=[
 ['Güç türlerini ayırmak','Bir burs örneği seçiniz. Finansman kaynağını, çekiciliği ve beklenen sonucu ayrı ayrı belirtiniz.','Üç cümlede kaynağı, aracı ve sonucu değerlendirmek için gereken ek kanıtı belirtiniz.'],
 ['Franklin ve Fransa','Franklin’in bilimsel veya toplumsal ağlardaki bir temasını seçiniz. Bu teması ittifak kararından analitik olarak ayırınız.','Temasın olası katkısına ve kararı açıklayabilecek başka bir nedene ilişkin iki açıklama.'],
 ['Birlik ve Avrupa','Birlik yönetiminin kullandığı bir anlatıyı belirleyiniz. Avrupa’da yöneldiği hedef kitleyi açıklayınız.','Bir mesaj, bir kitle, mesajın nasıl karşılandığını gösterecek bir belge türü.'],
 ['Konfederasyon ve pamuk','Pamuk kaynağının neden kendiliğinden siyasi desteğe dönüşmediğini açıklayınız.','Bir kaynak, bir beklenen sonuç ve öngörülen süreci kesintiye uğratabilecek iki koşul.'],
 ['Küba ve insani yardım','Yardım faaliyetini, bu faaliyetin medyadaki temsilinden ayırarak inceleyiniz.','Faaliyete ve haberciliğe ilişkin birer kanıt ile etkiyi değerlendirmek için gereken ek kanıt.'],
 ['Eğitim değişimleri','Bir öğrenci değişim programında ev sahibi ile katılımcının öğrenme deneyimlerini ayrı ayrı açıklayınız.','Katılım sayısına ek olarak izlenebilecek bir ilişki göstergesi.'],
 ['CPI ve iletişim ağı','Kamuoyu Bilgilendirme Komitesinin (CPI) iletişim ağını merkez, aracı ve kitle başlıklarıyla üç kutuda gösteriniz.','Bir afişin üretilmesi ile bir kişinin ikna olması arasındaki eksik adım.'],
 ['Propaganda ve etik','Doğru bilgiler içeren ancak kaynağı açıklanmayan bir mesajı değerlendiriniz.','Kaynak, eksik bağlam ve düzeltme yolu hakkında üç soru.'],
 ['Vakıflar ve özel ağlar','Bir vakıf veya üniversite örneği seçiniz. Finansman sağlayan aktörlerle karar alan aktörleri ayırınız.','İki aktör ve birbirlerinden bağımsız olabilecekleri bir nokta.'],
 ['Savaş dönemi kurumları','Ders notundaki üç kurumu amaç, hedef kamu ve kullanılan araç bakımından karşılaştırınız.','Üç kısa karşılaştırma satırı. Aynı aracın kullanılmasının neden aynı kurumsal göreve işaret etmediğini açıklayınız.'],
 ['Radyo, sinema ve basın','Aynı mesajın radyo, sinema ve gazetede nasıl farklı alımlanabileceğini değerlendiriniz.','Üç mecranın her biri için bir avantaj ve bir sınırlılık.'],
 ['Smith–Mundt ve kurumlar','Yasal yetki, uygulama kapasitesi ve sonuç için ayrı kanıtlar belirleyiniz.','Bir yasanın neyi mümkün kıldığı ve neyi tek başına kanıtlamadığı.'],
 ['Ülkeler arası karşılaştırma','İki kültür kurumunu veya yayıncıyı yönetim, hedef kitle ve geri bildirim süreçleri bakımından karşılaştırınız.','İki satırlık karşılaştırma ve sonucu etkileyebilecek bir bağlam farkı.'],
 ['Etkiyi değerlendirmek','3. sayfadaki sarı girdi hücrelerinden birini değiştiriniz. Erişimi ve destek değişimini ayrı ayrı yorumlayınız.','Dört cümle: amaç, gözlem, başka açıklama ve ek kanıt ihtiyacı.'],
];
set(guide,'B12:G25',weekly.map((x,i)=>[i+1,...x,null,'Başlamadım']));
tableBody(guide,'B12:G25'); guide.getRange('B12:G25').format.rowHeight=60;
guide.getRange('B12:B25').format.horizontalAlignment='center';
input(guide,'G12:G25');
guide.getRange('G12:G25').dataValidation={rule:{type:'list',values:['Başlamadım','Üzerinde çalışıyorum','Tamamladım'].map(T)}};
for(let i=0;i<14;i++)link(guide,`F${12+i}`,i+1);
guide.freezePanes.freezeRows(11);
prose(guide,28,'Analitik ifade şablonu: “Bu kaynak … göstermektedir. … sonucuna ulaşmak için ayrıca … kanıtı gereklidir.”');
prose(guide,30,'Örnek: “Afiş, mesajın üretildiğini göstermektedir. İkna sonucuna ulaşmak için kitlenin tepkisine ilişkin kanıt da gereklidir.”');
prose(guide,32,'Kaynak: Bu sitedeki 14 haftalık Türkçe ders notu. Bağlantılar yukarıdaki ilgili hafta satırındadır.');

// 2. Three explicitly illustrative, solved reasoning examples, then editable practice.
const evidence=sheets[1];
base(evidence,'I27',[180,205,210,215,210,200,130,24]);
title(evidence,'İddiaların kanıt temelinde sınanması','H');
prose(evidence,4,'1. İddiayı tek cümleyle ifade ediniz. 2. İncelenen belgeyi belirtiniz. 3. Belgenin kanıtlama sınırlarını açıklayınız.','H');
prose(evidence,5,'Kanıt, bir iddiayı destekleyen izdir. Aşağıdaki kanıt matrisi, bu izlerin ortak sorular temelinde karşılaştırılmasını sağlar.','H');
prose(evidence,6,'Açıklayıcı örnek: Kafe ilanıyla karşılaşılması, kahve satın alındığını göstermez. İki olay arasındaki eksik adımı belirleyiniz.','H');
prose(evidence,8,'Çözülmüş örnekler: Aşağıdaki belge türleri öğretim içindir. Bunlar bulunmuş gerçek arşiv belgeleri değildir.','H');
head(evidence,'B10:H10',['Örnek','Sınanan iddia','İncelenen belge türü','Belgenin gösterebileceği husus','Tek başına gösteremeyeceği husus','Olası rakip açıklama','Ders bağlantısı']);
set(evidence,'B11:H13',[
 ['1. Üniversite değişimi','“Programa katılım oldu.”','Varsayılan katılım listesi.','Listelenen kişilerin programa katılımını.','Katılımcıların ülkeye güveninin arttığını.','Başvuranlar ülkeye zaten ilgi duyuyor olabilir.',null],
 ['2. CPI afişi','“Komite bu mesajı üretti.”','Varsayılan CPI afişi ve üretim kaydı.','Mesajın içeriğini ve üretimini.','Kaç kişinin gördüğünü veya ikna olduğunu.','Destek, mesajdan önce var olmuş olabilir.',null],
 ['3. Sinema gösterimi','“Film gösterime sunuldu.”','Varsayılan sinema programı.','Belirli yerde gösterim planlandığını.','Her izleyicinin aynı anlamı çıkardığını.','Yerel yorumlar ve mevcut görüşler farklı olabilir.',null],
]);
tableBody(evidence,'B11:H13'); evidence.getRange('B11:H13').format.rowHeight=65;
link(evidence,'H11',6);link(evidence,'H12',7);link(evidence,'H13',11);
prose(evidence,15,'Uygulama: Ders notundan bir vaka seçerek sarı satırı doldurunuz. İncelenmemiş belgeleri “aranacak belge” olarak belirtiniz.','H');
head(evidence,'B17:H17',['Vaka / hafta','Sınanan iddia','Belge / aranacak belge','Belgeden çıkarılabilecek bilgi','Yanıtlanmamış sorular','Başka açıklama','Kaynak veya sayfa']);
set(evidence,'B18:H21',Array.from({length:4},(_,i)=>[`Uygulama ${i+1}`,null,null,null,null,null,null]));
tableBody(evidence,'B18:H21'); evidence.getRange('B18:H21').format.rowHeight=74;input(evidence,'B18:H21');
prose(evidence,23,'Değerlendirme: Belgenin varlığı ile etkiye ilişkin iddia ayrılmış mıdır? Etki iddiası varsa bağlantıyı kuran adımlar gösterilmiş midir?','H');
prose(evidence,25,'Örneklere temel: 6. hafta eğitim değişimi, 7. hafta CPI, 11. hafta medya. İlgili ders notları örnek satırlarında bağlıdır.','H');
evidence.freezePanes.freezeRows(10);

// 3. A fully fictional, editable measurement exercise. No causal effect estimate.
const lab=sheets[2];
base(lab,'I52',[165,140,140,145,140,140,210,24]);
title(lab,'Erişim ve destek değişiminin karşılaştırılması','H');
prose(lab,4,'Tamamen varsayımsal veri: A ve B hayalî kampanyalardır. Sayılar gerçek kişi, öğrenci veya tarihsel olay verisi değildir.','H');
prose(lab,5,'1. Sarı girdi hücrelerini inceleyiniz. 2. Aşağıdaki çözülmüş örneği okuyunuz. 3. D10’a 600 girerek sonuçlardaki değişimi gözlemleyiniz.','H');
prose(lab,6,'Başlangıç örneğinde, her kampanyada ulaşılanlardan seçilmiş aynı 100 kişiye önce ve sonra aynı destek sorusu soruldu.','H');
prose(lab,7,'“Destek”, soruya verilen olumlu yanıttır. İkna iddiası daha güçlü kanıt gerektirir. Kontrol grubu bulunmayan bu gözlem nedenselliği kanıtlamaz.','H');
prose(lab,8,'Kontrol grubu, kampanyaya maruz kalmayan ve karşılaştırma amacıyla izlenen benzer kişilerden oluşur. Bu örnekte kontrol grubu bulunmamaktadır.','H');
head(lab,'B9:H9',['Kampanya','Hedef kitle (kişi)','Ulaşılan (kişi)','İki ankette aynı grup (kişi)','Önce destekleyen (kişi)','Sonra destekleyen (kişi)','Girdi durumu']);
set(lab,'B10:G11',[['A kampanyası',1000,800,100,40,44],['B kampanyası',1000,400,100,40,55]]);
input(lab,'C10:G11');tableBody(lab,'B10:H11');lab.getRange('B10:H11').format.rowHeight=29;
lab.getRange('C10:G11').setNumberFormat('#,##0');
lab.getRange('C10:G11').dataValidation={rule:{type:'whole',operator:'between',formula1:0,formula2:1000000}};
lab.getRange('H10').formulas=[[`=IF(COUNT(C10:G10)<5,"${T('Sayı eksik')}",IF(OR(C10<=0,D10<0,D10>C10,E10<=0,E10>D10,F10<0,F10>E10,G10<0,G10>E10),"${T('Sayıları kontrol et')}","${T('Hazır')}"))`]];
lab.getRange('H10:H11').fillDown();
lab.getRange('H10:H11').conditionalFormats.add('containsText',{text:T('Sayı'),format:{fill:'#fce1dd',font:{color:'#9c2635',bold:true}}});
prose(lab,13,'Sarı olmayan sonuç hücreleri otomatik hesaplanır. Hedef, anket grubu ve destek sayıları tutarlı olmalıdır.','H');
head(lab,'B15:H15',['Kampanya','Erişim oranı','Önce destek oranı','Sonra destek oranı','Değişim (yüzde puan)','Hesaplama yöntemi','Sonucun yorumu']);
for(let i=0;i<2;i++){
 const r=16+i, src=10+i;
 lab.getRange(`B${r}:F${r}`).formulas=[[`=B${src}`,`=IF(H${src}="${T('Hazır')}",D${src}/C${src},"")`,`=IF(H${src}="${T('Hazır')}",F${src}/E${src},"")`,`=IF(H${src}="${T('Hazır')}",G${src}/E${src},"")`,`=IF(H${src}="${T('Hazır')}",(E${r}-D${r})*100,"")`]];
 lab.getRange(`H${r}`).formulas=[[`=IF(H${src}<>"${T('Hazır')}",H${src},"${T('Destek değişimi: ')}"&TEXT(F${r},"0.0")&"${T(' yüzde puan. Nedeni henüz bilinmiyor.')}")`]];
}
set(lab,'G16:G17',[['Erişim = ulaşan ÷ hedef.'],['Değişim = sonra % − önce %.']]);
tableBody(lab,'B16:H17');lab.getRange('B16:H17').format.rowHeight=52;
lab.getRange('C16:E17').setNumberFormat('0.0%');lab.getRange('F16:F17').setNumberFormat('0.0');
prose(lab,19,'Çözülmüş başlangıç örneği: A’da 800 ÷ 1.000 = %80 erişim. Destek %40’tan %44’e çıkar: 4 yüzde puan.','H');
prose(lab,20,'B’de başlangıç erişimi daha düşük (%40), destek artışı daha yüksektir (15 yüzde puan). Maruz kalma ile ikna ayrı ayrı değerlendirilmelidir.','H');
const chart=lab.charts.add('bar',lab.getRange('B15:E17'));
chart.title=T('Varsayımsal kampanyalarda erişim ve destek (%)');
chart.titleTextStyle.typeface=font;chart.titleTextStyle.fontSize=14;
chart.legend={position:'top',textStyle:{typeface:font,fontSize:12}};
chart.xAxis={axisType:'textAxis',textStyle:{typeface:font,fontSize:12}};
chart.yAxis={numberFormatCode:'0%',numberFormatSourceLinked:false,textStyle:{typeface:font,fontSize:12}};
chart.series.items.forEach((s,i)=>{s.fill=[P.burgundy,'#8296a4',P.gold][i];});
chart.setPosition('B22','H35');
prose(lab,36,'Alıştırma 1: D10’u 800’den 600’e değiştiriniz. Erişim %60 olur. Destek değişiminin neden sabit kaldığını açıklayınız.','H');
prose(lab,37,'Alıştırma 2: G10’u 44’ten 60’a değiştiriniz. Destek %60, artış 20 yüzde puan olur. Değişen girdiyi belirleyiniz.','H');
prose(lab,38,'Alıştırma 3: E10’u boş bırakınız. Eksik veri için sonucun boş kalmasının neden %0 gösterilmesinden uygun olduğunu açıklayınız. Ardından 100 giriniz.','H');
prose(lab,39,'Alıştırma 4: B’nin daha fazla ikna sağladığı iddiası için gereken ek kanıtı belirtiniz. Başlangıç farklarını ve diğer olayları değerlendiriniz.','H');
head(lab,'B41:H41',['Yanıt','Erişim neyi ölçer?','Destek neyi ölçer?','Başka olası neden','Hangi ek veri gerekir?','Sonucun sınırlılığı','Bir cümlelik sonuç']);
set(lab,'B42:H42',[['Analitik açıklama',null,null,null,null,null,null]]);input(lab,'C42:H42');tableBody(lab,'B42:H42');lab.getRange('B42:H42').format.rowHeight=88;
prose(lab,45,'Formülü incelemek için C16’yı seçiniz. Formül çubuğundaki D10/C10, “ulaşılan kişi sayısı / hedef kişi sayısı” oranını ifade eder.','H');
prose(lab,46,'Yüzde puan: %40 ile %44 arasındaki fark 4 puandır. Göreli yüzde artışı ise %10’dur. Bunlar farklı ölçülerdir.','H');
prose(lab,48,'Kaynak: Bu sayfadaki sayılar öğretim amacıyla kuruldu. Kavramlar dersin 1. ve 14. hafta notlarına dayanır.','H');
link(lab,'B50',1,'1. hafta notu');link(lab,'D50',14,'14. hafta notu');

// 4. Short definitions with everyday analogies and practical distinctions.
const ref=sheets[3];
base(ref,'G31',[190,355,325,290,24]);
title(ref,'Temel kavramlar ve açıklayıcı benzetmeler','E');
prose(ref,4,'1. İncelenecek kavramı belirleyiniz. 2. Açıklayıcı örneği okuyunuz. 3. Son sütundaki soruyu seçilen ders vakasına uygulayınız.','E');
head(ref,'B6:E6',['Kavram','Kısa tanım','Açıklayıcı benzetme','Analitik soru']);
const concepts=[
 ['Aktör','Belirli bir amacı gerçekleştirmeye çalışan kişi veya kuruluş.','Bir kafe sahibinin ilan hazırlatması.','Kim, neyi değiştirmeye çalışıyor?'],
 ['Hedef kamu','Mesajla veya programla ilişki kurulan insan topluluğu.','Kafenin çevresindeki öğrenciler.','Hangi gruplar incelenmektedir? Aralarındaki farklılıklar dikkate alınmış mıdır?'],
 ['Kaynak','Kullanılabilecek para, bilgi, ilişki veya itibar.','Kafenin bütçesi ve iyi adı.','Sahip olunan imkân mı, gözlenmiş sonuç mu?'],
 ['Araç','Bir kaynağın insanlarla etkileşim kurmak için kullanılma biçimi.','İlan, tanıtım etkinliği veya davet.','Temas nasıl kuruluyor?'],
 ['Mekanizma','Bir etkenin başka bir etkeni nasıl değiştirebileceğini açıklayan süreç.','Güvenilir bir tavsiyenin deneme isteğini artırması.','Ara aşama nedir? Bu aşama gözlemlenebilir mi?'],
 ['Erişim','İnsanların içerikle karşılaşması. Tanımın ve sayım yönteminin belirtilmesi gerekir.','Kaç kişi ilanı gerçekten gördü?','Görüntülenme mi, tekil kişi mi, olası erişim mi?'],
 ['Alımlama','İnsanların mesajı nasıl anladığı ve değerlendirdiği.','Aynı ilanın bir kişi tarafından yararlı, diğeri tarafından itici bulunması.','Kitle mesajı nasıl yorumlamıştır? Kitlenin kendi ifadelerine ilişkin kanıt var mıdır?'],
 ['Tutum ve davranış','Tutum düşünce/değerlendirme, davranış gözlenebilir eylemdir.','Kafeyi sevmek tutum, alışveriş yapmak davranıştır.','Ölçülen unsur bir değerlendirme mi, gözlenebilir eylem mi?'],
 ['Sert güç','Maliyet veya maddi kazancı değiştirerek davranışı etkileme.','Koşullu ödül veya yaptırım günlük benzetme olabilir.','Değişim maddi hesaptan mı kaynaklanıyor?'],
 ['Yumuşak güç','Çekicilik ve meşru bulma yoluyla tercihleri şekillendirme kapasitesi.','Birini, iyi örnek olduğu için izlemek.','Hayranlık ile politika desteği analitik olarak ayrılmış mıdır?'],
 ['Kamu diplomasisi','Dış amaçlarla bağlantılı olarak yabancı kamularla örgütlü etkileşim.','Dinleme ve ortak çalışma, tek yönlü duyurudan farklı işler.','Hangi dış amaç, hangi kamu, hangi geri bildirim?'],
 ['Propaganda','Siyasal amaçla algı ve davranışı sistemli yönlendiren iletişim.','Doğru bir parçayı seçip geri kalanını saklamak mümkün.','Kaynak, eksik bağlam ve seçme özgürlüğü açık mı?'],
 ['Güvenilirlik','Bir kaynağın inanılır ve güvenilmeye değer bulunması.','Yanlışını açıkça düzelten bir konuşmacı.','Kaynağa duyulan güvenin nedenleri hangi kanıta dayanmaktadır?'],
 ['Karşılıklılık','Tarafların birbirini dinleyip sürece katkı sunabilmesi.','Birlikte karar vermek, yalnız emir almak değildir.','Diğer taraf programı değiştirebiliyor mu?'],
 ['Rakip açıklama','Gözlenen sonucu açıklayabilecek başka bir neden.','Yeni müşteri ilan yerine yakın arkadaşının önerisiyle gelmiş olabilir.','Sonuç zaten oluşacak mıydı? Başka ne değişti?'],
 ['Karşı olgu','Bu faaliyet yapılmasaydı ne olacağını soran karşılaştırma.','İlan verilmeseydi satışlar nasıl giderdi?','Uygun karşılaştırma veya önceki eğilim var mı?'],
 ['Pay ve payda','Oranda pay sayılan miktar, payda ilgili toplamdır.','800 ulaşan / 1.000 hedef = %80.','Pay ve payda aynı kitleye ve döneme mi ilişkindir?'],
 ['Yüzde puan','İki yüzde arasındaki aritmetik fark.','%40’tan %44’e geçiş 4 yüzde puandır.','Yüzde puan ile göreli yüzde artışı ayrılmış mıdır?'],
];
set(ref,'B7:E24',concepts);tableBody(ref,'B7:E24');ref.getRange('B7:E24').format.rowHeight=48;
prose(ref,27,'Kaynak: Dersin Türkçe notlarındaki kavramsal açıklamalar. Açıklayıcı benzetmeler yalnızca öğrenmeyi kolaylaştıran örneklerdir.','E');
link(ref,'B29',1,'1. hafta: kavramlar');link(ref,'D29',14,'14. hafta: ölçüm');ref.freezePanes.freezeRows(6);

// 5. A research design form: provenance and observation are distinct from inference.
const R=(tr,en)=>{EN[tr]=en;return tr;};
const research=sheets[4];
base(research,'E36',[270,535,535,24]);
title(research,R('Araştırma tasarımının aşamaları','Stages of research design'),'D');
prose(research,4,R('1. Çözülmüş kurmaca örneği inceleyiniz. 2. Seçilen vakayı sarı sütunda açıklayınız. 3. İddiayla çelişebilecek kanıtları da araştırınız.',
 '1. Examine the fictional worked example. 2. Describe the selected case in the yellow column. 3. Seek evidence that may challenge the claim.'),'D');
prose(research,5,R('Kaynak kökeni, belgenin üreticisini, tarihini, amacını ve araştırmacıya hangi yolla ulaştığını belirtir.',
 'Source provenance identifies a document’s creator, date, purpose and route of transmission to the researcher.'),'D');
prose(research,6,R('Gözlem, belgede yer alan bilgidir. Yorum, bu bilgiden yapılan çıkarımdır. İkisinin ayrı belirtilmesi, çıkarımın denetlenmesini sağlar.',
 'An observation concerns what appears in the record. An interpretation is an inference from it. Recording them separately makes the reasoning open to scrutiny.'),'D');
prose(research,7,R('Örnek tamamen kurmacadır. ÖRNEK-1 gerçek bir belge kodu değildir. Sarı alanlara öğrenci adı veya kişisel veri girmeyiniz.',
 'The example is entirely fictional. EXAMPLE-1 is not a real record identifier. Do not enter student names or personal data in the yellow cells.'),'D');
head(research,'B9:D9',[
 R('Kanıtı sorgulama alanı','Evidence question'),
 R('Çözülmüş kurmaca örnek','Fictional worked example'),
 R('Araştırma uygulaması','Research application')
]);
const evidenceDesign=[
 [R('İddia: Sınanacak önerme','Claim: statement to be tested'),R('Değişim atölyesi, iki öğretmenin ilk ortak ders planını hazırlamasına katkıda bulundu. Bu, sınanacak iddiadır; henüz sonuç değildir.',
 'The exchange workshop contributed to two teachers preparing their first joint lesson plan. This is the claim to test, not an established result.')],
 [R('Kaynak kökeni: Belgeyi kim üretti?','Provenance: who produced the source?'),R('ÖRNEK-1: Katılımcı A’nın katılımcı B’ye atölye sonrasında yazdığı varsayılan özel mektup. Üretici, alıcı, tarih, amaç ve saklandığı yer gerçek araştırmada ayrıca doğrulanır.',
 'EXAMPLE-1: An imagined private letter from participant A to participant B after the workshop. A real study must verify creator, recipient, date, purpose and repository.')],
 [R('Gözlem: Belgenin içerdiği bilgi','Observation: content of the record'),R('Varsayılan mektup, ortak bir ders taslağından söz eder. Bu gözlem, mektubun içeriğine ilişkindir; taslağın uygulandığını göstermez.',
 'The imagined letter mentions a joint lesson draft. This observation concerns the letter’s content; it does not show that the draft was implemented.')],
 [R('Yorum: Gözlemden yapılan çıkarım','Interpretation: inference from the observation'),R('Atölye sonrasında iletişimin sürmüş olmasıyla uyumludur. Atölyenin tek neden olduğu veya ilişkinin kalıcı olduğu sonucuna yetmez.',
 'It is consistent with continued contact after the workshop. It does not establish that the workshop was the sole cause or that the relationship endured.')],
 [R('Rakip açıklama: Başka neden olabilir mi?','Rival explanation: could another cause explain it?'),R('Öğretmenler önceden tanışıyor veya başka bir proje için zaten işbirliği planlıyor olabilir. Atölye öncesi yazışmalar bu açıklamayı sınayabilir.',
 'The teachers may have known each other or already planned another joint project. Pre-workshop correspondence could test this explanation.')],
 [R('Sınırlılık: Kanıtın açıklama sınırı','Limitation: scope of the evidence'),R('Tek bir öz bildirime dayanır. Yazışmanın seçilerek korunması, olumlu anlatım ve karşı tarafın sessizliği sonucu çarpıtabilir. İletişim, politika değişikliği anlamına gelmez.',
 'It relies on one self-report. Selective survival, positive self-presentation and the other party’s silence may distort the account. Contact is not a policy change.')],
 [R('Ek kanıt: Doğrulanacak hususlar','Further evidence: matters to verify'),R('Atölye öncesi kayıtlar, ikinci katılımcının anlatısı ve tarihli ortak taslak karşılaştırılır. Çelişki varsa iddia daraltılır. Aynı kaynağın tekrarı bağımsız doğrulama sayılmaz.',
 'Compare earlier records, the second participant’s account and the dated joint draft. Conflicting evidence requires a narrower claim. Repetition of one source is not independent corroboration.')],
];
set(research,'B10:D16',evidenceDesign.map(row=>[...row,null]));
tableBody(research,'B10:D16');research.getRange('B10:D16').format.rowHeight=84;input(research,'D10:D16');
prose(research,18,R('Tasarım kararları: Her satır bir araştırma tercihini açıklar. Veri bulunmuyorsa gerekli kanıtı belirtiniz ve sonuç iddiasını sınırlayınız.',
 'Design decisions: Each row specifies a research choice. Where data are absent, identify the evidence required and limit the conclusion accordingly.'),'D');
head(research,'B20:D20',[R('Tasarım kararı','Design decision'),R('Örnekteki uygulama','Application in the example'),R('Araştırma planı','Research plan')]);
const design=[
 [R('Araştırma sorusu','Research question'),R('Atölye, belirli iki öğretmenin ilk ortak ders taslağını hazırlamasına hangi süreçle katkıda bulundu?',
 'Through what process did the workshop contribute to this pair of teachers preparing their first joint lesson draft?')],
 [R('İnceleme birimi','Unit of analysis'),R('Bir öğretmen çifti ve ortak çalışma süreci. Kişi, etkinlik ve ülke düzeyindeki iddialar analitik olarak ayrı tutulur.',
 'One pair of teachers and its collaborative process. Claims about individuals, events and countries remain analytically distinct.')],
 [R('Zaman ve kapsam','Time and scope'),R('Varsayımsal plan: atölyeden önceki ve sonraki üç ay. Bu kapsamın dışındaki olaylar yalnızca açık bir gerekçeyle incelemeye eklenir.',
 'Hypothetical plan: the three months before and after the workshop. Extend the scope only with an explicit reason.')],
 [R('Beklenen mekanizma','Proposed mechanism'),R('Atölyede temas kurulması, ortak bir konu seçilmesi ve birlikte taslak hazırlanması. Her aşama için ayrı bir gözlenebilir iz aranır.',
 'Contact at the workshop, agreement on a topic, then joint drafting. Seek a distinct observable trace for each step.')],
 [R('Gösterge ve tanımı','Indicator and definition'),R('Tarih ve ortak katkı izi bulunan ders taslağı. Katılım listesi yalnız katılımı gösterir; ortak üretimin yerine geçmez.',
 'A dated lesson draft with traces of contributions by both teachers. Attendance shows participation, not joint production.')],
 [R('Vaka seçimi','Case selection'),R('Vaka seçimi başarı anlatılarıyla sınırlanmaz. Sürmeyen temaslar da araştırılır. Kişi veya belgelerin dışarıda bırakılma nedenleri kaydedilir.',
 'Case selection extends beyond accounts of success. Investigate contacts that did not continue and document why people or records were excluded.')],
 [R('Karşılaştırma ve karşı olgu','Comparison and counterfactual'),R('Atölye öncesindeki işbirliği ve karşılaştırmaya uygun katılmayan kişiler araştırılır. Grupların başlangıç farklılıkları açıklanır. Karşılaştırılabilirlik varsayılmaz.',
 'Investigate earlier collaboration and suitable similar non-participants. Explain possible initial differences rather than assuming comparability.')],
 [R('Etik ve veri yönetimi','Ethics and data management'),R('Gönüllü katılım, uygun izin, kişisel verilerin en aza indirilmesi ve güvenli saklama planlanır. Öğrenci verileri bu çalışma kitabına aktarılmaz.',
 'Plan voluntary participation, appropriate permission, minimal personal data and secure storage. Do not copy student records into this workbook.')],
 [R('Kaynak gösterme ve denetim izi','Citation and audit trail'),R('Yazar, tarih, başlık, koleksiyon veya yayın, kayıt/sayfa ve erişim bilgisi kaydedilir. Çeviri, eksik belge ve değişen yorum için kısa bir işlem günlüğü tutulur.',
 'Record author, date, title, collection or publication, record/page and access details. Keep a short log of translations, missing records and revised interpretations.')],
];
set(research,'B21:D29',design.map(row=>[...row,null]));
tableBody(research,'B21:D29');research.getRange('B21:D29').format.rowHeight=76;input(research,'D21:D29');
prose(research,31,R('Teslim öncesi değerlendirme: İddia, gözlem, yorum ve sınırlılık ayrılmış mıdır? En güçlü rakip açıklamayı sınamak için hangi kanıt gereklidir?',
 'Review before submission: Are the claim, observation, interpretation and limitation distinguished? What evidence would test the strongest rival explanation?'),'D');
prose(research,32,R('Ders dayanağı: 6. hafta değişimler, 14. hafta kanıt ve değerlendirme. Kurmaca örnek herhangi bir tarihsel sonuca kanıt oluşturmaz.',
 'Course basis: Week 6 on exchanges and week 14 on evidence and evaluation. This fictional example establishes no historical finding.'),'D');
link(research,'B34',6,R('6. hafta: değişimler','Week 6: exchanges'));
link(research,'C34',14,'14. hafta: ölçüm');research.freezePanes.freezeRows(9);

// Verification: input changes update the same formulas. Restore all teaching defaults.
wb.recalculate();
const value=(cell)=>lab.getRange(cell).values[0][0];
const near=(actual,expected)=>assert.ok(Math.abs(actual-expected)<1e-9,`${actual} != ${expected}`);
near(value('C16'),.8);near(value('C17'),.4);near(value('F16'),4);near(value('F17'),15);
set(lab,'D10',[[600]]);wb.recalculate();near(value('C16'),.6);near(value('F16'),4);
set(lab,'G10',[[60]]);wb.recalculate();near(value('E16'),.6);near(value('F16'),20);
set(lab,'E10',[[null]]);wb.recalculate();assert.equal(value('H10'),T('Sayı eksik'));assert.equal(value('C16'),'');
set(lab,'E10',[[0]]);wb.recalculate();assert.equal(value('H10'),T('Sayıları kontrol et'));assert.equal(value('F16'),'');
set(lab,'C10:G10',[[1000,800,100,40,44]]);set(lab,'D10',[[1001]]);wb.recalculate();assert.equal(value('H10'),T('Sayıları kontrol et'));
set(lab,'C10:G10',[[1000,800,100,40,44]]);set(lab,'F10:G10',[[0,0]]);wb.recalculate();near(value('D16'),0);near(value('F16'),0);
set(lab,'C10:G10',[[1000,800,100,40,44]]);
wb.recalculate();
const errors=await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:50},summary:'Final formula error scan',maxChars:4000});
await fs.writeFile(path.join(qa,'formula-errors.ndjson'),errors.ndjson);
const inspected=await wb.inspect({kind:'table',range:`'${lab.name}'!B9:H17`,include:'values,formulas',tableMaxRows:9,tableMaxCols:7,maxChars:6500});
await fs.writeFile(path.join(qa,'measurement-check.ndjson'),inspected.ndjson);
const previews=[
 [guide,'B1:G18','weekly-1'],[guide,'B19:G33','weekly-2'],
 [evidence,'B1:H14','evidence-1'],[evidence,'B15:H26','evidence-2'],
 [lab,'B1:H20','measurement-1'],[lab,'B22:H39','measurement-2'],[lab,'B41:H51','measurement-3'],
 [ref,'B1:E15','concepts-1'],[ref,'B16:E30','concepts-2'],
 [research,'B1:D17','research-1'],[research,'B18:D35','research-2'],
];
for(const [sheet,range,name]of previews){
 const blob=await wb.render({sheetName:sheet.name,range,scale:1.3,format:'png'});
 await fs.writeFile(path.join(qa,`${name}.png`),new Uint8Array(await blob.arrayBuffer()));
}
for(const {s,cell,week,label}of links)s.getRange(cell).formulas=[[`=HYPERLINK("${noteURL(week)}","${label}")`]];
wb.recalculate();
const xlsx=await SpreadsheetFile.exportXlsx(wb);await xlsx.save(out);
await fs.rename(`${out}.inspect.ndjson`,path.join(qa,'export-inspect.ndjson')).catch(e=>{if(e.code!=='ENOENT')throw e;});
// Native recalculation supplies correct HYPERLINK caches and verifies the
// exported workbook in a spreadsheet engine. Authoring remains Artifact Tool.
const nativeDir=path.join(qa,'native-recalculated');
await fs.mkdir(nativeDir,{recursive:true});
execFileSync('soffice',['--headless','--convert-to','xlsx','--outdir',nativeDir,out],{stdio:'pipe',timeout:120000});
await fs.copyFile(path.join(nativeDir,path.basename(out)),out);
console.log(JSON.stringify({output:out,sheets:names,changeInputChecks:'passed',errorScan:errors.ndjson,chartSeries:chart.series.items.map(s=>({formula:s.formula,categoryFormula:s.categoryFormula})),qa},null,2));
}
