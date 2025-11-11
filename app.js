// --- LocalStorage data ---
let klientData = JSON.parse(localStorage.getItem("klientData") || "[]");
let modelData = JSON.parse(localStorage.getItem("modelData") || "[]");
let matoData = JSON.parse(localStorage.getItem("matoData") || "[]");
let narxData = JSON.parse(localStorage.getItem("narxData") || "[]");
let omborData = JSON.parse(localStorage.getItem("omborData") || "[]");
let buyurtmaData = JSON.parse(localStorage.getItem("buyurtmaData") || "[]");
let bichuvData = JSON.parse(localStorage.getItem("bichuvData") || "[]");
let kirimData = JSON.parse(localStorage.getItem("kirimData") || "[]");

// --- Sahifa almashish ---
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  renderAllTables();
}

// --- Barcha sahifalarni yangilash ---
function renderAllTables() {
  renderOmbor();
  renderBuyurtma();
  renderBichuv();
  renderKirim();
  renderHisobot();
  renderKlient();
  renderModel();
  renderMato();
  renderNarx();
}

// --- Modal oynalar ---
function openModal(html) {
  document.getElementById("modal-body").innerHTML = html;
  document.getElementById("modal").classList.remove("hidden");
}
function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

// --- Yordamchi select yaratish ---
function createSelect(options, id, placeholder) {
  let html = `<select id="${id}"><option value="">${placeholder}</option>`;
  options.forEach(o => html += `<option value="${o}">${o}</option>`);
  html += `</select>`;
  return html;
}

/* ==============================
   1️⃣ KLIENT BO‘LIMI
============================== */
function renderKlient() {
  let html = `<h2>Klientlar</h2>
    <button onclick="modalAddKlient()">+ Qo‘shish</button>
    <table><thead><tr><th>Klient</th><th>Manzil</th><th>Tel</th></tr></thead><tbody>`;
  klientData.forEach(c => html += `<tr><td>${c.name}</td><td>${c.address}</td><td>${c.tel}</td></tr>`);
  html += `</tbody></table>`;
  document.getElementById("klient").innerHTML = html;
}

function modalAddKlient() {
  let html = `<h3>Klient qo‘shish</h3>
  <input id="klientName" placeholder="Klient nomi">
  <input id="klientAddress" placeholder="Manzil">
  <input id="klientTel" placeholder="Tel">
  <button onclick="addKlient()">Saqlash</button>`;
  openModal(html);
}

function addKlient() {
  let name = klientName.value, address = klientAddress.value, tel = klientTel.value;
  if (!name) return alert("Klient nomi kerak!");
  klientData.push({ name, address, tel });
  localStorage.setItem("klientData", JSON.stringify(klientData));
  closeModal();
  renderKlient();
}

/* ==============================
   2️⃣ MODEL BO‘LIMI
============================== */
function renderModel() {
  let html = `<h2>Model</h2>
  <button onclick="modalAddModel()">+ Qo‘shish</button>
  <table><thead><tr><th>Model nomi</th><th>Kod</th></tr></thead><tbody>`;
  modelData.forEach(m => html += `<tr><td>${m.name}</td><td>${m.code}</td></tr>`);
  html += `</tbody></table>`;
  document.getElementById("model").innerHTML = html;
}

function modalAddModel() {
  openModal(`<h3>Model qo‘shish</h3>
  <input id="modelName" placeholder="Model nomi">
  <input id="modelCode" placeholder="Model kodi">
  <button onclick="addModel()">Saqlash</button>`);
}
function addModel() {
  let name = modelName.value, code = modelCode.value;
  if (!name) return alert("Model nomi kerak");
  modelData.push({ name, code });
  localStorage.setItem("modelData", JSON.stringify(modelData));
  closeModal(); renderModel();
}

/* ==============================
   3️⃣ MATO BO‘LIMI
============================== */
function renderMato() {
  let html = `<h2>Mato turlari</h2>
  <button onclick="modalAddMato()">+ Qo‘shish</button>
  <table><thead><tr><th>Mato turi</th><th>Izoh</th></tr></thead><tbody>`;
  matoData.forEach(m => html += `<tr><td>${m.name}</td><td>${m.note}</td></tr>`);
  html += `</tbody></table>`;
  document.getElementById("mato").innerHTML = html;
}

function modalAddMato() {
  openModal(`<h3>Mato qo‘shish</h3>
  <input id="matoName" placeholder="Mato nomi">
  <input id="matoNote" placeholder="Izoh">
  <button onclick="addMato()">Saqlash</button>`);
}
function addMato() {
  let name = matoName.value, note = matoNote.value;
  if (!name) return alert("Mato nomi kerak!");
  matoData.push({ name, note });
  localStorage.setItem("matoData", JSON.stringify(matoData));
  closeModal(); renderMato();
}

