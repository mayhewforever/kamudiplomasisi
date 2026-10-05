/**
 * Rebuild the Turkish beginner workbook with @oai/artifact-tool.
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
const out = path.join(repo, 'workbooks/Kamu_Diplomasisi_Ogrenme_Atolyesi_TR.xlsx');
const qa = path.join(process.cwd(), 'qa-workbook');
await fs.mkdir(path.dirname(out), { recursive: true });
await fs.mkdir(qa, { recursive: true });
const wb = Workbook.create();
const P = { burgundy: '#801c35', navy: '#182b3a', gold: '#d9b864', cream: '#fcfaf6', input: '#fff1c9', light: '#eee8e2', muted: '#53616c', white: '#ffffff' };
const font = 'Arial';
const names = ['1 Başla ve Haftalar', '2 Kanıt Çalışması', '3 Ölçüm Deneyi', '4 Kavram Rehberi'];
const sheets = names.map(n => wb.worksheets.add(n));
const links = [];
const noteURL = week => `https://mayhewforever.github.io/kamudiplomasisi/notes/Hafta_${String(week).padStart(2, '0')}_Ders_Notu_TR.html`;
const set = (s, a, values) => { s.getRange(a).values = values; };
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
  const r = s.getRange(range); r.values = [labels];
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
  links.push({s,cell,week,label});
  s.getRange(cell).values=[[label]];
  s.getRange(cell).format.font={name:font,size:11,color:P.burgundy,underline:'single'};
}

// 1. A weekly route with one small task and one concrete learning product.
const guide=sheets[0];
base(guide,'H34',[55,205,365,300,120,160,24]);
title(guide,'Kamu diplomasisi: ilk adımlar','G');
prose(guide,4,'1. Bu hafta hangi konuyu işliyorsanız o satırı bulun. “Ders notunu aç” bağlantısına tıklayın.');
prose(guide,5,'2. “Küçük görev” sütununu uygulayın. “Yazacağınız sonuç” kadar kısa bir cevap hazırlayın.');
prose(guide,6,'3. Sarı durum hücresinden seçin. Sonra 2. sayfadaki örneği okuyup kendi kanıt satırınızı doldurun.');
prose(guide,8,'Gündelik benzetme: Bir afişi görmek, afişte önerilen ürünü beğenmek veya satın almakla aynı şey değildir.');
prose(guide,9,'Excel ipucu: Sarı hücreye tıklayın, yazın ve Enter’a basın. Diğer sayfalara alttaki sekmelerden geçin.');
head(guide,'B11:G11',['Hafta','Konu','Küçük görev','Yazacağınız sonuç','Ders notu','Durum (siz seçin)']);
const weekly=[
 ['Güç türlerini ayırmak','Bir burs örneği seçin. Para, çekicilik ve beklenen sonucu ayrı yazın.','Üç cümle: kaynak ne, araç ne, sonuç için hangi kanıt eksik?'],
 ['Franklin ve Fransa','Franklin’in bir bilim veya toplum ağı temasını seçin. Teması, ittifak kararından ayırın.','İki neden: temasın katkısı ne olabilir, kararın başka nedeni ne olabilir?'],
 ['Birlik ve Avrupa','Birlik yönetiminin bir anlatısını bulun. Avrupa’daki hangi kitleye seslendiğini yazın.','Bir mesaj, bir kitle, mesajın nasıl karşılandığını gösterecek bir belge türü.'],
 ['Konfederasyon ve pamuk','Pamuk kaynağının neden otomatik siyasi destek üretmediğini açıklayın.','Bir kaynak, bir beklenen sonuç, zinciri bozabilecek iki koşul.'],
 ['Küba ve insani yardım','Yardım faaliyeti ile yardımın medyada anlatılmasını ayrı düşünün.','Faaliyet için bir kanıt, habercilik için bir kanıt, etki için bir eksik kanıt.'],
 ['Eğitim değişimleri','Bir öğrenci değişim programında ev sahibi ile katılımcının ne öğrendiğini yazın.','Katılım sayısının yanında izleyeceğiniz bir ilişki göstergesi.'],
 ['CPI ve iletişim ağı','Kamuoyu Bilgilendirme Komitesini (CPI) merkez, aracı ve kitle olarak üç kutuya ayırın.','Bir afişin üretilmesi ile bir kişinin ikna olması arasındaki eksik adım.'],
 ['Propaganda ve etik','Doğru bilgiler içeren ama kaynağı gizli bir mesajı değerlendirin.','Kaynak, eksik bağlam ve düzeltme yolu hakkında üç soru.'],
 ['Vakıflar ve özel ağlar','Bir vakıf veya üniversite örneği seçin. Kimin finansman verdiğini ve kararı kimin aldığını ayırın.','İki aktör ve birbirlerinden bağımsız olabilecekleri bir nokta.'],
 ['Savaş dönemi kurumları','Notta tanıtılan üç kurumu amaç, hedef insanlar ve kullanılan araç başlıklarında karşılaştırın.','Üç kısa satır. Aynı aracı kullanmanın neden aynı görev olmadığını ekleyin.'],
 ['Radyo, sinema ve basın','Aynı mesajın radyo, film ve gazetede nasıl farklı karşılanabileceğini düşünün.','Üç mecra için birer avantaj ve birer sınır.'],
 ['Smith–Mundt ve kurumlar','Yasal yetki, uygulama kapasitesi ve sonuç için ayrı kanıtlar belirleyin.','Bir yasanın neyi mümkün kıldığı ve neyi tek başına kanıtlamadığı.'],
 ['Ülkeler arası karşılaştırma','İki kültür kurumu veya yayıncıyı aynı üç soruyla karşılaştırın: kim yönetir, kime ulaşır, nasıl geri bildirim alır?','İki satırlık karşılaştırma ve sonucu etkileyebilecek bir bağlam farkı.'],
 ['Etkiyi değerlendirmek','3. sayfadaki sarı sayılardan birini değiştirin. Erişim ve destek değişimini ayrı okuyun.','Dört cümle: amaç, gözlem, başka açıklama ve ek kanıt ihtiyacı.'],
];
set(guide,'B12:G25',weekly.map((x,i)=>[i+1,...x,null,'Başlamadım']));
tableBody(guide,'B12:G25'); guide.getRange('B12:G25').format.rowHeight=60;
guide.getRange('B12:B25').format.horizontalAlignment='center';
input(guide,'G12:G25');
guide.getRange('G12:G25').dataValidation={rule:{type:'list',values:['Başlamadım','Üzerinde çalışıyorum','Tamamladım']}};
for(let i=0;i<14;i++)link(guide,`F${12+i}`,i+1);
guide.freezePanes.freezeRows(11);
prose(guide,28,'Kendi cümleniz için şablon: “Bu kaynak … gösteriyor. … sonucuna ulaşmak için ayrıca … gerekir.”');
prose(guide,30,'Örnek: “Afiş, mesajın üretildiğini gösteriyor. İkna sonucuna ulaşmak için kitlenin tepkisini de bilmem gerekir.”');
prose(guide,32,'Kaynak: Bu sitedeki 14 haftalık Türkçe ders notu. Bağlantılar yukarıdaki ilgili hafta satırındadır.');

// 2. Three explicitly illustrative, solved reasoning examples, then editable practice.
const evidence=sheets[1];
base(evidence,'I27',[180,205,210,215,210,200,130,24]);
title(evidence,'Bir iddiayı kanıtla nasıl sınarım?','H');
prose(evidence,4,'1. “Ne söylüyorum?” sorusuna tek cümle yazın. 2. Elinizdeki belgeyi belirtin. 3. Belgenin sınırını yazın.','H');
prose(evidence,5,'Kanıt = iddiayı destekleyen iz. “Kanıt matrisi”, bu izleri aynı sorularla karşılaştırdığınız aşağıdaki tablodur.','H');
prose(evidence,6,'Gündelik örnek: Kafenin ilanını görmek, oradan kahve satın aldığınızı kanıtlamaz. Aradaki adımı ayrı gösterin.','H');
prose(evidence,8,'Çözülmüş örnekler: Aşağıdaki belge türleri öğretim içindir. Bunlar bulunmuş gerçek arşiv belgeleri değildir.','H');
head(evidence,'B10:H10',['Örnek','Ne söylüyorum? (iddia)','Neye bakıyorum? (belge türü)','Belge neyi gösterebilir?','Tek başına neyi göstermez?','Başka ne açıklayabilir?','Ders bağlantısı']);
set(evidence,'B11:H13',[
 ['1. Üniversite değişimi','“Programa katılım oldu.”','Varsayılan katılım listesi.','Listelenen kişilerin programa katılımını.','Katılımcıların ülkeye güveninin arttığını.','Başvuranlar ülkeye zaten ilgi duyuyor olabilir.',null],
 ['2. CPI afişi','“Komite bu mesajı üretti.”','Varsayılan CPI afişi ve üretim kaydı.','Mesajın içeriğini ve üretimini.','Kaç kişinin gördüğünü veya ikna olduğunu.','Destek, mesajdan önce var olmuş olabilir.',null],
 ['3. Sinema gösterimi','“Film gösterime sunuldu.”','Varsayılan sinema programı.','Belirli yerde gösterim planlandığını.','Her izleyicinin aynı anlamı çıkardığını.','Yerel yorumlar ve mevcut görüşler farklı olabilir.',null],
]);
tableBody(evidence,'B11:H13'); evidence.getRange('B11:H13').format.rowHeight=65;
link(evidence,'H11',6);link(evidence,'H12',7);link(evidence,'H13',11);
prose(evidence,15,'Şimdi siz: Bir ders notundan olay seçin. Sarı satırı doldurun. Belgeyi görmediyseniz “aranacak belge” yazın.','H');
head(evidence,'B17:H17',['Vakam / haftam','Ne söylüyorum?','Belgem / arayacağım belge','Bundan ne öğrenirim?','Neyi hâlâ bilmiyorum?','Başka açıklama','Kaynak veya sayfa']);
set(evidence,'B18:H21',Array.from({length:4},(_,i)=>[`Uygulama ${i+1}`,null,null,null,null,null,null]));
tableBody(evidence,'B18:H21'); evidence.getRange('B18:H21').format.rowHeight=74;input(evidence,'B18:H21');
prose(evidence,23,'Kendinizi kontrol edin: “Belge var” mı dedim, “etki var” mı dedim? İkincisini yazdıysam aradaki yolu gösterebildim mi?','H');
prose(evidence,25,'Örneklere temel: 6. hafta eğitim değişimi, 7. hafta CPI, 11. hafta medya. İlgili ders notları örnek satırlarında bağlıdır.','H');
evidence.freezePanes.freezeRows(10);

// 3. A fully fictional, editable measurement exercise. No causal effect estimate.
const lab=sheets[2];
base(lab,'I52',[165,140,140,145,140,140,210,24]);
title(lab,'Erişim ile destek değişimini ayırın','H');
prose(lab,4,'Tamamen varsayımsal veri: A ve B hayalî kampanyalardır. Sayılar gerçek kişi, öğrenci veya tarihsel olay verisi değildir.','H');
prose(lab,5,'1. Sarı hücrelere bakın. 2. Önce aşağıdaki çözülmüş örneği okuyun. 3. D10’u 600 yapıp sonuçları izleyin.','H');
prose(lab,6,'Başlangıç örneğinde, her kampanyada ulaşılanlardan seçilmiş aynı 100 kişiye önce ve sonra aynı destek sorusu soruldu.','H');
prose(lab,7,'“Destek” = soruya olumlu yanıt. İkna için daha güçlü kanıt gerekir. Kontrol grubu olmayan bu gözlem neden-sonuç kanıtlamaz.','H');
prose(lab,8,'Kontrol grubu = kampanyayı almayan, karşılaştırma için izlenen benzer kişiler. Bu örnekte böyle bir grup yok.','H');
head(lab,'B9:H9',['Kampanya','Hedef kitle (kişi)','Ulaşılan (kişi)','İki ankette aynı grup (kişi)','Önce destekleyen (kişi)','Sonra destekleyen (kişi)','Girdi durumu']);
set(lab,'B10:G11',[['A kampanyası',1000,800,100,40,44],['B kampanyası',1000,400,100,40,55]]);
input(lab,'C10:G11');tableBody(lab,'B10:H11');lab.getRange('B10:H11').format.rowHeight=29;
lab.getRange('C10:G11').setNumberFormat('#,##0');
lab.getRange('C10:G11').dataValidation={rule:{type:'whole',operator:'between',formula1:0,formula2:1000000}};
lab.getRange('H10').formulas=[['=IF(COUNT(C10:G10)<5,"Sayı eksik",IF(OR(C10<=0,D10<0,D10>C10,E10<=0,E10>D10,F10<0,F10>E10,G10<0,G10>E10),"Sayıları kontrol et","Hazır"))']];
lab.getRange('H10:H11').fillDown();
lab.getRange('H10:H11').conditionalFormats.add('containsText',{text:'Sayı',format:{fill:'#fce1dd',font:{color:'#9c2635',bold:true}}});
prose(lab,13,'Sarı olmayan sonuç hücreleri otomatik hesaplanır. Hedef, anket grubu ve destek sayıları tutarlı olmalıdır.','H');
head(lab,'B15:H15',['Kampanya','Erişim oranı','Önce destek oranı','Sonra destek oranı','Değişim (yüzde puan)','Hesap nasıl yapılır?','Sonucu nasıl okurum?']);
for(let i=0;i<2;i++){
 const r=16+i, src=10+i;
 lab.getRange(`B${r}:F${r}`).formulas=[[`=B${src}`,`=IF(H${src}="Hazır",D${src}/C${src},"")`,`=IF(H${src}="Hazır",F${src}/E${src},"")`,`=IF(H${src}="Hazır",G${src}/E${src},"")`,`=IF(H${src}="Hazır",(E${r}-D${r})*100,"")`]];
 lab.getRange(`H${r}`).formulas=[[`=IF(H${src}<>"Hazır",H${src},"Destek değişimi: "&TEXT(F${r},"0.0")&" yüzde puan. Nedeni henüz bilinmiyor.")`]];
}
set(lab,'G16:G17',[['Erişim = ulaşan ÷ hedef.'],['Değişim = sonra % − önce %.']]);
tableBody(lab,'B16:H17');lab.getRange('B16:H17').format.rowHeight=52;
lab.getRange('C16:E17').setNumberFormat('0.0%');lab.getRange('F16:F17').setNumberFormat('0.0');
prose(lab,19,'Çözülmüş başlangıç örneği: A’da 800 ÷ 1.000 = %80 erişim. Destek %40’tan %44’e çıkar: 4 yüzde puan.','H');
prose(lab,20,'B’de başlangıç erişimi daha düşüktür (%40). Destek artışı daha büyüktür (15 yüzde puan). Görülmek ile ikna ayrı sorulardır.','H');
const chart=lab.charts.add('bar',lab.getRange('B15:E17'));
chart.title='Varsayımsal kampanyalarda erişim ve destek (%)';
chart.titleTextStyle.typeface=font;chart.titleTextStyle.fontSize=14;
chart.legend={position:'top',textStyle:{typeface:font,fontSize:12}};
chart.xAxis={axisType:'textAxis',textStyle:{typeface:font,fontSize:12}};
chart.yAxis={numberFormatCode:'0%',numberFormatSourceLinked:false,textStyle:{typeface:font,fontSize:12}};
chart.series.items.forEach((s,i)=>{s.fill=[P.burgundy,'#8296a4',P.gold][i];});
chart.setPosition('B22','H35');
prose(lab,36,'Alıştırma 1: D10’u 800’den 600’e değiştirin. Erişim %60 olur. Destek değişimi neden aynı kalır?','H');
prose(lab,37,'Alıştırma 2: G10’u 44’ten 60’a değiştirin. Destek %60 olur ve artış 20 yüzde puana çıkar. Hangi veri değişti?','H');
prose(lab,38,'Alıştırma 3: E10’u boş bırakın. Sonucun kaybolması neden %0 görünmesinden daha dürüsttür? Sonra 100 yazın.','H');
prose(lab,39,'Alıştırma 4: “B daha çok ikna etti” demeden önce ne öğrenmelisiniz? Başlangıç farkları ve başka olayları düşünün.','H');
head(lab,'B41:H41',['Cevabınız','Erişim neyi ölçer?','Destek neyi ölçer?','Başka olası neden','Hangi ek veri gerekir?','Kararımın sınırı','Bir cümlelik sonuç']);
set(lab,'B42:H42',[['Benim açıklamam',null,null,null,null,null,null]]);input(lab,'C42:H42');tableBody(lab,'B42:H42');lab.getRange('B42:H42').format.rowHeight=88;
prose(lab,45,'Formülü görmek için C16’ya tıklayın. Üstteki formül çubuğunda D10/C10, yani “ulaşan kişi / hedef kişi” görünür.','H');
prose(lab,46,'Yüzde puan: %40 ile %44 arasındaki fark 4 puandır. Göreli yüzde artışı ise %10’dur. Bunlar farklı ölçülerdir.','H');
prose(lab,48,'Kaynak: Bu sayfadaki sayılar öğretim amacıyla kuruldu. Kavramlar dersin 1. ve 14. hafta notlarına dayanır.','H');
link(lab,'B50',1,'1. hafta notu');link(lab,'D50',14,'14. hafta notu');

// 4. Short definitions with everyday analogies and practical distinctions.
const ref=sheets[3];
base(ref,'G31',[190,355,325,290,24]);
title(ref,'Kavramları günlük dille okuyun','E');
prose(ref,4,'1. Bilmediğiniz sözcüğü bulun. 2. Günlük örneği okuyun. 3. Son sütundaki soruyu seçtiğiniz ders vakasına uygulayın.','E');
head(ref,'B6:E6',['Kavram','Kısaca anlamı','Günlük benzetme','Kendinize sorun']);
const concepts=[
 ['Aktör','Bir şey yapmaya çalışan kişi veya kuruluş.','Kafe sahibi bir ilan hazırlatıyor.','Kim, neyi değiştirmeye çalışıyor?'],
 ['Hedef kamu','Mesajla veya programla ilişki kurulan insan topluluğu.','Kafenin çevresindeki öğrenciler.','Hangi insanlar? Hepsini aynı mı sayıyorum?'],
 ['Kaynak','Kullanılabilecek para, bilgi, ilişki veya itibar.','Kafenin bütçesi ve iyi adı.','Sahip olunan imkân mı, gözlenmiş sonuç mu?'],
 ['Araç','Kaynağın insanlarla temas etme biçimi.','İlan, tanıtım etkinliği veya davet.','Temas nasıl kuruluyor?'],
 ['Mekanizma','Bir şeyin başka bir şeyi nasıl değiştirebileceğini anlatan yol.','Güvenilir bir tavsiye, deneme isteği doğuruyor.','Aradaki adım ne? Bu adımı gözleyebilir miyim?'],
 ['Erişim','İnsanların içerikle karşılaşması. Tanımını ve sayım yöntemini belirtin.','Kaç kişi ilanı gerçekten gördü?','Görüntülenme mi, tekil kişi mi, olası erişim mi?'],
 ['Alımlama','İnsanların mesajı nasıl anladığı ve değerlendirdiği.','Aynı ilanı biri faydalı, biri itici bulur.','Kitle ne anlam çıkardı? Kendi sesini duyuyor muyum?'],
 ['Tutum ve davranış','Tutum düşünce/değerlendirme, davranış gözlenebilir eylemdir.','Kafeyi sevmek tutum, alışveriş yapmak davranıştır.','Düşünce mi, eylem mi ölçüyorum?'],
 ['Sert güç','Maliyet veya maddi kazancı değiştirerek davranışı etkileme.','Koşullu ödül veya yaptırım günlük benzetme olabilir.','Değişim maddi hesaptan mı kaynaklanıyor?'],
 ['Yumuşak güç','Çekicilik ve meşru bulma yoluyla tercihleri şekillendirme kapasitesi.','Birini, iyi örnek olduğu için izlemek.','Hayranlığı politika desteğiyle karıştırıyor muyum?'],
 ['Kamu diplomasisi','Dış amaçlarla bağlantılı olarak yabancı kamularla örgütlü etkileşim.','Dinleme ve ortak çalışma, tek yönlü duyurudan farklı işler.','Hangi dış amaç, hangi kamu, hangi geri bildirim?'],
 ['Propaganda','Siyasal amaçla algı ve davranışı sistemli yönlendiren iletişim.','Doğru bir parçayı seçip geri kalanını saklamak mümkün.','Kaynak, eksik bağlam ve seçme özgürlüğü açık mı?'],
 ['Güvenilirlik','Bir kaynağın inanılır ve güvenilmeye değer bulunması.','Yanlışını açıkça düzelten bir konuşmacı.','İnanma nedenini nasıl biliyorum?'],
 ['Karşılıklılık','Tarafların birbirini dinleyip sürece katkı sunabilmesi.','Birlikte karar vermek, yalnız emir almak değildir.','Diğer taraf programı değiştirebiliyor mu?'],
 ['Rakip açıklama','Gözlenen sonucu açıklayabilecek başka bir neden.','Yeni müşteri ilan yerine yakın arkadaşının önerisiyle gelmiş olabilir.','Sonuç zaten oluşacak mıydı? Başka ne değişti?'],
 ['Karşı olgu','Bu faaliyet yapılmasaydı ne olacağını soran karşılaştırma.','İlan verilmeseydi satışlar nasıl giderdi?','Uygun karşılaştırma veya önceki eğilim var mı?'],
 ['Pay ve payda','Oranda pay sayılan miktar, payda ilgili toplamdır.','800 ulaşan / 1.000 hedef = %80.','Aynı kitle ve dönemden sayıları mı bölüyorum?'],
 ['Yüzde puan','İki yüzde arasındaki aritmetik fark.','%40’tan %44’e geçiş 4 yüzde puandır.','Yüzde artışıyla karıştırıyor muyum?'],
];
set(ref,'B7:E24',concepts);tableBody(ref,'B7:E24');ref.getRange('B7:E24').format.rowHeight=48;
prose(ref,27,'Kaynak: Dersin Türkçe notlarındaki kavramsal açıklamalar. Günlük benzetmeler yalnızca öğrenmeyi kolaylaştıran örneklerdir.','E');
link(ref,'B29',1,'1. hafta: kavramlar');link(ref,'D29',14,'14. hafta: ölçüm');ref.freezePanes.freezeRows(6);

// Verification: input changes update the same formulas. Restore all teaching defaults.
wb.recalculate();
const value=(cell)=>lab.getRange(cell).values[0][0];
const near=(actual,expected)=>assert.ok(Math.abs(actual-expected)<1e-9,`${actual} != ${expected}`);
near(value('C16'),.8);near(value('C17'),.4);near(value('F16'),4);near(value('F17'),15);
set(lab,'D10',[[600]]);wb.recalculate();near(value('C16'),.6);near(value('F16'),4);
set(lab,'G10',[[60]]);wb.recalculate();near(value('E16'),.6);near(value('F16'),20);
set(lab,'E10',[[null]]);wb.recalculate();assert.equal(value('H10'),'Sayı eksik');assert.equal(value('C16'),'');
set(lab,'E10',[[0]]);wb.recalculate();assert.equal(value('H10'),'Sayıları kontrol et');assert.equal(value('F16'),'');
set(lab,'C10:G10',[[1000,800,100,40,44]]);set(lab,'D10',[[1001]]);wb.recalculate();assert.equal(value('H10'),'Sayıları kontrol et');
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
