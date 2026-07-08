"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      checkUser();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setLoggedIn(!!user);
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <nav className="w-full h-16 border-b border-gray-800 bg-black flex items-center justify-between px-8">
      <Link
        href="/"
        className="text-2xl font-bold text-purple-500"
      >
        Nexora AI
      </Link>

      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="px-5 py-2 rounded-xl border border-gray-700 hover:bg-gray-800 transition"
        >
          Home
        </Link>

        <Link
          href="/pricing"
          className="px-5 py-2 rounded-xl border border-gray-700 hover:bg-gray-800 transition"
        >
          Pricing
        </Link>

        {loggedIn ? (
          <>
            <Link
              href="/dashboard"
              className="px-5 py-2 rounded-xl border border-gray-700 hover:bg-gray-800 transition"
            >
              Dashboard
            </Link>

            <button
              onClick={logout}
              className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="px-5 py-2 rounded-xl border border-gray-700 hover:bg-gray-800 transition"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}