/* ==============================
   4️⃣ NARX BO‘LIMI
============================== */
function renderNarx() {
  let html = `<h2>Narxlar</h2>
  <button onclick="modalAddNarx()">+ Qo‘shish</button>
  <table><thead><tr><th>Klient</th><th>Mato</th><th>Narx</th></tr></thead><tbody>`;
  narxData.forEach(n => html += `<tr><td>${n.klient}</td><td>${n.mato}</td><td>${n.price}</td></tr>`);
  html += `</tbody></table>`;
  document.getElementById("narx").innerHTML = html;
}

function modalAddNarx() {
  let html = `<h3>Narx qo‘shish</h3>
    ${createSelect(klientData.map(k=>k.name), "narxKlient", "Klient tanlang")}
    ${createSelect(matoData.map(m=>m.name), "narxMato", "Mato tanlang")}
    <input id="narxPrice" type="number" placeholder="Narx (so‘m)">
    <button onclick="addNarx()">Saqlash</button>`;
  openModal(html);
}
function addNarx() {
  let klient = narxKlient.value, mato = narxMato.value, price = narxPrice.value;
  if (!klient || !mato || !price) return alert("To‘liq kiriting!");
  narxData.push({ klient, mato, price });
  localStorage.setItem("narxData", JSON.stringify(narxData));
  closeModal(); renderNarx();
}

/* ==============================
   5️⃣ OMBOR BO‘LIMI (sizning tartib bilan)
============================== */
/* ==============================
   5️⃣ OMBOR BO‘LIMI (sizning tartib bilan, total qo‘shildi)
============================== */
function renderOmbor() {
  let html = `<h2>Ombor</h2>
  <button onclick="modalAddOmbor()">+ Qo‘shish</button>
  <table>
    <thead>
      <tr>
        <th>Sana</th>
        <th>Klient</th>
        <th>Partiya</th>
        <th>Mato turi</th>
        <th>Rangi</th>
        <th>Grammaj</th>
        <th>Eni</th>
        <th>Rulon soni</th>
        <th>Brutto</th>
        <th>Netto</th>
        <th>Rib/Kash</th>
        <th>Qoldiq</th>
        <th>Bichuv narxi</th>
        <th>Summasi</th>
        <th>Holat</th>
        <th>O‘zgartirish</th>
      </tr>
    </thead>
    <tbody>`;

  omborData.forEach((o, index) => {
    let narx = narxData.find(n => n.klient === o.klient && n.mato === o.mato) || {price: 0};
    let sum = o.netto * narx.price;
    
    // Qoldiq: bichuvData dan topilgan kg
    let usedKg = bichuvData.filter(b => b.partiya === o.partiya).reduce((acc,b)=>acc+b.netto,0);
    let qoldiq = o.netto - usedKg;
    
    // Holat
    let holat = usedKg >= o.netto ? "Topshirildi" : "Tayyorlanmoqda";
    
    html += `<tr>
      <td>${o.sana}</td>
      <td>${o.klient}</td>
      <td>${o.partiya}</td>
      <td>${o.mato}</td>
      <td>${o.rangi}</td>
      <td>${o.grammaj}</td>
      <td>${o.eni}</td>
      <td>${o.rulon}</td>
      <td>${o.brutto}</td>
      <td>${o.netto}</td>
      <td>${o.ribKash || 0}</td>
      <td>${qoldiq}</td>
      <td>${narx.price}</td>
      <td>${sum}</td>
      <td>${holat}</td>
      <td><button onclick="modalEditOmbor(${index})">O‘zgartirish</button></td>
    </tr>`;
  });

  // Total qatori
  let totalBrutto = omborData.reduce((acc, o) => acc + Number(o.brutto || 0), 0);
  let totalRulon = omborData.reduce((acc, o) => acc + Number(o.rulon || 0), 0);
  let totalNetto = omborData.reduce((acc, o) => acc + Number(o.netto || 0), 0);
  let totalRibKash = omborData.reduce((acc, o) => acc + Number(o.ribKash || 0), 0);
  let totalSum = omborData.reduce((acc, o) => {
    let narx = narxData.find(n => n.klient === o.klient && n.mato === o.mato) || {price: 0};
    return acc + (o.netto * narx.price);
  }, 0);

  html += `<tr style="font-weight:bold; background:#f0f0f0;">
    <td colspan="8" style="text-align:right">Jami:</td>
    <td>${totalBrutto}</td>
    <td>${totalNetto}</td>
    <td>${totalRibKash}</td>
    <td></td>
    <td></td>
    <td>${totalSum}</td>
    <td colspan="2"></td>
  </tr>`;

  html += `</tbody></table>`;
  document.getElementById("ombor").innerHTML = html;
}

