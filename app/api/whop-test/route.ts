import { NextResponse } from "next/server";
import Whop from "@whop/sdk";

const whop = new Whop({
  apiKey: process.env.WHOP_API_KEY,
});

export async function GET() {
  try {
    const companyId = process.env.WHOP_COMPANY_ID;

    if (!process.env.WHOP_API_KEY) {
      throw new Error("WHOP_API_KEY is missing");
    }

    if (!companyId) {
      throw new Error("WHOP_COMPANY_ID is missing");
    }

    const company = await whop.companies.retrieve(companyId);

    return NextResponse.json({
      success: true,
      company: company.title,
      companyId: company.id,
    });
  } catch (error: any) {
    console.error("WHOP ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Whop connection failed",
        status: error?.status,
      },
      { status: 500 }
    );
  }
}