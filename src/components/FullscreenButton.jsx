import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function FullscreenButton({ className = "" }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, backgroundColor: "#EDE5D8" }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleFullscreen}
      className={`p-2.5 rounded-xl border border-stone-300 bg-transparent text-stone-700 hover:text-stone-900 hover:border-stone-400 transition-colors cursor-pointer flex items-center justify-center ${className}`}
      title={isFullscreen ? "Quitter le plein écran" : "Plein écran"}
      aria-label={isFullscreen ? "Quitter le plein écran" : "Plein écran"}
    >
      {isFullscreen ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 14h6v6m10-6h-6v6M4 10h6V4m10 6h-6V4" />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
        </svg>
      )}
    </motion.button>
  );
}
