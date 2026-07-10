import Link from "next/link";

export default function AdminHome() {
  return (
    <div className="space-y-6">
      <div>
        <span className="uppr-label" style={{ color: "#A855F7" }}>
          [ PANOU ADMINISTRATOR ]
        </span>
        <h1
          className="mt-3"
          style={{
            fontFamily: "var(--font-heading), sans-serif",
            fontWeight: 700,
            fontSize: "clamp(24px, 3.5vw, 34px)",
            letterSpacing: "-.02em",
          }}
        >
          Ce vrei să gestionezi?
        </h1>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Link href="/admin/blog" className="uppr-card block">
          <div className="uppr-card-inner space-y-2">
            <span className="uppr-label" style={{ color: "var(--uppr-violet-3)" }}>
              Content
            </span>
            <h2 style={{ fontFamily: "var(--font-heading), sans-serif", fontWeight: 600, fontSize: "20px" }}>
              Articole blog + SEO
            </h2>
            <p className="text-sm" style={{ color: "var(--uppr-muted)" }}>
              Creezi, editezi și publici articole cu titlu, meta description și imagine OG.
            </p>
          </div>
        </Link>

        <Link href="/admin/clients" className="uppr-card block">
          <div className="uppr-card-inner space-y-2">
            <span className="uppr-label" style={{ color: "var(--uppr-violet-3)" }}>
              Rapoarte
            </span>
            <h2 style={{ fontFamily: "var(--font-heading), sans-serif", fontWeight: 600, fontSize: "20px" }}>
              Rapoarte lunare clienți
            </h2>
            <p className="text-sm" style={{ color: "var(--uppr-muted)" }}>
              Introduci statisticile lunare de campanie pentru fiecare client.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
