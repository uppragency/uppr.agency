import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendPasswordResetEmail } from "@/lib/resend-mailer";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : null;

  if (!email) {
    return NextResponse.json({ error: "Email invalid" }, { status: 400 });
  }

  // Răspundem mereu cu succes — nu dezvăluim dacă emailul există
  const successResponse = NextResponse.json({ sent: true });

  try {
    const admin = createAdminClient();

    // Găsim clientul în DB ca să avem companyName pentru template
    const { data: users } = await admin.auth.admin.listUsers();
    const user = users?.users?.find((u) => u.email === email);

    if (!user) return successResponse; // email inexistent — răspundem tot cu succes

    const { data: profile } = await admin
      .from("profiles")
      .select("client_id")
      .eq("id", user.id)
      .single();

    let companyName = "UPPR";
    if (profile?.client_id) {
      const { data: client } = await admin
        .from("clients")
        .select("name")
        .eq("id", profile.client_id)
        .single();
      if (client?.name) companyName = client.name;
    }

    // Generăm link-ul de recovery din Supabase
    const { data: linkData, error: linkError } = await admin.auth.admin.generateLink({
      type: "recovery",
      email,
      options: { redirectTo: "https://www.uppr.agency/reset-password" },
    });

    if (linkError || !linkData?.properties?.action_link) {
      console.error("[forgot-password] generateLink error:", linkError?.message);
      return successResponse;
    }

    await sendPasswordResetEmail({
      to: email,
      companyName,
      resetUrl: linkData.properties.action_link,
    });
  } catch (err) {
    console.error("[forgot-password] unexpected error:", err);
  }

  return successResponse;
}
