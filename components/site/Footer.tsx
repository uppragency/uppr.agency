import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,.07)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(40px,7vw,56px) clamp(18px,5vw,28px) clamp(28px,5vw,40px)" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 32,
            paddingBottom: 34,
            borderBottom: "1px solid rgba(255,255,255,.07)",
          }}
        >
          <div style={{ maxWidth: 320 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <Link href="/">
                <Image src="/logo.png" width={64} height={64} alt="UPPR Agency logo" style={{ height: "auto" }} />
              </Link>
            </div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "#8B84A0" }}>
              Email &amp; SMS retention, engineered and managed on{" "}
              <a href="https://api.themarketer.com/invite/upprmarketing" target="_blank" style={{ color: "inherit" }}>
                TheMarketer
              </a>{" "}
              for e-commerce brands that want to own their revenue.
            </p>
            <p>
              <a href="https://api.themarketer.com/invite/upprmarketing">
                <Image
                  src="/certified-partner-email-signature.png"
                  alt="Certified theMarketer Partner Course"
                  width={220}
                  height={64}
                  style={{ width: "70%", height: "auto" }}
                />
              </a>
            </p>
          </div>

          <div style={{ display: "flex", gap: "clamp(28px,5vw,52px)", flexWrap: "wrap" }}>
            <div>
              <div className="uppr-label" style={{ color: "#6E6980", marginBottom: 14 }}>
                Agency
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11, fontSize: 14, color: "#B8B2CC" }}>
                <a href="/#lm-services" style={{ color: "inherit" }}>Services</a>
                <a href="/#lm-results" style={{ color: "inherit" }}>Results</a>
                <a href="/#lm-problem" style={{ color: "inherit" }}>Why retention</a>
                <Link href="/contact" style={{ color: "inherit" }}>Contact</Link>
              </div>
            </div>
            <div>
              <div className="uppr-label" style={{ color: "#6E6980", marginBottom: 14 }}>
                Tools
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11, fontSize: 14, color: "#B8B2CC" }}>
                <Link href="/blog/" style={{ color: "inherit" }}>Blog</Link>
                <Link href="/glossary" style={{ color: "inherit" }}>Glossary</Link>
                <Link href="/subject-line-grader/" style={{ color: "inherit" }}>Subject Line Grader</Link>
                <Link href="/referral-program/" style={{ color: "inherit" }}>Referral Program</Link>
                <Link href="/resources" style={{ color: "inherit" }}>Resources</Link>
              </div>
            </div>
            <div>
              <div className="uppr-label" style={{ color: "#6E6980", marginBottom: 14 }}>
                Get started
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11, fontSize: 14, color: "#B8B2CC" }}>
                <a
                  href="/#lm-form"
                  style={{ color: "inherit" }}
                >
                  Book a free 15-minute consultation
                </a>
                <a href="mailto:office@uppr.agency" style={{ color: "inherit" }}>
                  office@uppr.agency
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
            paddingTop: 22,
            fontSize: 13,
            color: "#6E6980",
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "var(--font-mono-label), monospace" }}>© 2026 UPPR Agency</span>
            <Link href="/privacy" style={{ color: "inherit" }}>Privacy</Link>
            <Link href="/terms" style={{ color: "inherit" }}>Terms</Link>
            <Link href="/status" style={{ color: "inherit" }}>Status</Link>
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <a href="https://api.themarketer.com/invite/upprmarketing" target="_blank" style={{ color: "inherit" }}>
              TheMarketer
            </a>{" "}
            Certified Partner
          </span>
        </div>
      </div>
    </footer>
  );
}
