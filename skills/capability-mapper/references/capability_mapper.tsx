import { useState, useEffect } from "react";
import React from "react";

var STEPS = [
  { id:"context",      label:"Context",      icon:"🏢" },
  { id:"problems",     label:"Problems",     icon:"🔍" },
  { id:"rootcause",    label:"Root Cause",   icon:"🌱" },
  { id:"capabilities", label:"Capabilities", icon:"⚙️" },
  { id:"priorities",   label:"Priorities",   icon:"🎯" },
  { id:"summary",      label:"Summary",      icon:"📄" },
];

var CLUSTERS = ["Customer & Revenue","Planning & Forecasting","Partner Collaboration","Risk & Compliance","Operations & Execution","Operating Model"];
var CLUSTER_COLORS = {
  "Customer & Revenue": { hex:"#2e4a52", light:"#e8eff1", text:"#2e4a52" },
  "Planning & Forecasting":              { hex:"#3d2b5e", light:"#ede9f5", text:"#3d2b5e" },
  "Partner Collaboration":  { hex:"#4a6741", light:"#eaf0e9", text:"#4a6741" },
  "Risk & Compliance":            { hex:"#7a2020", light:"#f5e9e9", text:"#7a2020" },
  "Operations & Execution":             { hex:"#7a6020", light:"#f5f0e4", text:"#7a6020" },
  "Operating Model":       { hex:"#3a3a3a", light:"#f0f0f0", text:"#3a3a3a" },
};
var B = { sage:"#4a6741", cadet:"#112D4E", violet:"#3d2b5e", gold:"#7a6020", carbon:"#3a3a3a", light:"#d4d4d4", white:"#ffffff", bg:"#f5f5f4", border:"#e5e5e5", text:"#1a1a1a", muted:"#6b6b6b" };
var S = {
  page:   { background:B.bg, minHeight:"100vh", fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", color:B.text },
  card:   { background:B.white, border:"1px solid "+B.border, borderRadius:12, padding:24 },
  input:  { width:"100%", border:"1px solid "+B.border, borderRadius:6, padding:"7px 10px", fontSize:13, color:B.text, background:B.white, outline:"none", boxSizing:"border-box" },
  label:  { display:"block", fontSize:11, fontWeight:600, color:B.muted, marginBottom:4, textTransform:"uppercase", letterSpacing:"0.05em" },
  section:{ fontSize:16, fontWeight:600, color:B.carbon, marginBottom:4 },
  sub:    { fontSize:12, color:B.muted, marginBottom:16 },
};

// ── Capability frameworks ─────────────────────────────────────
// TECH_CAP_MAP is the SELLER'S OWN product capability list, grouped by domain.
// Before rendering, replace the illustrative entries below with the user's
// capability list (from the conversation or their deal folder). Keep the shape:
// { "Domain name": ["Capability", ...], ... }
var TECH_CAP_MAP = {
  "Capture & Ingest Data":        ["Data Import","Integrations & APIs","Document Capture","Master Data Management"],
  "Plan & Forecast":              ["Forecasting","Scenario Planning","Budgeting","Capacity Planning"],
  "Automate Workflows":           ["Workflow Automation","Approvals","Rules Engine","Exception Management"],
  "Collaborate with Partners":    ["Partner Portal","Shared Workspaces","Notifications & Alerts","Self-Service"],
  "Manage Risk & Compliance":     ["Audit Trail","Policy Controls","Screening & Checks","Regulatory Reporting"],
  "Analyse & Report":             ["Dashboards","KPI Tracking","Advanced Analytics","AI Insights"],
};
// OPS_CAP_MAP is a vendor-neutral operating-model framework. Keep or adapt it.
var OPS_CAP_MAP = {
  "Platform":   ["Analytics and Dashboards","Single view of data","Orchestrate & Execute","Integration - Portal, Excel, Mail","Data quality","AI enabled"],
  "Processes":  ["Cross functional","New ways of working","Human + Machine","Automated Processes"],
  "Governance": ["Decision Boards","Cross functional teams","Central Specialized Teams","Executive Sponsorship","Board Awareness","Regional vs Central"],
  "People":     ["Adoption","Change management","Domain Upskilling","AI upskilling","Systems upskilling"],
  "Network":    ["Supplier Network","Partner Network","Customer network","Channel network"],
};
var ALL_TECH_CAPS = Object.keys(TECH_CAP_MAP).reduce(function(a,k){return a.concat(TECH_CAP_MAP[k]);},[]);
var ALL_OPS_CAPS  = Object.keys(OPS_CAP_MAP).reduce(function(a,k){return a.concat(OPS_CAP_MAP[k]);},[]);
var HEAT_LEVELS = ["none","low","medium","high","critical"];
var HEAT_COLORS = {
  none:     {bg:"#ebebeb",text:"#888888",label:"—"},
  // Heat = urgency of the problem cluster: Low is calm (green), Critical is hot (red).
  low:      {bg:"#7dba6f",text:"#ffffff",label:"Low"},
  medium:   {bg:"#f1c40f",text:"#1a1a1a",label:"Medium"},
  high:     {bg:"#e67e22",text:"#ffffff",label:"High"},
  critical: {bg:"#c0392b",text:"#ffffff",label:"Critical"},
};
var DOMAIN_SHORT = {
  "Capture & Ingest Data":"Data","Plan & Forecast":"Planning","Automate Workflows":"Workflows",
  "Collaborate with Partners":"Partners","Manage Risk & Compliance":"Risk","Analyse & Report":"Analytics",
  "Platform":"Platform","Processes":"Processes","Governance":"Governance","People":"People","Network":"Network",
};
var API_URL   = "https://api.anthropic.com/v1/messages";
// MODEL — the ONE place the Claude model ID is set. Change it here only (e.g. to the
// current Sonnet model ID from the Anthropic docs); nothing else in this file names a model.
var MODEL     = "claude-sonnet-5";
var STORE_KEY = "sessions";

// ── API / Storage ─────────────────────────────────────────────
function callClaude(sys,user){
  return fetch(API_URL,{method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({model:MODEL,max_tokens:1000,system:sys,messages:[{role:"user",content:user}]})})
    .then(function(r){return r.json();}).then(function(d){return(d.content&&d.content[0])?d.content[0].text:"";});
}
function parseHeat(text,valid){
  try{var p=JSON.parse(text.replace(/```json|```/g,"").trim());var o={};
    Object.keys(p).forEach(function(k){if(valid.includes(k)&&HEAT_LEVELS.includes(p[k]))o[k]=p[k];});
    return Object.keys(o).length?o:null;}catch(e){return null;}
}
function loadSessions(){return window.storage.get(STORE_KEY).then(function(r){return r?JSON.parse(r.value):[];}).catch(function(){return[];});}
function saveSessions(s){return window.storage.set(STORE_KEY,JSON.stringify(s));}

// ── Heatmap formula ───────────────────────────────────────────
function computeHeatmap(capMap,allData){
  var problems=(allData.problems&&allData.problems.problems)?allData.problems.problems:[];
  var capItems=(allData.capabilities&&allData.capabilities.capabilities)?allData.capabilities.capabilities:{};
  var priorities=(allData.priorities&&allData.priorities.priorities)?allData.priorities.priorities:[];
  var allCaps=Object.keys(capMap).reduce(function(a,k){return a.concat(capMap[k]);},[]);
  var capToPri={};
  allCaps.forEach(function(cap){capToPri[cap]=[];});
  problems.forEach(function(p){
    var caps=capItems[p]||[];var pri=priorities.find(function(x){return x.problem===p;})||{};
    var impact=pri.impact||"Low";var urgency=pri.urgency||"Low";
    (Array.isArray(caps)?caps:[]).forEach(function(item){
      if(!item||!capToPri[item.cap])return;
      if(capMap===TECH_CAP_MAP&&item.framework!=="tech")return;
      if(capMap===OPS_CAP_MAP&&item.framework!=="ops")return;
      capToPri[item.cap].push({impact:impact,urgency:urgency});
    });
  });
  var result={};
  allCaps.forEach(function(cap){
    var e=capToPri[cap];if(!e.length){result[cap]="none";return;}
    var count=e.length;
    var hiI=e.some(function(x){return x.impact==="High";});
    var hiU=e.some(function(x){return x.urgency==="High";});
    var mI=e.some(function(x){return x.impact==="Medium";});
    var mU=e.some(function(x){return x.urgency==="Medium";});
    if(count>=2||(hiI&&hiU))result[cap]="critical";
    else if(hiI||hiU)result[cap]="high";
    else if(mI||mU)result[cap]="medium";
    else result[cap]="low";
  });
  return result;
}

// ── Collapse ──────────────────────────────────────────────────
var CollapseCtx=React.createContext(null);
function CollapseController(props){
  var fs=useState(null);var st=fs[0];var setSt=fs[1];
  var trigger=function(v){setSt(v);setTimeout(function(){setSt(null);},50);};
  return React.createElement(CollapseCtx.Provider,{value:st},
    React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:8}},
      React.createElement("button",{onClick:function(){trigger(true);},style:{background:"none",border:"none",cursor:"pointer",fontSize:11,color:B.muted,padding:"2px 6px"}},"▼ Expand all"),
      React.createElement("span",{style:{color:B.light,fontSize:10}},"|"),
      React.createElement("button",{onClick:function(){trigger(false);},style:{background:"none",border:"none",cursor:"pointer",fontSize:11,color:B.muted,padding:"2px 6px"}},"▶ Collapse all")
    ),props.children);
}
function Collapse(props){
  var os=useState(props.defaultOpen!==undefined?props.defaultOpen:true);var open=os[0];var setOpen=os[1];
  var force=React.useContext(CollapseCtx);
  useEffect(function(){if(force!==null)setOpen(force);},[force]);
  return(
    <div style={{border:"1px solid "+B.border,borderRadius:8,overflow:"hidden",marginBottom:6}}>
      <button onClick={function(){setOpen(function(o){return !o;});}}
        style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 12px",background:B.white,border:"none",cursor:"pointer",textAlign:"left"}}>
        <span style={{display:"flex",alignItems:"center",gap:8,fontSize:12,fontWeight:600,color:B.carbon}}>
          <span style={{fontSize:9,transform:open?"rotate(90deg)":"rotate(0deg)",display:"inline-block",transition:"transform 0.15s"}}>▶</span>
          {props.title}
          {props.badge!=null&&<span style={{fontSize:10,background:B.bg,color:B.muted,padding:"1px 6px",borderRadius:10,fontWeight:400}}>{props.badge}</span>}
        </span>
        <span style={{fontSize:10,color:B.light}}>{open?"▲":"▼"}</span>
      </button>
      {open&&<div style={{padding:"10px 12px",background:B.white,borderTop:"1px solid "+B.border}}>{props.children}</div>}
    </div>
  );
}

