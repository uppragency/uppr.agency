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
