import Link from "next/link";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SiteBackground from "@/components/site/SiteBackground";

export default function NotFound() {
  return (
    <div style={{ position: "relative" }}>
      <SiteBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />
        <main
          style={{
            maxWidth: 600,
            margin: "0 auto",
            padding: "clamp(140px,20vw,200px) clamp(18px,5vw,28px) clamp(100px,15vw,160px)",
            textAlign: "center",
          }}
        >
          <div
            className="grad-text"
            style={{
              fontFamily: "var(--font-heading), sans-serif",
              fontWeight: 700,
              fontSize: "clamp(64px,12vw,110px)",
              letterSpacing: "-.03em",
              lineHeight: 1,
            }}
          >
            404
          </div>
          <h1
            style={{
              margin: "16px 0 14px",
              fontFamily: "var(--font-heading), sans-serif",
              fontWeight: 700,
              fontSize: "clamp(22px,3.5vw,30px)",
              letterSpacing: "-.02em",
            }}
          >
            Pagina asta a plecat undeva fără să lase un flow de win-back.
          </h1>
          <p style={{ margin: "0 0 32px", fontSize: 15.5, color: "#A29DB8" }}>
            Link greșit, sau conținutul nu mai există. Se mai întâmplă, chiar și cu retenția bine construită.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/" className="uppr-btn-primary" style={{ textDecoration: "none" }}>
              Înapoi acasă →
            </Link>
            <Link href="/blog" className="uppr-btn-secondary" style={{ textDecoration: "none" }}>
              Vezi blogul
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
