"use client";

import { useState } from "react";

type HistoryCardProps = {
  id: string;
  image: string;
  prompt: string;
  favorite: boolean;
  onDelete: (id: string) => void;
  onFavorite: (
    id: string,
    favorite: boolean
  ) => void;
};

export default function HistoryCard({
  id,
  image,
  prompt,
  favorite,
  onDelete,
  onFavorite,
}: HistoryCardProps) {
  const [previewOpen, setPreviewOpen] = useState(false);
  async function copyPrompt() {
    await navigator.clipboard.writeText(prompt);
    alert("Prompt copied!");
  }

  return (
   <div className="relative rounded-2xl overflow-hidden bg-gray-900 border border-gray-800">

     <img
  src={image}
  alt={prompt}
  onClick={() => setPreviewOpen(true)}
  className="w-full aspect-square object-cover cursor-pointer hover:scale-105 transition duration-300"
/>
      <div className="p-4">

        <p className="text-sm text-gray-400 line-clamp-2 mb-4">
          {prompt}
        </p>

        <div className="flex gap-2">

          <button
            onClick={() => onFavorite(id, favorite)}
            className="flex-1 rounded-lg bg-pink-600 py-2 hover:bg-pink-700"
          >
            {favorite ? "❤️" : "🤍"}
          </button>

          <button
            onClick={copyPrompt}
            className="flex-1 rounded-lg bg-blue-600 py-2 hover:bg-blue-700"
          >
            📋
          </button>

          <a
            href={image}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-lg bg-green-600 py-2 text-center hover:bg-green-700"
          >
            ⬇
          </a>

          <button
            onClick={() => onDelete(id)}
            className="flex-1 rounded-lg bg-red-600 py-2 hover:bg-red-700"
          >
            🗑
          </button>

        </div>

          </div>

      {previewOpen && (
        <div
          
  className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-6"
          onClick={() => setPreviewOpen(false)}
        >
          <div
            className="max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={image}
              alt={prompt}
              className="w-full max-h-[85vh] object-contain rounded-2xl"
            />

            <button
              onClick={() => setPreviewOpen(false)}
              className="mt-6 w-full rounded-xl bg-red-600 py-3 hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}