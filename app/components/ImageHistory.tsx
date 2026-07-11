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
  onFavorite: (
    id: string,
    favorite: boolean
  ) => void;
};

export default function ImageHistory({
  images,
  onDelete,
  onFavorite,
}: ImageHistoryProps){
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">

      <h2 className="text-3xl font-bold mb-8">
        Image History
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

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