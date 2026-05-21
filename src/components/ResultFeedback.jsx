import { AnimatePresence, motion } from "framer-motion";

export default function ResultFeedback({ isCorrect, isVisible, points }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="flex flex-col items-center justify-center gap-1"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 12,
          }}
        >
          {/* Icon */}
          <motion.span
            className={`text-5xl font-bold ${
              isCorrect ? "text-emerald-600" : "text-red-500"
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 15,
              delay: 0.1,
            }}
          >
            {isCorrect ? "✓" : "✗"}
          </motion.span>

          {/* Text */}
          <motion.p
            className={`text-lg font-bold ${
              isCorrect ? "text-emerald-600" : "text-red-500"
            }`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            {isCorrect ? "Correct !" : "Réessaie !"}
          </motion.p>

          {/* Score */}
          {isCorrect && (
            <motion.p
              className="text-sm font-semibold text-emerald-500"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              Score +{points}
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
