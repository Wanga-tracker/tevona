"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function MusicDownloader() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query) return;
    const res = await fetch(`/api/music/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data.results);
  };

  const handleDownload = async (videoId: string) => {
    window.location.href = `/api/music/download?id=${videoId}`;
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-6 py-12">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-8"
      >
        🎶 Music Downloader
      </motion.h1>

      {/* Search bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search for a song..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-3 w-full max-w-lg rounded-l-xl bg-slate-800 text-slate-100 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-sky-500 text-white rounded-r-xl hover:bg-sky-600 transition"
        >
          Search
        </button>
      </div>

      {/* Results */}
      <div className="grid gap-6 max-w-4xl mx-auto">
        {results.map((song, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="glass-card flex flex-col md:flex-row items-center md:items-start gap-4"
          >
            <img
              src={song.thumbnail}
              alt={song.title}
              className="w-32 h-32 rounded-xl object-cover"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-sky-400">{song.title}</h3>
              <p className="text-slate-400 text-sm">{song.channel}</p>

              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => setNowPlaying(song.videoId)}
                  className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600"
                >
                  ▶ Play
                </button>
                <button
                  onClick={() => handleDownload(song.videoId)}
                  className="px-4 py-2 bg-sky-500 rounded-lg hover:bg-sky-600"
                >
                  ⬇ Download
                </button>
              </div>

              {/* Now Playing */}
              {nowPlaying === song.videoId && (
                <div className="mt-4">
                  <iframe
                    width="100%"
                    height="180"
                    src={`https://www.youtube.com/embed/${song.videoId}?autoplay=1`}
                    title="YouTube player"
                    className="rounded-xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
