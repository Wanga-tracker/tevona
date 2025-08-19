"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type NowPlaying = {
  id: string;
  type: "audio" | "video";
} | null;

export default function MusicDownloader() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [nowPlaying, setNowPlaying] = useState<NowPlaying>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (q?: string) => {
    const searchTerm = q || query;
    if (!searchTerm) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://tevona-api.onrender.com/music/search?q=${encodeURIComponent(
          searchTerm
        )}`
      );
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (videoId: string, type: "audio" | "video") => {
    window.location.href = `https://tevona-api.onrender.com/music/download?id=${videoId}&type=${type}`;
  };

  const categories = [
    { name: "Amapiano", color: "from-pink-500 to-yellow-500" },
    { name: "Bongo", color: "from-sky-500 to-indigo-500" },
    { name: "Reggae", color: "from-green-500 to-lime-500" },
    { name: "HipHop", color: "from-purple-500 to-fuchsia-500" },
    { name: "ArbanTone", color: "from-orange-500 to-red-500" },
    { name: "Dancehall", color: "from-teal-500 to-cyan-500" },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-6 py-12">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-10"
      >
        🎶 Tevona Music Downloader
      </motion.h1>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((cat) => (
          <motion.button
            key={cat.name}
            onClick={() => handleSearch(cat.name)}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-2xl text-white font-medium 
              bg-gradient-to-r ${cat.color} 
              backdrop-blur-md bg-opacity-20 border border-white/20 
              shadow-lg hover:shadow-[0_0_20px] transition-all`}
          >
            {cat.name}
          </motion.button>
        ))}
      </div>

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
          onClick={() => handleSearch()}
          className="px-6 py-3 bg-sky-500 text-white rounded-r-xl hover:bg-sky-600 transition"
        >
          Search
        </button>
      </div>

      {/* Spinner */}
      {loading && (
        <div className="flex justify-center my-10">
          <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Results */}
      <div className="grid gap-6 max-w-4xl mx-auto">
        {results.map((song, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="glass-card flex flex-col md:flex-row items-center md:items-start gap-4 p-4 rounded-2xl bg-slate-800/30 backdrop-blur-lg border border-slate-700/50 shadow-lg hover:shadow-xl"
          >
            <img
              src={song.thumbnail}
              alt={song.title}
              className="w-32 h-32 rounded-xl object-cover"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-sky-400">
                {song.title}
              </h3>
              <p className="text-slate-400 text-sm">{song.author}</p>

              <div className="flex gap-3 mt-3 flex-wrap">
                <button
                  onClick={() => setNowPlaying({ id: song.videoId, type: "audio" })}
                  className="px-4 py-2 bg-slate-700/60 rounded-lg hover:bg-slate-600 transition"
                >
                  ▶ Play Audio
                </button>
                <button
                  onClick={() => setNowPlaying({ id: song.videoId, type: "video" })}
                  className="px-4 py-2 bg-slate-700/60 rounded-lg hover:bg-slate-600 transition"
                >
                  🎥 Play Video
                </button>
                <button
                  onClick={() => handleDownload(song.videoId, "audio")}
                  className="px-4 py-2 bg-sky-500 rounded-lg hover:bg-sky-600 transition"
                >
                  ⬇ Audio
                </button>
                <button
                  onClick={() => handleDownload(song.videoId, "video")}
                  className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition"
                >
                  ⬇ Video
                </button>
              </div>

              {/* Now Playing */}
              {nowPlaying && nowPlaying.id === song.videoId && (
                <div className="mt-4">
                  {nowPlaying.type === "audio" ? (
                    <audio
                      src={`https://tevona-api.onrender.com/music/download?id=${song.videoId}&type=audio`}
                      controls
                      autoPlay
                      className="w-full"
                    />
                  ) : (
                    <iframe
                      width="100%"
                      height="200"
                      src={`https://www.youtube.com/embed/${song.videoId}?autoplay=1`}
                      title="YouTube player"
                      className="rounded-xl"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
