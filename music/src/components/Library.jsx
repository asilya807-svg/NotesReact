import { useState } from "react";
import { INSTR } from "../data/constants";

export default function Library({ files, setFiles, friends }) {
  const [inst, setInst] = useState("Piano");
  const [filter, setFilter] = useState("All");
  const [q, setQ] = useState("");
  const upload = (e) => {
    const added = [...e.target.files].map((x) => ({ id: Math.random(), name: x.name, inst, url: URL.createObjectURL(x), local: true, shared: [] }));
    setFiles((p) => [...added, ...p]);
    e.target.value = "";
  };
  const share = (id, who) => setFiles((p) => p.map((f) => f.id === id ? { ...f, shared: f.shared.includes(who) ? f.shared.filter((w) => w !== who) : [...f.shared, who] } : f));
  const remove = (id) => setFiles((p) => p.filter((f) => f.id !== id));
  const shown = files.filter((f) => (filter === "All" || f.inst === filter) && f.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <main>
      <h2>My library</h2>
      <p className="mute">{files.length} {files.length === 1 ? "piece" : "pieces"}. Files stay in this browser tab until you add a backend, so they disappear when you refresh.</p>
      <div className="row" style={{ margin: "16px 0" }}>
        <select value={inst} onChange={(e) => setInst(e.target.value)} aria-label="Instrument for new upload">{INSTR.map((i) => <option key={i}>{i}</option>)}</select>
        <label className="btn" style={{ padding: "6px 14px", borderRadius: 8, cursor: "pointer" }}>
          Upload sheet (PDF or image)
          <input type="file" accept=".pdf,image/*" multiple onChange={upload} hidden />
        </label>
      </div>
      <input type="text" className="search" placeholder="Search my pieces" aria-label="Search my pieces" value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="row">{["All", ...INSTR].map((i) => <button key={i} className={"chip" + (filter === i ? " on" : "")} onClick={() => setFilter(i)}>{i}</button>)}</div>
      {!shown.length && <p className="mute" style={{ marginTop: 24 }}>{files.length ? "No pieces match your search." : "Your library is empty. Upload a sheet above, or add one from Free scores."}</p>}
      <div className="grid">
        {shown.map((f) => (
          <div className="card" key={f.id}>
            <h3>{f.name}</h3>
            <p className="mute" style={{ marginBottom: 8 }}>{f.inst}</p>
            <a className="link" href={f.url} target="_blank" rel="noreferrer">Open</a>
            {f.local && <a className="link" href={f.url} download={f.name}>Download</a>}
            <button className="chip" onClick={() => remove(f.id)}>Remove</button>
            <p className="mute" style={{ margin: "10px 0 6px" }}>Shared with:</p>
            {friends.length ? <div className="row" style={{ gap: 6 }}>{friends.map((n) => <button key={n} className={"chip" + (f.shared.includes(n) ? " on" : "")} onClick={() => share(f.id, n)}>{n}</button>)}</div>
              : <p className="mute">Add friends first to share this piece.</p>}
          </div>
        ))}
      </div>
    </main>
  );
}