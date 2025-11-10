let data = {
  ombor: [],
  buyurtma: [],
  bichuv: [],
  kirim: [],
  klientlar: [],
  modellar: []
};

function showPage(page) {
  document.querySelectorAll(".page").forEach(p => p.style.display = "none");
  document.getElementById(page).style.display = "block";
  if (page === "hisobot") renderHisobot();
}

function addRow(type) {
  if (type === "ombor") {
    let mato = getVal("ombor_mato");
    let kg = +getVal("ombor_miqdor");
    let summa = +getVal("ombor_summa");
    data.ombor.push({ mato, kg, summa });
    renderTable("omborTable", data.ombor);
  }
  if (type === "buyurtma") {
    let nomer = getVal("buyurtma_nomer");
    let klient = getVal("buyurtma_klient");
    let model = getVal("buyurtma_model");
    let soni = +getVal("buyurtma_soni");
    data.buyurtma.push({ nomer, klient, model, soni });
    updateSelect("bichuv_buyurtma", data.buyurtma.map(b => b.nomer));
    renderTable("buyurtmaTable", data.buyurtma);
  }
  if (type === "bichuv") {
    let buyurtma = getVal("bichuv_buyurtma");
    let partiya = getVal("bichuv_partiya");
    let soni = +getVal("bichuv_soni");
    let holat = getVal("bichuv_holat");
    data.bichuv.push({ buyurtma, partiya, soni, holat });
    renderTable("bichuvTable", data.bichuv);
  }
  if (type === "kirim") {
    let klient = getVal("kirim_klient");
    let summa = +getVal("kirim_summa");
    data.kirim.push({ klient, summa });
    renderTable("kirimTable", data.kirim);
  }
  if (type === "klientlar") {
    let nom = getVal("klient_nomi");
    data.klientlar.push({ nom });
    updateSelect("buyurtma_klient", data.klientlar.map(k => k.nom));
    updateSelect("kirim_klient", data.klientlar.map(k => k.nom));
    renderSimple("klientTable", data.klientlar);
  }
  if (type === "modellar") {
    let nom = getVal("model_nomi");
    data.modellar.push({ nom });
    updateSelect("buyurtma_model", data.modellar.map(m => m.nom));
    renderSimple("modelTable", data.modellar);
  }
}

function renderTable(id, rows) {
  let tbody = document.querySelector(`#${id} tbody`);
  tbody.innerHTML = "";
  rows.forEach(r => {
    let tr = document.createElement("tr");
    Object.values(r).forEach(v => {
      let td = document.createElement("td");
      td.textContent = v;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  updateTotals(id, rows);
}

function renderSimple(id, rows) {
  let tbody = document.querySelector(`#${id} tbody`);
  tbody.innerHTML = rows.map(r => `<tr><td>${r.nom}</td></tr>`).join("");
}

function updateTotals(id, rows) {
  if (id === "omborTable") {
    document.getElementById("omborTotalKg").textContent = rows.reduce((a, b) => a + b.kg, 0);
    document.getElementById("omborTotalSum").textContent = rows.reduce((a, b) => a + b.summa, 0);
  }
  if (id === "buyurtmaTable") {
    document.getElementById("buyurtmaTotal").textContent = rows.reduce((a, b) => a + b.soni, 0);
  }
  if (id === "bichuvTable") {
    document.getElementById("bichuvTotal").textContent = rows.reduce((a, b) => a + b.soni, 0);
  }
  if (id === "kirimTable") {
    document.getElementById("kirimTotal").textContent = rows.reduce((a, b) => a + b.summa, 0);
  }
}

function updateSelect(id, values) {
  let sel = document.getElementById(id);
  sel.innerHTML = values.map(v => `<option>${v}</option>`).join("");
}

function renderHisobot() {
  let div = document.getElementById("hisobotContent");
  let jamiKirim = data.kirim.reduce((a, b) => a + b.summa, 0);
  let jamiBuyurtma = data.buyurtma.reduce((a, b) => a + b.soni, 0);
  let jamiBichuv = data.bichuv.reduce((a, b) => a + b.soni, 0);
  div.innerHTML = `
    <p><b>Jami kirim:</b> ${jamiKirim} so‘m</p>
    <p><b>Buyurtmalar soni:</b> ${jamiBuyurtma} dona</p>
    <p><b>Bichilgan soni:</b> ${jamiBichuv} dona</p>
  `;
}

function getVal(id) {
  return document.getElementById(id).value.trim();
}

showPage("ombor");
