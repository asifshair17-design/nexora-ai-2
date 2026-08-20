import { NextResponse } from "next/server";
import Whop from "@whop/sdk";
import { supabaseAdmin } from "../../../../lib/supabase-admin";

const whop = new Whop();
const PLAN_MAP: Record<
  string,
  {
    plan: "basic" | "standard" | "pro" | "premium";
    credits: number;
    billing: "monthly" | "yearly";
  }
> = {
  // =========================
  // BASIC
  // =========================

  plan_O5BGGznuAC4fi: {
    plan: "basic",
    credits: 300,
    billing: "monthly",
  },

  plan_v2lrEEv6hDd9i: {
    plan: "basic",
    credits: 3600,
    billing: "yearly",
  },

  // =========================
  // STANDARD
  // =========================

  plan_jxtXuTdBKiInI: {
    plan: "standard",
    credits: 1000,
    billing: "monthly",
  },

  plan_sEueFH3RZP5rx: {
    plan: "standard",
    credits: 12000,
    billing: "yearly",
  },

  // =========================
  // PRO
  // =========================

  plan_EQEMhK2lwNTcX: {
    plan: "pro",
    credits: 3000,
    billing: "monthly",
  },

  plan_aRrgYRcUSBGCa: {
    plan: "pro",
    credits: 36000,
    billing: "yearly",
  },

  // =========================
  // PREMIUM
  // =========================

  plan_SuuTsRdOF6s60: {
    plan: "premium",
    credits: 8000,
    billing: "monthly",
  },

  plan_cGTFwpcOKGZaV: {
    plan: "premium",
    credits: 96000,
    billing: "yearly",
  },
};