function modalAddOmbor() {
  let html = `<h3>Omborga mahsulot qo‘shish</h3>
    <input type="date" id="omborSana" placeholder="Sana">
    ${createSelect(klientData.map(k=>k.name),"omborKlient","Klient tanlang")}
    <input id="omborPartiya" placeholder="Partiya">
    ${createSelect(matoData.map(m=>m.name),"omborMato","Mato tanlang")}
    <input id="omborRangi" placeholder="Rangi">
    <input id="omborGrammaj" placeholder="Grammaj">
    <input id="omborEni" placeholder="Eni">
    <input id="omborRulon" type="number" placeholder="Rulon soni">
    <input id="omborBrutto" type="number" placeholder="Brutto">
    <input id="omborNetto" type="number" placeholder="Netto">
    <input id="omborRibKash" type="number" placeholder="Rib/Kash">
    <button onclick="addOmbor()">Saqlash</button>`;
  openModal(html);
}

function addOmbor() {
  let sana = omborSana.value;
  let klient = omborKlient.value;
  let partiya = omborPartiya.value;
  let mato = omborMato.value;
  let rangi = omborRangi.value;
  let gramm = omborGrammaj.value;
  let eni = omborEni.value;
  let rulon = omborRulon.value;
  let brutto = omborBrutto.value;
  let netto = omborNetto.value;
  let ribKash = omborRibKash.value;
  
  if(!sana || !klient || !partiya || !mato || !netto) return alert("Sana, klient, partiya, mato va netto majburiy!");
  
  omborData.push({sana, klient, partiya, mato, rangi, gramm, eni, rulon, brutto, netto, ribKash});
  localStorage.setItem("omborData", JSON.stringify(omborData));
  closeModal();
  renderOmbor();
}

function modalEditOmbor(index) {
  let o = omborData[index];
  let html = `<h3>Ombor ma'lumotlarini o'zgartirish</h3>
    <input type="date" id="editSana" value="${o.sana}">
    ${createSelect(klientData.map(k=>k.name),"editKlient","Klient tanlang")}
    <input id="editPartiya" value="${o.partiya}">
    ${createSelect(matoData.map(m=>m.name),"editMato","Mato tanlang")}
    <input id="editRangi" value="${o.rangi}">
    <input id="editGrammaj" value="${o.grammaj}">
    <input id="editEni" value="${o.eni}">
    <input id="editRulon" type="number" value="${o.rulon}">
    <input id="editBrutto" type="number" value="${o.brutto}">
    <input id="editNetto" type="number" value="${o.netto}">
    <input id="editRibKash" type="number" value="${o.ribKash || ''}">
    <button onclick="saveEditOmbor(${index})">Saqlash</button>`;
  openModal(html);
}

function saveEditOmbor(index) {
  let o = omborData[index];
  o.sana = editSana.value;
  o.klient = editKlient.value;
  o.partiya = editPartiya.value;
  o.mato = editMato.value;
  o.rangi = editRangi.value;
  o.grammaj = editGrammaj.value;
  o.eni = editEni.value;
  o.rulon = editRulon.value;
  o.brutto = editBrutto.value;
  o.netto = editNetto.value;
  o.ribKash = editRibKash.value;
  localStorage.setItem("omborData", JSON.stringify(omborData));
  closeModal();
  renderOmbor();
}

/* ==============================
   6️⃣ BUYURTMA, BICHUV, KIRIM, HISOBOT (oddiy ko‘rinishda)
============================== */
function renderBuyurtma() {
  let html = `<h2>Buyurtmalar</h2>
    <button onclick="modalAddBuyurtma()">+ Buyurtma qo‘shish</button>
    <table><thead><tr>
      <th>Klient</th><th>Model</th><th>Mato</th><th>Miqdor</th><th>Narx</th>
    </tr></thead><tbody>`;
  buyurtmaData.forEach(b => html += `<tr>
    <td>${b.klient}</td><td>${b.model}</td><td>${b.mato}</td><td>${b.miqdor}</td><td>${b.narx}</td>
  </tr>`);
  html += `</tbody></table>`;
  document.getElementById("buyurtma").innerHTML = html;
}
// --- Buyurtma qo'shish modal ---
function modalAddBuyurtma() {
  let html = `<h3>Buyurtma qo‘shish</h3>
    ${createSelect(klientData.map(k=>k.name), "buyurtmaKlient", "Klient tanlang")}
    ${createSelect(modelData.map(m=>m.name), "buyurtmaModel", "Model tanlang")}
    ${createSelect(matoData.map(m=>m.name), "buyurtmaMato", "Mato tanlang")}
    <input id="buyurtmaQty" type="number" placeholder="Miqdor">
    <input id="buyurtmaPrice" type="number" placeholder="Narx">
    <button onclick="addBuyurtma()">Saqlash</button>`;
  openModal(html);
}

