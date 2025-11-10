// Wrap everything to avoid running before DOM loaded
document.addEventListener('DOMContentLoaded', () => {

  // ----------------- Storage keys -----------------
  const CLIENTS_KEY = 'bb_clients_v1';
  const FABRICS_KEY = 'bb_fabrics_v1';
  const MODELS_KEY = 'bb_models_v1';
  const OMBOR_DEMO_KEY = 'bb_ombor_demo_v1';
  const BUYURTMA_DEMO_KEY = 'bb_buyurtma_demo_v1';

  // ----------------- Load helpers -----------------
  function load(key){ try{ return JSON.parse(localStorage.getItem(key)) || [] }catch(e){ return [] } }
  function save(key, arr){ localStorage.setItem(key, JSON.stringify(arr)) }

  // ----------------- Data -----------------
  let clients = load(CLIENTS_KEY);
  let fabrics = load(FABRICS_KEY);
  let models = load(MODELS_KEY);
  let omborDemo = load(OMBOR_DEMO_KEY);
  let buyurtmaDemo = load(BUYURTMA_DEMO_KEY);

  // ----------------- showPage global -----------------
  window.showPage = function(id){
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const el = document.getElementById(id);
    if(!el) return;
    el.classList.add('active');
    // render the active page so selects/tables update
    renderAll();
  };

  // Show initial page
  showPage('clients');

  // ----------------- Render functions -----------------
  function renderAll(){
    renderClientsTable();
    renderFabricsTable();
    renderModelsTable();
    renderSelects();
    renderOmborDemo();
    renderBuyurtmaDemo();
  }

  // Clients
  const clientsTbody = document.querySelector('#clientsTable tbody');
  function renderClientsTable(){
    clientsTbody.innerHTML = '';
    clients.forEach((c, i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${i+1}</td><td>${escapeHtml(c.name)}</td><td>${escapeHtml(c.phone||'')}</td>
        <td><button class="small" data-i="${i}" data-type="del-client">O'chirish</button></td>`;
      clientsTbody.appendChild(tr);
    });
  }

  // Fabrics
  const fabricsTbody = document.querySelector('#fabricsTable tbody');
  function renderFabricsTable(){
    fabricsTbody.innerHTML = '';
    fabrics.forEach((f, i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${i+1}</td><td>${escapeHtml(f.name)}</td>
        <td><button class="small" data-i="${i}" data-type="del-fabric">O'chirish</button></td>`;
      fabricsTbody.appendChild(tr);
    });
  }

  // Models
  const modelsTbody = document.querySelector('#modelsTable tbody');
  function renderModelsTable(){
    modelsTbody.innerHTML = '';
    models.forEach((m, i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${i+1}</td><td>${escapeHtml(m.name)}</td><td>${escapeHtml(m.number)}</td><td>${escapeHtml(m.size||'')}</td>
        <td><button class="small" data-i="${i}" data-type="del-model">O'chirish</button></td>`;
      modelsTbody.appendChild(tr);
    });
  }

  // Selects used in other forms
  function renderSelects(){
    // Helper to fill a select with options
    function fill(selectEl, items, textFn){
      selectEl.innerHTML = '<option value="">— tanlang —</option>';
      items.forEach((it, idx) => {
        const opt = document.createElement('option');
        opt.value = idx; // index as value
        opt.textContent = textFn(it);
        selectEl.appendChild(opt);
      });
    }

    // Clients in multiple selects
    const clientText = c => c.name;
    const selectClientForOmbor = document.getElementById('selectClientForOmbor');
    const selectClientForBuyurtma = document.getElementById('selectClientForBuyurtma');
    fill(selectClientForOmbor, clients, clientText);
    fill(selectClientForBuyurtma, clients, clientText);

    // Fabrics
    const selectFabricForOmbor = document.getElementById('selectFabricForOmbor');
    fill(selectFabricForOmbor, fabrics, f => f.name);

    // Models
    const selectModelForOmbor = document.getElementById('selectModelForOmbor');
    const selectModelForBuyurtma = document.getElementById('selectModelForBuyurtma');
    fill(selectModelForOmbor, models, m => `${m.name} (${m.number})`);
    fill(selectModelForBuyurtma, models, m => `${m.name} (${m.number})`);
  }

  // Ombor demo table
  const omborDemoTbody = document.querySelector('#omborDemoTable tbody');
  function renderOmborDemo(){
    omborDemoTbody.innerHTML = '';
    omborDemo.forEach((r,i)=>{
      const client = clients[r.clientIndex] ? clients[r.clientIndex].name : '—';
      const fabric = fabrics[r.fabricIndex] ? fabrics[r.fabricIndex].name : '—';
      const model = models[r.modelIndex] ? (models[r.modelIndex].name + ' / ' + models[r.modelIndex].number) : '—';
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${i+1}</td><td>${escapeHtml(client)}</td><td>${escapeHtml(fabric)}</td><td>${escapeHtml(model)}</td><td>${r.netto||''}</td>`;
      omborDemoTbody.appendChild(tr);
    });
  }

  // Buyurtma demo
  const buyurtmaDemoTbody = document.querySelector('#buyurtmaDemoTable tbody');
  function renderBuyurtmaDemo(){
    buyurtmaDemoTbody.innerHTML = '';
    buyurtmaDemo.forEach((r,i)=>{
      const client = clients[r.clientIndex] ? clients[r.clientIndex].name : '—';
      const model = models[r.modelIndex] ? (models[r.modelIndex].name + ' / ' + models[r.modelIndex].number) : '—';
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${i+1}</td><td>${escapeHtml(client)}</td><td>${escapeHtml(model)}</td><td>${r.qty||''}</td>`;
      buyurtmaDemoTbody.appendChild(tr);
    });
  }

  // ----------------- Forms handling -----------------

  // Add client
  document.getElementById('clientForm').addEventListener('submit', e=>{
    e.preventDefault();
    const name = (document.getElementById('clientName').value || '').trim();
    const phone = (document.getElementById('clientPhone').value || '').trim();
    if(!name){ alert('Klient nomi kiriting'); return; }
    clients.push({ name, phone });
    save(CLIENTS_KEY, clients);
    document.getElementById('clientForm').reset();
    renderAll();
  });

  // Add fabric
  document.getElementById('fabricForm').addEventListener('submit', e=>{
    e.preventDefault();
    const name = (document.getElementById('fabricName').value || '').trim();
    if(!name){ alert('Mato turi kiriting'); return; }
    fabrics.push({ name });
    save(FABRICS_KEY, fabrics);
    document.getElementById('fabricForm').reset();
    renderAll();
  });

  // Add model
  document.getElementById('modelForm').addEventListener('submit', e=>{
    e.preventDefault();
    const name = (document.getElementById('modelName').value || '').trim();
    const number = (document.getElementById('modelNumber').value || '').trim();
    const size = (document.getElementById('modelSize').value || '').trim();
    if(!name || !number){ alert('Model nomi va nomerini kiriting'); return; }
    models.push({ name, number, size });
    save(MODELS_KEY, models);
    document.getElementById('modelForm').reset();
    renderAll();
  });

  // Ombor demo submit
  document.getElementById('omborDemoForm').addEventListener('submit', e=>{
    e.preventDefault();
    const clientIndex = document.getElementById('selectClientForOmbor').value;
    const fabricIndex = document.getElementById('selectFabricForOmbor').value;
    const modelIndex = document.getElementById('selectModelForOmbor').value;
    const netto = +document.getElementById('demoNetto').value || 0;
    if(clientIndex === '' || fabricIndex === '' ){ alert('Klient va Mato tanlang'); return; }
    omborDemo.push({ clientIndex:+clientIndex, fabricIndex:+fabricIndex, modelIndex: modelIndex===''?null:+modelIndex, netto });
    save(OMBOR_DEMO_KEY, omborDemo);
    document.getElementById('omborDemoForm').reset();
    renderAll();
  });

  // Buyurtma demo submit
  document.getElementById('buyurtmaDemoForm').addEventListener('submit', e=>{
    e.preventDefault();
    const clientIndex = document.getElementById('selectClientForBuyurtma').value;
    const modelIndex = document.getElementById('selectModelForBuyurtma').value;
    const qty = +document.getElementById('demoOrderQty').value || 0;
    if(clientIndex === '' || modelIndex === '' || qty<=0){ alert('Klient, model va miqdor kiriting'); return; }
    buyurtmaDemo.push({ clientIndex:+clientIndex, modelIndex:+modelIndex, qty });
    save(BUYURTMA_DEMO_KEY, buyurtmaDemo);
    document.getElementById('buyurtmaDemoForm').reset();
    renderAll();
  });

  // ----------------- Table actions (delete) -----------------
  document.body.addEventListener('click', (ev)=>{
    const btn = ev.target.closest('button[data-type]');
    if(!btn) return;
    const idx = Number(btn.dataset.i);
    const type = btn.dataset.type;
    if(type === 'del-client'){
      if(!confirm('Klientni o‘chirilsinmi?')) return;
      clients.splice(idx,1); save(CLIENTS_KEY, clients); renderAll();
    }
    if(type === 'del-fabric'){
      if(!confirm('Matoni o‘chirilsinmi?')) return;
      fabrics.splice(idx,1); save(FABRICS_KEY, fabrics); renderAll();
    }
    if(type === 'del-model'){
      if(!confirm('Modelni o‘chirilsinmi?')) return;
      models.splice(idx,1); save(MODELS_KEY, models); renderAll();
    }
  });

  // ----------------- Utilities -----------------
  function escapeHtml(str){
    if(!str && str!==0) return '';
    return String(str).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  }

  // Initial render
  renderAll();

}); // DOMContentLoaded end



