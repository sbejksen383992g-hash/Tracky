import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import defaultHabits from "../data/habits";
import {
  loadHabits,
  saveHabits,
  loadStreak,
  saveStreak,
  loadCustomHabits,
  saveCustomHabits,
  loadRawHabitsRecord,
} from "../utils/storage";
import {
  capCustomXP,
  performDailyRollover,
  previewTotalXP,
} from "../utils/gamification";
import { getTodayKey } from "../utils/dateUtils";
import { staggerContainer, fadeUpItem } from "../utils/motionVariants";
import LevelBadge from "../components/LevelBadge";

const emptyDraft = { title: "", target: "", xp: "" };

const habitsVisibleOn = (dateKey, customHabits) => {
  const all = [...defaultHabits, ...customHabits];
  const weekday = new Date(`${dateKey}T00:00:00`).getDay();
  return all.filter((h) => !(h.sundaySkip && weekday === 0));
};

const HabitSection = () => {
  const rolloverResult = useMemo(() => {
    const raw = loadRawHabitsRecord();
    const streak = loadStreak();
    const customs = loadCustomHabits();
    return performDailyRollover({
      rawHabitsRecord: raw,
      streak,
      allHabitsForDate: (dateKey) => habitsVisibleOn(dateKey, customs),
      todayKey: getTodayKey(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [completed, setCompleted] = useState(loadHabits());
  const [streak, setStreak] = useState(rolloverResult.streak);
  const [customHabits, setCustomHabits] = useState(loadCustomHabits());
  const [showAddForm, setShowAddForm] = useState(false);
  const [draft, setDraft] = useState(emptyDraft);
  const [gameState, setGameState] = useState(rolloverResult.game);

  useEffect(() => {
    saveStreak(rolloverResult.streak);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    saveHabits(completed);
  }, [completed]);

  useEffect(() => {
    saveCustomHabits(customHabits);
  }, [customHabits]);

  const isSunday = new Date().getDay() === 0;

  const allHabits = useMemo(
    () => [...defaultHabits, ...customHabits],
    [customHabits]
  );

  const visibleHabits = useMemo(() => {
    return allHabits.filter((habit) => !(habit.sundaySkip && isSunday));
  }, [allHabits, isSunday]);

  const toggleHabit = (id) => {
    setCompleted((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const openAddForm = () => {
    setDraft(emptyDraft);
    setShowAddForm(true);
  };

  const cancelAddForm = () => {
    setShowAddForm(false);
    setDraft(emptyDraft);
  };

  const submitNewHabit = (e) => {
    e.preventDefault();
    const title = draft.title.trim();
    if (!title) return;

    const newHabit = {
      id: `custom-${Date.now()}`,
      title,
      target: draft.target.trim() || "Custom",
      xp: capCustomXP(draft.xp),
      sundaySkip: false,
      isDefault: false,
    };

    setCustomHabits((prev) => [...prev, newHabit]);
    setShowAddForm(false);
    setDraft(emptyDraft);
  };

  const removeHabit = (id) => {
    setCustomHabits((prev) => prev.filter((habit) => habit.id !== id));
    setCompleted((prev) => {
      if (!(id in prev)) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const completedCount = visibleHabits.filter(
    (habit) => completed[habit.id]
  ).length;

  const progress = visibleHabits.length
    ? Math.round((completedCount / visibleHabits.length) * 100)
    : 0;

  const todayXP = visibleHabits.reduce((sum, habit) => {
    return completed[habit.id] ? sum + habit.xp : sum;
  }, 0);

  useEffect(() => {
    if (completedCount > 0 && completedCount === visibleHabits.length) {
      const today = getTodayKey();

      if (streak.lastCompleted !== today) {
        const updatedStreak = {
          streak: streak.streak + 1,
          lastCompleted: today,
        };

        setStreak(updatedStreak);
        saveStreak(updatedStreak);
        setGameState((g) => ({
          ...g,
          bestStreak: Math.max(g.bestStreak, updatedStreak.streak),
        }));
      }
    }
  }, [completedCount, visibleHabits.length, streak]);

  const displayXP = previewTotalXP(todayXP);
  const liveGame = { ...gameState, totalXP: displayXP };

  return (
    <section className="glass habits-card">
      <div className="habit-header">
        <div>
          <h2>✅ Daily Habits</h2>
          <p>Stay consistent every single day.</p>
        </div>

        <div className="habit-progress">
          <strong>{progress}%</strong>
          <span>
            {completedCount}/{visibleHabits.length}
          </span>
        </div>
      </div>

      <LevelBadge gameState={liveGame} compact />

      <div className="progress-track habit-progress-track">
        <motion.div
          className="progress-fill"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div className="habit-streak">
        🔥 Current Streak : <strong>{streak.streak}</strong> Day
        {streak.streak !== 1 ? "s" : ""}
        {gameState.bestStreak > streak.streak && (
          <span className="habit-streak-best"> · Best {gameState.bestStreak}</span>
        )}
      </div>

      <motion.div
        className="habit-list"
        variants={staggerContainer(0.05)}
        initial="hidden"
        animate="show"
      >
        <AnimatePresence initial={false}>
          {visibleHabits.map((habit) => {
            const isCompleted = completed[habit.id] || false;

            return (
              <motion.div
                key={habit.id}
                layout
                variants={fadeUpItem}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, height: 0, marginBottom: 0, transition: { duration: 0.25 } }}
                className={`habit-item ${isCompleted ? "completed" : ""}`}
              >
                <motion.div
                  className="habit-check"
                  onClick={() => toggleHabit(habit.id)}
                  whileTap={{ scale: 0.85 }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={isCompleted ? "done" : "todo"}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {isCompleted ? "✅" : "⬜"}
                    </motion.span>
                  </AnimatePresence>
                </motion.div>

                <div className="habit-info">
                  <h3>
                    {habit.title}
                    {!habit.isDefault && (
                      <span className="habit-custom-tag">Custom</span>
                    )}
                  </h3>
                  <p>{habit.target}</p>
                </div>

                <div className="habit-right">
                  <span className="habit-xp">+{habit.xp} XP</span>
                </div>

                {!habit.isDefault && (
                  <button
                    type="button"
                    className="habit-remove"
                    onClick={() => removeHabit(habit.id)}
                    aria-label={`Remove ${habit.title}`}
                    title="Remove habit"
                  >
                    ✕
                  </button>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence mode="wait" initial={false}>
        {showAddForm ? (
          <motion.form
            key="add-form"
            className="habit-add-form"
            onSubmit={submitNewHabit}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <input
              type="text"
              placeholder="Habit name"
              value={draft.title}
              onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
              autoFocus
            />
            <input
              type="text"
              placeholder="Target (e.g. 20 Minutes)"
              value={draft.target}
              onChange={(e) => setDraft((d) => ({ ...d, target: e.target.value }))}
            />
            <input
              type="number"
              min="1"
              max="150"
              placeholder="XP (max 150)"
              value={draft.xp}
              onChange={(e) => setDraft((d) => ({ ...d, xp: e.target.value }))}
            />
            <button type="submit" className="habit-add-save">Add Habit</button>
            <button type="button" className="habit-add-cancel" onClick={cancelAddForm}>Cancel</button>
          </motion.form>
        ) : (
          <motion.button
            key="add-toggle"
            type="button"
            className="habit-add-toggle"
            onClick={openAddForm}
          >
            + Add Habit
          </motion.button>
        )}
      </AnimatePresence>

      <div className="habit-footer">
        <div className="habit-footer-left">
          <h3>Total XP</h3>
          <p>Earn XP by completing your habits.</p>
        </div>

        <div className="habit-footer-right">
          <strong>{todayXP} XP</strong>
          <span className="habit-footer-sub">today · {displayXP} lifetime</span>
        </div>
      </div>

      <AnimatePresence>
        {progress === 100 && (
          <motion.div
            className="habit-success"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            🎉 Amazing! All today's habits are completed.
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HabitSection;
