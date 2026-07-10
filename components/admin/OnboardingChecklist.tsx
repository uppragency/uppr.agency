"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Checklist = {
  onboarding_account_created: boolean;
  onboarding_first_report: boolean;
  onboarding_welcome_sent: boolean;
};

const ITEMS: { key: keyof Checklist; label: string }[] = [
  { key: "onboarding_account_created", label: "Cont de client creat (Supabase Auth)" },
  { key: "onboarding_first_report", label: "Primul raport lunar adăugat" },
  { key: "onboarding_welcome_sent", label: "Email/mesaj de bun venit trimis" },
];

export default function OnboardingChecklist({
  clientId,
  initial,
}: {
  clientId: string;
  initial: Checklist;
}) {
  const supabase = createClient();
  const [state, setState] = useState(initial);
  const [saving, setSaving] = useState<string | null>(null);

  async function toggle(key: keyof Checklist) {
    const next = { ...state, [key]: !state[key] };
    setState(next);
    setSaving(key);
    await supabase
      .from("clients")
      .update({ [key]: next[key] } as Partial<Checklist>)
      .eq("id", clientId);
    setSaving(null);
  }

  const doneCount = ITEMS.filter((i) => state[i.key]).length;

  return (
    <div className="uppr-card">
      <div className="uppr-card-inner">
        <div className="flex items-center justify-between mb-3">
          <span className="uppr-label" style={{ color: "var(--uppr-violet-3)" }}>
            Onboarding checklist
          </span>
          <span className="text-xs" style={{ color: "var(--uppr-muted)" }}>
            {doneCount}/{ITEMS.length}
          </span>
        </div>
        <div className="space-y-2">
          {ITEMS.map((item) => (
            <label
              key={item.key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: 14,
                cursor: "pointer",
                opacity: saving === item.key ? 0.6 : 1,
              }}
            >
              <input
                type="checkbox"
                checked={state[item.key]}
                onChange={() => toggle(item.key)}
                style={{ width: 16, height: 16, accentColor: "#A855F7" }}
              />
              <span style={{ textDecoration: state[item.key] ? "line-through" : "none", color: state[item.key] ? "var(--uppr-muted)" : "var(--uppr-fg)" }}>
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
