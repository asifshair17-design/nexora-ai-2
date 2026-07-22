import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabase-admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("🍋 WEBHOOK RECEIVED");
    console.log(JSON.stringify(body, null, 2));

    const eventName = body.meta?.event_name;

    if (
      eventName === "subscription_created" ||
      eventName === "subscription_updated"
    ) {
      const attributes = body.data?.attributes;

      const email = attributes?.user_email || attributes?.customer_email;
      const customerId = attributes?.customer_id;
      const subscriptionId = body.data?.id;
      const renewsAt = attributes?.renews_at;

      if (!email) {
        console.log("❌ No customer email found.");
        return NextResponse.json({ success: true });
      }

      const { error } = await supabaseAdmin
        .from("profiles")
        .update({
          plan: "pro",
          lemonsqueezy_customer_id: customerId,
          lemonsqueezy_subscription_id: subscriptionId,
          pro_expires_at: renewsAt,
        })
        .eq("email", email);

      if (error) {
        console.error("Supabase update error:", error);
      } else {
        console.log(`✅ ${email} upgraded to PRO`);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Webhook failed",
      },
      {
        status: 500,
      }
    );
  }
}