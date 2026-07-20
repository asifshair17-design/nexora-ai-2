import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";

lemonSqueezySetup({
  apiKey: process.env.LEMON_SQUEEZY_API_KEY!,
});

export const STORE_ID = Number(process.env.LEMON_SQUEEZY_STORE_ID);
export const VARIANT_ID = Number(process.env.LEMON_SQUEEZY_VARIANT_ID);