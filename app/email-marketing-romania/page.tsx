import type { Metadata } from "next";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SiteBackground from "@/components/site/SiteBackground";

export const metadata: Metadata = {
  title: "Agenție de Email Marketing în România | UPPR Agency",
  description:
    "Servicii de email marketing pentru afaceri din România — de la trimiterea de campanii și administrarea platformei, până la automatizări complexe de retenție. UPPRMARKETING SRL.",
};

const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;
const heading = { fontFamily: "var(--font-heading), sans-serif" } as const;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="uppr-label" style={{ ...mono, color: "#A855F7", fontSize: 12 }}>
      [ {children} ]
    </span>
  );
}

const SERVICII = [
  {
    icon: "✉",
    title: "Trimitere de campanii",
    desc: "Newsletter-e scrise, proiectate și trimise pentru tine, pe un calendar fix — segmentare simplă, teste A/B pe subiect și ora de trimitere.",
  },
  {
    icon: "⚙",
    title: "Administrare platformă",
    desc: "Nu ai timp să te ocupi zilnic de TheMarketer? Preluăm complet gestionarea platformei — liste, segmente, integrări, mentenanță.",
  },
  {
    icon: "✎",
    title: "Design & Copy",
    desc: "Template-uri responsive, testate pe toate device-urile, cu un ton de brand consistent — nu doar text aruncat într-un template generic.",
  },
  {
    icon: "✦",
    title: "Automatizări de retenție",
    desc: "Pentru afacerile pregătite pentru nivelul următor: flow-uri de welcome, coș abandonat, win-back — construite o dată, generează venit continuu.",
  },
];

const FAQ = [
  {
    q: "Lucrați doar cu magazine online?",
    a: "Nu. Lucrăm cu orice afacere din România care are o listă de clienți și un ciclu de cumpărare repetat — retail, servicii, SaaS. Nu contează dacă vinzi produse fizice sau servicii.",
  },
  {
    q: "Trebuie să am deja cont pe TheMarketer?",
    a: "Nu. Configurarea și migrarea datelor fac parte din procesul de onboarding. Dacă folosești altă platformă acum, discutăm tranziția la consultația gratuită.",
  },
  {
    q: "Cât costă un serviciu de email marketing în România?",
    a: "Depinde de scop — de la administrarea simplă a unui calendar de campanii, până la automatizări complexe de retenție. Prețul se stabilește după consultația gratuită de 15 minute, pe baza mărimii listei și a obiectivelor tale.",
  },
  {
    q: "Pot să încep doar cu trimiterea de campanii, fără automatizări?",
    a: "Da. Mulți clienți încep exact așa — vor doar newsletter-e trimise constant și bine scrise. Automatizările vin ulterior, dacă și când are sens pentru afacerea ta.",
  },
  {
    q: "Cât durează până văd rezultate?",
    a: "Pentru campanii simple, rezultatele apar din prima lună. Pentru automatizări complete, de obicei 2-3 săptămâni până sunt live, apoi 60-90 de zile până se recuperează investiția inițială.",
  },
];

