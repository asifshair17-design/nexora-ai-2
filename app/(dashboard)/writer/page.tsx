"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/browser";
import toast from "react-hot-toast";

export default function WriterPage() {
  const [prompt, setPrompt] = useState("");
  const [type, setType] = useState("Blog");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState("");

  const [credits, setCredits] = useState(0);
  const [plan, setPlan] = useState("free");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("credits, plan")
      .eq("id", user.id)
      .single();

    if (data) {
      setCredits(data.credits);
      setPlan(data.plan);
    }
  }

  async function generateText() {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("Please login first.");
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("credits, plan")
        .eq("id", user.id)
        .single();

      if (!profile) {
        toast.error("Profile not found.");
        setLoading(false);
        return;
      }

      if (
        profile.plan !== "pro" &&
        profile.credits < 1
      ) {
        toast.error(
          "You have no credits left."
        );
        setLoading(false);
        return;
      }

      const res = await fetch(
        "/api/generate-text",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            prompt,
            type,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error);
        setLoading(false);
        return;
      }

      setResult(data.text);
            if (profile.plan !== "pro") {
        const newCredits = profile.credits - 1;

        await supabase
          .from("profiles")
          .update({
            credits: newCredits,
          })
          .eq("id", user.id);

        setCredits(newCredits);
      }

      await supabase.from("documents").insert({
        user_id: user.id,
        prompt,
        content: data.text,
        type,
      });

      toast.success("Content generated successfully!");

    } catch (err) {
      console.error(err);
      toast.error("Failed to generate content.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="mx-auto max-w-5xl">

        <h1 className="text-5xl font-black">
          ✍ AI Writer
        </h1>

        <p className="mt-4 text-gray-400">
          Generate blogs, captions, scripts and more.
        </p>

        <div className="mt-6 rounded-2xl border border-purple-700 bg-gray-900 p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-400">
                Current Plan
              </p>

              <h2 className="text-2xl font-bold text-purple-400">
                {plan === "pro"
                  ? "💎 PRO"
                  : "🆓 FREE"}
              </h2>

            </div>

            <div>

              <p className="text-gray-400">
                Credits
              </p>

              <h2 className="text-4xl font-black text-yellow-400">
                {credits}
              </h2>

            </div>

          </div>

        </div>

        <div className="mt-10 rounded-3xl border border-gray-800 bg-gray-900 p-8">

          <label className="font-bold">
            Content Type
          </label>

          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value)
            }
            className="mt-3 w-full rounded-xl border border-gray-700 bg-black p-4"
          >
            <option>Blog</option>
            <option>YouTube Script</option>
            <option>TikTok Script</option>
            <option>Instagram Caption</option>
            <option>Product Description</option>
            <option>Email</option>
          </select>

          <textarea
            rows={7}
            value={prompt}
            onChange={(e) =>
              setPrompt(e.target.value)
            }
            placeholder="Describe what you want..."
            className="mt-6 w-full rounded-2xl border border-gray-700 bg-black p-5"
          />

          <button
            onClick={generateText}
            disabled={loading}
            className="mt-8 w-full rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 py-5 text-xl font-bold"
          >
            {loading
              ? "Generating..."
              : "Generate AI Content"}
          </button>

        </div>
                {result && (
          <div className="mt-10 rounded-3xl border border-gray-800 bg-gray-900 p-8">

            <div className="flex items-center justify-between">

              <h2 className="text-2xl font-bold">
                📄 Generated Content
              </h2>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(result);
                  toast.success("Copied!");
                }}
                className="rounded-xl bg-purple-600 px-5 py-3 font-bold hover:bg-purple-700"
              >
                📋 Copy
              </button>

            </div>

            <pre className="mt-6 whitespace-pre-wrap font-sans text-gray-300">
              {result}
            </pre>

          </div>
        )}

        <div className="mt-10 rounded-3xl border border-purple-800 bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-8">

          <h2 className="text-2xl font-bold">
            💳 Credit Usage
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-3">

            <div className="rounded-2xl bg-black p-6">
              <p className="text-gray-400">
                Writer Cost
              </p>

              <h3 className="mt-3 text-4xl font-black text-red-400">
                1 Credit
              </h3>
            </div>

            <div className="rounded-2xl bg-black p-6">
              <p className="text-gray-400">
                Remaining Credits
              </p>

              <h3 className="mt-3 text-4xl font-black text-yellow-400">
                {credits}
              </h3>
            </div>

            <div className="rounded-2xl bg-black p-6">
              <p className="text-gray-400">
                Pro Members
              </p>

              <h3 className="mt-3 text-3xl font-black text-green-400">
                Unlimited
              </h3>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}