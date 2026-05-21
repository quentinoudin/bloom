import { motion } from "framer-motion";
import FullscreenButton from "./FullscreenButton";

const navItems = ["BLOOM", "TRAJECTOIRE", "VOIE", "FRAGMENTS", "RÉSONANCE"];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeSlideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function WelcomeScreen({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FAF7F2" }}>
      {/* Header / Navigation */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center justify-between px-10 py-6"
      >
        {/* Logo */}
        <span
          className="text-2xl font-bold tracking-wide"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          STK
        </span>

        {/* Nav items & Fullscreen */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <span
                key={item}
                className="text-xs tracking-widest text-stone-500 hover:text-stone-800 transition-colors cursor-default"
              >
                {item}
              </span>
            ))}
          </nav>
          <FullscreenButton />
        </div>
      </motion.header>

      {/* Center content */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 flex flex-col items-center justify-center px-6 text-center"
      >
        {/* Small label */}
        <motion.span
          variants={fadeSlideUp}
          className="text-xs tracking-widest text-stone-400 mb-6"
        >
          BLOOM
        </motion.span>

        {/* Main heading */}
        <motion.h1
          variants={fadeSlideUp}
          className="text-2xl md:text-3xl font-bold leading-snug max-w-2xl mb-6 text-stone-900"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Bloom — L&apos;art du mimétisme architectural
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeSlideUp}
          className="text-sm md:text-base text-stone-600 max-w-xl mb-6 leading-relaxed"
        >
          Cette expérience, conçue pour <strong className="font-semibold text-stone-800">STK Architecture</strong>, se veut éducative et ludique, afin de faciliter la compréhension du mimétisme architectural.
        </motion.p>

        {/* Description of concept */}
        <motion.p
          variants={fadeSlideUp}
          className="text-xs md:text-sm text-stone-500 max-w-lg mb-10 leading-relaxed"
        >
          Le concept se développe entre deux participants : le <strong className="font-medium text-stone-700">Joueur 1 (Utilisateur)</strong>, représentant la &ldquo;partie vivante&rdquo;, et le <strong className="font-medium text-stone-700">PC (Ordinateur)</strong>, simulant la &ldquo;technologie&rdquo; adaptée. Le jeu se compose de 22 cartes, réparties équitablement en deux catégories formant 11 paires.
        </motion.p>

        {/* Play button */}
        <motion.button
          variants={fadeSlideUp}
          whileHover={{ scale: 1.03, boxShadow: "0 8px 30px rgba(0,0,0,0.25)" }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="cursor-pointer transition-all shadow-lg"
          style={{
            backgroundColor: "#000000",
            color: "#ffffff",
            fontFamily: "'Playfair Display', serif",
            padding: "16px 64px",
            fontSize: "20px",
            fontWeight: "500",
            borderRadius: "9999px",
            border: "none",
            display: "inline-block",
            lineHeight: "1.2",
            marginTop: "48px",
          }}
        >
          Jouer
        </motion.button>
      </motion.main>
    </div>
  );
}
