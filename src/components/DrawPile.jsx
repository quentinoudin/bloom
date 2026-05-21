import { motion } from "framer-motion";

export default function DrawPile({ count }) {
  // Show max 5 stacked cards for visual effect
  const visibleCards = Math.min(count, 5);
  const cards = Array.from({ length: visibleCards }, (_, i) => i);

  return (
    <div className="relative w-[140px] h-[200px] flex-shrink-0">
      {cards.map((i) => (
        <motion.div
          key={`draw-${i}`}
          className="absolute rounded-xl overflow-hidden shadow-md border-2 border-beige-300"
          style={{
            width: 140,
            height: 200,
            top: -i * 3,
            left: -i * 2,
            zIndex: i,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
        >
          <img
            src="/cards/dos-vivante.png"
            alt="Pioche"
            className="w-full h-full object-cover"
          />
        </motion.div>
      ))}
      {count > 0 && (
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-beige-500 font-medium">
          {count} cartes
        </div>
      )}
    </div>
  );
}
