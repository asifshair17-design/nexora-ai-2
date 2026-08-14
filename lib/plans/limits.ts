export const PLANS = {
  free: {
    name: "Free",
    startingCredits: 1000,
    dailyImages: 30,
  },

  pro: {
    name: "Pro",
    monthlyCredits: 1000,
    dailyImages: 30,
  },
} as const;

export type PlanName = keyof typeof PLANS;

export function getPlan(plan: PlanName = "free") {
  return PLANS[plan];
}