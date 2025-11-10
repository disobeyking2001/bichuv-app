// Klientlarga qarab bichuv narxlari
const bichuvNarxlar = {
  "Asosiy": 1500,
  "Klient A": 1600,
  "Klient B": 1700,
  "Klient C": 1550
};

// Selectni to‘ldirish
const select = document.getElementById("bichuvNarx");
Object.keys(bichuvNarxlar).forEach(k => {
  const opt = document.createElement("option");
  opt.value = bichuvNarxlar[k];
  opt.textContent = `${k} - ${bichuvNarxlar[k]} so‘m/kg`;
  select.appendChild(opt);
});

const form = document.getElementById("omborForm");
const tbody = document.querySelector("#omborTable tbody");

// Ma’lumotlarni saqlash
let omborData = JSON.parse(localStorage.getItem("omborData") || "[]");

function renderTable() {
  tbody.innerHTML = "";
  omborData.forEach((row, i) => {
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
        <select onchange="updateHolat(${i}, this.value)">
          <option value="omborda" ${row.holat==='omborda'?'selected':''}>Omborda</option>
          <option value="bichuvda" ${row.holat==='bichuvda'?'selected':''}>Bichuvda</option>
          <option value="topshirildi" ${row.holat==='topshirildi'?'selected':''}>Topshirildi</option>
        </select>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

form.addEventListener("submit", e => {
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

  const row = {
    sana, klient, partiya, mato, grammaj, eni,
    rulon, brutto, netto, bichuvNarx, summa, holat: "omborda"
  };

  omborData.push(row);
  localStorage.setItem("omborData", JSON.stringify(omborData));
  renderTable();
  form.reset();
});

function updateHolat(index, holat) {
  omborData[index].holat = holat;
  localStorage.setItem("omborData", JSON.stringify(omborData));
  renderTable();
}

// Dastur ishga tushganda yuklash
renderTable();
