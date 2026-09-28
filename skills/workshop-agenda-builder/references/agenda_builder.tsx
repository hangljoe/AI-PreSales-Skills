import { useState, useEffect, useCallback } from "react";

/* ─── Persistent Storage helpers ─── */
const store = {
  async get(k) { try { const r = await window.storage.get(k); return r ? JSON.parse(r.value) : null; } catch { return null; } },
  async set(k, v) { try { await window.storage.set(k, JSON.stringify(v)); return true; } catch { return false; } },
  async del(k) { try { await window.storage.delete(k); return true; } catch { return false; } },
  async list(prefix) { try { const r = await window.storage.list(prefix); return r?.keys || []; } catch { return []; } },
};

/* ─── Brand colors (corporate palette) ─── */
// Palette: presales-handbook brand (navy #112D4E, yellow #FACF39). Swap for your own brand.
const BRAND = {
  sage: "#6B8E4E", sageLt: "#EBF2E4", sageMd: "#A8BF6E",
  cadet: "#112D4E", cadetLt: "#E3E9F2", cadetMd: "#3F6A9E",
  violet: "#5B2D8E", violetLt: "#ECE4F5", violetMd: "#9B7FC0",
  gold: "#8B7B22", goldLt: "#FEF5D7", goldMd: "#FACF39",
  mint: "#6BADA0", mintLt: "#E4F3F0",
  lime: "#8CC63F", limeLt: "#EDF7E0",
  carbonDk: "#2D2E2C", carbonMed: "#4A4A4A", carbonLt: "#8A8A8A",
  white: "#FFFFFF", offWhite: "#F7F6F3", warmGray: "#EEECE7",
  text: "#322F2F", textMuted: "#6E6E6A",
  breakBg: "#F0EDE6", breakColor: "#9E9A8E",
  inspire: "#112D4E", inspireLt: "#E3E9F2",
};

const CATEGORIES = [
  { label: "Inspire", color: BRAND.mint, colorLt: BRAND.mintLt },
  { label: "Vision", color: BRAND.violet, colorLt: BRAND.violetLt },
  { label: "Value", color: BRAND.lime, colorLt: BRAND.limeLt },
  { label: "Problem", color: BRAND.gold, colorLt: BRAND.goldLt },
  { label: "Capability", color: BRAND.sage, colorLt: BRAND.sageLt },
  { label: "Prioritise", color: BRAND.carbonMed, colorLt: BRAND.warmGray },
  { label: "Next steps", color: BRAND.cadet, colorLt: BRAND.cadetLt },
  { label: "Intro / Closing", color: BRAND.carbonMed, colorLt: BRAND.warmGray },
  { label: "Custom", color: BRAND.violet, colorLt: BRAND.violetLt },
];

const DEFAULT_SECTIONS = [
  { id: "welcome", type: "intro", name: "Welcome & introductions", category: "Intro / Closing", color: BRAND.carbonMed, colorLt: BRAND.warmGray, minutes: 15, enabled: true, description: "Welcome participants, set the scene, introductions round, ground rules, and agenda walkthrough.", activities: ["Sponsor welcome (2 min)", "Participant introductions round", "Ground rules & ways of working", "Agenda overview"], tips: ["Keep intros to name + role + one expectation", "Display the agenda visually on a wall poster", "Establish a 'parking lot' for off-topic items"], roles: "Sponsor (welcome), Facilitator (agenda)", materials: "Printed agenda, name tents, ground rules poster", output: "Aligned group with clear expectations" },
  { id: "outside_in", type: "section", name: "Outside-in perspectives", category: "Inspire", color: BRAND.mint, colorLt: BRAND.mintLt, minutes: 45, enabled: true, description: "Bring external expertise and inspiration to the group before diving into visioning. Share industry challenges, emerging operating models, latest AI advances, or thought-provoking trends relevant to the customer's context.", activities: ["Industry landscape & trends overview (presenter)", "Emerging operating models showcase", "Technology & AI innovation spotlight", "Provocations & 'what if' questions", "Open Q&A and reflection"], tips: ["Tailor content to the customer's industry — generic decks fall flat", "Use real examples and case studies, not theory", "Keep it concise and energising — this is a spark, not a lecture", "End with 2-3 provocative questions to carry into Visioning"], roles: "Presenter / SME (lead), Facilitator (moderator), All participants", materials: "Presentation deck (tailored), industry benchmarks, printed key stats handout", output: "Inspired group with shared external context, 2-3 provocative questions for Visioning" },
  { id: "visioning", type: "section", name: "Visioning & ambitions", category: "Vision", color: BRAND.violet, colorLt: BRAND.violetLt, minutes: 45, enabled: true, description: "Uncover the customer's business vision. Align the team around aspirational keywords.", activities: ["Silent keyword writing (individual)", "Keyword clustering on vision map", "Dot voting on top themes", "Consensus check & lock-in"], tips: ["Let the sponsor vote last to avoid anchoring bias", "If >5 clusters emerge, force a prioritisation round", "Keep it simple — no explanations, just keywords"], roles: "Facilitator (lead), Sponsor (last voter), All participants", materials: "Vision keyword map (A0 poster), sticky notes, dot stickers, sharpies", output: "Prioritised vision keyword map with 3-5 validated clusters" },
  { id: "value_drivers", type: "section", name: "Value drivers", category: "Value", color: BRAND.lime, colorLt: BRAND.limeLt, minutes: 45, enabled: true, description: "Map strategic value imperatives that connect vision to measurable business outcomes.", activities: ["Value tree introduction (facilitator)", "Small group value mapping exercise", "Cross-group share-back & challenge", "Value driver prioritisation"], tips: ["Use the value tree template to keep groups on track", "Challenge vague drivers — push for specificity", "Link every driver back to the vision keywords"], roles: "Facilitator, Small groups (3-4 per group), Note-taker per group", materials: "Value tree templates (A1), markers, timer", output: "Completed value tree with ranked strategic drivers" },
  { id: "break_morning", type: "break", name: "Morning break", category: "Intro / Closing", color: BRAND.breakColor, colorLt: BRAND.breakBg, minutes: 15, enabled: true, description: "Coffee break — allow networking and informal discussion.", activities: [], tips: ["Have coffee/tea ready before the break starts"], roles: "All participants", materials: "Refreshments", output: "" },
  { id: "fishbone", type: "section", name: "Fishbone analysis", category: "Problem", color: BRAND.gold, colorLt: BRAND.goldLt, minutes: 60, enabled: true, description: "Root cause identification using Ishikawa diagram methodology to surface systemic issues.", activities: ["Problem statement framing", "Category brainstorm (6M framework)", "Root cause deep-dive per category", "Cross-pollination & pattern identification"], tips: ["Don't let the group jump to solutions — stay in 'problem mode'", "Use the 5-Why technique if causes are too surface-level"], roles: "Facilitator, Category leads (1 per arm), All participants rotating", materials: "Fishbone template (A0), coloured sticky notes per category, markers", output: "Completed fishbone diagram with prioritised root causes" },
  { id: "problem_statements", type: "section", name: "Problem statements", category: "Problem", color: BRAND.gold, colorLt: BRAND.goldLt, minutes: 45, enabled: true, description: "Transform fishbone outputs into clear, actionable problem statements.", activities: ["Problem statement writing (individual)", "Peer review & refinement in pairs", "Group validation & deduplication", "Final statement selection"], tips: ["Use 'How might we...' format", "Reject statements that are solutions in disguise"], roles: "Facilitator, All participants (individual + pairs)", materials: "Problem statement cards, pens, validation checklist", output: "5-8 validated, actionable problem statements" },
  { id: "break_lunch", type: "break", name: "Lunch break", category: "Intro / Closing", color: BRAND.breakColor, colorLt: BRAND.breakBg, minutes: 45, enabled: true, description: "Lunch break — encourage informal networking.", activities: [], tips: ["Announce restart time clearly before break"], roles: "All participants", materials: "Lunch catering", output: "" },
  { id: "capability_review", type: "section", name: "Capability review", category: "Capability", color: BRAND.sage, colorLt: BRAND.sageLt, minutes: 60, enabled: true, description: "Evaluate existing and required capabilities against problem statements and value drivers.", activities: ["Capability mapping introduction", "Current-state assessment", "Target-state definition", "Gap analysis & heat mapping"], tips: ["Use capability maturity model (1-5 scale)", "Focus on capabilities, not tools"], roles: "Facilitator, Domain experts, All participants", materials: "Capability matrix template, heat map stickers, scoring guide", output: "Capability gap heat map with priority areas" },
  { id: "criteria", type: "section", name: "Criteria definition", category: "Prioritise", color: BRAND.carbonMed, colorLt: BRAND.warmGray, minutes: 30, enabled: true, description: "Establish and weight evaluation criteria for prioritising initiatives.", activities: ["Criteria brainstorm", "Criteria grouping & selection", "Pairwise weighting exercise", "Criteria validation"], tips: ["Limit to 5-7 criteria maximum", "Get sponsor buy-in on weightings"], roles: "Facilitator, Sponsor (validation), All participants", materials: "Criteria cards, weighting matrix", output: "Weighted evaluation criteria set (5-7 criteria)" },
  { id: "break_afternoon", type: "break", name: "Afternoon break", category: "Intro / Closing", color: BRAND.breakColor, colorLt: BRAND.breakBg, minutes: 15, enabled: true, description: "Short coffee break to recharge.", activities: [], tips: ["Keep it short — energy dips here"], roles: "All participants", materials: "Refreshments", output: "" },
  { id: "prioritisation", type: "section", name: "Prioritisation & ranking", category: "Prioritise", color: BRAND.carbonMed, colorLt: BRAND.warmGray, minutes: 60, enabled: true, description: "Score and rank initiatives against weighted criteria.", activities: ["Initiative scoring (individual)", "Score calibration discussion", "Ranking matrix completion", "Top-5 deep dive & validation"], tips: ["Use silent scoring first, then discuss outliers", "The sponsor breaks ties, not the facilitator"], roles: "Facilitator, Sponsor (tie-breaker), All participants (scorers)", materials: "Scoring matrix, calculators, ranking board", output: "Prioritised initiative ranking with scores and rationale" },
  { id: "next_steps", type: "section", name: "Next steps & roadmap", category: "Next steps", color: BRAND.cadet, colorLt: BRAND.cadetLt, minutes: 30, enabled: true, description: "Define action items, assign owners, build implementation timeline.", activities: ["Action item definition per initiative", "Owner assignment & commitment", "Timeline mapping (30/60/90 day)", "Closing round & reflections"], tips: ["Every action needs an owner AND a deadline", "Don't overcommit — focus on top 3-5 actions"], roles: "Facilitator, Sponsor (commitment), All participants (owners)", materials: "Action plan template, timeline board, commitment cards", output: "Signed-off action plan with owners, deadlines, and 90-day roadmap" },
  { id: "closing", type: "intro", name: "Closing & reflections", category: "Intro / Closing", color: BRAND.carbonMed, colorLt: BRAND.warmGray, minutes: 15, enabled: true, description: "Wrap up with reflections, key takeaways, and thank-yous.", activities: ["One-word checkout round", "Sponsor closing remarks", "Feedback form distribution", "Photo & thank-yous"], tips: ["Keep it positive — end on energy", "Confirm follow-up meeting date before people leave"], roles: "Facilitator, Sponsor", materials: "Feedback forms, camera", output: "Participant reflections and feedback collected" },
];

