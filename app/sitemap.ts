import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://uppr.agency";
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("slug, updated_at")
    .eq("status", "published");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/blog/`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/comparison`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/how-we-work`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/email-marketing-romania`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/sitemap`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/resources`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/glossary`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/referral-program/`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/subject-line-grader/`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const articleRoutes: MetadataRoute.Sitemap =
    articles?.map((a) => ({
      url: `${base}/blog/${a.slug}`,
      lastModified: a.updated_at,
      changeFrequency: "monthly",
      priority: 0.7,
    })) ?? [];

  return [...staticRoutes, ...articleRoutes];
}
