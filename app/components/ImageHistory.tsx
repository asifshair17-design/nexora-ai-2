import HistoryCard from "./HistoryCard";

type SavedImage = {
  id: string;
  prompt: string;
  image_url: string;
  favorite: boolean;
};

type ImageHistoryProps = {
  images: SavedImage[];
  onDelete: (id: string) => void;
  onFavorite: (id: string, favorite: boolean) => void;
};

export default function ImageHistory({
  images,
  onDelete,
  onFavorite,
}: ImageHistoryProps) {
  if (images.length === 0) {
    return (
      <div className="rounded-3xl border border-gray-800 bg-gray-900/50 p-10 text-center">
        <div className="text-6xl">🎨</div>

        <h2 className="mt-5 text-2xl font-bold">
          No Image History Yet
        </h2>

        <p className="mt-2 text-gray-400">
          Your generated images will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h2 className="mb-8 text-3xl font-bold">
        Image History
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {images.map((img) => (
          <HistoryCard
            key={img.id}
            id={img.id}
            image={img.image_url}
            prompt={img.prompt}
            favorite={img.favorite}
            onDelete={onDelete}
            onFavorite={onFavorite}
          />
        ))}
      </div>
    </div>
  );
}