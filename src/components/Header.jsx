import FullscreenButton from "./FullscreenButton";

export default function Header({ score, matchedCount = 0 }) {
  return (
    <header className="flex items-center justify-between py-4 px-8">
      {/* Left — Logo */}
      <div className="flex flex-col leading-tight">
        <span
          className="text-xl font-bold tracking-wide"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          STK
        </span>
        <span className="text-[10px] tracking-widest text-stone-500 uppercase">
          Architecture
        </span>
      </div>

      {/* Center — Title */}
      <h1
        className="text-lg font-bold text-stone-900"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Bloom — Jeu d&apos;association
      </h1>

      {/* Right — Score & Fullscreen */}
      <div className="flex items-center gap-3">
        <div className="border border-stone-300 rounded px-5 py-2.5 bg-stone-100/50 flex items-center">
          <span className="font-semibold text-xs tracking-wider text-stone-600 uppercase">
            PAIRES : {matchedCount} / 11
          </span>
        </div>
        <div className="border border-stone-850 rounded px-6 py-2.5 flex items-center bg-white shadow-sm">
          <span className="font-bold text-base text-stone-900">
            SCORE : {score}
          </span>
        </div>
        <FullscreenButton />
      </div>
    </header>
  );
}
