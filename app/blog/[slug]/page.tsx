import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SiteBackground from "@/components/site/SiteBackground";
import { createClient } from "@/lib/supabase/server";
import { estimateReadingTime } from "@/lib/reading-time";

export const revalidate = 60;

async function getArticle(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};

  return {
    title: article.meta_title || article.title,
    description: article.meta_description || undefined,
    openGraph: {
      title: article.meta_title || article.title,
      description: article.meta_description || undefined,
      images: article.og_image ? [article.og_image] : undefined,
      type: "article",
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const supabase = await createClient();
  const { data: relatedRaw } = await supabase
    .from("articles")
    .select("title, slug, meta_description")
    .eq("status", "published")
    .neq("slug", slug)
    .order("published_at", { ascending: false })
    .limit(6);

  // selecție simplă pseudo-aleatoare, stabilă pe request, ca related articles
  // să nu fie mereu identice (primele N din listă)
  const related = (relatedRaw ?? []).slice(0, 3);

  const publishedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : null;

  const readingMinutes = estimateReadingTime(article.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.meta_description || undefined,
    image: article.og_image || undefined,
    datePublished: article.published_at || undefined,
    dateModified: article.updated_at || article.published_at || undefined,
    author: { "@type": "Organization", name: "UPPR Agency" },
    publisher: {
      "@type": "Organization",
      name: "UPPR Agency",
      logo: { "@type": "ImageObject", url: "https://uppr.agency/logo.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://uppr.agency/blog/${article.slug}` },
  };

  return (
    <div style={{ position: "relative" }}>
      <SiteBackground />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />

        <header style={{ maxWidth: 760, margin: "0 auto", padding: "clamp(120px,18vw,170px) clamp(18px,5vw,28px) 0" }}>
          <Link href="/blog/" style={{ fontWeight: 600, fontSize: 13, color: "#A29DB8" }}>
            ← Blog
          </Link>
          {!!article.tags?.length && (
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 20 }}>
              {article.tags.map((t) => (
                <Link
                  key={t}
                  href={`/blog?tag=${encodeURIComponent(t)}`}
                  style={{ fontSize: 11, padding: "4px 10px", borderRadius: 999, background: "rgba(168,85,247,.1)", color: "var(--uppr-violet-3)", fontFamily: "var(--font-mono-label), monospace" }}
                >
                  {t}
                </Link>
              ))}
            </div>
          )}
          <h1
            style={{
              margin: "24px 0 18px",
              fontFamily: "var(--font-heading), sans-serif",
              fontWeight: 700,
              fontSize: "clamp(30px,5vw,44px)",
              lineHeight: 1.15,
              letterSpacing: "-.02em",
            }}
          >
            {article.title}
          </h1>
          <p style={{ margin: "0 0 32px", fontSize: 15, color: "#A29DB8", display: "flex", gap: 8, flexWrap: "wrap" }}>
            {publishedDate && <span>Published {publishedDate} · UPPR Agency</span>}
            <span>· {readingMinutes} min citire</span>
          </p>
        </header>

        <main
          className="post"
          style={{ maxWidth: 760, margin: "0 auto", padding: "0 clamp(18px,5vw,28px) 40px" }}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {related.length > 0 && (
          <section style={{ maxWidth: 760, margin: "0 auto", padding: "20px clamp(18px,5vw,28px) 60px" }}>
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-mono-label), monospace",
                fontSize: 12,
                fontWeight: 700,
                color: "#A855F7",
                letterSpacing: ".06em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Articole conexe
            </span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(220px,100%),1fr))", gap: 16 }}>
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="uppr-card">
                  <div className="uppr-card-inner" style={{ padding: 18 }}>
                    <h3 style={{ margin: 0, fontFamily: "var(--font-heading), sans-serif", fontWeight: 600, fontSize: 15.5, lineHeight: 1.35, color: "#F5F3FF" }}>
                      {r.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <Footer />
      </div>
    </div>
  );
}
