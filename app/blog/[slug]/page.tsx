import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SiteBackground from "@/components/site/SiteBackground";
import { createClient } from "@/lib/supabase/server";

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

  const publishedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : null;

  return (
    <div style={{ position: "relative" }}>
      <SiteBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />

        <header style={{ maxWidth: 760, margin: "0 auto", padding: "clamp(120px,18vw,170px) clamp(18px,5vw,28px) 0" }}>
          <Link href="/blog/" style={{ fontWeight: 600, fontSize: 13, color: "#A29DB8" }}>
            ← Blog
          </Link>
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
          {publishedDate && (
            <p style={{ margin: "0 0 32px", fontSize: 15, color: "#A29DB8" }}>
              Published {publishedDate} · UPPR Agency
            </p>
          )}
        </header>

        <main
          className="post"
          style={{ maxWidth: 760, margin: "0 auto", padding: "0 clamp(18px,5vw,28px) 40px" }}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <Footer />
      </div>
    </div>
  );
}
