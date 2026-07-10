"use client";

import { useState } from "react";

export default function CopyMissingButton({ names }: { names: string[] }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(names.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  if (!names.length) return null;

  return (
    <button onClick={handleCopy} className="uppr-btn-secondary" style={{ padding: "8px 14px", fontSize: 12.5, minHeight: "auto" }}>
      {copied ? "Copiat ✓" : `Copiază lista (${names.length})`}
    </button>
  );
}
