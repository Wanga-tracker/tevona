"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function MusicPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query) return;
    const res = await fetch(
      `https://tevona-api.onrender.com/api/search?q=${encodeURIComponent(query)}`
    );
    const data = await res.json();
    setResults(data);
  };

  const handleStream = (id: string) => {
    setPlayingUrl(`https://tevona-api.onrender.com/api/download/mp3?id=${id}`);
  };

  const handleDownload = (id: string) => {
    window.open(
      `https://tevona-api.onrender.com/api/download/mp3?id=${id}`,
      "_blank"
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">🎵 Tevona Music Downloader</h1>

      <div className="flex gap-2">
        <Input
          placeholder="Search music..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((item) => (
            <Card key={item.videoId} className="rounded-2xl shadow p-3">
              <CardContent className="space-y-2">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="rounded-xl w-full"
                />
                <h2 className="font-semibold text-lg">{item.title}</h2>
                <p className="text-sm text-gray-500">{item.author?.name}</p>
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    onClick={() => handleStream(item.videoId)}
                  >
                    ▶ Stream
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handleDownload(item.videoId)}
                  >
                    ⬇ Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {playingUrl && (
        <div className="mt-6">
          <h2 className="font-semibold">Now Playing</h2>
          <audio
            src={playingUrl}
            controls
            autoPlay
            className="w-full mt-2 rounded-xl"
          />
        </div>
      )}
    </div>
  );
}
