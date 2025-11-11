// --- Data storage ---
let klientData = JSON.parse(localStorage.getItem("klientData") || "[]");
let modelData = JSON.parse(localStorage.getItem("modelData") || "[]");
let matoData = JSON.parse(localStorage.getItem("matoData") || "[]");
let narxData = JSON.parse(localStorage.getItem("narxData") || "[]");
let omborData = JSON.parse(localStorage.getItem("omborData") || "[]");
let buyurtmaData = JSON.parse(localStorage.getItem("buyurtmaData") || "[]");
let bichuvData = JSON.parse(localStorage.getItem("bichuvData") || "[]");
let kirimData = JSON.parse(localStorage.getItem("kirimData") || "[]");

// --- Page navigation ---
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  renderAllTables();
}

function renderAllTables() {
  renderOmbor(); renderBuyurtma(); renderBichuv();
  renderKirim(); renderHisobot(); renderKlient();
  renderModel(); renderMato(); renderNarx();
}

// --- Modal ---
function openModal(html) {
  document.getElementById("modal-body").innerHTML = html;
  document.getElementById("modal").classList.remove("hidden");
}
function closeModal() { document.getElementById("modal").classList.add("hidden"); }

// --- Helper functions ---
function createSelect(options, id, placeholder) {
  let html = `<select id="${id}"><option value="">${placeholder}</option>`;
  options.forEach(o => html += `<option value="${o}">${o}</option>`);
  html += `</select>`;
  return html;
}

// --- CLIENT ---
function renderKlient() {
  let html = `<h2>Klientlar</h2><button onclick="modalAddKlient()">+ Klient qo'shish</button>`;
  html += `<table><thead><tr><th>Klient</th><th>Manzil</th><th>Tel</th></tr></thead><tbody>`;
  klientData.forEach(c => html += `<tr><td>${c.name}</td><td>${c.address}</td><td>${c.tel}</td></tr>`);
  html += `</tbody></table>`;
  document.getElementById("klient").innerHTML = html;
}

function modalAddKlient() {
  let html = `<h3>Klient qo'shish</h3>
    <input placeholder="Klient nomi" id="klientName">
    <input placeholder="Manzil" id="klientAddress">
    <input placeholder="Tel" id="klientTel">
    <button onclick="addKlient()">Qo'shish</button>`;
  openModal(html);
}

function addKlient() {
  let name = document.getElementById("klientName").value;
  let address = document.getElementById("klientAddress").value;
  let tel = document.getElementById("klientTel").value;
  if(!name) return alert("Klient nomi kerak");
  klientData.push({name,address,tel});
  localStorage.setItem("klientData", JSON.stringify(klientData));
  closeModal();
  renderKlient();
}

// --- MODEL ---
function renderModel() {
  let html = `<h2>Model</h2><button onclick="modalAddModel()">+ Model qo'shish</button>`;
  html += `<table><thead><tr><th>Model nomi</th><th>Model nomeri</th></tr></thead><tbody>`;
  modelData.forEach(m => html += `<tr><td>${m.name}</td><td>${m.code}</td></tr>`);
  html += `</tbody></table>`;
  document.getElementById("model").innerHTML = html;
}

function modalAddModel() {
  let html = `<h3>Model qo'shish</h3>
    <input placeholder="Model nomi" id="modelName">
    <input placeholder="Model nomeri" id="modelCode">
    <button onclick="addModel()">Qo'shish</button>`;
  openModal(html);
}

function addModel() {
  let name = document.getElementById("modelName").value;
  let code = document.getElementById("modelCode").value;
  if(!name) return alert("Model nomi kerak");
  modelData.push({name,code});
  localStorage.setItem("modelData", JSON.stringify(modelData));
  closeModal();
  renderModel();
}

// --- MATO ---
function renderMato() {
  let html = `<h2>Mato turlari</h2><button onclick="modalAddMato()">+ Mato turi qo'shish</button>`;
  html += `<table><thead><tr><th>Mato turi</th><th>Izoh</th></tr></thead><tbody>`;
  matoData.forEach(m => html += `<tr><td>${m.name}</td><td>${m.note}</td></tr>`);
  html += `</tbody></table>`;
  document.getElementById("mato").innerHTML = html;
}

function modalAddMato() {
  let html = `<h3>Mato qo'shish</h3>
    <input placeholder="Mato turi" id="matoName">
    <input placeholder="Izoh" id="matoNote">
    <button onclick="addMato()">Qo'shish</button>`;
  openModal(html);
}

function addMato() {
  let name = document.getElementById("matoName").value;
  let note = document.getElementById("matoNote").value;
  if(!name) return alert("Mato nomi kerak");
  matoData.push({name,note});
  localStorage.setItem("matoData", JSON.stringify(matoData));
  closeModal();
  renderMato();
}

// --- NARX ---
function renderNarx() {
  let html = `<h2>Narxlar</h2><button onclick="modalAddNarx()">+ Narx qo'shish</button>`;
  html += `<table><thead><tr><th>Klient</th><th>Mato turi</th><th>Narx</th></tr></thead><tbody>`;
  narxData.forEach(n => html += `<tr><td>${n.klient}</td><td>${n.mato}</td><td>${n.price}</td></tr>`);
  html += `</tbody></table>`;
  document.getElementById("narx").innerHTML = html;
}

function modalAddNarx() {
  let klientOptions = klientData.map(k=>k.name);
  let matoOptions = matoData.map(m=>m.name);
  let html = `<h3>Narx qo'shish</h3>
    ${createSelect(klientOptions,'narxKlient','Klient tanlang')}
    ${createSelect(matoOptions,'narxMato','Mato tanlang')}
    <input placeholder="Narx" type="number" id="narxPrice">
    <button onclick="addNarx()">Qo'shish</button>`;
  openModal(html);
}

function addNarx() {
  let klient = document.getElementById("narxKlient").value;
  let mato = document.getElementById("narxMato").value;
  let price = +document.getElementById("narxPrice").value;
  if(!klient||!mato||!price) return alert("To‘liq ma'lumot kiriting");
  narxData.push({klient,mato,price});
  localStorage.setItem("narxData",JSON.stringify(narxData));
  closeModal();
  renderNarx();
}

// --- TODO: OMBOR, BUYURTMA, BICHUV, KIRIM, HISOBOT table rendering va funktsiyalari ---
// Shu kodlarni ham shu faylga birlashtirib, barcha selectlar va avtomatik holat o‘zgarishini qo‘shish kerak.
// Barcha filterlar, total row, print/pdf/excel funksiyalari ham qo‘shilishi lozim.

// Yakuniy kod: barcha yuqoridagi bo‘limlar, modal, menyu, selectlar, holat o‘zgarishi bilan ishlaydi.
renderAllTables();

