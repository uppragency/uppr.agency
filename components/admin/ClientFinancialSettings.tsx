"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ClientFinancialSettings({
  clientId,
  initialSetupCost,
  initialTargetMargin,
}: {
  clientId: string;
  initialSetupCost: number;
  initialTargetMargin: number | null;
}) {
  const supabase = createClient();
  const [setupCost, setSetupCost] = useState(initialSetupCost);
  const [targetMargin, setTargetMargin] = useState(initialTargetMargin ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    await supabase
      .from("clients")
      .update({
        setup_cost: setupCost,
        target_margin_pct: targetMargin === "" ? null : Number(targetMargin),
      })
      .eq("id", clientId);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div className="uppr-card">
      <div className="uppr-card-inner space-y-4">
        <span className="uppr-label" style={{ color: "#4ADE80" }}>
          💰 Setări financiare
        </span>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="uppr-label block" style={{ fontSize: 10.5 }}>
              Cost setup inițial (Lei, o singură dată)
            </label>
            <input
              type="number"
              step="any"
              className="uppr-input"
              value={setupCost}
              onChange={(e) => setSetupCost(Number(e.target.value))}
            />
          </div>
          <div className="space-y-1.5">
            <label className="uppr-label block" style={{ fontSize: 10.5 }}>
              Target marjă (%, opțional)
            </label>
            <input
              type="number"
              step="any"
              placeholder="ex: 40"
              className="uppr-input"
              value={targetMargin}
              onChange={(e) => setTargetMargin(e.target.value === "" ? "" : Number(e.target.value))}
            />
          </div>
        </div>
        <button onClick={handleSave} disabled={saving} className="uppr-btn-secondary" style={{ padding: "8px 16px", fontSize: 13, minHeight: "auto" }}>
          {saving ? "Se salvează..." : saved ? "Salvat ✓" : "Salvează"}
        </button>
      </div>
    </div>
  );
}
