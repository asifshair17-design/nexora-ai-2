"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/browser";

export default function SettingsPage() {
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("free");

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    setEmail(user.email || "");

    const { data } = await supabase
      .from("profiles")
      .select("plan")
      .eq("id", user.id)
      .single();

    if (data) {
      setPlan(data.plan);
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold mb-10">
        Settings
      </h1>

      <div className="max-w-3xl space-y-6">

        <div className="rounded-3xl bg-gray-900 border border-gray-800 p-8">
          <h2 className="text-gray-400 mb-2">
            Email
          </h2>

          <p className="text-xl font-semibold">
            {email}
          </p>
        </div>

        <div className="rounded-3xl bg-gray-900 border border-gray-800 p-8">
          <h2 className="text-gray-400 mb-2">
            Current Plan
          </h2>

          <p className="text-3xl font-bold text-purple-400 capitalize">
            {plan}
          </p>
        </div>

        <button
          onClick={logout}
          className="rounded-xl bg-red-600 px-8 py-4 font-bold hover:bg-red-700 transition"
        >
          Logout
        </button>

      </div>
    </main>
  );
}