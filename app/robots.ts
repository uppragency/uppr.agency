import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/dashboard", "/login", "/report", "/demo", "/thank-you"],
      },
    ],
    sitemap: ["https://uppr.agency/sitemap.xml", "https://uppr.agency/sitemap-images.xml"],
  };
}
