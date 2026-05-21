import { motion } from "framer-motion";

export default function ExplanationPopup({ explanation, onClose }) {
  return (
    <div
      className="w-full max-w-2xl rounded-[1.5rem] bg-[#faf8f5] text-stone-900 p-6 shadow-xl border border-beige-300 relative mx-auto"
    >
      {/* Header section with Title and Close Button */}
      <div className="flex items-center justify-between mb-4 relative px-2">
        {/* Left spacer for perfect title centering */}
        <div className="w-8 h-8" />

        {/* Title */}
        <h2
          className="text-center text-2xl font-bold tracking-wide text-stone-900"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Explication
        </h2>

        {/* Circle/Square Close Button next to title as in the screenshot */}
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-beige-300 bg-[#FAF8F5] text-stone-700 transition-all hover:bg-beige-100 hover:text-stone-900 cursor-pointer shadow-xs active:scale-95"
          aria-label="Fermer"
        >
          ✕
        </button>
      </div>

      {/* Body Text (Left-aligned as in the screenshot) */}
      <p className="text-stone-700 text-sm md:text-[15px] leading-relaxed text-left font-normal px-4 pb-2">
        {explanation}
      </p>
    </div>
  );
}
