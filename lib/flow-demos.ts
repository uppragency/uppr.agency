import type { FlowStep } from "@/components/site/FlowDemoPlayer";

export const FLOW_DEMOS: { key: string; label: string; icon: string; flowName: string; steps: FlowStep[] }[] = [
  {
    key: "welcome",
    label: "Welcome series",
    icon: "👋",
    flowName: "WELCOME_SERIES",
    steps: [
      { day: "Day 0", label: "Welcome", icon: "👋", subject: "Welcome to the list 🎉", preview: "Thanks for joining — here's your 15% off code, ready whenever you are." },
      { day: "Day 2", label: "Brand story", icon: "📖", subject: "Why we started this", preview: "A quick look at what makes the product different, no hard sell yet." },
      { day: "Day 4", label: "Social proof", icon: "⭐", subject: "1,200+ five-star reviews", preview: "Don't just take our word for it — here's what real customers say." },
      { day: "Day 7", label: "Bestsellers", icon: "🛍", subject: "The 5 most-loved picks", preview: "Here's what everyone's actually buying first, curated for you." },
      { day: "Day 10–14", label: "Last call", icon: "⏰", subject: "Your code expires tonight", preview: "Last chance to use your welcome discount before it's gone." },
    ],
  },
  {
    key: "abandoned-cart",
    label: "Abandoned cart",
    icon: "🛒",
    flowName: "ABANDONED_CART",
    steps: [
      { day: "1 hour", label: "Gentle reminder", icon: "🛒", subject: "You left something behind", preview: "Your cart is still here, whenever you're ready to check out." },
      { day: "22 hours", label: "Add urgency", icon: "⏳", subject: "Still thinking it over?", preview: "A couple of items in your cart are close to selling out." },
      { day: "3 days", label: "Incentive", icon: "🏷", subject: "Here's 10% to finish up", preview: "A small nudge to complete your order, valid for the next 48 hours." },
    ],
  },
  {
    key: "win-back",
    label: "Win-back",
    icon: "🔄",
    flowName: "WIN_BACK",
    steps: [
      { day: "Day 0", label: "We miss you", icon: "💜", subject: "It's been a while", preview: "Checking in — here's what's new since your last order." },
      { day: "Day 4", label: "Show what's new", icon: "✨", subject: "You might like these", preview: "A few picks based on what you bought last time." },
      { day: "Day 9", label: "Final offer", icon: "🎁", subject: "One more reason to come back", preview: "15% off your next order — expires in 72 hours." },
    ],
  },
];
