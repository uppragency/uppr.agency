import ArticleForm from "../article-form";

export default function NewArticlePage() {
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
          Articol nou
        </h1>
      </div>
      <ArticleForm />
    </div>
  );
}
