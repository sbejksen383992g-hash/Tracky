import React from "react";
import { motion } from "framer-motion";
import { formatLongDate } from "../utils/dateUtils";

const HeaderSection = () => {
  const today = formatLongDate(new Date());

  return (
    <header className="glass header hero-header">
      <div
        className="hero-image"
        style={{
          backgroundImage:
            "url(https://picsum.photos/seed/apex-workspace-2026/1600/500)",
        }}
      />
      <div className="hero-overlay" />

      <motion.div
        className="header-left"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="header-tag">◆ APEX — Elite Mode</span>

        <h1>Welcome Back, Soham</h1>

        <p>
          Every completed task today is one step closer to your strongest self.
        </p>
      </motion.div>

      <motion.div
        className="header-right"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
        }}
      >
        {[
          { label: "Date", value: today },
          { label: "Current Goal", value: "Become Elite" },
          { label: "Mindset", value: "Never Skip Today", streak: true },
        ].map((card) => (
          <motion.div
            key={card.label}
            className={`info-card${card.streak ? " streak" : ""}`}
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
          >
            <div>
              <small>{card.label}</small>
              <h4>{card.value}</h4>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </header>
  );
};

export default HeaderSection;
