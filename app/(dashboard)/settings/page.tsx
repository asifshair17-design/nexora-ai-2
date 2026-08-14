"use client";

import { useEffect, useState } from "react";
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

export default function SettingsPage() {
  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [email, setEmail] =
    useState("");

  const [fullName, setFullName] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    setEmail(user.email || "");

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (data) {
      setProfile(data);
      setFullName(data.full_name || "");
    }
  }

  async function saveProfile() {
    if (!profile) return;

    setSaving(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
      })
      .eq("id", profile.id);

    setSaving(false);

    if (!error) {
      alert("Profile updated successfully!");
    } else {
      alert("Something went wrong.");
    }
  }

  async function changePassword() {
    if (!password) return;

    const { error } =
      await supabase.auth.updateUser({
        password,
      });

    if (!error) {
      alert("Password updated!");
      setPassword("");
    } else {
      alert(error.message);
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  const plan = getPlan(
    profile?.plan || "free"
  );

  return (
<main className=" min-h-screen bg-black text-white p-10">

      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-10 flex items-center justify-between">

          <div>

            <h1 className="text-5xl font-black">
              ⚙ Account Settings
            </h1>

            <p className="mt-3 text-lg text-gray-400">
              Manage your Nexora AI account.
            </p>

          </div>

          <Link href="/profile">
            <button className="rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 font-bold transition hover:scale-105">
              👤 Back to Profile
            </button>
          </Link>

        </div>

        {/* Grid */}

        <div className="grid gap-8 lg:grid-cols-2">
                    {/* Profile Information */}

          <div className="rounded-[32px] border border-gray-800 bg-gray-900 p-8">

            <h2 className="text-3xl font-bold">
              👤 Profile Information
            </h2>

            <div className="mt-8 space-y-6">

              <div>

                <label className="mb-2 block text-gray-400">
                  Full Name
                </label>

                <input
                  value={fullName}
                  onChange={(e) =>
                    setFullName(e.target.value)
                  }
                  placeholder="Your name"
                  className="w-full rounded-2xl border border-gray-700 bg-black px-5 py-4 outline-none transition focus:border-purple-500"
                />

              </div>

              <div>

                <label className="mb-2 block text-gray-400">
                  Email
                </label>

                <input
                  value={email}
                  disabled
                  className="w-full cursor-not-allowed rounded-2xl border border-gray-700 bg-gray-800 px-5 py-4 text-gray-400"
                />

              </div>

              <button
                onClick={saveProfile}
                disabled={saving}
                className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 py-4 text-lg font-bold transition hover:scale-105"
              >
                {saving
                  ? "Saving..."
                  : "💾 Save Changes"}
              </button>

            </div>

          </div>

          {/* Account & Security */}

          <div className="space-y-8">

            {/* Subscription */}

            <div className="rounded-[32px] border border-gray-800 bg-gray-900 p-8">

              <h2 className="text-3xl font-bold">
                💎 Subscription
              </h2>

              <div className="mt-8">

                <p className="text-gray-400">
                  Current Plan
                </p>

                <h3 className="mt-3 text-4xl font-black text-purple-400">
                  {plan.name}
                </h3>

                <p className="mt-6 text-gray-400">
                  Remaining Credits
                </p>

                <h3 className="mt-2 text-5xl font-black text-yellow-400">
                  {profile?.credits ?? 0}
                </h3>

                <Link href="/pricing">

                  <button className="mt-8 w-full rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 py-4 text-lg font-bold transition hover:scale-105">
                    🚀 Upgrade Plan
                  </button>

                </Link>

              </div>

            </div>

            {/* Password */}

            <div className="rounded-[32px] border border-gray-800 bg-gray-900 p-8">

              <h2 className="text-3xl font-bold">
                🔒 Change Password
              </h2>

              <div className="mt-8">

                <input
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="New Password"
                  className="w-full rounded-2xl border border-gray-700 bg-black px-5 py-4 outline-none transition focus:border-purple-500"
                />

                <button
                  onClick={changePassword}
                  className="mt-6 w-full rounded-2xl bg-green-600 py-4 text-lg font-bold transition hover:scale-105 hover:bg-green-700"
                >
                  🔑 Update Password
                </button>

              </div>

            </div>
                        {/* Logout */}

            <div className="rounded-[32px] border border-red-800 bg-red-950/20 p-8">

              <h2 className="text-3xl font-bold text-red-400">
                🚪 Logout
              </h2>

              <p className="mt-4 text-gray-400">
                Sign out from your Nexora AI account.
              </p>

              <button
                onClick={logout}
                className="mt-8 w-full rounded-2xl bg-red-600 py-4 text-lg font-bold transition hover:scale-105 hover:bg-red-700"
              >
                Logout
              </button>

            </div>

            {/* Danger Zone */}

            <div className="rounded-[32px] border border-red-900 bg-black p-8">

              <h2 className="text-3xl font-bold text-red-500">
                ⚠ Danger Zone
              </h2>

              <p className="mt-5 text-gray-400 leading-7">
                Deleting your account will permanently remove:
              </p>

              <ul className="mt-5 space-y-3 text-gray-300">

                <li>• Your AI Images</li>

                <li>• Favorites</li>

                <li>• Credits</li>

                <li>• Subscription History</li>

                <li>• Account Information</li>

              </ul>

              <button
                onClick={() => {
                  alert(
                    "Delete Account feature will be enabled after payment integration."
                  );
                }}
                className="mt-8 w-full rounded-2xl border border-red-700 py-4 text-lg font-bold text-red-400 transition hover:bg-red-900/30"
              >
                🗑 Delete Account
              </button>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}