"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/database.types";

type Report = Database["public"]["Tables"]["campaign_reports"]["Row"];

const LUNI = [
  "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
  "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie",
];

const emptyForm = {
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
  sent_emails: 0,
  unique_open_rate: 0,
  unique_click_rate: 0,
  transactions: 0,
  revenue: 0,
  ecom_sent_emails: 0,
  ecom_clicks: 0,
  ecom_conversion_rate: 0,
  ecom_transactions: 0,
  ecom_revenue: 0,
  recommendation_1: "",
  recommendation_2: "",
  recommendation_3: "",
  recommendation_4: "",
};

export default function ReportForm({
  clientId,
  report,
}: {
  clientId: string;
  report?: Report;
}) {
  const router = useRouter();
  const supabase = createClient();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState(
    report
      ? {
          month: report.month,
          year: report.year,
          sent_emails: report.sent_emails,
          unique_open_rate: report.unique_open_rate,
          unique_click_rate: report.unique_click_rate,
          transactions: report.transactions,
          revenue: report.revenue,
          ecom_sent_emails: report.ecom_sent_emails,
          ecom_clicks: report.ecom_clicks,
          ecom_conversion_rate: report.ecom_conversion_rate,
          ecom_transactions: report.ecom_transactions,
          ecom_revenue: report.ecom_revenue,
          recommendation_1: report.recommendation_1 ?? "",
          recommendation_2: report.recommendation_2 ?? "",
          recommendation_3: report.recommendation_3 ?? "",
          recommendation_4: report.recommendation_4 ?? "",
        }
      : emptyForm
  );

  function update<K extends keyof typeof form>(key: K, value: string) {
    const numericFields: (keyof typeof form)[] = [
      "month", "year", "sent_emails", "unique_open_rate", "unique_click_rate",
      "transactions", "revenue", "ecom_sent_emails", "ecom_clicks",
      "ecom_conversion_rate", "ecom_transactions", "ecom_revenue",
    ];
    setForm((f) => ({
      ...f,
      [key]: numericFields.includes(key) ? Number(value) : value,
    }));
  }

  async function handleSave() {
    setSaving(true);
    setError(null);

    const query = report
      ? supabase.from("campaign_reports").update(form).eq("id", report.id)
      : supabase.from("campaign_reports").insert({ ...form, client_id: clientId });

    const { error } = await query;
    setSaving(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push(`/admin/clients/${clientId}`);
    router.refresh();
  }

  const numberInput = (label: string, key: keyof typeof form) => (
    <div className="space-y-1.5">
      <label className="uppr-label block">{label}</label>
      <input
        type="number"
        step="any"
        className="uppr-input"
        value={form[key]}
        onChange={(e) => update(key, e.target.value)}
      />
    </div>
  );

  return (
    <div className="max-w-2xl space-y-6">
      <div className="uppr-card">
        <div className="uppr-card-inner">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="uppr-label block">Luna</label>
              <select
                className="uppr-input"
                value={form.month}
                onChange={(e) => update("month", e.target.value)}
              >
                {LUNI.map((luna, i) => (
                  <option key={luna} value={i + 1}>
                    {luna}
                  </option>
                ))}
              </select>
            </div>
            {numberInput("An", "year")}
          </div>
        </div>
      </div>

      <div className="uppr-card">
        <div className="uppr-card-inner space-y-4">
          <span className="uppr-label" style={{ color: "var(--uppr-violet-3)" }}>
            Campanii lunare
          </span>
          <div className="grid grid-cols-2 gap-4">
            {numberInput("Sent emails", "sent_emails")}
            {numberInput("Unique open rate (%)", "unique_open_rate")}
            {numberInput("Unique click rate (%)", "unique_click_rate")}
            {numberInput("Transactions", "transactions")}
            {numberInput("Revenue (Lei)", "revenue")}
          </div>
        </div>
      </div>

      <div className="uppr-card">
        <div className="uppr-card-inner space-y-4">
          <span className="uppr-label" style={{ color: "var(--uppr-violet-3)" }}>
            Ecommerce statistics
          </span>
          <div className="grid grid-cols-2 gap-4">
            {numberInput("Sent emails", "ecom_sent_emails")}
            {numberInput("Clicks", "ecom_clicks")}
            {numberInput("Conversion rate (%)", "ecom_conversion_rate")}
            {numberInput("Transactions", "ecom_transactions")}
            {numberInput("Revenue (Lei)", "ecom_revenue")}
          </div>
        </div>
      </div>

      <div className="uppr-card">
        <div className="uppr-card-inner space-y-3">
          <span className="uppr-label" style={{ color: "var(--uppr-violet-3)" }}>
            Recomandări
          </span>
          {(["recommendation_1", "recommendation_2", "recommendation_3", "recommendation_4"] as const).map(
            (key, i) => (
              <textarea
                key={key}
                placeholder={`Recomandare ${i + 1}`}
                className="uppr-input"
                value={form[key]}
                onChange={(e) => update(key, e.target.value)}
              />
            )
          )}
        </div>
      </div>

      {error && (
        <p className="text-sm" style={{ color: "var(--uppr-pink)" }}>
          {error}
        </p>
      )}

      <button onClick={handleSave} disabled={saving} className="uppr-btn-primary">
        {saving ? "Se salvează..." : "Salvează raport →"}
      </button>
    </div>
  );
}
