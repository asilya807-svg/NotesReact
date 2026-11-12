import "./App.css";
import usePersistentState from "./hooks/usePersistentState";
import { useState } from "react";
import Background from "./components/Background";
import Home from "./components/Home";
import Library from "./components/Library";
import Player from "./components/Player";
import Chat from "./components/Chat";
import Friends from "./components/Friends";
import PublicLib from "./components/PublicLib";
import Studio from "./components/Studio";
import Profile from "./components/Profile";

const TABS = [["library", "Library"], ["player", "Player"], ["studio", "Studio"], ["chat", "Chat"], ["friends", "Friends"], ["public", "Free scores"], ["profile", "Profile"]];

export default function App() {
  const [page, setPage] = useState("home");
  const [theme, setTheme] = usePersistentState("theme", "dark");
  const [bg, setBg] = usePersistentState("bg", "both");
  const [profile, setProfile] = usePersistentState("profile", { name: "", inst: "Piano", bio: "", emoji: "🎼", accent: "" });
  const [friends, setFriends] = usePersistentState("friends", []);
  const [files, setFiles] = useState([]);
  const addToLib = (f) => { setFiles((p) => [{ ...f, id: Math.random(), shared: [] }, ...p]); setPage("library"); };
  return (
    <div className="app" data-theme={theme} style={profile.accent ? { "--acc": profile.accent } : undefined}>
      <Background mode={bg} />
      <nav>
        <span className="logo" onClick={() => setPage("home")}>♪ Partitura</span>
        {TABS.map(([k, l]) => <button key={k} className={"tab" + (page === k ? " on" : "")} onClick={() => setPage(k)}>{l}</button>)}
        <select value={bg} onChange={(e) => setBg(e.target.value)} aria-label="Background">
          <option value="both">Staff + notes</option><option value="staff">Staff only</option><option value="plain">Plain</option>
        </select>
        <button className="btn ghost" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme === "dark" ? "Light" : "Dark"}</button>
      </nav>
      {page === "home" && <Home go={setPage} />}
      {page === "library" && <Library files={files} setFiles={setFiles} friends={friends} />}
      {page === "player" && <Player />}
      {page === "studio" && <Studio />}
      {page === "chat" && <Chat friends={friends} />}
      {page === "friends" && <Friends friends={friends} setFriends={setFriends} me={profile.name} />}
      {page === "public" && <PublicLib addToLib={addToLib} />}
      {page === "profile" && <Profile profile={profile} setProfile={setProfile} stats={{ pieces: files.length, friends: friends.length }} />}
    </div>
  );
}