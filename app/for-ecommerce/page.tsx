import type { Metadata } from "next";
import VerticalTemplate from "@/components/site/VerticalTemplate";

export const metadata: Metadata = {
  title: "Email & SMS Retention for Ecommerce | UPPR Agency",
  description: "Retention marketing built for online stores — abandoned cart, post-purchase, and win-back flows tied directly to revenue.",
};

const data = {
  label: "FOR ECOMMERCE",
  headline: "Turn browsers and one-time buyers into repeat revenue.",
  subhead: "Built around the exact moments that matter for a store: the cart left behind, the first purchase, the customer who hasn't come back.",
  painPoints: [
    { title: "Cart abandonment is the norm, not the exception", desc: "Most visitors add to cart and leave. Recovery flows exist to bring a meaningful share of that back automatically." },
    { title: "One-time buyers rarely return on their own", desc: "Without a post-purchase sequence, most customers never hear from you again after checkout." },
    { title: "Acquisition cost keeps climbing", desc: "Ad platforms take a bigger cut every year — your existing list is the cheapest revenue you have." },
    { title: "Product catalog changes constantly", desc: "Flows need to reflect current inventory and bestsellers, not a static template from six months ago." },
  ],
  flows: [
    { title: "Abandoned cart recovery", desc: "A short, tightly-timed sequence that brings someone back before they forget why they wanted the product." },
    { title: "Post-purchase flow", desc: "Order confirmation, shipping updates, and a well-timed nudge toward the next purchase." },
    { title: "Win-back flow", desc: "Re-engages customers who've gone quiet, before they churn to a competitor entirely." },
    { title: "Product recommendations", desc: "Personalized cross-sell and upsell based on actual purchase behavior, not static bestseller lists." },
  ],
};

export default function Page() {
  return <VerticalTemplate data={data} />;
}
