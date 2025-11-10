document.addEventListener('DOMContentLoaded', () => {
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

  // LocalStorage
  let omborData = JSON.parse(localStorage.getItem("omborData") || "[]");
  let buyurtmaData = JSON.parse(localStorage.getItem("buyurtmaData") || "[]");
  let bichuvData = JSON.parse(localStorage.getItem("bichuvData") || "[]");

  // ------------------ SHOW PAGE ------------------
  window.showPage = function(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const el = document.getElementById(id);
    if(el) el.classList.add('active');
  };
  showPage('ombor');

  // ------------------ RENDER FUNCTIONS ------------------
  function renderOmbor(filter="") {
    const tbody = document.querySelector("#omborTable tbody");
    tbody.innerHTML = "";
    let totalBrutto = 0, totalNetto = 0, totalSumma = 0;
    omborData.filter(r => 
      r.klient.toLowerCase().includes(filter) || 
      r.mato.toLowerCase().includes(filter) || 
      r.partiya.toLowerCase().includes(filter)
    ).forEach((row, i) => {
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
            <option value='omborda' ${row.holat==='omborda'?'selected':''}>Omborda</option>
            <option value='bichuvda' ${row.holat==='bichuvda'?'selected':''}>Bichuvda</option>
            <option value='topshirildi' ${row.holat==='topshirildi'?'selected':''}>Topshirildi</option>
          </select>
        </td>
      `;
      tbody.appendChild(tr);
      totalBrutto += row.brutto;
      totalNetto += row.netto;
      totalSumma += row.summa;
    });
    document.getElementById("totalBrutto").textContent = totalBrutto;
    document.getElementById("totalNetto").textContent = totalNetto;
    document.getElementById("totalSumma").textContent = totalSumma.toLocaleString();
  }

  // ------------------ FORM SUBMIT ------------------
  const form = document.getElementById("omborForm");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const sana = document.getElementById("sana").value;
    const klient = document.getElementById("klient").value.trim();
    const partiya = document.getElementById("partiya").value.trim();
    const mato = document.getElementById("mato").value.trim();
    const grammaj = +document.getElementById("grammaj").value;
    const eni = +document.getElementById("eni").value;
    const rulon = +document.getElementById("rulon").value;
    const brutto = +document.getElementById("brutto").value;
    const netto = +document.getElementById("netto").value;
    const bichuvNarx = +document.getElementById("bichuvNarx").value || bichuvNarxlar[klient] || bichuvNarxlar["Asosiy"];
    const summa = netto * bichuvNarx;

    const row = { sana, klient, partiya, mato, grammaj, eni, rulon, brutto, netto, bichuvNarx, summa, holat:"omborda" };
    omborData.push(row);
    localStorage.setItem("omborData", JSON.stringify(omborData));
    form.reset();
    renderOmbor();
  });

  // ------------------ UPDATE HOLAT ------------------
  window.updateHolat = function(index, holat) {
    omborData[index].holat = holat;
    localStorage.setItem("omborData", JSON.stringify(omborData));
    renderOmbor();
  }

  // ------------------ FILTER ------------------
  document.getElementById("filterOmbor").addEventListener("input", e => {
    renderOmbor(e.target.value.toLowerCase());
  });

  // Boshida render
  renderOmbor();
});