export async function POST(req: Request) {
  try {
    /*
    ============================================================
    READ RAW BODY
    ============================================================
    */

    const rawBody = await req.text();

    /*
    ============================================================
    VERIFY WHOP WEBHOOK SIGNATURE
    ============================================================
    */

    const webhookSecret =
      process.env.WHOP_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error(
        "❌ WHOP_WEBHOOK_SECRET is missing."
      );

      return NextResponse.json(
        {
          error: "Webhook secret not configured",
        },
        {
          status: 500,
        }
      );
    }

    let body: any;

    try {
     const headers: Record<string, string> = {};

req.headers.forEach((value, key) => {
  headers[key] = value;
});

body = whop.webhooks.unwrap(rawBody, {
  headers,
});
    } catch (error) {
      console.error(
        "❌ Invalid Whop webhook signature:",
        error
      );

      return NextResponse.json(
        {
          error: "Invalid webhook signature",
        },
        {
          status: 401,
        }
      );
    }

    /*
    ============================================================
    VERIFIED WEBHOOK
    ============================================================
    */

    console.log(
      "========== VERIFIED WHOP WEBHOOK =========="
    );

    console.log("EVENT:", body.type);

    const data = body.data;

    if (!data) {
      console.log("❌ No webhook data.");

      return NextResponse.json({
        received: true,
      });
    }

    /*
    ============================================================
    MEMBERSHIP ACTIVATED
    ============================================================
    */

    if (body.type === "membership.activated") {
      const planId = data.plan?.id;
      const email = data.user?.email;
      const whopUserId = data.user?.id;
      const membershipId = data.id;

      console.log("Whop email:", email);
      console.log(
        "Whop user ID:",
        whopUserId
      );
      console.log(
        "Whop membership ID:",
        membershipId
      );
      console.log(
        "Whop plan ID:",
        planId
      );

      /*
      ------------------------------------------------------------
      Validate required information
      ------------------------------------------------------------
      */

      if (!email || !planId) {
        console.log(
          "❌ Missing email or plan ID."
        );

        return NextResponse.json({
          received: true,
        });
      }

      /*
      ------------------------------------------------------------
      Find Nexora plan
      ------------------------------------------------------------
      */

      const planInfo = PLAN_MAP[planId];

      if (!planInfo) {
        console.log(
          "❌ Unknown Whop plan:",
          planId
        );

        return NextResponse.json({
          received: true,
          error: "Unknown Whop plan",
        });
      }

      console.log(
        "Nexora plan:",
        planInfo.plan
      );

      console.log(
        "Billing:",
        planInfo.billing
      );

      console.log(
        "Credits:",
        planInfo.credits
      );

      /*
      ------------------------------------------------------------
      Find Nexora user
      ------------------------------------------------------------
      */

      const {
        data: profile,
        error: profileError,
      } = await supabaseAdmin
        .from("profiles")
        .select(
          "id, email, plan, credits"
        )
        .eq("email", email)
        .single();

      if (profileError || !profile) {
        console.error(
          "❌ Nexora profile not found:",
          profileError
        );

        return NextResponse.json({
          received: true,
          error: "Nexora profile not found",
        });
      }

      console.log(
        "✅ Nexora user found:",
        profile.id
      );

      /*
      ------------------------------------------------------------
      Subscription expiry
      ------------------------------------------------------------
      */

      const expiresAt =
        data.renewal_period_end || null;

      /*
      ------------------------------------------------------------
      Update Nexora profile
      ------------------------------------------------------------
      */

      const {
        error: updateError,
      } = await supabaseAdmin
        .from("profiles")
        .update({
          plan: planInfo.plan,
          credits: planInfo.credits,
          pro_expires_at: expiresAt,
          whop_user_id: whopUserId,
          whop_membership_id: membershipId,
          whop_plan_id: planId,
        })
        .eq("id", profile.id);

      if (updateError) {
        console.error(
          "❌ Supabase update failed:",
          updateError
        );

        return NextResponse.json(
          {
            error:
              "Database update failed",
          },
          {
            status: 500,
          }
        );
      }

      /*
      ------------------------------------------------------------
      SUCCESS
      ------------------------------------------------------------
      */

      console.log(
        "=========================================="
      );

      console.log(
        "✅ WHOP SUBSCRIPTION ACTIVATED"
      );

      console.log(
        "Email:",
        email
      );

      console.log(
        "Plan:",
        planInfo.plan
      );

      console.log(
        "Billing:",
        planInfo.billing
      );

      console.log(
        "Credits:",
        planInfo.credits
      );

      console.log(
        "Expires:",
        expiresAt
      );

      console.log(
        "=========================================="
      );
    }

    /*
    ============================================================
    MEMBERSHIP DEACTIVATED
    ============================================================
    */

    if (
      body.type ===
      "membership.deactivated"
    ) {
      const membershipId = data.id;

      console.log(
        "Whop membership deactivated:",
        membershipId
      );

      const {
        error: updateError,
      } = await supabaseAdmin
        .from("profiles")
        .update({
          plan: "free",
          credits: 0,
          pro_expires_at: null,
          whop_membership_id: null,
          whop_plan_id: null,
        })
        .eq(
          "whop_membership_id",
          membershipId
        );

      if (updateError) {
        console.error(
          "❌ Membership deactivation failed:",
          updateError
        );
      } else {
        console.log(
          "✅ Nexora subscription deactivated"
        );
      }
    }

    /*
    ============================================================
    MEMBERSHIP CANCEL AT PERIOD END CHANGED
    ============================================================
    */

    if (
      body.type ===
      "membership.cancel_at_period_end_changed"
    ) {
      console.log(
        "Membership cancellation status changed"
      );

      console.log(
        "Membership:",
        data.id
      );

      console.log(
        "Cancel at period end:",
        data.cancel_at_period_end
      );
    }

    /*
    ============================================================
    PAYMENT SUCCEEDED
    ============================================================
    */

    if (
      body.type ===
      "payment.succeeded"
    ) {
      console.log(
        "✅ Whop payment succeeded:",
        data.id
      );
    }

    /*
    ============================================================
    PAYMENT FAILED
    ============================================================
    */

    if (
      body.type ===
      "payment.failed"
    ) {
      console.log(
        "❌ Whop payment failed:",
        data.id
      );
    }

    /*
    ============================================================
    REFUND CREATED
    ============================================================
    */

    if (
      body.type ===
      "refund.created"
    ) {
      console.log(
        "💰 Whop refund created:",
        data.id
      );
    }

    console.log(
      "========== WHOP WEBHOOK COMPLETE =========="
    );

    return NextResponse.json({
      received: true,
    });
  } catch (error) {
    console.error(
      "❌ Whop webhook error:",
      error
    );

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