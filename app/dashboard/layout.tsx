import { getCurrentProfile } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentProfile();

  return (
    <div className="min-h-screen flex flex-col">
      <header
        className="flex items-center justify-between px-6 py-4 sticky top-0 z-10"
        style={{
          background: "rgba(5,3,9,.8)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-heading), sans-serif",
            fontWeight: 700,
            fontSize: "16px",
            letterSpacing: "-.01em",
          }}
        >
          UPPR <span className="grad-text">Rapoarte</span>
        </span>
        <div className="flex items-center gap-4">
          <span className="text-sm" style={{ color: "var(--uppr-muted)" }}>
            {profile?.email}
          </span>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="uppr-btn-secondary"
              style={{ padding: "8px 16px", fontSize: "13px", minHeight: "auto" }}
            >
              Deconectare
            </button>
          </form>
        </div>
      </header>
      <main className="flex-1 p-6 md:p-8 max-w-4xl w-full mx-auto">{children}</main>
    </div>
  );
}
