import { INSTR, EMOJI } from "../data/constants";

export default function Profile({ profile, setProfile, stats }) {
  const set = (k, v) => setProfile((p) => ({ ...p, [k]: v }));
  return (
    <main>
      <h2>My profile</h2>
      <div className="row" style={{ margin: "16px 0 24px" }}>
        <div className="avatar" aria-hidden="true">{profile.emoji}</div>
        <div><h3>{profile.name || "Your name"}</h3><p className="mute">{profile.inst} · {stats.pieces} pieces · {stats.friends} friends</p></div>
      </div>
      <div className="field"><label htmlFor="pn">Name</label><input id="pn" type="text" value={profile.name} onChange={(e) => set("name", e.target.value)} /></div>
      <div className="field"><label htmlFor="pi">Main instrument</label><select id="pi" value={profile.inst} onChange={(e) => set("inst", e.target.value)}>{INSTR.map((i) => <option key={i}>{i}</option>)}</select></div>
      <div className="field"><label htmlFor="pb">About me</label><textarea id="pb" rows="3" value={profile.bio} onChange={(e) => set("bio", e.target.value)} /></div>
      <div className="field"><span>Avatar</span><div className="row" style={{ gap: 6 }}>{EMOJI.map((e) => <button key={e} className={"chip" + (profile.emoji === e ? " on" : "")} onClick={() => set("emoji", e)} aria-label={"Avatar " + e}>{e}</button>)}</div></div>
      <div className="field"><label htmlFor="pc">Accent color</label>
        <div className="row"><input id="pc" type="color" value={profile.accent || "#e6c27c"} onChange={(e) => set("accent", e.target.value)} /><button className="chip" onClick={() => set("accent", "")}>Reset</button></div></div>
      <p className="mute">Changes save automatically in this browser.</p>
    </main>
  );
}