import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("========== WHOP WEBHOOK ==========");
    console.log(JSON.stringify(body, null, 2));
    console.log("==================================");

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Whop webhook error:", error);

    return NextResponse.json(
      { error: "Invalid webhook" },
      { status: 400 }
    );
  }
}