import type { Metadata } from "next";
import SwitchFromTemplate from "@/components/site/SwitchFromTemplate";

export const metadata: Metadata = {
  title: "Switching from Klaviyo? | UPPR Agency",
  description: "Thinking about moving off Klaviyo for retention marketing? Here's what actually changes, and how the migration works.",
};

const data = {
  competitor: "Klaviyo",
  reasons: [
    { title: "Powerful, but time-intensive to run well", desc: "The platform's depth is real, but getting the most out of it takes ongoing hands-on time most SMB teams don't have to spare." },
    { title: "Pricing tied to contact count", desc: "Costs rise with list size regardless of engagement, which can outpace revenue growth for smaller accounts." },
    { title: "Self-managed unless you hire or retain help", desc: "Without a dedicated strategist, flows tend to get built once and rarely revisited." },
    { title: "Steep learning curve for a small team", desc: "The flexibility that power users love can be overwhelming for a team without a dedicated retention hire." },
  ],
  whatStays: "Your subscriber list, purchase history, and existing templates move over during migration — you don't start from zero, and nothing gets left on the old platform.",
};

export default function Page() {
  return <SwitchFromTemplate data={data} />;
}
