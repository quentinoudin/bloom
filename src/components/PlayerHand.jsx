import { motion, AnimatePresence } from "framer-motion";
import Card from "./Card";

export default function PlayerHand({ cards, onCardClick, disabled, phase }) {
  const isPlayerTurn = phase === "player_turn";

  return (
    <div className="flex justify-center pb-2" style={{ gap: "var(--gap-hand)" }}>
      <AnimatePresence mode="popLayout">
        {cards.map((card, index) => (
          <motion.div
            key={`player-${card.pairId}-${card.name}`}
            layoutId={`player-card-${card.pairId}`}
            initial={{ opacity: 0, y: 60, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.8 }}
            transition={{
              delay: index * 0.08,
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
          >
            <Card
              card={card}
              isFaceDown={false}
              isHighlighted={isPlayerTurn}
              onClick={() => !disabled && onCardClick(card)}
              disabled={disabled}
              size="normal"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
