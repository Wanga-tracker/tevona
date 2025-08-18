"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      title: "Name Update",
      desc: "We rebranded from Wanga Media Services to Tevona for version 2.",
    },
    {
      title: "Quick Download",
      desc: "Experience a much faster downloader built for speed and simplicity.",
    },
    {
      title: "Streaming",
      desc: "We added a faster, smoother streamer for your favorite content.",
    },
    {
      title: "Downloader",
      desc: "Grab videos, audio, and documents instantly.",
    },
    {
      title: "Creative Tools",
      desc: "Image editor, PDF tools, charts, and more in one place.",
    },
    {
      title: "Code Playground",
      desc: "Run Python, Node, Java, and C++ with a real-time editor.",
    },
    {
      title: "Community Hub",
      desc: "Share snippets, bots, and templates with the Tevona community.",
    },
    {
      title: "Tevona AI Guide",
      desc: "Your personal assistant to guide you across all tools.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center">
      {/* Hero */}
      <section className="flex flex-col justify-center items-center text-center py-24 px-6 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-slate-100 mb-4"
        >
          Welcome to <span className="text-sky-400 neon-text">Tevona Tech</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg text-slate-300 mb-8"
        >
          Download. Create. Stream. Have fun.
        </motion.p>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            href="/dashboard"
            className="px-12 py-4 bg-sky-500 text-white rounded-full shadow-lg neon-hover text-lg font-semibold"
          >
            Enter Dashboard
          </Link>
        </motion.div>
      </section>

      {/* What's New */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl px-6 pb-24">
        {features.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="glass-card hover:shadow-sky-500/40"
          >
            <h3 className="text-xl font-semibold text-sky-400 mb-2">
              {item.title}
            </h3>
            <p className="text-slate-300">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <footer className="w-full py-6 border-t border-slate-800 text-center text-slate-400 text-sm">
        © {new Date().getFullYear()} Tevona Tech — Built for creators.
      </footer>
    </main>
  );
      }
