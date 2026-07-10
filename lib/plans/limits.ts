export const PLANS = {
  free: {
    name: "Free",
    dailyImages: 20
  },

  pro: {
    name: "Pro",
    dailyImages: Infinity,
  },
} as const;

export type PlanName = keyof typeof PLANS;

export function getPlan(plan: PlanName = "free") {
  return PLANS[plan];
}