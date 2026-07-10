import { createClient } from "@/lib/supabase/server";

function escapeXml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("title, slug, meta_description, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(50);

  const base = "https://uppr.agency";
  const items = (articles ?? [])
    .map(
      (a) => `
    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${base}/blog/${a.slug}</link>
      <guid>${base}/blog/${a.slug}</guid>
      ${a.meta_description ? `<description>${escapeXml(a.meta_description)}</description>` : ""}
      ${a.published_at ? `<pubDate>${new Date(a.published_at).toUTCString()}</pubDate>` : ""}
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>UPPR Agency Blog</title>
    <link>${base}/blog</link>
    <description>Email &amp; SMS retention marketing insights for e-commerce brands.</description>
    <language>en</language>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
