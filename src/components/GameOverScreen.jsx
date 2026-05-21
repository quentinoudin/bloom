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
      style={{ display: "flex", minHeight: "60vh", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "30px", padding: "60px 16px" }}
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      {/* Title */}
      <motion.h1
        style={{ fontFamily: "'Playfair Display', serif", fontSize: "42px", fontWeight: "700", fontStyle: "italic", color: "#1a4731", margin: 0 }}
        variants={fadeUp}
      >
        Jeu réussi !
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        style={{ fontSize: "17px", color: "#6b7280", margin: 0 }}
        variants={fadeUp}
      >
        Tu as compris le biomimétisme !
      </motion.p>

      {/* Score box */}
      <motion.div
        style={{ border: "2px solid #1a5c3a", borderRadius: "50px", padding: "22px 60px", backgroundColor: "#fdfaf5", textAlign: "center" }}
        variants={fadeUp}
      >
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: "700", letterSpacing: "0.06em", color: "#1a4731" }}>
          SCORE FINAL : {score}
        </span>
      </motion.div>

      {/* Pairs box */}
      <motion.div
        style={{ border: "1px solid #dcd7cf", borderRadius: "50px", padding: "18px 52px", backgroundColor: "#fdfaf5", textAlign: "center" }}
        variants={fadeUp}
      >
        <span style={{ fontSize: "13px", fontWeight: "600", letterSpacing: "0.1em", color: "#4b5563", textTransform: "uppercase" }}>
          Paires associées : 11 / 11
        </span>
      </motion.div>

      {/* Errors box */}
      <motion.div
        style={{ border: "1px solid #fca5a5", borderRadius: "50px", padding: "18px 52px", backgroundColor: "#fff5f5", textAlign: "center" }}
        variants={fadeUp}
      >
        <span style={{ fontSize: "13px", fontWeight: "600", letterSpacing: "0.1em", color: "#ef4444", textTransform: "uppercase" }}>
          Erreurs : {errors}
        </span>
      </motion.div>

      {/* Buttons */}
      <motion.div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", marginTop: "10px" }} variants={fadeUp}>
        <motion.button
          onClick={onRestart}
          whileHover={{ scale: 1.03, boxShadow: "0 8px 30px rgba(26,87,49,0.25)" }}
          whileTap={{ scale: 0.97 }}
          style={{ backgroundColor: "#1a5c3a", color: "#ffffff", border: "none", borderRadius: "50px", padding: "16px 60px", fontSize: "17px", fontWeight: "600", letterSpacing: "0.04em", cursor: "pointer" }}
        >
          Rejouer
        </motion.button>
        <button
          onClick={onMenu}
          style={{ background: "none", border: "none", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#A89F96", fontWeight: "500", cursor: "pointer" }}
          onMouseEnter={e => e.target.style.color = "#1a1a1a"}
          onMouseLeave={e => e.target.style.color = "#A89F96"}
        >
          Menu
        </button>
      </motion.div>
    </motion.div>
  );
}
