"use client";

import { useEffect, useState } from "react";

export default function ArticlePreviewPage() {
  const [data, setData] = useState<{ title: string; content: string; tags: string[] } | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("uppr-article-preview");
    if (raw) setData(JSON.parse(raw));
  }, []);

  if (!data) {
    return (
      <p style={{ color: "var(--uppr-muted)" }}>
        Niciun preview disponibil. Deschide acest tab din butonul „Preview” al formularului de articol.
      </p>
    );
  }

  return (
    <div style={{ maxWidth: 760, margin: "0 auto" }}>
      <div className="uppr-pill" style={{ marginBottom: 24 }}>
        <span className="uppr-label" style={{ color: "#FBBF24" }}>
          👁 PREVIEW — nesalvat
        </span>
      </div>

      {data.tags.length > 0 && (
        <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
          {data.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 11,
                padding: "4px 10px",
                borderRadius: 999,
                background: "rgba(168,85,247,.1)",
                color: "var(--uppr-violet-3)",
                fontFamily: "var(--font-mono-label), monospace",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <h1
        style={{
          margin: "0 0 24px",
          fontFamily: "var(--font-heading), sans-serif",
          fontWeight: 700,
          fontSize: "clamp(28px,4.5vw,40px)",
          lineHeight: 1.15,
          letterSpacing: "-.02em",
        }}
      >
        {data.title || "(fără titlu)"}
      </h1>

      <div className="post" dangerouslySetInnerHTML={{ __html: data.content }} />
    </div>
  );
}
