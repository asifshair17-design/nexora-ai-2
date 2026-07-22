"use client";

import { toast } from "sonner";
import { useState } from "react";
import { supabase } from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (!email || !password) {
      toast.error("Please fill all fields.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    // Send welcome email
    await fetch("/api/send-welcome-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    // Show success message
    toast.success("🎉 Account created successfully!");

    // Wait before redirect so user can see the toast
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-3xl p-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Create Account
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 rounded-xl bg-black border border-gray-700 p-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 rounded-xl bg-black border border-gray-700 p-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full rounded-xl bg-purple-600 py-4 font-bold hover:bg-purple-700 disabled:opacity-50 transition"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-purple-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}