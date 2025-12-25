import React, { useEffect, useState } from "react";
import { Send, Palette, Info, Music2 } from "lucide-react";
import { createCassette } from "../services/cassettes";

const cassetteColors = [
  ["#fde68a", "#fbbf24"],
  ["#e9d5ff", "#d8b4fe"],
  ["#bfdbfe", "#93c5fd"],
  ["#a7f3d0", "#6ee7b7"],
  ["#fed7aa", "#fdba74"],
  ["#fbcfe8", "#f9a8d4"],
  ["#fca5a5", "#f87171"],
  ["#c4b5fd", "#a78bfa"],
];

function Cassette({ playing, shellColors = ["#fde68a", "#fbbf24"] }) {
  useEffect(() => {
    const s = document.createElement("style");
    s.type = "text/css";
    s.appendChild(document.createTextNode("@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}"));
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  return (
    <svg viewBox="0 0 600 420" className="w-full max-w-[520px] drop-shadow-2xl">
      <defs>
        <linearGradient id="shell-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={shellColors[0]} stopOpacity="0.85" />
          <stop offset="100%" stopColor={shellColors[1]} stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="window-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#5eead4" />
        </linearGradient>
      </defs>

      <rect x="20" y="20" rx="32" width="560" height="380" fill="url(#shell-gradient)" stroke="white" strokeWidth="2" strokeOpacity="0.5" />

      <circle cx="50" cy="50" r="8" fill="white" fillOpacity="0.3" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" />
      <circle cx="550" cy="50" r="8" fill="white" fillOpacity="0.3" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" />
      <circle cx="50" cy="370" r="8" fill="white" fillOpacity="0.3" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" />
      <circle cx="550" cy="370" r="8" fill="white" fillOpacity="0.3" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" />

      <rect x="60" y="70" rx="24" width="480" height="240" fill="rgba(255,255,255,0.4)" stroke="white" strokeWidth="3" strokeOpacity="0.7" />

      <rect x="80" y="70" width="70" height="240" fill="#fecddaff" fillOpacity="0.7" />
      <rect x="150" y="70" width="70" height="240" fill="#a5f6fcff" fillOpacity="0.7" />
      <rect x="220" y="70" width="80" height="240" fill="#bbf7c9ff" fillOpacity="0.7" />
      <rect x="300" y="70" width="120" height="240" fill="white" fillOpacity="0.3" />
      <rect x="420" y="70" width="70" height="240" fill="#a5fcf9ff" fillOpacity="0.7" />
      <rect x="490" y="70" width="50" height="240" fill="#fecdd0ff" fillOpacity="0.7" />

      <rect x="110" y="120" rx="28" width="380" height="170" fill="#1e1b4b" />

      <rect x="170" y="145" rx="14" width="260" height="65" fill="url(#window-gradient)" opacity="0.95" />
      <text x="300" y="185" textAnchor="middle" fill="white" fillOpacity="0.9" fontFamily="monospace" fontSize="16" letterSpacing="5">
        100 — 50 — 0
      </text>

      <g style={{ transformOrigin: "220px 245px", animation: playing ? "spin 2s linear infinite" : "none" }}>
        <circle cx="220" cy="245" r="42" fill="#67e8f9" opacity="0.95" />
        <circle cx="220" cy="245" r="18" fill="#1f2937" />
        <circle cx="220" cy="245" r="6" fill="#4b5563" />
      </g>

      <g style={{ transformOrigin: "380px 245px", animation: playing ? "spin 2s linear infinite" : "none" }}>
        <circle cx="380" cy="245" r="42" fill="#67e8f9" opacity="0.95" />
        <circle cx="380" cy="245" r="18" fill="#1f2937" />
        <circle cx="380" cy="245" r="6" fill="#4b5563" />
      </g>

      <rect x="270" y="235" width="60" height="7" rx="3.5" fill="#22c55e" />
      <rect x="270" y="245" width="60" height="7" rx="3.5" fill="#3b82f6" />
      <rect x="270" y="255" width="60" height="5" rx="2.5" fill="#94a3b8" />

      <circle cx="200" cy="350" r="14" fill="white" fillOpacity="0.2" stroke="white" strokeOpacity="0.4" strokeWidth="2" />
      <circle cx="400" cy="350" r="14" fill="white" fillOpacity="0.2" stroke="white" strokeOpacity="0.4" strokeWidth="2" />
      <rect x="270" y="340" width="60" height="20" rx="10" fill="white" fillOpacity="0.25" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" />
      <rect x="245" y="348" width="15" height="10" rx="2" fill="#52525b" />
      <rect x="340" y="348" width="15" height="10" rx="2" fill="#52525b" />
      <circle cx="300" cy="330" r="12" fill="white" fillOpacity="0.25" stroke="white" strokeOpacity="0.4" strokeWidth="2" />
    </svg>
  );
}

export default function CassetteSender() {
  
  const [panel, setPanel] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [cassetteColor, setCassetteColor] = useState(cassetteColors[5]);
  const [bgColor, setBgColor] = useState("#f3e8ff");
  const [songUrl, setSongUrl] = useState("");
  const [message, setMessage] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [sending, setSending] = useState(false);

  const bgColors = [
    "#fff1f2",
    "#f3e8ff",
    "#ecfeff",
    "#ecfdf5",
    "#fffbeb",
    "#fdf2f8",
    "#eef2ff",
    "#f8fafc",
  ];

  const toggle = (key) => setPanel((p) => (p === key ? null : key));

  const [shareLink, setShareLink] = useState("");
  const [emailStatus, setEmailStatus] = useState("");

  const handleSend = async () => {
    if (!songUrl || !receiverName) {
      alert("Please provide a song link and friend's name.");
      return;
    }

    setSending(true);
    try {
      const payload = await createCassette({
        sender_email: senderName,
        receiver_email: receiverName,
        song_url: songUrl,
        message,
      });

      const shareId = payload.share_id || payload.id;
      // Use custom domain if set in env, otherwise use current origin
      const appDomain = import.meta.env.VITE_APP_URL || window.location.origin;
      const link = `${appDomain}/c/${shareId}`;
      setShareLink(link);

      try {
        await navigator.clipboard.writeText(link);
        setEmailStatus(`✓ Link copied to clipboard!`);
      } catch {
        setEmailStatus(`✓ Cassette created! Copy the link below to share.`);
      }

      setSongUrl("");
      setMessage("");
      setReceiverName("");
      setSenderName("");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to create cassette.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: bgColor, fontFamily: "Georgia, serif", position: "relative" }}>
      <div style={styles.nav}>
        <NavBtn active={panel === "send"} onClick={() => toggle("send")}>
          <Send size={18} />
        </NavBtn>
        <NavBtn active={panel === "palette"} onClick={() => toggle("palette")}>
          <Palette size={18} />
        </NavBtn>
        <NavBtn active={panel === "about"} onClick={() => toggle("about")}>
          <Info size={18} />
        </NavBtn>
      </div>

      {panel === "send" && (
        <Panel>
          <h2 style={styles.panelTitle}>Send Today’s Song</h2>

          <div style={styles.field}>
            <label style={styles.labelSmall}>Song link</label>
            <Input placeholder="YouTube or Spotify link…" value={songUrl} onChange={(e) => setSongUrl(e.target.value)} />
          </div>

          <div style={styles.field}>
            <label style={styles.labelSmall}>Your name</label>
            <Input placeholder="Your name, nickname, or funny name…" value={senderName} onChange={(e) => setSenderName(e.target.value)} />
          </div>

          <div style={styles.field}>
            <label style={styles.labelSmall}>Message</label>
            <Textarea placeholder="Write something meaningful…" value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>

          <div style={styles.field}>
            <label style={styles.labelSmall}>Friend's name</label>
            <Input placeholder="Their name, nickname, or funny name…" value={receiverName} onChange={(e) => setReceiverName(e.target.value)} />
          </div>

          <button style={{ ...styles.sendBtn, opacity: sending ? 0.8 : 1 }} onClick={handleSend} disabled={sending || !songUrl || !receiverName}>
            <Send size={18} />
            <span style={{ marginLeft: 8 }}>{sending ? "Creating…" : "Create Cassette"}</span>
          </button>

          {shareLink && (
            <div style={{ marginTop: 12 }}>
              <label style={styles.labelSmall}>Share link</label>
              <div style={{ display: "flex", gap: 8 }}>
                <input value={shareLink} readOnly style={{ ...styles.input, paddingRight: 8 }} />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(shareLink).then(() => alert("Copied link to clipboard."));
                  }}
                  style={{ padding: "10px 12px", borderRadius: 10, border: "none", background: "#111827", color: "#fff" }}
                >
                  Copy
                </button>
              </div>
              <p style={{ fontSize: 13, opacity: 0.8, marginTop: 8 }}>{emailStatus}</p>
            </div>
          )}
        </Panel>
      )}

      {panel === "palette" && (
        <Panel>
          <Label>cassette</Label>
          <Grid>
            {cassetteColors.map((c, i) => (
              <Dot key={i} color={`linear-gradient(180deg, ${c[0]}, ${c[1]})`} active={cassetteColor === c} onClick={() => setCassetteColor(c)} />
            ))}
          </Grid>

          <Label>background</Label>
          <Grid>
            {bgColors.map((c) => (
              <Dot key={c} color={c} active={bgColor === c} onClick={() => setBgColor(c)} />
            ))}
          </Grid>
        </Panel>
      )}

      {panel === "about" && (
        <Panel>
          <h2 style={styles.aboutTitle}>About Cassette</h2>
          <div style={styles.aboutDivider} />
          <p style={styles.aboutBody}>Cassette is a quiet ritual.
            <br />One song. One day. No rush.
          </p>
          <p style={styles.aboutBody}>
            Each day, you send a single track — wrapped in a note,
            sealed like a tape, meant to be played with intention.
          </p>
          <p style={styles.aboutFooter}>
            At midnight, the cassette rewinds.
            <br />Tomorrow waits.
          </p>
        </Panel>
      )}

      <div style={styles.center}>
        <div style={styles.title}>
          <Music2 size={28} style={{ opacity: 0.5 }} />
          <h1 style={{ margin: 0 }}>cassette</h1>
          <Music2 size={28} style={{ opacity: 0.5 }} />
        </div>
        <p style={styles.subtitle}>one song, one day</p>

       <div
  style={{
    margin: "48px auto",
    display: "flex",
    justifyContent: "center",
    width: 360,        // 👈 controls cassette size
    maxWidth: "90vw", // 👈 responsive on mobile
  }}
>
  <Cassette playing={playing} shellColors={cassetteColor} />
</div>


        <button style={styles.play} onClick={() => setPlaying((p) => !p)}>
          {playing ? "❚❚" : "▶"}
        </button>

        <p style={styles.waiting}>“how's the song”</p>
        <p style={styles.footer}>© tamilelakiya — All Rights Reserved</p>
      </div>
    </div>
  );
}

