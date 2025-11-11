// ==============================
// 🌟 LocalStorage data
// ==============================
let klientData = JSON.parse(localStorage.getItem("klientData") || "[]");
let modelData = JSON.parse(localStorage.getItem("modelData") || "[]");
let matoData = JSON.parse(localStorage.getItem("matoData") || "[]");
let narxData = JSON.parse(localStorage.getItem("narxData") || "[]");
let omborData = JSON.parse(localStorage.getItem("omborData") || "[]");
let buyurtmaData = JSON.parse(localStorage.getItem("buyurtmaData") || "[]");
let bichuvData = JSON.parse(localStorage.getItem("bichuvData") || "[]");
let kirimData = JSON.parse(localStorage.getItem("kirimData") || "[]");

// ==============================
// 🌟 Sahifa almashish
// ==============================
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  renderAllTables();
}

// ==============================
// 🌟 Barcha bo‘limlarni yangilash
// ==============================
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

// ==============================
// 🌟 Modal oynalar
// ==============================
function openModal(html) {
  document.getElementById("modal-body").innerHTML = html;
  document.getElementById("modal").classList.remove("hidden");
}
function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

// ==============================
// 🌟 Yordamchi select yaratish
// ==============================
function createSelect(options, id, placeholder) {
  let html = `<select id="${id}"><option value="">${placeholder}</option>`;
  options.forEach(o => html += `<option value="${o}">${o}</option>`);
  html += `</select>`;
  return html;
}

// ==============================
// 1️⃣ KLIENT BO‘LIMI
// ==============================
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

// ==============================
// 2️⃣ MODEL BO‘LIMI
// ==============================
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

// ==============================
// 3️⃣ MATO BO‘LIMI
// ==============================
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

// ==============================
// 4️⃣ NARX BO‘LIMI
// ==============================
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

// ==============================
// 5️⃣ OMBOR BO‘LIMI (filter bilan, total hisoblash)
// ==============================
function renderOmbor() {
  let fSana = document.getElementById("filterSana")?.value || "";
  let fKlient = document.getElementById("filterKlient")?.value || "";
  let fMato = document.getElementById("filterMato")?.value || "";

  let filtered = omborData.filter(o =>
    (!fSana || o.sana === fSana) &&
    (!fKlient || o.klient === fKlient) &&
    (!fMato || o.mato === fMato)
  );

  let html = `<h2>Ombor</h2>
    <button onclick="modalAddOmbor()">+ Qo‘shish</button>
    <table>
      <thead>
        <tr>
          <th>Sana</th><th>Klient</th><th>Partiya</th><th>Mato turi</th><th>Rangi</th>
          <th>Grammaj</th><th>Eni</th><th>Rulon soni</th><th>Brutto</th><th>Netto</th>
          <th>Rib/Kash</th><th>Qoldiq</th><th>Bichuv narxi</th><th>Summasi</th><th>Holat</th><th>O‘zgartirish</th>
        </tr>
      </thead>
      <tbody>`;

  filtered.forEach((o,index)=>{
    let bichuvKg = bichuvData.filter(b=>b.partiya===o.partiya).reduce((a,b)=>a+(Number(b.netto)||0),0);
    let qoldiq = Math.max(0, Number(o.netto||0) - bichuvKg);
    let narxObj = narxData.find(n=>n.klient===o.klient && n.mato===o.mato) || {price:0};
    let sum = (Number(o.netto)||0) * (narxObj.price||0);
    let holat = bichuvKg >= (Number(o.netto)||0) ? "Topshirildi" : "Tayyorlanmoqda";

    html += `<tr>
      <td>${o.sana}</td><td>${o.klient}</td><td>${o.partiya}</td><td>${o.mato}</td><td>${o.rangi}</td>
      <td>${o.grammaj}</td><td>${o.eni}</td><td>${o.rulon||0}</td><td>${o.brutto||0}</td><td>${o.netto||0}</td>
      <td>${o.rib||0}</td><td>${qoldiq}</td><td>${narxObj.price}</td><td>${sum}</td><td>${holat}</td>
      <td><button onclick="modalEditOmbor(${index})">O‘zgartirish</button></td>
    </tr>`;
  });

  // Total qatori
  let totalRulon = filtered.reduce((a,o)=>a+Number(o.rulon||0),0);
  let totalBrutto = filtered.reduce((a,o)=>a+Number(o.brutto||0),0);
  let totalNetto = filtered.reduce((a,o)=>a+Number(o.netto||0),0);
  let totalRib = filtered.reduce((a,o)=>a+Number(o.rib||0),0);
  let totalSum = filtered.reduce((a,o)=>a+(Number(o.netto||0)*(narxData.find(n=>n.klient===o.klient && n.mato===o.mato)?.price||0)),0);

  html += `<tr class="total-row" style="font-weight:bold;">
    <td colspan="7">Jami:</td><td>${totalRulon}</td><td>${totalBrutto}</td><td>${totalNetto}</td>
    <td>${totalRib}</td><td></td><td></td><td>${totalSum}</td><td></td><td></td>
  </tr>`;

  html += `</tbody></table>`;
  document.getElementById("ombor").innerHTML = html;

  // Select elementlarini yangilash va onchange
  updateFilterOptions();
}

