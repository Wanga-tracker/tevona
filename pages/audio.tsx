"use client";

import { useState } from "react";

type Song = {
  videoId: string;
  title: string;
  thumbnail: string;
  author?: { name?: string } | string;
  views?: number;
  timestamp?: string;
};

const BACKEND = "https://tevona-api.onrender.com"; // ✅ Render only

export default function MusicPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { name: "Amapiano", color: "from-pink-500 to-yellow-500" },
    { name: "Bongo", color: "from-sky-500 to-indigo-500" },
    { name: "Reggae", color: "from-green-500 to-lime-500" },
    { name: "HipHop", color: "from-purple-500 to-fuchsia-500" },
    { name: "ArbanTone", color: "from-orange-500 to-red-500" },
    { name: "Dancehall", color: "from-teal-500 to-cyan-500" },
  ];

  async function handleSearch(q?: string) {
    const term = (q ?? query).trim();
    if (!term) return;

    setLoading(true);
    setError(null);
    setResults([]);
    try {
      const res = await fetch(
        `${BACKEND}/api/search?q=${encodeURIComponent(term)}&t=${Date.now()}`,
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as Song[];
      setResults(Array.isArray(data) ? data : []);
    } catch (e: any) {
      setError(e?.message || "Search failed");
    } finally {
      setLoading(false);
    }
  }

  function handlePlay(id: string) {
    setNowPlaying((curr) => (curr === id ? null : id));
  }

  function handleDownload(id: string) {
    window.open(`${BACKEND}/api/download/mp3?id=${id}`, "_blank");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        🎵 Tevona Music Downloader (MP3)
      </h1>

      {/* Quick categories */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((c) => (
          <button
            key={c.name}
            onClick={() => handleSearch(c.name)}
            className={`px-4 py-2 rounded-xl text-white bg-gradient-to-r ${c.color} border border-white/20 shadow hover:opacity-90 transition`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search songs or artists…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="px-4 py-3 w-full max-w-xl rounded-l-xl bg-slate-800 text-slate-100 outline-none"
        />
        <button
          onClick={() => handleSearch()}
          className="px-6 py-3 rounded-r-xl bg-sky-500 hover:bg-sky-600 text-white"
        >
          Search
        </button>
      </div>

      {/* Status */}
      {loading && (
        <div className="flex justify-center my-10">
          <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {!loading && error && (
        <p className="text-center text-red-400 mb-6">{error}</p>
      )}
      {!loading && !error && results.length === 0 && query && (
        <p className="text-center text-slate-400">No results found.</p>
      )}

      {/* Results */}
      <div className="grid gap-6 max-w-5xl mx-auto">
        {results.map((v, idx) => {
          const authorName =
            typeof v.author === "string" ? v.author : v.author?.name || "";
          return (
            <div
              key={`${v.videoId}-${idx}`}
              className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 shadow"
            >
              <img
                src={v.thumbnail}
                alt={v.title}
                className="w-32 h-32 rounded-xl object-cover"
              />
              <div className="flex-1 w-full">
                <h3 className="text-lg font-semibold text-sky-400">
                  {v.title}
                </h3>
                <p className="text-slate-400 text-sm">
                  {authorName}
                  {v.views ? ` • ${v.views.toLocaleString()} views` : ""}
                  {v.timestamp ? ` • ${v.timestamp}` : ""}
                </p>

                <div className="flex gap-3 mt-3 flex-wrap">
                  <button
                    onClick={() => handlePlay(v.videoId)}
                    className="px-4 py-2 rounded-lg bg-slate-700/70 hover:bg-slate-600"
                  >
                    {nowPlaying === v.videoId ? "⏸ Stop" : "▶ Play"}
                  </button>
                  <button
                    onClick={() => handleDownload(v.videoId)}
                    className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white"
                  >
                    ⬇ Download MP3
                  </button>
                </div>

                {nowPlaying === v.videoId && (
                  <div className="mt-4">
                    <audio
                      src={`${BACKEND}/api/download/mp3?id=${v.videoId}`}
                      controls
                      autoPlay
                      className="w-full"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
