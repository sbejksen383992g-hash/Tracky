import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import quotes from "../data/dailyQuotes";

const QuoteSection = () => {
  const [index, setIndex] = useState(
    Math.floor(Math.random() * quotes.length)
  );

  const nextQuote = () => {
    setIndex((prev) => (prev + 1) % quotes.length);
  };

  return (
    <section className="glass quote-card">

      <div className="quote-glow"></div>

      <motion.div
        className="quote-icon"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        💡
      </motion.div>

      <h2>Daily Motivation</h2>

      <div className="quote-text-wrapper">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            "{quotes[index]}"
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <motion.button
        className="primary-btn quote-btn"
        onClick={nextQuote}
        whileTap={{ scale: 0.95 }}
      >
        Next Quote →
      </motion.button>

    </section>
  );
};

export default QuoteSection;
