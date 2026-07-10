"use client";

export default function WhatsAppButton() {
  const phone = "923024182668"; // Replace with your WhatsApp number if needed
  const message = encodeURIComponent(
    "Hi! I'm interested in upgrading to Nexora AI Pro."
  );

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl transition duration-300 hover:scale-110">
        <span className="text-3xl">💬</span>
      </div>
    </a>
  );
}