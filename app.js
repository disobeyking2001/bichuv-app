// --- GLOBAL MA'LUMOTLAR ---
let omborData = JSON.parse(localStorage.getItem('omborData')) || [];
let buyurtmaData = JSON.parse(localStorage.getItem('buyurtmaData')) || [];
let bichuvData = JSON.parse(localStorage.getItem('bichuvData')) || [];
let kirimData = JSON.parse(localStorage.getItem('kirimData')) || [];

// --- NOMLAR BAZASI ---
let klientlar = JSON.parse(localStorage.getItem('klientlar')) || [];
let matolar = JSON.parse(localStorage.getItem('matolar')) || [];
let modellari = JSON.parse(localStorage.getItem('modellari')) || [];
let modelNomerlar = JSON.parse(localStorage.getItem('modelNomerlar')) || [];
let razmerlar = JSON.parse(localStorage.getItem('razmerlar')) || [];

// --- SAQLASH FUNKSIYASI ---
function saveData() {
  localStorage.setItem('omborData', JSON.stringify(omborData));
  localStorage.setItem('buyurtmaData', JSON.stringify(buyurtmaData));
  localStorage.setItem('bichuvData', JSON.stringify(bichuvData));
  localStorage.setItem('kirimData', JSON.stringify(kirimData));

  localStorage.setItem('klientlar', JSON.stringify(klientlar));
  localStorage.setItem('matolar', JSON.stringify(matolar));
  localStorage.setItem('modellari', JSON.stringify(modellari));
  localStorage.setItem('modelNomerlar', JSON.stringify(modelNomerlar));
  localStorage.setItem('razmerlar', JSON.stringify(razmerlar));
}

// --- SAHIFANI KO‘RSATISH ---
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.getElementById(pageId).classList.remove('hidden');
  if (pageId === 'hisobot') renderHisobotTable();
}

// --- SELECTLARNI YANGILASH ---
function updateSelectOptions() {
  const selects = {
    klient: document.querySelectorAll('#klientSelect, #buyurtmaKlient, #bichuvKlient, #kirimKlient'),
    mato: document.querySelectorAll('#matoSelect'),
    model: document.querySelectorAll('#modelNomiSelect'),
    modelNomer: document.querySelectorAll('#modelNomerSelect'),
    razmer: document.querySelectorAll('#razmeriSelect')
  };

  for (let key in selects) {
    selects[key].forEach(sel => {
      const list = key === 'klient' ? klientlar :
        key === 'mato' ? matolar :
        key === 'model' ? modellari :
        key === 'modelNomer' ? modelNomerlar : razmerlar;

      sel.innerHTML = `<option value="">-- Tanlang --</option>`;
      list.forEach(i => sel.innerHTML += `<option value="${i}">${i}</option>`);
    });
  }
}

// --- YANGI NOM QO‘SHISH (agar mavjud bo‘lmasa) ---
function addToList(list, value) {
  if (value && !list.includes(value)) {
    list.push(value);
    saveData();
    updateSelectOptions();
  }
}

// --- OMBOR FORM ---
document.getElementById('omborForm').addEventListener('submit', e => {
  e.preventDefault();
  const klient = document.getElementById('klientSelect').value;
  const mato = document.getElementById('matoSelect').value;
  const partiya = document.getElementById('partiya').value;
  const netto = +document.getElementById('netto').value;
  const narx = +document.getElementById('bichuvNarx').value;
  const summa = netto * narx;

  omborData.push({
    sana: document.getElementById('sana').value,
    klient, partiya, mato,
    gramm: +document.getElementById('grammaj').value,
    eni: +document.getElementById('eni').value,
    rulon: +document.getElementById('rulon').value,
    brutto: +document.getElementById('brutto').value,
    netto, narx, summa,
    holat: "Omborda"
  });

  addToList(klientlar, klient);
  addToList(matolar, mato);
  saveData();
  renderOmborTable();
  e.target.reset();
});

// --- BUYURTMA FORM ---
document.getElementById('buyurtmaForm').addEventListener('submit', e => {
  e.preventDefault();
  const klient = document.getElementById('buyurtmaKlient').value;
  const model = document.getElementById('modelNomiSelect').value;
  const nomer = document.getElementById('modelNomerSelect').value;
  const razmer = document.getElementById('razmeriSelect').value;
  const partiya = document.getElementById('buyurtmaPartiya').value;

  buyurtmaData.push({
    sana: document.getElementById('buyurtmaSana').value,
    klient,
    nomerBuyurtma: document.getElementById('buyurtmaNomer').value,
    partiya,
    model, nomer, razmer,
    kg: +document.getElementById('buyurtmaKg').value,
    soni: +document.getElementById('buyurtmaSon').value,
    holat: "Jarayonda"
  });

  addToList(klientlar, klient);
  addToList(modellari, model);
  addToList(modelNomerlar, nomer);
  addToList(razmerlar, razmer);
  saveData();
  renderBuyurtmaTable();
  e.target.reset();
});

