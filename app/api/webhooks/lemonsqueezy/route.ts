import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("🍋 WEBHOOK RECEIVED");
    console.log(JSON.stringify(body, null, 2));

    const eventName = body.meta?.event_name;

    console.log("EVENT:", eventName);

    if (eventName === "subscription_created") {
      console.log("🎉 USER PURCHASED PRO");
    }

    return NextResponse.json({
      success: true,
    });
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