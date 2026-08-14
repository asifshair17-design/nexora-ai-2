"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/browser";
import toast from "react-hot-toast";

export default function VideoPage() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Cinematic");
  const [duration, setDuration] = useState("5");
  const [resolution, setResolution] = useState("720p");

  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const [credits, setCredits] = useState(0);

  async function generateVideo() {
    if (!prompt.trim()) return;

    setLoading(true);
    setVideoUrl("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("Please login first.");
        setLoading(false);
        return;
      }

      const { data: profile, error: profileError } =
        await supabase
          .from("profiles")
          .select("credits, plan")
          .eq("id", user.id)
          .single();

      if (profileError || !profile) {
        toast.error("Profile not found.");
        setLoading(false);
        return;
      }

      if (
        profile.plan !== "pro" &&
        profile.credits < 5
      ) {
        toast.error(
          "You need at least 5 credits to generate a video."
        );
        setLoading(false);
        return;
      }

      const res = await fetch("/api/generate-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          style,
          duration,
          resolution,
        }),
      });

     const data = await res.json();

console.log("Response status:", res.status);
console.log("Response data:", data);

      if (!res.ok) {
        toast.error(data.error || "Generation failed");
        setLoading(false);
        return;
      }

      setVideoUrl(data.video);

      if (profile.plan !== "pro") {
        const newCredits = profile.credits - 5;

        await supabase
          .from("profiles")
          .update({
            credits: newCredits,
          })
          .eq("id", user.id);

        setCredits(newCredits);
      }

      toast.success("Video generated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate video.");
    } finally {
      setLoading(false);
    }
  }
    return (
    <main className="min-h-screen bg-black text-white px-10 py-8">
      <div className="mx-auto max-w-7xl">

        <h1 className="mb-3 text-5xl font-black">
          🎬 AI Video Generator
        </h1>

        <p className="mb-10 text-gray-400">
          Turn your ideas into cinematic AI videos.
        </p>

        <div className="rounded-3xl border border-gray-800 bg-gray-900 p-8">

          <textarea
            rows={6}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your video..."
            className="w-full rounded-2xl border border-gray-700 bg-black p-5"
          />

          <div className="mt-8 grid gap-6 md:grid-cols-3">

            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="rounded-xl border border-gray-700 bg-black p-4"
            >
              <option>Cinematic</option>
              <option>Anime</option>
              <option>Realistic</option>
              <option>Fantasy</option>
            </select>

            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="rounded-xl border border-gray-700 bg-black p-4"
            >
              <option value="5">5 Seconds</option>
              <option value="10">10 Seconds</option>
              <option value="15">15 Seconds</option>
            </select>

            <select
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              className="rounded-xl border border-gray-700 bg-black p-4"
            >
              <option>720p</option>
              <option>1080p</option>
            </select>

          </div>

          <button
            onClick={generateVideo}
            disabled={loading}
            className="mt-8 w-full rounded-2xl bg-purple-600 py-5 text-xl font-bold transition hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? "Generating..." : "🎬 Generate Video"}
          </button>

        </div>

        <div className="mt-12 rounded-3xl border border-gray-800 bg-gray-900 p-8">

          {loading ? (

            <div className="text-center">

              <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />

              <p className="mt-6">
                Creating your AI video...
              </p>

            </div>

          ) : videoUrl ? (

            <div>

              <video
                controls
                autoPlay
                className="w-full rounded-3xl"
              >
                <source
                  src={videoUrl}
                  type="video/mp4"
                />
              </video>

              <a
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block rounded-xl bg-green-600 px-8 py-4 font-bold transition hover:bg-green-700"
              >
                ⬇ Open / Download Video
              </a>

            </div>

          ) : (
                        <div className="py-20 text-center">

              <div className="text-7xl">
                🎬
              </div>

              <h2 className="mt-6 text-3xl font-bold">
                No Video Yet
              </h2>

              <p className="mt-3 text-gray-400">
                Generate your first AI video.
              </p>

            </div>

          )}

        </div>

        {/* Credits Info */}

        <div className="mt-10 rounded-3xl border border-purple-800 bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-8">

          <h2 className="text-2xl font-bold">
            💳 Credit Usage
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-3">

            <div className="rounded-2xl bg-black p-6">
              <p className="text-gray-400">
                Video Cost
              </p>

              <h3 className="mt-3 text-4xl font-black text-red-400">
                5 Credits
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
                Pro Plan
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