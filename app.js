// Sidebar toggle
const sidebar = document.getElementById('sidebar');
document.getElementById('sidebarToggle').addEventListener('click', () => {
  sidebar.classList.toggle('hidden');
});

// Modal
const modal = document.getElementById('modal');
const modalForm = document.getElementById('modalForm');
let currentSection = '';

function openModal(section) {
  currentSection = section;
  modal.classList.remove('hidden');
  renderModalForm(section);
}

function closeModal() {
  modal.classList.add('hidden');
  modalForm.innerHTML = '';
}

// Show page
function showPage(id) {
  document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
  document.getElementById(id).classList.add('active');
}

// Sample data arrays
let klientlar = [];
let modelList = [];
let matoList = [];
let narxList = [];

let omborData = [];
let buyurtmaData = [];
let bichuvData = [];
let kirimData = [];

// Modal form rendering
function renderModalForm(section) {
  let html = '';
  if(section === 'klient') {
    html = `
      <h3>Klient Qo'shish</h3>
      <input type="text" id="klientNom" placeholder="Nom" required><br>
      <input type="text" id="klientManzil" placeholder="Manzil"><br>
      <input type="text" id="klientTel" placeholder="Tel"><br>
      <button type="button" onclick="saveKlient()">Saqlash</button>
    `;
  } else if(section === 'model') {
    html = `
      <h3>Model Qo'shish</h3>
      <input type="text" id="modelNom" placeholder="Model nomi" required><br>
      <input type="text" id="modelNomeri" placeholder="Model nomeri" required><br>
      <button type="button" onclick="saveModel()">Saqlash</button>
    `;
  } else if(section === 'mato') {
    html = `
      <h3>Mato turi Qo'shish</h3>
      <input type="text" id="matoNom" placeholder="Mato turi" required><br>
      <input type="text" id="matoIzoh" placeholder="Izoh"><br>
      <button type="button" onclick="saveMato()">Saqlash</button>
    `;
  } else if(section === 'narx') {
    html = `
      <h3>Narx Qo'shish</h3>
      <select id="narxKlient">${klientlar.map(k=>`<option value="${k.nom}">${k.nom}</option>`)}</select><br>
      <select id="narxMato">${matoList.map(m=>`<option value="${m.nom}">${m.nom}</option>`)}</select><br>
      <input type="number" id="narxValue" placeholder="Narx" required><br>
      <button type="button" onclick="saveNarx()">Saqlash</button>
    `;
  } else if(section === 'ombor') {
    html = `
      <h3>Ombor Qo'shish</h3>
      <input type="date" id="omborSana"><br>
      <select id="omborKlient">${klientlar.map(k=>`<option value="${k.nom}">${k.nom}</option>`)}</select><br>
      <input type="text" id="omborPartiya" placeholder="Partiya"><br>
      <select id="omborMato">${matoList.map(m=>`<option value="${m.nom}">${m.nom}</option>`)}</select><br>
      <input type="text" id="omborRangi" placeholder="Rangi"><br>
      <input type="number" id="omborGrammaj" placeholder="Grammaj"><br>
      <input type="number" id="omborEni" placeholder="Eni"><br>
      <input type="number" id="omborRulon" placeholder="Rulon soni"><br>
      <input type="number" id="omborBrutto" placeholder="Brutto"><br>
      <input type="number" id="omborNetto" placeholder="Netto"><br>
      <button type="button" onclick="saveOmbor()">Saqlash</button>
    `;
  }
  modalForm.innerHTML = html;
}

// Example save functions
function saveKlient() {
  const nom = document.getElementById('klientNom').value;
  const manzil = document.getElementById('klientManzil').value;
  const tel = document.getElementById('klientTel').value;
  klientlar.push({nom, manzil, tel});
  renderKlientTable();
  closeModal();
}

function saveModel() {
  const nom = document.getElementById('modelNom').value;
  const nomeri = document.getElementById('modelNomeri').value;
  modelList.push({nom, nomeri});
  renderModelTable();
  closeModal();
}

function saveMato() {
  const nom = document.getElementById('matoNom').value;
  const izoh = document.getElementById('matoIzoh').value;
  matoList.push({nom, izoh});
  renderMatoTable();
  closeModal();
}

function saveNarx() {
  const klient = document.getElementById('narxKlient').value;
  const mato = document.getElementById('narxMato').value;
  const narx = document.getElementById('narxValue').value;
  narxList.push({klient, mato, narx});
  renderNarxTable();
  closeModal();
}

function saveOmbor() {
  const sana = document.getElementById('omborSana').value;
  const klient = document.getElementById('omborKlient').value;
  const partiya = document.getElementById('omborPartiya').value;
  const mato = document.getElementById('omborMato').value;
  const rangi = document.getElementById('omborRangi').value;
  const gramm = parseFloat(document.getElementById('omborGrammaj').value) || 0;
  const eni = parseFloat(document.getElementById('omborEni').value) || 0;
  const rulon = parseInt(document.getElementById('omborRulon').value) || 0;
  const brutto = parseFloat(document.getElementById('omborBrutto').value) || 0;
  const netto = parseFloat(document.getElementById('omborNetto').value) || 0;

  // Narx avtomatik olish
  let narxObj = narxList.find(n=>n.klient === klient && n.mato === mato);
  let narx = narxObj ? parseFloat(narxObj.narx) : 0;
  let summa = netto * narx;

  omborData.push({sana, klient, partiya, mato, rangi, gramm, eni, rulon, brutto, netto, qoldiq: netto, narx, summa, holat:'Bichuvda'});
  renderOmborTable();
  closeModal();
}

// Rendering tables
function renderKlientTable() {
  const tbody = document.getElementById('klientTable').querySelector('tbody');
  tbody.innerHTML = klientlar.map(k=>`<tr><td>${k.nom}</td><td>${k.manzil}</td><td>${k.tel}</td></tr>`).join('');
}

function renderModelTable() {
  const tbody = document.getElementById('modelTable').querySelector('tbody');
  tbody.innerHTML = modelList.map(m=>`<tr><td>${m.nom}</td><td>${m.nomeri}</td></tr>`).join('');
}

function renderMatoTable() {
  const tbody = document.getElementById('matoTable').querySelector('tbody');
  tbody.innerHTML = matoList.map(m=>`<tr><td>${m.nom}</td><td>${m.izoh}</td></tr>`).join('');
}

function renderNarxTable() {
  const tbody = document.getElementById('narxTable').querySelector('tbody');
  tbody.innerHTML = narxList.map(n=>`<tr><td>${n.klient}</td><td>${n.mato}</td><td>${n.narx}</td></tr>`).join('');
}

function renderOmborTable() {
  const tbody = document.getElementById('omborTable').querySelector('tbody');
  tbody.innerHTML = omborData.map(o=>`
    <tr>
      <td>${o.sana}</td><td>${o.klient}</td><td>${o.partiya}</td><td>${o.mato}</td>
      <td>${o.rangi}</td><td>${o.gramm}</td><td>${o.eni}</td><td>${o.rulon}</td>
      <td>${o.brutto}</td><td>${o.netto}</td><td>${o.qoldiq}</td><td>${o.narx}</td><td>${o.summa}</td><td>${o.holat}</td>
    </tr>
  `).join('');
}

function exportTable(tableId) {
  alert('Export Excel / PDF tugmasi bosildi: ' + tableId);
}