// ── Primitives ────────────────────────────────────────────────
function Card(props){return <div style={Object.assign({},S.card,props.style||{})}>{props.children}</div>;}
function Btn(props){
  var v=props.variant||"primary";
  var base={border:"none",borderRadius:6,cursor:"pointer",fontWeight:500,display:"inline-flex",alignItems:"center",gap:4,transition:"opacity 0.15s",fontSize:props.small?11:12,padding:props.small?"4px 10px":"6px 14px"};
  var styles={primary:{background:B.carbon,color:B.white},secondary:{background:B.light,color:B.carbon},ghost:{background:"transparent",color:B.muted},danger:{background:"#f5e9e9",color:"#7a2020"},sage:{background:B.sage,color:B.white}};
  var st=Object.assign({},base,styles[v]||styles.primary,props.disabled||props.loading?{opacity:0.5,cursor:"not-allowed"}:{});
  return <button style={st} onClick={props.onClick} disabled={props.disabled||props.loading}>{props.loading?"⏳ …":props.children}</button>;
}
function Input(props){return <input style={Object.assign({},S.input,props.style||{})} placeholder={props.placeholder} value={props.value||""} onChange={props.onChange} onKeyDown={props.onKeyDown}/>;}
function Textarea(props){return <textarea style={Object.assign({},S.input,{resize:props.resize||"vertical",minHeight:props.minHeight||80},props.style||{})} placeholder={props.placeholder} value={props.value||""} onChange={props.onChange} rows={props.rows||3}/>;}
function EditableItem(props){
  var es=useState(false);var editing=es[0];var setEditing=es[1];
  var ds=useState(props.value||"");var draft=ds[0];var setDraft=ds[1];
  return(
    <div style={{display:"flex",alignItems:"flex-start",gap:6}}>
      {editing?(
        <>
          <textarea style={Object.assign({},S.input,{flex:1,resize:"none",minHeight:48})} value={draft} onChange={function(e){setDraft(e.target.value);}}/>
          <Btn small variant="sage" onClick={function(){props.onChange(draft);setEditing(false);}}>Save</Btn>
          <Btn small variant="secondary" onClick={function(){setDraft(props.value||"");setEditing(false);}}>×</Btn>
        </>
      ):(
        <div style={{display:"flex",alignItems:"flex-start",gap:6,width:"100%"}}>
          <p style={{flex:1,fontSize:13,color:props.value?B.text:B.light,margin:0,paddingTop:2,fontStyle:props.value?"normal":"italic"}}>{props.value||props.placeholder}</p>
          <Btn small variant="ghost" onClick={function(){setEditing(true);}}>✏️</Btn>
          {props.onRemove&&<Btn small variant="ghost" onClick={props.onRemove}>🗑</Btn>}
        </div>
      )}
    </div>
  );
}
function ClusterPill(props){
  var c=CLUSTER_COLORS[props.cluster]||{hex:B.carbon,light:B.bg,text:B.carbon};
  return <span style={{display:"inline-flex",alignItems:"center",background:c.light,color:c.text,fontSize:10,fontWeight:600,padding:"2px 8px",borderRadius:10,border:"1px solid "+c.hex+"33",whiteSpace:"nowrap"}}>{props.cluster}</span>;
}
function ClusterSelector(props){
  return(
    <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
      {CLUSTERS.map(function(cl){
        var c=CLUSTER_COLORS[cl];var active=props.value===cl;
        return <button key={cl} onClick={function(){props.onChange(cl);}}
          style={{fontSize:10,fontWeight:600,padding:"3px 10px",borderRadius:10,border:"1px solid "+(active?c.hex:B.border),background:active?c.hex:B.white,color:active?"#fff":c.text,cursor:"pointer"}}>{active?"✓ ":""}{cl}</button>;
      })}
    </div>
  );
}
function CapabilitySelector(props){
  var ts=useState("tech");var tab=ts[0];var setTab=ts[1];
  var capMap=tab==="tech"?TECH_CAP_MAP:OPS_CAP_MAP;
  var toggle=function(cap){var e=props.selected.find(function(x){return x.cap===cap;});props.onChange(e?props.selected.filter(function(x){return x.cap!==cap;}):props.selected.concat([{cap:cap,framework:tab}]));};
  var techSel=props.selected.filter(function(x){return x.framework==="tech";});
  var opsSel=props.selected.filter(function(x){return x.framework==="ops";});
  return(
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      <div style={{display:"flex",flexWrap:"wrap",gap:4,minHeight:24}}>
        {!props.selected.length&&<span style={{fontSize:11,color:B.light,fontStyle:"italic"}}>No capabilities selected</span>}
        {techSel.map(function(item){return <span key={item.cap} style={{display:"inline-flex",alignItems:"center",gap:4,background:CLUSTER_COLORS["Planning & Forecasting"].light,color:CLUSTER_COLORS["Planning & Forecasting"].text,fontSize:10,fontWeight:500,padding:"2px 8px",borderRadius:10}}>🖥️ {item.cap}<button onClick={function(){toggle(item.cap);}} style={{background:"none",border:"none",cursor:"pointer",color:B.muted,fontSize:12,padding:0}}>×</button></span>;})}
        {opsSel.map(function(item){return <span key={item.cap} style={{display:"inline-flex",alignItems:"center",gap:4,background:CLUSTER_COLORS["Operations & Execution"].light,color:CLUSTER_COLORS["Operations & Execution"].text,fontSize:10,fontWeight:500,padding:"2px 8px",borderRadius:10}}>🏗️ {item.cap}<button onClick={function(){toggle(item.cap);}} style={{background:"none",border:"none",cursor:"pointer",color:B.muted,fontSize:12,padding:0}}>×</button></span>;})}
      </div>
      <div style={{border:"1px solid "+B.border,borderRadius:8,overflow:"hidden"}}>
        <div style={{display:"flex",borderBottom:"1px solid "+B.border}}>
          {[{id:"tech",label:"🖥️ Technology",color:B.cadet},{id:"ops",label:"🏗️ Operating Model",color:B.gold}].map(function(f){return(
            <button key={f.id} onClick={function(){setTab(f.id);}} style={{flex:1,padding:"6px 8px",fontSize:11,fontWeight:600,border:"none",cursor:"pointer",background:tab===f.id?f.color:B.bg,color:tab===f.id?"#fff":B.muted}}>
              {f.label} <span style={{fontSize:10,padding:"1px 5px",borderRadius:8,background:tab===f.id?"rgba(255,255,255,0.25)":"transparent"}}>{(f.id==="tech"?techSel:opsSel).length}</span>
            </button>);})}
        </div>
        <div style={{padding:10,maxHeight:200,overflowY:"auto"}}>
          {Object.keys(capMap).map(function(domain){return(
            <div key={domain} style={{marginBottom:10}}>
              <p style={{fontSize:10,fontWeight:700,color:tab==="tech"?B.cadet:B.gold,textTransform:"uppercase",letterSpacing:"0.05em",margin:"0 0 4px"}}>{domain}</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
                {capMap[domain].map(function(cap){var active=props.selected.some(function(x){return x.cap===cap;});var tc=tab==="tech"?B.cadet:B.gold;
                  return <button key={cap} onClick={function(){toggle(cap);}} style={{fontSize:10,padding:"3px 8px",borderRadius:10,border:"1px solid "+(active?tc:B.border),background:active?tc:B.white,color:active?"#fff":B.muted,cursor:"pointer"}}>{active?"✓ ":""}{cap}</button>;})}
              </div>
            </div>);})}
        </div>
      </div>
    </div>
  );
}
function EditableHeatMap(props){
  var color=props.colorScheme==="amber"?B.gold:B.cadet;
  return(
    <div>
      <CollapseController>
        {Object.keys(props.capMap).map(function(domain){
          var caps=props.capMap[domain];
          var rated=caps.filter(function(c){return props.heatData[c]&&props.heatData[c]!=="none";}).length;
          return(
            <Collapse key={domain} title={domain} badge={rated+"/"+caps.length}>
              <div style={{display:"flex",flexDirection:"column",gap:4}}>
                {caps.map(function(cap){
                  var level=props.heatData[cap]||"none";var hc=HEAT_COLORS[level];
                  return(
                    <div key={cap} style={{display:"flex",alignItems:"center",gap:6}}>
                      <span style={{flex:1,fontSize:11,padding:"4px 8px",borderRadius:4,background:hc.bg,color:hc.text,fontWeight:500}}>{cap}</span>
                      <div style={{display:"flex",gap:2}}>
                        {HEAT_LEVELS.map(function(l){var lc=HEAT_COLORS[l];var upd=Object.assign({},props.heatData);upd[cap]=l;
                          return <button key={l} onClick={function(){props.onChange(upd);}} style={{fontSize:10,padding:"2px 7px",borderRadius:10,border:"1px solid "+(level===l?color:B.border),background:level===l?color:B.white,color:level===l?"#fff":B.muted,cursor:"pointer",fontWeight:level===l?600:400}}>{lc.label}</button>;})}
                      </div>
                    </div>);
                })}
              </div>
            </Collapse>);
        })}
      </CollapseController>
      <div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:8}}>
        {HEAT_LEVELS.map(function(k){var hc=HEAT_COLORS[k];return <span key={k} style={{fontSize:10,padding:"2px 8px",borderRadius:10,background:hc.bg,color:hc.text}}>{hc.label}</span>;})}
      </div>
    </div>
  );
}
function HeatLegend(){
  var rows=[{level:"low",rule:"1 problem — Low impact & urgency"},{level:"medium",rule:"1 problem — Medium impact or urgency"},{level:"high",rule:"1 problem — High impact or urgency"},{level:"critical",rule:"2+ problems OR High impact AND urgency"}];
  return(
    <div style={{background:B.bg,border:"1px solid "+B.border,borderRadius:6,padding:"8px 12px",marginBottom:12}}>
      <p style={{fontSize:10,fontWeight:700,color:B.muted,textTransform:"uppercase",letterSpacing:"0.05em",margin:"0 0 4px"}}>Rating Formula</p>
      {rows.map(function(r){var hc=HEAT_COLORS[r.level];return(
        <div key={r.level} style={{display:"flex",alignItems:"center",gap:8,marginBottom:2}}>
          <span style={{fontSize:9,fontWeight:600,padding:"1px 8px",borderRadius:8,background:hc.bg,color:hc.text,minWidth:52,textAlign:"center",flexShrink:0}}>{hc.label}</span>
          <span style={{fontSize:9,color:B.muted}}>{r.rule}</span>
        </div>);})}
    </div>
  );
}

