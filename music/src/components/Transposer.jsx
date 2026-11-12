import { useState } from "react";
import { parseNote, midiName, midiToFreq, tone } from "../utils/audio";


const INSTRS = {
  Flute: [0, 60, 96], Violin: [0, 55, 100], Cello: [0, 36, 76], Piano: [0, 21, 108],
  "Clarinet in Bb": [-2, 50, 94], "Trumpet in Bb": [-2, 55, 82], "Alto sax in Eb": [-9, 49, 81], "Horn in F": [-7, 34, 77],
};

export default function Transposer() {
  const [text, setText] = useState("C4 D4 E4 F4 G4 A4 B4 C5");
  const [from, setFrom] = useState("Flute");
  const [to, setTo] = useState("Violin");
  const [oct, setOct] = useState(0);
  const tokens = text.split(/[\s,]+/).filter(Boolean);
  const [shiftFrom] = INSTRS[from];
  const [shiftTo, lo, hi] = INSTRS[to];
  const notes = tokens.map((t) => {
    const m = parseNote(t);
    if (m === null) return { t, bad: true };
    const sounding = m + shiftFrom + 12 * oct;
    return { t, sounding, out: midiName(sounding - shiftTo), range: sounding >= lo && sounding <= hi };
  });
  const outside = notes.filter((n) => !n.bad && !n.range).length;
  const play = () => notes.forEach((n, i) => !n.bad && tone(midiToFreq(n.sounding), 0.35, i * 0.4));
  const sel = (v, set, label) => (
    <label className="field" style={{ margin: 0 }}>{label}
      <select value={v} onChange={(e) => set(e.target.value)}>{Object.keys(INSTRS).map((i) => <option key={i}>{i}</option>)}</select>
    </label>
  );
  return (
    <div>
      <h3>Transposer</h3>
      <p className="mute" style={{ margin: "6px 0 14px" }}>Type notes written for one instrument (like C4 F#4 Bb3) and get the part for another. It also warns you when a note is out of the new instrument's range.</p>
      <div className="field"><label htmlFor="tn">Notes</label><input id="tn" type="text" value={text} onChange={(e) => setText(e.target.value)} /></div>
      <div className="row" style={{ marginBottom: 14 }}>
        {sel(from, setFrom, "Written for")}{sel(to, setTo, "Convert to")}
        <div className="row" style={{ alignSelf: "flex-end" }}>
          <button className="chip" onClick={() => setOct(oct - 1)}>Octave down</button>
          <span className="mute">{oct > 0 ? "+" : ""}{oct}</span>
          <button className="chip" onClick={() => setOct(oct + 1)}>Octave up</button>
        </div>
      </div>
      <div className="row">
        {notes.map((n, i) => (
          <span key={i} className="card" style={{ padding: "6px 12px", borderColor: n.bad || !n.range ? "#d9534f" : undefined }}>
            {n.bad ? <span className="mute">{n.t}?</span> : <>{n.t} <b>→ {n.out}</b></>}
          </span>
        ))}
      </div>
      {outside > 0 && <p style={{ color: "#d9534f", marginTop: 12 }}>{outside} {outside === 1 ? "note is" : "notes are"} outside the range of {to}. Try the octave buttons.</p>}
      <button className="btn" style={{ marginTop: 16 }} onClick={play}>Hear it (concert pitch)</button>
    </div>
  );
}