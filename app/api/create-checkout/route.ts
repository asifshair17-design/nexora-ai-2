import { NextResponse } from "next/server";
import { createCheckout } from "@lemonsqueezy/lemonsqueezy.js";
import { VARIANT_ID } from "@/lib/lemonsqueezy";

export async function POST() {
  try {
    const checkout = await createCheckout(
      process.env.LEMON_SQUEEZY_STORE_ID!,
      VARIANT_ID,
      {
        checkoutOptions: {
          embed: false,
          media: true,
          logo: true,
        },
      }
    );

    console.log("LEMON CHECKOUT:");
    console.log(JSON.stringify(checkout, null, 2));

    return NextResponse.json(checkout);
  } catch (error) {
    console.error("LEMON ERROR:", error);

    return NextResponse.json(
      {
        error: "Checkout creation failed",
        details: String(error),
      },
      {
        status: 500,
      }
    );
  }
}