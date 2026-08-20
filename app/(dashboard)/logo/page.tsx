"use client";

import { useState } from "react";
import Image from "next/image";

export default function LogoPage() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Modern");
  const [loading, setLoading] = useState(false);
  const [logo, setLogo] = useState("");

  async function generateLogo() {
    if (!prompt) {
      alert("Please enter a logo prompt.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          style,
          size: "1024x1024",
          provider: "flux",
          type: "logo",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Generation failed"
        );
      }

      setLogo(data.image);

    } catch (error: any) {
      alert(error.message);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black p-10 text-white">

      <div className="mx-auto max-w-6xl">

        <h1 className="text-5xl font-black">
          🎨 AI Logo Generator
        </h1>

        <p className="mt-3 text-gray-400">
          Generate professional logos with AI.
        </p>

        <div className="mt-10 rounded-3xl border border-gray-800 bg-gray-900 p-8">

          <label className="font-semibold">
            Logo Prompt
          </label>

          <textarea
            className="mt-4 h-40 w-full rounded-2xl border border-gray-700 bg-black p-5 outline-none focus:border-purple-500"
            placeholder="Modern purple lion logo for gaming company"
            value={prompt}
            onChange={(e) =>
              setPrompt(e.target.value)
            }
          />

          <div className="mt-8">

            <label className="font-semibold">
              Style
            </label>

            <select
              value={style}
              onChange={(e) =>
                setStyle(e.target.value)
              }
              className="mt-3 w-full rounded-2xl border border-gray-700 bg-black p-4"
            >
              <option>Modern</option>
              <option>Minimal</option>
              <option>Luxury</option>
              <option>Gaming</option>
              <option>3D</option>
              <option>Corporate</option>
              <option>Flat</option>
            </select>

          </div>

          <button
            onClick={generateLogo}
            disabled={loading}
            className="mt-10 w-full rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 py-5 text-xl font-bold transition hover:scale-[1.02]"
          >
            {loading
              ? "Generating..."
              : "🎨 Generate Logo"}
          </button>

        </div>

        <div className="mt-12 rounded-3xl border border-gray-800 bg-gray-900 p-10">

          {loading ? (

            <div className="flex flex-col items-center">

              <div className="h-16 w-16 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />

              <p className="mt-5 text-gray-400">
                Creating your logo...
              </p>

            </div>

          ) : logo ? (

            <div className="flex flex-col items-center">

              <Image
                src={logo}
                alt="Generated Logo"
                width={500}
                height={500}
                className="rounded-3xl"
              />

              <a
                href={logo}
                download
                className="mt-8 rounded-2xl bg-green-600 px-8 py-4 font-bold hover:bg-green-700"
              >
                ⬇ Download Logo
              </a>

            </div>

          ) : (

            <div className="py-20 text-center">

              <div className="text-7xl">
                🎨
              </div>

              <h2 className="mt-6 text-3xl font-bold">
                Your Logo Will Appear Here
              </h2>

            </div>

          )}

        </div>

      </div>

    </main>
  );
}