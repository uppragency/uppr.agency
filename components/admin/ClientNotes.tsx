"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type Note = {
  id: string;
  note: string;
  admin_email: string;
  created_at: string;
};

export default function ClientNotes({
  clientId,
  notes,
}: {
  clientId: string;
  notes: Note[];
}) {
  const supabase = createClient();
  const router = useRouter();
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);

  async function addNote() {
    if (!text.trim()) return;
    setSaving(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    await supabase.from("client_notes").insert({
      client_id: clientId,
      admin_email: user?.email ?? "necunoscut",
      note: text.trim(),
    });
    setText("");
    setSaving(false);
    router.refresh();
  }

  return (
    <div className="uppr-card">
      <div className="uppr-card-inner space-y-4">
        <span className="uppr-label" style={{ color: "var(--uppr-violet-3)" }}>
          📝 Note rapide
        </span>
        <div className="flex gap-2">
          <input
            className="uppr-input"
            placeholder="Ex: a cerut să schimbăm frecvența..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addNote()}
          />
          <button onClick={addNote} disabled={saving} className="uppr-btn-secondary" style={{ padding: "8px 16px", fontSize: 13, minHeight: "auto", flex: "none" }}>
            Adaugă
          </button>
        </div>

        {notes.length > 0 && (
          <div className="space-y-2" style={{ maxHeight: 280, overflowY: "auto" }}>
            {notes.map((n) => (
              <div key={n.id} style={{ padding: "10px 12px", borderRadius: 10, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)" }}>
                <p style={{ margin: 0, fontSize: 13.5, color: "var(--uppr-fg)" }}>{n.note}</p>
                <p style={{ margin: "6px 0 0", fontSize: 11, color: "var(--uppr-muted)", fontFamily: "var(--font-mono-label), monospace" }}>
                  {new Date(n.created_at).toLocaleDateString("ro-RO")} · {n.admin_email}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
