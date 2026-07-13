import type { Metadata } from "next";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SiteBackground from "@/components/site/SiteBackground";

export const metadata: Metadata = {
  title: "Terms of Service | UPPR Agency",
  description: "The terms that govern use of UPPR Agency's website and services.",
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

export default function TermsPage() {
  return (
    <div style={{ position: "relative" }}>
      <SiteBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />

        <header style={{ maxWidth: 760, margin: "0 auto", padding: "clamp(120px,18vw,170px) clamp(18px,5vw,28px) clamp(40px,6vw,60px)" }}>
          <span className="uppr-label" style={{ ...mono, color: "#A855F7", fontSize: 12 }}>[ LEGAL ]</span>
          <h1 style={{ margin: "16px 0 8px", ...heading, fontWeight: 700, fontSize: "clamp(28px,4.5vw,40px)", lineHeight: 1.1, letterSpacing: "-.02em" }}>
            Terms of Service
          </h1>
          <p style={{ margin: 0, fontSize: 13.5, color: "#6E6980", ...mono }}>Last updated: July 2026</p>
        </header>

        <main style={{ maxWidth: 760, margin: "0 auto", padding: "0 clamp(18px,5vw,28px) clamp(80px,10vw,120px)" }}>
          <Section title="1. Who these terms apply to">
            <p style={{ margin: 0 }}>
              These Terms of Service govern your use of this website and the services offered by <strong style={{ color: "#F5F3FF" }}>UPPRMARKETING SRL</strong> (&quot;UPPR&quot;, &quot;we&quot;, &quot;us&quot;), a company registered in Romania (CUI 52762670, Nr. Reg. Com. J2025081624004, EUID ROONRC.J2025081624004). By using this site or engaging our services, you agree to these terms.
            </p>
          </Section>

          <Section title="2. Our services">
            <p style={{ margin: 0 }}>
              UPPR provides email and SMS retention marketing services, including setup and integration, automated flow design, campaign management, and reporting, built on theMarketer platform. The exact scope of services for each client is agreed separately, typically following a free consultation.
            </p>
          </Section>

          <Section title="3. Client accounts and dashboard">
            <p style={{ margin: 0 }}>
              Clients receive access to a private reporting dashboard. You are responsible for keeping your login credentials confidential. If you suspect unauthorized access to your account, contact us immediately at{" "}
              <a href="mailto:office@uppr.agency" style={{ color: "#C084FC" }}>office@uppr.agency</a>.
            </p>
          </Section>

          <Section title="4. Fees and payment">
            <p style={{ margin: 0 }}>
              Fees for our services are agreed individually with each client prior to engagement and set out in a separate proposal or agreement. Unless stated otherwise, invoices are due under the payment terms specified in that agreement.
            </p>
          </Section>

          <Section title="5. Client responsibilities">
            <p style={{ margin: 0 }}>
              You are responsible for the accuracy of the data you provide us (product catalog, customer list, brand assets), for holding any necessary consents from your own customers to be contacted, and for complying with applicable marketing and data protection laws in your own jurisdiction.
            </p>
          </Section>

          <Section title="6. Intellectual property">
            <p style={{ margin: 0 }}>
              Templates, flows, and creative assets built specifically for your account belong to you once paid in full. UPPR retains ownership of its general methodologies, internal tools, and any pre-existing materials used to deliver the service.
            </p>
          </Section>

          <Section title="7. Confidentiality">
            <p style={{ margin: 0 }}>
              Both parties agree to keep confidential any non-public business information shared during the engagement, and to use it only for the purpose of delivering or receiving the services.
            </p>
          </Section>

          <Section title="8. No lock-in">
            <p style={{ margin: 0 }}>
              Your list, templates, and theMarketer account remain yours. Either party may end the engagement per the terms agreed in your service proposal; there is no long-term contract that prevents you from leaving.
            </p>
          </Section>

          <Section title="9. Limitation of liability">
            <p style={{ margin: 0 }}>
              UPPR delivers services with reasonable skill and care but does not guarantee specific revenue, open rate, or conversion outcomes, as these depend on factors outside our control (your list quality, market conditions, product-market fit). To the extent permitted by Romanian law, our liability for any claim is limited to the fees paid for the service giving rise to the claim in the preceding 3 months.
            </p>
          </Section>

          <Section title="10. Termination">
            <p style={{ margin: 0 }}>
              Either party may terminate the engagement in accordance with the notice period agreed in the relevant service proposal. Upon termination, we will provide reasonable assistance in transitioning your account and data.
            </p>
          </Section>

          <Section title="11. Governing law">
            <p style={{ margin: 0 }}>
              These terms are governed by the laws of Romania. Any disputes will be subject to the exclusive jurisdiction of the Romanian courts.
            </p>
          </Section>

          <Section title="12. Changes to these terms">
            <p style={{ margin: 0 }}>
              We may update these terms from time to time. Material changes will be reflected by updating the &quot;Last updated&quot; date at the top of this page.
            </p>
          </Section>

          <Section title="13. Contact">
            <p style={{ margin: 0 }}>
              Questions about these terms? Reach us at{" "}
              <a href="mailto:office@uppr.agency" style={{ color: "#C084FC" }}>office@uppr.agency</a>.
            </p>
          </Section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