const DEFAULT_SETUP = { customer: "", industry: "", dayHours: [8], participants: "", roles: "", objectives: "", notes: "" };

const DURATION_PRESETS = [
  { label: "Half day", dayHours: [4] },
  { label: "Full day", dayHours: [8] },
  { label: "1.5 days", dayHours: [8, 4] },
  { label: "2 days", dayHours: [8, 8] },
  { label: "3 days", dayHours: [8, 8, 6] },
];

const totalHours = (dh) => dh.reduce((s, h) => s + h, 0);
const durationLabel = (dh) => {
  if (!dh || !dh.length) return "0h";
  if (dh.length === 1) return `${dh[0]}h (1 day)`;
  const allSame = dh.every((h) => h === dh[0]);
  if (allSame) return `${totalHours(dh)}h (${dh.length} days x ${dh[0]}h)`;
  return `${totalHours(dh)}h (${dh.length} days: ${dh.map((h) => h + "h").join(" + ")})`;
};
const dayHoursMatch = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

const formatTime = (minutes) => {
  const h = Math.floor(minutes / 60); const m = minutes % 60;
  return h > 0 ? (m > 0 ? `${h}h ${m}m` : `${h}h`) : `${m}m`;
};
const addTime = (st, min) => {
  const [h, m] = st.split(":").map(Number); const t = h * 60 + m + min;
  return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
};

