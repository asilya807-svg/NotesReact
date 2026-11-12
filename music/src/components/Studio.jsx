import { useState } from "react";
import Transposer from "./Transposer";
import Metronome from "./Metronome";

const TOOLS = [["transpose", "Transposer", Transposer], ["tuner", "Tuner", "Tuner"], ["metro", "Metronome", Metronome]];

export default function Studio() {
  const [id, setId] = useState("transpose");
  const Tool = TOOLS.find((t) => t[0] === id)[2];
  return (
    <main>
      <h2>Studio</h2>
      <p className="mute">Small tools for practice. Everything runs in your browser.</p>
      <div className="row" style={{ margin: "16px 0" }}>
        {TOOLS.map(([k, l]) => <button key={k} className={"chip" + (id === k ? " on" : "")} onClick={() => setId(k)}>{l}</button>)}
      </div>
      <div className="card"><Tool /></div>
    </main>
  );
}