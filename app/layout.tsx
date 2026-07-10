import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "UPPR Agency — Panouri",
  description: "Panouri administrare UPPR Agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro"
      className={`${spaceGrotesk.variable} ${spaceMono.variable} ${instrumentSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="uppr-bg-layer">
          <div className="uppr-bg-glow" />
          <div className="uppr-bg-blob-1" />
          <div className="uppr-bg-blob-2" />
          <div className="uppr-bg-grid" />
        </div>
        <div className="relative z-[1] flex-1 flex flex-col">{children}</div>
      </body>
    </html>
  );
}
