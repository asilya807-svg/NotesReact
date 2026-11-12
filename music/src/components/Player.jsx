import { useState, useRef } from "react";
import { ODE } from "../data/constants";

export default function Player() {
  const [recs, setRecs] = useState([]);
  const [rec, setRec] = useState(false);
  const [err, setErr] = useState("");
  const [tracks, setTracks] = useState([]);
  const mr = useRef(null);
  const playOde = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    ODE.forEach((hz, i) => {
      const o = ctx.createOscillator(), g = ctx.createGain(), t = ctx.currentTime + i * 0.45;
      o.type = "triangle"; o.frequency.value = hz;
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.3, t + 0.03); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.42);
      o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + 0.45);
    });
  };
  const toggle = async () => {
    if (rec) { mr.current.stop(); setRec(false); return; }
    try {
      const s = await navigator.mediaDevices.getUserMedia({ audio: true });
      const chunks = [], m = new MediaRecorder(s);
      m.ondataavailable = (e) => chunks.push(e.data);
      m.onstop = () => { s.getTracks().forEach((t) => t.stop()); setRecs((p) => [{ id: Math.random(), url: URL.createObjectURL(new Blob(chunks)), n: p.length + 1 }, ...p]); };
      mr.current = m; m.start(); setRec(true); setErr("");
    } catch { setErr("Microphone access was blocked. Allow it in your browser settings and try again."); }
  };
  return (
    <main>
      <h2>Player</h2>
      <div className="grid">
        <div className="card">
          <h3>Ode to Joy (demo)</h3>
          <p className="mute" style={{ marginBottom: 12 }}>A built-in melody to test playback. Add your own audio files for real recordings.</p>
          <button className="btn" onClick={playOde}>Play</button>
        </div>
        <div className="card">
          <h3>Record yourself</h3>
          <p className="mute" style={{ marginBottom: 12 }}>{rec ? "Recording… press stop when you finish." : "Press record and start playing."}</p>
          <button className="btn" onClick={toggle}>{rec ? "Stop" : "Record"}</button>
          {err && <p style={{ color: "#d9534f", marginTop: 8 }}>{err}</p>}
        </div>
        <div className="card">
          <h3>My playlist</h3>
          <label className="btn ghost" style={{ display: "inline-block", cursor: "pointer", marginBottom: 8, padding: "6px 14px", borderRadius: 8 }}>
            Add audio files
            <input type="file" accept="audio/*" multiple hidden onChange={(e) => setTracks((p) => [...p, ...[...e.target.files].map((f) => ({ id: Math.random(), name: f.name, url: URL.createObjectURL(f) }))])} />
          </label>
          {tracks.map((t) => <div key={t.id}><p className="mute">{t.name}</p><audio controls src={t.url} style={{ width: "100%" }} /></div>)}
        </div>
      </div>
      {recs.length > 0 && <><h3 style={{ margin: "28px 0 8px" }}>My recordings</h3>
        {recs.map((r) => <div key={r.id} className="card" style={{ marginBottom: 10 }}><p className="mute">Take {r.n}</p><audio controls src={r.url} style={{ width: "100%" }} /></div>)}</>}
    </main>
  );
}