// src/app/music/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Song = {
  videoId: string;
  title: string;
  author?: string | { name?: string } | null;
  thumbnail: string;
};

const DEFAULT_API = process.env.NEXT_PUBLIC_API_URL || "https://tevona-api.onrender.com";

/**
 * Try primary endpoint then fallback to alternate route if the first fails.
 * - For search: try /api/search?q=  then fallback to /music/search?q=
 * - For download: try /api/download/mp3?id=  then fallback to /music/download?id=&type=audio
 */
async function trySearch(apiBase: string, q: string) {
  const attempts = [
    `${apiBase}/api/search?q=${encodeURIComponent(q)}`,
    `${apiBase}/music/search?q=${encodeURIComponent(q)}`,
  ];
  for (const url of attempts) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      // result may be plain array or an object; normalize below in caller
      const data = await res.json();
      return { data, url };
    } catch (err) {
      // try next
      // console.warn("search attempt failed", url, err);
    }
  }
  throw new Error("All search endpoints failed");
}

async function tryDownloadUrl(apiBase: string, id: string) {
  // Return the URL we should use to stream/download mp3
  const attempts = [
    `${apiBase}/api/download/mp3?id=${id}`,
    `${apiBase}/music/download?id=${id}&type=audio`,
  ];
  for (const url of attempts) {
    try {
      // Try a HEAD request first to confirm it's reachable (some servers disallow HEAD)
      const res = await fetch(url, { method: "HEAD" });
      if (res.ok || res.status === 405) return url; // 405 means HEAD not allowed, but endpoint exists
    } catch (err) {
      // try next
    }
  }
  // fallback: return first attempt (user can still try it)
  return attempts[0];
}

export default function MusicPage() {
  const [apiBase, setApiBase] = useState(DEFAULT_API);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setMessage(null);
    try {
      const { data } = await trySearch(apiBase, query.trim());
      // normalize different payload shapes:
      // If backend returns the yt-search array directly -> data is array of videos
      // If backend returns { results: [...] } or wrapped -> try to detect common shapes.
      let arr: any[] = [];
      if (Array.isArray(data)) arr = data;
      else if (data?.results && Array.isArray(data.results)) arr = data.results;
      else if (data?.videos && Array.isArray(data.videos)) arr = data.videos;
      else if (data?.data && Array.isArray(data.data)) arr = data.data;
      else {
        // fallback: attempt to coerce object -> array of values
        arr = Array.isArray(data) ? data : [];
      }

      // Map to our minimal Song shape
      const mapped: Song[] = arr.map((v: any) => ({
        videoId: v.videoId || v.id || (v.url && v.url.split("v=")[1]) || "",
        title: v.title || v.name || v.videoTitle || "Unknown title",
        author:
          typeof v.author === "string"
            ? v.author
            : v.author?.name || v.channel || v.owner || null,
        thumbnail: v.thumbnail || v.image || v.thumbnails?.[0] || v.thumb || "",
      })).filter((s) => s.videoId);

      setResults(mapped);
      if (mapped.length === 0) setMessage("No results found.");
    } catch (err: any) {
      console.error(err);
      setMessage("Search failed. Check your API base URL and that the backend is up.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStream = async (videoId: string) => {
    setMessage(null);
    try {
      const url = await tryDownloadUrl(apiBase, videoId);
      setPlayingUrl(url);
    } catch (err) {
      console.error(err);
      setMessage("Unable to prepare stream URL.");
    }
  };

  const handleDownload = async (videoId: string) => {
    setMessage(null);
    try {
      const url = await tryDownloadUrl(apiBase, videoId);
      // open in new tab to trigger download
      window.open(url, "_blank");
    } catch (err) {
      console.error(err);
      setMessage("Download failed - backend unreachable.");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-slate-950 text-slate-100">
      <motion.h1
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold text-center mb-6"
      >
        🎵 Tevona — Music (MP3 only)
      </motion.h1>

      <div className="max-w-3xl mx-auto space-y-4">
        <label className="block text-sm text-slate-300">Backend API base URL</label>
        <div className="flex gap-2">
          <input
            value={apiBase}
            onChange={(e) => setApiBase(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100"
          />
          <button
            onClick={() => handleSearch()}
            className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600"
          >
            Search
          </button>
        </div>

        <div className="flex gap-2">
          <input
            placeholder="Search songs, artists..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-3 py-2 rounded-l-lg bg-slate-800 border border-slate-700 text-slate-100"
            onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
          />
          <button
            onClick={() => handleSearch()}
            className="px-4 py-2 rounded-r-lg bg-sky-500 hover:bg-sky-600"
          >
            Search
          </button>
        </div>

        {loading && (
          <div className="flex justify-center py-6">
            <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {message && <div className="text-center text-slate-300">{message}</div>}

        <div className="grid gap-4">
          {results.map((item) => (
            <div
              key={item.videoId}
              className="flex gap-4 items-start p-4 rounded-2xl bg-slate-800/40 border border-slate-700"
            >
              <img src={item.thumbnail} alt={item.title} className="w-28 h-28 rounded-md object-cover" />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-sky-300">{item.title}</h3>
                    <p className="text-sm text-slate-400">{typeof item.author === "string" ? item.author : (item.author?.name || "")}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleStream(item.videoId)}
                      className="px-3 py-1 rounded-md bg-slate-700 hover:bg-slate-600 text-sm"
                    >
                      ▶ Stream
                    </button>
                    <button
                      onClick={() => handleDownload(item.videoId)}
                      className="px-3 py-1 rounded-md bg-sky-500 hover:bg-sky-600 text-sm"
                    >
                      ⬇ Download MP3
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {playingUrl && (
          <div className="mt-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700">
            <h4 className="font-semibold text-sky-300 mb-2">Now playing</h4>
            <audio src={playingUrl} controls autoPlay className="w-full" />
          </div>
        )}
      </div>
    </div>
  );
}
