import type { Metadata } from "next";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SiteBackground from "@/components/site/SiteBackground";

export const metadata: Metadata = {
  title: "Privacy Policy | UPPR Agency",
  description: "How UPPRMARKETING SRL collects, uses, and protects your data.",
};

const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;
const heading = { fontFamily: "var(--font-heading), sans-serif" } as const;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 36 }}>
      <h2 style={{ margin: "0 0 12px", ...heading, fontWeight: 600, fontSize: 20, color: "#F5F3FF" }}>{title}</h2>
      <div style={{ fontSize: 14.5, lineHeight: 1.7, color: "#A29DB8" }}>{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div style={{ position: "relative" }}>
      <SiteBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />

        <header style={{ maxWidth: 760, margin: "0 auto", padding: "clamp(120px,18vw,170px) clamp(18px,5vw,28px) clamp(40px,6vw,60px)" }}>
          <span className="uppr-label" style={{ ...mono, color: "#A855F7", fontSize: 12 }}>[ LEGAL ]</span>
          <h1 style={{ margin: "16px 0 8px", ...heading, fontWeight: 700, fontSize: "clamp(28px,4.5vw,40px)", lineHeight: 1.1, letterSpacing: "-.02em" }}>
            Privacy Policy
          </h1>
          <p style={{ margin: 0, fontSize: 13.5, color: "#6E6980", ...mono }}>Last updated: July 2026</p>
        </header>

        <main style={{ maxWidth: 760, margin: "0 auto", padding: "0 clamp(18px,5vw,28px) clamp(80px,10vw,120px)" }}>
          <Section title="1. Who we are">
            <p style={{ margin: 0 }}>
              This website and the services described on it are operated by <strong style={{ color: "#F5F3FF" }}>UPPRMARKETING SRL</strong>, a company registered in Romania.
            </p>
            <p style={{ margin: "12px 0 0" }}>
              CUI: 52762670 · Nr. Reg. Com.: J2025081624004 · EUID: ROONRC.J2025081624004
            </p>
            <p style={{ margin: "12px 0 0" }}>
              Contact: <a href="mailto:office@uppr.agency" style={{ color: "#C084FC" }}>office@uppr.agency</a> · +40 790 682 363
            </p>
          </Section>

          <Section title="2. What data we collect">
            <p style={{ margin: 0 }}>Depending on how you interact with us, we may collect:</p>
            <ul style={{ margin: "12px 0 0", paddingLeft: 20 }}>
              <li><strong style={{ color: "#C4BCDC" }}>Visitor analytics data</strong> — anonymized or pseudonymized browsing behavior on this site, collected via Vercel Analytics and theMarketer&apos;s tracking script (page views, referrer, general device/browser info).</li>
              <li><strong style={{ color: "#C4BCDC" }}>Contact information</strong> you provide directly — name, email, phone number — when you book a consultation, submit a form, or email us.</li>
              <li><strong style={{ color: "#C4BCDC" }}>Client account data</strong> — for businesses we work with, we store login credentials, campaign performance data, and communication history inside the client dashboard.</li>
            </ul>
          </Section>

          <Section title="3. How we use your data">
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              <li>To respond to inquiries and deliver the consultation or services you requested.</li>
              <li>To operate and improve client dashboards and reporting.</li>
              <li>To understand aggregate site usage and improve our content and site performance.</li>
              <li>To comply with legal and accounting obligations.</li>
            </ul>
          </Section>

          <Section title="4. Legal basis for processing">
            <p style={{ margin: 0 }}>
              We process personal data under one or more of the following legal bases recognized by the GDPR: your consent, the necessity to perform a contract with you, our legitimate interest in operating and improving our services, and compliance with legal obligations.
            </p>
          </Section>

          <Section title="5. Cookies and tracking">
            <p style={{ margin: 0 }}>
              This site uses cookies and similar technologies for analytics (Vercel Analytics) and marketing automation (theMarketer). These help us understand how visitors use the site and, for existing clients, personalize their dashboard experience. You can control cookies through your browser settings at any time.
            </p>
          </Section>

          <Section title="6. Sharing your data">
            <p style={{ margin: 0 }}>
              We do not sell personal data. We share data only with service providers who process it on our behalf under data processing agreements, including our hosting provider (Vercel), our database provider (Supabase), our email marketing platform (theMarketer), and, where applicable, our email delivery provider (Resend). These providers may store data outside Romania, including in the United States, under appropriate safeguards such as Standard Contractual Clauses.
            </p>
          </Section>

          <Section title="7. Data retention">
            <p style={{ margin: 0 }}>
              We retain contact and client account data for as long as necessary to provide our services and to meet legal, accounting, or reporting obligations. You can request deletion of your data at any time, subject to any legal retention requirements.
            </p>
          </Section>

          <Section title="8. Your rights">
            <p style={{ margin: 0 }}>Under the GDPR, you have the right to:</p>
            <ul style={{ margin: "12px 0 0", paddingLeft: 20 }}>
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict certain processing</li>
              <li>Request a portable copy of your data</li>
              <li>Lodge a complaint with the Romanian National Supervisory Authority for Personal Data Processing (ANSPDCP)</li>
            </ul>
            <p style={{ margin: "12px 0 0" }}>
              To exercise any of these rights, contact us at <a href="mailto:office@uppr.agency" style={{ color: "#C084FC" }}>office@uppr.agency</a>.
            </p>
          </Section>

          <Section title="9. Security">
            <p style={{ margin: 0 }}>
              We use industry-standard security measures, including encrypted connections, access controls, and row-level data isolation between client accounts, to protect the data we hold.
            </p>
          </Section>

          <Section title="10. Changes to this policy">
            <p style={{ margin: 0 }}>
              We may update this policy from time to time. Material changes will be reflected by updating the &quot;Last updated&quot; date at the top of this page.
            </p>
          </Section>

          <Section title="11. Contact">
            <p style={{ margin: 0 }}>
              Questions about this policy or how we handle your data? Reach us at{" "}
              <a href="mailto:office@uppr.agency" style={{ color: "#C084FC" }}>office@uppr.agency</a>.
            </p>
          </Section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
