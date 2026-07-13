import { ImageResponse } from "next/og";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const alt = "UPPR Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({ params }: { params: { slug: string } }) {
  const supabase = await createClient();
  const { data: article } = await supabase
    .from("articles")
    .select("title")
    .eq("slug", params.slug)
    .single();

  const title = article?.title ?? "UPPR Agency";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg,#050309 0%,#160F2E 55%,#0B0817 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle,rgba(168,85,247,.45),transparent 70%)",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#D6C6FA",
              letterSpacing: 2,
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            UPPR AGENCY
          </div>
        </div>
        <div
          style={{
            fontSize: 58,
            fontWeight: 700,
            color: "#F5F3FF",
            lineHeight: 1.15,
            letterSpacing: -1,
            maxWidth: 950,
            display: "flex",
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 22, color: "#8B84A0", display: "flex" }}>
          Email &amp; SMS Retention Marketing
        </div>
      </div>
    ),
    { ...size }
  );
}
