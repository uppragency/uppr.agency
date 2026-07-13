import type { Metadata } from "next";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SiteBackground from "@/components/site/SiteBackground";

export const metadata: Metadata = {
  title: "Glossary | Email & SMS Retention Marketing Terms | UPPR Agency",
  description: "Plain-English definitions of the email and SMS retention marketing terms you'll actually run into.",
};

const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;
const heading = { fontFamily: "var(--font-heading), sans-serif" } as const;

const TERMS = [
  { term: "Automated flow", def: "A pre-built sequence of emails or SMS triggered by a customer action — signing up, abandoning a cart, or going quiet — instead of being sent manually." },
  { term: "Open rate", def: "The percentage of delivered emails that were opened. Increasingly unreliable on its own due to Apple Mail Privacy Protection, which pre-fetches images." },
  { term: "Unique open rate", def: "Open rate counted once per recipient, regardless of how many times they reopened the email — a cleaner signal than raw opens." },
  { term: "Click rate", def: "The percentage of delivered emails that got at least one click, a stronger engagement signal than opens alone." },
  { term: "Click-through rate (CTR)", def: "Clicks divided by opens (not deliveries) — shows how compelling the content was to people who already opened it." },
  { term: "Conversion rate (CVR)", def: "The percentage of recipients who completed the target action (usually a purchase) after receiving the email or SMS." },
  { term: "Deliverability", def: "Whether your emails actually reach the inbox, versus landing in spam or being blocked entirely. Affected by sender reputation, list hygiene, and authentication." },
  { term: "Segmentation", def: "Splitting your list into smaller groups based on behavior or attributes, so each group gets messaging relevant to them instead of one blast for everyone." },
  { term: "Welcome series", def: "A short automated sequence sent to new subscribers, usually introducing the brand and offering a first-purchase incentive." },
  { term: "Abandoned cart flow", def: "An automated sequence triggered when someone adds a product to cart but leaves without buying, reminding them to complete the purchase." },
  { term: "Win-back flow", def: "A sequence targeting customers who haven't engaged or purchased in a while, aimed at re-activating them before they churn entirely." },
  { term: "List hygiene", def: "The ongoing practice of removing invalid, inactive, or unengaged contacts to protect sender reputation and deliverability." },
  { term: "Sender reputation", def: "A score mailbox providers assign to your sending domain based on engagement and complaint history — it directly affects whether your emails reach the inbox." },
  { term: "A/B testing", def: "Sending two variants (subject line, send time, offer) to a small sample and using the winner for the rest of the list." },
  { term: "AOV (Average Order Value)", def: "Total revenue divided by number of orders — a common metric for measuring the impact of upsell and cross-sell flows." },
  { term: "Churn", def: "The rate at which customers stop buying or engaging with a brand over a given period." },
  { term: "ESP (Email Service Provider)", def: "The platform used to send and manage email campaigns and automations — TheMarketer, in UPPR's case." },
  { term: "DKIM / SPF / DMARC", def: "Email authentication protocols that prove a message actually came from your domain, protecting deliverability and reducing spoofing risk." },
];

export default function GlossaryPage() {
  return (
    <div style={{ position: "relative" }}>
      <SiteBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />

        <header style={{ maxWidth: 760, margin: "0 auto", padding: "clamp(120px,18vw,170px) clamp(18px,5vw,28px) clamp(50px,7vw,70px)" }}>
          <div className="uppr-pill" style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#D6C6FA", ...mono }}>GLOSSARY</span>
          </div>
          <h1 style={{ margin: "0 0 16px", ...heading, fontWeight: 700, fontSize: "clamp(30px,5vw,44px)", lineHeight: 1.1, letterSpacing: "-.02em" }}>
            Retention marketing, in plain English.
          </h1>
          <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: "#A29DB8" }}>
            The terms that come up constantly in email and SMS retention — no jargon left unexplained.
          </p>
        </header>

        <main style={{ maxWidth: 760, margin: "0 auto", padding: "0 clamp(18px,5vw,28px) clamp(80px,10vw,120px)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {TERMS.map((t) => (
              <div key={t.term} style={{ padding: "20px 0", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                <h2 style={{ margin: "0 0 6px", ...heading, fontWeight: 600, fontSize: 17, color: "#F5F3FF" }}>{t.term}</h2>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "#A29DB8" }}>{t.def}</p>
              </div>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
