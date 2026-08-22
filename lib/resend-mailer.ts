import "server-only";

const RESEND_API = "https://api.resend.com/emails";
const FROM = process.env.RESEND_FROM_EMAIL ?? "UPPR Agency <info@uppr.agency>";

async function send(payload: Record<string, unknown>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[Resend] RESEND_API_KEY lipsă — email nesent");
    return { skipped: true };
  }

  const res = await fetch(RESEND_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM, ...payload }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Resend error (${res.status}): ${detail}`);
  }

  return res.json();
}

/** Emailul de bun venit + link setare parolă — trimis când adminul creează un client nou */
export async function sendWelcomeEmail({
  to,
  companyName,
  setupPasswordUrl,
}: {
  to: string;
  companyName: string;
  setupPasswordUrl: string;
}) {
  return send({
    to: [to],
    template_alias: "welcome-email",
    variables: {
      company_name: companyName,
      user_email: to,
      setup_password_url: setupPasswordUrl,
      current_year: new Date().getFullYear().toString(),
    },
  });
}

/** Email reset parolă — trimis când clientul cere forgot-password */
export async function sendPasswordResetEmail({
  to,
  companyName,
  resetUrl,
}: {
  to: string;
  companyName: string;
  resetUrl: string;
}) {
  return send({
    to: [to],
    template_alias: "password-reset",
    variables: {
      company_name: companyName,
      user_email: to,
      reset_password_url: resetUrl,
      current_year: new Date().getFullYear().toString(),
    },
  });
}

/** Notificare schimbare parolă reușită */
export async function sendPasswordChangedEmail({
  to,
  companyName,
}: {
  to: string;
  companyName: string;
}) {
  return send({
    to: [to],
    template_alias: "password-changed",
    variables: {
      company_name: companyName,
      user_email: to,
      dashboard_url: "https://www.uppr.agency/dashboard",
      current_year: new Date().getFullYear().toString(),
    },
  });
}

/** Notificare raport lunar publicat */
export async function sendMonthlyReportEmail({
  to,
  companyName,
  monthYear,
}: {
  to: string;
  companyName: string;
  monthYear: string;
}) {
  return send({
    to: [to],
    template_alias: "monthly-report",
    variables: {
      company_name: companyName,
      month_year: monthYear,
      dashboard_url: "https://www.uppr.agency/dashboard",
      current_year: new Date().getFullYear().toString(),
      project_name: "UPPR Agency",
    },
  });
}