let _uid = 100;
const uid = () => `s_${Date.now()}_${_uid++}`;
const sessionId = () => `session:${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

const Ic = ({ d, size = 14, color = BRAND.textMuted }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);
const IC = {
  grip: "M9 4h.01M9 8h.01M9 12h.01M9 16h.01M9 20h.01M15 4h.01M15 8h.01M15 12h.01M15 16h.01M15 20h.01",
  plus: "M12 5v14M5 12h14", trash: "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6",
  edit: "M11 4H4v16h16v-7M18.5 2.5l3 3L12 15H9v-3z", copy: "M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2v-2M16 4h2a2 2 0 012 2v6a2 2 0 01-2 2h-8a2 2 0 01-2-2V6a2 2 0 012-2",
  chevUp: "M18 15l-6-6-6 6", chevDown: "M6 9l6 6 6-6", x: "M18 6L6 18M6 6l12 12",
  coffee: "M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3",
  users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
  folder: "M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z",
  save: "M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2zM17 21v-8H7v8M7 3v5h8",
  back: "M19 12H5M12 19l-7-7 7-7",
  clock: "M12 2a10 10 0 100 20 10 10 0 000-20zM12 6v6l4 2",
};

function Badge({ category, color, colorLt }) {
  return <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 4, fontWeight: 600, background: colorLt, color, letterSpacing: 0.3, textTransform: "uppercase", whiteSpace: "nowrap" }}>{category}</span>;
}
function IconBtn({ icon, onClick, title, color, size = 14, danger, style = {} }) {
  return (
    <button title={title} onClick={(e) => { e.stopPropagation(); onClick(e); }} style={{ background: "none", border: "none", padding: 4, cursor: "pointer", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.6, transition: "all 0.15s", ...style }} onMouseEnter={(e) => { e.currentTarget.style.opacity = 1; e.currentTarget.style.background = danger ? "#fde8e6" : BRAND.warmGray; }} onMouseLeave={(e) => { e.currentTarget.style.opacity = 0.6; e.currentTarget.style.background = "none"; }}>
      <Ic d={icon} size={size} color={danger ? "#B23A2E" : (color || BRAND.textMuted)} />
    </button>
  );
}
function DurationControl({ value, onChange, min = 5, max = 180 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }} onClick={(e) => e.stopPropagation()}>
      <button onClick={() => onChange(Math.max(min, value - 5))} style={{ width: 22, height: 22, borderRadius: 4, border: `1px solid ${BRAND.warmGray}`, background: BRAND.white, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: BRAND.text, fontFamily: "inherit", padding: 0 }}>-</button>
      <input type="range" min={min} max={max} step={5} value={value} onChange={(e) => onChange(Number(e.target.value))} style={{ width: 72, height: 4, accentColor: BRAND.cadet, cursor: "pointer" }} />
      <button onClick={() => onChange(Math.min(max, value + 5))} style={{ width: 22, height: 22, borderRadius: 4, border: `1px solid ${BRAND.warmGray}`, background: BRAND.white, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: BRAND.text, fontFamily: "inherit", padding: 0 }}>+</button>
      <span style={{ fontSize: 13, fontWeight: 700, color: BRAND.cadet, minWidth: 36, textAlign: "center" }}>{value}m</span>
    </div>
  );
}
function CategoryPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const cat = CATEGORIES.find((c) => c.label === value) || CATEGORIES[0];
  return (
    <div style={{ position: "relative" }} onClick={(e) => e.stopPropagation()}>
      <button onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 4, border: `1px solid ${BRAND.warmGray}`, background: cat.colorLt, color: cat.color, fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", textTransform: "uppercase", letterSpacing: 0.3 }}>{cat.label}<Ic d={open ? IC.chevUp : IC.chevDown} size={10} color={cat.color} /></button>
      {open && <div style={{ position: "absolute", top: "100%", left: 0, marginTop: 4, background: BRAND.white, border: `1px solid ${BRAND.warmGray}`, borderRadius: 8, padding: 4, zIndex: 50, minWidth: 130, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>{CATEGORIES.map((c) => <div key={c.label} onClick={() => { onChange(c.label, c.color, c.colorLt); setOpen(false); }} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 8px", borderRadius: 4, cursor: "pointer", fontSize: 11, fontWeight: 500, color: BRAND.text }} onMouseEnter={(e) => e.currentTarget.style.background = BRAND.offWhite} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}><div style={{ width: 10, height: 10, borderRadius: 3, background: c.color }} />{c.label}</div>)}</div>}
    </div>
  );
}

function EditModal({ section, onSave, onCancel }) {
  const [data, setData] = useState({ ...section });
  const u = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const is = { width: "100%", padding: "8px 12px", border: `1px solid ${BRAND.warmGray}`, borderRadius: 6, fontSize: 13, fontFamily: "inherit", background: BRAND.offWhite, color: BRAND.text, outline: "none", boxSizing: "border-box" };
  const as = { ...is, resize: "vertical", lineHeight: 1.6, fontSize: 12 };
  const lb = { display: "block", fontSize: 11, fontWeight: 600, color: BRAND.textMuted, marginBottom: 4 };
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }} onClick={onCancel}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: BRAND.white, borderRadius: 12, padding: 24, width: "90%", maxWidth: 560, maxHeight: "85vh", overflowY: "auto", boxShadow: "0 16px 48px rgba(0,0,0,0.15)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}><span style={{ fontSize: 16, fontWeight: 700 }}>Edit {data.type === "break" ? "break" : "section"}</span><IconBtn icon={IC.x} onClick={onCancel} /></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div><label style={lb}>Name</label><input value={data.name} onChange={(e) => u("name", e.target.value)} style={is} /></div>
          <div><label style={lb}>Description</label><textarea value={data.description} onChange={(e) => u("description", e.target.value)} rows={2} style={as} /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div><label style={lb}>Type</label><div style={{ display: "flex", gap: 4 }}>{["section", "intro", "break"].map((t) => <button key={t} onClick={() => u("type", t)} style={{ padding: "4px 12px", borderRadius: 6, border: `1px solid ${data.type === t ? BRAND.cadet : BRAND.warmGray}`, background: data.type === t ? BRAND.cadetLt : BRAND.white, color: data.type === t ? BRAND.cadet : BRAND.text, fontSize: 11, fontWeight: data.type === t ? 600 : 400, cursor: "pointer", fontFamily: "inherit", textTransform: "capitalize" }}>{t}</button>)}</div></div>
            <div><label style={lb}>Duration</label><DurationControl value={data.minutes} onChange={(v) => u("minutes", v)} /></div>
          </div>
          {data.type !== "break" && <>
            <div><label style={lb}>Category</label><CategoryPicker value={data.category} onChange={(label, color, colorLt) => setData((d) => ({ ...d, category: label, color, colorLt }))} /></div>
            <div><label style={lb}>Activities (one per line)</label><textarea value={(data.activities || []).join("\n")} onChange={(e) => u("activities", e.target.value.split("\n"))} rows={4} style={as} /></div>
            <div><label style={lb}>Facilitator tips (one per line)</label><textarea value={(data.tips || []).join("\n")} onChange={(e) => u("tips", e.target.value.split("\n"))} rows={3} style={as} /></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div><label style={lb}>Roles</label><input value={data.roles || ""} onChange={(e) => u("roles", e.target.value)} style={is} /></div>
              <div><label style={lb}>Materials</label><input value={data.materials || ""} onChange={(e) => u("materials", e.target.value)} style={is} /></div>
            </div>
            <div><label style={lb}>Expected output</label><input value={data.output || ""} onChange={(e) => u("output", e.target.value)} style={is} /></div>
          </>}
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 20 }}>
          <button onClick={onCancel} style={{ padding: "8px 20px", borderRadius: 6, border: `1px solid ${BRAND.warmGray}`, background: BRAND.white, color: BRAND.text, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
          <button onClick={() => onSave(data)} style={{ padding: "8px 24px", borderRadius: 6, border: "none", background: BRAND.cadet, color: BRAND.white, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Save</button>
        </div>
      </div>
    </div>
  );
}

function SectionSelector({ sections, setSections, totalMinutes, budgetMinutes }) {
  const [editingId, setEditingId] = useState(null);
  const [dragIdx, setDragIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const pct = Math.min(100, Math.round((totalMinutes / budgetMinutes) * 100));
  const over = totalMinutes > budgetMinutes;
  const toggle = (id) => setSections((p) => p.map((s) => s.id === id ? { ...s, enabled: !s.enabled } : s));
  const remove = (id) => { setSections((p) => p.filter((s) => s.id !== id)); setConfirmDelete(null); };
  const duplicate = (s) => setSections((p) => { const i = p.findIndex((x) => x.id === s.id); const n = [...p]; n.splice(i + 1, 0, { ...s, id: uid(), name: s.name + " (copy)" }); return n; });
  const updateDur = (id, m) => setSections((p) => p.map((s) => s.id === id ? { ...s, minutes: m } : s));
  const moveUp = (i) => { if (!i) return; setSections((p) => { const n = [...p]; [n[i - 1], n[i]] = [n[i], n[i - 1]]; return n; }); };
  const moveDown = (i) => setSections((p) => { if (i >= p.length - 1) return p; const n = [...p]; [n[i], n[i + 1]] = [n[i + 1], n[i]]; return n; });
  const addItem = (type) => {
    const d = { section: { name: "New section", category: "Custom", color: BRAND.violet, colorLt: BRAND.violetLt, minutes: 30, description: "Describe...", activities: ["Activity 1"], tips: ["Tip 1"], roles: "Facilitator, All", materials: "TBD", output: "TBD" }, break: { name: "Break", category: "Intro / Closing", color: BRAND.breakColor, colorLt: BRAND.breakBg, minutes: 15, description: "Break.", activities: [], tips: [], roles: "All", materials: "Refreshments", output: "" }, intro: { name: "New intro", category: "Intro / Closing", color: BRAND.carbonMed, colorLt: BRAND.warmGray, minutes: 15, description: "Opening/closing.", activities: ["Activity 1"], tips: [], roles: "Facilitator", materials: "TBD", output: "TBD" } };
    setSections((p) => [...p, { id: uid(), type, enabled: true, ...d[type] }]);
  };
  const onDragStart = (e, i) => { setDragIdx(i); e.dataTransfer.effectAllowed = "move"; };
  const onDragOver = (e, i) => { e.preventDefault(); setDragOverIdx(i); };
  const onDrop = (e, i) => { e.preventDefault(); if (dragIdx !== null && dragIdx !== i) setSections((p) => { const n = [...p]; const it = n.splice(dragIdx, 1)[0]; n.splice(i, 0, it); return n; }); setDragIdx(null); setDragOverIdx(null); };
  const onDragEnd = () => { setDragIdx(null); setDragOverIdx(null); };
  const ed = editingId ? sections.find((s) => s.id === editingId) : null;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <div><div style={{ fontSize: 11, fontWeight: 600, color: BRAND.textMuted, marginBottom: 2 }}>Time budget</div><span style={{ fontSize: 22, fontWeight: 700, color: over ? "#B23A2E" : BRAND.cadet }}>{formatTime(totalMinutes)}</span><span style={{ fontSize: 13, color: BRAND.textMuted }}> / {formatTime(budgetMinutes)}</span></div>
        {over && <span style={{ fontSize: 11, color: "#B23A2E", fontWeight: 600, background: "#fde8e6", padding: "3px 10px", borderRadius: 4 }}>Over budget</span>}
      </div>
      <div style={{ height: 4, background: BRAND.warmGray, borderRadius: 2, marginBottom: 14 }}><div style={{ height: 4, borderRadius: 2, background: over ? "#B23A2E" : BRAND.cadet, width: `${Math.min(pct, 100)}%`, transition: "width 0.3s" }} /></div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {sections.map((s, i) => { const isB = s.type === "break"; const isI = s.type === "intro"; return (
          <div key={s.id} draggable onDragStart={(e) => onDragStart(e, i)} onDragOver={(e) => onDragOver(e, i)} onDrop={(e) => onDrop(e, i)} onDragEnd={onDragEnd} style={{ display: "flex", alignItems: "stretch", border: `1px ${isB ? "dashed" : "solid"} ${dragOverIdx === i ? BRAND.cadet : BRAND.warmGray}`, borderRadius: 8, overflow: "hidden", opacity: s.enabled ? (dragIdx === i ? 0.5 : 1) : 0.35, transition: "all 0.15s", borderLeft: `3px ${isB ? "dashed" : "solid"} ${s.enabled ? (isB ? BRAND.breakColor : s.color) : BRAND.carbonLt}`, background: isB && s.enabled ? BRAND.breakBg : BRAND.white }}>
            <div style={{ width: 26, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", cursor: "grab", background: isB ? "transparent" : BRAND.offWhite, borderRight: `1px solid ${BRAND.warmGray}` }}><Ic d={IC.grip} size={12} color={BRAND.carbonLt} /></div>
            <div onClick={() => toggle(s.id)} style={{ width: 32, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><div style={{ width: 15, height: 15, borderRadius: 4, border: `1.5px solid ${s.enabled ? BRAND.cadet : BRAND.carbonLt}`, background: s.enabled ? BRAND.cadet : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>{s.enabled && <svg width="9" height="7" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}</div></div>
            {(isB || isI) && <div style={{ width: 24, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}><Ic d={isB ? IC.coffee : IC.users} size={13} color={isB ? BRAND.breakColor : BRAND.carbonMed} /></div>}
            <div style={{ flex: 1, padding: "7px 10px", minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: isB ? 0 : 2 }}><span style={{ fontSize: 13, fontWeight: 600, color: isB ? BRAND.breakColor : BRAND.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontStyle: isB ? "italic" : "normal" }}>{s.name}</span>{!isB && <CategoryPicker value={s.category} onChange={(l, c, cl) => setSections((p) => p.map((x) => x.id === s.id ? { ...x, category: l, color: c, colorLt: cl } : x))} />}{isB && <span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 3, background: BRAND.warmGray, color: BRAND.breakColor, fontWeight: 600, textTransform: "uppercase" }}>Break</span>}</div>
              {!isB && <div style={{ fontSize: 11, color: BRAND.textMuted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.description}</div>}
            </div>
            <div style={{ display: "flex", alignItems: "center", paddingRight: 4, flexShrink: 0 }}><DurationControl value={s.minutes} onChange={(v) => updateDur(s.id, v)} /></div>
            <div style={{ display: "flex", alignItems: "center", gap: 0, paddingRight: 3, flexShrink: 0, borderLeft: `1px solid ${BRAND.warmGray}` }}>
              <IconBtn icon={IC.chevUp} onClick={() => moveUp(i)} title="Up" size={12} /><IconBtn icon={IC.chevDown} onClick={() => moveDown(i)} title="Down" size={12} /><IconBtn icon={IC.edit} onClick={() => setEditingId(s.id)} title="Edit" /><IconBtn icon={IC.copy} onClick={() => duplicate(s)} title="Copy" size={12} />
              {confirmDelete === s.id ? <div style={{ display: "flex", alignItems: "center", gap: 2 }} onClick={(e) => e.stopPropagation()}><button onClick={() => remove(s.id)} style={{ fontSize: 10, padding: "2px 6px", borderRadius: 3, border: "none", background: "#B23A2E", color: "#fff", cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>Yes</button><button onClick={() => setConfirmDelete(null)} style={{ fontSize: 10, padding: "2px 6px", borderRadius: 3, border: `1px solid ${BRAND.warmGray}`, background: BRAND.white, cursor: "pointer", fontFamily: "inherit" }}>No</button></div> : <IconBtn icon={IC.trash} onClick={() => setConfirmDelete(s.id)} title="Remove" danger />}
            </div>
          </div>); })}
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 10 }}>{[{ t: "section", l: "Add section", ic: IC.plus, c: BRAND.cadet, b: BRAND.cadetLt }, { t: "break", l: "Add break", ic: IC.coffee, c: BRAND.breakColor, b: BRAND.breakBg }, { t: "intro", l: "Add intro", ic: IC.users, c: BRAND.carbonMed, b: BRAND.warmGray }].map(({ t, l, ic, c, b }) => <button key={t} onClick={() => addItem(t)} style={{ flex: 1, padding: "9px 0", borderRadius: 8, border: `1.5px dashed ${c}`, background: b, color: c, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}><Ic d={ic} size={13} color={c} />{l}</button>)}</div>
      {ed && <EditModal section={ed} onSave={(d) => { setSections((p) => p.map((s) => s.id === d.id ? { ...d } : s)); setEditingId(null); }} onCancel={() => setEditingId(null)} />}
    </div>
  );
}

function StepIndicator({ steps, current, onGo }) {
  return <div style={{ display: "flex", flexDirection: "column", gap: 2 }}><div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 0.6, color: BRAND.textMuted, fontWeight: 600, marginBottom: 6 }}>Workflow</div>{steps.map((s, i) => { const done = i < current; const act = i === current; return <div key={i} onClick={() => onGo(i)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 8px", borderRadius: 6, background: act ? BRAND.cadetLt : "transparent", color: act ? BRAND.cadet : done ? BRAND.text : BRAND.textMuted, fontWeight: act ? 600 : 400, fontSize: 12, cursor: "pointer" }}><div style={{ width: 7, height: 7, borderRadius: "50%", flexShrink: 0, background: done || act ? BRAND.cadet : BRAND.warmGray, boxShadow: act ? `0 0 0 3px ${BRAND.cadetLt}` : "none" }} />{s}</div>; })}</div>;
}
function Inp({ label, value, onChange, placeholder }) { return <div><label style={{ display: "block", fontSize: 11, fontWeight: 600, color: BRAND.textMuted, marginBottom: 4 }}>{label}</label><input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={{ width: "100%", padding: "8px 12px", border: `1px solid ${BRAND.warmGray}`, borderRadius: 6, fontSize: 13, fontFamily: "inherit", background: BRAND.offWhite, color: BRAND.text, outline: "none", boxSizing: "border-box" }} onFocus={(e) => e.target.style.borderColor = BRAND.cadet} onBlur={(e) => e.target.style.borderColor = BRAND.warmGray} /></div>; }
function InpArea({ label, value, onChange, placeholder, rows = 3 }) { return <div><label style={{ display: "block", fontSize: 11, fontWeight: 600, color: BRAND.textMuted, marginBottom: 4 }}>{label}</label><textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows} style={{ width: "100%", padding: "8px 12px", border: `1px solid ${BRAND.warmGray}`, borderRadius: 6, fontSize: 13, fontFamily: "inherit", background: BRAND.offWhite, color: BRAND.text, outline: "none", resize: "vertical", boxSizing: "border-box", lineHeight: 1.5 }} onFocus={(e) => e.target.style.borderColor = BRAND.cadet} onBlur={(e) => e.target.style.borderColor = BRAND.warmGray} /></div>; }

function SetupForm({ data, onChange }) {
  const update = (k, v) => onChange({ ...data, [k]: v });
  const dh = data.dayHours;
  const matchP = (p) => dayHoursMatch(p.dayHours, dh);
  const isCustom = !DURATION_PRESETS.some(matchP);
  const setDays = (n) => { const c = [...dh]; while (c.length < n) c.push(c[c.length - 1] || 6); onChange({ ...data, dayHours: c.slice(0, n) }); };
  const setDH = (i, h) => { const c = [...dh]; c[i] = h; onChange({ ...data, dayHours: c }); };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}><Inp label="Customer / organisation name" value={data.customer} onChange={(v) => update("customer", v)} placeholder="e.g. Acme Corp" /><Inp label="Industry" value={data.industry} onChange={(v) => update("industry", v)} placeholder="e.g. Consumer goods" /></div>
      <div><div style={{ fontSize: 11, fontWeight: 600, color: BRAND.textMuted, marginBottom: 6 }}>Workshop duration</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>{DURATION_PRESETS.map((p, i) => <button key={i} onClick={() => onChange({ ...data, dayHours: [...p.dayHours] })} style={{ padding: "6px 14px", borderRadius: 20, border: `1px solid ${matchP(p) ? BRAND.cadet : BRAND.warmGray}`, background: matchP(p) ? BRAND.cadetLt : BRAND.white, color: matchP(p) ? BRAND.cadet : BRAND.text, fontWeight: matchP(p) ? 600 : 400, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>{p.label}</button>)}<button style={{ padding: "6px 14px", borderRadius: 20, border: `1px solid ${isCustom ? BRAND.cadet : BRAND.warmGray}`, background: isCustom ? BRAND.cadetLt : BRAND.white, color: isCustom ? BRAND.cadet : BRAND.text, fontWeight: isCustom ? 600 : 400, fontSize: 12, cursor: "default", fontFamily: "inherit" }}>Custom</button></div>
        <div style={{ marginBottom: 12 }}><label style={{ display: "block", fontSize: 11, fontWeight: 600, color: BRAND.textMuted, marginBottom: 4 }}>Number of days</label><div style={{ display: "flex", gap: 4 }}>{[1, 2, 3, 4, 5].map((d) => <button key={d} onClick={() => setDays(d)} style={{ width: 34, height: 34, borderRadius: 6, border: `1px solid ${dh.length === d ? BRAND.cadet : BRAND.warmGray}`, background: dh.length === d ? BRAND.cadet : BRAND.white, color: dh.length === d ? BRAND.white : BRAND.text, fontWeight: dh.length === d ? 700 : 400, fontSize: 13, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center" }}>{d}</button>)}</div></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>{dh.map((h, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 12px", background: BRAND.offWhite, borderRadius: 8, border: `1px solid ${BRAND.warmGray}` }}><span style={{ fontSize: 12, fontWeight: 600, minWidth: 48 }}>Day {i + 1}</span><button onClick={() => setDH(i, Math.max(2, h - 1))} style={{ width: 24, height: 24, borderRadius: 4, border: `1px solid ${BRAND.warmGray}`, background: BRAND.white, cursor: "pointer", fontSize: 14, fontFamily: "inherit", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>-</button><input type="range" min={2} max={12} step={0.5} value={h} onChange={(e) => setDH(i, Number(e.target.value))} style={{ flex: 1, height: 4, accentColor: BRAND.cadet }} /><button onClick={() => setDH(i, Math.min(12, h + 1))} style={{ width: 24, height: 24, borderRadius: 4, border: `1px solid ${BRAND.warmGray}`, background: BRAND.white, cursor: "pointer", fontSize: 14, fontFamily: "inherit", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button><span style={{ fontSize: 14, fontWeight: 700, color: BRAND.cadet, minWidth: 32, textAlign: "center" }}>{h}h</span></div>)}</div>
        <div style={{ marginTop: 8, padding: "8px 14px", background: BRAND.offWhite, borderRadius: 8, border: `1px solid ${BRAND.warmGray}`, display: "inline-flex", alignItems: "center", gap: 8 }}><span style={{ fontSize: 11, fontWeight: 600, color: BRAND.textMuted }}>Total:</span><span style={{ fontSize: 15, fontWeight: 700, color: BRAND.cadet }}>{durationLabel(dh)}</span></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}><Inp label="Number of participants" value={data.participants} onChange={(v) => update("participants", v)} placeholder="e.g. 8-12" /><Inp label="Key roles attending" value={data.roles} onChange={(v) => update("roles", v)} placeholder="e.g. VP Operations, IT Director" /></div>
      <InpArea label="Workshop objectives" value={data.objectives} onChange={(v) => update("objectives", v)} placeholder="e.g. Align on a shared vision, identify top 5 capability gaps..." rows={3} />
      <InpArea label="Additional context (optional)" value={data.notes} onChange={(v) => update("notes", v)} placeholder="Meeting notes, discovery call summaries..." rows={2} />
    </div>
  );
}

function AgendaTimeline({ sections, onSelect }) {
  let cur = "09:00"; const en = sections.filter((s) => s.enabled);
  return <div style={{ display: "flex", flexDirection: "column" }}>{en.map((it) => { const t = cur; cur = addTime(cur, it.minutes); const isB = it.type === "break"; const isS = it.type === "section"; return isB ? <div key={it.id} style={{ display: "flex", alignItems: "stretch", borderRadius: 6, border: `1px dashed ${BRAND.warmGray}`, background: BRAND.breakBg, marginBottom: 4 }}><div style={{ width: 60, flexShrink: 0, padding: "6px 0", textAlign: "center", fontSize: 10, color: BRAND.textMuted }}><div>{t}</div><div style={{ fontWeight: 600, fontSize: 11, color: BRAND.breakColor }}>{it.minutes}m</div></div><div style={{ flex: 1, padding: "6px 12px", display: "flex", alignItems: "center", gap: 6 }}><Ic d={IC.coffee} size={12} color={BRAND.breakColor} /><span style={{ fontSize: 12, color: BRAND.breakColor, fontStyle: "italic" }}>{it.name}</span></div></div> : <div key={it.id} onClick={isS ? () => onSelect(it.id) : undefined} style={{ display: "flex", alignItems: "stretch", borderRadius: 8, border: `1px solid ${BRAND.warmGray}`, overflow: "hidden", marginBottom: 4, cursor: isS ? "pointer" : "default", borderLeft: `3px solid ${it.color}`, background: BRAND.white }} onMouseEnter={(e) => isS && (e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)")} onMouseLeave={(e) => isS && (e.currentTarget.style.boxShadow = "none")}><div style={{ width: 60, flexShrink: 0, padding: "8px 0", textAlign: "center", background: BRAND.offWhite, borderRight: `1px solid ${BRAND.warmGray}` }}><div style={{ fontSize: 10, color: BRAND.textMuted }}>{t}</div><div style={{ fontWeight: 700, fontSize: 12 }}>{it.minutes}m</div></div><div style={{ flex: 1, padding: "8px 14px" }}><div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 2 }}><span style={{ fontSize: 13, fontWeight: 600 }}>{it.name}</span><Badge category={it.category} color={it.color} colorLt={it.colorLt} /></div>{isS && <div style={{ fontSize: 11, color: BRAND.textMuted }}>{(it.activities || []).length} activities — click to view</div>}</div></div>; })}<div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, padding: "8px 12px", background: BRAND.offWhite, borderRadius: 6, border: `1px solid ${BRAND.warmGray}` }}><span style={{ fontSize: 12, fontWeight: 600 }}>End:</span><span style={{ fontSize: 14, fontWeight: 700, color: BRAND.cadet }}>{cur}</span><span style={{ fontSize: 11, color: BRAND.textMuted }}>({formatTime(en.reduce((s, x) => s + x.minutes, 0))} total)</span></div></div>;
}
function DB({ title, text }) { return <div><div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 0.5, color: BRAND.textMuted, fontWeight: 600, marginBottom: 4 }}>{title}</div><div style={{ fontSize: 12, lineHeight: 1.6 }}>{text}</div></div>; }
function SectionDetail({ section, onPrev, onNext, hasPrev, hasNext }) {
  if (!section) return <div style={{ fontSize: 13, color: BRAND.textMuted }}>Select a section from the timeline.</div>;
  return <div><div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}><span style={{ fontSize: 18, fontWeight: 700 }}>{section.name}</span><Badge category={section.category} color={section.color} colorLt={section.colorLt} /></div><div style={{ fontSize: 12, color: BRAND.textMuted, marginBottom: 16 }}>{section.minutes}m — {section.roles}</div><div style={{ background: BRAND.offWhite, border: `1px solid ${BRAND.warmGray}`, borderRadius: 10, padding: 18 }}><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 16 }}><DB title="Objective" text={section.description} /><DB title="Roles" text={section.roles} /></div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 16 }}><div><div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 0.5, color: BRAND.textMuted, fontWeight: 600, marginBottom: 6 }}>Activities</div><ol style={{ paddingLeft: 16, margin: 0, fontSize: 12, lineHeight: 1.7 }}>{(section.activities || []).filter(Boolean).map((a, i) => <li key={i}>{a}</li>)}</ol></div><div><div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 0.5, color: BRAND.textMuted, fontWeight: 600, marginBottom: 6 }}>Facilitator tips</div><ul style={{ paddingLeft: 16, margin: 0, fontSize: 12, lineHeight: 1.7, fontStyle: "italic" }}>{(section.tips || []).filter(Boolean).map((t, i) => <li key={i}>{t}</li>)}</ul></div></div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}><DB title="Materials" text={section.materials} /><DB title="Expected output" text={section.output} /></div></div><div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}><button onClick={onPrev} disabled={!hasPrev} style={{ padding: "7px 16px", borderRadius: 6, border: `1px solid ${BRAND.warmGray}`, background: BRAND.white, color: hasPrev ? BRAND.text : BRAND.carbonLt, fontSize: 12, cursor: hasPrev ? "pointer" : "default", fontFamily: "inherit" }}>Previous</button><button onClick={onNext} disabled={!hasNext} style={{ padding: "7px 16px", borderRadius: 6, border: "none", background: hasNext ? BRAND.cadet : BRAND.warmGray, color: BRAND.white, fontSize: 12, cursor: hasNext ? "pointer" : "default", fontFamily: "inherit", fontWeight: 600 }}>Next</button></div></div>;
}
function PdfPreview({ setupData, sections, onGenerate, generating }) {
  const en = sections.filter((s) => s.enabled);
  const [opts, setOpts] = useState({ timeline: true, details: true, tips: true, materials: false });
  const tog = (k) => setOpts((o) => ({ ...o, [k]: !o[k] }));
  return <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}><div style={{ flex: 1 }}><div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 0.5, color: BRAND.textMuted, fontWeight: 600, marginBottom: 10 }}>Export options</div>{[{ k: "timeline", l: "Timeline overview" }, { k: "details", l: "Section details" }, { k: "tips", l: "Facilitator tips" }, { k: "materials", l: "Materials checklist" }].map(({ k, l }) => <label key={k} onClick={() => tog(k)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", cursor: "pointer", fontSize: 13 }}><div style={{ width: 16, height: 16, borderRadius: 4, border: `1.5px solid ${opts[k] ? BRAND.cadet : BRAND.carbonLt}`, background: opts[k] ? BRAND.cadet : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{opts[k] && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}</div>{l}</label>)}<button onClick={() => onGenerate(opts)} disabled={generating} style={{ marginTop: 16, width: "100%", padding: "10px 24px", borderRadius: 8, border: "none", background: generating ? BRAND.carbonLt : BRAND.cadet, color: BRAND.white, fontSize: 13, fontWeight: 600, cursor: generating ? "wait" : "pointer", fontFamily: "inherit" }}>{generating ? "Generating..." : "Download agenda (.html)"}</button><div style={{ fontSize: 11, color: BRAND.textMuted, marginTop: 8, lineHeight: 1.5 }}>Downloads an HTML file. Open it in your browser and use Print (Ctrl+P) to save as PDF.</div></div><div style={{ flex: 1.2, background: BRAND.offWhite, border: `1px solid ${BRAND.warmGray}`, borderRadius: 10, padding: 20, textAlign: "center" }}><div style={{ background: BRAND.white, border: `1px solid ${BRAND.warmGray}`, borderRadius: 6, maxWidth: 280, margin: "0 auto", padding: 20, textAlign: "left" }}><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, paddingBottom: 8, borderBottom: `1px solid ${BRAND.warmGray}` }}><div style={{ width: 20, height: 20, borderRadius: 4, background: BRAND.cadet }} /><div style={{ fontSize: 11, fontWeight: 600 }}>Workshop agenda</div></div><div style={{ fontSize: 10, fontWeight: 600, marginBottom: 4 }}>{setupData.customer || "Customer"} — {durationLabel(setupData.dayHours)}</div>{en.map((s) => <div key={s.id} style={{ height: s.type === "break" ? 12 : 22, background: s.type === "break" ? BRAND.breakBg : BRAND.offWhite, borderRadius: 4, marginBottom: 3, display: "flex", alignItems: "center", padding: "0 8px", gap: 6 }}><div style={{ width: 4, height: 4, borderRadius: "50%", background: s.type === "break" ? BRAND.breakColor : s.color }} /><div style={{ height: 3, background: BRAND.warmGray, borderRadius: 2, flex: 1 }} /></div>)}</div><div style={{ fontSize: 11, color: BRAND.textMuted, marginTop: 10 }}>PDF preview</div></div></div>;
}

function Dashboard({ sessions, loading, onOpen, onNew, onDuplicate, onDelete }) {
  const grouped = {};
  sessions.forEach((s) => { const c = s.setup?.customer || "Untitled"; if (!grouped[c]) grouped[c] = []; grouped[c].push(s); });
  Object.values(grouped).forEach((g) => g.sort((a, b) => (b.modified || 0) - (a.modified || 0)));
  const clients = Object.keys(grouped).sort();
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div><div style={{ fontSize: 20, fontWeight: 700 }}>My sessions</div><div style={{ fontSize: 13, color: BRAND.textMuted }}>{sessions.length} saved agenda{sessions.length !== 1 ? "s" : ""}</div></div>
        <button onClick={onNew} style={{ padding: "8px 20px", borderRadius: 8, border: "none", background: BRAND.cadet, color: BRAND.white, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}><Ic d={IC.plus} size={14} color="#fff" /> New agenda</button>
      </div>
      {loading && <div style={{ textAlign: "center", padding: 40, color: BRAND.textMuted }}>Loading sessions...</div>}
      {!loading && sessions.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <Ic d={IC.folder} size={40} color={BRAND.warmGray} />
          <div style={{ fontSize: 15, fontWeight: 600, marginTop: 12, color: BRAND.textMuted }}>No saved agendas yet</div>
          <div style={{ fontSize: 13, color: BRAND.carbonLt, marginTop: 4, marginBottom: 16 }}>Create your first workshop agenda to get started.</div>
          <button onClick={onNew} style={{ padding: "10px 24px", borderRadius: 8, border: "none", background: BRAND.cadet, color: BRAND.white, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Create first agenda</button>
        </div>
      )}
      {clients.map((client) => (
        <div key={client} style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: BRAND.text, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
            <Ic d={IC.folder} size={14} color={BRAND.cadet} /> {client}
            <span style={{ fontSize: 11, fontWeight: 400, color: BRAND.textMuted }}>({grouped[client].length})</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {grouped[client].map((sess) => {
              const en = (sess.sections || []).filter((s) => s.enabled);
              const totalM = en.reduce((sum, s) => sum + s.minutes, 0);
              const sCount = en.filter((s) => s.type === "section").length;
              return (
                <div key={sess.id} onClick={() => onOpen(sess.id)} style={{ display: "flex", alignItems: "center", padding: "10px 14px", background: BRAND.white, border: `1px solid ${BRAND.warmGray}`, borderRadius: 8, cursor: "pointer", transition: "all 0.15s", borderLeft: `3px solid ${BRAND.cadet}` }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)"} onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sess.setup?.customer || "Untitled"}{sess.setup?.industry ? ` — ${sess.setup.industry}` : ""}</div>
                    <div style={{ display: "flex", gap: 12, fontSize: 11, color: BRAND.textMuted, marginTop: 2 }}>
                      <span>{durationLabel(sess.setup?.dayHours || [8])}</span>
                      <span>{sCount} sections</span>
                      <span>{formatTime(totalM)}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: BRAND.carbonLt, marginRight: 10, whiteSpace: "nowrap" }}>
                    {sess.modified ? new Date(sess.modified).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                  </div>
                  <div style={{ display: "flex", gap: 2 }}>
                    <IconBtn icon={IC.copy} onClick={(e) => { e.stopPropagation(); onDuplicate(sess.id); }} title="Duplicate" size={13} />
                    <IconBtn icon={IC.trash} onClick={(e) => { e.stopPropagation(); onDelete(sess.id); }} title="Delete" danger size={13} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AgendaBuilder() {
  const [view, setView] = useState("dashboard");
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentId, setCurrentId] = useState(null);
  const [step, setStep] = useState(0);
  const [setup, setSetup] = useState({ ...DEFAULT_SETUP });
  const [sections, setSections] = useState([...DEFAULT_SECTIONS]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [generating] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const keys = await store.list("session:");
      const all = [];
      for (const k of keys) { const d = await store.get(k); if (d) all.push({ id: k, ...d }); }
      setSessions(all);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (view !== "editor" || !currentId) return;
    setSaved(false);
    const t = setTimeout(async () => {
      await store.set(currentId, { setup, sections, modified: Date.now(), created: sessions.find((s) => s.id === currentId)?.created || Date.now() });
      setSessions((prev) => prev.map((s) => s.id === currentId ? { ...s, setup, sections, modified: Date.now() } : s));
      setSaved(true);
    }, 800);
    return () => clearTimeout(t);
  }, [setup, sections, currentId, view]);

  const enabledSections = sections.filter((s) => s.enabled);
  const totalMinutes = enabledSections.reduce((sum, s) => sum + s.minutes, 0);
  const budgetMinutes = totalHours(setup.dayHours) * 60;
  const detailSections = enabledSections.filter((s) => s.type !== "break");
  const cidx = detailSections.findIndex((s) => s.id === selectedSection);

  const openSession = async (id) => {
    const d = await store.get(id);
    if (d) { setSetup(d.setup || { ...DEFAULT_SETUP }); setSections(d.sections || [...DEFAULT_SECTIONS]); setCurrentId(id); setStep(0); setView("editor"); }
  };
  const newSession = async () => {
    const id = sessionId();
    const now = Date.now();
    await store.set(id, { setup: { ...DEFAULT_SETUP }, sections: [...DEFAULT_SECTIONS], created: now, modified: now });
    setSessions((p) => [...p, { id, setup: { ...DEFAULT_SETUP }, sections: [...DEFAULT_SECTIONS], created: now, modified: now }]);
    setSetup({ ...DEFAULT_SETUP }); setSections([...DEFAULT_SECTIONS]); setCurrentId(id); setStep(0); setView("editor");
  };
  const duplicateSession = async (id) => {
    const d = await store.get(id);
    if (!d) return;
    const nid = sessionId(); const now = Date.now();
    const ns = { ...d, setup: { ...d.setup, customer: (d.setup?.customer || "") + " (copy)" }, created: now, modified: now };
    await store.set(nid, ns);
    setSessions((p) => [...p, { id: nid, ...ns }]);
  };
  const deleteSession = async (id) => {
    await store.del(id);
    setSessions((p) => p.filter((s) => s.id !== id));
    if (currentId === id) { setView("dashboard"); setCurrentId(null); }
  };
  const goBack = () => { setView("dashboard"); };

  const handleSelectSection = (id) => { setSelectedSection(id); setStep(3); };
  const goNext = () => { if (step === 2 && !selectedSection && detailSections.length > 0) setSelectedSection(detailSections[0].id); setStep((s) => Math.min(s + 1, 4)); };

  const handleGeneratePdf = (opts) => {
    const en = enabledSections;
    const customer = setup.customer || "Workshop";
    const industry = setup.industry || "";
    const durText = durationLabel(setup.dayHours);
    const objectives = setup.objectives || "";
    let clock = "09:00";
    const rows = en.map((s) => { const start = clock; clock = addTime(clock, s.minutes); return { ...s, start, end: clock }; });
    const e = (t) => (t || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${e(customer)} - Workshop Agenda</title>
<style>
@page{size:A4;margin:18mm 16mm}*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Arial,Helvetica,sans-serif;color:#322F2F;font-size:10pt;line-height:1.5}
.pb{page-break-before:always}.dc{page-break-inside:avoid}
.bar{height:6px;background:linear-gradient(90deg,#1A6B6A,#6B8E4E,#8CC63F);border-radius:3px;margin-bottom:32px}
.cover{display:flex;flex-direction:column;justify-content:center;min-height:90vh;padding:40px 0}
h1{font-size:28pt;font-weight:700;color:#1A6B6A;margin:0 0 8px}
.sub{font-size:14pt;font-weight:400;color:#6E6E6A;margin:0 0 24px}
.mg{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:24px}
.mi{padding:10px 14px;background:#F7F6F3;border-radius:6px;border-left:3px solid #1A6B6A}
.ml{font-size:8pt;text-transform:uppercase;letter-spacing:.5px;color:#6E6E6A;font-weight:600}
.mv{font-size:11pt;font-weight:600}
.obj{margin-top:16px;padding:14px 18px;background:#DFF0EF;border-radius:8px}
.obj h3{font-size:9pt;text-transform:uppercase;letter-spacing:.5px;color:#1A6B6A;margin:0 0 6px;font-weight:600}
.obj p{font-size:10pt;line-height:1.6;margin:0}
.st{font-size:14pt;font-weight:700;margin:0 0 4px}
.sd{font-size:9pt;color:#6E6E6A;margin:0 0 12px}
table{width:100%;border-collapse:collapse}
th{font-size:8pt;text-transform:uppercase;letter-spacing:.4px;color:#6E6E6A;font-weight:600;text-align:left;padding:6px 10px;border-bottom:2px solid #EEECE7}
td{padding:8px 10px;border-bottom:1px solid #EEECE7;font-size:10pt;vertical-align:top}
.br td{background:#F0EDE6;color:#9E9A8E;font-style:italic;font-size:9pt}
.dot{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:6px;vertical-align:middle}
.bdg{display:inline-block;font-size:7pt;padding:1px 6px;border-radius:3px;font-weight:600;text-transform:uppercase;letter-spacing:.3px;vertical-align:middle;margin-left:6px}
.dc{margin-bottom:20px;border:1px solid #EEECE7;border-radius:8px;overflow:hidden}
.dh{padding:10px 16px;display:flex;align-items:center;justify-content:space-between}
.dh h3{font-size:12pt;font-weight:700;margin:0}
.dm{font-size:9pt;color:#6E6E6A}
.db{padding:12px 16px;background:#F7F6F3}
.dg{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:10px}
.dl{font-size:7.5pt;text-transform:uppercase;letter-spacing:.4px;color:#6E6E6A;font-weight:600;margin-bottom:3px}
.dt{font-size:9pt;line-height:1.5}
.dli{padding-left:14px;margin:0;font-size:9pt;line-height:1.6}
.ft{margin-top:24px;padding-top:12px;border-top:1px solid #EEECE7;font-size:8pt;color:#9E9A8E;display:flex;justify-content:space-between}
.np{position:fixed;top:16px;right:16px;display:flex;gap:8px;z-index:100}
.np button{padding:10px 20px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;border:none}
.np .pr{background:#1A6B6A;color:#fff;box-shadow:0 2px 8px rgba(0,0,0,.15)}
@media print{.np{display:none!important}body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style></head><body>
<div class="np"><button class="pr" onclick="window.print()">Print / Save as PDF</button></div>
<div class="cover"><div class="bar"></div><h1>${e(customer)}</h1><div class="sub">Workshop Agenda${industry ? " - " + e(industry) : ""}</div>
<div class="mg"><div class="mi"><div class="ml">Duration</div><div class="mv">${e(durText)}</div></div><div class="mi"><div class="ml">Participants</div><div class="mv">${e(setup.participants) || "TBD"}</div></div><div class="mi"><div class="ml">Schedule</div><div class="mv">${rows.length ? rows[0].start + " - " + rows[rows.length-1].end : "TBD"}</div></div><div class="mi"><div class="ml">Sections</div><div class="mv">${en.filter(s=>s.type==="section").length} sessions + ${en.filter(s=>s.type==="break").length} breaks</div></div></div>
${objectives ? `<div class="obj"><h3>Workshop objectives</h3><p>${e(objectives)}</p></div>` : ""}</div>
${opts.timeline ? `<div class="pb"></div><div class="st">Agenda timeline</div><div class="sd">${e(durText)} - ${rows.length ? rows[0].start+" to "+rows[rows.length-1].end : ""}</div><table><thead><tr><th style="width:60px">Time</th><th style="width:50px">Dur.</th><th>Section</th><th style="width:80px">Category</th></tr></thead><tbody>${rows.map(s=>s.type==="break"?`<tr class="br"><td>${s.start}</td><td>${s.minutes}m</td><td>${e(s.name)}</td><td></td></tr>`:`<tr><td style="font-weight:600">${s.start}</td><td>${s.minutes}m</td><td><span class="dot" style="background:${s.color}"></span>${e(s.name)}</td><td><span class="bdg" style="background:${s.colorLt};color:${s.color}">${e(s.category)}</span></td></tr>`).join("")}</tbody></table>` : ""}
${opts.details ? `<div class="pb"></div><div class="st">Section details</div><div class="sd">Detailed breakdown of each workshop section.</div>${rows.filter(s=>s.type!=="break").map(s=>`<div class="dc"><div class="dh" style="border-left:4px solid ${s.color}"><h3>${e(s.name)} <span class="bdg" style="background:${s.colorLt};color:${s.color}">${e(s.category)}</span></h3><div class="dm">${s.start} - ${s.end} (${s.minutes}m)</div></div><div class="db"><div class="dg"><div><div class="dl">Objective</div><div class="dt">${e(s.description)}</div></div><div><div class="dl">Roles</div><div class="dt">${e(s.roles)}</div></div></div><div class="dg"><div><div class="dl">Activities</div><ol class="dli">${(s.activities||[]).filter(Boolean).map(a=>`<li>${e(a)}</li>`).join("")}</ol></div>${opts.tips?`<div><div class="dl">Facilitator tips</div><ul class="dli" style="font-style:italic">${(s.tips||[]).filter(Boolean).map(t=>`<li>${e(t)}</li>`).join("")}</ul></div>`:"<div></div>"}</div><div class="dg" style="margin-bottom:0">${opts.materials?`<div><div class="dl">Materials</div><div class="dt">${e(s.materials)}</div></div>`:"<div></div>"}<div><div class="dl">Output</div><div class="dt">${e(s.output)}</div></div></div></div></div>`).join("")}` : ""}
${opts.materials ? `<div class="pb"></div><div class="st">Materials checklist</div><div class="sd">Gather these materials before the workshop.</div><table><thead><tr><th style="width:24px"></th><th>Section</th><th>Materials</th></tr></thead><tbody>${rows.filter(s=>s.type!=="break"&&s.materials).map(s=>`<tr><td style="font-size:14px;text-align:center">&#9744;</td><td style="font-weight:600">${e(s.name)}</td><td>${e(s.materials)}</td></tr>`).join("")}</tbody></table>` : ""}
<div class="ft"><span>${e(customer)} Workshop Agenda</span><span>Generated ${new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}</span></div>
</body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(customer).replace(/[^a-zA-Z0-9]/g, "_")}_Workshop_Agenda.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 3000);
  };

  const STEPS = ["Workshop setup", "Select sections", "Agenda timeline", "Section details", "Export PDF"];

  return (
    <div style={{ fontFamily: "'Source Sans 3', 'Source Sans Pro', system-ui, sans-serif", color: BRAND.text, minHeight: "100vh", background: BRAND.offWhite }}>
      <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", background: BRAND.white, borderBottom: `1px solid ${BRAND.warmGray}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${BRAND.cadet}, ${BRAND.sage})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 11 }}>WA</div>
          <div><div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.2 }}>Workshop Agenda</div><div style={{ fontSize: 10, color: BRAND.textMuted }}>Agenda builder</div></div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {view === "editor" && saved && <span style={{ fontSize: 11, color: BRAND.sage, fontWeight: 500 }}>Saved</span>}
          {view === "editor" && !saved && <span style={{ fontSize: 11, color: BRAND.textMuted }}>Saving...</span>}
          {view === "editor" && <button onClick={goBack} style={{ padding: "6px 14px", borderRadius: 6, border: `1px solid ${BRAND.warmGray}`, background: BRAND.white, color: BRAND.text, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4 }}><Ic d={IC.back} size={12} color={BRAND.text} /> My sessions</button>}
          {view === "editor" && step > 0 && <button onClick={() => setStep(4)} style={{ padding: "6px 14px", borderRadius: 6, border: `1px solid ${BRAND.cadet}`, background: "transparent", color: BRAND.cadet, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Export PDF</button>}
        </div>
      </div>

      {view === "dashboard" && (
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "32px 20px" }}>
          <Dashboard sessions={sessions} loading={loading} onOpen={openSession} onNew={newSession} onDuplicate={duplicateSession} onDelete={deleteSession} />
        </div>
      )}

      {view === "editor" && (
        <div style={{ display: "flex", minHeight: "calc(100vh - 53px)" }}>
          <div style={{ width: 190, flexShrink: 0, padding: "16px 12px", background: BRAND.white, borderRight: `1px solid ${BRAND.warmGray}` }}>
            <StepIndicator steps={STEPS} current={step} onGo={setStep} />
            {step >= 1 && <div style={{ marginTop: 24 }}><div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 0.6, color: BRAND.textMuted, fontWeight: 600, marginBottom: 6 }}>Time budget</div><div style={{ fontSize: 22, fontWeight: 700, color: totalMinutes > budgetMinutes ? "#B23A2E" : BRAND.cadet }}>{formatTime(totalMinutes)}</div><div style={{ fontSize: 11, color: BRAND.textMuted }}>of {formatTime(budgetMinutes)} ({setup.dayHours.length}d)</div><div style={{ height: 4, background: BRAND.warmGray, borderRadius: 2, marginTop: 6 }}><div style={{ height: 4, borderRadius: 2, background: totalMinutes > budgetMinutes ? "#B23A2E" : BRAND.cadet, width: `${Math.min(100, Math.round((totalMinutes / budgetMinutes) * 100))}%`, transition: "width 0.3s" }} /></div></div>}
            {step === 3 && detailSections.length > 0 && <div style={{ marginTop: 24 }}><div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 0.6, color: BRAND.textMuted, fontWeight: 600, marginBottom: 6 }}>Sections</div>{detailSections.map((s) => <div key={s.id} onClick={() => setSelectedSection(s.id)} style={{ fontSize: 12, padding: "4px 8px", borderRadius: 5, cursor: "pointer", marginBottom: 1, fontWeight: selectedSection === s.id ? 600 : 400, color: selectedSection === s.id ? BRAND.cadet : BRAND.textMuted, background: selectedSection === s.id ? BRAND.cadetLt : "transparent" }}>{s.name}</div>)}</div>}
          </div>
          <div style={{ flex: 1, padding: "24px 28px", maxWidth: 880, overflowY: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{STEPS[step]}</div>
              {setup.customer && <span style={{ fontSize: 12, color: BRAND.textMuted, fontWeight: 500 }}>— {setup.customer}</span>}
            </div>
            <div style={{ fontSize: 13, color: BRAND.textMuted, marginBottom: 20 }}>
              {step === 0 && "Define the workshop context. Changes are saved automatically."}
              {step === 1 && "Build your agenda: add, remove, reorder sections, breaks and intros."}
              {step === 2 && "Your full timeline from start to finish. Click any section for details."}
              {step === 3 && "Review activities, roles, and facilitator tips for each section."}
              {step === 4 && "Choose what to include, then generate a print-ready document."}
            </div>
            {step === 0 && <SetupForm data={setup} onChange={setSetup} />}
            {step === 1 && <SectionSelector sections={sections} setSections={setSections} totalMinutes={totalMinutes} budgetMinutes={budgetMinutes} />}
            {step === 2 && <AgendaTimeline sections={sections} onSelect={handleSelectSection} />}
            {step === 3 && <SectionDetail section={detailSections[cidx]} hasPrev={cidx > 0} hasNext={cidx < detailSections.length - 1} onPrev={() => setSelectedSection(detailSections[cidx - 1]?.id)} onNext={() => setSelectedSection(detailSections[cidx + 1]?.id)} />}
            {step === 4 && <PdfPreview setupData={setup} sections={sections} onGenerate={handleGeneratePdf} generating={generating} />}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, paddingTop: 16, borderTop: `1px solid ${BRAND.warmGray}` }}>
              <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} style={{ padding: "8px 20px", borderRadius: 6, border: `1px solid ${BRAND.warmGray}`, background: BRAND.white, color: step === 0 ? BRAND.carbonLt : BRAND.text, fontSize: 13, fontWeight: 500, cursor: step === 0 ? "default" : "pointer", fontFamily: "inherit" }}>Back</button>
              {step < 4 && <button onClick={goNext} disabled={step === 1 && !enabledSections.length} style={{ padding: "8px 24px", borderRadius: 6, border: "none", background: (step === 1 && !enabledSections.length) ? BRAND.warmGray : BRAND.cadet, color: BRAND.white, fontSize: 13, fontWeight: 600, cursor: (step === 1 && !enabledSections.length) ? "default" : "pointer", fontFamily: "inherit" }}>{["Next: select sections", "Generate agenda", "Review details", "Export PDF"][step]}</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
