"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/browser";

type Document = {
  id: string;
  prompt: string;
  content: string;
  type: string;
  created_at: string;
};

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDocuments();
  }, []);

  async function loadDocuments() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("documents")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      });

    setDocuments((data as Document[]) || []);

    setLoading(false);
  }
    async function deleteDocument(id: string) {
    const ok = confirm("Delete this document?");

    if (!ok) return;

    await supabase
      .from("documents")
      .delete()
      .eq("id", id);

    setDocuments((prev) =>
      prev.filter((doc) => doc.id !== id)
    );
  }

  async function copyText(text: string) {
    await navigator.clipboard.writeText(text);
    alert("Copied!");
  }

  function downloadText(filename: string, text: string) {
    const blob = new Blob([text], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = filename;

    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <div className="mx-auto max-w-7xl">

        <h1 className="text-5xl font-black">
          📄 My AI Documents
        </h1>

        <p className="mt-3 text-gray-400">
          Every AI document you've generated.
        </p>

        {loading ? (

          <div className="mt-20 flex justify-center">

            <div className="h-16 w-16 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>

          </div>

        ) : documents.length === 0 ? (

          <div className="mt-20 rounded-3xl border border-gray-800 bg-gray-900 p-16 text-center">

            <div className="text-7xl">
              📄
            </div>

            <h2 className="mt-6 text-3xl font-black">
              No Documents Yet
            </h2>

            <p className="mt-4 text-gray-400">
              Generate some AI content first.
            </p>

          </div>

        ) : (

          <div className="mt-12 grid gap-8">

            {documents.map((doc) => (

              <div
                key={doc.id}
                className="rounded-3xl border border-gray-800 bg-gray-900 p-8"
              >

                <div className="flex items-center justify-between">

                  <span className="rounded-full bg-purple-600 px-4 py-2 text-sm font-bold">
                    {doc.type}
                  </span>

                  <span className="text-sm text-gray-500">
                    {new Date(
                      doc.created_at
                    ).toLocaleString()}
                  </span>

                </div>

                <h2 className="mt-6 text-2xl font-black">
                  {doc.prompt}
                </h2>

                <pre className="mt-6 whitespace-pre-wrap rounded-2xl bg-black p-6 text-gray-300">
                  {doc.content}
                </pre>

                <div className="mt-8 flex gap-4">

                  <button
                    onClick={() =>
                      copyText(doc.content)
                    }
                    className="rounded-xl bg-purple-600 px-5 py-3 font-bold"
                  >
                    📋 Copy
                  </button>

                  <button
                    onClick={() =>
                      downloadText(
                        `${doc.prompt}.txt`,
                        doc.content
                      )
                    }
                    className="rounded-xl bg-blue-600 px-5 py-3 font-bold"
                  >
                    ⬇ Download
                  </button>

                  <button
                    onClick={() =>
                      deleteDocument(doc.id)
                    }
                    className="rounded-xl bg-red-600 px-5 py-3 font-bold"
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </main>
  );
}