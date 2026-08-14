export const CREDIT_COST = {
  basic: 1,
  fast: 2,
  pro: 4,
  premium: 8,

  // AI Writer
  text: 1,

  // Future Tools
  video: 8,
  music: 5,
  voice: 2,
  logo: 1,
} as const;

export type ProviderType =
  keyof typeof CREDIT_COST;

export function getCreditCost(
  provider: ProviderType
) {
  return CREDIT_COST[provider];
}