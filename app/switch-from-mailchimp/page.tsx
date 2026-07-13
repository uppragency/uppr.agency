import type { Metadata } from "next";
import SwitchFromTemplate from "@/components/site/SwitchFromTemplate";

export const metadata: Metadata = {
  title: "Switching from Mailchimp? | UPPR Agency",
  description: "Thinking about moving off Mailchimp for retention marketing? Here's what actually changes, and how the migration works.",
};

const data = {
  competitor: "Mailchimp",
  reasons: [
    { title: "Pricing scales fast with list size", desc: "Costs climb quickly once a list grows past the free or entry tiers, independent of how engaged that list actually is." },
    { title: "Retention isn't the core focus", desc: "Built as a broad marketing platform — flows and segmentation often feel like an add-on rather than the main feature." },
    { title: "DIY setup and optimization", desc: "Flows and segments are self-serve — there's no dedicated strategist reviewing what's working and what isn't." },
    { title: "Generic templates", desc: "Design options are broad but generic — matching a specific brand system usually means starting from scratch." },
  ],
  whatStays: "Your subscriber list, purchase history, and existing templates move over during migration — you don't start from zero, and nothing gets left on the old platform.",
};

export default function Page() {
  return <SwitchFromTemplate data={data} />;
}
