// --- Ma'lumotlar bazasi (localStorage orqali) ---
let klientData = JSON.parse(localStorage.getItem("klientData") || "[]");
let modelData = JSON.parse(localStorage.getItem("modelData") || "[]");
let matoData = JSON.parse(localStorage.getItem("matoData") || "[]");
let narxData = JSON.parse(localStorage.getItem("narxData") || "[]");
let omborData = JSON.parse(localStorage.getItem("omborData") || "[]");
let buyurtmaData = JSON.parse(localStorage.getItem("buyurtmaData") || "[]");
let bichuvData = JSON.parse(localStorage.getItem("bichuvData") || "[]");
let kirimData = JSON.parse(localStorage.getItem("kirimData") || "[]");

// --- Sahifalar o‘rtasida yurish ---
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  renderAllTables();
}

// --- Modal oynalar ---
function openModal(html) {
  document.getElementById("modal-body").innerHTML = html;
  document.getElementById("modal").classList.remove("hidden");
}
function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

// --- Select yaratish uchun yordamchi ---
function createSelect(options, id, placeholder) {
  let html = `<select id="${id}"><option value="">${placeholder}</option>`;
  options.forEach(o => html += `<option value="${o}">${o}</option>`);
  html += `</select>`;
  return html;
}

// --- KLIENT BO‘LIMI ---
function renderKlient() {
  let html = `<h2>👤 Klientlar</h2>
  <button onclick="modalAddKlient()">+ Klient qo‘shish</button>
  <table><thead><tr><th>Klient</th><th>Manzil</th><th>Tel</th></tr></thead><tbody>`;
  klientData.forEach(c => html += `<tr><td>${c.name}</td><td>${c.address}</td><td>${c.tel}</td></tr>`);
  html += `</tbody></table>`;
  document.getElementById("klient").innerHTML = html;
}

function modalAddKlient() {
  let html = `<h3>Klient qo‘shish</h3>
  <input id="klientName" placeholder="Klient nomi">
  <input id="klientAddress" placeholder="Manzil">
  <input id="klientTel" placeholder="Telefon raqami">
  <button onclick="addKlient()">Saqlash</button>`;
  openModal(html);
}

function addKlient() {
  let name = klientName.value.trim();
  if (!name) return alert("Klient nomi kiritilmagan");
  klientData.push({ name, address: klientAddress.value, tel: klientTel.value });
  localStorage.setItem("klientData", JSON.stringify(klientData));
  closeModal();
  renderKlient();
}

// --- MODEL BO‘LIMI ---
function renderModel() {
  let html = `<h2>🏷️ Modellar</h2>
  <button onclick="modalAddModel()">+ Model qo‘shish</button>
  <table><thead><tr><th>Model nomi</th><th>Model nomeri</th></tr></thead><tbody>`;
  modelData.forEach(m => html += `<tr><td>${m.name}</td><td>${m.code}</td></tr>`);
  html += `</tbody></table>`;
  document.getElementById("model").innerHTML = html;
}

function modalAddModel() {
  let html = `<h3>Model qo‘shish</h3>
  <input id="modelName" placeholder="Model nomi">
  <input id="modelCode" placeholder="Model nomeri">
  <button onclick="addModel()">Saqlash</button>`;
  openModal(html);
}

function addModel() {
  if (!modelName.value.trim()) return alert("Model nomi kerak");
  modelData.push({ name: modelName.value, code: modelCode.value });
  localStorage.setItem("modelData", JSON.stringify(modelData));
  closeModal();
  renderModel();
}

// --- MATO BO‘LIMI ---
function renderMato() {
  let html = `<h2>🧵 Mato turlari</h2>
  <button onclick="modalAddMato()">+ Mato qo‘shish</button>
  <table><thead><tr><th>Mato turi</th><th>Izoh</th></tr></thead><tbody>`;
  matoData.forEach(m => html += `<tr><td>${m.name}</td><td>${m.note}</td></tr>`);
  html += `</tbody></table>`;
  document.getElementById("mato").innerHTML = html;
}

function modalAddMato() {
  let html = `<h3>Mato turi qo‘shish</h3>
  <input id="matoName" placeholder="Mato nomi">
  <input id="matoNote" placeholder="Izoh (ixtiyoriy)">
  <button onclick="addMato()">Saqlash</button>`;
  openModal(html);
}

function addMato() {
  if (!matoName.value.trim()) return alert("Mato nomi kerak");
  matoData.push({ name: matoName.value, note: matoNote.value });
  localStorage.setItem("matoData", JSON.stringify(matoData));
  closeModal();
  renderMato();
}

// --- NARX BO‘LIMI ---
function renderNarx() {
  let html = `<h2>💵 Narxlar</h2>
  <button onclick="modalAddNarx()">+ Narx qo‘shish</button>
  <table><thead><tr><th>Klient</th><th>Mato turi</th><th>Narx</th></tr></thead><tbody>`;
  narxData.forEach(n => html += `<tr><td>${n.klient}</td><td>${n.mato}</td><td>${n.price}</td></tr>`);
  html += `</tbody></table>`;
  document.getElementById("narx").innerHTML = html;
}

