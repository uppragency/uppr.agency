import type { Metadata } from "next";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SiteBackground from "@/components/site/SiteBackground";

export const metadata: Metadata = {
  title: "Contact | UPPR Agency",
  description: "Get in touch with UPPR Agency — email, phone, or book a free 15-minute consultation.",
};

const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;
const heading = { fontFamily: "var(--font-heading), sans-serif" } as const;

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: string;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} className="uppr-card block">
      <div className="uppr-card-inner" style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ fontSize: 26 }}>{icon}</span>
        <div>
          <div style={{ fontSize: 12, color: "#6E6980", ...mono, textTransform: "uppercase", letterSpacing: ".04em" }}>{label}</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#F5F3FF", marginTop: 2 }}>{value}</div>
        </div>
      </div>
    </a>
  );
}

export default function ContactPage() {
  return (
    <div style={{ position: "relative" }}>
      <SiteBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />

        <main style={{ maxWidth: 640, margin: "0 auto", padding: "clamp(120px,18vw,170px) clamp(18px,5vw,28px) clamp(100px,15vw,140px)" }}>
          <div className="uppr-pill" style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#D6C6FA", ...mono }}>GET IN TOUCH</span>
          </div>
          <h1 style={{ margin: "0 0 14px", ...heading, fontWeight: 700, fontSize: "clamp(30px,5vw,44px)", lineHeight: 1.1, letterSpacing: "-.02em" }}>
            Let&apos;s talk.
          </h1>
          <p style={{ margin: "0 0 40px", fontSize: 15.5, lineHeight: 1.6, color: "#A29DB8" }}>
            Fastest way in is a free 15-minute consultation. If you&apos;d rather write first, email or WhatsApp works too.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 40 }}>
            <ContactCard icon="📧" label="Email" value="office@uppr.agency" href="mailto:office@uppr.agency" />
            <ContactCard icon="💬" label="WhatsApp / Phone" value="+40 790 682 363" href="https://wa.me/40790682363" />
          </div>

          <a href="/#lm-form" className="uppr-btn-primary" style={{ padding: "16px 28px", fontSize: 15.5, textDecoration: "none", display: "inline-block" }}>
            Book a free 15-minute consultation →
          </a>
        </main>

        <Footer />
      </div>
    </div>
  );
}
