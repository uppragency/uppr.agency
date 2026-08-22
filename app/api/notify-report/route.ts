import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendMonthlyReportEmail } from "@/lib/resend-mailer";

const LUNI = [
  "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
  "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie",
];

export async function POST(request: Request) {
  const { reportId } = await request.json();
  if (!reportId) {
    return NextResponse.json({ error: "reportId lipsă" }, { status: 400 });
  }

  // Doar un admin autentificat poate declanșa o notificare
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Neautentificat" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return NextResponse.json({ error: "Interzis" }, { status: 403 });
  }

  if (!process.env.RESEND_API_KEY) {
    // Notificarea email e opțională — dacă nu e configurată cheia, raportul
    // tot se publică normal, doar nu se trimite email.
    return NextResponse.json({ skipped: "RESEND_API_KEY neconfigurată" });
  }

  const admin = createAdminClient();

  const { data: report } = await admin
    .from("campaign_reports")
    .select("id, month, year, client_id, clients(name)")
    .eq("id", reportId)
    .single();

  if (!report) {
    return NextResponse.json({ error: "Raport negăsit" }, { status: 404 });
  }

  const { data: clientProfile } = await admin
    .from("profiles")
    .select("id")
    .eq("client_id", report.client_id)
    .eq("role", "client")
    .maybeSingle();

  if (!clientProfile) {
    return NextResponse.json({ skipped: "Niciun cont de client asociat" });
  }

  const { data: userData } = await admin.auth.admin.getUserById(clientProfile.id);
  const clientEmail = userData?.user?.email;

  if (!clientEmail) {
    return NextResponse.json({ skipped: "Email client indisponibil" });
  }

  const clientName = (report.clients as unknown as { name: string } | null)?.name ?? "";
  const monthLabel = `${LUNI[report.month - 1]} ${report.year}`;

  try {
    await sendMonthlyReportEmail({
      to: clientEmail,
      companyName: clientName,
      monthYear: monthLabel,
    });
    return NextResponse.json({ sent: true });
  } catch (err) {
    console.error("Resend send error:", err);
    return NextResponse.json({ error: "Trimitere email eșuată" }, { status: 502 });
  }
}
