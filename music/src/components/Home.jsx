export default function Home({ go }) {
  const features = [
    ["Private library", "Upload sheet music as PDF or image, tag each piece with its instrument, and search or filter whenever you need it.", "library", "Open library"],
    ["Share with friends", "Add friends, then choose exactly who can see each piece. Only the people you pick have access.", "friends", "Find friends"],
    ["Play and record", "Hear a piece, record your own playing with your microphone, and keep every take in one list.", "player", "Open player"],
    ["Chat and groups", "Message a friend or start a group of up to 5 people to plan a rehearsal or swap parts.", "chat", "Open chat"],
    ["Free scores", "Search public-domain works by title, composer, or instrument, and add them to your library in one click.", "public", "Search scores"],
    ["Practice studio", "Transpose a part for another instrument, tune with your microphone, and keep time with a metronome.", "studio", "Open studio"],
    ["Your profile", "Pick a name, instrument, avatar, and accent color, and choose how the page background looks.", "profile", "Edit profile"],
  ];
  const steps = [
    ["Upload or find a score", "Upload your own sheet or search the free scores."],
    ["Organize it", "Tag the instrument so every piece is easy to find."],
    ["Share it", "Pick which friends can see it."],
    ["Practice and record", "Play along, record a take, and send it to your teacher."],
  ];
  return (
    <main>
      <section className="hero">
        <h1>Every score you play, in one quiet place.</h1>
        <p>Partitura keeps your sheet music, plays it back, records your own version, and lets you share it with the few people you practice with.</p>
        <div className="row">
          <button className="btn" onClick={() => go("library")}>Open my library</button>
          <button className="btn ghost" onClick={() => go("public")}>Browse free scores</button>
        </div>
      </section>

      <section className="section">
        <h2>Why it exists</h2>
        <p className="lead">Rare pieces are hard to find online, parts for other instruments are often missing, and many music sites are confusing for older teachers. Partitura starts with something simpler: one clear place for the scores you already have, shared only with people you trust.</p>
      </section>

      <section className="section">
        <h2>How it works</h2>
        <div className="steps">{steps.map(([t, d]) => <div className="card" key={t}><h3>{t}</h3><p className="mute">{d}</p></div>)}</div>
      </section>

      <section className="section">
        <h2>What you can do</h2>
        <div className="grid">
          {features.map(([t, d, page, label]) => (
            <div className="card" key={t}>
              <h3>{t}</h3>
              <p className="mute" style={{ marginBottom: 12 }}>{d}</p>
              <button className="btn ghost" onClick={() => go(page)}>{label}</button>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Privacy and copyright</h2>
        <p className="lead">Your library is private by default. There is no public catalog of uploaded files, and nothing is shared unless you choose a friend. The Free scores page lists public-domain works only. If you upload a copyrighted score, keep it for yourself and the people you teach or play with.</p>
      </section>

      <section className="section">
        <h2>Start with one piece</h2>
        <p className="lead">Add a score, tag the instrument, and share it with a friend. It takes about a minute.</p>
        <button className="btn" onClick={() => go("library")}>Upload your first sheet</button>
      </section>
    </main>
  );
}