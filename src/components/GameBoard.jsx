import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PHASE } from "../hooks/useGameState";
import Header from "./Header";
import DrawPile from "./DrawPile";
import BotHand from "./BotHand";
import PlayArea from "./PlayArea";
import PlayerHand from "./PlayerHand";
import ExplanationPopup from "./ExplanationPopup";
import GameOverScreen from "./GameOverScreen";

export default function GameBoard({ state, actions }) {
  const {
    phase,
    score,
    errors,
    drawPile,
    botHand,
    playerHand,
    botPlayedCard,
    playerPlayedCard,
    currentExplanation,
    matchedPairs,
  } = state;

  const botPlayTimerRef = useRef(null);

  // Auto-trigger dealing complete
  useEffect(() => {
    if (phase === PHASE.DEALING) {
      const timer = setTimeout(() => {
        actions.dealingComplete();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [phase, actions]);

  // Auto-trigger bot play
  useEffect(() => {
    if (phase === PHASE.BOT_PLAYING && botHand.length > 0) {
      botPlayTimerRef.current = setTimeout(() => {
        actions.botPlay();
      }, 1000);
      return () => clearTimeout(botPlayTimerRef.current);
    }
  }, [phase, botHand.length, actions]);

  // Auto-check match after player plays
  useEffect(() => {
    if (phase === PHASE.CHECKING && playerPlayedCard && botPlayedCard) {
      const timer = setTimeout(() => {
        if (playerPlayedCard.pairId === botPlayedCard.pairId) {
          actions.matchCorrect();
        } else {
          actions.matchWrong();
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [phase, playerPlayedCard, botPlayedCard, actions]);

  // Auto-transition from correct to flip_merge
  useEffect(() => {
    if (phase === PHASE.CORRECT) {
      const timer = setTimeout(() => {
        actions.startFlipMerge();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [phase, actions]);

  // Auto-transition from flip_merge to popup
  useEffect(() => {
    if (phase === PHASE.FLIP_MERGE) {
      const timer = setTimeout(() => {
        actions.showPopup();
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, [phase, actions]);

  // Auto-transition from wrong back to player turn
  useEffect(() => {
    if (phase === PHASE.WRONG) {
      const timer = setTimeout(() => {
        actions.wrongAnimationDone();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [phase, actions]);

  // Auto-transition from drawing to bot playing
  useEffect(() => {
    if (phase === PHASE.DRAWING) {
      const timer = setTimeout(() => {
        actions.drawComplete();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [phase, actions]);

  const handlePlayerCardClick = (card) => {
    if (phase !== PHASE.PLAYER_TURN) return;
    actions.playerPlay(card);
  };

  // Game Over screen
  if (phase === PHASE.GAME_OVER) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header score={score} matchedCount={matchedPairs.length} />
        <GameOverScreen
          score={score}
          errors={errors}
          onRestart={actions.startGame}
          onMenu={actions.reset}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header score={score} matchedCount={matchedPairs.length} />

      <div className="flex-1 flex flex-col justify-between px-14 py-6">
        {/* Bot hand (top row) */}
        <div className="flex justify-center pt-2">
          <BotHand cards={botHand} />
        </div>

        {/* Middle area: Draw pile + Play area */}
        <div className="flex items-center gap-8 px-4">
          {/* Draw pile (left) */}
          <div className="flex-shrink-0 ml-6">
            <DrawPile count={drawPile.length} />
          </div>

          {/* Play area (center) */}
          <div className="flex-1 flex justify-center">
            <PlayArea
              botPlayedCard={botPlayedCard}
              playerPlayedCard={playerPlayedCard}
              phase={phase}
              points={state.currentTurnReward}
            />
          </div>

          {/* Right spacer for symmetry */}
          <div className="w-[140px] flex-shrink-0" />
        </div>

        {/* Player hand or Explanation inline (bottom row) */}
        <div className="flex justify-center pb-8 min-h-[220px] items-center w-full">
          <AnimatePresence mode="wait">
            {phase === PHASE.SHOW_POPUP ? (
              <motion.div
                key="explanation"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
                className="w-full flex justify-center"
              >
                <ExplanationPopup
                  explanation={currentExplanation}
                  onClose={actions.closePopup}
                />
              </motion.div>
            ) : (
              <motion.div
                key="hand"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
                className="w-full"
              >
                <PlayerHand
                  cards={playerHand}
                  onCardClick={handlePlayerCardClick}
                  disabled={phase !== PHASE.PLAYER_TURN}
                  phase={phase}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