// ── Use Case Matrix ───────────────────────────────────────────
function UseCaseMatrix(props){
  var allData=props.allData;var onNavigate=props.onNavigate;
  var clusters_=(allData.problems&&allData.problems.clusters)?allData.problems.clusters:{};
  var capItems=(allData.capabilities&&allData.capabilities.capabilities)?allData.capabilities.capabilities:{};
  var problems_=(allData.problems&&allData.problems.problems)?allData.problems.problems:[];
  var TECH_DOMAINS=Object.keys(TECH_CAP_MAP);var OPS_DOMAINS=Object.keys(OPS_CAP_MAP);
  var sls=useState(null);var shortLabels=sls[0];var setShortLabels=sls[1];
  useEffect(function(){
    if(problems_.length>0){
      callClaude("For each problem return a 3-5 word summary. Return ONLY a JSON array of strings in the same order. No markdown.",
        "Problems:\n"+problems_.map(function(p,i){return i+": "+p;}).join("\n")+"\n\nReturn JSON array.")
        .then(function(text){try{var p=JSON.parse(text.replace(/```json|```/g,"").trim());setShortLabels(p);}catch(e){setShortLabels(problems_.map(function(p){return p.split(" ").slice(0,4).join(" ");}));}})
        .catch(function(){setShortLabels(problems_.map(function(p){return p.split(" ").slice(0,4).join(" ");}));});
    }
  },[problems_.join("|")]);
  var getLabel=function(i){return(shortLabels&&shortLabels[i])?shortLabels[i]:problems_[i].split(" ").slice(0,4).join(" ");};
  var problemDomains=problems_.reduce(function(acc,p){
    var caps=capItems[p]||[];var active=new Set();
    (Array.isArray(caps)?caps:[]).forEach(function(item){
      if(!item)return;
      if(item.framework==="tech"){TECH_DOMAINS.forEach(function(d){if(TECH_CAP_MAP[d].includes(item.cap))active.add(d);});}
      else{OPS_DOMAINS.forEach(function(d){if(OPS_CAP_MAP[d].includes(item.cap))active.add(d);});}
    });
    acc[p]=active;return acc;
  },{});
  var thS={padding:"6px 8px",fontSize:10,fontWeight:600,textAlign:"center",maxWidth:90,minWidth:70,lineHeight:1.3};
  var tdS={textAlign:"center",padding:"6px 4px"};
  var dot=function(active,color){return active
    ?<span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:18,height:18,borderRadius:"50%",border:"2px solid "+color,background:color+"22"}}><span style={{width:7,height:7,borderRadius:"50%",background:color,display:"block"}}></span></span>
    :<span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:18,height:18,borderRadius:"50%",border:"1px solid "+B.border,opacity:0.3}}><span style={{width:7,height:7,borderRadius:"50%",border:"1px solid "+B.light,display:"block"}}></span></span>;};
  return(
    <div style={{overflowX:"auto",borderRadius:8,border:"1px solid "+B.border}}>
      <table style={{borderCollapse:"collapse",minWidth:Math.max(500,160+problems_.length*85)+"px",fontSize:11}}>
        <thead>
          <tr>
            <th style={Object.assign({},thS,{background:B.carbon,color:"#fff",textAlign:"left",padding:"8px 12px",position:"sticky",left:0,zIndex:2,minWidth:160})}>Capability Clusters</th>
            {problems_.map(function(p,pi){return(
              <th key={p} style={Object.assign({},thS,{background:B.carbon,color:"#fff"})}>
                <button onClick={function(){if(onNavigate)onNavigate(p);}} title={p}
                  style={{background:"none",border:"none",cursor:"pointer",color:"#d4d4d4",fontSize:10,fontWeight:500,lineHeight:1.3,textDecoration:"underline",textDecorationColor:"transparent"}}
                  onMouseOver={function(e){e.currentTarget.style.color="#fff";}}
                  onMouseOut={function(e){e.currentTarget.style.color="#d4d4d4";}}>
                  {getLabel(pi)}
                </button>
              </th>);})}
          </tr>
          <tr>
            <td style={{background:B.carbon,padding:"2px 12px",position:"sticky",left:0,zIndex:2}}></td>
            <td colSpan={problems_.length} style={{background:B.cadet,color:"#fff",fontSize:10,padding:"3px 8px",textAlign:"center",fontWeight:600}}>🖥️ TECHNOLOGY</td>
          </tr>
        </thead>
        <tbody>
          {TECH_DOMAINS.map(function(d,di){return(
            <tr key={d} style={{background:di%2===0?B.white:B.bg}}>
              <td style={{padding:"6px 12px",position:"sticky",left:0,zIndex:1,background:"inherit",borderRight:"1px solid "+B.border}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}><span style={{width:6,height:6,borderRadius:"50%",background:B.cadet,flexShrink:0}}></span><span style={{fontSize:11,color:B.carbon,fontWeight:500}}>{DOMAIN_SHORT[d]||d}</span></div>
              </td>
              {problems_.map(function(p){return <td key={p} style={tdS}>{dot(problemDomains[p]&&problemDomains[p].has(d),B.cadet)}</td>;})}
            </tr>);})}
          <tr><td colSpan={1+problems_.length} style={{background:B.gold,color:"#fff",fontSize:10,padding:"3px 12px",fontWeight:600}}>🏗️ OPERATING MODEL</td></tr>
          {OPS_DOMAINS.map(function(d,di){return(
            <tr key={d} style={{background:di%2===0?B.white:B.bg}}>
              <td style={{padding:"6px 12px",position:"sticky",left:0,zIndex:1,background:"inherit",borderRight:"1px solid "+B.border}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}><span style={{width:6,height:6,borderRadius:"50%",background:B.gold,flexShrink:0}}></span><span style={{fontSize:11,color:B.carbon,fontWeight:500}}>{DOMAIN_SHORT[d]||d}</span></div>
              </td>
              {problems_.map(function(p){return <td key={p} style={tdS}>{dot(problemDomains[p]&&problemDomains[p].has(d),B.gold)}</td>;})}
            </tr>);})}
        </tbody>
      </table>
      <div style={{background:B.bg,padding:"8px 12px",display:"flex",gap:16,flexWrap:"wrap",borderTop:"1px solid "+B.border}}>
        <span style={{display:"flex",alignItems:"center",gap:6,fontSize:10,color:B.muted}}><span style={{width:10,height:10,borderRadius:"50%",background:B.cadet,display:"inline-block"}}></span>Technology</span>
        <span style={{display:"flex",alignItems:"center",gap:6,fontSize:10,color:B.muted}}><span style={{width:10,height:10,borderRadius:"50%",background:B.gold,display:"inline-block"}}></span>Operating Model</span>
        <span style={{fontSize:10,color:B.light,fontStyle:"italic"}}>Click a column header to navigate to that problem</span>
      </div>
    </div>
  );
}

// ── Steps ─────────────────────────────────────────────────────
function StepContext(props){
  var f=function(k,v){var u=Object.assign({},props.data);u[k]=v;props.onChange(u);};
  return(
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      <div><p style={S.section}>Customer Context</p><p style={S.sub}>Basic information to guide the entire workflow.</p></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <div><label style={S.label}>Company Name</label><Input placeholder="e.g. Acme Corp" value={props.data.name||""} onChange={function(e){f("name",e.target.value);}}/></div>
        <div><label style={S.label}>Industry</label><Input placeholder="e.g. Healthcare, Retail" value={props.data.industry||""} onChange={function(e){f("industry",e.target.value);}}/></div>
      </div>
      <div><label style={S.label}>Company Size / Segment</label><Input placeholder="e.g. Enterprise, 500-1000 employees" value={props.data.size||""} onChange={function(e){f("size",e.target.value);}}/></div>
      <div><label style={S.label}>Background & Context</label><Textarea placeholder="Paste meeting notes, background info..." value={props.data.notes||""} rows={4} onChange={function(e){f("notes",e.target.value);}}/></div>
    </div>
  );
}

