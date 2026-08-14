"use client";

import { useState } from "react";

type HistoryCardProps = {
  id: string;
  image: string;
  prompt: string;
  favorite: boolean;
  onDelete: (id: string) => void;
  onFavorite: (id: string, favorite: boolean) => void;
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
    try {
      await navigator.clipboard.writeText(prompt);
      alert("Prompt copied!");
    } catch (error) {
      console.error("Copy failed:", error);
      alert("Could not copy prompt.");
    }
  }

  return (
    <>
      {/* Image History Card */}
      <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900">

        {/* Image */}
        <div className="overflow-hidden">
          <img
            src={image}
            alt={prompt}
            onClick={() => setPreviewOpen(true)}
            className="aspect-square w-full cursor-pointer object-cover transition duration-300 hover:scale-105"
          />
        </div>

        {/* Card Content */}
        <div className="p-4">

          <p className="mb-4 line-clamp-2 text-sm text-gray-400">
            {prompt}
          </p>

          {/* Buttons */}
          <div className="grid grid-cols-4 gap-2">

            {/* Favorite */}
            <button
              onClick={() =>
                onFavorite(id, favorite)
              }
              title={
                favorite
                  ? "Remove from favorites"
                  : "Add to favorites"
              }
              className="rounded-lg bg-pink-600 py-2 transition hover:bg-pink-700"
            >
              {favorite ? "❤️" : "🤍"}
            </button>

            {/* Copy */}
            <button
              onClick={copyPrompt}
              title="Copy prompt"
              className="rounded-lg bg-blue-600 py-2 transition hover:bg-blue-700"
            >
              📋
            </button>

            {/* Download */}
            <a
              href={image}
              download
              target="_blank"
              rel="noopener noreferrer"
              title="Download image"
              className="rounded-lg bg-green-600 py-2 text-center transition hover:bg-green-700"
            >
              ⬇
            </a>

            {/* Delete */}
            <button
              onClick={() => onDelete(id)}
              title="Delete image"
              className="rounded-lg bg-red-600 py-2 transition hover:bg-red-700"
            >
              🗑
            </button>

          </div>
        </div>
      </div>


      {/* Fullscreen Preview */}
      {previewOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-6"
          onClick={() => setPreviewOpen(false)}
        >
          <div
            className="w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Preview Image */}
            <img
              src={image}
              alt={prompt}
              className="max-h-[80vh] w-full rounded-2xl object-contain"
            />

            {/* Prompt */}
            <p className="mt-4 text-center text-sm text-gray-400">
              {prompt}
            </p>

            {/* Close */}
            <button
              onClick={() => setPreviewOpen(false)}
              className="mt-6 w-full rounded-xl bg-red-600 py-3 font-bold transition hover:bg-red-700"
            >
              Close
            </button>

          </div>
        </div>
      )}
    </>
  );
}