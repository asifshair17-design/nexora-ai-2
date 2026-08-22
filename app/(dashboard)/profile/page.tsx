"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { supabase } from "@/lib/supabase/browser";
import { getPlan } from "@/lib/plans/limits";

type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  credits: number;
  plan: "free" | "pro";
  pro_expires_at: string | null;
};

export default function ProfilePage() {
  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [email, setEmail] =
    useState("");

  const [joined, setJoined] =
    useState("");

  const [imageCount, setImageCount] =
    useState(0);

  const [favoriteCount, setFavoriteCount] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    setEmail(user.email || "");

    if (user.created_at) {
      setJoined(
        new Date(
          user.created_at
        ).toLocaleDateString()
      );
    }

   const {
  data: profileData,
  error: profileError,
} = await supabase
  .from("profiles")
  .select("*")
  .eq("id", user.id)
  .limit(1)
  .maybeSingle();

if (profileError) {
  console.error("Profile error:", profileError.message);
}

if (profileData) {
  setProfile(profileData);
}
    const {
      count: totalImages,
      error: imagesError,
    } = await supabase
      .from("images")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id);

    if (imagesError) {
      console.error(
        "Images count error:",
        imagesError
      );
    }

    setImageCount(totalImages || 0);

    const {
      count: favorites,
      error: favoritesError,
    } = await supabase
      .from("images")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id)
      .eq("favorite", true);

    if (favoritesError) {
      console.error(
        "Favorites count error:",
        favoritesError
      );
    }

    setFavoriteCount(favorites || 0);

    setLoading(false);
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
      </main>
    );
  }

  const plan = getPlan(
    profile?.plan || "free"
  );

  return (
    <main className="min-h-screen bg-black p-10 text-white">


      <div className="mx-auto max-w-7xl">

        {/* Hero */}

        <div className="rounded-[36px] border border-purple-700/40 bg-gradient-to-r from-purple-900/20 via-gray-900 to-blue-900/20 p-10">

          <div className="flex flex-col items-center justify-between gap-10 lg:flex-row">

            <div className="flex items-center gap-8">

              <div className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.45)]">

                {profile?.avatar_url ? (
                  <Image
                    src={profile.avatar_url}
                    alt="Avatar"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600 text-6xl font-bold">
                    👤
                  </div>
                )}

              </div>

              <div>

                <p className="font-semibold text-purple-400">
                  Welcome Back
                </p>

                <h1 className="mt-2 text-5xl font-black">
                  {profile?.full_name || "User"}
                </h1>

                <p className="mt-3 text-lg text-gray-400">
                  {email}
                </p>

                <div className="mt-5 inline-flex rounded-full bg-purple-600 px-6 py-2 font-bold">
                  💎 {plan.name}
                </div>

              </div>

            </div>

            <Link href="/settings">
              <button className="rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-5 text-lg font-bold transition hover:scale-105">
                ⚙ Account Settings
              </button>
            </Link>

          </div>

        </div>

        {/* Statistics */}

        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-500/20">

            <p className="text-gray-400">
              🖼 Images Generated
            </p>

            <h2 className="mt-4 text-5xl font-black">
              {imageCount}
            </h2>

          </div>

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-500/20">

            <p className="text-gray-400">
              ❤️ Favorites
            </p>

            <h2 className="mt-4 text-5xl font-black">
              {favoriteCount}
            </h2>

          </div>

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-500/20">

            <p className="text-gray-400">
              ⭐ Credits
            </p>

            <h2 className="mt-4 text-5xl font-black text-yellow-400">
              {profile?.credits ?? 0}
            </h2>

          </div>

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-500/20">

            <p className="text-gray-400">
              📅 Member Since
            </p>

            <h2 className="mt-4 text-3xl font-bold">
              {joined}
            </h2>

          </div>

        </div>

        {/* Subscription */}

        <div className="mt-10 rounded-[36px] border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-10">

          <h2 className="text-3xl font-bold">
            Subscription
          </h2>

          {profile?.plan === "pro" ? (

            <div className="mt-6">

              <p className="text-xl font-bold text-green-400">
                ✅ Pro Membership Active
              </p>

              <p className="mt-4 text-gray-400">
                Expires:
              </p>

              <p className="text-lg font-semibold">
                {profile.pro_expires_at
                  ? new Date(
                      profile.pro_expires_at
                    ).toLocaleDateString()
                  : "-"}
              </p>

            </div>

          ) : (

            <div className="mt-6">

              <p className="text-lg text-gray-400">
                You're currently using the Free plan.
              </p>

              <Link href="/pricing">

                <button className="mt-8 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-5 text-lg font-bold transition hover:scale-105">
                  🚀 Upgrade to Pro
                </button>

              </Link>

            </div>

          )}

        </div>

        {/* Quick Actions */}

        <div className="mt-10 grid gap-6 md:grid-cols-3">

          <Link href="/gallery">

            <div className="cursor-pointer rounded-3xl border border-gray-800 bg-gray-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-500/20">

              <div className="text-5xl">
                🖼
              </div>

              <h3 className="mt-5 text-2xl font-bold">
                My Gallery
              </h3>

              <p className="mt-3 text-gray-400">
                View every AI image you've generated.
              </p>

            </div>

          </Link>

          <Link href="/dashboard">

            <div className="cursor-pointer rounded-3xl border border-gray-800 bg-gray-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-500/20">

              <div className="text-5xl">
                📊
              </div>

              <h3 className="mt-5 text-2xl font-bold">
                Dashboard
              </h3>

              <p className="mt-3 text-gray-400">
                Track your AI usage and credits.
              </p>

            </div>

          </Link>

          <Link href="/pricing">

            <div className="cursor-pointer rounded-3xl border border-gray-800 bg-gray-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-500/20">

              <div className="text-5xl">
                💎
              </div>

              <h3 className="mt-5 text-2xl font-bold">
                Pricing
              </h3>

              <p className="mt-3 text-gray-400">
                Upgrade your AI experience.
              </p>

            </div>

          </Link>

        </div>

      
        {/* Logout */}

        <div className="mt-12 flex justify-center">

          <button
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = "/";
            }}
            className="rounded-2xl bg-red-600 px-10 py-5 text-lg font-bold transition hover:scale-105 hover:bg-red-700"
          >
            🚪 Logout
          </button>

        </div>

      </div>

    </main>
  );
}