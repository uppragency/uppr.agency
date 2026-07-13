import type { Metadata } from "next";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SiteBackground from "@/components/site/SiteBackground";
import SubjectLineGraderTool from "@/components/site/SubjectLineGraderTool";

export const metadata: Metadata = {
  title: "Subject Line Grader — Free Tool | UPPR Agency",
  description: "Paste a subject line, get an instant score. Everything runs in your browser — nothing is sent anywhere.",
};

export default function SubjectLineGraderPage() {
  return (
    <div style={{ position: "relative" }}>
      <SiteBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />

        <header style={{ maxWidth: 760, margin: "0 auto", padding: "clamp(120px,18vw,170px) clamp(18px,5vw,28px) 0", textAlign: "center" }}>
          <div style={{ animation: "riseIn .8s cubic-bezier(.2,.8,.2,1) both" }}>
            <div className="uppr-pill" style={{ marginBottom: 20 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#D6C6FA", fontFamily: "var(--font-mono-label), monospace" }}>FREE TOOL</span>
            </div>
            <h1 style={{ margin: "0 0 14px", fontFamily: "var(--font-heading), sans-serif", fontWeight: 700, fontSize: "clamp(30px,5vw,46px)", lineHeight: 1.15, letterSpacing: "-.02em" }}>
              Subject Line <span className="grad-text">Grader</span>
            </h1>
            <p style={{ margin: "0 auto", fontSize: "clamp(15.5px,2vw,17px)", lineHeight: 1.55, color: "#A29DB8", maxWidth: 520 }}>
              Paste a subject line, get an instant score. Everything runs in your browser — nothing is sent anywhere.
            </p>
          </div>
        </header>

        <main>
          <SubjectLineGraderTool />
        </main>

        <article
          className="post"
          style={{ maxWidth: 680, margin: "0 auto", padding: "clamp(60px,8vw,90px) clamp(18px,5vw,28px) 40px" }}
        >
          <h2>How the score works</h2>
          <p>The grader checks your subject line against the same fundamentals that affect real inbox performance: whether it fits on a mobile screen, whether it trips common spam filters, and whether it reads like it was written for a person or a bot. It is a diagnostic, not a promise. No tool can predict your actual open rate, since that depends on your list, sender reputation, and audience, not the subject line text alone.</p>
          <p>It works in both English and Romanian. The tool detects which language you&apos;re writing in automatically, based on diacritics and common words, and switches its spam-word list and personalization check accordingly. If it guesses wrong, or you&apos;re testing a subject line with mixed language, use the language buttons above the input to force it.</p>

          <table>
            <tbody>
              <tr><th>Check</th><th>What it looks for</th></tr>
              <tr><td>Length</td><td>30-50 characters, so it doesn&apos;t truncate on mobile</td></tr>
              <tr><td>Spam trigger words</td><td>Wording that inbox filters commonly flag</td></tr>
              <tr><td>Capitalization</td><td>ALL CAPS reads as shouting and hurts deliverability</td></tr>
              <tr><td>Punctuation</td><td>Excess &quot;!&quot; or &quot;?&quot; is a common spam signal</td></tr>
              <tr><td>Personalization</td><td>Merge tags or direct address (&quot;you,&quot; &quot;your&quot;)</td></tr>
              <tr><td>Emoji use</td><td>One can help it stand out; several look automated</td></tr>
            </tbody>
          </table>

          <h2>Common mistakes this catches</h2>
          <ul>
            <li><strong>Front-loading the brand name.</strong> &quot;YourBrand: New Arrivals Are Here&quot; wastes the first, most-visible characters on something the recipient already knows from the sender field.</li>
            <li><strong>Stacking urgency and discount language.</strong> &quot;URGENT!! 50% OFF TODAY ONLY!!!&quot; trips multiple spam signals at once and reads as desperate rather than exciting.</li>
            <li><strong>No differentiation from yesterday&apos;s email.</strong> If every subject line follows the identical template, engaged subscribers start pattern-matching and skipping without reading.</li>
          </ul>

          <h2>What this tool can&apos;t tell you</h2>
          <p>
            It can&apos;t tell you if the subject line is actually relevant to your specific list, and it can&apos;t replace a real A/B test on your own audience. Use it as a first pass, to catch obvious deliverability and readability issues, before a subject line goes into your actual testing calendar. For the full framework on running tests that produce a trustworthy answer, not just a number, see our guide on{" "}
            <a href="/blog/subject-line-ab-testing-guide">A/B testing subject lines</a>.
          </p>

          <h2>Frequently asked questions</h2>
          <h3>Is this free?</h3>
          <p>Yes, no limit on uses, no signup, no email required.</p>
          <h3>Does my subject line get sent to a server?</h3>
          <p>No. The scoring runs entirely in your browser using JavaScript. Nothing you type is transmitted, stored, or logged anywhere, including by us.</p>
          <h3>What&apos;s a good length?</h3>
          <p>Roughly 30-50 characters keeps the full subject visible across both mobile and desktop inboxes. Under 20 characters often lacks context; over 60 typically gets truncated on mobile.</p>

          <div className="stat-box">
            <div className="stat-box-inner" style={{ gridTemplateColumns: "1fr" }}>
              <div style={{ textAlign: "left" }}>
                <div style={{ font: "600 20px var(--font-heading), sans-serif", color: "#F5F3FF", marginBottom: 10 }}>
                  Want your whole email program checked, not just one subject line?
                </div>
                <div style={{ fontSize: 15, color: "#A29DB8", marginBottom: 20 }}>
                  Book a free 15-minute consultation and we&apos;ll look at your actual flows, not a hypothetical one.
                </div>
                <a
                  href="/#lm-form"
                  className="uppr-btn-primary"
                  style={{ display: "inline-block", textDecoration: "none" }}
                >
                  Book a free 15-minute consultation →
                </a>
              </div>
            </div>
          </div>
        </article>

        <Footer />
      </div>
    </div>
  );
}
