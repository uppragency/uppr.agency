import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { Space_Grotesk, Space_Mono, Instrument_Sans } from "next/font/google";
import CookieBanner from "@/components/site/CookieBanner";
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
  title: "UPPR Agency — Email & SMS Retention Marketing for SMBs",
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
        {children}
        <Script id="themarketer-tracking" strategy="beforeInteractive">
          {`
            (function(){
              mktr_key = "4AQT8EZS";
              var mktr = document.createElement("script");
              mktr.async = true;
              mktr.src = "https://t.themarketer.com/t/j/" + mktr_key;
              var s = document.getElementsByTagName("script")[0];
              s.parentNode.insertBefore(mktr,s);
            })();
          `}
        </Script>
        <Analytics />
        <CookieBanner />
      </body>
    </html>
  );
}
