export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-10 p-6">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-bold neon-text text-sky-400">
          Tevona 🚀
        </h1>
        <p className="text-lg text-slate-400 max-w-xl mx-auto">
          All-in-One Media & Utility Platform — Downloads, AI, Tools, Fun, and more.
        </p>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        <div className="glass-card border-sky-500 shadow-sky-400 neon-hover">
          <h3 className="text-sky-300 font-semibold text-lg">Downloaders</h3>
          <p className="text-slate-400 text-sm mt-2">
            YouTube, TikTok, Instagram, MP3, MP4 — all in one place.
          </p>
        </div>

        <div className="glass-card border-purple-500 shadow-purple-400 neon-hover">
          <h3 className="text-purple-300 font-semibold text-lg">Fun Zone</h3>
          <p className="text-slate-400 text-sm mt-2">
            Memes, Fancy Text, Avatars, Lyrics, and entertainment tools.
          </p>
        </div>

        <div className="glass-card border-emerald-500 shadow-emerald-400 neon-hover">
          <h3 className="text-emerald-300 font-semibold text-lg">AI Assistant</h3>
          <p className="text-slate-400 text-sm mt-2">
            Chatbots, Translators, OCR, TTS, Code Runner, and more.
          </p>
        </div>
      </section>
    </main>
  );
}
