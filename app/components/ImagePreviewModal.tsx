"use client";

type Image = {
  id: string;
  image_url: string;
  prompt: string;
  favorite: boolean;
};

type Props = {
  image: Image | null;
  onClose: () => void;
  onFavorite: () => void;
  onDelete: () => void;
};

export default function ImagePreviewModal({
  image,
  onClose,
  onFavorite,
  onDelete,
}: Props) {
  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 rounded-3xl max-w-6xl w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.image_url}
          alt={image.prompt}
          className="w-full max-h-[75vh] object-contain bg-black"
        />

        <div className="p-6">

          <h2 className="text-2xl font-bold mb-4">
            Prompt
          </h2>

          <p className="text-gray-300 mb-6">
            {image.prompt}
          </p>

          <div className="flex gap-4 flex-wrap">

            <button
              onClick={onFavorite}
              className="rounded-xl bg-pink-600 px-5 py-2 hover:bg-pink-700"
            >
              {image.favorite ? "❤️ Favorite" : "🤍 Favorite"}
            </button>

            <a
              href={image.image_url}
              download
              className="rounded-xl bg-purple-600 px-5 py-2 hover:bg-purple-700"
            >
              Download
            </a>

            <button
              onClick={onDelete}
              className="rounded-xl bg-red-600 px-5 py-2 hover:bg-red-700"
            >
              Delete
            </button>

            <button
              onClick={onClose}
              className="ml-auto rounded-xl bg-gray-700 px-5 py-2 hover:bg-gray-600"
            >
              Close
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}