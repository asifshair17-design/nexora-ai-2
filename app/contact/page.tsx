export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white px-8 py-16">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-bold mb-8">
          Contact Us
        </h1>

        <p className="text-gray-400 mb-10">
          We'd love to hear from you.
        </p>

        <div className="space-y-8">

          <div>
            <h2 className="text-2xl font-bold">
              General Support
            </h2>

            <p className="text-gray-300 mt-2">
              support@nexora-ai.com
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              Business
            </h2>

            <p className="text-gray-300 mt-2">
              business@nexora-ai.com
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              Response Time
            </h2>

            <p className="text-gray-300 mt-2">
              We usually reply within 24–48 hours.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}