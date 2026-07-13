import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SiteBackground from "@/components/site/SiteBackground";

export const metadata: Metadata = {
  title: "Sitemap | UPPR Agency",
  description: "Every page on the UPPR Agency site, in one place.",
};

const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;
const heading = { fontFamily: "var(--font-heading), sans-serif" } as const;

const GROUPS: { label: string; links: { href: string; title: string }[] }[] = [
  {
    label: "Agency",
    links: [
      { href: "/", title: "Home" },
      { href: "/how-we-work", title: "How We Work" },
      { href: "/comparison", title: "Comparison — DIY vs Agency vs UPPR" },
      { href: "/email-marketing-romania", title: "Email Marketing în România" },
      { href: "/contact", title: "Contact" },
    ],
  },
  {
    label: "Tools & resources",
    links: [
      { href: "/blog", title: "Blog" },
      { href: "/glossary", title: "Glossary" },
      { href: "/subject-line-grader", title: "Subject Line Grader" },
      { href: "/deliverability-checker", title: "Deliverability Checker" },
      { href: "/list-health-check", title: "List Health Check" },
      { href: "/send-time-optimizer", title: "Send Time Optimizer" },
      { href: "/spam-word-checker", title: "Spam Word Checker" },
      { href: "/unsubscribe-rate-calculator", title: "Unsubscribe Rate Calculator" },
      { href: "/referral-program", title: "Referral Program" },
      { href: "/resources", title: "Resources" },
    ],
  },
  {
    label: "Industries",
    links: [
      { href: "/for-ecommerce", title: "For Ecommerce" },
      { href: "/for-services", title: "For Service Businesses" },
      { href: "/for-saas", title: "For SaaS" },
    ],
  },
  {
    label: "Switching platforms",
    links: [
      { href: "/switch-from-mailchimp", title: "Switching from Mailchimp" },
      { href: "/switch-from-klaviyo", title: "Switching from Klaviyo" },
      { href: "/switch-from-newsman", title: "Switching from Newsman" },
    ],
  },
  {
    label: "Legal",
    links: [
      { href: "/privacy", title: "Privacy Policy" },
      { href: "/terms", title: "Terms of Service" },
    ],
  },
  {
    label: "Product",
    links: [
      { href: "/changelog", title: "Changelog" },
      { href: "/roadmap", title: "Roadmap" },
    ],
  },
  {
    label: "Account",
    links: [
      { href: "/login", title: "Client / Admin Login" },
      { href: "/status", title: "Platform Status" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div style={{ position: "relative" }}>
      <SiteBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />

        <header style={{ maxWidth: 700, margin: "0 auto", padding: "clamp(120px,18vw,170px) clamp(18px,5vw,28px) clamp(40px,6vw,60px)" }}>
          <span className="uppr-label" style={{ ...mono, color: "#A855F7", fontSize: 12 }}>[ NAVIGATE ]</span>
          <h1 style={{ margin: "16px 0 8px", ...heading, fontWeight: 700, fontSize: "clamp(28px,4.5vw,40px)", lineHeight: 1.1, letterSpacing: "-.02em" }}>
            Sitemap
          </h1>
          <p style={{ margin: 0, fontSize: 15, color: "#A29DB8" }}>Every page on this site, in one place.</p>
        </header>

        <main style={{ maxWidth: 700, margin: "0 auto", padding: "0 clamp(18px,5vw,28px) clamp(80px,10vw,120px)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            {GROUPS.map((group) => (
              <div key={group.label}>
                <span className="uppr-label" style={{ ...mono, color: "#6E6980", fontSize: 11.5, display: "block", marginBottom: 14 }}>
                  {group.label.toUpperCase()}
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      style={{
                        display: "block",
                        padding: "12px 0",
                        fontSize: 15,
                        fontWeight: 600,
                        color: "#F5F3FF",
                        borderBottom: "1px solid rgba(255,255,255,.06)",
                      }}
                    >
                      {link.title}
                      <span style={{ marginLeft: 10, fontSize: 12, color: "#6E6980", fontWeight: 400, ...mono }}>{link.href}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
