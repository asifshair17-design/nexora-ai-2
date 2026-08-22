"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/browser";
import { getPlan } from "@/lib/plans/limits";

type Profile = {
  email: string | null;
  credits: number;
  plan: "free" | "pro";
};

export default function Topbar() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("email, credits, plan")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      console.error("Topbar profile error:", error.message);
      return;
    }

    if (data) {
      setProfile(data as Profile);
    }
  }

  const plan = getPlan(profile?.plan || "free");

  const displayName =
    profile?.email?.split("@")[0] || "User";

  return (
    <header className="sticky top-0 z-50 flex h-24 items-center justify-between border-b border-gray-800 bg-black/80 px-10 backdrop-blur-xl">

      {/* Left */}

      <div>
        <h2 className="text-3xl font-black">
          Welcome Back 👋
        </h2>

        <p className="mt-1 text-gray-400">
          Create amazing AI content today.
        </p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        {/* Credits */}

        <div className="rounded-2xl border border-gray-800 bg-gray-900 px-6 py-3">

          <p className="text-xs text-gray-500">
            Credits
          </p>

          <p className="text-xl font-bold text-yellow-400">
            ⭐ {profile?.credits ?? 0}
          </p>

        </div>

        {/* Plan */}

        <div className="rounded-2xl border border-gray-800 bg-gray-900 px-6 py-3">

          <p className="text-xs text-gray-500">
            Plan
          </p>

          <p className="text-xl font-bold text-purple-400">
            {plan.name}
          </p>

        </div>

        {/* Profile */}

        <Link href="/profile">

          <div className="flex cursor-pointer items-center gap-4 rounded-2xl bg-gray-900 px-5 py-3 transition hover:bg-gray-800">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-xl font-bold">
              {displayName.charAt(0).toUpperCase()}
            </div>

            <div>

              <p className="font-bold">
                {displayName}
              </p>

              <p className="text-sm text-gray-500">
                View Profile
              </p>

            </div>

          </div>

        </Link>

      </div>

    </header>
  );
}