function StepProblems(props){
  var ls=useState(false);var loading=ls[0];var setLoading=ls[1];
  var ns=useState("");var newItem=ns[0];var setNewItem=ns[1];
  var ncs=useState(CLUSTERS[0]);var newCluster=ncs[0];var setNewCluster=ncs[1];
  var problems=props.data.problems||[];var clusters=props.data.clusters||{};
  var grouped=CLUSTERS.reduce(function(acc,cl){acc[cl]=problems.filter(function(p){return(clusters[p]||CLUSTERS[0])===cl;});return acc;},{});
  var suggest=function(){
    setLoading(true);
    callClaude("Return ONLY a JSON array of 5 problems each assigned to a cluster. Clusters: "+CLUSTERS.join(", ")+". Format: [{\"problem\":\"...\",\"cluster\":\"...\"}]. No markdown.",
      "Customer: "+props.context.name+", Industry: "+props.context.industry+", Size: "+(props.context.size||"")+".\nContext: "+(props.context.notes||"")+"\n\nSuggest 5 key business problems.")
      .then(function(text){
        var parsed=JSON.parse(text.replace(/```json|```/g,"").trim());
        var newProbs=parsed.map(function(x){return x.problem;}).filter(Boolean);
        var newCl=Object.assign({},clusters);
        parsed.forEach(function(x){if(x.problem)newCl[x.problem]=CLUSTERS.includes(x.cluster)?x.cluster:CLUSTERS[0];});
        var merged=problems.concat(newProbs.filter(function(p){return!problems.includes(p);}));
        props.onChange(Object.assign({},props.data,{problems:merged,clusters:newCl}));
      }).catch(function(e){console.error(e);}).finally(function(){setLoading(false);});
  };
  var add=function(){if(!newItem.trim())return;var upd=problems.concat([newItem.trim()]);var updCl=Object.assign({},clusters);updCl[newItem.trim()]=newCluster;props.onChange(Object.assign({},props.data,{problems:upd,clusters:updCl}));setNewItem("");};
  var remove=function(i){var p=problems[i];var upd=problems.filter(function(_,idx){return idx!==i;});var updCl=Object.assign({},clusters);delete updCl[p];props.onChange(Object.assign({},props.data,{problems:upd,clusters:updCl}));};
  var updateP=function(i,v){var old=problems[i];var arr=problems.slice();arr[i]=v;var updCl=Object.assign({},clusters);updCl[v]=updCl[old]||CLUSTERS[0];delete updCl[old];props.onChange(Object.assign({},props.data,{problems:arr,clusters:updCl}));};
  var setCl=function(p,cl){var updCl=Object.assign({},clusters);updCl[p]=cl;props.onChange(Object.assign({},props.data,{clusters:updCl}));};
  return(
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      <div><p style={S.section}>Problem Discovery</p><p style={S.sub}>Problems grouped by cluster.</p></div>
      <Btn onClick={suggest} loading={loading} variant="sage">✨ AI Suggest Problems</Btn>
      {problems.length>0&&(
        <CollapseController>
          {CLUSTERS.map(function(cl){var clP=grouped[cl]||[];var c=CLUSTER_COLORS[cl];return(
            <Collapse key={cl} title={cl} defaultOpen={clP.length>0} badge={clP.length||"0"}>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {!clP.length&&<p style={{fontSize:11,color:B.light,fontStyle:"italic",margin:0}}>No problems.</p>}
                {clP.map(function(p){var gi=problems.indexOf(p);return(
                  <div key={p} style={{borderLeft:"3px solid "+c.hex,padding:"8px 10px",background:c.light,borderRadius:"0 6px 6px 0",display:"flex",flexDirection:"column",gap:6}}>
                    <EditableItem value={p} onChange={function(v){updateP(gi,v);}} onRemove={function(){remove(gi);}} placeholder="Problem statement"/>
                    <div><p style={{fontSize:10,color:B.muted,margin:"0 0 3px",fontWeight:600}}>Move to cluster:</p><ClusterSelector value={clusters[p]||CLUSTERS[0]} onChange={function(cl2){setCl(p,cl2);}}/></div>
                  </div>);})}
              </div>
            </Collapse>);})}
        </CollapseController>
      )}
      {!problems.length&&<p style={{fontSize:12,color:B.light,fontStyle:"italic"}}>No problems added yet.</p>}
      <div style={{border:"1px solid "+B.border,borderRadius:8,padding:12,background:B.white,display:"flex",flexDirection:"column",gap:8}}>
        <p style={{fontSize:11,fontWeight:600,color:B.muted,margin:0,textTransform:"uppercase",letterSpacing:"0.05em"}}>Add manually</p>
        <Input placeholder="Type a problem..." value={newItem} onChange={function(e){setNewItem(e.target.value);}} onKeyDown={function(e){if(e.key==="Enter")add();}}/>
        <div><p style={{fontSize:10,color:B.muted,margin:"0 0 4px"}}>Assign to cluster:</p><ClusterSelector value={newCluster} onChange={setNewCluster}/></div>
        <Btn onClick={add} variant="secondary" small>+ Add</Btn>
      </div>
    </div>
  );
}

function StepRootCause(props){
  var ls=useState(false);var loading=ls[0];var setLoading=ls[1];
  var items=props.data.rootcauses||{};var clusters=props.clusters||{};
  var grouped=CLUSTERS.reduce(function(acc,cl){acc[cl]=props.problems.filter(function(p){return(clusters[p]||CLUSTERS[0])===cl;});return acc;},{});
  var suggest=function(){
    setLoading(true);
    callClaude("For each numbered problem provide one concise root cause (1-2 sentences). Return ONLY a JSON array: [{\"index\":0,\"rootcause\":\"...\"}]. No markdown.",
      "Customer: "+props.context.name+", Industry: "+props.context.industry+".\nProblems:\n"+props.problems.map(function(p,i){return i+": "+p;}).join("\n")+"\n\nReturn root causes as JSON array.")
      .then(function(text){var parsed=JSON.parse(text.replace(/```json|```/g,"").trim());var upd=Object.assign({},items);parsed.forEach(function(item){if(props.problems[item.index])upd[props.problems[item.index]]=item.rootcause;});props.onChange(Object.assign({},props.data,{rootcauses:upd}));})
      .catch(function(e){console.error(e);}).finally(function(){setLoading(false);});
  };
  return(
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      <div><p style={S.section}>Root Cause Analysis</p><p style={S.sub}>Identify the root cause for each problem.</p></div>
      <Btn onClick={suggest} loading={loading} variant="sage">✨ AI Suggest Root Causes</Btn>
      <div>
        {props.problems.length>0&&(
          <CollapseController>
            {CLUSTERS.map(function(cl){var clP=grouped[cl]||[];if(!clP.length)return null;var c=CLUSTER_COLORS[cl];return(
              <Collapse key={cl} title={cl} defaultOpen={false} badge={clP.filter(function(p){return items[p];}).length+"/"+clP.length}>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {clP.map(function(p){return(
                    <div key={p} style={{borderLeft:"3px solid "+c.hex,paddingLeft:10,display:"flex",flexDirection:"column",gap:4}}>
                      <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                        <span style={{fontSize:12,fontWeight:500,color:B.carbon,flex:1}}>{p}</span>
                        <ClusterPill cluster={cl}/>
                      </div>
                      <p style={{fontSize:10,color:B.muted,margin:0,textTransform:"uppercase",fontWeight:600,letterSpacing:"0.04em"}}>Root Cause</p>
                      <EditableItem value={items[p]||""} onChange={function(v){var upd=Object.assign({},items);upd[p]=v;props.onChange(Object.assign({},props.data,{rootcauses:upd}));}} placeholder="Click AI suggest or type..."/>
                    </div>);})}
                </div>
              </Collapse>);})}
          </CollapseController>
        )}
        {!props.problems.length&&<p style={{fontSize:12,color:B.light,fontStyle:"italic"}}>No problems found.</p>}
      </div>
    </div>
  );
}

