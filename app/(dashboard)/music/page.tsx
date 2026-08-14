"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function MusicPage() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Cinematic");
  const [mood, setMood] = useState("Epic");
  const [duration, setDuration] = useState("30");

  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");

  async function generateMusic() {
    if (!prompt.trim()) {
      toast.error("Please describe the music you want.");
      return;
    }

    setLoading(true);
    setAudioUrl("");

    try {
      const response = await fetch("/api/generate-music", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          style,
          mood,
          duration,
        }),
      });

      const data = await response.json();

      console.log("Music API response:", data);

      if (!response.ok) {
        throw new Error(
          data.error || "Music generation failed."
        );
      }

      if (data.audio) {
        setAudioUrl(data.audio);
      }

      toast.success(
        data.message || "Music request completed."
      );
    } catch (error) {
      console.error("Music generation error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Music generation failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-10 text-center">

          <span className="inline-block rounded-full border border-purple-700 bg-purple-900/30 px-4 py-2 text-sm text-purple-300">
            🎵 AI Powered Music
          </span>

          <h1 className="mt-6 text-5xl font-black md:text-6xl">
            Create
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              {" "}AI Music
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
            Turn your ideas into original AI-generated music,
            soundtracks and melodies.
          </p>

        </div>

        {/* Generator */}
        <div className="rounded-3xl border border-gray-800 bg-gray-900/70 p-6 shadow-2xl md:p-8">

          <label className="mb-3 block text-lg font-bold">
            🎼 Describe Your Music
          </label>

          <textarea
            rows={6}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: Epic cinematic music for a futuristic space mission..."
            className="w-full resize-none rounded-2xl border border-gray-700 bg-black p-5 text-white outline-none transition focus:border-purple-500"
          />

          {/* Controls */}
          <div className="mt-8 grid gap-6 md:grid-cols-3">

            {/* Style */}
            <div>
              <label className="mb-3 block font-semibold">
                🎹 Music Style
              </label>

              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none"
              >
                <option>Cinematic</option>
                <option>Pop</option>
                <option>Rock</option>
                <option>Hip Hop</option>
                <option>Electronic</option>
                <option>Classical</option>
                <option>Ambient</option>
                <option>Lo-Fi</option>
                <option>Jazz</option>
                <option>Orchestral</option>
              </select>
            </div>

            {/* Mood */}
            <div>
              <label className="mb-3 block font-semibold">
                🎭 Mood
              </label>

              <select
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none"
              >
                <option>Epic</option>
                <option>Happy</option>
                <option>Sad</option>
                <option>Relaxing</option>
                <option>Dark</option>
                <option>Energetic</option>
                <option>Romantic</option>
                <option>Mysterious</option>
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="mb-3 block font-semibold">
                ⏱️ Duration
              </label>

              <select
                value={duration}
                onChange={(e) =>
                  setDuration(e.target.value)
                }
                className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none"
              >
                <option value="15">
                  15 Seconds
                </option>

                <option value="30">
                  30 Seconds
                </option>

                <option value="60">
                  1 Minute
                </option>

                <option value="120">
                  2 Minutes
                </option>
              </select>
            </div>

          </div>

          {/* Generate Button */}
          <button
            onClick={generateMusic}
            disabled={loading}
            className="mt-8 w-full rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 py-5 text-xl font-bold transition hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">

                <span className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />

                Creating Music...

              </span>
            ) : (
              "✨ Generate Music"
            )}
          </button>

        </div>

        {/* Result */}
        <div className="mt-10 rounded-3xl border border-gray-800 bg-gray-900/70 p-8">

          {loading ? (

            <div className="py-16 text-center">

              <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />

              <h2 className="mt-6 text-2xl font-bold">
                🎵 Creating your music...
              </h2>

              <p className="mt-3 text-gray-400">
                AI is composing your track.
              </p>

            </div>

          ) : audioUrl ? (

            <div>

              <h2 className="mb-6 text-2xl font-bold">
                🎧 Your Music
              </h2>

              <audio
                controls
                className="w-full"
                src={audioUrl}
              />

              <a
                href={audioUrl}
                download
                className="mt-6 inline-block rounded-xl bg-green-600 px-8 py-4 font-bold transition hover:bg-green-700"
              >
                ⬇️ Download Music
              </a>

            </div>

          ) : (

            <div className="py-16 text-center">

              <div className="text-7xl">
                🎵
              </div>

              <h2 className="mt-6 text-3xl font-bold">
                No Music Yet
              </h2>

              <p className="mt-3 text-gray-400">
                Describe the music you want and generate
                your first track.
              </p>

            </div>

          )}

        </div>

        {/* Info */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">

            <div className="text-4xl">
              🎼
            </div>

            <h3 className="mt-4 text-xl font-bold">
              Original Music
            </h3>

            <p className="mt-2 text-gray-400">
              Create unique tracks from your own ideas.
            </p>

          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">

            <div className="text-4xl">
              🎹
            </div>

            <h3 className="mt-4 text-xl font-bold">
              Multiple Styles
            </h3>

            <p className="mt-2 text-gray-400">
              Choose cinematic, pop, electronic,
              classical and more.
            </p>

          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">

            <div className="text-4xl">
              ⚡
            </div>

            <h3 className="mt-4 text-xl font-bold">
              Easy Creation
            </h3>

            <p className="mt-2 text-gray-400">
              Describe your idea and let AI compose it.
            </p>

          </div>

        </div>

      </div>
    </main>
  );
}