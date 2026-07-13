import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <nav
      id="lm-nav"
      style={{
        position: "fixed",
        top: "clamp(12px,3vw,22px)",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        width: "min(920px,calc(100% - 24px))",
        borderRadius: 999,
        background: "rgba(14,9,26,.55)",
        border: "1px solid rgba(168,85,247,.22)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        boxShadow: "0 8px 40px rgba(0,0,0,.35)",
        transition: "background .2s, box-shadow .2s",
      }}
    >
      <div
        style={{
          padding: "9px 10px 9px clamp(14px,3vw,20px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
          <Image src="/logo.png" width={34} height={34} alt="UPPR Agency logo" style={{ height: "auto" }} />
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Link href="/blog/" className="text-sm font-semibold" style={{ color: "#F5F3FF" }}>
            Blog
          </Link>
          <Link
            href="/login"
            className="text-sm font-semibold"
            style={{ color: "#F5F3FF" }}
          >
            Dashboard
          </Link>
          <a
            href="/#lm-form"
            style={{
              padding: "13px clamp(14px,3vw,20px)",
              minHeight: 44,
              display: "flex",
              alignItems: "center",
              borderRadius: 999,
              border: "1px solid rgba(168,85,247,.5)",
              background: "linear-gradient(135deg,rgba(124,58,237,.95),rgba(168,85,247,.95))",
              color: "#fff",
              fontWeight: 600,
              fontSize: 13.5,
              boxShadow: "0 0 20px rgba(124,58,237,.45)",
              whiteSpace: "nowrap",
              textDecoration: "none",
            }}
          >
            Book a free call
          </a>
        </div>
      </div>
    </nav>
  );
}
