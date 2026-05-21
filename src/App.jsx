import { useGameState, PHASE } from "./hooks/useGameState";
import WelcomeScreen from "./components/WelcomeScreen";
import RulesScreen from "./components/RulesScreen";
import GameBoard from "./components/GameBoard";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const { state, actions } = useGameState();

  return (
    <AnimatePresence mode="wait">
      {state.phase === PHASE.WELCOME ? (
        <motion.div
          key="welcome"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <WelcomeScreen onStart={actions.showRules} />
        </motion.div>
      ) : state.phase === PHASE.RULES ? (
        <motion.div
          key="rules"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <RulesScreen onStart={actions.startGame} onBack={actions.reset} />
        </motion.div>
      ) : (
        <motion.div
          key="game"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <GameBoard state={state} actions={actions} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
