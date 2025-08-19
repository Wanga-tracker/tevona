import { NextResponse } from "next/server";
import yts from "yt-search";

interface YTVideo {
  title: string;
  videoId: string;
  author: {
    name: string;
  };
  duration: string;
  views: number;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const r = await yts(query);
    const results = (r.videos as YTVideo[]).slice(0, 10).map((v) => ({
      title: v.title,
      videoId: v.videoId,
      channel: v.author.name,
      duration: v.duration,
      views: v.views,
    }));

    return NextResponse.json(results);
  } catch (error) {
    console.error("YT Search Error:", error);
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
  }
  }
