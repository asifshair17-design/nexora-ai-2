"use client";

type HistoryCardProps = {
  id: string;
  image: string;
  prompt: string;
  onDelete: (id: string) => void;
};

export default function HistoryCard({
  id,
  image,
  prompt,
  onDelete,
}: HistoryCardProps) {
  async function copyPrompt() {
    await navigator.clipboard.writeText(prompt);
    alert("Prompt copied!");
  }

  return (
    <div className="rounded-2xl overflow-hidden bg-gray-900 border border-gray-800">
      <img
        src={image}
        alt={prompt}
        className="w-full aspect-square object-cover"
      />

      <div className="p-4">
        <p className="text-sm text-gray-400 line-clamp-2 mb-4">
          {prompt}
        </p>

        <div className="flex gap-2">
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
    </div>
  );
}