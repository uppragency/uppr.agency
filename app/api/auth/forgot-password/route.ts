import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email invalid" }, { status: 400 });
  }

  const admin = createAdminClient();

  // generateLink trimite resetul prin Supabase — emailul ajunge via Resend
  // (configurat prin integrarea Supabase + Resend din dashboard)
  const { error } = await admin.auth.admin.generateLink({
    type: "recovery",
    email: email.toLowerCase().trim(),
    options: {
      redirectTo: "https://www.uppr.agency/reset-password",
    },
  });

  if (error) {
    console.error("Forgot password error:", error.message);
  }

  // Răspundem mereu cu succes, indiferent dacă emailul există sau nu
  // (previne enumerarea de conturi)
  return NextResponse.json({ sent: true });
}
