import type { Metadata } from "next";
import Image from "next/image";
import SiteBackground from "@/components/site/SiteBackground";

export const metadata: Metadata = {
  title: "Revenim imediat | UPPR Agency",
};

export default function MaintenancePage() {
  return (
    <div style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <SiteBackground />
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 24px", maxWidth: 480 }}>
        <Image src="/logo.png" width={48} height={48} alt="UPPR Agency" style={{ margin: "0 auto 28px", height: "auto" }} />
        <h1
          style={{
            fontFamily: "var(--font-heading), sans-serif",
            fontWeight: 700,
            fontSize: "clamp(26px,4.5vw,36px)",
            letterSpacing: "-.02em",
            margin: "0 0 14px",
          }}
        >
          Revenim <span className="grad-text">imediat</span>.
        </h1>
        <p style={{ fontSize: 15.5, color: "#A29DB8", margin: 0 }}>
          Facem mentenanță planificată. Site-ul e din nou disponibil în scurt timp.
        </p>
      </div>
    </div>
  );
}
