import { motion, AnimatePresence } from "framer-motion";

export default function BotHand({ cards }) {
  return (
    <div className="flex justify-center gap-4">
      <AnimatePresence mode="popLayout">
        {cards.map((card, index) => (
          <motion.div
            key={`bot-${card.pairId}-${card.name}`}
            layoutId={`bot-card-${card.pairId}`}
            className="w-[130px] h-[185px] rounded-xl overflow-hidden shadow-md border-2 border-beige-300 cursor-default"
            initial={{ opacity: 0, y: -40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: index * 0.08, type: "spring", stiffness: 300, damping: 25 }}
          >
            <img
              src={`${import.meta.env.BASE_URL}cards/dos-technologie.png`}
              alt="Carte bot"
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
