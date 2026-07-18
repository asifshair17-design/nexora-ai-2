import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  if (user.email !== "asifshair25@gmail.com") {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  const { id, plan } = await req.json();
console.log("Updating user:", id);
console.log("New plan:", plan);
  let updateData: any = {
    plan,
  };

  if (plan === "pro") {
    const expiry = new Date();

    expiry.setDate(expiry.getDate() + 30);

    updateData.pro_expires_at = expiry.toISOString();
  } else {
    updateData.pro_expires_at = null;
  }

 const { data, error } = await supabase
  .from("profiles")
  .update(updateData)
  .eq("id", id)
  .select();

console.log("Update Data:", updateData);
console.log("Updated Row:", data);
console.log("Update Error:", error);
  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
  });
}