function StepCapabilities(props){
  var ls=useState(false);var loading=ls[0];var setLoading=ls[1];
  var ss=useState(props.data.extraSource||"");var extraSrc=ss[0];var setExtraSrc=ss[1];
  var ops_=useState({});var openProblems=ops_[0];var setOpenProblems=ops_[1];
  var items=props.data.capabilities||{};var clusters=props.clusters||{};
  var getSelected=function(p){var v=items[p];if(!v)return[];if(Array.isArray(v)&&(!v.length||typeof v[0]==="object"))return v;return(v.map?v:[]).map(function(c){return{cap:c,framework:ALL_TECH_CAPS.includes(c)?"tech":"ops"};});};
  var setSelected=function(p,arr){var upd=Object.assign({},items);upd[p]=arr;props.onChange(Object.assign({},props.data,{capabilities:upd}));};
  useEffect(function(){
    if(props.focusProblem){
      var upd=Object.assign({},openProblems);upd[props.focusProblem]=true;setOpenProblems(upd);
      setTimeout(function(){var el=document.getElementById("cap-"+props.focusProblem.replace(/\W/g,"_"));if(el)el.scrollIntoView({behavior:"smooth",block:"center"});if(props.onFocusHandled)props.onFocusHandled();},150);
    }
  },[props.focusProblem]);
  var suggest=function(){
    setLoading(true);var extra=extraSrc?"\n\nAdditional context:\n"+extraSrc:"";
    callClaude("Map capabilities from BOTH frameworks.\nTECHNOLOGY: "+ALL_TECH_CAPS.join(", ")+"\nOPERATING MODEL: "+ALL_OPS_CAPS.join(", ")+"\nReturn ONLY JSON array: [{\"index\":0,\"tech\":[\"Cap1\"],\"ops\":[\"Cap2\"]}]. Names must match exactly. No markdown.",
      "Customer: "+props.context.name+", Industry: "+props.context.industry+"."+extra+"\nProblems:\n"+props.problems.map(function(p,i){return i+": "+p+" ["+(clusters[p]||"")+"]";}).join("\n")+"\n\nFor each problem pick 2-4 tech and 1-2 ops capabilities.")
      .then(function(text){
        var parsed=JSON.parse(text.replace(/```json|```/g,"").trim());var upd=Object.assign({},items);
        parsed.forEach(function(item){
          if(!props.problems[item.index])return;
          var tech=item.tech||[];var ops2=item.ops||[];var existing=getSelected(props.problems[item.index]);
          var existingCaps=new Set(existing.map(function(x){return x.cap;}));
          var newE=tech.filter(function(c){return ALL_TECH_CAPS.includes(c)&&!existingCaps.has(c);}).map(function(c){return{cap:c,framework:"tech"};}).concat(ops2.filter(function(c){return ALL_OPS_CAPS.includes(c)&&!existingCaps.has(c);}).map(function(c){return{cap:c,framework:"ops"};}));
          upd[props.problems[item.index]]=existing.concat(newE);
        });
        props.onChange(Object.assign({},props.data,{capabilities:upd,extraSource:extraSrc}));
      }).catch(function(e){console.error(e);}).finally(function(){setLoading(false);});
  };
  var grouped=CLUSTERS.reduce(function(acc,cl){acc[cl]=props.problems.filter(function(p){return(clusters[p]||CLUSTERS[0])===cl;});return acc;},{});
  var totalTech=Object.values(items).reduce(function(n,v){return n+(Array.isArray(v)?v.filter(function(x){return x&&x.framework==="tech";}).length:0);},0);
  var totalOps=Object.values(items).reduce(function(n,v){return n+(Array.isArray(v)?v.filter(function(x){return x&&x.framework==="ops";}).length:0);},0);
  return(
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      <div><p style={S.section}>Capability Mapping</p><p style={S.sub}>Map capabilities from both frameworks to each problem.</p></div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        <span style={{fontSize:11,padding:"3px 10px",borderRadius:10,background:CLUSTER_COLORS["Planning & Forecasting"].light,color:CLUSTER_COLORS["Planning & Forecasting"].text,fontWeight:500}}>🖥️ Tech — {totalTech}</span>
        <span style={{fontSize:11,padding:"3px 10px",borderRadius:10,background:CLUSTER_COLORS["Operations & Execution"].light,color:CLUSTER_COLORS["Operations & Execution"].text,fontWeight:500}}>🏗️ Ops — {totalOps}</span>
      </div>
      <div><label style={S.label}>Additional Context (optional)</label><Textarea placeholder="Add meeting notes or specifics..." value={extraSrc} rows={2} onChange={function(e){setExtraSrc(e.target.value);}}/></div>
      <Btn onClick={suggest} loading={loading} variant="sage">✨ AI Map Capabilities</Btn>
      <div>
        {props.problems.length>0&&(
          <CollapseController>
            {CLUSTERS.map(function(cl){var clP=grouped[cl]||[];if(!clP.length)return null;var c=CLUSTER_COLORS[cl];
              var tc=clP.reduce(function(n,p){return n+getSelected(p).filter(function(x){return x.framework==="tech";}).length;},0);
              var oc=clP.reduce(function(n,p){return n+getSelected(p).filter(function(x){return x.framework==="ops";}).length;},0);
              return(
                <Collapse key={cl} title={cl} defaultOpen={false} badge={"🖥️ "+tc+" · 🏗️ "+oc}>
                  <div style={{display:"flex",flexDirection:"column",gap:8}}>
                    {clP.map(function(p){var sel=getSelected(p);var pid="cap-"+p.replace(/\W/g,"_");var focused=openProblems[p];return(
                      <div key={p} id={pid} style={{borderLeft:"3px solid "+c.hex,padding:"8px 10px",borderRadius:"0 6px 6px 0",background:focused?"#f0ede8":B.bg,border:"1px solid "+(focused?B.gold:B.border),borderLeftColor:c.hex,display:"flex",flexDirection:"column",gap:6}}>
                        <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                          <span style={{fontSize:12,fontWeight:500,color:B.carbon,flex:1}}>{p}</span>
                          <ClusterPill cluster={cl}/>
                        </div>
                        <CapabilitySelector selected={sel} onChange={function(arr){setSelected(p,arr);}}/>
                      </div>);})}
                  </div>
                </Collapse>);})}
          </CollapseController>
        )}
        {!props.problems.length&&<p style={{fontSize:12,color:B.light,fontStyle:"italic"}}>No problems found.</p>}
      </div>
    </div>
  );
}

function StepPriorities(props){
  var clusters=props.clusters||{};
  var existingMap={};(props.data.priorities||[]).forEach(function(p){existingMap[p.problem]=p;});
  var priorities=props.problems.map(function(p){return existingMap[p]||{problem:p,impact:"Medium",urgency:"Medium",notes:""};});
  var update=function(i,k,v){var arr=priorities.slice();var item=Object.assign({},arr[i]);item[k]=v;arr[i]=item;props.onChange(Object.assign({},props.data,{priorities:arr}));};
  var levels=["Low","Medium","High"];
  var lColors={Low:B.sage,Medium:B.gold,High:"#7a2020"};
  var grouped=CLUSTERS.reduce(function(acc,cl){acc[cl]=priorities.filter(function(p){return(clusters[p.problem]||CLUSTERS[0])===cl;});return acc;},{});
  return(
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      <div><p style={S.section}>Prioritization</p><p style={S.sub}>Rate each problem by impact and urgency.</p></div>
      <CollapseController>
        {CLUSTERS.map(function(cl){var clI=grouped[cl]||[];if(!clI.length)return null;var c=CLUSTER_COLORS[cl];
          var hi=clI.filter(function(x){return x.impact==="High"||x.urgency==="High";}).length;
          return(
            <Collapse key={cl} title={cl} defaultOpen={false} badge={hi>0?hi+" high":""}>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {clI.map(function(item){var i=priorities.findIndex(function(p){return p.problem===item.problem;});return(
                  <div key={item.problem} style={{borderLeft:"3px solid "+c.hex,paddingLeft:10,display:"flex",flexDirection:"column",gap:8}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                      <span style={{fontSize:12,fontWeight:500,color:B.carbon,flex:1}}>{item.problem}</span>
                      <ClusterPill cluster={cl}/>
                    </div>
                    <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
                      <div style={{display:"flex",alignItems:"center",gap:4}}>
                        <span style={{fontSize:10,color:B.muted,fontWeight:600,minWidth:42}}>Impact</span>
                        {levels.map(function(l){return <button key={l} onClick={function(){update(i,"impact",l);}} style={{fontSize:10,padding:"2px 8px",borderRadius:10,border:"1px solid "+(item.impact===l?lColors[l]:B.border),background:item.impact===l?lColors[l]:B.white,color:item.impact===l?"#fff":B.muted,cursor:"pointer",fontWeight:item.impact===l?600:400}}>{l}</button>;})}
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:4}}>
                        <span style={{fontSize:10,color:B.muted,fontWeight:600,minWidth:42}}>Urgency</span>
                        {levels.map(function(l){return <button key={l} onClick={function(){update(i,"urgency",l);}} style={{fontSize:10,padding:"2px 8px",borderRadius:10,border:"1px solid "+(item.urgency===l?lColors[l]:B.border),background:item.urgency===l?lColors[l]:B.white,color:item.urgency===l?"#fff":B.muted,cursor:"pointer",fontWeight:item.urgency===l?600:400}}>{l}</button>;})}
                      </div>
                    </div>
                    <Input placeholder="Notes..." value={item.notes||""} onChange={function(e){update(i,"notes",e.target.value);}} style={{fontSize:11}}/>
                  </div>);})}
              </div>
            </Collapse>);})}
      </CollapseController>
    </div>
  );
}

