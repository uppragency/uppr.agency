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
  metadataBase: new URL("https://www.uppr.agency"),
  title: "UPPR Agency — Email Marketing, Automations & Retention",
  description:
    "Email & SMS marketing built on TheMarketer — campaigns, automations, and retention working together to turn your list into predictable revenue.",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "bQERUOzAwc1hfHuXXW7caN0XT4ikQHO138jJ77Azg8A",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "UPPR Agency",
  legalName: "UPPRMARKETING SRL",
  url: "https://www.uppr.agency",
  logo: "https://www.uppr.agency/logo.png",
  image: "https://www.uppr.agency/opengraph.png",
  email: "office@uppr.agency",
  telephone: "+40790682363",
  address: {
    "@type": "PostalAddress",
    addressCountry: "RO",
  },
  areaServed: "RO",
  description:
    "Email & SMS marketing agency — campaign management, automations, and retention strategy, built on TheMarketer.",
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
      <head>
        {/* Google tag (gtag.js) - Imediat dupa <head> */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-BJF4JJ31RD"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-BJF4JJ31RD');
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
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