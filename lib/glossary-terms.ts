export type GlossaryTerm = { term: string; slug: string; def: string };

function slugify(term: string): string {
  return term
    .toLowerCase()
    .replace(/[()/]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const RAW_TERMS: { term: string; def: string }[] = [
  { term: "Automated flow", def: "A pre-built sequence of emails or SMS triggered by a customer action — signing up, abandoning a cart, or going quiet — instead of being sent manually." },
  { term: "Open rate", def: "The percentage of delivered emails that were opened. Increasingly unreliable on its own due to Apple Mail Privacy Protection, which pre-fetches images." },
  { term: "Unique open rate", def: "Open rate counted once per recipient, regardless of how many times they reopened the email — a cleaner signal than raw opens." },
  { term: "Click rate", def: "The percentage of delivered emails that got at least one click, a stronger engagement signal than opens alone." },
  { term: "Click-through rate (CTR)", def: "Clicks divided by opens (not deliveries) — shows how compelling the content was to people who already opened it." },
  { term: "Conversion rate (CVR)", def: "The percentage of recipients who completed the target action (usually a purchase) after receiving the email or SMS." },
  { term: "Deliverability", def: "Whether your emails actually reach the inbox, versus landing in spam or being blocked entirely. Affected by sender reputation, list hygiene, and authentication." },
  { term: "Segmentation", def: "Splitting your list into smaller groups based on behavior or attributes, so each group gets messaging relevant to them instead of one blast for everyone." },
  { term: "Welcome series", def: "A short automated sequence sent to new subscribers, usually introducing the brand and offering a first-purchase incentive." },
  { term: "Abandoned cart flow", def: "An automated sequence triggered when someone adds a product to cart but leaves without buying, reminding them to complete the purchase." },
  { term: "Win-back flow", def: "A sequence targeting customers who haven't engaged or purchased in a while, aimed at re-activating them before they churn entirely." },
  { term: "List hygiene", def: "The ongoing practice of removing invalid, inactive, or unengaged contacts to protect sender reputation and deliverability." },
  { term: "Sender reputation", def: "A score mailbox providers assign to your sending domain based on engagement and complaint history — it directly affects whether your emails reach the inbox." },
  { term: "A/B testing", def: "Sending two variants (subject line, send time, offer) to a small sample and using the winner for the rest of the list." },
  { term: "AOV (Average Order Value)", def: "Total revenue divided by number of orders — a common metric for measuring the impact of upsell and cross-sell flows." },
  { term: "Churn", def: "The rate at which customers stop buying or engaging with a brand over a given period." },
  { term: "ESP (Email Service Provider)", def: "The platform used to send and manage email campaigns and automations — TheMarketer, in UPPR's case." },
  { term: "DKIM / SPF / DMARC", def: "Email authentication protocols that prove a message actually came from your domain, protecting deliverability and reducing spoofing risk." },
];

export const GLOSSARY_TERMS: GlossaryTerm[] = RAW_TERMS.map((t) => ({ ...t, slug: slugify(t.term) }));
