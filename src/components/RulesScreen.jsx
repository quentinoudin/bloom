import { motion } from "framer-motion";
import FullscreenButton from "./FullscreenButton";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const fadeSlideUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function RulesScreen({ onStart, onBack }) {
  const rules = [
    {
      step: "01",
      title: "La Distribution",
      desc: "Chaque joueur reçoit 5 cartes. L'ordinateur détient les cartes Technologie (dos beige), et vous possédez les cartes Nature (dos illustré).",
    },
    {
      step: "02",
      title: "Le Tour du PC",
      desc: "L'ordinateur joue une carte Technologie au centre. C'est à vous d'analyser son fonctionnement pour trouver son équivalent naturel.",
    },
    {
      step: "03",
      title: "Votre Association",
      desc: "Vos cartes s'illuminent en turquoise. Cliquez sur la carte Nature de votre main qui s'associe le mieux au principe de la technologie jouée.",
    },
    {
      step: "04",
      title: "Apprentissage & Score",
      desc: "Correct ? Gagnez jusqu'à +100 points et lisez l'explication biomimétique de STK Architecture. Erreur ? Re-tentez votre chance sans stress.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FAF7F2" }}>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center justify-between px-10 py-6"
      >
        <span
          className="text-2xl font-bold tracking-wide cursor-pointer"
          style={{ fontFamily: "'Playfair Display', serif" }}
          onClick={onBack}
        >
          STK
        </span>
        <FullscreenButton />
      </motion.header>

      {/* Main Content */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl self-center px-8 py-12 text-stone-800"
      >
        {/* Title block */}
        <motion.div variants={fadeSlideUp} className="text-center mb-16">
          <h1
            className="text-4xl md:text-5xl font-bold text-stone-900 mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Règles du Jeu
          </h1>
          <p className="text-stone-400 text-xs tracking-[0.25em] uppercase">
            Bloom — L'art du mimétisme architectural
          </p>
        </motion.div>

        {/* Rules Grid */}
        <motion.div
          variants={fadeSlideUp}
          className="grid grid-cols-1 md:grid-cols-2 w-full mb-16"
          style={{ gap: "2rem" }}
        >
          {rules.map((rule, idx) => (
            <motion.div
              key={idx}
              className="relative flex flex-col"
              style={{
                backgroundColor: "#FDFCF9",
                border: "1px solid #E8E0D5",
                borderRadius: "1.5rem",
                padding: "2.5rem 2rem 2rem 2rem",
              }}
              whileHover={{ y: -3, boxShadow: "0 8px 32px rgba(0,0,0,0.06)" }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              {/* Step number — top-left corner */}
              <span
                className="absolute top-5 left-6 select-none"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1rem",
                  fontWeight: "700",
                  color: "#D6CEC4",
                  letterSpacing: "0.05em",
                }}
              >
                {rule.step}
              </span>

              {/* Title */}
              <h3
                className="text-center text-xl font-bold text-stone-900 mb-4 mt-4"
                style={{ fontFamily: "'Playfair Display', serif", lineHeight: "1.3" }}
              >
                {rule.title}
              </h3>

              {/* Description */}
              <p
                className="text-center text-stone-500 text-sm"
                style={{ lineHeight: "1.75" }}
              >
                {rule.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div variants={fadeSlideUp} className="flex flex-col items-center gap-6">
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 12px 40px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.97 }}
            onClick={onStart}
            className="cursor-pointer text-white transition-all"
            style={{
              backgroundColor: "#0a0a0a",
              fontFamily: "'Playfair Display', serif",
              padding: "18px 72px",
              fontSize: "18px",
              fontWeight: "500",
              borderRadius: "50px",
              border: "none",
              letterSpacing: "0.02em",
              lineHeight: "1.2",
            }}
          >
            Commencer la partie
          </motion.button>

          <button
            onClick={onBack}
            className="cursor-pointer transition-colors"
            style={{
              background: "none",
              border: "none",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#A89F96",
              fontWeight: "500",
            }}
            onMouseEnter={e => e.target.style.color = "#1a1a1a"}
            onMouseLeave={e => e.target.style.color = "#A89F96"}
          >
            Retour
          </button>
        </motion.div>
      </motion.main>
    </div>
  );
}
