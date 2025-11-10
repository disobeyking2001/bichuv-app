// --- Bichuv narxlari ---
const bichuvNarxlar = {
  "Asosiy": 1500,
  "Klient A": 1600,
  "Klient B": 1700,
  "Klient C": 1550
};

// Selectni to‘ldirish
const bichuvSelect = document.getElementById("bichuvNarx");
Object.keys(bichuvNarxlar).forEach(k => {
  const opt = document.createElement("option");
  opt.value = bichuvNarxlar[k];
  opt.textContent = `${k} - ${bichuvNarxlar[k]} so‘m/kg`;
  bichuvSelect.appendChild(opt);
});

// --- LocalStorage data ---
let omborData = JSON.parse(localStorage.getItem("omborData") || "[]");
let buyurtmaData = JSON.parse(localStorage.getItem("buyurtmaData") || "[]");
let bichuvData = JSON.parse(localStorage.getItem("bichuvData") || "[]");
let kirimData = JSON.parse(localStorage.getItem("kirimData") || "[]");

// --- Page boshqarish ---
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  // Render qilish
  if (id === 'ombor') renderOmborTable();
  if (id === 'buyurtma') renderBuyurtmaTable();
  if (id === 'bichuv') renderBichuvTable();
  if (id === 'kirim') renderKirimTable();
  if (id === 'hisobot') renderHisobotTable();
}
showPage('ombor'); // dastlab

// ----------------- OMBOR -----------------
const omborForm = document.getElementById("omborForm");
omborForm.addEventListener("submit", e => {
  e.preventDefault();
  const sana = document.getElementById("sana").value;
  const klient = document.getElementById("klient").value;
  const partiya = document.getElementById("partiya").value;
  const mato = document.getElementById("mato").value;
  const grammaj = +document.getElementById("grammaj").value;
  const eni = +document.getElementById("eni").value;
  const rulon = +document.getElementById("rulon").value;
  const brutto = +document.getElementById("brutto").value;
  const netto = +document.getElementById("netto").value;
  const bichuvNarx = +document.getElementById("bichuvNarx").value || 0;
  const summa = netto * bichuvNarx;

  const row = { sana, klient, partiya, mato, grammaj, eni, rulon, brutto, netto, bichuvNarx, summa, holat: "omborda" };
  omborData.push(row);
  localStorage.setItem("omborData", JSON.stringify(omborData));
  omborForm.reset();
  renderOmborTable();
});

function updateOmborHolat(i, val) {
  omborData[i].holat = val;
  localStorage.setItem("omborData", JSON.stringify(omborData));
  renderOmborTable();
}

function renderOmborTable() {
  const tbody = document.querySelector("#omborTable tbody");
  const filter = document.getElementById("filterOmbor").value.toLowerCase();
  tbody.innerHTML = "";
  let totalNetto = 0, totalSumma = 0;
  omborData.forEach((row, i) => {
    if (
      row.klient.toLowerCase().includes(filter) ||
      row.partiya.toLowerCase().includes(filter) ||
      row.mato.toLowerCase().includes(filter)
    ) {
      const tr = document.createElement("tr");
      tr.classList.add(row.holat);
      tr.innerHTML = `
        <td>${row.sana}</td>
        <td>${row.klient}</td>
        <td>${row.partiya}</td>
        <td>${row.mato}</td>
        <td>${row.grammaj}</td>
        <td>${row.eni}</td>
        <td>${row.rulon}</td>
        <td>${row.brutto}</td>
        <td>${row.netto}</td>
        <td>${row.bichuvNarx}</td>
        <td>${row.summa.toLocaleString()}</td>
        <td>
          <select onchange="updateOmborHolat(${i}, this.value)">
            <option value='omborda' ${row.holat==='omborda'?'selected':''}>Omborda</option>
            <option value='bichuvda' ${row.holat==='bichuvda'?'selected':''}>Bichuvda</option>
            <option value='topshirildi' ${row.holat==='topshirildi'?'selected':''}>Topshirildi</option>
          </select>
        </td>`;
      tbody.appendChild(tr);
      totalNetto += row.netto;
      totalSumma += row.summa;
    }
  });
  document.getElementById("totalNetto").textContent = totalNetto;
  document.getElementById("tota



