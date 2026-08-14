export const PLANS = {
  basic: {
    name: "Basic",
    monthlyPrice: 4.99,
    yearlyPrice: 47.99,

    description: "Perfect for beginners",

    monthlyCredits: 300,
    yearlyCredits: 3600,

    model: "Basic AI",

    icon: "🟢",

    border: "border-green-500",

    button: "bg-green-600 hover:bg-green-700",
  },

  standard: {
    name: "Standard",
    monthlyPrice: 9.99,
    yearlyPrice: 95.99,

    description: "For daily creators",

    monthlyCredits: 1000,
    yearlyCredits: 12000,

    model: "Standard AI",

    icon: "🔵",

    border: "border-blue-500",

    button: "bg-blue-600 hover:bg-blue-700",
  },

  pro: {
    name: "Pro",
    monthlyPrice: 19.99,
    yearlyPrice: 191.99,

    description: "Professional creators",

    monthlyCredits: 3000,
    yearlyCredits: 36000,

    model: "Pro AI",

    icon: "🟣",

    border: "border-purple-500",

    button: "bg-purple-600 hover:bg-purple-700",
  },

  premium: {
    name: "Premium",
    monthlyPrice: 39.99,
    yearlyPrice: 383.99,

    description: "Maximum performance",

    monthlyCredits: 8000,
    yearlyCredits: 96000,

    model: "Premium AI",

    icon: "🔴",

    border: "border-red-500",

    button: "bg-red-600 hover:bg-red-700",
  },
} as const;