import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("slug, og_image, title")
    .eq("status", "published")
    .not("og_image", "is", null);

  const base = "https://uppr.agency";

  const urls = (articles ?? [])
    .map(
      (a) => `
  <url>
    <loc>${base}/blog/${a.slug}</loc>
    <image:image>
      <image:loc>${a.og_image}</image:loc>
      <image:title>${a.title.replace(/&/g, "&amp;")}</image:title>
    </image:image>
  </url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${urls}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
