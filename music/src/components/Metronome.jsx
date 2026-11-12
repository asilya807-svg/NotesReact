import { useState, useEffect, useRef } from "react";
import { tone } from "../utils/audio";

const tempoName = (b) => (b < 60 ? "Largo" : b < 76 ? "Adagio" : b < 108 ? "Andante" : b < 120 ? "Moderato" : b < 168 ? "Allegro" : "Presto");

export default function Metronome() {
  const [bpm, setBpm] = useState(80);
  const [beats, setBeats] = useState(4);
  const [on, setOn] = useState(false);
  const [cur, setCur] = useState(-1);
  const taps = useRef([]);
  useEffect(() => {
    if (!on) { setCur(-1); return; }
    let i = 0;
    const tick = () => { const b = i++ % beats; setCur(b); tone(b === 0 ? 1000 : 700, 0.06, 0, "square"); };
    tick();
    const id = setInterval(tick, 60000 / bpm);
    return () => clearInterval(id);
  }, [on, bpm, beats]);
  const tap = () => {
    const now = Date.now();
    taps.current = [...taps.current.filter((t) => now - t < 2500), now];
    const t = taps.current;
    if (t.length > 1) setBpm(Math.max(40, Math.min(208, Math.round(60000 / ((t[t.length - 1] - t[0]) / (t.length - 1))))));
  };
  return (
    <div>
      <h3>Metronome</h3>
      <div style={{ textAlign: "center", padding: "10px 0" }}>
        <div style={{ fontSize: 56, fontFamily: "Georgia, serif" }}>{bpm}</div>
        <div className="mute">{tempoName(bpm)}</div>
        <div className="row" style={{ justifyContent: "center", margin: "18px 0" }} aria-hidden="true">
          {Array.from({ length: beats }, (_, i) => <span key={i} style={{ width: 22, height: 22, borderRadius: "50%", background: i === cur ? "var(--acc)" : "var(--line)", transform: i === cur ? "scale(1.3)" : "none", transition: "all .08s" }} />)}
        </div>
        <input type="range" min="40" max="208" value={bpm} onChange={(e) => setBpm(+e.target.value)} aria-label="Tempo in beats per minute" style={{ width: "100%", maxWidth: 360 }} />
      </div>
      <div className="row">
        <button className="btn" onClick={() => setOn(!on)}>{on ? "Stop" : "Start"}</button>
        <button className="btn ghost" onClick={tap}>Tap tempo</button>
        <select value={beats} onChange={(e) => setBeats(+e.target.value)} aria-label="Beats per bar">{[2, 3, 4, 6].map((b) => <option key={b} value={b}>{b} beats</option>)}</select>
      </div>
    </div>
  );
}