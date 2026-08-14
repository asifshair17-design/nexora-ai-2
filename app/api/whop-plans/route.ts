import { NextResponse } from "next/server";
import Whop from "@whop/sdk";

const whop = new Whop({
  apiKey: process.env.WHOP_API_KEY,
});

export async function GET() {
  try {
    const companyId = process.env.WHOP_COMPANY_ID;

    if (!companyId) {
      throw new Error("WHOP_COMPANY_ID is missing");
    }

   const plans = await whop.plans.list({
  account_id: companyId,
});

    return NextResponse.json({
      success: true,
      plans,
    });
  } catch (error: any) {
    console.error("WHOP PLANS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to retrieve plans",
        status: error?.status,
      },
      { status: 500 }
    );
  }
}