// --- Buyurtma qo'shish funksiyasi ---
function addBuyurtma() {
  let klient = buyurtmaKlient.value;
  let model = buyurtmaModel.value;
  let mato = buyurtmaMato.value;
  let miqdor = buyurtmaQty.value;
  let narx = buyurtmaPrice.value;
  if (!klient || !model || !mato || !miqdor || !narx) return alert("To‘liq ma'lumot kiriting!");
  buyurtmaData.push({klient, model, mato, miqdor, narx});
  localStorage.setItem("buyurtmaData", JSON.stringify(buyurtmaData));
  closeModal();
  renderBuyurtma();
}

// --- Bichuv qo'shish modal ---
function modalAddBichuv() {
  let html = `<h3>Bichuv qo‘shish</h3>
    ${createSelect(buyurtmaData.map(b=>b.klient), "bichuvKlient", "Klient tanlang")}
    ${createSelect(modelData.map(m=>m.name), "bichuvModel", "Model tanlang")}
    ${createSelect(matoData.map(m=>m.name), "bichuvMato", "Mato tanlang")}
    <input id="bichuvQty" type="number" placeholder="Miqdor">
    <button onclick="addBichuv()">Saqlash</button>`;
  openModal(html);
}

// --- Bichuv qo'shish funksiyasi ---
function addBichuv() {
  let klient = bichuvKlient.value;
  let model = bichuvModel.value;
  let mato = bichuvMato.value;
  let miqdor = bichuvQty.value;
  if (!klient || !model || !mato || !miqdor) return alert("To‘liq ma'lumot kiriting!");
  bichuvData.push({klient, model, mato, miqdor});
  localStorage.setItem("bichuvData", JSON.stringify(bichuvData));
  closeModal();
  renderBichuv();
}

// --- Bichuv jadvalini yangilash ---
function renderBichuv() {
  let html = `<h2>Bichuv jarayoni</h2>
  <button onclick="modalAddBichuv()">+ Qo‘shish</button>
  <table><thead><tr><th>Klient</th><th>Model</th><th>Mato</th><th>Miqdor</th></tr></thead><tbody>`;
  bichuvData.forEach(b => html += `<tr><td>${b.klient}</td><td>${b.model}</td><td>${b.mato}</td><td>${b.miqdor}</td></tr>`);
  html += `</tbody></table>`;
  document.getElementById("bichuv").innerHTML = html;
}

// --- Kirim qo‘shish modal ---
function modalAddKirim() {
  let html = `<h3>Kirim qo‘shish</h3>
    ${createSelect(omborData.map(o=>o.nomi), "kirimOmbor", "Ombordagi mahsulotni tanlang")}
    <input id="kirimQty" type="number" placeholder="Miqdor">
    <button onclick="addKirim()">Saqlash</button>`;
  openModal(html);
}

// --- Kirim qo‘shish funksiyasi ---
function addKirim() {
  let nomi = kirimOmbor.value;
  let miqdor = kirimQty.value;
  if (!nomi || !miqdor) return alert("To‘liq ma'lumot kiriting!");
  kirimData.push({ nomi, miqdor });
  localStorage.setItem("kirimData", JSON.stringify(kirimData));
  closeModal();
  renderKirim();
}

// --- Kirim jadvalini yangilash ---
function renderKirim() {
  let html = `<h2>Kirim</h2>
  <button onclick="modalAddKirim()">+ Qo‘shish</button>
  <table><thead><tr><th>Mahsulot</th><th>Miqdor</th></tr></thead><tbody>`;
  kirimData.forEach(k => html += `<tr><td>${k.nomi}</td><td>${k.miqdor}</td></tr>`);
  html += `</tbody></table>`;
  document.getElementById("kirim").innerHTML = html;
}

// --- Hisobot bo‘limi ---
function renderHisobot() {
  // Umumiy hisoblar
  let jamiOmbor = omborData.reduce((sum,o) => sum + (+o.miqdor || 0), 0);
  let jamiKirim = kirimData.reduce((sum,k) => sum + (+k.miqdor || 0), 0);
  let jamiBuyurtma = buyurtmaData.length;
  
  let html = `<h2>Hisobot</h2>
    <p>Ombordagi jami mahsulotlar: <b>${jamiOmbor}</b></p>
    <p>Kirim qilingan jami mahsulotlar: <b>${jamiKirim}</b></p>
    <p>Buyurtmalar soni: <b>${jamiBuyurtma}</b></p>
    <p>Hisobotlarni batafsil ko‘rish va chop etish funksiyalari keyinchalik qo‘shiladi.</p>`;
  
  document.getElementById("hisobot").innerHTML = html;
}


// --- Dastur ishga tushganda ---
renderAllTables();


