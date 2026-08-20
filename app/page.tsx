import type { Metadata } from "next";
import HomeContent from "@/components/site/HomeContent";

const title = "UPPR Agency — Email Marketing, Automations & Retention";
const description =
  "Email & SMS marketing built on TheMarketer — campaigns, automations, and retention working together to turn your list into predictable revenue.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "https://www.uppr.agency",
    siteName: "UPPR Agency",
    images: ["/opengraph.png"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph.png"],
  },
};

export default function Home() {
  return <HomeContent />;
}
