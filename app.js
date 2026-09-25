(()=>{
"use strict";
const L=window.LeadBoardLogic, KEY="ubuildos-day04-lead-board-v1";
let records=load();
function today(){const d=new Date(); return [d.getFullYear(),String(d.getMonth()+1).padStart(2,"0"),String(d.getDate()).padStart(2,"0")].join("-");}
function now(){return new Date().toISOString();}
function load(){try{const x=JSON.parse(localStorage.getItem(KEY)||"null"); if(Array.isArray(x)) return x.map(L.normalizeRecord);}catch(e){} return L.cloneFixtures();}
function save(){localStorage.setItem(KEY,JSON.stringify(records));}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function render(){
 const board=document.getElementById("board"); board.innerHTML="";
 for(const state of L.STATES){
  const col=document.createElement("section"); col.className="column"; col.dataset.state=state;
  const list=records.filter(r=>r.state===state).sort((a,b)=>a.id.localeCompare(b.id));
  col.innerHTML=`<header><h2>${state}</h2><span>${list.length}</span></header><div class="cards"></div>`;
  const cards=col.querySelector(".cards");
  for(const r of list){const overdue=L.isOverdue(r,today()); const card=document.createElement("article"); card.className="card"+(overdue?" overdue":"");
   card.innerHTML=`<div class="card-top"><strong>${esc(r.label)}</strong><button class="icon" data-remove="${esc(r.id)}" aria-label="Remove ${esc(r.label)}">×</button></div><div class="meta">${esc(r.id)} · due ${esc(r.dueDate||"none")}${overdue?' · <b>OVERDUE</b>':''}</div><textarea data-notes="${esc(r.id)}" aria-label="Notes for ${esc(r.label)}">${esc(r.notes)}</textarea><label>Move<select data-move="${esc(r.id)}">${L.STATES.map(s=>`<option ${s===r.state?'selected':''}>${s}</option>`).join('')}</select></label>`;
   cards.appendChild(card);
  }
  board.appendChild(col);
 }
 document.getElementById("status").textContent=`${records.length} synthetic leads · local-only · ${today()}`;
}
function add(){const n=records.length+1; const id=`lead-${String(n+100).padStart(3,'0')}`; records.push({id,label:`Synthetic Lead ${n}`,state:"NEW",dueDate:today(),notes:"Add the next follow-up step.",updatedAt:now()});save();render();}
function exportCSV(){const blob=new Blob([L.toCSV(records,today())],{type:"text/csv;charset=utf-8"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="lead-follow-up-board.csv";a.click();URL.revokeObjectURL(a.href);}
document.addEventListener("change",e=>{if(e.target.matches("select[data-move]")){const id=e.target.dataset.move; records=records.map(r=>r.id===id?L.move(r,e.target.value,now()):r);save();render();}});
document.addEventListener("input",e=>{if(e.target.matches("textarea[data-notes]")){const id=e.target.dataset.notes; records=records.map(r=>r.id===id?{...r,notes:e.target.value,updatedAt:now()}:r);save();}});
document.addEventListener("click",e=>{const rid=e.target.dataset.remove;if(rid){records=records.filter(r=>r.id!==rid);save();render();}});
document.getElementById("add").onclick=add;document.getElementById("export").onclick=exportCSV;document.getElementById("reset").onclick=()=>{if(confirm("Reset to the exact synthetic fixture set?")){records=L.cloneFixtures();save();render();}};
render();
})();