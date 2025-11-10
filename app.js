// ------------------ Ombor ------------------
const bichuvNarxlar = { "Asosiy":2600, "Klient A":2400, "Klient B":2200, "Klient C":2000 };
const select = document.getElementById("bichuvNarx");
Object.keys(bichuvNarxlar).forEach(k=>{
  const opt = document.createElement("option");
  opt.value = bichuvNarxlar[k];
  opt.textContent = `${k} - ${bichuvNarxlar[k]} so‘m/kg`;
  select.appendChild(opt);
});

const form = document.getElementById("omborForm");
const tbody = document.querySelector("#omborTable tbody");
let omborData = JSON.parse(localStorage.getItem("omborData") || "[]");

function renderOmbor(filter="") {
  tbody.innerHTML = "";
  let totalNetto=0, totalSumma=0;
  omborData.filter(r=> r.klient.toLowerCase().includes(filter) || r.partiya.toLowerCase().includes(filter))
  .forEach((row,i)=>{
    const tr = document.createElement("tr");
    tr.classList.add(row.holat);
    tr.innerHTML = `<td>${row.sana}</td><td>${row.klient}</td><td>${row.partiya}</td><td>${row.mato}</td>
      <td>${row.grammaj}</td><td>${row.eni}</td><td>${row.rulon}</td><td>${row.brutto}</td><td>${row.netto}</td>
      <td>${row.bichuvNarx}</td><td>${row.summa.toLocaleString()}</td>
      <td>
        <select onchange="updateHolat(${i},this.value)">
          <option value='omborda' ${row.holat==='omborda'?'selected':''}>Omborda</option>
          <option value='bichuvda' ${row.holat==='bichuvda'?'selected':''}>Bichuvda</option>
          <option value='topshirildi' ${row.holat==='topshirildi'?'selected':''}>Topshirildi</option>
        </select>
      </td>`;
    tbody.appendChild(tr);
    totalNetto += row.netto;
    totalSumma += row.summa;
  });
  document.getElementById("totalNetto").textContent = totalNetto;
  document.getElementById("totalSumma").textContent = totalSumma.toLocaleString();
}

form.addEventListener("submit", e=>{
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
  const bichuvNarx=+document.getElementById("bichuvNarx").value || 0;
  const summa = netto * bichuvNarx;

  const row={sana,klient,partiya,mato,grammaj,eni,rulon,brutto,netto,bichuvNarx,summa,holat:"omborda"};
  omborData.push(row);
  localStorage.setItem("omborData",JSON.stringify(omborData));
  form.reset();
  renderOmbor();
});

function updateHolat(index,holat){
  omborData[index].holat = holat;
  localStorage.setItem("omborData",JSON.stringify(omborData));
  renderOmbor();
}

document.getElementById("filterOmbor").addEventListener("input",e=>{
  renderOmbor(e.target.value.toLowerCase());
});

// ------------------ Buyurtma ------------------
let buyurtmaData = JSON.parse(localStorage.getItem("buyurtmaData") || "[]");
function renderBuyurtma(filter=""){
  const tbody=document.querySelector("#buyurtmaTable tbody");
  tbody.innerHTML="";
  let totalBuyurtma=0, totalBichilgan=0, totalFarq=0;
  buyurtmaData.filter(r=>r.klient.toLowerCase().includes(filter) || r.model.toLowerCase().includes(filter))
  .forEach(r=>{
    const bichilgan = r.bichilgan || 0;
    const farq = r.son - bichilgan;
    const tr=document.createElement("tr");
    tr.innerHTML=`<td>${r.sana}</td><td>${r.klient}</td><td>${r.partiya}</td><td>${r.model}</td>
      <td>${r.razmer}</td><td>${r.son}</td><td>${bichilgan}</td>
      <td style="color:${farq<0?'green':farq>0?'red':'black'}">${farq>0?'-':''}${farq}</td>`;
    tbody.appendChild(tr);
    totalBuyurtma += r.son;
    totalBichilgan += bichilgan;
    totalFarq += farq;
  });
  document.getElementById("totalBuyurtma").textContent=totalBuyurtma;
  document.getElementById("totalBichilgan").textContent=totalBichilgan;
  document.getElementById("totalFarq").textContent=totalFarq;
}
document.getElementById("buyurtmaForm").addEventListener("submit", e=>{
  e.preventDefault();
  const sana=document.getElementById("buyurtmaSana").value;
  const klient=document.getElementById("buyurtmaKlient").value.trim();
  const partiya=document.getElementById("buyurtmaPartiya").value.trim();
  const model=document.getElementById("buyurtmaModel").value.trim();
  const razmer=document.getElementById("buyurtmaRazmer").value.trim();
  const son=+document.getElementById("buyurtmaSon").value;
  buyurtmaData.push({sana,klient,partiya,model,razmer,son,bichilgan:0});
  localStorage.setItem("buyurtmaData",JSON.stringify(buyurtmaData));
  e.target.reset();
  renderBuyurtma();
});
document.getElementById("filterBuyurtma").addEventListener("input", e=>{
  renderBuyurtma(e.target.value.toLowerCase());
});

// ------------------ Bichuv ------------------
let bichuvData = JSON.parse(localStorage.getItem("bichuvData") || "[]");
function renderBichuv(filter=""){
  const tbody=document.querySelector("#bichuvTable tbody");
  tbody.innerHTML="";
  let totalKg=0, totalQavat=0, totalBichuvSon=0;
  bichuvData.filter(r=>r.klient.toLowerCase().includes(filter)||r.model.toLowerCase().includes(filter)||r.partiya.toLowerCase().includes(filter))
  .forEach(r=>{
    const tr=document.createElement("tr");
    tr.innerHTML=`<td>${r.sana}</td><td>${r.buyurtma}</td><td>${r.klient}</td><td>${r.partiya}</td><td>${r.model}</td>
      <td>${r.razmer}</td><td>${r.kg}</td><td>${r.nastel}</td><td>${r.qavatSon}</td><td>${r.bichuvSon}</td>`;
    tbody.appendChild(tr);
    totalKg+=r.kg; totalQavat+=r.qavatSon; totalBichuvSon+=r.bichuvSon;
  });
  document.getElementById("totalKg").textContent=totalKg;
  document.getElementById("totalQavat").textContent=totalQavat;
  document.getElementById("totalBichuvSon").textContent=totalBichuvSon;
}
document.getElementById("bichuvForm").addEventListener("submit", e=>{
  e.preventDefault();
  const sana=document.getElementById("bichuvSana").value;
  const buyurtma=document.getElementById("bichuvBuyurtma").value.trim();
  const klient=document.getElementById("bichuvKlient").value.trim();
  const partiya=document.getElementById("bichuvPartiya").value.trim();
  const model=document.getElementById("bichuvModel").value.trim();
  const razmer=document.getElementById("bichuvRazmer").value.trim();
  const kg=+document.getElementById("bichuvKg").value;
  const nastel=+document.getElementById("bichuvNastel").value;
  const qavatSon=+document.getElementById("bichuvQavatSon").value;
  const bichuvSon=+document.getElementById("bichuvSon").value;
  bichuvData.push({sana,buyurtma,klient,partiya,model,razmer,kg,nastel,qavatSon,bichuvSon});
  localStorage.setItem("bichuvData",JSON.stringify(bichuvData));
  e.target.reset();
  renderBichuv();
});
document.getElementById("filterBichuv").addEventListener("input", e=>{
  renderBichuv(e.target.value.toLowerCase());
});

// ------------------ Page Navigation ------------------
function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// Dastur ishga tush

