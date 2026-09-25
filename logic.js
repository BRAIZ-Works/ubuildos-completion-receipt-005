(function(global){
  "use strict";
  const STATES=["NEW","WAITING","DUE","WON","LOST"];
  const TERMINAL=new Set(["WON","LOST"]);
  const FIXTURES=Object.freeze([
    Object.freeze({id:"lead-001",label:"Northwind Labs",state:"NEW",dueDate:"2026-09-27",notes:"Send concise follow-up with agreed next step.",updatedAt:"2026-09-25T09:10:44-04:00"}),
    Object.freeze({id:"lead-002",label:"Atlas Studio",state:"WAITING",dueDate:"2026-09-24",notes:"Waiting on budget owner confirmation.",updatedAt:"2026-09-25T09:10:44-04:00"}),
    Object.freeze({id:"lead-003",label:"Juniper Works",state:"DUE",dueDate:"2026-09-25",notes:"Follow up today with proof link.",updatedAt:"2026-09-25T09:10:44-04:00"}),
    Object.freeze({id:"lead-004",label:"Signal Foundry",state:"WON",dueDate:"2026-09-20",notes:"Converted to next-step kickoff.",updatedAt:"2026-09-25T09:10:44-04:00"}),
    Object.freeze({id:"lead-005",label:"Harbor Systems",state:"LOST",dueDate:"2026-09-21",notes:"Closed after explicit no-go.",updatedAt:"2026-09-25T09:10:44-04:00"})
  ]);
  function cloneFixtures(){return FIXTURES.map(x=>({...x}));}
  function normalizeRecord(r){
    if(!r||typeof r!=="object") throw new Error("record_required");
    const id=String(r.id||"").trim(), label=String(r.label||"").trim(), state=String(r.state||"").trim().toUpperCase();
    const dueDate=String(r.dueDate||"").trim(), notes=String(r.notes||"").trim(), updatedAt=String(r.updatedAt||"").trim();
    if(!id||!label) throw new Error("id_and_label_required");
    if(!STATES.includes(state)) throw new Error("invalid_state");
    if(dueDate && !/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) throw new Error("invalid_due_date");
    return {id,label,state,dueDate,notes,updatedAt};
  }
  function isOverdue(record,todayISO){
    const r=normalizeRecord(record); const today=String(todayISO||"");
    if(TERMINAL.has(r.state) || !r.dueDate || !/^\d{4}-\d{2}-\d{2}$/.test(today)) return false;
    return r.dueDate < today;
  }
  function move(record,newState,updatedAt){
    const r=normalizeRecord(record); const state=String(newState||"").trim().toUpperCase();
    if(!STATES.includes(state)) throw new Error("invalid_state");
    return {...r,state,updatedAt:String(updatedAt||r.updatedAt)};
  }
  function stableSort(records){return records.map(normalizeRecord).sort((a,b)=>a.id.localeCompare(b.id));}
  function csvEscape(v){const s=String(v??""); return /[",\n\r]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s;}
  function toCSV(records,todayISO){
    const header=["id","label","state","due_date","overdue","notes","updated_at"];
    const rows=stableSort(records).map(r=>[r.id,r.label,r.state,r.dueDate,isOverdue(r,todayISO)?"true":"false",r.notes,r.updatedAt]);
    return [header,...rows].map(row=>row.map(csvEscape).join(",")).join("\n")+"\n";
  }
  function boardCounts(records){const out=Object.fromEntries(STATES.map(s=>[s,0])); stableSort(records).forEach(r=>out[r.state]++); return out;}
  const api={STATES,FIXTURES,cloneFixtures,normalizeRecord,isOverdue,move,stableSort,toCSV,boardCounts};
  if(typeof module!=="undefined"&&module.exports) module.exports=api; else global.LeadBoardLogic=api;
})(typeof window!=="undefined"?window:globalThis);