import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ArticleForm from "../article-form";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  if (!article) notFound();

  return (
    <div className="space-y-6">
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
          Editează articol
        </h1>
      </div>
      <ArticleForm article={article} />
    </div>
  );
}
