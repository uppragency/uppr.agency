import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendPasswordChangedEmail } from "@/lib/resend-mailer";

export async function POST() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user?.email) {
      return NextResponse.json({ error: "Neautentificat" }, { status: 401 });
    }

    const admin = createAdminClient();
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

    await sendPasswordChangedEmail({ to: user.email, companyName });

    return NextResponse.json({ sent: true });
  } catch (err) {
    console.error("[password-changed-notify]", err);
    return NextResponse.json({ error: "Eroare internă" }, { status: 500 });
  }
}
