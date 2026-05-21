import { motion } from "framer-motion";
import FullscreenButton from "./FullscreenButton";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const fadeSlideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
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
        className="flex-1 flex flex-col items-center justify-center px-6 w-full max-w-5xl self-center py-8 text-stone-800"
      >
        {/* Title */}
        <motion.h1
          variants={fadeSlideUp}
          className="text-3xl md:text-4xl font-bold mb-3 text-stone-900 text-center"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Règles du Jeu
        </motion.h1>

        <motion.p
          variants={fadeSlideUp}
          className="text-stone-500 text-xs md:text-sm tracking-widest uppercase mb-10 text-center"
        >
          Bloom — L'art du mimétisme architectural
        </motion.p>

        {/* Rules Grid */}
        <motion.div
          variants={fadeSlideUp}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12"
        >
          {rules.map((rule, idx) => (
            <motion.div
              key={idx}
              className="bg-[#faf8f5] p-6 rounded-[1.25rem] border border-beige-300 shadow-xs flex gap-5 items-start hover:shadow-md transition-shadow duration-300"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <span
                className="text-3xl font-bold text-stone-300 select-none leading-none pt-0.5"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {rule.step}
              </span>
              <div className="flex-1 text-center">
                <h3
                  className="text-lg font-bold text-stone-900 mb-2 leading-snug"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {rule.title}
                </h3>
                <p className="text-stone-600 text-xs md:text-sm leading-relaxed">
                  {rule.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div variants={fadeSlideUp} className="flex flex-col items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 8px 30px rgba(0,0,0,0.25)" }}
            whileTap={{ scale: 0.97 }}
            onClick={onStart}
            className="cursor-pointer transition-all shadow-lg text-white"
            style={{
              backgroundColor: "#000000",
              fontFamily: "'Playfair Display', serif",
              padding: "16px 64px",
              fontSize: "20px",
              fontWeight: "500",
              borderRadius: "9999px",
              border: "none",
              display: "inline-block",
              lineHeight: "1.2",
            }}
          >
            Commencer la partie
          </motion.button>

          <button
            onClick={onBack}
            className="text-xs md:text-sm tracking-widest text-stone-500 hover:text-stone-900 transition-colors uppercase font-medium cursor-pointer border-b border-transparent hover:border-stone-500 py-1"
          >
            Retour
          </button>
        </motion.div>
      </motion.main>
    </div>
  );
}