// Filter select elementlarini yangilash
function updateFilterOptions() {
  let klientSelect = document.getElementById("filterKlient");
  let matoSelect = document.getElementById("filterMato");

  klientSelect.innerHTML = `<option value="">Barchasi</option>` + klientData.map(k=>`<option value="${k.name}">${k.name}</option>`).join("");
  matoSelect.innerHTML = `<option value="">Barchasi</option>` + matoData.map(m=>`<option value="${m.name}">${m.name}</option>`).join("");

  klientSelect.onchange = renderOmbor;
  matoSelect.onchange = renderOmbor;
  document.getElementById("filterSana").onchange = renderOmbor;
}
function applyOmborFilter(){ renderOmbor(); }
function clearOmborFilter() {
  document.getElementById("filterSana").value="";
  document.getElementById("filterKlient").value="";
  document.getElementById("filterMato").value="";
  renderOmbor();
}

// ==============================
// 🌟 Modal qo‘shish va o‘zgartirish
// ==============================
function modalAddOmbor() {
  let html = `<h3>Omborga mahsulot qo‘shish</h3>
    <input type="date" id="omborSana">
    <select id="omborKlient">${klientData.map(k=>`<option value="${k.name}">${k.name}</option>`).join("")}</select>
    <input id="omborPartiya" placeholder="Partiya">
    <select id="omborMato">${matoData.map(m=>`<option value="${m.name}">${m.name}</option>`).join("")}</select>
    <input id="omborRangi" placeholder="Rangi">
    <input id="omborGrammaj" placeholder="Grammaj">
    <input id="omborEni" placeholder="Eni">
    <input id="omborRulon" type="number" placeholder="Rulon soni">
    <input id="omborBrutto" type="number" placeholder="Brutto">
    <input id="omborNetto" type="number" placeholder="Netto">
    <input id="omborRib" type="number" placeholder="Rib/Kash">
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
  let rulon = Number(omborRulon.value);
  let brutto = Number(omborBrutto.value);
  let netto = Number(omborNetto.value);
  let rib = Number(omborRib.value);

  if(!sana || !klient || !partiya || !mato || !netto) return alert("Sana, klient, partiya, mato va netto majburiy!");
  omborData.push({sana, klient, partiya, mato, rangi, gramm, eni, rulon, brutto, netto, rib});
  localStorage.setItem("omborData", JSON.stringify(omborData));
  closeModal(); renderOmbor();
}
function modalEditOmbor(index) {
  let o = omborData[index];
  let html = `<h3>Ombor ma'lumotlarini o'zgartirish</h3>
    <input type="date" id="editSana" value="${o.sana}">
    <select id="editKlient">${klientData.map(k=>`<option value="${k.name}" ${k.name===o.klient?"selected":""}>${k.name}</option>`).join("")}</select>
    <input id="editPartiya" value="${o.partiya}">
    <select id="editMato">${matoData.map(m=>`<option value="${m.name}" ${m.name===o.mato?"selected":""}>${m.name}</option>`).join("")}</select>
    <input id="editRangi" value="${o.rangi}">
    <input id="editGrammaj" value="${o.grammaj}">
    <input id="editEni" value="${o.eni}">
    <input id="editRulon" type="number" value="${o.rulon}">
    <input id="editBrutto" type="number" value="${o.brutto}">
    <input id="editNetto" type="number" value="${o.netto}">
    <input id="editRib" type="number" value="${o.rib}">
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
  o.rulon = Number(editRulon.value);
  o.brutto = Number(editBrutto.value);
  o.netto = Number(editNetto.value);
  o.rib = Number(editRib.value);
  localStorage.setItem("omborData", JSON.stringify(omborData));
  closeModal(); renderOmbor();
}

