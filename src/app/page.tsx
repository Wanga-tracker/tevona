"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download, PlayCircle, Cpu, Brush } from "lucide-react";

const features = [
  {
    title: "Quick Download",
    desc: "Experience a much faster downloader built for speed and simplicity.",
    icon: <Download className="w-8 h-8 text-primary" />,
  },
  {
    title: "Streaming",
    desc: "We added a faster, smoother streamer for your favorite content.",
    icon: <PlayCircle className="w-8 h-8 text-accent" />,
  },
  {
    title: "Creative Tools",
    desc: "Image editor, PDF tools, charts, and more in one place.",
    icon: <Brush className="w-8 h-8 text-highlight" />,
  },
  {
    title: "Code Playground",
    desc: "Run Python, Node, Java, and C++ with a real-time editor.",
    icon: <Cpu className="w-8 h-8 text-primary" />,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-dark text-text flex flex-col items-center justify-center p-6">
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-2 text-primary"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Welcome to Tevona Tech
      </motion.h1>
      <p className="text-lg text-gray-300 mb-6">
        Download. Create. Stream. Have fun.
      </p>

      {/* Dashboard Button */}
      <motion.div whileHover={{ scale: 1.05 }} className="mb-10">
        <Link
          href="/dashboard"
          className="px-12 py-4 bg-primary text-white rounded-full shadow-lg neon-hover text-lg font-semibold"
        >
          Enter Dashboard
        </Link>
      </motion.div>

      {/* Feature Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl w-full">
        {features.map((item, i) => (
          <motion.div
            key={i}
            className="p-6 bg-card rounded-2xl shadow-md hover:shadow-lg transition flex flex-col items-start"
            whileHover={{ y: -5 }}
          >
            {item.icon}
            <h3 className="text-xl font-semibold mt-4 mb-2">{item.title}</h3>
            <p className="text-gray-400">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </main>
  );
  }
