import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendWelcomeEmail } from "@/lib/resend-mailer";

export async function POST(request: Request) {
  // Verifică că requestul vine de la un admin autentificat
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Neautorizat" }, { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (profile?.role !== "admin") {
    return NextResponse.json({ error: "Neautorizat" }, { status: 403 });
  }

  const body = await request.json().catch(() => ({}));
  const { email, name, domain } = body;

  if (!email || !name) {
    return NextResponse.json({ error: "Email și nume obligatorii" }, { status: 400 });
  }

  const admin = createAdminClient();

  // 1. Creăm clientul în tabela clients
  const { data: newClient, error: clientError } = await admin
    .from("clients")
    .insert({ name, domain: domain ?? "" })
    .select("id, name")
    .single();

  if (clientError || !newClient) {
    return NextResponse.json({ error: clientError?.message ?? "Eroare creare client" }, { status: 500 });
  }

  // 2. Generăm invite link — trimite email prin Supabase/Resend cu link de setare parolă
  const { data: linkData, error: linkError } = await admin.auth.admin.generateLink({
    type: "invite",
    email: email.trim().toLowerCase(),
    options: { redirectTo: "https://www.uppr.agency/set-password" },
  });

  if (linkError || !linkData?.user) {
    // Dacă userul există deja, continuăm cu recuperarea lui
    const { data: existingUser } = await admin.auth.admin.listUsers();
    const found = existingUser?.users?.find((u) => u.email === email);
    if (!found) {
      return NextResponse.json({ error: linkError?.message ?? "Eroare creare cont" }, { status: 500 });
    }

    // Legăm profilul cu clientul
    await admin.from("profiles").upsert({
      id: found.id,
      role: "client",
      client_id: newClient.id,
    });

    return NextResponse.json({ clientId: newClient.id, userId: found.id, emailSent: false });
  }

  // 3. Creăm profilul cu rol client
  await admin.from("profiles").upsert({
    id: linkData.user.id,
    role: "client",
    client_id: newClient.id,
  });

  // 4. Trimitem welcome email cu template-ul nostru din Resend
  let emailSent = false;
  if (linkData.properties?.action_link) {
    try {
      await sendWelcomeEmail({
        to: email,
        companyName: newClient.name,
        setupPasswordUrl: linkData.properties.action_link,
      });
      emailSent = true;
    } catch (mailErr) {
      console.error("[create-client] welcome email error:", mailErr);
    }
  }

  return NextResponse.json({
    clientId: newClient.id,
    userId: linkData.user.id,
    emailSent,
  });
}
