import { useState } from "react";
import { USERS } from "../data/constants";

export default function Friends({ friends, setFriends, me }) {
  const [q, setQ] = useState("");
  const results = q.trim() ? USERS.filter((u) => u.name !== me && u.name.toLowerCase().includes(q.toLowerCase())) : [];
  const add = (n) => setFriends((p) => (p.includes(n) ? p : [...p, n]));
  const remove = (n) => setFriends((p) => p.filter((x) => x !== n));
  const inst = (n) => USERS.find((u) => u.name === n)?.inst;
  return (
    <main>
      <h2>Friends</h2>
      <p className="mute">Search for people by name and add them. Friends can be chosen when you share a piece or start a chat.</p>
      <input type="text" className="search" placeholder="Search users by name" aria-label="Search users" value={q} onChange={(e) => setQ(e.target.value)} />
      {q.trim() && !results.length && <p className="mute">No users found for "{q}".</p>}
      <div className="grid">
        {results.map((u) => (
          <div className="card" key={u.name}>
            <h3>{u.name}</h3>
            <p className="mute" style={{ marginBottom: 12 }}>{u.inst}</p>
            {friends.includes(u.name) ? <button className="btn ghost" onClick={() => remove(u.name)}>Remove friend</button> : <button className="btn" onClick={() => add(u.name)}>Add friend</button>}
          </div>
        ))}
      </div>
      <h3 style={{ margin: "32px 0 8px" }}>My friends ({friends.length})</h3>
      {!friends.length && <p className="mute">No friends yet. Search above to add someone.</p>}
      <div className="row">{friends.map((n) => <span className="card" key={n} style={{ padding: "8px 14px" }}>{n} <span className="mute">· {inst(n)}</span> <button className="chip" onClick={() => remove(n)}>Remove</button></span>)}</div>
    </main>
  );
}