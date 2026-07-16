import type { Metadata } from "next";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SiteBackground from "@/components/site/SiteBackground";

export const metadata: Metadata = {
  title: "Changelog | UPPR Agency",
  description: "Everything shipped on the UPPR Agency platform and dashboard, month by month, since November 2025.",
};

const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;
const heading = { fontFamily: "var(--font-heading), sans-serif" } as const;

const ENTRIES = [
  {
    date: "July 2026",
    tag: "v2.8",
    items: [
      "Client dashboard: horizontal month timeline with one-click jump, and a \"focus mode\" to view a single month at a time",
      "Client dashboard: anonymized comparison against the UPPR portfolio average (open rate & click rate)",
      "Client dashboard: automatic milestone celebrations — collaboration anniversaries and cumulative revenue thresholds",
      "Client dashboard: visual pulse when a client's margin target is reached",
      "Client dashboard: illustrated empty state and skeleton loading screen",
      "Client dashboard: referral program card linking to the client referral page",
      "Free-form tags on monthly reports, alongside draft/published status",
      "Trend charts (revenue & profit) now have a highlighted cursor line and glowing active point on hover",
      "Sparklines in the summary bar now color themselves green or pink based on the underlying trend",
      "Admin: suspicious-data warning before saving a report (e.g. transactions exceeding emails sent)",
      "Admin: duplicate a single newsletter within a report, not just the whole report",
      "Admin: new infrastructure page — live Supabase database size and table breakdown, with links to full Vercel/Supabase usage",
      "Blog articles now auto-link the first mention of any glossary term to its definition",
    ],
  },
  {
    date: "July 2026",
    tag: "v2.4",
    items: [
      "New free tools: Send Time Optimizer, Spam Word Checker, Unsubscribe Rate Calculator",
      "Detailed 18-point comparison page — DIY vs freelancer vs agency vs in-house vs UPPR",
      "Platform migration guides for switching from Mailchimp, Klaviyo, and Newsman",
      "Industry pages for ecommerce, service businesses, and SaaS",
      "New free tools: Deliverability Checker (live SPF/DMARC/DKIM lookup) and List Health Check",
      "Romanian-language landing page for local search",
      "Full public sitemap page, changelog, and roadmap",
      "Fixed site favicon (was serving the default Next.js icon instead of the UPPR logo)",
      "Header navigation updated — \"Blog\" replaced with \"Resources\" hub",
    ],
  },
  {
    date: "June 2026",
    tag: "v2.0 – v2.2",
    items: [
      "TheMarketer signup form embedded directly on the homepage, replacing the external booking widget",
      "New interactive Demo page — what customers experience vs. what you see on your dashboard",
      "Privacy Policy and Terms of Service pages, with full UPPRMARKETING SRL legal details",
      "New Contact, Resources, and Glossary pages",
      "Footer fully restructured into Agency / Tools / Get Started columns",
      "\"How We Work\" process page and post-booking Thank You page",
    ],
  },
  {
    date: "May 2026",
    tag: "v1.5 – v1.9",
    items: [
      "Full profit & margin tracking system — real cost inputs, automatic profit and margin calculation per report",
      "Break-even indicator and \"paid vs. earned\" comparison on the client dashboard",
      "Portfolio-wide profit view and negative-margin alerts in the admin overview",
      "Client list sortable by margin",
      "Interactive welcome-flow demo animation added to the homepage (later moved to the Demo page)",
    ],
  },
  {
    date: "April 2026",
    tag: "v1.6 – v1.7",
    items: [
      "Personalized client dashboard greeting, next-report progress bar, and email-vs-ads cost-per-click comparison",
      "\"Presentation mode\" toggle — blurs exact figures for safe screen-sharing",
      "WhatsApp-based password recovery on the login screen",
      "Admin: draft auto-save, ⌘S keyboard shortcut, delete confirmations, \"today\" widget, all-clients comparison chart, per-client notes, client archiving",
      "Blog: categories/tags, live preview before publishing, automatic OG image generation",
      "Vercel Analytics and maintenance-mode toggle added site-wide",
    ],
  },
  {
    date: "March 2026",
    tag: "v1.4 – v1.5",
    items: [
      "TheMarketer tracking script installed site-wide",
      "Admin panel overhaul: portfolio dashboard, draft/publish workflow for reports, audit logging, login rate limiting",
      "Client onboarding checklist and one-click PDF report export",
      "Month-over-month and year-over-year comparisons on the client dashboard",
      "Blog SEO pass: RSS feed, reading time estimates, JSON-LD article schema, image sitemap, related articles",
      "Custom 404 page and public system status page",
    ],
  },
  {
    date: "February 2026",
    tag: "v1.3",
    items: [
      "Campaign reporting rebuilt from the ground up — individual newsletters tracked per send instead of one flat monthly total",
      "Revenue trend, engagement, and revenue-distribution charts added to the client dashboard",
      "CSV import for bulk-adding newsletter data in the admin panel",
    ],
  },
  {
    date: "January 2026",
    tag: "v1.1",
    items: [
      "Fixed cropped result screenshots on the homepage results section",
      "Redesigned campaign stat cards with color-coded CVR / Orders / Revenue breakdown",
    ],
  },
  {
    date: "December 2025",
    tag: "v1.0",
    items: [
      "Completed the homepage — added the Manifesto, full Traffic Capture Explainer, Comparison Table, Qualification section, Lead Form, and Affiliate sections that were missing from the initial build",
      "All homepage animations verified across sections (reveal-on-scroll, count-up stats, bar charts)",
    ],
  },
  {
    date: "November 2025",
    tag: "Launch",
    items: [
      "Migrated the entire site from static HTML/PHP to Next.js 16 (App Router) with TypeScript and Tailwind",
      "Supabase database, authentication, and row-level security set up for admin and client accounts",
      "Client dashboard and admin panel built from scratch, deployed on Vercel",
      "All 11 existing blog articles migrated into the new content system",
      "Public marketing site ported over, preserving the original design system and animations",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div style={{ position: "relative" }}>
      <SiteBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />

        <header style={{ maxWidth: 700, margin: "0 auto", padding: "clamp(120px,18vw,170px) clamp(18px,5vw,28px) clamp(40px,6vw,60px)" }}>
          <span className="uppr-label" style={{ ...mono, color: "#A855F7", fontSize: 12 }}>[ PRODUCT UPDATES ]</span>
          <h1 style={{ margin: "16px 0 8px", ...heading, fontWeight: 700, fontSize: "clamp(28px,4.5vw,40px)", lineHeight: 1.1, letterSpacing: "-.02em" }}>
            Changelog
          </h1>
          <p style={{ margin: 0, fontSize: 15, color: "#A29DB8" }}>
            Every update to the platform and dashboard, from launch in November 2025 to today.
          </p>
        </header>

        <main style={{ maxWidth: 700, margin: "0 auto", padding: "0 clamp(18px,5vw,28px) clamp(80px,10vw,120px)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {ENTRIES.map((entry) => (
              <div key={entry.date}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#C084FC", ...mono, textTransform: "uppercase", letterSpacing: ".04em" }}>
                    {entry.date}
                  </span>
                  <span
                    style={{
                      fontSize: 10.5,
                      fontWeight: 700,
                      color: "#8B84A0",
                      background: "rgba(255,255,255,.05)",
                      padding: "2px 8px",
                      borderRadius: 999,
                      ...mono,
                    }}
                  >
                    {entry.tag}
                  </span>
                </div>
                <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                  {entry.items.map((item, i) => (
                    <li key={i} style={{ fontSize: 14.5, lineHeight: 1.6, color: "#C4BCDC" }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
