import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const { reportId } = await request.json();
  if (!reportId) {
    return NextResponse.json({ error: "reportId lipsă" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Neautentificat" }, { status: 401 });

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") return NextResponse.json({ error: "Interzis" }, { status: 403 });

  const { data: source } = await supabase
    .from("campaign_reports")
    .select("*, newsletters(title)")
    .eq("id", reportId)
    .single();

  if (!source) return NextResponse.json({ error: "Raport negăsit" }, { status: 404 });

  const nextMonth = source.month === 12 ? 1 : source.month + 1;
  const nextYear = source.month === 12 ? source.year + 1 : source.year;

  const { data: newReport, error: insertError } = await supabase
    .from("campaign_reports")
    .insert({
      client_id: source.client_id,
      month: nextMonth,
      year: nextYear,
      ecom_sent_emails: 0,
      ecom_clicks: 0,
      ecom_conversion_rate: 0,
      ecom_transactions: 0,
      ecom_revenue: 0,
      status: "draft",
    })
    .select()
    .single();

  if (insertError || !newReport) {
    return NextResponse.json({ error: insertError?.message ?? "Eroare la creare" }, { status: 500 });
  }

  const newsletterTitles = (source.newsletters ?? []) as { title: string }[];
  if (newsletterTitles.length) {
    await supabase.from("newsletters").insert(
      newsletterTitles.map((n) => ({
        report_id: newReport.id,
        title: n.title,
        sent_emails: 0,
        unique_open_rate: 0,
        unique_click_rate: 0,
        transactions: 0,
        revenue: 0,
      }))
    );
  }

  return NextResponse.json({ id: newReport.id });
}
