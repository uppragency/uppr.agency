"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "uppr-dashboard-last-seen";

export default function NewReportBadge({ latestUpdatedAt }: { latestUpdatedAt: string | null }) {
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (!latestUpdatedAt) return;
    const lastSeen = localStorage.getItem(STORAGE_KEY);
    if (!lastSeen || new Date(latestUpdatedAt) > new Date(lastSeen)) {
      setIsNew(true);
    }
  }, [latestUpdatedAt]);

  function markSeen() {
    localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    setIsNew(false);
  }

  if (!isNew) return null;

  return (
    <button
      onClick={markSeen}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 14px",
        borderRadius: 999,
        background: "rgba(74,222,128,.12)",
        border: "1px solid rgba(74,222,128,.35)",
        color: "#4ADE80",
        fontWeight: 600,
        fontSize: 12.5,
        fontFamily: "var(--font-mono-label), monospace",
        cursor: "pointer",
      }}
    >
      <span style={{ width: 7, height: 7, borderRadius: 999, background: "#4ADE80", boxShadow: "0 0 8px #4ADE80" }} />
      Raport nou disponibil — marchează ca văzut
    </button>
  );
}