function StepSummary(props){
  var ls=useState(false);var loading=ls[0];var setLoading=ls[1];
  var ts=useState("matrix");var tab=ts[0];var setTab=ts[1];
  var techHeat=props.data.techHeatData||{};var opsHeat=props.data.opsHeatData||{};
  var techSummary=props.data.techSummary||"";var opsSummary=props.data.opsSummary||"";
  var generate=function(){
    setLoading(true);
    var problems=(props.allData.problems&&props.allData.problems.problems)?props.allData.problems.problems:[];
    var rootcauses=(props.allData.rootcause&&props.allData.rootcause.rootcauses)?props.allData.rootcause.rootcauses:{};
    var capItems=(props.allData.capabilities&&props.allData.capabilities.capabilities)?props.allData.capabilities.capabilities:{};
    var priorities=(props.allData.priorities&&props.allData.priorities.priorities)?props.allData.priorities.priorities:[];
    var clusters=(props.allData.problems&&props.allData.problems.clusters)?props.allData.problems.clusters:{};
    var block=problems.length?problems.map(function(p){
      var caps=capItems[p]||[];
      var tc=(Array.isArray(caps)?caps:[]).filter(function(x){return x&&x.framework==="tech";}).map(function(x){return x.cap;}).join(", ")||"N/A";
      var oc=(Array.isArray(caps)?caps:[]).filter(function(x){return x&&x.framework==="ops";}).map(function(x){return x.cap;}).join(", ")||"N/A";
      var pri=priorities.find(function(x){return x.problem===p;});
      return "- ["+(clusters[p]||"?")+"] "+p+"\n  Root Cause: "+(rootcauses[p]||"N/A")+"\n  Tech: "+tc+"\n  Ops: "+oc+"\n  Impact: "+(pri?pri.impact:"N/A")+" | Urgency: "+(pri?pri.urgency:"N/A");
    }).join("\n"):"No problems recorded.";
    var ctx="Customer: "+(props.context.name||"N/A")+", Industry: "+(props.context.industry||"N/A")+"\nBackground: "+(props.context.notes||"N/A")+"\n\n"+block;
    var techHeatData=computeHeatmap(TECH_CAP_MAP,props.allData);
    var opsHeatData=computeHeatmap(OPS_CAP_MAP,props.allData);
    var safe=function(promise,field){return promise.then(function(r){return{field:field,value:r&&r.length>20?r:null};}).catch(function(){return{field:field,value:null};});};
    Promise.all([
      safe(callClaude("Write a professional technology capability summary (3-4 paragraphs).",ctx+"\n\nWrite polished technology summary."),"techSummary"),
      safe(callClaude("Write a concise operating model summary (2-3 paragraphs) covering organisation, governance, people and network.",ctx+"\n\nWrite focused operating model summary."),"opsSummary"),
    ]).then(function(results){
      var upd=Object.assign({},props.data,{techHeatData:techHeatData,opsHeatData:opsHeatData});
      results.forEach(function(r){if(r.value!==null)upd[r.field]=r.value;});
      props.onChange(upd);setTab("matrix");
    }).finally(function(){setLoading(false);});
  };
  var hasContent=techSummary||Object.keys(techHeat).length>0;
  var tabs=[{id:"matrix",label:"📊 Matrix"},{id:"tech",label:"🖥️ Tech Heatmap"},{id:"techtext",label:"📄 Tech Summary"},{id:"ops",label:"🏗️ Ops Heatmap"},{id:"opstext",label:"📄 Ops Summary"}];
  return(
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      <div><p style={S.section}>Summary</p><p style={S.sub}>AI generates heatmaps and summaries. Override any rating after generation.</p></div>
      <Btn onClick={generate} loading={loading} variant="sage">✨ Generate Summary &amp; Heatmaps</Btn>
      {hasContent&&(
        <>
          <div style={{display:"flex",gap:2,background:B.bg,border:"1px solid "+B.border,borderRadius:8,padding:3,flexWrap:"wrap"}}>
            {tabs.map(function(t){return <button key={t.id} onClick={function(){setTab(t.id);}} style={{fontSize:11,fontWeight:tab===t.id?600:400,padding:"5px 12px",borderRadius:6,border:"none",cursor:"pointer",background:tab===t.id?B.white:B.bg,color:tab===t.id?B.carbon:B.muted,boxShadow:tab===t.id?"0 1px 3px rgba(0,0,0,0.1)":"none",whiteSpace:"nowrap"}}>{t.label}</button>;})}
          </div>
          {tab==="matrix"&&<UseCaseMatrix allData={props.allData} onNavigate={props.onNavigate}/>}
          {tab==="tech"&&<div style={Object.assign({},S.card,{padding:16})}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <span style={{fontSize:11,fontWeight:600,color:B.cadet,textTransform:"uppercase",letterSpacing:"0.05em"}}>Technology Heatmap — {props.context.name||"Customer"}</span>
              <Btn small variant="secondary" onClick={function(){props.onChange(Object.assign({},props.data,{techHeatData:computeHeatmap(TECH_CAP_MAP,props.allData)}));}}>Recalculate</Btn>
            </div>
            <HeatLegend/>
            <EditableHeatMap capMap={TECH_CAP_MAP} heatData={techHeat} onChange={function(v){props.onChange(Object.assign({},props.data,{techHeatData:v}));}} colorScheme="indigo"/>
          </div>}
          {tab==="techtext"&&<textarea style={Object.assign({},S.input,{minHeight:400,resize:"vertical",lineHeight:1.6})} value={techSummary} onChange={function(e){props.onChange(Object.assign({},props.data,{techSummary:e.target.value}));}}/>}
          {tab==="ops"&&<div style={Object.assign({},S.card,{padding:16})}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <span style={{fontSize:11,fontWeight:600,color:B.gold,textTransform:"uppercase",letterSpacing:"0.05em"}}>Operating Model Heatmap — {props.context.name||"Customer"}</span>
              <Btn small variant="secondary" onClick={function(){props.onChange(Object.assign({},props.data,{opsHeatData:computeHeatmap(OPS_CAP_MAP,props.allData)}));}}>Recalculate</Btn>
            </div>
            <HeatLegend/>
            <EditableHeatMap capMap={OPS_CAP_MAP} heatData={opsHeat} onChange={function(v){props.onChange(Object.assign({},props.data,{opsHeatData:v}));}} colorScheme="amber"/>
          </div>}
          {tab==="opstext"&&<textarea style={Object.assign({},S.input,{minHeight:400,resize:"vertical",lineHeight:1.6})} value={opsSummary} onChange={function(e){props.onChange(Object.assign({},props.data,{opsSummary:e.target.value}));}}/>}
        </>
      )}
      {!hasContent&&<div style={{border:"2px dashed "+B.border,borderRadius:8,padding:32,textAlign:"center",fontSize:12,color:B.light}}>Click Generate to visualise results.</div>}
    </div>
  );
}

