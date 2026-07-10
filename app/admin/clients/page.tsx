import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminClientsPage() {
  const supabase = await createClient();
  const { data: clients } = await supabase
    .from("clients")
    .select("id, name, domain")
    .order("name");

  return (
    <div className="space-y-6">
      <div>
        <span className="uppr-label" style={{ color: "#A855F7" }}>
          [ RAPOARTE ]
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
          Clienți
        </h1>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {clients?.map((client) => (
          <Link key={client.id} href={`/admin/clients/${client.id}`} className="uppr-card block">
            <div className="uppr-card-inner">
              <p style={{ fontFamily: "var(--font-heading), sans-serif", fontWeight: 600, fontSize: "19px" }}>
                {client.name}
              </p>
              <p className="text-sm mt-1" style={{ color: "var(--uppr-muted)", fontFamily: "var(--font-mono-label), monospace" }}>
                {client.domain}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
