type ImageCardProps = {
  image: string;
  prompt: string;
};

export default function ImageCard({
  image,
  prompt,
}: ImageCardProps) {
  return (
    <div className="mt-12 max-w-3xl mx-auto">

      <div className="rounded-3xl overflow-hidden border border-gray-800 bg-gray-900">

        <img
          src={image}
          alt={prompt}
          className="w-full"
        />

        <div className="p-6">

          <p className="text-gray-300 mb-6">
            {prompt}
          </p>

          <a
            href={image}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-xl bg-purple-600 px-6 py-3 hover:bg-purple-700 transition"
          >
            ⬇ Download
          </a>

        </div>

      </div>

    </div>
  );
}