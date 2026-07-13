import type { Metadata } from "next";
import SwitchFromTemplate from "@/components/site/SwitchFromTemplate";

export const metadata: Metadata = {
  title: "Switching from Newsman? | UPPR Agency",
  description: "Thinking about moving off Newsman for retention marketing? Here's what actually changes, and how the migration works.",
};

const data = {
  competitor: "Newsman",
  reasons: [
    { title: "Focused on sending, not full retention", desc: "Strong for straightforward newsletter delivery, but automated flows and behavior-based segmentation are often more limited." },
    { title: "No dedicated strategist included", desc: "Campaigns and flows are self-managed — there's no one proactively reviewing performance and adjusting the plan." },
    { title: "Limited growth-stack add-ons", desc: "Loyalty programs, referral systems, and on-site widgets typically need separate tools bolted on." },
    { title: "Reporting stays basic", desc: "Standard open/click metrics, without deeper revenue attribution per flow or campaign." },
  ],
  whatStays: "Your subscriber list, purchase history, and existing templates move over during migration — you don't start from zero, and nothing gets left on the old platform.",
};

export default function Page() {
  return <SwitchFromTemplate data={data} />;
}
