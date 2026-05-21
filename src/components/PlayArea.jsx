import { motion, AnimatePresence } from "framer-motion";
import Card from "./Card";
import ResultFeedback from "./ResultFeedback";

export default function PlayArea({
  botPlayedCard,
  playerPlayedCard,
  phase,
  points,
}) {
  const isFlipMerge = phase === "flip_merge";
  const showResult = phase === "correct";
  const isCorrect = phase === "correct" || phase === "show_popup" || phase === "flip_merge";

  return (
    <div className="flex items-center justify-center gap-6 min-h-[240px]">
      {/* Bot's played card slot */}
      <div className="w-[150px] h-[210px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {botPlayedCard ? (
            <motion.div
              key={`bot-played-${botPlayedCard.pairId}`}
              initial={{ opacity: 0, y: -80, rotateY: 180 }}
              animate={{
                opacity: 1,
                y: 0,
                rotateY: 0,
                x: isFlipMerge ? 140 : 0,
                zIndex: isFlipMerge ? 5 : 0,
              }}
              transition={{
                opacity: { duration: 0.4 },
                y: { type: "spring", stiffness: 200, damping: 20 },
                rotateY: { duration: 0.6, delay: 0.3 },
                x: { delay: 0.7, duration: 0.55, ease: "easeInOut" },
                zIndex: { delay: 0.7 },
              }}
              style={{ perspective: 1000, position: "relative" }}
            >
              <Card
                card={botPlayedCard}
                isFaceDown={isFlipMerge}
                isCorrect={isCorrect}
                isWrong={false}
                size="normal"
                backImage="/cards/dos-technologie.png"
              />
            </motion.div>
          ) : (
            <motion.div
              key="bot-empty"
              className="w-[150px] h-[210px] rounded-xl border-2 border-dashed border-beige-300 flex items-center justify-center bg-beige-100/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="text-beige-400 text-xs font-semibold uppercase tracking-wider">
                TECHNOLOGIE
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Result feedback (center) */}
      <div className="w-[100px] flex items-center justify-center">
        <AnimatePresence>
          {showResult && (
            <ResultFeedback
              isCorrect={true}
              isVisible={showResult}
              points={points}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Player's played card slot */}
      <div className="w-[150px] h-[210px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {playerPlayedCard ? (
            <motion.div
              key={`player-played-${playerPlayedCard.pairId}`}
              initial={{ opacity: 0, y: 80 }}
              animate={{
                opacity: 1,
                y: 0,
                x: isFlipMerge ? -140 : 0,
                zIndex: isFlipMerge ? 10 : 0,
              }}
              transition={{
                opacity: { duration: 0.4 },
                y: { type: "spring", stiffness: 200, damping: 20 },
                x: { delay: 0.7, duration: 0.55, ease: "easeInOut" },
                zIndex: { delay: 0.7 },
              }}
              style={{ position: "relative" }}
            >
              <Card
                card={playerPlayedCard}
                isFaceDown={isFlipMerge}
                isCorrect={isCorrect}
                isWrong={phase === "wrong"}
                size="normal"
                backImage="/cards/dos-vivante.png"
              />
            </motion.div>
          ) : (
            <motion.div
              key="player-empty"
              className={`w-[150px] h-[210px] rounded-xl border-2 border-dashed flex items-center justify-center transition-all duration-300 ${
                phase === "player_turn"
                  ? "border-teal-400 bg-teal-400/5 shadow-[0_0_20px_rgba(45,212,191,0.4)] ring-[3px] ring-teal-400/50 animate-pulse"
                  : "border-beige-300 bg-beige-100/50"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span
                className={`text-xs font-semibold uppercase tracking-wider ${
                  phase === "player_turn"
                    ? "text-teal-500"
                    : "text-beige-400"
                }`}
              >
                NATURE
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