export default function EmailMarketingRomaniaPage() {
  return (
    <div style={{ position: "relative" }}>
      <SiteBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />

        <header style={{ maxWidth: 820, margin: "0 auto", padding: "clamp(120px,18vw,170px) clamp(18px,5vw,28px) clamp(50px,7vw,70px)", textAlign: "center" }}>
          <div className="uppr-pill" style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#D6C6FA", ...mono }}>ROMÂNIA</span>
          </div>
          <h1 style={{ margin: "0 0 16px", ...heading, fontWeight: 700, fontSize: "clamp(30px,5.5vw,48px)", lineHeight: 1.12, letterSpacing: "-.02em" }}>
            Agenție de email marketing <span className="grad-text">din România, pentru afaceri din România</span>.
          </h1>
          <p style={{ margin: 0, fontSize: "clamp(15px,2vw,17px)", lineHeight: 1.6, color: "#A29DB8" }}>
            De la trimiterea săptămânală de campanii, până la automatizări complete de retenție — fără agenție generalistă, fără bariere de fus orar sau limbă.
          </p>
        </header>

        {/* SERVICII */}
        <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(18px,5vw,28px) clamp(60px,9vw,90px)" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <SectionLabel>CE FACEM</SectionLabel>
            <h2 style={{ margin: "16px 0 0", ...heading, fontWeight: 700, fontSize: "clamp(24px,4vw,34px)", lineHeight: 1.15, letterSpacing: "-.02em" }}>
              De la simplu la complex, fără să sară peste pași.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(260px,100%),1fr))", gap: 18 }}>
            {SERVICII.map((s) => (
              <div key={s.title} className="uppr-card">
                <div className="uppr-card-inner" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <span style={{ fontSize: 24 }}>{s.icon}</span>
                  <h3 style={{ margin: 0, ...heading, fontWeight: 600, fontSize: 17 }}>{s.title}</h3>
                  <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: "#A29DB8" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DE CE LOCAL */}
        <section style={{ maxWidth: 800, margin: "0 auto", padding: "0 clamp(18px,5vw,28px) clamp(60px,9vw,90px)" }}>
          <div
            style={{
              borderRadius: 20,
              padding: "clamp(28px,5vw,40px)",
              background: "linear-gradient(165deg,#150E22,#0B0817)",
              border: "1px solid rgba(255,255,255,.08)",
            }}
          >
            <SectionLabel>DE CE O AGENȚIE LOCALĂ</SectionLabel>
            <h2 style={{ margin: "16px 0 16px", ...heading, fontWeight: 700, fontSize: "clamp(22px,3.5vw,30px)", lineHeight: 1.2, letterSpacing: "-.02em" }}>
              Același fus orar, aceeași limbă, aceeași piață.
            </h2>
            <p style={{ margin: "0 0 16px", fontSize: 14.5, lineHeight: 1.65, color: "#A29DB8" }}>
              O agenție internațională nu cunoaște obiceiurile de cumpărare din România, sărbătorile locale, sau tonul care rezonează cu un client român. Comunici direct, în română, fără decalaj de fus orar sau bariere culturale în copy.
            </p>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.65, color: "#A29DB8" }}>
              Suntem <strong style={{ color: "#F5F3FF" }}>UPPRMARKETING SRL</strong>, companie înregistrată în România (CUI 52762670), Partener Certificat TheMarketer.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ maxWidth: 800, margin: "0 auto", padding: "0 clamp(18px,5vw,28px) clamp(60px,9vw,90px)" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <SectionLabel>ÎNTREBĂRI FRECVENTE</SectionLabel>
            <h2 style={{ margin: "16px 0 0", ...heading, fontWeight: 700, fontSize: "clamp(24px,4vw,34px)", lineHeight: 1.15, letterSpacing: "-.02em" }}>
              Ce te întreabă majoritatea, înainte să apeleze.
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {FAQ.map((f) => (
              <div key={f.q} className="uppr-card">
                <details className="uppr-card-inner" style={{ padding: "18px 22px" }}>
                  <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: 15, color: "#F5F3FF", listStyle: "none" }}>{f.q}</summary>
                  <p style={{ margin: "12px 0 0", fontSize: 14, lineHeight: 1.6, color: "#A29DB8" }}>{f.a}</p>
                </details>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ maxWidth: 700, margin: "0 auto", padding: "0 clamp(18px,5vw,28px) clamp(80px,10vw,120px)", textAlign: "center" }}>
          <h2 style={{ margin: "0 0 14px", ...heading, fontWeight: 700, fontSize: "clamp(24px,4vw,36px)", lineHeight: 1.15, letterSpacing: "-.02em" }}>
            O discuție de 15 minute, fără presiune.
          </h2>
          <p style={{ margin: "0 0 28px", fontSize: 15, color: "#A29DB8" }}>
            Vedem exact unde pierzi venit și ce ar avea sens pentru afacerea ta — simplu sau complex.
          </p>
          <a href="/#lm-form" className="uppr-btn-primary" style={{ padding: "16px 28px", fontSize: 15.5, textDecoration: "none", display: "inline-block" }}>
            Programează o consultație gratuită →
          </a>
        </section>

        <Footer />
      </div>
    </div>
  );
}
