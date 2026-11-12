import { useState } from "react";
import { PUBLIC, INSTR } from "../data/constants";

export default function PublicLib({ addToLib }) {
  const [q, setQ] = useState("");
  const [inst, setInst] = useState("All");
  const shown = PUBLIC.filter((p) => (inst === "All" || p.inst === inst) && (p.title + " " + p.composer).toLowerCase().includes(q.toLowerCase()));
  const imslp = (p) => "https://imslp.org/index.php?search=" + encodeURIComponent(p.title + " " + p.composer);
  return (
    <main>
      <h2>Free scores</h2>
      <p className="lead">Public-domain works. This list is a starting catalog: each score opens a search on IMSLP, where you can download the PDF. To host files yourself, put PDFs in your project's public folder and link to them.</p>
      <input type="text" className="search" placeholder="Search by title or composer" aria-label="Search free scores" value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="row">{["All", ...INSTR].map((i) => <button key={i} className={"chip" + (inst === i ? " on" : "")} onClick={() => setInst(i)}>{i}</button>)}</div>
      {!shown.length && <p className="mute" style={{ marginTop: 24 }}>No scores match. Try another title, composer, or instrument.</p>}
      <div className="grid">
        {shown.map((p) => (
          <div className="card" key={p.title}>
            <h3>{p.title}</h3>
            <p className="mute" style={{ marginBottom: 12 }}>{p.composer} · {p.inst}</p>
            <a className="link" href={imslp(p)} target="_blank" rel="noreferrer">Get PDF</a>
            <button className="chip" onClick={() => addToLib({ name: p.title, inst: p.inst, url: imslp(p) })}>Add to my library</button>
          </div>
        ))}
      </div>
    </main>
  );
}