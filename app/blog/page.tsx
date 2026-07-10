import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SiteBackground from "@/components/site/SiteBackground";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Blog | Email & SMS Retention Marketing Insights | UPPR Agency",
  description:
    "Guides, benchmarks, and playbooks on email and SMS retention marketing for e-commerce brands, from the UPPR Agency team.",
};

export const revalidate = 60;

export default async function BlogIndexPage() {
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("title, slug, meta_description, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  return (
    <div style={{ position: "relative" }}>
      <SiteBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />

        <header style={{ maxWidth: 900, margin: "0 auto", padding: "clamp(120px,18vw,170px) clamp(18px,5vw,28px) clamp(40px,6vw,60px)" }}>
          <div className="uppr-pill" style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#D6C6FA", fontFamily: "var(--font-mono-label), monospace" }}>
              RETENTION MARKETING BLOG
            </span>
          </div>
          <h1 style={{ margin: "0 0 16px", fontFamily: "var(--font-heading), sans-serif", fontWeight: 700, fontSize: "clamp(32px,5.5vw,52px)", lineHeight: 1.08, letterSpacing: "-.02em" }}>
            Guides on turning traffic into <span className="grad-text">compounding revenue</span>.
          </h1>
          <p style={{ margin: 0, fontSize: "clamp(15.5px,2vw,17px)", lineHeight: 1.6, color: "#A29DB8", maxWidth: 600 }}>
            Practical breakdowns of email and SMS retention marketing: flows, benchmarks, and setups that hold up on real e-commerce accounts.
          </p>
        </header>

        <main style={{ maxWidth: 900, margin: "0 auto", padding: "0 clamp(18px,5vw,28px) clamp(80px,10vw,120px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(340px,100%),1fr))", gap: 20 }}>
            {articles?.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`} className="uppr-card">
                <article className="uppr-card-inner" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <h2 style={{ margin: 0, fontFamily: "var(--font-heading), sans-serif", fontWeight: 600, fontSize: 21, lineHeight: 1.3, color: "#F5F3FF" }}>
                    {article.title}
                  </h2>
                  {article.meta_description && (
                    <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "#A29DB8" }}>
                      {article.meta_description}
                    </p>
                  )}
                  <span style={{ marginTop: "auto", fontWeight: 600, fontSize: 13, color: "#F5F3FF" }}>Read the guide →</span>
                </article>
              </Link>
            ))}
            {!articles?.length && (
              <p style={{ color: "#A29DB8" }}>Niciun articol publicat încă.</p>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
