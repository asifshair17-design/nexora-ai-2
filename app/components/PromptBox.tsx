type PromptBoxProps = {
  prompt: string;
  setPrompt: (value: string) => void;
  loading: boolean;
  onGenerate: () => void;
};

export default function PromptBox({
  prompt,
  setPrompt,
  loading,
  onGenerate,
}: PromptBoxProps) {
  return (
    <div className="w-full max-w-3xl rounded-3xl bg-gray-900 border border-gray-800 p-8">

      <textarea
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your dream image..."
        className="w-full rounded-xl bg-black border border-gray-700 p-5 outline-none resize-none"
      />

      <button
        onClick={onGenerate}
        disabled={loading}
        className="mt-6 w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 py-4 text-lg font-bold hover:scale-105 transition disabled:opacity-50"
      >
        {loading ? "Generating..." : "✨ Generate Image"}
      </button>

    </div>
  );
}