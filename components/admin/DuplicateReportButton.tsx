"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DuplicateReportButton({
  reportId,
  clientId,
}: {
  reportId: string;
  clientId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch("/api/duplicate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportId }),
      });
      const data = await res.json();
      if (data.id) {
        router.push(`/admin/clients/${clientId}/${data.id}`);
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="text-sm font-semibold"
      style={{ color: "var(--uppr-muted)" }}
    >
      {loading ? "..." : "Duplică"}
    </button>
  );
}
