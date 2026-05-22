import { motion } from "framer-motion";

export default function DrawPile({ count }) {
  const visibleCards = Math.min(count, 5);
  const cards = Array.from({ length: visibleCards }, (_, i) => i);

  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: "var(--card-w-sm)", height: "var(--card-h-sm)" }}
    >
      {cards.map((i) => (
        <motion.div
          key={`draw-${i}`}
          className="absolute rounded-xl overflow-hidden shadow-md border-2 border-beige-300"
          style={{
            width: "var(--card-w-sm)",
            height: "var(--card-h-sm)",
            top: -i * 3,
            left: -i * 2,
            zIndex: i,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
        >
          <img
            src={`${import.meta.env.BASE_URL}cards/dos-vivante.png`}
            alt="Pioche"
            className="w-full h-full object-cover"
          />
        </motion.div>
      ))}
      {count > 0 && (
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-beige-500 font-medium whitespace-nowrap">
          {count} cartes
        </div>
      )}
    </div>
  );
}
