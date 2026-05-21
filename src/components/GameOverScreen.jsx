import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

export default function GameOverScreen({ score, errors, onRestart, onMenu }) {
  return (
    <motion.div
      className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 py-12"
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      {/* Title */}
      <motion.h1
        className="text-4xl font-bold italic text-emerald-900"
        style={{ fontFamily: "'Playfair Display', serif" }}
        variants={fadeUp}
      >
        Jeu réussi !
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-lg text-gray-600"
        variants={fadeUp}
      >
        Tu as compris le biomimétisme !
      </motion.p>

      {/* Score box */}
      <motion.div
        className="rounded-xl border-2 border-emerald-700 px-10 py-4 text-center bg-white shadow-sm"
        variants={fadeUp}
      >
        <span
          className="text-4xl font-bold tracking-wide text-emerald-900"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          SCORE FINAL : {score}
        </span>
      </motion.div>

      {/* Pairs box */}
      <motion.div
        className="rounded-xl border border-stone-300 px-8 py-3 text-center bg-stone-100/50"
        variants={fadeUp}
      >
        <span className="text-xl font-bold tracking-wide text-stone-700">
          PAIRES ASSOCIÉES : 11 / 11
        </span>
      </motion.div>

      {/* Errors box */}
      <motion.div
        className="rounded-xl border border-red-300 px-8 py-2 text-center bg-red-50/30"
        variants={fadeUp}
      >
        <span className="text-lg font-semibold tracking-wide text-red-500">
          ERREURS : {errors}
        </span>
      </motion.div>

      {/* Buttons */}
      <motion.div className="mt-4 flex flex-col items-center gap-3" variants={fadeUp}>
        <button
          onClick={onRestart}
          className="text-lg font-medium text-emerald-800 underline-offset-4 transition-colors hover:text-emerald-600 hover:underline"
        >
          Rejouer
        </button>
        <button
          onClick={onMenu}
          className="text-base font-medium text-gray-500 underline-offset-4 transition-colors hover:text-gray-700 hover:underline"
        >
          Menu
        </button>
      </motion.div>
    </motion.div>
  );
}
