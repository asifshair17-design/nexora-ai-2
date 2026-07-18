import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(
  to: string,
  subject: string,
  html: string
) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Nexora AI <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    console.log("Resend Data:", data);
    console.log("Resend Error:", error);

    if (error) {
      throw error;
    }

    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ Email Error:", error);
  }
}