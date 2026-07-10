"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/database.types";

type Report = Database["public"]["Tables"]["campaign_reports"]["Row"];
type Newsletter = Database["public"]["Tables"]["newsletters"]["Row"];

const LUNI = [
  "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
  "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie",
];

type NewsletterDraft = {
  id?: string;
  title: string;
  sent_emails: number;
  unique_open_rate: number;
  unique_click_rate: number;
  transactions: number;
  revenue: number;
};

const emptyNewsletter: NewsletterDraft = {
  title: "",
  sent_emails: 0,
  unique_open_rate: 0,
  unique_click_rate: 0,
  transactions: 0,
  revenue: 0,
};

const emptyForm = {
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
  ecom_sent_emails: 0,
  ecom_clicks: 0,
  ecom_conversion_rate: 0,
  ecom_transactions: 0,
  ecom_revenue: 0,
  recommendation_1: "",
  recommendation_2: "",
  recommendation_3: "",
  recommendation_4: "",
  internal_note: "",
};

export default function ReportForm({
  clientId,
  report,
  newsletters,
}: {
  clientId: string;
  report?: Report;
  newsletters?: Newsletter[];
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
          ecom_sent_emails: report.ecom_sent_emails,
          ecom_clicks: report.ecom_clicks,
          ecom_conversion_rate: report.ecom_conversion_rate,
          ecom_transactions: report.ecom_transactions,
          ecom_revenue: report.ecom_revenue,
          recommendation_1: report.recommendation_1 ?? "",
          recommendation_2: report.recommendation_2 ?? "",
          recommendation_3: report.recommendation_3 ?? "",
          recommendation_4: report.recommendation_4 ?? "",
          internal_note: report.internal_note ?? "",
        }
      : emptyForm
  );

  const [newsletterDrafts, setNewsletterDrafts] = useState<NewsletterDraft[]>(
    newsletters?.length
      ? newsletters.map((n) => ({
          id: n.id,
          title: n.title,
          sent_emails: n.sent_emails,
          unique_open_rate: n.unique_open_rate,
          unique_click_rate: n.unique_click_rate,
          transactions: n.transactions,
          revenue: n.revenue,
        }))
      : [{ ...emptyNewsletter }]
  );

  function update<K extends keyof typeof form>(key: K, value: string) {
    const numericFields: (keyof typeof form)[] = [
      "month", "year", "ecom_sent_emails", "ecom_clicks",
      "ecom_conversion_rate", "ecom_transactions", "ecom_revenue",
    ];
    setForm((f) => ({
      ...f,
      [key]: numericFields.includes(key) ? Number(value) : value,
    }));
  }

  function updateNewsletter(index: number, key: keyof NewsletterDraft, value: string) {
    setNewsletterDrafts((drafts) =>
      drafts.map((d, i) => {
        if (i !== index) return d;
        const numericKeys: (keyof NewsletterDraft)[] = [
          "sent_emails", "unique_open_rate", "unique_click_rate", "transactions", "revenue",
        ];
        return { ...d, [key]: numericKeys.includes(key) ? Number(value) : value };
      })
    );
  }

  function addNewsletter() {
    setNewsletterDrafts((drafts) => [...drafts, { ...emptyNewsletter }]);
  }

  function removeNewsletter(index: number) {
    setNewsletterDrafts((drafts) => drafts.filter((_, i) => i !== index));
  }

  async function handleSave(status: "draft" | "published") {
    setSaving(true);
    setError(null);

    const payload = { ...form, status };

    const reportQuery = report
      ? supabase.from("campaign_reports").update(payload).eq("id", report.id).select().single()
      : supabase.from("campaign_reports").insert({ ...payload, client_id: clientId }).select().single();

    const { data: savedReport, error: reportError } = await reportQuery;

    if (reportError || !savedReport) {
      setError(reportError?.message ?? "Eroare la salvarea raportului");
      setSaving(false);
      return;
    }

    // Șterg newsletter-ele existente și le reinserez — cel mai simplu mod de
    // a sincroniza o listă dinamică (adăugate/șterse/editate) într-un singur pas.
    await supabase.from("newsletters").delete().eq("report_id", savedReport.id);

    const validNewsletters = newsletterDrafts.filter((n) => n.title.trim() !== "");
    if (validNewsletters.length) {
      const { error: newsletterError } = await supabase.from("newsletters").insert(
        validNewsletters.map((n) => ({
          report_id: savedReport.id,
          title: n.title,
          sent_emails: n.sent_emails,
          unique_open_rate: n.unique_open_rate,
          unique_click_rate: n.unique_click_rate,
          transactions: n.transactions,
          revenue: n.revenue,
        }))
      );
      if (newsletterError) {
        setError(newsletterError.message);
        setSaving(false);
        return;
      }
    }

    if (status === "published") {
      fetch("/api/notify-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportId: savedReport.id }),
      }).catch(() => {
        // notificarea e best-effort — nu blocăm salvarea raportului dacă eșuează
      });
    }

    setSaving(false);
    router.push(`/admin/clients/${clientId}`);
    router.refresh();
  }

  const ecomNumberInput = (label: string, key: keyof typeof form) => (
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
            {ecomNumberInput("An", "year")}
          </div>
        </div>
      </div>

      <div className="uppr-card">
        <div className="uppr-card-inner space-y-5">
          <div className="flex items-center justify-between">
            <span className="uppr-label" style={{ color: "var(--uppr-violet-3)" }}>
              Campanii lunare — newsletter-e
            </span>
            <button type="button" onClick={addNewsletter} className="uppr-btn-secondary" style={{ padding: "7px 14px", fontSize: 12.5, minHeight: "auto" }}>
              + Newsletter
            </button>
          </div>

          {newsletterDrafts.map((n, i) => (
            <div key={n.id ?? `new-${i}`} className="space-y-3" style={{ padding: 16, borderRadius: 12, border: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.02)" }}>
              <div className="flex items-center gap-3">
                <input
                  className="uppr-input"
                  placeholder="Titlu newsletter (ex: Black Friday 2026)"
                  value={n.title}
                  onChange={(e) => updateNewsletter(i, "title", e.target.value)}
                  style={{ flex: 1 }}
                />
                {newsletterDrafts.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeNewsletter(i)}
                    style={{ color: "var(--uppr-pink)", fontSize: 13, fontWeight: 600, flex: "none" }}
                  >
                    Șterge
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="space-y-1">
                  <label className="uppr-label block" style={{ fontSize: 10 }}>Sent to</label>
                  <input type="number" className="uppr-input" style={{ padding: "8px 10px", fontSize: 13 }} value={n.sent_emails} onChange={(e) => updateNewsletter(i, "sent_emails", e.target.value)} />
                </div>
                <div className="space-y-1">
                  <label className="uppr-label block" style={{ fontSize: 10 }}>Open rate %</label>
                  <input type="number" step="any" className="uppr-input" style={{ padding: "8px 10px", fontSize: 13 }} value={n.unique_open_rate} onChange={(e) => updateNewsletter(i, "unique_open_rate", e.target.value)} />
                </div>
                <div className="space-y-1">
                  <label className="uppr-label block" style={{ fontSize: 10 }}>Click rate %</label>
                  <input type="number" step="any" className="uppr-input" style={{ padding: "8px 10px", fontSize: 13 }} value={n.unique_click_rate} onChange={(e) => updateNewsletter(i, "unique_click_rate", e.target.value)} />
                </div>
                <div className="space-y-1">
                  <label className="uppr-label block" style={{ fontSize: 10 }}>Transactions</label>
                  <input type="number" className="uppr-input" style={{ padding: "8px 10px", fontSize: 13 }} value={n.transactions} onChange={(e) => updateNewsletter(i, "transactions", e.target.value)} />
                </div>
                <div className="space-y-1">
                  <label className="uppr-label block" style={{ fontSize: 10 }}>Revenue (Lei)</label>
                  <input type="number" step="any" className="uppr-input" style={{ padding: "8px 10px", fontSize: 13 }} value={n.revenue} onChange={(e) => updateNewsletter(i, "revenue", e.target.value)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="uppr-card">
        <div className="uppr-card-inner space-y-4">
          <span className="uppr-label" style={{ color: "var(--uppr-violet-3)" }}>
            Ecommerce statistics (total pe lună)
          </span>
          <div className="grid grid-cols-2 gap-4">
            {ecomNumberInput("Sent emails", "ecom_sent_emails")}
            {ecomNumberInput("Clicks", "ecom_clicks")}
            {ecomNumberInput("Conversion rate (%)", "ecom_conversion_rate")}
            {ecomNumberInput("Transactions", "ecom_transactions")}
            {ecomNumberInput("Revenue (Lei)", "ecom_revenue")}
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

      <div className="uppr-card" style={{ borderColor: "rgba(251,191,36,.25)" }}>
        <div className="uppr-card-inner space-y-3">
          <span className="uppr-label" style={{ color: "#FBBF24" }}>
            🔒 Notă internă (nevăzută de client)
          </span>
          <textarea
            placeholder="Context intern, de reamintit data viitoare..."
            className="uppr-input"
            value={form.internal_note}
            onChange={(e) => update("internal_note", e.target.value)}
          />
        </div>
      </div>

      {error && (
        <p className="text-sm" style={{ color: "var(--uppr-pink)" }}>
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button onClick={() => handleSave("draft")} disabled={saving} className="uppr-btn-secondary">
          {saving ? "Se salvează..." : "Salvează draft"}
        </button>
        <button onClick={() => handleSave("published")} disabled={saving} className="uppr-btn-primary">
          {saving ? "Se salvează..." : "Publică raport →"}
        </button>
      </div>
    </div>
  );
}
