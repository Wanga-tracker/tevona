declare module "yt-search" {
  export interface YTAuthor {
    name: string;
  }

  export interface YTVideo {
    title: string;
    videoId: string;
    author: YTAuthor;
    duration: string;
    views: number;
  }

  export interface YTResult {
    videos: YTVideo[];
  }

  export default function yts(query: string): Promise<YTResult>;
}
