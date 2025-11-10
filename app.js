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
  document.getElementById("totalSumma").textContent = totalSumma.toLocaleString();
}

// ----------------- BUYURTMA -----------------
const buyurtmaForm = document.getElementById("buyurtmaForm");
buyurtmaForm.addEventListener("submit", e => {
  e.preventDefault();
  const sana = document.getElementById("buyurtmaSana").value;
  const klient = document.getElementById("buyurtmaKlient").value;
  const partiya = document.getElementById("buyurtmaPartiya").value;
  const modelNomi = document.getElementById("modelNomi").value;
  const modelNomer = document.getElementById("modelNomer").value;
  const razmeri = document.getElementById("razmeri").value;
  const kg = +document.getElementById("kg").value;
  const buyurtmaSon = +document.getElementById("buyurtmaSon").value;
  const bichilgan = bichuvData.filter(b=>b.buyurtmaNomer===modelNomer).reduce((s,a)=>s+a.bichuvSon,0);
  const farqi = buyurtmaSon - bichilgan;
  const holat = bichilgan>0?'bichuvda':'omborda';
  buyurtmaData.push({sana, klient, partiya, modelNomi, modelNomer, razmeri, kg, buyurtmaSon, bichilgan, farqi, holat});
  localStorage.setItem("buyurtmaData", JSON.stringify(buyurtmaData));
  buyurtmaForm.reset();
  renderBuyurtmaTable();
});

