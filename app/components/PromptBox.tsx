type PromptBoxProps = {
  prompt: string;
  setPrompt: (value: string) => void;

  style: string;
  setStyle: (value: string) => void;

  size: string;
  setSize: (value: string) => void;

  loading: boolean;
  onGenerate: () => void;
};

export default function PromptBox({
  prompt,
  setPrompt,
  style,
  setStyle,
  size,
  setSize,
  loading,
  onGenerate,
}: PromptBoxProps) {
  return (
    <div className="w-full max-w-4xl rounded-3xl bg-gray-900 border border-gray-800 p-8">

      <label className="block mb-3 font-semibold text-lg">
        Prompt
      </label>

      <textarea
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your dream image..."
        className="w-full rounded-xl bg-black border border-gray-700 p-5 outline-none resize-none"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

        <div>
          <label className="block mb-3 font-semibold">
            AI Style
          </label>

          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full rounded-xl bg-black border border-gray-700 p-4"
          >
            <option>Realistic</option>
            <option>Anime</option>
            <option>Cartoon</option>
            <option>3D Render</option>
            <option>Fantasy</option>
            <option>Cyberpunk</option>
            <option>Watercolor</option>
          </select>
        </div>

        <div>
          <label className="block mb-3 font-semibold">
            Image Size
          </label>

          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full rounded-xl bg-black border border-gray-700 p-4"
          >
            <option>Square</option>
            <option>Portrait</option>
            <option>Landscape</option>
          </select>
        </div>

      </div>

      <button
        onClick={onGenerate}
        disabled={loading}
       className="mt-8 w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 py-4 text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
            Generating...
          </span>
        ) : (
          "✨ Generate Image"
        )}
      </button>

    </div>
  );
}