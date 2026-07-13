// Date extrase din scriptul original DC-builder (index.html), păstrate identic
// ca text, ca să nu pierdem copy-ul deja validat.

export const brands = [
  { name: "LUMEN GOODS", style: "letter-spacing:-.02em" },
  { name: "Verde", style: "" },
  { name: "NORTHWIND", style: "letter-spacing:.02em" },
  { name: "Peona", style: "font-style:italic" },
  { name: "Atlas&Co", style: "letter-spacing:-.02em" },
  { name: "HALCYON", style: "letter-spacing:.04em" },
];
export const marquee = [...brands, ...brands];

export const manifesto =
  "UPPR is the continuous infrastructure layer for your retention revenue. Built specifically for small and mid-sized businesses, we build, protect, and perpetually optimize your email and SMS systems — so your flows run without pause, without babysitting, without fail.";
export const manifestoWords = manifesto.split(" ");

export const resultShots = [
  { src: "/assets/result-newsletter-1.png", alt: "Newsletter performance report showing 313 transactions and 61,131.51 Lei revenue", caption: "Single newsletter send — full campaign period", stat: "6.45% CVR", orders: "313", revenue: "61,131.51 Lei" },
  { src: "/assets/result-newsletter-2.png", alt: "Ecommerce statistics dashboard showing 94 transactions and 18,992.10 Lei revenue", caption: "Same client, filtered to a custom date range in TheMarketer", stat: "12.88% CVR", orders: "94", revenue: "18,992.10 Lei" },
  { src: "/assets/result-newsletter-3.png", alt: "Ecommerce statistics dashboard for May 2026 showing 29 transactions and 7,172.80 Lei revenue", caption: "Cumulative performance across multiple newsletter sends", stat: "14.15% CVR", orders: "29", revenue: "7,172.80 Lei" },
  { src: "/assets/result-newsletter-4.png", alt: "Ecommerce statistics dashboard for April 2026 showing 33 transactions and 8,516.85 Lei revenue", caption: "Cumulative performance across multiple newsletter sends", stat: "4.42% CVR", orders: "33", revenue: "8,516.85 Lei" },
  { src: "/assets/result-newsletter-5.png", alt: "Ecommerce statistics dashboard for Q1 2026 showing 70 transactions and 17,489.10 Lei revenue", caption: "Cumulative performance across multiple newsletter sends", stat: "6.17% CVR", orders: "70", revenue: "17,489.10 Lei" },
  { src: "/assets/result-newsletter-6.png", alt: "Ecommerce statistics dashboard for Q2 2026 showing 71 transactions and 18,369.30 Lei revenue", caption: "Cumulative performance across multiple newsletter sends", stat: "6.33% CVR", orders: "71", revenue: "18,369.30 Lei" },
];

export const services = [
  { no: "01", icon: "⚙", title: "Setup & Integration", desc: "We connect your store or CRM, authenticate your domain, and sync historical data so TheMarketer fires on clean, complete signals from day one.", tags: ["Store / CRM sync", "DNS & DKIM", "List cleaning", "Data sync"] },
  { no: "02", icon: "✦", title: "Automated Flows", desc: "The revenue engine: welcome series, lead recovery, engagement triggers, and win-back — built, tested, and left running.", tags: ["Welcome series", "Lead recovery", "Engagement triggers", "Win-back"] },
  { no: "03", icon: "◷", title: "Campaign Management", desc: "A living newsletter calendar with real segmentation and A/B testing on subject lines, send times, and offers.", tags: ["4–8 sends / mo", "Segmentation", "A/B testing", "Calendar"] },
  { no: "04", icon: "✎", title: "Design & Copy", desc: "On-brand, high-converting templates written and designed in-house — mobile-first and rendering-tested before every send.", tags: ["Custom templates", "Copywriting", "Brand system", "QA checklist"] },
];

