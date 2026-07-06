"use client";

import { useState } from "react";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import PromptBox from "./components/PromptBox";

export default function Home() {
  const [prompt, setPrompt] = useState("");

  return (
    <>
      <Navbar />

      <div className="flex">

        <Sidebar />

        <main className="flex-1 min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white p-10">

          <div className="text-center mt-10">

            <span className="px-4 py-2 rounded-full bg-purple-900/40 border border-purple-700 text-purple-300">
              ✨ AI Powered Creative Platform
            </span>

            <h1 className="mt-8 text-6xl font-extrabold">
              Create Amazing
              <br />

              <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                AI Images
              </span>

            </h1>

            <p className="mt-6 text-gray-400 text-lg">
              Turn your imagination into stunning artwork in seconds.
            </p>

          </div>

          <div className="flex justify-center mt-16">

            <PromptBox
              prompt={prompt}
              setPrompt={setPrompt}
            />

          </div>

        </main>

      </div>

    </>
  );
}