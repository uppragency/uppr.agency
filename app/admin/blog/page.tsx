import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminBlogPage() {
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("id, title, slug, status, updated_at")
    .order("updated_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <span className="uppr-label" style={{ color: "#A855F7" }}>
            [ CONTENT ]
          </span>
          <h1
            className="mt-2"
            style={{
              fontFamily: "var(--font-heading), sans-serif",
              fontWeight: 700,
              fontSize: "28px",
              letterSpacing: "-.02em",
            }}
          >
            Articole blog
          </h1>
        </div>
        <Link href="/admin/blog/new" className="uppr-btn-primary">
          + Articol nou
        </Link>
      </div>

      <div className="uppr-card">
        <div className="uppr-card-inner" style={{ padding: 0 }}>
          <table className="uppr-table">
            <thead>
              <tr>
                <th>Titlu</th>
                <th>Status</th>
                <th>Actualizat</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {articles?.map((article) => (
                <tr key={article.id}>
                  <td style={{ fontWeight: 600 }}>{article.title}</td>
                  <td>
                    <span
                      className={
                        article.status === "published"
                          ? "uppr-badge uppr-badge-live"
                          : "uppr-badge uppr-badge-draft"
                      }
                    >
                      {article.status === "published" ? "Publicat" : "Ciornă"}
                    </span>
                  </td>
                  <td style={{ color: "var(--uppr-muted)" }}>
                    {new Date(article.updated_at).toLocaleDateString("ro-RO")}
                  </td>
                  <td>
                    <Link href={`/admin/blog/${article.id}`} className="text-sm font-semibold" style={{ color: "var(--uppr-violet-3)" }}>
                      Editează →
                    </Link>
                  </td>
                </tr>
              ))}
              {!articles?.length && (
                <tr>
                  <td colSpan={4} className="text-center py-10" style={{ color: "var(--uppr-muted)" }}>
                    Niciun articol încă.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
