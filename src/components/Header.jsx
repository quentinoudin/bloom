import FullscreenButton from "./FullscreenButton";

export default function Header({ score, matchedCount = 0 }) {
  return (
    <header className="flex items-center justify-between py-6 px-14">
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
      <div className="flex items-center" style={{ gap: "25px" }}>
        <div
          className="flex items-center"
          style={{
            border: "1px solid #dcd7cf",
            borderRadius: "50px",
            padding: "12px 28px",
            backgroundColor: "#fdfaf5",
          }}
        >
          <span style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.12em", color: "#6b6560", textTransform: "uppercase" }}>
            Paires : {matchedCount} / 11
          </span>
        </div>
        <div
          className="flex items-center"
          style={{
            border: "1px solid #2c2c2c",
            borderRadius: "50px",
            padding: "12px 28px",
            backgroundColor: "#fdfaf5",
          }}
        >
          <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.12em", color: "#2c2c2c", textTransform: "uppercase" }}>
            Score : {score}
          </span>
        </div>
        <FullscreenButton />
      </div>
    </header>
  );
}
