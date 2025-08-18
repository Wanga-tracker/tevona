export default function HomePage() {
  return (
    <section className="text-center space-y-6">
      <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
        Welcome to Tevona
      </h2>
      <p className="text-lg text-slate-300 max-w-2xl mx-auto">
        Your free all-in-one hub: media downloaders, AI assistants, fun tools, utilities, and a thriving community.
      </p>

      {/* Placeholder for navigation */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        <div className="p-6 rounded-2xl bg-slate-800 shadow hover:shadow-lg hover:bg-slate-700 transition">
          <h3 className="font-semibold text-sky-300">Downloaders</h3>
          <p className="text-sm text-slate-400">YouTube, TikTok, Instagram, MP3, MP4, and more.</p>
        </div>
        <div className="p-6 rounded-2xl bg-slate-800 shadow hover:shadow-lg hover:bg-slate-700 transition">
          <h3 className="font-semibold text-sky-300">Fun Zone</h3>
          <p className="text-sm text-slate-400">Meme generator, lyrics, fancy text, avatars.</p>
        </div>
        <div className="p-6 rounded-2xl bg-slate-800 shadow hover:shadow-lg hover:bg-slate-700 transition">
          <h3 className="font-semibold text-sky-300">AI Assistant</h3>
          <p className="text-sm text-slate-400">Multi-chat AI, translator, OCR, code runner.</p>
        </div>
      </div>
    </section>
  );
        }
