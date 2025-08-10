fetch('nes_famicom_full_prelim.csv')
  .then(r=>r.text())
  .then(txt=>{
    const rows = txt.trim().split('\n').map(r=>r.split(','));
    const header = rows[0];
    const body = rows.slice(1);
    const tbody = document.querySelector('#gamesTable tbody');
    body.forEach(cols=>{
      const tr = document.createElement('tr');
      header.forEach((h,idx)=>{
        const td = document.createElement('td');
        const v = cols[idx]||'';
        if(h==='Confidence'){
          const span = document.createElement('span');
          span.className = 'badge ' + v;
          span.textContent = v;
          td.appendChild(span);
        }else{
          td.textContent = v;
        }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  });

function searchTable(){
  const q = document.getElementById('searchInput').value.toLowerCase();
  document.querySelectorAll('#gamesTable tbody tr').forEach(row=>{
    row.style.display = row.textContent.toLowerCase().includes(q)?'':'none';
  });
}

function sortTable(colIndex){
  const table = document.getElementById('gamesTable');
  const tbody = table.tBodies[0];
  const rows = Array.from(tbody.querySelectorAll('tr'));
  const dir = table.getAttribute('data-sort-dir')==='asc'?'desc':'asc';
  table.setAttribute('data-sort-dir',dir);
  rows.sort((a,b)=>{
    const x = a.children[colIndex].textContent.trim().toLowerCase();
    const y = b.children[colIndex].textContent.trim().toLowerCase();
    const nx = parseFloat(x); const ny = parseFloat(y);
    const bothNum = !Number.isNaN(nx) && !Number.isNaN(ny);
    if(bothNum) return (nx-ny)*(dir==='asc'?1:-1);
    return x.localeCompare(y)*(dir==='asc'?1:-1);
  });
  rows.forEach(r=>tbody.appendChild(r));
}