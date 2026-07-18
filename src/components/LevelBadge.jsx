import React from "react";
import { motion } from "framer-motion";
import { getLevelInfo } from "../utils/gamification";

// `compact` renders the slim strip used inside HabitSection; the full
// version (used on the Analytics page) shows the ring + next-level copy.
const LevelBadge = ({ gameState, compact = false }) => {
  const info = getLevelInfo(gameState?.totalXP ?? 0);
  const pct = Math.round(info.progress * 100);

  if (compact) {
    return (
      <div className="level-strip">
        <span className="level-strip-badge">Lv.{info.level}</span>
        <span className="level-strip-title">{info.title}</span>
        <div className="level-strip-track">
          <motion.div
            className="level-strip-fill"
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <span className="level-strip-xp">{info.xp} XP</span>
      </div>
    );
  }

  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * info.progress;

  return (
    <div className="level-ring-card glass">
      <div className="level-ring-wrap">
        <svg viewBox="0 0 120 120" className="level-ring-svg">
          <circle cx="60" cy="60" r={radius} className="level-ring-track" />
          <motion.circle
            cx="60"
            cy="60"
            r={radius}
            className="level-ring-fill"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - dash }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <div className="level-ring-center">
          <strong>{info.level}</strong>
          <span>LEVEL</span>
        </div>
      </div>

      <div className="level-ring-info">
        <h3>{info.title}</h3>
        <p>{info.xp} XP lifetime</p>
        {info.next ? (
          <p className="level-ring-next">
            {info.next.threshold - info.xp} XP to <strong>{info.next.title}</strong>
          </p>
        ) : (
          <p className="level-ring-next">Max discipline tier reached 🏆</p>
        )}
      </div>
    </div>
  );
};

export default LevelBadge;
