"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/browser";

type RevenueStats = {
  totalRevenue: number;
  proUsers: number;
  freeUsers: number;
  totalUsers: number;
};

export default function RevenuePage() {
  const [stats, setStats] = useState<RevenueStats>({
    totalRevenue: 0,
    proUsers: 0,
    freeUsers: 0,
    totalUsers: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRevenue();
  }, []);

  async function loadRevenue() {
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      /*
       * For now we calculate users from the profiles table.
       *
       * Real payment/revenue tracking will be connected
       * when we finish the Stripe/Whop billing system.
       */

      const { data: profiles, error } = await supabase
        .from("profiles")
        .select("plan");

      if (error) {
        console.error("Revenue profile error:", error);
        return;
      }

      const allProfiles = profiles || [];

      const proUsers = allProfiles.filter(
        (profile) => profile.plan === "pro"
      ).length;

      const freeUsers = allProfiles.filter(
        (profile) => profile.plan !== "pro"
      ).length;

      setStats({
        totalRevenue: 0,
        proUsers,
        freeUsers,
        totalUsers: allProfiles.length,
      });
    } catch (error) {
      console.error("Revenue analytics error:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black p-8 text-white">
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />

            <p className="mt-6 text-xl font-semibold text-gray-300">
              Loading revenue...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black p-6 text-white md:p-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-10">
          <div className="inline-flex items-center gap-3 rounded-full border border-green-700 bg-green-900/20 px-5 py-2 text-green-300">
            💰 Revenue
          </div>

          <h1 className="mt-6 text-4xl font-black md:text-5xl">
            Revenue Analytics
          </h1>

          <p className="mt-4 text-lg text-gray-400">
            Monitor Nexora AI subscriptions and revenue.
          </p>
        </div>

        {/* Main Revenue Card */}

        <div className="rounded-3xl border border-green-700 bg-gradient-to-r from-green-900/40 to-emerald-900/20 p-8">

          <p className="text-lg text-gray-300">
            Total Revenue
          </p>

          <h2 className="mt-4 text-6xl font-black text-green-400">
            ${stats.totalRevenue.toFixed(2)}
          </h2>

          <p className="mt-4 text-gray-400">
            Payment tracking will be connected to your
            billing system later.
          </p>

        </div>

        {/* User Stats */}

        <div className="mt-10 grid gap-6 md:grid-cols-3">

          {/* Total Users */}

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-8">

            <p className="text-gray-400">
              👥 Total Users
            </p>

            <h2 className="mt-4 text-5xl font-black">
              {stats.totalUsers}
            </h2>

          </div>

          {/* Pro Users */}

          <div className="rounded-3xl border border-purple-700 bg-purple-900/20 p-8">

            <p className="text-purple-300">
              💎 Pro Users
            </p>

            <h2 className="mt-4 text-5xl font-black text-purple-400">
              {stats.proUsers}
            </h2>

          </div>

          {/* Free Users */}

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-8">

            <p className="text-gray-400">
              🆓 Free Users
            </p>

            <h2 className="mt-4 text-5xl font-black">
              {stats.freeUsers}
            </h2>

          </div>

        </div>

        {/* Revenue Information */}

        <div className="mt-10 grid gap-8 lg:grid-cols-2">

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-8">

            <div className="text-5xl">
              💳
            </div>

            <h2 className="mt-6 text-2xl font-bold">
              Subscription Revenue
            </h2>

            <p className="mt-4 text-gray-400">
              Your Pro subscription revenue will appear
              here once payment tracking is connected.
            </p>

            <div className="mt-8 rounded-2xl bg-black/40 p-6">

              <p className="text-gray-500">
                Current Pro Users
              </p>

              <p className="mt-2 text-3xl font-black text-purple-400">
                {stats.proUsers}
              </p>

            </div>

          </div>

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-8">

            <div className="text-5xl">
              📈
            </div>

            <h2 className="mt-6 text-2xl font-bold">
              Monthly Revenue
            </h2>

            <p className="mt-4 text-gray-400">
              Monthly revenue charts will be added when
              Stripe/Whop payment data is connected.
            </p>

            <div className="mt-8 rounded-2xl bg-black/40 p-6">

              <p className="text-gray-500">
                Revenue Tracking
              </p>

              <p className="mt-2 text-2xl font-black text-yellow-400">
                Coming Soon
              </p>

            </div>

          </div>

        </div>

        {/* Status */}

        <div className="mt-10 rounded-3xl border border-gray-800 bg-gradient-to-r from-purple-900/20 via-gray-900 to-green-900/20 p-8">

          <h2 className="text-3xl font-bold">
            🚀 Billing Status
          </h2>

          <div className="mt-6 rounded-2xl bg-black/40 p-6">

            <p className="text-gray-400">
              Revenue system
            </p>

            <h3 className="mt-2 text-2xl font-bold text-yellow-400">
              Payment tracking pending
            </h3>

            <p className="mt-3 text-gray-500">
              We will connect the real payment data after
              the Analytics pages are finished.
            </p>

          </div>

        </div>

      </div>
    </main>
  );
}