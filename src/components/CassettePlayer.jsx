import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getCassetteByShareId } from "../services/cassettes";

const wishes = [
  "May this melody stay with you always.",
  "Hope this song brings you joy.",
  "Wishing you moments as beautiful as this tune.",
  "Let this music warm your heart.",
  "May every note remind you of good times.",
  "Sending you good vibes through this song.",
  "Hope you carry this feeling forward.",
  "This song is a little piece of care, just for you.",
  "May your day be as lovely as this cassette.",
  "Wishing you find magic in every moment.",
];

const facts = [
  "Vinyl records rotate at 33⅓ RPM, while 45s spin at 45 RPM.",
  "The first cassette tape was released in 1963.",
  "Cassettes dominated music from the 1980s to early 2000s.",
  "A typical cassette tape contained about 90 minutes of music.",
  "Some cassettes were so popular, people recorded over them multiple times.",
  "The compact disc almost entirely replaced cassettes by the 2000s.",
  "Streaming now dominates, but vinyl and cassettes are making a comeback.",
  "The sound quality of cassettes depends on the tape grade and player.",
  "Many people still cherish their cassette collections as nostalgic treasures.",
  "A single cassette tape can store hours of audio information.",
];

export default function CassettePlayer() {
  const { shareId } = useParams();
  const audioRef = useRef(null);

  const [cassette, setCassette] = useState(null);
  const [loading, setLoading] = useState(true);
  const [embedSrc, setEmbedSrc] = useState(null);
  const [playFinished, setPlayFinished] = useState(false);
  const [randomWish, setRandomWish] = useState("");
  const [randomFact, setRandomFact] = useState("");

  useEffect(() => {
    if (!shareId) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function loadCassette() {
      setLoading(true);
      try {
        const data = await getCassetteByShareId(shareId);
        if (cancelled) return;

        setCassette(data);

        if (data?.song_url) {
          const type = detectType(data.song_url);

          if (type === "youtube") {
            const vid = getYouTubeId(data.song_url);
            if (vid) {
              setEmbedSrc(`https://www.youtube.com/embed/${vid}?autoplay=1&rel=0`);
            }
          }

          if (type === "spotify") {
            const src = getSpotifyEmbed(data.song_url);
            if (src) setEmbedSrc(src);
          }

          if (type === "audio") {
            setTimeout(() => {
              audioRef.current?.play().catch(() => {});
            }, 150);
          }
        }
      } catch (err) {
        console.error("Failed to load cassette:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadCassette();

    return () => {
      cancelled = true;
    };
  }, [shareId]);

  const detectType = (url) => {
    const u = url?.toLowerCase() || "";
    if (u.endsWith(".mp3") || u.endsWith(".wav") || u.endsWith(".m4a") || u.includes(".ogg")) return "audio";
    if (u.includes("youtube.com") || u.includes("youtu.be")) return "youtube";
    if (u.includes("open.spotify.com")) return "spotify";
    return "link";
  };

  const getYouTubeId = (url) => {
    if (url.includes("youtu.be/")) return url.split("youtu.be/")[1].split(/[?&]/)[0];
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : null;
  };

  const getSpotifyEmbed = (url) => {
    try {
      const [, rest] = url.split("open.spotify.com/");
      if (!rest) return null;
      const [type, id] = rest.split("/");
      return `https://open.spotify.com/embed/${type}/${id.split("?")[0]}`;
    } catch {
      return null;
    }
  };

  const handleAudioEnd = () => {
    setRandomWish(wishes[Math.floor(Math.random() * wishes.length)]);
    setRandomFact(facts[Math.floor(Math.random() * facts.length)]);
    setPlayFinished(true);
  };

  const handlePlay = () => {
    if (!cassette?.song_url) return;

    const type = detectType(cassette.song_url);

    if (type === "audio") {
      audioRef.current?.play().catch(() => {});
      return;
    }

    if (type === "youtube") {
      const vid = getYouTubeId(cassette.song_url);
      if (vid) setEmbedSrc(`https://www.youtube.com/embed/${vid}?autoplay=1&rel=0`);
      return;
    }

    if (type === "spotify") {
      const src = getSpotifyEmbed(cassette.song_url);
      if (src) setEmbedSrc(src);
      return;
    }

    window.open(cassette.song_url, "_blank", "noopener,noreferrer");
  };

  const renderMedia = () => {
    if (!cassette) return null;

    const type = detectType(cassette.song_url);

    if (type === "audio") {
      return (
        <audio
          ref={audioRef}
          src={cassette.song_url}
          controls
          onEnded={handleAudioEnd}
          style={{ width: "100%", marginBottom: 16 }}
        />
      );
    }

    if ((type === "youtube" || type === "spotify") && embedSrc) {
      return (
        <iframe
          width="100%"
          height={360}
          src={embedSrc}
          title="Player"
          frameBorder="0"
          allow="autoplay; encrypted-media"
        />
      );
    }

    return (
      <button onClick={handlePlay} style={{ padding: "12px 18px", borderRadius: 10 }}>
        ▶ Play Cassette
      </button>
    );
  };

  if (loading) return <div style={{ padding: 24, textAlign: "center" }}>Loading your cassette…</div>;
  if (!cassette) return <div style={{ padding: 24, textAlign: "center" }}>Cassette not found.</div>;

  return (
    <div style={{ minHeight: "100vh", background: "#f3e8ff", padding: 20 }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h1 style={{ textAlign: "center" }}>♪ cassette ♪</h1>
        <p style={{ textAlign: "center", opacity: 0.6 }}>
          A gift from {cassette.sender_email || "someone"}
        </p>

        {renderMedia()}

        <div style={{ marginTop: 32, background: "#fde68a", padding: 24, borderRadius: 16 }}>
          <h3>A Message for You</h3>
          <p>{cassette.message || "(no message)"}</p>
        </div>

        {playFinished && (
          <div style={{ marginTop: 24, background: "#e9d5ff", padding: 24, borderRadius: 16 }}>
            <p>✨ {randomWish}</p>
            <p>📚 {randomFact}</p>
          </div>
        )}
      </div>
    </div>
  );
}