export const process = [
  { no: "01", phase: "Week 0", title: "Free consultation", desc: "We audit your current setup, identify the biggest revenue gaps, and give you a realistic plan for what to fix first." },
  { no: "02", phase: "Week 1–2", title: "Setup & integration", desc: "We connect your store or CRM, clean your list, authenticate your domain, and migrate historical data into TheMarketer." },
  { no: "03", phase: "Week 2–3", title: "Flows go live", desc: "Welcome, lead recovery, and win-back start running. Every flow is tested before it touches a real contact." },
  { no: "04", phase: "Ongoing", title: "Continuous optimization", desc: "Campaigns, A/B tests, and flow refinements every month, tracked on a live dashboard." },
];

export const advantages = [
  { icon: "∞", title: "Always running", desc: "Flows and campaigns operate continuously — no gaps between strategist hand-offs, no dead weeks between sends." },
  { icon: "⌁", title: "TheMarketer-native", desc: "We live inside the platform daily — deeper segmentation and automation than a generalist agency ever touches." },
  { icon: "⏱", title: "60–90 day payback", desc: "Most accounts see the setup investment returned in revenue within the first quarter." },
  { icon: "◎", title: "One dedicated pod", desc: "Strategist, designer, and implementer — the same three people on your account from day one." },
  { icon: "⇄", title: "No lock-in", desc: "Your list, your templates, your account. Leave whenever you want — everything stays yours." },
  { icon: "◈", title: "Transparent reporting", desc: "A live dashboard tracks every flow and campaign — open rate, CTR, and revenue attributed, updated in real time." },
];

export const growthStack = [
  { icon: "✧", title: "Product Recommendations", desc: "Personalized cross-sell and upsell suggestions inside your flows and on-site, powered by real customer behavior instead of static bestseller lists.", tags: ["Cross-sell", "Personalization", "AOV lift", "Behavior-based"] },
  { icon: "◆", title: "Loyalty Program", desc: "Tiered rewards and points systems that turn one-time buyers into repeat customers, configured and managed inside TheMarketer.", tags: ["Tiered rewards", "Points system", "Repeat purchase", "Retention lift"] },
  { icon: "↻", title: "Referral Program", desc: "Dual-sided incentive programs that turn existing customers into an acquisition channel, at close to zero cost per lead.", tags: ["Dual rewards", "Social sharing", "Zero ad spend", "New customers"] },
  { icon: "▣", title: "Launcher", desc: "A single on-site widget that unifies opt-ins, loyalty status, referrals, and reviews, so your growth tools stop competing for the same pixel.", tags: ["Unified widget", "On-site opt-in", "Reviews", "One integration"] },
  { icon: "◉", title: "Push Notifications", desc: "A third messaging channel alongside email and SMS, for real-time nudges that don't rely on an inbox or a phone number.", tags: ["Web push", "Real-time", "No inbox needed", "Re-engagement"] },
];

export const faqs = [
  { q: "Do you only work with ecommerce brands?", a: "No. UPPR runs email and SMS retention for any business with a customer list and a repeat cycle — retail, services, SaaS, and beyond. TheMarketer is platform-agnostic, and we adapt every flow to how your business actually sells." },
  { q: "What size businesses do you work with?", a: "We specialize in small and mid-sized businesses. That is deliberate: SMBs get the same senior strategist and implementer a bigger brand gets from an enterprise agency, without the enterprise retainer or a junior account manager." },
  { q: "Do we need to already use TheMarketer?", a: "No. Setup and migration are part of onboarding. If you're on a different platform today, we scope the switch during the free consultation." },
  { q: "What platforms and tools do you connect with?", a: "Most stacks, without a rip-and-replace. Store platforms like Shopify, WooCommerce, Magento, and PrestaShop; website builders like WordPress, Wix, and Squarespace; your CRM or a spreadsheet import via Zapier or a custom API; and tracking tools like Stripe, PayPal, Google Analytics, and Meta Pixel. Don't see your platform? Most setups are still possible through the TheMarketer API — ask on the call." },
  { q: "How long until we see results?", a: "Core flows typically go live within 2 to 3 weeks. Most accounts see the setup investment returned in revenue within 60 to 90 days, once the flows have run a full cycle." },
  { q: "What happens to our list and templates if we stop working together?", a: "They stay yours — your list, your templates, your TheMarketer account. There is no contract that locks you in past a decision to leave." },
  { q: "Why email instead of paid ads or social?", a: "Ad platforms set the price, and it rises every year. Social platforms set your reach, and can change it overnight. Your email and SMS list is the one channel you actually own — the cost stays fixed, and it's still there even if you stop paying or an algorithm changes." },
  { q: "Why not just hire a generalist marketing agency?", a: "Most generalist agencies split attention across ads, SEO, social, and email — retention becomes one line item among many. UPPR runs retention as the only job, inside one platform, with deeper segmentation than a team juggling five channels usually reaches." },
  { q: "What is included in the free consultation?", a: "A 15-minute review of your current setup — or lack of one — with specific opportunities we can see: which flows are missing, where your list is under-used, and what a realistic first 90 days looks like. No slide deck, no sales pressure." },
  { q: "How do you handle data protection and GDPR?", a: "TheMarketer operates under EU data protection requirements, and every flow we build follows consent and data-minimization principles by design. Your customer data stays inside your own TheMarketer account — we never export or store it separately." },
];

