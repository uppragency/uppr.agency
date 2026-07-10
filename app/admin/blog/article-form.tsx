"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/database.types";

type Article = Database["public"]["Tables"]["articles"]["Row"];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="uppr-label block">{label}</label>
      {children}
    </div>
  );
}

export default function ArticleForm({
  article,
}: {
  article?: Article;
}) {
  const router = useRouter();
  const supabase = createClient();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: article?.title ?? "",
    slug: article?.slug ?? "",
    content: article?.content ?? "",
    meta_title: article?.meta_title ?? "",
    meta_description: article?.meta_description ?? "",
    og_image: article?.og_image ?? "",
    status: article?.status ?? "draft",
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSave(publish?: boolean) {
    setSaving(true);
    setError(null);

    const payload = {
      ...form,
      status: publish ? "published" : form.status,
      published_at:
        publish && !article?.published_at
          ? new Date().toISOString()
          : article?.published_at,
    };

    const query = article
      ? supabase.from("articles").update(payload).eq("id", article.id)
      : supabase.from("articles").insert(payload);

    const { error } = await query;
    setSaving(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/admin/blog");
    router.refresh();
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="uppr-card">
        <div className="uppr-card-inner space-y-5">
          <Field label="Titlu">
            <input
              className="uppr-input"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
            />
          </Field>

          <Field label="Slug (URL)">
            <input
              className="uppr-input"
              value={form.slug}
              onChange={(e) => update("slug", e.target.value)}
              placeholder="ex: ghid-abandoned-cart"
            />
          </Field>

          <Field label="Conținut">
            <textarea
              className="uppr-input min-h-[280px] font-mono text-[13px]"
              value={form.content}
              onChange={(e) => update("content", e.target.value)}
            />
          </Field>
        </div>
      </div>

      <div className="uppr-card">
        <div className="uppr-card-inner space-y-5">
          <span className="uppr-label" style={{ color: "var(--uppr-violet-3)" }}>
            Setări SEO
          </span>

          <Field label="Meta title">
            <input
              className="uppr-input"
              value={form.meta_title}
              onChange={(e) => update("meta_title", e.target.value)}
            />
          </Field>

          <Field label="Meta description">
            <textarea
              className="uppr-input"
              value={form.meta_description}
              onChange={(e) => update("meta_description", e.target.value)}
            />
          </Field>

          <Field label="OG image URL">
            <input
              className="uppr-input"
              value={form.og_image}
              onChange={(e) => update("og_image", e.target.value)}
            />
          </Field>
        </div>
      </div>

      {error && (
        <p className="text-sm" style={{ color: "var(--uppr-pink)" }}>
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          onClick={() => handleSave(false)}
          disabled={saving}
          className="uppr-btn-secondary"
        >
          Salvează ciornă
        </button>
        <button
          onClick={() => handleSave(true)}
          disabled={saving}
          className="uppr-btn-primary"
        >
          Publică →
        </button>
      </div>
    </div>
  );
}