function renderBuyurtmaTable() {
  const tbody = document.querySelector("#buyurtmaTable tbody");
  const filter = document.getElementById("filterBuyurtma").value.toLowerCase();
  tbody.innerHTML = "";
  let totalKg=0, totalBuyurtmaSon=0, totalBichilgan=0, totalFarqi=0;
  buyurtmaData.forEach(row=>{
    if (row.klient.toLowerCase().includes(filter) || row.partiya.toLowerCase().includes(filter) || row.modelNomi.toLowerCase().includes(filter)) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row.sana}</td><td>${row.klient}</td><td>${row.partiya}</td>
        <td>${row.modelNomi}</td><td>${row.modelNomer}</td><td>${row.razmeri}</td>
        <td>${row.kg}</td><td>${row.buyurtmaSon}</td>
        <td>${row.bichilgan}</td><td>${row.farqi}</td><td>${row.holat}</td>`;
      tbody.appendChild(tr);
      totalKg+=row.kg;
      totalBuyurtmaSon+=row.buyurtmaSon;
      totalBichilgan+=row.bichilgan;
      totalFarqi+=row.farqi;
    }
  });
  document.getElementById("totalKg").textContent=totalKg;
  document.getElementById("totalBuyurtmaSon").textContent=totalBuyurtmaSon;
  document.getElementById("totalBichilgan").textContent=totalBichilgan;
  document.getElementById("totalFarqi").textContent=totalFarqi;
}

// ----------------- BICHUV -----------------
const bichuvForm = document.getElementById("bichuvForm");
bichuvForm.addEventListener("submit", e=>{
  e.preventDefault();
  const sana=document.getElementById("bichuvSana").value;
  const buyurtmaNomer=document.getElementById("bichuvBuyurtma").value;
  const klient=document.getElementById("bichuvKlient").value;
  const partiya=document.getElementById("bichuvPartiya").value;
  const modelNomi=document.getElementById("bichuvModelNomi").value;
  const modelNomer=document.getElementById("bichuvModelNomer").value;
  const razmeri=+document.getElementById("bichuvRazmeri").value;
  const kg=+document.getElementById("bichuvKg").value;
  const bichuvSon=+document.getElementById("bichuvSon").value;
  const holat="topshirildi";
  bichuvData.push({sana,buyurtmaNomer,klient,partiya,modelNomi,modelNomer,razmeri,kg,bichuvSon,holat});
  localStorage.setItem("bichuvData",JSON.stringify(bichuvData));
  bichuvForm.reset();
  renderBichuvTable();
});

function renderBichuvTable(){
  const tbody=document.querySelector("#bichuvTable tbody");
  const filter=document.getElementById("filterBichuv").value.toLowerCase();
  tbody.innerHTML="";
  let totalKg=0,totalSon=0;
  bichuvData.forEach(row=>{
    if(row.klient.toLowerCase().includes(filter)||row.partiya.toLowerCase().includes(filter)||row.modelNomi.toLowerCase().includes(filter)){
      const tr=document.createElement("tr");
      tr.classList.add(row.holat);
      tr.innerHTML=`
        <td>${row.sana}</td><td>${row.buyurtmaNomer}</td><td>${row.klient}</td><td>${row.partiya}</td>
        <td>${row.modelNomi}</td><td>${row.modelNomer}</td><td>${row.razmeri}</td><td>${row.kg}</td><td>${row.bichuvSon}</td>
        <td>${row.holat}</td>`;
      tbody.appendChild(tr);
      totalKg+=row.kg;
      totalSon+=row.bichuvSon;
    }
  });
  document.getElementById("totalBichuvKg").textContent=totalKg;
  document.getElementById("totalBichuvSon").textContent=totalSon;
}

// ----------------- KIRIM -----------------
const kirimForm=document.getElementById("kirimForm");
kirimForm.addEventListener("submit",e=>{
  e.preventDefault();
  const sana=document.getElementById("kirimSana").value;
  const klient=document.getElementById("kirimKlient").value;
  const partiya=document.getElementById("kirimPartiya").value;
  const summa=+document.getElementById("kirimSumma").value;
  kirimData.push({sana,klient,partiya,summa});
  localStorage.setItem("kirimData",JSON.stringify(kirimData));
  kirimForm.reset();
  renderKirimTable();
});

function renderKirimTable(){
  const tbody=document.querySelector("#kirimTable tbody");
  const filter=document.getElementById("filterKirim").value.toLowerCase();
  tbody.innerHTML="";
  let total=0;
  kirimData.forEach(row=>{
    if(row.klient.toLowerCase().includes(filter)||row.partiya.toLowerCase().includes(filter)){
      const tr=document.createElement("tr");
      tr.innerHTML=`<td>${row.sana}</td><td>${row.klient}</td><td>${row.partiya}</td><td>${row.summa}</td>`;
      tbody.appendChild(tr);
      total+=row.summa;
    }
  });
  document.getElementById("totalKirim").textContent=total.toLocaleString();
}

// ----------------- HISOBOT -----------------
function renderHisobotTable(){
  const tbody=document.querySelector("#hisobotTable tbody");
  const filter=document.getElementById("filterHisobot").value.toLowerCase();
  tbody.innerHTML="";
  let totalKg=0,totalSumma=0,totalTolandi=0,totalQoldiq=0;

  // Klientlar ro'yxatini yaratish
  const klientlar=[...new Set(omborData.map(o=>o.klient))];

  klientlar.forEach(k=>{
    if(!k.toLowerCase().includes(filter)) return;
    const kg=omborData.filter(o=>o.klient===k && o.holat==='topshirildi').reduce((s,a)=>s+a.netto,0);
    const summa=omborData.filter(o=>o.klient===k && o.holat==='topshirildi').reduce((s,a)=>s+a.summa,0);
    const tolandi=kirimData.filter(c=>c.klient===k).reduce((s,a)=>s+a.summa,0);
    const qoldiq=summa-tolandi;
    const tr=document.createElement("tr");
    tr.innerHTML=`<td>${k}</td><td>${kg}</td><td>${summa.toLocaleString()}</td><td>${tolandi.toLocaleString()}</td><td>${qoldiq.toLocaleString()}</td>`;
    tbody.appendChild(tr);
    totalKg+=kg;
    totalSumma+=summa;
    totalTolandi+=tolandi;
    totalQoldiq+=qoldiq;
  });

  document.getElementById("totalHisobotKg").textContent=totalKg;
  document.getElementById("totalHisobotSumma").textContent=totalSumma.toLocaleString();
  document.getElementById("totalHisobotTolandi").textContent=totalTolandi.toLocaleString();
  document.getElementById("totalHisobotQoldiq").textContent=totalQoldiq.toLocaleString();
}



