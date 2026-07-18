import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getEntry, saveEntry, getAllEntries, countWords, MIN_WORDS } from "../utils/diary";
import { getTodayKey, formatLongDate, formatShortDate } from "../utils/dateUtils";
import { staggerContainer, fadeUpItem } from "../utils/motionVariants";

const AUTOSAVE_DELAY = 500;

const DiaryPage = () => {
  const today = getTodayKey();
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(true);
  const [entries, setEntries] = useState([]);
  const [viewingDate, setViewingDate] = useState(today);

  useEffect(() => {
    setText(getEntry(today).text);
    setEntries(getAllEntries());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSaved(false);
    const timeout = setTimeout(() => {
      saveEntry(text, today);
      setEntries(getAllEntries());
      setSaved(true);
    }, AUTOSAVE_DELAY);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const wordCount = countWords(text);
  const reachedGoal = wordCount >= MIN_WORDS;
  const viewedEntry =
    viewingDate === today ? { text } : getEntry(viewingDate);

  return (
    <main className="dashboard">
      <motion.header
        className="glass header"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="header-left">
          <span className="header-tag">📝 Developer Diary</span>
          <h1>Today's Entry</h1>
          <p>{formatLongDate(new Date())}</p>
        </div>

        <div className="header-right">
          <div className="info-card">
            <div>
              <small>Words</small>
              <h4>{wordCount}</h4>
            </div>
          </div>
          <div className="info-card streak">
            <div>
              <small>Goal</small>
              <h4>{MIN_WORDS} words</h4>
            </div>
          </div>
        </div>
      </motion.header>

      <section className="diary-layout">
        <motion.div
          className="glass diary-editor"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <textarea
            className="diary-textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What did you learn, build, or struggle with today?"
            rows={16}
            autoFocus
          />

          <div className="diary-editor-footer">
            <div className="word-progress-track">
              <motion.div
                className="word-progress-fill"
                animate={{
                  width: `${Math.min(100, (wordCount / MIN_WORDS) * 100)}%`,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            <div className="diary-status-row">
              <AnimatePresence mode="wait">
                <motion.span
                  key={reachedGoal ? "hit" : "pending"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={reachedGoal ? "goal-hit" : "muted"}
                >
                  {reachedGoal
                    ? "✅ Daily Review goal reached"
                    : `${MIN_WORDS - wordCount} words to go`}
                </motion.span>
              </AnimatePresence>
              <span className="autosave-status">
                {saved ? "Saved" : "Saving…"}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="glass diary-history"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2>Past Entries</h2>

          {entries.length === 0 && (
            <p className="muted">No entries yet — today's is the first.</p>
          )}

          <motion.div
            className="diary-entry-list"
            variants={staggerContainer(0.04)}
            initial="hidden"
            animate="show"
          >
            {entries.map((entry) => (
              <motion.button
                key={entry.date}
                variants={fadeUpItem}
                className={`diary-entry-item ${
                  entry.date === viewingDate ? "active" : ""
                }`}
                onClick={() => setViewingDate(entry.date)}
                whileTap={{ scale: 0.98 }}
              >
                <strong>{formatShortDate(entry.date)}</strong>
                <span>{countWords(entry.text)} words</span>
              </motion.button>
            ))}
          </motion.div>

          <AnimatePresence>
            {viewingDate !== today && (
              <motion.div
                className="diary-preview"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="diary-preview-header">
                  <h4>{formatShortDate(viewingDate)}</h4>
                  <button className="ghost-btn" onClick={() => setViewingDate(today)}>
                    Back to Today
                  </button>
                </div>
                <p>{viewedEntry.text || "No entry."}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    </main>
  );
};

export default DiaryPage;