// ==============================
// 6️⃣ BUYURTMA BO‘LIMI
// ==============================
function renderBuyurtma() {
  let html = `<h2>Buyurtmalar</h2>
    <button onclick="modalAddBuyurtma()">+ Qo‘shish</button>
    <table>
      <thead>
        <tr>
          <th>Sana</th><th>Klient</th><th>Model</th><th>Mato turi</th><th>Rulon soni</th><th>Netto</th><th>O‘zgartirish</th>
        </tr>
      </thead>
      <tbody>`;
  buyurtmaData.forEach((b,index)=>{
    html += `<tr>
      <td>${b.sana}</td><td>${b.klient}</td><td>${b.model}</td><td>${b.mato}</td><td>${b.rulon}</td><td>${b.netto}</td>
      <td><button onclick="modalEditBuyurtma(${index})">O‘zgartirish</button></td>
    </tr>`;
  });
  html += `</tbody></table>`;
  document.getElementById("buyurtma").innerHTML = html;
}

function modalAddBuyurtma() {
  let html = `<h3>Buyurtma qo‘shish</h3>
    <input type="date" id="buyurtmaSana">
    <select id="buyurtmaKlient">${klientData.map(k=>`<option value="${k.name}">${k.name}</option>`).join("")}</select>
    <select id="buyurtmaModel">${modelData.map(m=>`<option value="${m.name}">${m.name}</option>`).join("")}</select>
    <select id="buyurtmaMato">${matoData.map(m=>`<option value="${m.name}">${m.name}</option>`).join("")}</select>
    <input type="number" id="buyurtmaRulon" placeholder="Rulon soni">
    <input type="number" id="buyurtmaNetto" placeholder="Netto">
    <button onclick="addBuyurtma()">Saqlash</button>`;
  openModal(html);
}
function addBuyurtma() {
  let sana = buyurtmaSana.value;
  let klient = buyurtmaKlient.value;
  let model = buyurtmaModel.value;
  let mato = buyurtmaMato.value;
  let rulon = Number(buyurtmaRulon.value);
  let netto = Number(buyurtmaNetto.value);
  if(!sana || !klient || !model || !mato || !netto) return alert("To‘liq kiriting!");
  buyurtmaData.push({sana, klient, model, mato, rulon, netto});
  localStorage.setItem("buyurtmaData", JSON.stringify(buyurtmaData));
  closeModal(); renderBuyurtma();
}
function modalEditBuyurtma(index) {
  let b = buyurtmaData[index];
  let html = `<h3>Buyurtma o‘zgartirish</h3>
    <input type="date" id="editBuyurtmaSana" value="${b.sana}">
    <select id="editBuyurtmaKlient">${klientData.map(k=>`<option value="${k.name}" ${k.name===b.klient?"selected":""}>${k.name}</option>`).join("")}</select>
    <select id="editBuyurtmaModel">${modelData.map(m=>`<option value="${m.name}" ${m.name===b.model?"selected":""}>${m.name}</option>`).join("")}</select>
    <select id="editBuyurtmaMato">${matoData.map(m=>`<option value="${m.name}" ${m.name===b.mato?"selected":""}>${m.name}</option>`).join("")}</select>
    <input type="number" id="editBuyurtmaRulon" value="${b.rulon}">
    <input type="number" id="editBuyurtmaNetto" value="${b.netto}">
    <button onclick="saveEditBuyurtma(${index})">Saqlash</button>`;
  openModal(html);
}
function saveEditBuyurtma(index) {
  let b = buyurtmaData[index];
  b.sana = editBuyurtmaSana.value;
  b.klient = editBuyurtmaKlient.value;
  b.model = editBuyurtmaModel.value;
  b.mato = editBuyurtmaMato.value;
  b.rulon = Number(editBuyurtmaRulon.value);
  b.netto = Number(editBuyurtmaNetto.value);
  localStorage.setItem("buyurtmaData", JSON.stringify(buyurtmaData));
  closeModal(); renderBuyurtma();
}

