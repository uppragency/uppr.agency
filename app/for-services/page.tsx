import type { Metadata } from "next";
import VerticalTemplate from "@/components/site/VerticalTemplate";

export const metadata: Metadata = {
  title: "Email & SMS Retention for Service Businesses | UPPR Agency",
  description: "Retention marketing built for service businesses — booking reminders, re-engagement, and referral flows tied to your actual booking cycle.",
};

const data = {
  label: "FOR SERVICE BUSINESSES",
  headline: "Keep clients booking, without chasing every one manually.",
  subhead: "Built around the booking cycle, not a product catalog — reminders, re-engagement, and referrals that run without you thinking about them.",
  painPoints: [
    { title: "Booking gaps are easy to miss", desc: "A client who hasn't rebooked in a while often just needs a nudge — but that's easy to lose track of manually." },
    { title: "No-shows and late cancellations cost real money", desc: "Automated reminders reduce this without adding to your front-desk workload." },
    { title: "Referrals happen by accident, not by design", desc: "Happy clients rarely refer on their own unless there's a clear, easy prompt to do it." },
    { title: "Your calendar is the real bottleneck", desc: "Email and SMS need to work with your actual booking system, not around it." },
  ],
  flows: [
    { title: "Booking reminders", desc: "Automated confirmations and reminders that cut down no-shows without manual follow-up." },
    { title: "Re-engagement flow", desc: "Reaches out to clients who haven't booked in a while, before they quietly move to someone else." },
    { title: "Referral program", desc: "A dual-sided incentive that turns satisfied clients into a real acquisition channel." },
    { title: "Review & feedback requests", desc: "Timed asks for reviews right after a positive experience, when they're most likely to say yes." },
  ],
};

export default function Page() {
  return <VerticalTemplate data={data} />;
}