// ── Print View ────────────────────────────────────────────────
function PrintView(props){
  var context=props.context;var stepData=props.stepData;var onClose=props.onClose;
  var problems=(stepData.problems&&stepData.problems.problems)?stepData.problems.problems:[];
  var clusters=(stepData.problems&&stepData.problems.clusters)?stepData.problems.clusters:{};
  var rootcauses=(stepData.rootcause&&stepData.rootcause.rootcauses)?stepData.rootcause.rootcauses:{};
  var capItems=(stepData.capabilities&&stepData.capabilities.capabilities)?stepData.capabilities.capabilities:{};
  var priorities=(stepData.priorities&&stepData.priorities.priorities)?stepData.priorities.priorities:[];
  var techHeat=(stepData.summary&&stepData.summary.techHeatData)?stepData.summary.techHeatData:{};
  var opsHeat=(stepData.summary&&stepData.summary.opsHeatData)?stepData.summary.opsHeatData:{};
  var techSummary=(stepData.summary&&stepData.summary.techSummary)?stepData.summary.techSummary:"";
  var opsSummary=(stepData.summary&&stepData.summary.opsSummary)?stepData.summary.opsSummary:"";
  var clHex={"Customer & Revenue":"#2e4a52","Planning & Forecasting":"#3d2b5e","Partner Collaboration":"#4a6741","Risk & Compliance":"#7a2020","Operations & Execution":"#7a6020","Operating Model":"#3a3a3a"};
  var hBg={none:"#ebebeb",low:"#c0392b",medium:"#e67e22",high:"#7dba6f",critical:"#2e7d32"};
  var hTxt={none:"#888",low:"#fff",medium:"#fff",high:"#fff",critical:"#fff"};
  var hLbl={none:"—",low:"Low",medium:"Medium",high:"High",critical:"Critical"};
  var grouped=CLUSTERS.reduce(function(acc,cl){acc[cl]=problems.filter(function(p){return(clusters[p]||CLUSTERS[0])===cl;});return acc;},{});
  var sec=function(title,color,children){return(
    <div style={{marginBottom:24}}>
      <div style={{borderBottom:"2px solid "+(color||"#3a3a3a"),paddingBottom:5,marginBottom:12}}>
        <h2 style={{fontSize:14,fontWeight:700,color:color||"#3a3a3a",margin:0}}>{title}</h2>
      </div>
      {children}
    </div>);};
  var HeatTbl=function(hp){return(
    <div>
      {Object.keys(hp.capMap).map(function(domain){var caps=hp.capMap[domain];var any=caps.some(function(c){return hp.heatData[c]&&hp.heatData[c]!=="none";});return(
        <div key={domain} style={{marginBottom:6}}>
          <div style={{background:hp.color,color:"#fff",fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:3,textTransform:"uppercase",marginBottom:3,display:"inline-block"}}>{domain}</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
            {caps.map(function(cap){var lv=hp.heatData[cap]||"none";if(lv==="none")return null;return(
              <span key={cap} style={{fontSize:9,padding:"2px 8px",borderRadius:10,background:hBg[lv],color:hTxt[lv],fontWeight:600,display:"inline-flex",alignItems:"center",gap:3}}>
                <span style={{fontSize:8,opacity:0.8}}>{hLbl[lv]}</span> {cap}
              </span>);})}
            {!any&&<span style={{fontSize:9,color:"#aaa",fontStyle:"italic"}}>None rated in this domain</span>}
          </div>
        </div>);})}
    </div>);};
  var lgd=function(level,rule){var hc=HEAT_COLORS[level];return(
    <div key={level} style={{display:"flex",alignItems:"center",gap:8,marginBottom:2}}>
      <span style={{fontSize:9,fontWeight:600,padding:"1px 8px",borderRadius:8,background:hc.bg,color:hc.text,minWidth:48,textAlign:"center",flexShrink:0}}>{hc.label}</span>
      <span style={{fontSize:9,color:"#555"}}>{rule}</span>
    </div>);};
  return(
    <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"#fff",zIndex:1000,overflowY:"auto"}}>
      <div style={{position:"sticky",top:0,background:"#3a3a3a",padding:"10px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",zIndex:10}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:12,color:"#fff",fontWeight:600}}>Print View — {context.name||"Capability Map"}</span>
          <span style={{fontSize:11,color:"#aaa"}}>Press Ctrl+P / Cmd+P to print or save as PDF</span>
        </div>
        <button onClick={onClose} style={{background:"none",border:"1px solid #666",color:"#ccc",borderRadius:6,padding:"4px 12px",cursor:"pointer",fontSize:11}}>✕ Close</button>
      </div>
      <div style={{maxWidth:820,margin:"0 auto",padding:"32px 40px",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",color:"#1a1a1a",fontSize:11,lineHeight:1.5}}>
        <div style={{borderBottom:"3px solid #3a3a3a",paddingBottom:20,marginBottom:28}}>
          <p style={{fontSize:10,fontWeight:700,color:"#888",textTransform:"uppercase",letterSpacing:"0.1em",margin:"0 0 8px"}}>Capability Mapping</p>
          <h1 style={{fontSize:26,fontWeight:700,color:"#1a1a1a",margin:"0 0 4px"}}>{context.name||"Customer"}</h1>
          <p style={{fontSize:13,color:"#555",margin:0}}>{context.industry||""}{context.size?" · "+context.size:""}</p>
          <p style={{fontSize:10,color:"#aaa",marginTop:6}}>Generated: {new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}</p>
          {context.notes&&<div style={{marginTop:12,background:"#f5f5f4",borderLeft:"3px solid #d4d4d4",padding:"8px 12px",borderRadius:"0 4px 4px 0"}}><p style={{fontSize:10,color:"#555",margin:0,whiteSpace:"pre-wrap"}}>{context.notes}</p></div>}
        </div>
        {sec("Problem Discovery","#3a3a3a",
          <div>{CLUSTERS.map(function(cl){var clP=grouped[cl]||[];if(!clP.length)return null;var hex=clHex[cl]||"#3a3a3a";return(
            <div key={cl} style={{marginBottom:12}}>
              <div style={{background:hex,color:"#fff",fontSize:9,fontWeight:700,padding:"2px 10px",borderRadius:3,textTransform:"uppercase",marginBottom:5,display:"inline-block"}}>{cl}</div>
              {clP.map(function(p){return(
                <div key={p} style={{borderLeft:"3px solid "+hex,padding:"5px 10px",marginBottom:4,background:"#fafafa",borderRadius:"0 4px 4px 0"}}>
                  <p style={{fontSize:11,fontWeight:600,color:"#1a1a1a",margin:"0 0 2px"}}>{p}</p>
                  {rootcauses[p]&&<p style={{fontSize:10,color:"#555",margin:0}}><strong>Root Cause:</strong> {rootcauses[p]}</p>}
                </div>);})}
            </div>);})}
          </div>
        )}
        {sec("Capability Mapping","#2e4a52",
          <div>{CLUSTERS.map(function(cl){var clP=grouped[cl]||[];if(!clP.length)return null;var hex=clHex[cl]||"#3a3a3a";return(
            <div key={cl} style={{marginBottom:12}}>
              <div style={{background:hex,color:"#fff",fontSize:9,fontWeight:700,padding:"2px 10px",borderRadius:3,textTransform:"uppercase",marginBottom:5,display:"inline-block"}}>{cl}</div>
              {clP.map(function(p){var caps=capItems[p]||[];var tc=(Array.isArray(caps)?caps:[]).filter(function(x){return x&&x.framework==="tech";}).map(function(x){return x.cap;});var oc=(Array.isArray(caps)?caps:[]).filter(function(x){return x&&x.framework==="ops";}).map(function(x){return x.cap;});if(!tc.length&&!oc.length)return null;return(
                <div key={p} style={{borderLeft:"3px solid "+hex,padding:"5px 10px",marginBottom:4,background:"#fafafa",borderRadius:"0 4px 4px 0"}}>
                  <p style={{fontSize:11,fontWeight:600,color:"#1a1a1a",margin:"0 0 2px"}}>{p}</p>
                  {tc.length>0&&<p style={{fontSize:10,color:"#2e4a52",margin:"0 0 1px"}}><strong>🖥️ Tech:</strong> {tc.join(", ")}</p>}
                  {oc.length>0&&<p style={{fontSize:10,color:"#7a6020",margin:0}}><strong>🏗️ Ops:</strong> {oc.join(", ")}</p>}
                </div>);})}
            </div>);})}
          </div>
        )}
        {sec("Prioritization","#7a6020",
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:10}}>
            <thead><tr style={{background:"#7a6020",color:"#fff"}}>
              <th style={{padding:"4px 8px",textAlign:"left"}}>Problem</th>
              <th style={{padding:"4px 8px",textAlign:"left"}}>Cluster</th>
              <th style={{padding:"4px 8px",textAlign:"center"}}>Impact</th>
              <th style={{padding:"4px 8px",textAlign:"center"}}>Urgency</th>
              <th style={{padding:"4px 8px",textAlign:"left"}}>Notes</th>
            </tr></thead>
            <tbody>{problems.map(function(p,i){var pri=priorities.find(function(x){return x.problem===p;})||{};var cl=clusters[p]||CLUSTERS[0];var hex=clHex[cl]||"#3a3a3a";var ic={Low:"#c0392b",Medium:"#e67e22",High:"#2e7d32"};return(
              <tr key={p} style={{background:i%2===0?"#fafafa":"#fff",borderBottom:"1px solid #f0f0f0"}}>
                <td style={{padding:"4px 8px",fontWeight:500}}>{p}</td>
                <td style={{padding:"4px 8px"}}><span style={{background:hex,color:"#fff",fontSize:8,fontWeight:700,padding:"1px 6px",borderRadius:8}}>{cl}</span></td>
                <td style={{padding:"4px 8px",textAlign:"center"}}><span style={{background:ic[pri.impact]||"#ebebeb",color:ic[pri.impact]?"#fff":"#888",fontSize:9,fontWeight:600,padding:"1px 8px",borderRadius:8}}>{pri.impact||"—"}</span></td>
                <td style={{padding:"4px 8px",textAlign:"center"}}><span style={{background:ic[pri.urgency]||"#ebebeb",color:ic[pri.urgency]?"#fff":"#888",fontSize:9,fontWeight:600,padding:"1px 8px",borderRadius:8}}>{pri.urgency||"—"}</span></td>
                <td style={{padding:"4px 8px",color:"#555",fontSize:9}}>{pri.notes||""}</td>
              </tr>);})}
            </tbody>
          </table>
        )}
        {sec("Technology Capability Heatmap","#2e4a52",<div>
          <div style={{background:"#f5f5f4",border:"1px solid #e5e5e5",borderRadius:6,padding:"8px 12px",marginBottom:10}}>
            <p style={{fontSize:9,fontWeight:700,color:"#888",textTransform:"uppercase",margin:"0 0 4px"}}>Rating Formula</p>
            {lgd("low","1 problem — Low impact & urgency")}{lgd("medium","1 problem — Medium impact or urgency")}{lgd("high","1 problem — High impact or urgency")}{lgd("critical","2+ problems OR High impact AND urgency")}
          </div>
          <HeatTbl capMap={TECH_CAP_MAP} heatData={techHeat} color="#2e4a52"/>
        </div>)}
        {sec("Operating Model Heatmap","#7a6020",<div>
          <div style={{background:"#f5f5f4",border:"1px solid #e5e5e5",borderRadius:6,padding:"8px 12px",marginBottom:10}}>
            <p style={{fontSize:9,fontWeight:700,color:"#888",textTransform:"uppercase",margin:"0 0 4px"}}>Rating Formula</p>
            {lgd("low","1 problem — Low impact & urgency")}{lgd("medium","1 problem — Medium impact or urgency")}{lgd("high","1 problem — High impact or urgency")}{lgd("critical","2+ problems OR High impact AND urgency")}
          </div>
          <HeatTbl capMap={OPS_CAP_MAP} heatData={opsHeat} color="#7a6020"/>
        </div>)}
        {techSummary&&sec("Technology Summary","#2e4a52",<p style={{fontSize:11,lineHeight:1.7,color:"#333",whiteSpace:"pre-wrap"}}>{techSummary}</p>)}
        {opsSummary&&sec("Operating Model Summary","#7a6020",<p style={{fontSize:11,lineHeight:1.7,color:"#333",whiteSpace:"pre-wrap"}}>{opsSummary}</p>)}
        <div style={{borderTop:"1px solid #e5e5e5",marginTop:32,paddingTop:10,textAlign:"center"}}>
          <p style={{fontSize:9,color:"#aaa",margin:0}}>Capability Mapping Tool · {context.name} · {new Date().getFullYear()}</p>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html:"@media print{.no-print{display:none!important;}}"}}/>
    </div>
  );
}

