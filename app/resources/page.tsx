import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SiteBackground from "@/components/site/SiteBackground";
import { createClient } from "@/lib/supabase/server";
import { estimateReadingTime } from "@/lib/reading-time";

export const metadata: Metadata = {
  title: "Resources | UPPR Agency",
  description: "Guides, tools, and references for running email and SMS retention marketing.",
};

export const revalidate = 60;

const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;
const heading = { fontFamily: "var(--font-heading), sans-serif" } as const;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="uppr-label" style={{ ...mono, color: "#A855F7", fontSize: 12 }}>
      [ {children} ]
    </span>
  );
}

export default async function ResourcesPage() {
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("title, slug, meta_description, content")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(6);

  return (
    <div style={{ position: "relative" }}>
      <SiteBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />

        <header style={{ maxWidth: 800, margin: "0 auto", padding: "clamp(120px,18vw,170px) clamp(18px,5vw,28px) clamp(50px,7vw,70px)", textAlign: "center" }}>
          <div className="uppr-pill" style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#D6C6FA", ...mono }}>RESOURCES</span>
          </div>
          <h1 style={{ margin: "0 0 16px", ...heading, fontWeight: 700, fontSize: "clamp(30px,5vw,44px)", lineHeight: 1.1, letterSpacing: "-.02em" }}>
            Everything to run retention well.
          </h1>
          <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: "#A29DB8" }}>
            Guides, free tools, and references — no email required to use any of them.
          </p>
        </header>

        <main style={{ maxWidth: 1000, margin: "0 auto", padding: "0 clamp(18px,5vw,28px) clamp(30px,5vw,50px)" }}>
          {/* TOOLS */}
          <section style={{ marginBottom: 60 }}>
            <SectionLabel>FREE TOOLS</SectionLabel>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(260px,100%),1fr))", gap: 18, marginTop: 20 }}>
              <Link href="/subject-line-grader" className="uppr-card">
                <div className="uppr-card-inner" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <span style={{ fontSize: 24 }}>✎</span>
                  <h3 style={{ margin: 0, ...heading, fontWeight: 600, fontSize: 17 }}>Subject Line Grader</h3>
                  <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: "#A29DB8" }}>
                    Score your subject lines against spam triggers, length, and personalization — instantly.
                  </p>
                </div>
              </Link>
              <Link href="/glossary" className="uppr-card">
                <div className="uppr-card-inner" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <span style={{ fontSize: 24 }}>📖</span>
                  <h3 style={{ margin: 0, ...heading, fontWeight: 600, fontSize: 17 }}>Glossary</h3>
                  <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: "#A29DB8" }}>
                    Plain-English definitions for every retention marketing term you'll run into.
                  </p>
                </div>
              </Link>
              <Link href="/referral-program" className="uppr-card">
                <div className="uppr-card-inner" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <span style={{ fontSize: 24 }}>↻</span>
                  <h3 style={{ margin: 0, ...heading, fontWeight: 600, fontSize: 17 }}>Referral Program</h3>
                  <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: "#A29DB8" }}>
                    Earn 30% off TheMarketer, or refer a business and both of you benefit.
                  </p>
                </div>
              </Link>
            </div>
          </section>

          {/* GUIDES */}
          <section style={{ marginBottom: 40 }}>
            <SectionLabel>LATEST GUIDES</SectionLabel>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(300px,100%),1fr))", gap: 18, marginTop: 20 }}>
              {articles?.map((a) => (
                <Link key={a.slug} href={`/blog/${a.slug}`} className="uppr-card">
                  <div className="uppr-card-inner" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <h3 style={{ margin: 0, ...heading, fontWeight: 600, fontSize: 16, lineHeight: 1.35 }}>{a.title}</h3>
                    {a.meta_description && (
                      <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: "#A29DB8" }}>{a.meta_description}</p>
                    )}
                    <span style={{ fontSize: 11.5, color: "#6E6980", ...mono }}>{estimateReadingTime(a.content)} min read</span>
                  </div>
                </Link>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 28 }}>
              <Link href="/blog" className="uppr-btn-secondary" style={{ padding: "12px 22px", fontSize: 14, textDecoration: "none" }}>
                View all guides →
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
