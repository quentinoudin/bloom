import { motion } from "framer-motion";

export default function ExplanationPopup({ explanation, onClose }) {
  return (
    <div
      className="explication-panel relative mx-auto w-full"
      style={{
        maxWidth: "700px",
        padding: "40px 48px",
        backgroundColor: "#fdfaf5",
        backgroundImage: "radial-gradient(circle at center, #ffffff 0%, #fdfaf5 100%)",
        border: "1px solid #dcd7cf",
        borderRadius: "20px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Fermer"
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          width: "36px",
          height: "36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #dcd7cf",
          borderRadius: "8px",
          backgroundColor: "transparent",
          cursor: "pointer",
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f0ece4"}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
      >
        <span style={{ fontFamily: "monospace", fontSize: "18px", color: "#2c2c2c", lineHeight: 1 }}>
          ✕
        </span>
      </button>

      {/* Title */}
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "24px",
          fontWeight: "700",
          color: "#2c2c2c",
          marginTop: 0,
          marginBottom: "24px",
        }}
      >
        Explication
      </h2>

      {/* Body */}
      <p
        style={{
          fontFamily: "'Open Sans', sans-serif",
          fontSize: "15px",
          lineHeight: "1.75",
          color: "#2c2c2c",
          margin: 0,
        }}
      >
        {explanation}
      </p>
    </div>
  );
}
