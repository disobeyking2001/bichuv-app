// --- Bichuv narxlari ---
const bichuvNarxlar = {
  "Asosiy": 1500,
  "Klient A": 1600,
  "Klient B": 1700,
  "Klient C": 1550
};
const select = document.getElementById("bichuvNarx");
Object.keys(bichuvNarxlar).forEach(k=>{
  const opt = document.createElement("option");
  opt.value = bichuvNarxlar[k];
  opt.textContent = `${k} - ${bichuvNarxlar[k]} so‘m/kg`;
  select.appendChild(opt);
});

// --- Saqlash ---
let omborData = JSON.parse(localStorage.getItem("omborData") || "[]");

// --- Sahifani boshqarish ---
function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
showPage('ombor');

// --- Ombor ---
const omborForm = document.getElementById("omborForm");
omborForm.addEventListener("submit", e=>{
  e.preventDefault();
  const sana=document.getElementById("sana").value;
  const klient=document.getElementById("klient").value;
  const partiya=document.getElementById("partiya").value;
  const mato=document.getElementById("mato").value;
  const grammaj=+document.getElementById("grammaj").value;
  const eni=+document.getElementById("eni").value;
  const rulon=+document.getElementById("rulon").value;
  const brutto=+document.getElementById("brutto").value;
  const netto=+document.getElementById("netto").value;
  const bichuvNarx=+document.getElementById("bichuvNarx").value;
  const summa=netto*bichuvNarx;
  const row={sana,klient,partiya,mato,grammaj,eni,rulon,brutto,netto,bichuvNarx,summa,holat:"omborda"};
  omborData.push(row);
  localStorage.setItem("omborData", JSON.stringify(omborData));
  renderOmborTable();
  renderHisobotKirim();
  renderHisobotHisob();
  omborForm.reset();
});

function renderOmborTable(filter=""){
  const tbody=document.querySelector("#omborTable tbody");
  tbody.innerHTML="";
  let totalNetto=0, totalSumma=0;
  omborData.filter(r=> r.klient.toLowerCase().includes(filter) || r.partiya.toLowerCase().includes(filter))
  .forEach((r,i)=>{
    const tr=document.createElement("tr");
    tr.classList.add(r.holat);
    tr.innerHTML=`
      <td>${r.sana}</td><td>${r.klient}</td><td>${r.partiya}</td><td>${r.mato}</td>
      <td>${r.grammaj}</td><td>${r.eni}</td><td>${r.rulon}</td><td>${r.brutto}</td>
      <td>${r.netto}</td><td>${r.bichuvNarx}</td><td>${r.summa.toLocaleString()}</td>
      <td>
        <select onchange="updateHolat(${i}, this.value)">
          <option value="omborda" ${r.holat==='omborda'?'selected':''}>Omborda</option>
          <option value="bichuvda" ${r.holat==='bichuvda'?'selected':''}>Bichuvda</option>
          <option value="topshirildi" ${r.holat==='topshirildi'?'selected':''}>Topshirildi</option>
        </select>
      </td>`;
    tbody.appendChild(tr);
    totalNetto+=r.netto;
    totalSumma+=r.summa;
  });
  document.getElementById("totalNetto").textContent=totalNetto;
  document.getElementById("totalSumma").textContent=totalSumma.toLocaleString();
}

function updateHolat(i, holat){
  omborData[i].holat=holat;
  localStorage.setItem("omborData", JSON.stringify(omborData));
  renderOmborTable();
  renderHisobotKirim();
  renderHisobotHisob();
}

document.getElementById("filterOmbor").addEventListener("input", e=>{
  renderOmborTable(e.target.value.toLowerCase());
});

// --- Hisobot ---
function renderHisobotKirim(filter=""){
  const tbody=document.querySelector("#hisobotKirimTable tbody");
  tbody.innerHTML="";
  let totalKg=0,totalSumma=0;
  omborData.filter(r=> (r.holat==='topshirildi') && (r.klient.toLowerCase().includes(filter)||r.partiya.toLowerCase().includes(filter)))
  .forEach(r=>{
    const tr=document.createElement("tr");
    tr.innerHTML=`<td>${r.sana}</td><td>${r.klient}</td><td>${r.partiya}</td><td>${r.netto}</td><td>${r.summa.toLocaleString()}</td>`;
    tbody.appendChild(tr);
    totalKg+=r.netto;
    totalSumma+=r.summa;
  });
  document.getElementById("totalKirimKg").textContent=totalKg;
  document.getElementById("totalKirimSumma").textContent=totalSumma.toLocaleString();
}

function renderHisobotHisob(filter=""){
  const tbody=document.querySelector("#hisobotHisobTable tbody");
  tbody.innerHTML="";
  let clients={};
  omborData.filter(r=> r.holat==='topshirildi').forEach(r=>{
    if(!clients[r.klient]) clients[r.klient]={kg:0,summa:0};
    clients[r.klient].kg+=r.netto;
    clients[r.klient].summa+=r.summa;
  });
  let totalKg=0,totalSumma=0,totalTolandi=0,totalQoldiq=0;
  Object.keys(clients).filter(k=> k.toLowerCase().includes(filter)).forEach(k=>{
    const c=clients[k];
    const tolandi=0;
    const qoldiq=c.summa-tolandi;
    const tr=document.createElement("tr");
    tr.innerHTML=`<td>${k}</td><td>${c.kg}</td><td>${c.summa.toLocaleString()}</td><td>${tolandi.toLocaleString()}</td><td>${qoldiq.toLocaleString()}</td>`;
    tbody.appendChild(tr);
    totalKg+=c.kg;
    totalSumma+=c.summa;
    totalTolandi+=tolandi;
    totalQoldiq+=qoldiq;
  });
  document.getElementById("totalHisobKg").textContent=totalKg;
  document.getElementById("totalHisobSumma").textContent=totalSumma.toLocaleString();
  document.getElementById("totalHisobTolandi").textContent=totalTolandi.toLocaleString();
  document.getElementById("totalHisobQoldiq").textContent=totalQoldiq.toLocaleString();
}

document.getElementById("filterHisobotKirim").addEventListener("input", e=>{
  renderHisobotKirim(e.target.value.toLowerCase());
});
document.getElementById("filterHisobotHisob").addEventListener("input", e=>{
  renderHisobotHisob(e.target.value.toLowerCase());
});

// --- Dastur ishga tushganda render ---
renderOmborTable();
renderHisobotKirim();
renderHisobotHisob();


