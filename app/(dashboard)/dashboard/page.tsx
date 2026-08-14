"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/browser";
import { getPlan } from "@/lib/plans/limits";

type Profile = {
  plan: string;
  credits: number;
  pro_expires_at: string | null;
};

type Activity = {
  id: string;
  prompt: string;
  created_at: string;
};

export default function DashboardPage() {
  const [imageCount, setImageCount] = useState(0);
  const [videoCount, setVideoCount] = useState(0);
  const [todayUsage, setTodayUsage] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);

  const plan = getPlan(profile?.plan === "pro" ? "pro" : "free");

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    // -------------------------
    // Profile
    // -------------------------

    const { data: profileData, error: profileError } =
      await supabase
        .from("profiles")
        .select("plan, credits, pro_expires_at")
        .eq("id", user.id)
        .single();

    if (profileError) {
      console.error("Profile error:", profileError);
    }

    if (profileData) {
      setProfile(profileData);
    }

    // -------------------------
    // Total Images
    // -------------------------

    const { count: imageTotal, error: imageError } =
      await supabase
        .from("images")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("user_id", user.id);

    if (imageError) {
      console.error("Image count error:", imageError);
    }

    setImageCount(imageTotal || 0);

    // -------------------------
    // Total Videos
    // -------------------------

    const { count: videoTotal, error: videoError } =
      await supabase
        .from("videos")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("user_id", user.id);

    if (videoError) {
      console.error("Video count error:", videoError);
    }

    setVideoCount(videoTotal || 0);

    // -------------------------
    // Today's Usage
    // -------------------------

    const startOfDay = new Date();

    startOfDay.setHours(0, 0, 0, 0);

    const { count: usageCount, error: usageError } =
      await supabase
        .from("usage")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("user_id", user.id)
        .gte("created_at", startOfDay.toISOString());

    if (usageError) {
      console.error("Usage error:", usageError);
    }

    setTodayUsage(usageCount || 0);

    // -------------------------
    // Favorite Images
    // -------------------------

    const { count: favorites, error: favoriteError } =
      await supabase
        .from("images")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("user_id", user.id)
        .eq("favorite", true);

    if (favoriteError) {
      console.error("Favorite error:", favoriteError);
    }

    setFavoriteCount(favorites || 0);

    // -------------------------
    // Recent Images
    // -------------------------

    const { data: recentImages, error: recentError } =
      await supabase
        .from("images")
        .select("id, prompt, created_at")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        })
        .limit(5);

    if (recentError) {
      console.error("Recent images error:", recentError);
    }

    setActivities(recentImages || []);
  }

  const usagePercentage =
    plan.dailyImages > 0
      ? Math.min(
          100,
          Math.round(
            (todayUsage / plan.dailyImages) * 100
          )
        )
      : 0;

  return (
    <div className="space-y-10">

      {/* =========================
          HEADER
      ========================== */}

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <p className="text-lg font-semibold text-purple-400">
            👋 Welcome Back
          </p>

          <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
            Nexora AI Dashboard
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-gray-400">
            Manage your AI creations, monitor credits,
            track usage, and create something amazing.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <Link
              href="/"
              className="rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-7 py-4 font-bold transition hover:scale-105"
            >
              ✨ Generate Image
            </Link>

            <Link
              href="/video"
              className="rounded-xl bg-blue-600 px-7 py-4 font-bold transition hover:bg-blue-700"
            >
              🎬 Generate Video
            </Link>

            <Link
              href="/pricing"
              className="rounded-xl border border-purple-500 px-7 py-4 font-bold transition hover:bg-purple-700/20"
            >
              💎 Upgrade
            </Link>

          </div>
        </div>

        <div className="hidden lg:flex">
          <div className="flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-7xl shadow-2xl shadow-purple-500/30">
            🤖
          </div>
        </div>

      </div>


      {/* =========================
          PLAN + CREDITS
      ========================== */}

      <div className="grid gap-6 md:grid-cols-2">

        {/* Plan */}

        <div className="rounded-3xl border border-gray-800 bg-gray-900/70 p-7">

          <p className="text-sm uppercase tracking-widest text-gray-500">
            Current Plan
          </p>

          <h2
            className={`mt-3 text-3xl font-black ${
              profile?.plan === "pro"
                ? "text-yellow-400"
                : "text-purple-400"
            }`}
          >
            {profile?.plan === "pro"
              ? "💎 PRO PLAN"
              : "🆓 FREE PLAN"}
          </h2>

          {profile?.plan === "pro" ? (
            <p className="mt-4 text-gray-400">
              You have access to unlimited AI
              generations.
            </p>
          ) : (
            <p className="mt-4 text-gray-400">
              Use your free credits to create AI
              images and videos.
            </p>
          )}

        </div>


        {/* Credits */}

        <div className="rounded-3xl border border-purple-800/50 bg-gradient-to-br from-purple-900/30 to-blue-900/20 p-7">

          <p className="text-sm uppercase tracking-widest text-gray-500">
            Available Credits
          </p>

          <h2 className="mt-3 text-4xl font-black text-yellow-400">
            {profile?.credits ?? 0}
          </h2>

          <p className="mt-2 text-gray-400">
            Credits available for AI tools
          </p>

        </div>

      </div>


      {/* =========================
          STAT CARDS
      ========================== */}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

        {/* Images */}

        <div className="rounded-3xl border border-gray-800 bg-gray-900/60 p-6">

          <div className="text-4xl">
            🖼️
          </div>

          <p className="mt-4 text-gray-400">
            Images Generated
          </p>

          <h3 className="mt-2 text-4xl font-black">
            {imageCount}
          </h3>

        </div>


        {/* Videos */}

        <div className="rounded-3xl border border-gray-800 bg-gray-900/60 p-6">

          <div className="text-4xl">
            🎬
          </div>

          <p className="mt-4 text-gray-400">
            Videos Generated
          </p>

          <h3 className="mt-2 text-4xl font-black">
            {videoCount}
          </h3>

        </div>


        {/* Favorites */}

        <div className="rounded-3xl border border-gray-800 bg-gray-900/60 p-6">

          <div className="text-4xl">
            ❤️
          </div>

          <p className="mt-4 text-gray-400">
            Favorite Images
          </p>

          <h3 className="mt-2 text-4xl font-black">
            {favoriteCount}
          </h3>

        </div>


        {/* Usage */}

        <div className="rounded-3xl border border-gray-800 bg-gray-900/60 p-6">

          <div className="text-4xl">
            📊
          </div>

          <p className="mt-4 text-gray-400">
            Used Today
          </p>

          <h3 className="mt-2 text-4xl font-black">
            {todayUsage}
          </h3>

        </div>

      </div>


      {/* =========================
          DAILY USAGE
      ========================== */}

      <div className="rounded-3xl border border-gray-800 bg-gray-900/60 p-7">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              📊 Daily Usage
            </h2>

            <p className="mt-2 text-gray-400">
              {todayUsage} of{" "}
              {profile?.plan === "pro"
                ? "∞"
                : plan.dailyImages}{" "}
              daily image generations used
            </p>

          </div>

          <span className="font-bold text-purple-400">
            {profile?.plan === "pro"
              ? "Unlimited"
              : `${usagePercentage}%`}
          </span>

        </div>

        {profile?.plan !== "pro" && (
          <div className="mt-6 h-4 overflow-hidden rounded-full bg-gray-800">

            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
              style={{
                width: `${usagePercentage}%`,
              }}
            />

          </div>
        )}

      </div>


      {/* =========================
          RECENT ACTIVITY
      ========================== */}

      <div className="rounded-3xl border border-gray-800 bg-gray-900/60 p-7">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              🕘 Recent Activity
            </h2>

            <p className="mt-2 text-gray-400">
              Your latest AI image creations.
            </p>

          </div>

          <Link
            href="/"
            className="text-sm font-semibold text-purple-400 hover:text-purple-300"
          >
            Create →
          </Link>

        </div>


        <div className="mt-6">

          {activities.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-gray-700 p-10 text-center">

              <div className="text-5xl">
                🎨
              </div>

              <h3 className="mt-4 text-xl font-bold">
                No recent activity
              </h3>

              <p className="mt-2 text-gray-500">
                Generate your first AI image to see
                it here.
              </p>

            </div>

          ) : (

            <div className="space-y-3">

              {activities.map((activity) => (

                <div
                  key={activity.id}
                  className="flex items-center justify-between gap-5 rounded-2xl border border-gray-800 bg-black/40 p-5"
                >

                  <div className="flex min-w-0 items-center gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-600/20 text-2xl">
                      🖼️
                    </div>

                    <div className="min-w-0">

                      <p className="font-semibold">
                        Generated Image
                      </p>

                      <p className="mt-1 truncate text-sm text-gray-500">
                        {activity.prompt}
                      </p>

                    </div>

                  </div>

                  <span className="shrink-0 text-sm text-gray-500">
                    {new Date(
                      activity.created_at
                    ).toLocaleDateString()}
                  </span>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>


      {/* =========================
          QUICK ACTIONS
      ========================== */}

      <div>

        <h2 className="text-3xl font-bold">
          🚀 Quick Actions
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-3">

          <Link
            href="/"
            className="rounded-3xl border border-gray-800 bg-gray-900/60 p-7 transition hover:-translate-y-1 hover:border-purple-500"
          >
            <div className="text-4xl">
              🎨
            </div>

            <h3 className="mt-4 text-xl font-bold">
              Create Image
            </h3>

            <p className="mt-2 text-gray-400">
              Turn a prompt into an AI image.
            </p>
          </Link>


          <Link
            href="/video"
            className="rounded-3xl border border-gray-800 bg-gray-900/60 p-7 transition hover:-translate-y-1 hover:border-blue-500"
          >
            <div className="text-4xl">
              🎬
            </div>

            <h3 className="mt-4 text-xl font-bold">
              Create Video
            </h3>

            <p className="mt-2 text-gray-400">
              Create cinematic AI video content.
            </p>
          </Link>


          <Link
            href="/pricing"
            className="rounded-3xl border border-gray-800 bg-gray-900/60 p-7 transition hover:-translate-y-1 hover:border-yellow-500"
          >
            <div className="text-4xl">
              💎
            </div>

            <h3 className="mt-4 text-xl font-bold">
              Upgrade Plan
            </h3>

            <p className="mt-2 text-gray-400">
              Get more credits and premium features.
            </p>
          </Link>

        </div>

      </div>

    </div>
  );
}