// ── Session List ──────────────────────────────────────────────
function SessionList(props){
  var ss=useState(null);var sessions=ss[0];var setSessions=ss[1];
  var ds=useState(null);var deleting=ds[0];var setDeleting=ds[1];
  useEffect(function(){loadSessions().then(setSessions);},[]);
  var remove=function(id){var u=sessions.filter(function(s){return s.id!==id;});setSessions(u);saveSessions(u);setDeleting(null);};
  var exp=function(s){var blob=new Blob([JSON.stringify(s,null,2)],{type:"application/json"});var url=URL.createObjectURL(blob);var a=document.createElement("a");a.href=url;a.download=((s.context&&s.context.name)?s.context.name.replace(/\s+/g,"_"):"session")+".json";a.click();URL.revokeObjectURL(url);};
  return(
    <div style={Object.assign({},S.page,{padding:"32px 24px"})}>
      <div style={{maxWidth:960,margin:"0 auto",display:"flex",flexDirection:"column",gap:20}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <h1 style={{fontSize:20,fontWeight:700,color:B.carbon,margin:0}}>Capability Mapping</h1>
            <p style={{fontSize:12,color:B.muted,margin:"4px 0 0"}}>Create or continue a session.</p>
          </div>
          <Btn variant="sage" onClick={props.onNew}>+ New Session</Btn>
        </div>
        {sessions===null&&<p style={{fontSize:12,color:B.muted}}>Loading...</p>}
        {sessions&&sessions.length===0&&<div style={Object.assign({},S.card,{textAlign:"center",padding:40,color:B.light})}><p style={{fontSize:32,margin:"0 0 8px"}}>🗂️</p><p style={{fontSize:12,margin:0}}>No sessions yet.</p></div>}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
          {sessions&&sessions.map(function(s){return(
            <div key={s.id} style={Object.assign({},S.card,{padding:16,display:"flex",flexDirection:"column",gap:10})}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                <div>
                  <p style={{fontSize:13,fontWeight:600,color:B.carbon,margin:0}}>{(s.context&&s.context.name)||"Unnamed"}</p>
                  <p style={{fontSize:11,color:B.muted,margin:"2px 0 0"}}>{(s.context&&s.context.industry)||"—"}</p>
                  <p style={{fontSize:10,color:B.light,margin:"2px 0 0"}}>{new Date(s.savedAt).toLocaleDateString()}</p>
                </div>
                <div style={{display:"flex",gap:4}}>
                  <Btn small variant="sage" onClick={function(){props.onOpen(s);}}>Open</Btn>
                  <Btn small variant="secondary" onClick={function(){exp(s);}}>⬇️</Btn>
                  <Btn small variant="danger" onClick={function(){setDeleting(s.id);}}>🗑</Btn>
                </div>
              </div>
              <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                <span style={{fontSize:10,background:B.bg,color:B.muted,padding:"2px 6px",borderRadius:8,border:"1px solid "+B.border}}>{(s.stepData&&s.stepData.problems&&s.stepData.problems.problems)?s.stepData.problems.problems.length:0} problems</span>
                {s.stepData&&s.stepData.summary&&s.stepData.summary.techSummary&&<span style={{fontSize:10,background:CLUSTER_COLORS["Partner Collaboration"].light,color:CLUSTER_COLORS["Partner Collaboration"].text,padding:"2px 6px",borderRadius:8}}>✓ Summary</span>}
              </div>
              {deleting===s.id&&<div style={{background:"#f5e9e9",border:"1px solid #e0c0c0",borderRadius:6,padding:"8px 10px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
                <span style={{fontSize:11,color:"#7a2020"}}>Delete permanently?</span>
                <div style={{display:"flex",gap:4}}><Btn small variant="danger" onClick={function(){remove(s.id);}}>Delete</Btn><Btn small variant="secondary" onClick={function(){setDeleting(null);}}>Cancel</Btn></div>
              </div>}
            </div>);})}
        </div>
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────
export default function App(){
  var a0=useState("list");  var screen=a0[0];       var setScreen=a0[1];
  var a1=useState(null);    var sessionId=a1[0];    var setSessionId=a1[1];
  var a2=useState(0);       var step=a2[0];         var setStep=a2[1];
  var a3=useState({});      var context=a3[0];      var setContext=a3[1];
  var a4=useState({problems:{},rootcause:{},capabilities:{},priorities:{},summary:{}});
  var stepData=a4[0];       var setStepData=a4[1];
  var a5=useState(null);    var focusProblem=a5[0]; var setFocusProblem=a5[1];
  var a6=useState(false);   var saving=a6[0];       var setSaving=a6[1];
  var a7=useState("");      var savedMsg=a7[0];     var setSavedMsg=a7[1];
  var a8=useState(false);   var printView=a8[0];    var setPrintView=a8[1];

  var problems=(stepData.problems&&stepData.problems.problems)?stepData.problems.problems:[];
  var clusters=(stepData.problems&&stepData.problems.clusters)?stepData.problems.clusters:{};

  var updateStep=function(key,val){setStepData(function(prev){var u=Object.assign({},prev);u[key]=val;return u;});};
  var newSession=function(){setSessionId(Math.random().toString(36).slice(2));setStep(0);setContext({});setStepData({problems:{},rootcause:{},capabilities:{},priorities:{},summary:{}});setScreen("editor");};
  var openSession=function(s){setSessionId(s.id);setContext(s.context||{});setStepData(s.stepData||{problems:{},rootcause:{},capabilities:{},priorities:{},summary:{}});setStep(0);setScreen("editor");};
  var save=function(){setSaving(true);loadSessions().then(function(sess){var s={id:sessionId,savedAt:new Date().toISOString(),context:context,stepData:stepData};var idx=sess.findIndex(function(x){return x.id===sessionId;});if(idx>=0)sess[idx]=s;else sess.unshift(s);return saveSessions(sess);}).then(function(){setSavedMsg("Saved");setTimeout(function(){setSavedMsg("");},2000);}).finally(function(){setSaving(false);});};
  var canProceed=function(){if(step===0)return context.name&&context.industry;if(step===1)return problems.length>0;return true;};
  var renderStep=function(){
    switch(step){
      case 0:return <StepContext data={context} onChange={setContext}/>;
      case 1:return <StepProblems data={stepData.problems} onChange={function(v){updateStep("problems",v);}} context={context}/>;
      case 2:return <StepRootCause data={stepData.rootcause} onChange={function(v){updateStep("rootcause",v);}} context={context} problems={problems} clusters={clusters}/>;
      case 3:return <StepCapabilities data={stepData.capabilities} onChange={function(v){updateStep("capabilities",v);}} context={context} problems={problems} clusters={clusters} focusProblem={focusProblem} onFocusHandled={function(){setFocusProblem(null);}}/>;
      case 4:return <StepPriorities data={stepData.priorities} onChange={function(v){updateStep("priorities",v);}} problems={problems} clusters={clusters}/>;
      case 5:return <StepSummary data={stepData.summary} onChange={function(v){updateStep("summary",v);}} context={context} allData={stepData} onNavigate={function(p){setFocusProblem(p);setStep(3);}}/>;
      default:return null;
    }
  };

  if(screen==="list") return <SessionList onNew={newSession} onOpen={openSession}/>;
  if(printView===true) return <PrintView context={context} stepData={stepData} onClose={function(){setPrintView(false);}}/>;

  return(
    <div style={S.page}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"20px",display:"flex",flexDirection:"column",gap:16}}>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12}}>
          <div>
            <button onClick={function(){setScreen("list");}} style={{background:"none",border:"none",cursor:"pointer",fontSize:11,color:B.muted,padding:0,marginBottom:4}}>← Sessions</button>
            <h1 style={{fontSize:18,fontWeight:700,color:B.carbon,margin:0}}>Problem Discovery → Capability Mapping</h1>
            {context.name&&<p style={{fontSize:11,color:B.muted,margin:"2px 0 0"}}>{context.name}{context.industry?" · "+context.industry:""}</p>}
          </div>
          <div style={{display:"flex",gap:6,alignItems:"center",paddingTop:4}}>
            {savedMsg&&<span style={{fontSize:11,color:B.sage}}>{savedMsg}</span>}
            <Btn small variant="secondary" onClick={save} loading={saving}>💾 Save</Btn>
            <Btn small variant="secondary" onClick={function(){ setPrintView(true); }}>🖨️ Print</Btn>
          </div>
        </div>
        <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
          <div style={Object.assign({},S.card,{flex:1,minWidth:0})}>{renderStep()}</div>
          <div style={{display:"flex",flexDirection:"column",gap:10,width:180,flexShrink:0}}>
            <div style={Object.assign({},S.card,{padding:10})}>
              {STEPS.map(function(s,i){var active=i===step;var done=i<step;return(
                <button key={s.id} onClick={function(){if(i<=step||canProceed())setStep(i);}}
                  style={{width:"100%",display:"flex",alignItems:"center",gap:8,padding:"6px 8px",borderRadius:6,border:"none",cursor:i<=step?"pointer":"default",background:active?B.carbon:B.white,color:active?"#fff":done?B.carbon:B.light,fontSize:12,fontWeight:active?600:400,marginBottom:2,textAlign:"left"}}>
                  <span style={{fontSize:11}}>{s.icon}</span><span style={{flex:1}}>{s.label}</span>
                  {done&&!active&&<span style={{fontSize:9,color:B.sage}}>✓</span>}
                </button>);})}
            </div>
            {context.name&&<div style={Object.assign({},S.card,{padding:10})}>
              <p style={{fontSize:10,fontWeight:700,color:B.muted,textTransform:"uppercase",letterSpacing:"0.05em",margin:"0 0 8px"}}>{context.name}</p>
              <p style={{fontSize:11,color:B.carbon,margin:"0 0 4px"}}>{problems.length} problems</p>
              {CLUSTERS.map(function(cl){var n=problems.filter(function(p){return(clusters[p]||CLUSTERS[0])===cl;}).length;if(!n)return null;var c=CLUSTER_COLORS[cl];return(
                <div key={cl} style={{display:"flex",alignItems:"center",gap:5,marginBottom:2}}>
                  <span style={{width:6,height:6,borderRadius:"50%",background:c.hex,flexShrink:0}}></span>
                  <span style={{fontSize:10,color:B.muted}}>{cl}: {n}</span>
                </div>);})}
            </div>}
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"space-between"}}>
          <Btn variant="secondary" onClick={function(){setStep(function(s){return s-1;});}} disabled={step===0}>← Back</Btn>
          {step<STEPS.length-1&&<Btn variant="sage" onClick={function(){setStep(function(s){return s+1;});}} disabled={!canProceed()}>Next →</Btn>}
        </div>
      </div>
    </div>
  );
}