// --- BICHUV FORM ---
document.getElementById('bichuvForm').addEventListener('submit', e => {
  e.preventDefault();
  const buyurtma = document.getElementById('bichuvBuyurtmaNomer').value;
  const partiya = document.getElementById('bichuvPartiya').value;
  const klient = document.getElementById('bichuvKlient').value;

  bichuvData.push({
    sana: document.getElementById('bichuvSana').value,
    buyurtma, partiya, klient,
    kg: +document.getElementById('bichuvKg').value,
    soni: +document.getElementById('bichuvSon').value,
    holat: "Topshirildi"
  });

  saveData();
  updateHolat(partiya);
  renderBichuvTable();
  renderOmborTable();
  renderBuyurtmaTable();
  e.target.reset();
});

// --- KIRIM FORM ---
document.getElementById('kirimForm').addEventListener('submit', e => {
  e.preventDefault();
  kirimData.push({
    sana: document.getElementById('kirimSana').value,
    klient: document.getElementById('kirimKlient').value,
    partiya: document.getElementById('kirimPartiya').value,
    summa: +document.getElementById('kirimSumma').value
  });
  saveData();
  renderKirimTable();
  e.target.reset();
});

// --- HOLAT YANGILASH ---
function updateHolat(partiya) {
  omborData.forEach(o => {
    if (o.partiya === partiya) o.holat = "Bichuvda";
  });
  buyurtmaData.forEach(b => {
    if (b.partiya === partiya) b.holat = "Bichuvda";
  });
  saveData();
}

// --- JADVALLARNI CHIZISH ---
function renderOmborTable() {
  const tbody = document.querySelector('#omborTable tbody');
  tbody.innerHTML = "";
  omborData.forEach(o => {
    tbody.innerHTML += `<tr>
      <td>${o.sana}</td><td>${o.klient}</td><td>${o.partiya}</td><td>${o.mato}</td>
      <td>${o.gramm}</td><td>${o.eni}</td><td>${o.rulon}</td><td>${o.brutto}</td>
      <td>${o.netto}</td><td>${o.narx}</td><td>${o.summa}</td><td>${o.holat}</td>
    </tr>`;
  });
}

function renderBuyurtmaTable() {
  const tbody = document.querySelector('#buyurtmaTable tbody');
  tbody.innerHTML = "";
  buyurtmaData.forEach(b => {
    tbody.innerHTML += `<tr>
      <td>${b.sana}</td><td>${b.klient}</td><td>${b.nomerBuyurtma}</td><td>${b.partiya}</td>
      <td>${b.model}</td><td>${b.nomer}</td><td>${b.razmer}</td><td>${b.kg}</td>
      <td>${b.soni}</td><td>${b.holat}</td>
    </tr>`;
  });
}

function renderBichuvTable() {
  const tbody = document.querySelector('#bichuvTable tbody');
  tbody.innerHTML = "";
  bichuvData.forEach(b => {
    tbody.innerHTML += `<tr>
      <td>${b.sana}</td><td>${b.buyurtma}</td><td>${b.partiya}</td><td>${b.klient}</td>
      <td>${b.kg}</td><td>${b.soni}</td><td>${b.holat}</td>
    </tr>`;
  });
}

function renderKirimTable() {
  const tbody = document.querySelector('#kirimTable tbody');
  tbody.innerHTML = "";
  kirimData.forEach(k => {
    tbody.innerHTML += `<tr>
      <td>${k.sana}</td><td>${k.klient}</td><td>${k.partiya}</td><td>${k.summa}</td>
    </tr>`;
  });
}

function renderHisobotTable() {
  const tbody = document.querySelector('#hisobotTable tbody');
  tbody.innerHTML = "";
  const hisobot = {};

  omborData.forEach(o => {
    if (!hisobot[o.klient]) hisobot[o.klient] = { kg: 0, summa: 0, tolandi: 0 };
    hisobot[o.klient].kg += o.netto;
    hisobot[o.klient].summa += o.summa;
  });

  kirimData.forEach(k => {
    if (!hisobot[k.klient]) hisobot[k.klient] = { kg: 0, summa: 0, tolandi: 0 };
    hisobot[k.klient].tolandi += k.summa;
  });

  for (let k in hisobot) {
    const h = hisobot[k];
    const qoldiq = h.summa - h.tolandi;
    tbody.innerHTML += `<tr>
      <td>${k}</td><td>${h.kg}</td><td>${h.summa}</td><td>${h.tolandi}</td><td>${qoldiq}</td>
    </tr>`;
  }
}

// --- YUKLASHDA ISHLAYDI ---
updateSelectOptions();
renderOmborTable();
renderBuyurtmaTable();
renderBichuvTable();
renderKirimTable();




