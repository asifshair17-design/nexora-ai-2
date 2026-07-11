"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/browser";

export default function ProfilePage() {
  const [email, setEmail] = useState("");
const [joined, setJoined] = useState("");
useEffect(() => {
  loadUser();
}, []);

async function loadUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  setEmail(user.email || "");

  if (user.created_at) {
    setJoined(
      new Date(user.created_at).toLocaleDateString()
    );
  }
}
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white p-10">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-black mb-10">
          👤 My Profile
        </h1>

        <div className="rounded-3xl border border-gray-800 bg-gray-900/60 p-10">

          <div className="flex flex-col md:flex-row items-center gap-8">

            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-5xl font-bold">
              U
            </div>

            <div className="flex-1">

              <h2 className="text-3xl font-bold">
                User Name
              </h2>

              <p className="text-gray-400 mt-2">
  {email}
</p>

              <span className="inline-block mt-4 rounded-full bg-purple-600 px-5 py-2 font-semibold">
                Free Plan
              </span>

            </div>

          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">

            <div className="rounded-2xl bg-black/40 p-6 border border-gray-800">
              <p className="text-gray-400">
                Images Generated
              </p>

              <h3 className="text-2xl font-bold mt-3">
  {joined}
</h3>
            </div>

            <div className="rounded-2xl bg-black/40 p-6 border border-gray-800">
              <p className="text-gray-400">
                Favorite Images
              </p>

              <h3 className="text-4xl font-bold mt-3">
                0
              </h3>
            </div>

            <div className="rounded-2xl bg-black/40 p-6 border border-gray-800">
              <p className="text-gray-400">
                Member Since
              </p>

              <h3 className="text-2xl font-bold mt-3">
                2026
              </h3>
            </div>

          </div>

          <div className="mt-12 flex gap-4">

            <button className="rounded-xl bg-purple-600 px-8 py-4 font-bold hover:bg-purple-700 transition">
              Edit Profile
            </button>

            <button className="rounded-xl border border-gray-700 px-8 py-4 font-bold hover:bg-gray-800 transition">
              Upgrade to Pro
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}