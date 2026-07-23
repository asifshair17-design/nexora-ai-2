import { NextResponse } from "next/server";
import { createCheckout } from "@lemonsqueezy/lemonsqueezy.js";
import { createServerSupabase } from "@/lib/supabase/server";
import {
  setupLemonSqueezy,
  STORE_ID,
  VARIANT_ID,
} from "@/lib/lemonsqueezy";

export async function POST() {
  try {
    setupLemonSqueezy();

    console.log("========== LEMON DEBUG ==========");
    console.log("STORE_ID:", STORE_ID);
    console.log("VARIANT_ID:", VARIANT_ID);
    console.log(
      "API KEY EXISTS:",
      !!process.env.LEMON_SQUEEZY_API_KEY
    );
    console.log("SITE URL:", process.env.NEXT_PUBLIC_SITE_URL);
    console.log("================================");

    const supabase = await createServerSupabase();

    console.log("=== CHECKOUT DEBUG ===");

    const sessionResult = await supabase.auth.getSession();
    console.log("SESSION:", sessionResult);

    const userResult = await supabase.auth.getUser();
    console.log("USER RESULT:", userResult);

    const currentUser = userResult.data.user;

    console.log("Current user:", currentUser);

    if (!currentUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const response = await createCheckout(STORE_ID, VARIANT_ID, {
      checkoutData: {
        email: currentUser.email!,
        custom: {
          user_id: currentUser.id,
        },
      },
      productOptions: {
        redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
      },
    });

    console.log("LEMON RESPONSE:");
    console.dir(response, { depth: null });

    if (response.error) {
      console.log("LEMON ERROR:");
      console.dir(response.error, { depth: null });

      return NextResponse.json(
        {
          error: response.error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      url: response.data?.data.attributes.url,
    });
  } catch (err) {
    console.log("UNEXPECTED ERROR:");
    console.dir(err, { depth: null });

    return NextResponse.json(
      {
        error: "Unexpected server error",
      },
      {
        status: 500,
      }
    );
  }
}