// ==============================
// 7️⃣ BICHUV BO‘LIMI
// ==============================
function renderBichuv() {
  let html = `<h2>Bichuv</h2>
    <button onclick="modalAddBichuv()">+ Qo‘shish</button>
    <table>
      <thead><tr>
        <th>Sana</th><th>Partiya</th><th>Netto</th><th>Izoh</th><th>O‘zgartirish</th>
      </tr></thead><tbody>`;
  bichuvData.forEach((b,index)=>{
    html += `<tr>
      <td>${b.sana}</td><td>${b.partiya}</td><td>${b.netto}</td><td>${b.note||""}</td>
      <td><button onclick="modalEditBichuv(${index})">O‘zgartirish</button></td>
    </tr>`;
  });
  html += `</tbody></table>`;
  document.getElementById("bichuv").innerHTML = html;
}
function modalAddBichuv() {
  openModal(`<h3>Bichuv qo‘shish</h3>
    <input type="date" id="bichuvSana">
    <input id="bichuvPartiya" placeholder="Partiya">
    <input type="number" id="bichuvNetto" placeholder="Netto">
    <input id="bichuvNote" placeholder="Izoh">
    <button onclick="addBichuv()">Saqlash</button>`);
}
function addBichuv() {
  let sana = bichuvSana.value;
  let partiya = bichuvPartiya.value;
  let netto = Number(bichuvNetto.value);
  let note = bichuvNote.value;
  if(!sana || !partiya || !netto) return alert("Sana, partiya va netto kerak!");
  bichuvData.push({sana, partiya, netto, note});
  localStorage.setItem("bichuvData", JSON.stringify(bichuvData));
  closeModal(); renderBichuv();
}
function modalEditBichuv(index) {
  let b = bichuvData[index];
  openModal(`<h3>Bichuv o‘zgartirish</h3>
    <input type="date" id="editBichuvSana" value="${b.sana}">
    <input id="editBichuvPartiya" value="${b.partiya}">
    <input type="number" id="editBichuvNetto" value="${b.netto}">
    <input id="editBichuvNote" value="${b.note||""}">
    <button onclick="saveEditBichuv(${index})">Saqlash</button>`);
}
function saveEditBichuv(index) {
  let b = bichuvData[index];
  b.sana = editBichuvSana.value;
  b.partiya = editBichuvPartiya.value;
  b.netto = Number(editBichuvNetto.value);
  b.note = editBichuvNote.value;
  localStorage.setItem("bichuvData", JSON.stringify(bichuvData));
  closeModal(); renderBichuv();
}

