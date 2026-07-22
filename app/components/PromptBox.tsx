type PromptBoxProps = {
  prompt: string;
  setPrompt: (value: string) => void;

  style: string;
  setStyle: (value: string) => void;

  size: string;
  setSize: (value: string) => void;

  loading: boolean;
progress: number;
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
progress,
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
{loading && (
  <div className="mt-8 rounded-2xl border border-purple-700/40 bg-black/40 p-6">

    <div className="flex items-center justify-center gap-3">

      <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />

      <div className="text-left">
        <h3 className="text-lg font-bold text-white">
          🤖 AI is creating your masterpiece...
        </h3>

        <p className="text-sm text-gray-400">
          Please wait while Nexora AI generates your image.
        </p>
      </div>

    </div>

    <div className="mt-6 flex justify-between text-sm text-gray-400">
      <span>Generation Progress</span>
      <span className="font-bold text-white">
        {progress}%
      </span>
    </div>

    <div className="mt-3 h-4 overflow-hidden rounded-full bg-gray-800">

      <div
        className="h-4 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 transition-all duration-500"
        style={{
          width: `${progress}%`,
        }}
      />

    </div>

    <div className="mt-5 rounded-xl bg-gray-900 p-4 text-center text-sm text-gray-300">

      💡 Tip: Detailed prompts create better AI images.

    </div>

  </div>
)}
    </div>
  );
}