import { NextResponse } from "next/server";
import ytdl from "ytdl-core";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const videoId = searchParams.get("id");

    if (!videoId) {
      return NextResponse.json({ error: "No video ID provided" }, { status: 400 });
    }

    const url = `https://www.youtube.com/watch?v=${videoId}`;
    const stream = ytdl(url, { filter: "audioonly", quality: "highestaudio" });

    return new Response(stream as any, {
      headers: {
        "Content-Disposition": `attachment; filename="${videoId}.mp3"`,
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
