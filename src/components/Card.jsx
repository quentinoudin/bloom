import { motion } from "framer-motion";

// Small decorative compass/target icon for top-right corner
function CompassIcon({ color = "#C4AD8F" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-40"
    >
      {/* Outer circle */}
      <circle cx="8" cy="8" r="6.5" stroke={color} strokeWidth="1" />
      {/* Inner circle */}
      <circle cx="8" cy="8" r="2.5" stroke={color} strokeWidth="0.8" />
      {/* Crosshair lines */}
      <line x1="8" y1="0.5" x2="8" y2="4" stroke={color} strokeWidth="0.8" />
      <line x1="8" y1="12" x2="8" y2="15.5" stroke={color} strokeWidth="0.8" />
      <line x1="0.5" y1="8" x2="4" y2="8" stroke={color} strokeWidth="0.8" />
      <line x1="12" y1="8" x2="15.5" y2="8" stroke={color} strokeWidth="0.8" />
    </svg>
  );
}

// Shake keyframes for wrong answer feedback
const shakeVariants = {
  shake: {
    x: [0, -8, 8, -6, 6, -3, 3, 0],
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const sizeStyles = {
  normal: { width: "var(--card-w)",    height: "var(--card-h)" },
  small:  { width: "var(--card-w-sm)", height: "var(--card-h-sm)" },
};

const base = import.meta.env.BASE_URL;
const toSrc = (path) => path ? base + path.replace(/^\//, '') : '';

export default function Card({
  card = {},
  isFlipped = false,
  isFaceDown = false,
  onClick,
  disabled = false,
  isHighlighted = false,
  isCorrect = false,
  isWrong = false,
  size = "normal",
  className = "",
  style,
  animate,
  initial,
  exit,
  transition,
  layoutId,
  backImage = "/cards/dos-vivante.png",
}) {
  const { name, image, color } = card;

  // Determine the glow/border state
  const glowClass = isCorrect
    ? "ring-[3px] ring-offset-[5px] ring-emerald-500 shadow-[0_0_18px_rgba(16,185,129,0.4)]"
    : isWrong
      ? "ring-[3px] ring-offset-[5px] ring-red-500 shadow-[0_0_18px_rgba(239,68,68,0.4)]"
      : isHighlighted
        ? "ring-[3px] ring-offset-[5px] ring-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.5)]"
        : "";

  // Whether the card is showing its back
  const showBack = isFaceDown;

  return (
    <motion.div
      layoutId={layoutId}
      className={`perspective-1000 ${className}`}
      style={{ ...sizeStyles[size], ...style, cursor: disabled ? "default" : "pointer" }}
      onClick={!disabled ? onClick : undefined}
      initial={initial}
      animate={isWrong ? "shake" : animate}
      exit={exit}
      transition={transition}
      variants={shakeVariants}
      whileHover={
        !disabled && !isCorrect && !isWrong
          ? { scale: 1.04, transition: { duration: 0.2 } }
          : undefined
      }
      whileTap={
        !disabled ? { scale: 0.97, transition: { duration: 0.1 } } : undefined
      }
    >
      {/* 3D flip container */}
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: showBack ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* ===== FRONT FACE ===== */}
        <div
          className={[
            "absolute inset-0 backface-hidden rounded-xl",
            "bg-white shadow-md",
            "flex flex-col items-center",
            "overflow-hidden",
            glowClass,
            "transition-shadow duration-300",
          ].join(" ")}
        >
          {/* Inner liseré border */}
          <div className="absolute inset-[3px] rounded-[10px] border-[1.5px] border-beige-200 pointer-events-none z-10" />

          {/* Compass icon top-right */}
          <div className="absolute top-2.5 right-2.5 z-10">
            <CompassIcon color={color || "#C4AD8F"} />
          </div>

          {/* Card image area */}
          <div className="flex-1 w-full flex items-center justify-center px-4 pt-5 pb-1">
            {image && (
              <img
                src={toSrc(image)}
                alt={name || "Card"}
                className="max-w-full max-h-full object-contain drop-shadow-sm"
                draggable={false}
              />
            )}
          </div>

          {/* Bottom label pill */}
          <div className="w-full flex justify-center pb-3 px-3">
            <span
              className="inline-block px-3 py-1 rounded-full text-white font-semibold text-[10px] tracking-wide uppercase text-center leading-tight max-w-full truncate"
              style={{ backgroundColor: color || "#C4AD8F" }}
            >
              {name || ""}
            </span>
          </div>
        </div>

        {/* ===== BACK FACE ===== */}
        <div
          className={[
            "absolute inset-0 backface-hidden rotate-y-180 rounded-xl",
            "bg-white shadow-md",
            "overflow-hidden",
            glowClass,
            "transition-shadow duration-300",
          ].join(" ")}
        >
          {/* Inner liseré border */}
          <div className="absolute inset-[3px] rounded-[10px] border-[1.5px] border-beige-200 pointer-events-none z-10" />

          {/* Back image */}
          <img
            src={toSrc(backImage)}
            alt="Card back"
            className="w-full h-full object-cover rounded-xl"
            draggable={false}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
