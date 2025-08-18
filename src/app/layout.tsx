import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ weight: ["400", "600", "700"], subsets: ["latin"], variable: "--font-poppins" });

export const metadata: Metadata = {
  title: "Tevona - All-in-One Media & Utility Hub",
  description: "Free media downloader, AI tools, utilities, and fun zone. Open to everyone, always free.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col">
        {/* 🚀 Navbar (to be created later) */}
        <header className="border-b border-slate-800 p-4">
          <h1 className="text-xl font-bold text-sky-400">Tevona</h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 container mx-auto px-4 py-6">{children}</main>

        {/* 🚀 Footer */}
        <footer className="border-t border-slate-800 p-4 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} Tevona. Built for the people, by the people.
        </footer>
      </body>
    </html>
  );
}
