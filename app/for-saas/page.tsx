import type { Metadata } from "next";
import VerticalTemplate from "@/components/site/VerticalTemplate";

export const metadata: Metadata = {
  title: "Email & SMS Retention for SaaS | UPPR Agency",
  description: "Retention marketing built for SaaS — onboarding, trial conversion, and churn-prevention flows tied to product usage.",
};

const data = {
  label: "FOR SAAS",
  headline: "Fewer trials go quiet. Fewer accounts churn silently.",
  subhead: "Built around the SaaS lifecycle — activation, trial conversion, and the renewal moments that are easy to lose track of at scale.",
  painPoints: [
    { title: "Trials go cold without a nudge", desc: "Most trial users never activate the core feature that makes them stick — a good onboarding sequence changes that." },
    { title: "Churn often looks silent until it's too late", desc: "Usage drop-off is the earliest warning sign, and it's rarely acted on in time without automation." },
    { title: "Upgrade moments get missed", desc: "Users who hit plan limits are ready to upgrade right then — not whenever someone notices manually." },
    { title: "Support and marketing emails compete for attention", desc: "Lifecycle messaging needs to be sequenced properly, not fired off independently of what else the user is getting." },
  ],
  flows: [
    { title: "Onboarding & activation", desc: "A sequence that guides new signups to the feature that actually drives retention, not just a welcome email." },
    { title: "Trial conversion flow", desc: "Timed nudges through the trial window, tied to actual usage signals, not just a countdown." },
    { title: "Churn-risk win-back", desc: "Triggered by usage drop-off, reaching out before a quiet account becomes a cancelled one." },
    { title: "Upgrade & expansion prompts", desc: "Messaging timed to actual usage milestones — plan limits, feature adoption, seat growth." },
  ],
};

export default function Page() {
  return <VerticalTemplate data={data} />;
}