// ==============================
// 8️⃣ KIRIM BO‘LIMI
// ==============================
function renderKirim() {
  let html = `<h2>Kirim</h2>
    <button onclick="modalAddKirim()">+ Qo‘shish</button>
    <table>
      <thead><tr>
        <th>Sana</th><th>Klient</th><th>Partiya</th><th>Summa</th><th>Izoh</th><th>O‘zgartirish</th>
      </tr></thead><tbody>`;
  kirimData.forEach((k,index)=>{
    html += `<tr>
      <td>${k.sana}</td><td>${k.klient}</td><td>${k.partiya}</td><td>${k.summa}</td><td>${k.note||""}</td>
      <td><button onclick="modalEditKirim(${index})">O‘zgartirish</button></td>
    </tr>`;
  });
  html += `</tbody></table>`;
  document.getElementById("kirim").innerHTML = html;
}
function modalAddKirim() {
  openModal(`<h3>Kirim qo‘shish</h3>
    <input type="date" id="kirimSana">
    <select id="kirimKlient">${klientData.map(k=>`<option value="${k.name}">${k.name}</option>`).join("")}</select>
    <input id="kirimPartiya" placeholder="Partiya">
    <input type="number" id="kirimSumma" placeholder="Summa">
    <input id="kirimNote" placeholder="Izoh">
    <button onclick="addKirim()">Saqlash</button>`);
}
function addKirim() {
  let sana = kirimSana.value;
  let klient = kirimKlient.value;
  let partiya = kirimPartiya.value;
  let summa = Number(kirimSumma.value);
  let note = kirimNote.value;
  if(!sana || !klient || !summa) return alert("Sana, klient va summa kerak!");
  kirimData.push({sana, klient, partiya, summa, note});
  localStorage.setItem("kirimData", JSON.stringify(kirimData));
  closeModal(); renderKirim();
}
function modalEditKirim(index) {
  let k = kirimData[index];
  openModal(`<h3>Kirim o‘zgartirish</h3>
    <input type="date" id="editKirimSana" value="${k.sana}">
    <select id="editKirimKlient">${klientData.map(c=>`<option value="${c.name}" ${c.name===k.klient?"selected":""}>${c.name}</option>`).join("")}</select>
    <input id="editKirimPartiya" value="${k.partiya}">
    <input type="number" id="editKirimSumma" value="${k.summa}">
    <input id="editKirimNote" value="${k.note||""}">
    <button onclick="saveEditKirim(${index})">Saqlash</button>`);
}
function saveEditKirim(index) {
  let k = kirimData[index];
  k.sana = editKirimSana.value;
  k.klient = editKirimKlient.value;
  k.partiya = editKirimPartiya.value;
  k.summa = Number(editKirimSumma.value);
  k.note = editKirimNote.value;
  localStorage.setItem("kirimData", JSON.stringify(kirimData));
  closeModal(); renderKirim();
}

// ==============================
// 9️⃣ HISOBOT BO‘LIMI
// ==============================
function renderHisobot() {
  // Hisobot uchun totallar
  let totalBrutto = omborData.reduce((a,o)=>a+(Number(o.brutto)||0),0);
  let totalNetto = omborData.reduce((a,o)=>a+(Number(o.netto)||0),0);
  let totalRib = omborData.reduce((a,o)=>a+(Number(o.rib)||0),0);
  let totalSumma = omborData.reduce((a,o)=>a+(Number(o.netto||0)*(narxData.find(n=>n.klient===o.klient && n.mato===o.mato)?.price||0)),0);
  let html = `<h2>Hisobot</h2>
    <ul>
      <li>Jami Brutto: ${totalBrutto}</li>
      <li>Jami Netto: ${totalNetto}</li>
      <li>Jami Rib/Kash: ${totalRib}</li>
      <li>Jami Summasi: ${totalSumma}</li>
    </ul>`;
  document.getElementById("hisobot").innerHTML = html;
}
