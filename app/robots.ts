import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/dashboard", "/login", "/report", "/demo", "/thank-you", "/forgot-password", "/reset-password"],
      },
    ],
    sitemap: ["https://www.uppr.agency/sitemap.xml", "https://www.uppr.agency/sitemap-images.xml"],
  };
}