export const CAL_URL = "/#lm-form";
export const AFFILIATE_URL = "https://api.themarketer.com/invite/upprmarketing";

export const socialProofStats = [
  { value: 247, suffix: "%", prefix: "+", caption: "Revenue from automated flows for LUMEN Goods", variant: "outline" as const },
  { value: 18, suffix: "%", prefix: "+", caption: "Total revenue in 60 days · Verde", variant: "solid" as const },
  { value: 42, suffix: "%", prefix: "", caption: "Average open rate across managed campaigns", variant: "outline" as const },
];

export const testimonial = {
  quote:
    "UPPR rebuilt our welcome and win-back flows on TheMarketer in three weeks. Email went from 9% of revenue to 27% without touching our ad spend. It just runs now.",
  name: "Maya Okonkwo",
  title: "Head of Growth · Verde",
};

export const comparisonPlans = [
  {
    tag: "DIY / in-house",
    title: "You build it yourself",
    highlight: false,
    rows: [
      ["Time to launch", "Weeks, part-time"],
      ["Platform depth", "Self-taught"],
      ["Who's accountable", "You, alone"],
      ["Optimization", "When you find time"],
      ["Built for", "Whoever has the hours"],
      ["Data ownership", "Yours"],
    ],
  },
  {
    tag: "Generalist agency",
    title: "One channel among five",
    highlight: false,
    rows: [
      ["Time to launch", "4–8 weeks"],
      ["Platform depth", "Spread across 5+ channels"],
      ["Who's accountable", "Rotating account managers"],
      ["Optimization", "Monthly, if scheduled"],
      ["Built for", "Enterprise retainers"],
      ["Data ownership", "Often tied to their systems"],
    ],
  },
  {
    tag: "UPPR",
    title: "Retention as the only job",
    highlight: true,
    rows: [
      ["Time to launch", "2–3 weeks"],
      ["Platform depth", "TheMarketer-native, daily"],
      ["Who's accountable", "One dedicated pod"],
      ["Optimization", "Continuous"],
      ["Built for", "Small & mid-sized businesses"],
      ["Data ownership", "Always yours, no lock-in"],
    ],
  },
];

export const notAFit = [
  "No list yet, or under 500 contacts to start from",
  "A single one-off sale with no repeat or renewal cycle",
  "Looking for a one-time campaign send, not a managed system",
  "Need same-day setup with no onboarding period",
  "Choosing purely on lowest price, not platform depth",
];

export const goodFit = [
  "An existing customer or lead list, even a small one",
  "A repeat-purchase, repeat-booking, or renewal cycle",
  "A small or mid-sized business ready to own retention, not rent it",
  "Wants one accountable team, not a rotating account manager",
  "Ready to let flows run a full cycle before judging results",
];

export const leadFormBenefits = [
  "Free 15-minute strategy session",
  "Personalized recommendations for your business",
  "No commitment or sales pressure",
  "Expert answers to your marketing questions",
  "Identify your biggest revenue opportunities",
  "Discover quick wins to increase retention",
  "Actionable advice you can implement right away",
  "Tailored insights based on your current setup",
];
