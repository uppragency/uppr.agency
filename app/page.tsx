import type { Metadata } from "next";
import HomeContent from "@/components/site/HomeContent";

export const metadata: Metadata = {
  title: "UPPR Agency — Email & SMS Retention Marketing for SMBs",
  description:
    "Full-service email & SMS retention, engineered and managed on TheMarketer — built for small and mid-sized businesses that need lost leads and dormant customers to stop bleeding revenue on autopilot.",
};

export default function Home() {
  return <HomeContent />;
}
