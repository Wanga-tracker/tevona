import { NextResponse } from "next/server";
import yts from "yt-search";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json({ results: [] });
    }

    const r = await yts(query);
    const results = r.videos.slice(0, 10).map((v) => ({
      title: v.title,
      videoId: v.videoId,
      channel: v.author.name,
      thumbnail: v.thumbnail,
      duration: v.timestamp,
    }));

    return NextResponse.json({ results });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
      }
