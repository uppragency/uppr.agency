"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ArchiveClientButton({
  clientId,
  archived,
}: {
  clientId: string;
  archived: boolean;
}) {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function toggle() {
    const message = archived
      ? "Reactivezi acest client (redevine vizibil ca activ)?"
      : "Arhivezi acest client? Rămâne accesibil, dar dispare din lista activă.";
    if (!window.confirm(message)) return;

    setLoading(true);
    await supabase.from("clients").update({ archived: !archived }).eq("id", clientId);
    setLoading(false);
    router.refresh();
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className="uppr-btn-secondary"
      style={{ padding: "8px 14px", fontSize: 12.5, minHeight: "auto" }}
    >
      {loading ? "..." : archived ? "Reactivează client" : "Arhivează client"}
    </button>
  );
}
