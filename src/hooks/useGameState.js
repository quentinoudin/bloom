import { useReducer, useCallback } from "react";
import { PAIRS, shuffleArray } from "../data/pairs";

const HAND_SIZE = 5;
const CORRECT_POINTS = 100;
const WRONG_POINTS = -20;

// Game phases
export const PHASE = {
  WELCOME: "welcome",
  RULES: "rules",
  DEALING: "dealing",
  BOT_PLAYING: "bot_playing",
  PLAYER_TURN: "player_turn",
  CHECKING: "checking",
  CORRECT: "correct",
  WRONG: "wrong",
  SHOW_POPUP: "show_popup",
  DRAWING: "drawing",
  GAME_OVER: "game_over",
};

function createInitialState() {
  return {
    phase: PHASE.WELCOME,
    score: 0,
    errors: 0,
    // All pair data
    allPairs: [],
    // Remaining pairs not yet dealt
    drawPile: [],
    // Bot's current hand (technology cards, face down)
    botHand: [],
    // Player's current hand (vivante cards, face up)
    playerHand: [],
    // Card currently played by the bot (revealed in play area)
    botPlayedCard: null,
    // Card currently played by the player
    playerPlayedCard: null,
    // Current pair being played (for checking)
    currentPairId: null,
    // Matched pairs history
    matchedPairs: [],
    // Current explanation to show
    currentExplanation: null,
    // Dynamic turn reward potential (starts at 100, decrements by 20 on errors)
    currentTurnReward: 100,
  };
}

function dealCards(drawPile, botHand, playerHand) {
  const newDrawPile = [...drawPile];
  const newBotHand = [...botHand];
  const newPlayerHand = [...playerHand];

  while (newBotHand.length < HAND_SIZE && newDrawPile.length > 0) {
    const pair = newDrawPile.shift();
    newBotHand.push({
      ...pair.technologie,
      pairId: pair.id,
    });
    newPlayerHand.push({
      ...pair.vivante,
      pairId: pair.id,
    });
  }

  return {
    drawPile: newDrawPile,
    botHand: shuffleArray(newBotHand),
    playerHand: shuffleArray(newPlayerHand),
  };
}

function gameReducer(state, action) {
  switch (action.type) {
    case "SHOW_RULES": {
      return {
        ...state,
        phase: PHASE.RULES,
      };
    }

    case "START_GAME": {
      const shuffledPairs = shuffleArray([...PAIRS]);
      const { drawPile, botHand, playerHand } = dealCards(
        shuffledPairs,
        [],
        []
      );
      return {
        ...createInitialState(),
        phase: PHASE.DEALING,
        allPairs: shuffledPairs,
        drawPile,
        botHand,
        playerHand,
      };
    }

    case "DEALING_COMPLETE": {
      return {
        ...state,
        phase: PHASE.BOT_PLAYING,
      };
    }

    case "BOT_PLAY": {
      // Bot picks a random card from its hand
      const botIndex =
        action.botIndex !== undefined
          ? action.botIndex
          : Math.floor(Math.random() * state.botHand.length);
      const botCard = state.botHand[botIndex];
      const newBotHand = state.botHand.filter((_, i) => i !== botIndex);

      return {
        ...state,
        phase: PHASE.PLAYER_TURN,
        botPlayedCard: botCard,
        botHand: newBotHand,
        currentPairId: botCard.pairId,
        currentTurnReward: 100, // Reset turn reward to 100 for the new turn
      };
    }

    case "PLAYER_PLAY": {
      const playerCard = action.card;
      const newPlayerHand = state.playerHand.filter(
        (c) => !(c.pairId === playerCard.pairId && c.name === playerCard.name)
      );

      return {
        ...state,
        phase: PHASE.CHECKING,
        playerPlayedCard: playerCard,
        playerHand: newPlayerHand,
      };
    }

    case "MATCH_CORRECT": {
      const pair = PAIRS.find((p) => p.id === state.currentPairId);
      return {
        ...state,
        phase: PHASE.CORRECT,
        score: state.score + state.currentTurnReward,
        currentExplanation: pair ? pair.explanation : "",
        matchedPairs: [...state.matchedPairs, state.currentPairId],
      };
    }

    case "MATCH_WRONG": {
      return {
        ...state,
        phase: PHASE.WRONG,
        currentTurnReward: Math.max(0, state.currentTurnReward - 20),
        errors: state.errors + 1,
      };
    }

    case "WRONG_ANIMATION_DONE": {
      // Return card to player hand
      return {
        ...state,
        phase: PHASE.PLAYER_TURN,
        playerHand: [...state.playerHand, state.playerPlayedCard],
        playerPlayedCard: null,
      };
    }

    case "SHOW_POPUP": {
      return {
        ...state,
        phase: PHASE.SHOW_POPUP,
      };
    }

    case "CLOSE_POPUP": {
      // Check if game is over
      const remainingPairs =
        state.drawPile.length + state.botHand.length;

      if (remainingPairs === 0 && state.botHand.length === 0) {
        return {
          ...state,
          phase: PHASE.GAME_OVER,
          botPlayedCard: null,
          playerPlayedCard: null,
          currentExplanation: null,
        };
      }

      // Draw new cards if needed
      const { drawPile, botHand, playerHand } = dealCards(
        state.drawPile,
        state.botHand,
        state.playerHand
      );

      return {
        ...state,
        phase: PHASE.DRAWING,
        botPlayedCard: null,
        playerPlayedCard: null,
        currentExplanation: null,
        currentPairId: null,
        drawPile,
        botHand,
        playerHand,
      };
    }

    case "DRAW_COMPLETE": {
      if (state.botHand.length === 0) {
        return {
          ...state,
          phase: PHASE.GAME_OVER,
        };
      }
      return {
        ...state,
        phase: PHASE.BOT_PLAYING,
      };
    }

    case "RESET": {
      return createInitialState();
    }

    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, createInitialState());

  const startGame = useCallback(() => dispatch({ type: "START_GAME" }), []);
  const showRules = useCallback(() => dispatch({ type: "SHOW_RULES" }), []);
  const dealingComplete = useCallback(
    () => dispatch({ type: "DEALING_COMPLETE" }),
    []
  );
  const botPlay = useCallback(
    (botIndex) => dispatch({ type: "BOT_PLAY", botIndex }),
    []
  );
  const playerPlay = useCallback(
    (card) => dispatch({ type: "PLAYER_PLAY", card }),
    []
  );
  const matchCorrect = useCallback(
    () => dispatch({ type: "MATCH_CORRECT" }),
    []
  );
  const matchWrong = useCallback(
    () => dispatch({ type: "MATCH_WRONG" }),
    []
  );
  const wrongAnimationDone = useCallback(
    () => dispatch({ type: "WRONG_ANIMATION_DONE" }),
    []
  );
  const showPopup = useCallback(
    () => dispatch({ type: "SHOW_POPUP" }),
    []
  );
  const closePopup = useCallback(
    () => dispatch({ type: "CLOSE_POPUP" }),
    []
  );
  const drawComplete = useCallback(
    () => dispatch({ type: "DRAW_COMPLETE" }),
    []
  );
  const reset = useCallback(() => dispatch({ type: "RESET" }), []);

  return {
    state,
    actions: {
      startGame,
      showRules,
      dealingComplete,
      botPlay,
      playerPlay,
      matchCorrect,
      matchWrong,
      wrongAnimationDone,
      showPopup,
      closePopup,
      drawComplete,
      reset,
    },
  };
}
