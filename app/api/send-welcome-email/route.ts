import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email/sendEmail";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    await sendEmail(
      email,
      "Welcome to Nexora AI 🚀",
      `
      <h1>Welcome to Nexora AI!</h1>

      <p>Your account has been created successfully.</p>

      <p>Start creating amazing AI images now.</p>

      <br/>

      <p>Thanks for joining Nexora AI ❤️</p>
      `
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to send email",
      },
      {
        status: 500,
      }
    );
  }
}