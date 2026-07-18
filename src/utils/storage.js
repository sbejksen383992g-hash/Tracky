// ===============================
// APEX Storage Manager
// ===============================
import { getTodayKey } from "./dateUtils";

const HABIT_KEY = "apex_habits";
const STREAK_KEY = "apex_streak";
const LEARNING_KEY = "apex_learning_v2";
const DIARY_KEY = "apex_diary";
const CUSTOM_HABITS_KEY = "apex_custom_habits";

// -------------------------------
// Generic safe JSON helpers
// -------------------------------

const safeGet = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
};

const safeSet = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

// -------------------------------
// HABITS
// -------------------------------

export const loadHabits = () => {
  const saved = safeGet(HABIT_KEY, null);
  if (!saved || saved.date !== getTodayKey()) return {};
  return saved.data || {};
};

// Unlike loadHabits(), this does NOT discard yesterday's data just
// because the date has rolled over — the gamification rollover job
// needs to see exactly what was left in storage before today's
// checkboxes get reset, or it can never archive/penalize it.
export const loadRawHabitsRecord = () => {
  return safeGet(HABIT_KEY, null);
};

export const saveHabits = (data) => {
  safeSet(HABIT_KEY, { date: getTodayKey(), data });
};

// -------------------------------
// STREAK
// -------------------------------

export const loadStreak = () => {
  return safeGet(STREAK_KEY, { streak: 0, lastCompleted: null });
};

export const saveStreak = (streakData) => {
  safeSet(STREAK_KEY, streakData);
};

// -------------------------------
// CUSTOM HABITS (user-added, deletable — default habits never live here)
// -------------------------------

export const loadCustomHabits = () => {
  return safeGet(CUSTOM_HABITS_KEY, []);
};

export const saveCustomHabits = (list) => {
  safeSet(CUSTOM_HABITS_KEY, list);
};

// -------------------------------
// LEARNING (per-course progress)
// -------------------------------
// Shape: { completedLessons: { [courseId]: { [lessonKey]: true } },
//          notes: { [courseId]: string },
//          lastVisited: { [courseId]: isoTimestamp } }

const defaultLearningState = {
  completedLessons: {},
  notes: {},
  lastVisited: {},
};

export const loadLearningState = () => {
  return safeGet(LEARNING_KEY, defaultLearningState);
};

export const saveLearningState = (state) => {
  safeSet(LEARNING_KEY, state);
};

// -------------------------------
// DIARY
// -------------------------------
// Shape: { entries: { [dateKey]: { text, updatedAt } } }

const defaultDiaryState = { entries: {} };

export const loadDiaryState = () => {
  return safeGet(DIARY_KEY, defaultDiaryState);
};

export const saveDiaryState = (state) => {
  safeSet(DIARY_KEY, state);
};

// -------------------------------
// RESET
// -------------------------------

export const resetAllData = () => {
  [
    HABIT_KEY,
    STREAK_KEY,
    "apex_timer",
    "apex_learning",
    LEARNING_KEY,
    DIARY_KEY,
    CUSTOM_HABITS_KEY,
    "apex_gamification_v1",
    "apex_history_v1",
  ].forEach((key) => localStorage.removeItem(key));
};
