"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);

  async function sendMessage() {
    if (!prompt.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: prompt,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    const data = await res.json();

    setLoading(false);

    if (data.error) {
      alert(data.error);
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: data.reply,
      },
    ]);

    setPrompt("");
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <div className="mx-auto max-w-5xl">

        <h1 className="text-5xl font-black">
          💬 Nexora AI Chat
        </h1>

        <p className="mt-4 text-gray-400">
          Your personal AI assistant.
        </p>

        <div className="mt-10 h-[500px] overflow-y-auto rounded-3xl border border-gray-800 bg-gray-900 p-8">

          {messages.length === 0 ? (
            <p className="text-gray-500">
              Start chatting...
            </p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-6 ${
                  msg.role === "user"
                    ? "text-right"
                    : "text-left"
                }`}
              >
                <div
                  className={`inline-block max-w-xl rounded-2xl px-5 py-4 ${
                    msg.role === "user"
                      ? "bg-purple-600"
                      : "bg-gray-800"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))
          )}

        </div>

        <div className="mt-8 flex gap-4">

          <input
            value={prompt}
            onChange={(e) =>
              setPrompt(e.target.value)
            }
            placeholder="Ask anything..."
            className="flex-1 rounded-2xl border border-gray-700 bg-gray-900 px-6 py-4 outline-none focus:border-purple-500"
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 font-bold"
          >
            {loading ? "..." : "Send"}
          </button>

        </div>

      </div>

    </main>
  );
}