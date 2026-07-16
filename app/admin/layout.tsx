import Link from "next/link";
import { getCurrentProfile } from "@/lib/auth";
import SiteBackground from "@/components/site/SiteBackground";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentProfile();

  return (
    <div className="min-h-screen flex flex-col relative">
      <SiteBackground />
      <header
        className="flex items-center justify-between px-6 py-4 sticky top-0 z-10"
        style={{
          background: "rgba(5,3,9,.8)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <nav className="flex items-center gap-6">
          <span
            style={{
              fontFamily: "var(--font-heading), sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              letterSpacing: "-.01em",
            }}
          >
            UPPR <span className="grad-text">Admin</span>
          </span>
          <Link href="/" className="text-sm font-medium" style={{ color: "var(--uppr-muted)" }}>
            ← Întoarce-te
          </Link>
          <Link href="/admin/blog" className="text-sm font-medium" style={{ color: "var(--uppr-fg)" }}>
            Blog
          </Link>
          <Link href="/admin/clients" className="text-sm font-medium" style={{ color: "var(--uppr-fg)" }}>
            Clienți
          </Link>
          <Link href="/admin/infra" className="text-sm font-medium" style={{ color: "var(--uppr-fg)" }}>
            Infra
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <span className="text-sm" style={{ color: "var(--uppr-muted)" }}>
            {profile?.email}
          </span>
          <form action="/auth/signout" method="post">
            <button type="submit" className="uppr-btn-secondary" style={{ padding: "8px 16px", fontSize: "13px", minHeight: "auto" }}>
              Deconectare
            </button>
          </form>
        </div>
      </header>
      <main className="relative z-[1] flex-1 p-6 md:p-8 max-w-6xl w-full mx-auto">{children}</main>
    </div>
  );
}