const NavBtn = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      ...styles.navBtn,
      background: active ? "#fff" : "rgba(255,255,255,0.7)",
      transform: active ? "scale(1.1)" : "none",
    }}
  >
    {children}
  </button>
);

const Panel = ({ children }) => <div style={styles.panel}>{children}</div>;
const Input = (props) => <input {...props} style={styles.input} />;
const Textarea = (props) => <textarea {...props} style={{ ...styles.input, height: 120 }} />;
const Label = ({ children }) => <p style={styles.label}>{children}</p>;
const Grid = ({ children }) => <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>{children}</div>;
const Dot = ({ color, active, onClick }) => (
  <div onClick={onClick} style={{ width: 48, height: 48, borderRadius: "50%", background: color, border: active ? "4px solid #555" : "2px solid rgba(0,0,0,0.1)", cursor: "pointer" }} />
);

const styles = {
  nav: { position: "fixed", top: 24, right: 24, display: "flex", gap: 12 },
  navBtn: { width: 56, height: 56, borderRadius: "50%", border: "none", boxShadow: "0 10px 30px rgba(0,0,0,.15)" },
  panel: {
    position: "fixed",
    top: "50%",
    right: 24,
    transform: "translateY(-50%)",
    width: 330,
    maxHeight: "68vh",
    overflowY: "auto",
    background: "linear-gradient(180deg, #ffffff 0%, #fafafa 100%)",
    borderRadius: 26,
    padding: "22px 22px 20px",
    boxShadow: "0 28px 60px rgba(0,0,0,.18)",
    border: "1px solid rgba(0,0,0,0.05)",
    fontFamily: '"Inter", system-ui, sans-serif',
  },
  aboutTitle: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 600, marginBottom: 12, letterSpacing: "0.3px" },
  aboutDivider: { width: 48, height: 1, background: "rgba(0,0,0,0.15)", margin: "12px 0 20px" },
  aboutBody: { fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 15, lineHeight: 1.7, color: "#444", marginBottom: 16 },
  aboutFooter: { fontFamily: "'Courier New', monospace", fontSize: 13, opacity: 0.65, marginTop: 10, lineHeight: 1.6 },
  panelTitle: { fontSize: 26, marginBottom: 16 },
  label: { margin: "16px 0 8px", opacity: 0.6 },
  labelSmall: { display: "block", marginBottom: 8, fontSize: 13, color: "#444" },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 14px",
    borderRadius: 14,
    border: "1px solid #e5e7eb",
    marginBottom: 10,
    fontSize: 14,
    lineHeight: 1.4,
    outline: "none",
    background: "#fff",
  },
  sendBtn: { marginTop: 12, width: "100%", padding: 16, borderRadius: 18, background: "#444", color: "#fff", border: "none", display: "flex", gap: 10, justifyContent: "center" },
  center: { textAlign: "center", paddingTop: 80 },
  title: { display: "flex", justifyContent: "center", gap: 10, alignItems: "center", fontSize: 42 },
  subtitle: { opacity: 0.6 },
  cassette: { margin: "48px auto", width: 460, height: 300, borderRadius: 40, padding: 18, boxShadow: "0 40px 80px rgba(0,0,0,0.25), inset 0 0 0 2px rgba(255,255,255,0.4)" },
  cassetteGlass: { width: "100%", height: "100%", borderRadius: 32, background: "rgba(255,255,255,0.35)", backdropFilter: "blur(14px)", display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.5)" },
  inner: { background: "linear-gradient(180deg,#1e1b4b,#0f172a)", width: 320, height: 180, borderRadius: 26, padding: 18, boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.08), 0 20px 40px rgba(0,0,0,0.4)" },
  screen: { background: "linear-gradient(90deg,#a78bfa,#5eead4)", borderRadius: 14, padding: "14px 16px", marginBottom: 22, color: "#fff", fontFamily: "monospace", letterSpacing: 4, boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.2)" },
  reels: { display: "flex", justifyContent: "space-between", padding: "0 24px" },
  play: { width: 64, height: 64, borderRadius: "50%", border: "none", fontSize: 22, background: "#fff", boxShadow: "0 10px 30px rgba(0,0,0,.2)" },
  waiting: { marginTop: 16, opacity: 0.6, fontStyle: "italic" },
  footer: { marginTop: 20, fontSize: 12, opacity: 0.4 },
};
