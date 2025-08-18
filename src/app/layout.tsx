import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Tevona Tech",
  description: "Download. Create. Stream. Have fun.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