function modalAddNarx() {
  let html = `<h3>Narx qo‘shish</h3>
  ${createSelect(klientData.map(k => k.name), 'narxKlient', 'Klient tanlang')}
  ${createSelect(matoData.map(m => m.name), 'narxMato', 'Mato turi tanlang')}
  <input id="narxPrice" type="number" placeholder="Narx (so‘m)">
  <button onclick="addNarx()">Saqlash</button>`;
  openModal(html);
}

function addNarx() {
  let klient = narxKlient.value, mato = narxMato.value, price = +narxPrice.value;
  if (!klient || !mato || !price) return alert("To‘liq kiriting");
  narxData.push({ klient, mato, price });
  localStorage.setItem("narxData", JSON.stringify(narxData));
  closeModal();
  renderNarx();
}

// --- OMBOR ---
function renderOmbor() {
  let html = `<h2>🧵 Ombor</h2>
  <button onclick="modalAddOmbor()">+ Qo‘shish</button>
  <table><thead><tr>
  <th>Sana</th><th>Klient</th><th>Partiya</th><th>Mato</th><th>Rang</th><th>Grammaj</th><th>Eni</th>
  <th>Rulon</th><th>Brutto</th><th>Netto</th><th>Qoldiq</th><th>Narx</th><th>Summa</th><th>Holat</th>
  </tr></thead><tbody>`;
  omborData.forEach(o => html += `<tr>
  <td>${o.sana}</td><td>${o.klient}</td><td>${o.partiya}</td><td>${o.mato}</td>
  <td>${o.rang}</td><td>${o.grammaj}</td><td>${o.eni}</td><td>${o.rulon}</td>
  <td>${o.brutto}</td><td>${o.netto}</td><td>${o.qoldiq}</td><td>${o.narx}</td><td>${o.summa}</td><td>${o.holat}</td></tr>`);
  html += `</tbody></table>`;
  document.getElementById("ombor").innerHTML = html;
}

function modalAddOmbor() {
  let html = `<h3>Omborga qo‘shish</h3>
  <input id="omborSana" type="date">
  ${createSelect(klientData.map(k=>k.name),'omborKlient','Klient tanlang')}
  <input id="omborPartiya" placeholder="Partiya nomi">
  ${createSelect(matoData.map(m=>m.name),'omborMato','Mato tanlang')}
  <input id="omborRang" placeholder="Rangi">
  <input id="omborGrammaj" placeholder="Grammaj">
  <input id="omborEni" placeholder="Eni">
  <input id="omborRulon" type="number" placeholder="Rulon soni">
  <input id="omborBrutto" type="number" placeholder="Brutto">
  <input id="omborNetto" type="number" placeholder="Netto">
  <button onclick="addOmbor()">Saqlash</button>`;
  openModal(html);
}

function addOmbor() {
  let o = {
    sana: omborSana.value,
    klient: omborKlient.value,
    partiya: omborPartiya.value,
    mato: omborMato.value,
    rang: omborRang.value,
    grammaj: omborGrammaj.value,
    eni: omborEni.value,
    rulon: +omborRulon.value,
    brutto: +omborBrutto.value,
    netto: +omborNetto.value,
    qoldiq: +omborNetto.value,
    narx: (narxData.find(n => n.klient === omborKlient.value && n.mato === omborMato.value)?.price) || 0,
    summa: 0,
    holat: "Omborda"
  };
  o.summa = o.narx * o.netto;
  omborData.push(o);
  localStorage.setItem("omborData", JSON.stringify(omborData));
  closeModal();
  renderOmbor();
}

// --- Boshqa bo‘limlar (Buyurtma, Bichuv, Kirim, Hisobot) ---
function renderBuyurtma() {
  document.getElementById("buyurtma").innerHTML = "<h2>📋 Buyurtma</h2><p>Bu bo‘lim keyingi versiyada to‘liq qo‘shiladi.</p>";
}
function renderBichuv() {
  document.getElementById("bichuv").innerHTML = "<h2>✂️ Bichuv</h2><p>Bichuv jarayoni avtomatik bog‘lanadi.</p>";
}
function renderKirim() {
  document.getElementById("kirim").innerHTML = "<h2>💰 Kirim</h2><p>Klient to‘lovlari uchun.</p>";
}
function renderHisobot() {
  document.getElementById("hisobot").innerHTML = "<h2>📊 Hisobot</h2><p>Klient bo‘yicha tahlil bu yerda ko‘rsatiladi.</p>";
}

// --- Hammasini chizish ---
function renderAllTables() {
  renderKlient(); renderModel(); renderMato(); renderNarx();
  renderOmbor(); renderBuyurtma(); renderBichuv(); renderKirim(); renderHisobot();
}

// --- Menyu tugmasi ---
document.querySelector(".menu-toggle").addEventListener("click", () => {
  document.querySelector(".menu").classList.toggle("show");
});

// --- Dastur ishga tushishi ---
renderAllTables();

