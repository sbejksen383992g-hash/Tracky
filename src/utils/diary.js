// ===============================
// Developer Diary Logic
// ===============================
import { loadDiaryState, saveDiaryState, loadHabits, saveHabits } from "./storage";
import { getTodayKey } from "./dateUtils";

export const MIN_WORDS = 50;
const DAILY_REVIEW_HABIT_ID = 8; // "Daily Review" in data/habits.js

export const countWords = (text) => {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
};

export const getEntry = (dateKey = getTodayKey()) => {
  const state = loadDiaryState();
  return state.entries[dateKey] || { text: "", updatedAt: null };
};

export const getAllEntries = () => {
  const state = loadDiaryState();
  return Object.entries(state.entries)
    .map(([date, entry]) => ({ date, ...entry }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
};

// Saves today's entry and, once the 50-word target is hit, automatically
// checks off the "Daily Review" habit so the two modules stay in sync.
export const saveEntry = (text, dateKey = getTodayKey()) => {
  const state = loadDiaryState();
  const updated = {
    entries: {
      ...state.entries,
      [dateKey]: { text, updatedAt: new Date().toISOString() },
    },
  };
  saveDiaryState(updated);

  if (dateKey === getTodayKey() && countWords(text) >= MIN_WORDS) {
    const habits = loadHabits();
    if (!habits[DAILY_REVIEW_HABIT_ID]) {
      saveHabits({ ...habits, [DAILY_REVIEW_HABIT_ID]: true });
    }
  }

  return updated;
};
