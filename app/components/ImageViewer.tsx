"use client";

import Image from "next/image";
import { useEffect } from "react";

type ImageViewerProps = {
  open: boolean;
  image: {
    id: string;
    image_url: string;
    prompt: string;
    favorite: boolean;
    created_at: string;
  } | null;

  onClose: () => void;
  onFavorite: () => void;
  onDelete: () => void;
};

export default function ImageViewer({
  open,
  image,
  onClose,
  onFavorite,
  onDelete,
}: ImageViewerProps) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKey);

    return () =>
      window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!open || !image) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[95%] max-w-6xl overflow-hidden rounded-3xl border border-gray-700 bg-gray-950 shadow-2xl"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-20 rounded-full bg-gray-800 px-4 py-2 text-xl hover:bg-red-600"
        >
          ✕
        </button>

        <div className="grid lg:grid-cols-2">
          {/* Image */}
          <div className="relative h-[500px] lg:h-[750px]">
            <Image
              src={image.image_url}
              alt={image.prompt}
              fill
              className="object-contain"
            />
          </div>

          {/* Right Panel */}
          <div className="flex flex-col p-10">
            <h2 className="text-3xl font-bold">
              AI Image
            </h2>

            <p className="mt-6 text-gray-300 leading-8">
              {image.prompt}
            </p>

            <p className="mt-8 text-sm text-gray-500">
              Created:
            </p>

            <p className="text-gray-300">
              {new Date(
                image.created_at
              ).toLocaleString()}
            </p>

            <div className="mt-auto flex flex-wrap gap-4 pt-12">
              <button
                onClick={onFavorite}
                className="rounded-xl bg-purple-600 px-6 py-4 font-bold hover:bg-purple-700"
              >
                {image.favorite
                  ? "❤️ Remove Favorite"
                  : "🤍 Favorite"}
              </button>

              <a
                href={image.image_url}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-blue-600 px-6 py-4 font-bold hover:bg-blue-700"
              >
                ⬇ Download
              </a>

              <button
                onClick={onDelete}
                className="rounded-xl bg-red-600 px-6 py-4 font-bold hover:bg-red-700"
              >
                🗑 Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}