import { useState } from "react";

export default function Chat({ friends }) {
  const [groups, setGroups] = useState([]);
  const [msgs, setMsgs] = useState({});
  const rooms = [...friends.map((n) => ({ id: n, name: n, members: [n] })), ...groups];
  const [cur, setCur] = useState(null);
  const [text, setText] = useState("");
  const [pick, setPick] = useState([]);
  const room = rooms.find((r) => r.id === cur) || rooms[0];
  const send = () => {
    if (!text.trim()) return;
    setMsgs((p) => ({ ...p, [room.id]: [...(p[room.id] || []), text] }));
    setText("");
  };
  const toggle = (n) => setPick((p) => p.includes(n) ? p.filter((x) => x !== n) : p.length < 4 ? [...p, n] : p);
  const create = () => {
    if (pick.length < 2) return;
    const g = { id: "g" + Date.now(), name: "Group: " + pick.join(", "), members: pick };
    setGroups((p) => [...p, g]); setCur(g.id); setPick([]);
  };
  return (
    <main>
      <h2>Chat</h2>
      {!friends.length && <p className="mute" style={{ marginTop: 16 }}>You have no friends yet. Add friends first, then you can chat and make groups.</p>}
      {friends.length > 0 && (<>
      <div className="chat" style={{ marginTop: 16 }}>
        <div className="rooms">
          {rooms.map((r) => <button key={r.id} className={"room" + (r.id === cur ? " on" : "")} onClick={() => setCur(r.id)}>{r.name}</button>)}
          <p className="mute" style={{ marginTop: 12 }}>New group (you + up to 4 friends)</p>
          <div className="row" style={{ gap: 6 }}>{friends.map((n) => <button key={n} className={"chip" + (pick.includes(n) ? " on" : "")} onClick={() => toggle(n)}>{n}</button>)}</div>
          <button className="btn" disabled={pick.length < 2} onClick={create}>Create group</button>
        </div>
        <div className="card" style={{ display: "flex", flexDirection: "column" }}>
          <h3>{room.name} <span className="mute">({room.members.length + 1} people)</span></h3>
          <div className="msgs">
            {!(msgs[room.id] || []).length && <p className="mute">No messages yet. Say hello.</p>}
            {(msgs[room.id] || []).map((m, i) => <div key={i} className="msg me">{m}</div>)}
          </div>
          <div className="row">
            <input type="text" style={{ flex: 1 }} value={text} placeholder="Write a message" aria-label="Message" onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} />
            <button className="btn" onClick={send}>Send</button>
          </div>
        </div>
      </div>
      </>)}
      <p className="mute" style={{ marginTop: 16 }}>Messages stay in this browser for now. Real chat between users needs a backend (see notes).</p>
    </main>
  );
}