// ===============================
// APEX Gamification Engine
// ===============================
// Owns the persistent, cross-day layer that HabitSection's daily
// checkbox state never used to have: lifetime XP, discipline level,
// streak integrity, and the daily history log the analytics graph
// reads from.
//
// Why this file exists (bugs it fixes vs. the old app):
//  1. Streak could only ever go UP. There was no code path that ever
//     reset it, so skipping days for weeks left the flame counter
//     lying to you. `performDailyRollover` below breaks it properly.
//  2. Nothing was ever saved after "today" — habits.js wiped itself
//     the moment the date changed, so there was no way to build a
//     history graph. We now archive every day into HISTORY_KEY.
//  3. XP was recomputed live from today's checkboxes only; it was
//     never a running total, so nothing you did yesterday mattered
//     to your level today. XP is now a persistent ledger with a
//     penalty subtraction for habits you skipped.
//  4. Custom habit XP had no upper bound (`Number(draft.xp) || 10`
//     with only a floor) — a user could type 999999 into the "XP"
//     field and instantly max out any level system built on top of
//     it. capCustomXP() enforces a sane ceiling.

import { dayDiff, isSunday as dateIsSunday } from "./dateUtils";

const GAME_KEY = "apex_gamification_v1";
const HISTORY_KEY = "apex_history_v1";
const HISTORY_MAX_DAYS = 120; // cap so localStorage can't grow unbounded
const MAX_BACKFILL_DAYS = 30; // don't try to replay a year of silence

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
// Level curve
// -------------------------------
// Cumulative XP thresholds. Titles double as the "discipline level"
// the user asked for — climbing is driven by consistency (streaks +
// completions), falling is driven by the penalty system below.
export const LEVELS = [
  { level: 1, title: "Novice", threshold: 0 },
  { level: 2, title: "Initiate", threshold: 250 },
  { level: 3, title: "Disciplined", threshold: 600 },
  { level: 4, title: "Operator", threshold: 1200 },
  { level: 5, title: "Vanguard", threshold: 2200 },
  { level: 6, title: "Elite", threshold: 3600 },
  { level: 7, title: "Apex", threshold: 5500 },
  { level: 8, title: "Apex Prime", threshold: 8000 },
  { level: 9, title: "Legend", threshold: 12000 },
];

export const getLevelInfo = (totalXP = 0) => {
  const xp = Math.max(0, totalXP);
  let current = LEVELS[0];
  let next = LEVELS[1] || null;

  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].threshold) {
      current = LEVELS[i];
      next = LEVELS[i + 1] || null;
    }
  }

  const span = next ? next.threshold - current.threshold : 1;
  const into = next ? xp - current.threshold : 1;
  const progress = next ? Math.min(1, Math.max(0, into / span)) : 1;

  return {
    xp,
    level: current.level,
    title: current.title,
    next: next ? { title: next.title, threshold: next.threshold } : null,
    xpIntoLevel: into,
    xpForNext: next ? span : 0,
    progress, // 0..1
  };
};

// -------------------------------
// Custom habit XP guardrail
// -------------------------------
export const MAX_CUSTOM_XP = 150;

export const capCustomXP = (rawValue) => {
  const n = Math.round(Number(rawValue));
  if (!Number.isFinite(n) || n <= 0) return 10;
  return Math.min(MAX_CUSTOM_XP, Math.max(1, n));
};

// -------------------------------
// Gamification state
// -------------------------------
const defaultGameState = {
  totalXP: 0,
  bestStreak: 0,
  lastRolloverDate: null, // last date we've archived/penalized
};

export const loadGameState = () => safeGet(GAME_KEY, defaultGameState);
export const saveGameState = (state) => safeSet(GAME_KEY, state);

// -------------------------------
// History log (what the graph reads)
// -------------------------------
// Shape: [{ date, percent, completed, total, xpEarned, xpPenalty, net }]
export const loadHistory = () => safeGet(HISTORY_KEY, []);

export const saveHistory = (entries) => {
  const trimmed = entries.slice(-HISTORY_MAX_DAYS);
  safeSet(HISTORY_KEY, trimmed);
  return trimmed;
};

const upsertHistoryEntry = (history, entry) => {
  const withoutDay = history.filter((h) => h.date !== entry.date);
  return [...withoutDay, entry].sort((a, b) => (a.date < b.date ? -1 : 1));
};

// -------------------------------
// Daily rollover
// -------------------------------
// Call once on app load (before the day's habit checkboxes render).
// rawHabitsRecord: { date, data } straight from localStorage, i.e.
// NOT filtered by getTodayKey() the way loadHabits() filters it —
// otherwise the previous day's completion map is already gone by
// the time we want to archive it.
export const performDailyRollover = ({
  rawHabitsRecord,
  streak,
  allHabitsForDate, // (dateKey) => habit[] visible that day
  todayKey,
}) => {
  const game = loadGameState();
  let history = loadHistory();
  let nextStreak = { ...streak };

  if (game.lastRolloverDate === todayKey) {
    // Already processed today — nothing to do.
    return { game, streak: nextStreak, history };
  }

  const pendingDate = rawHabitsRecord?.date || null;

  // Nothing pending (fresh install, or already caught up) — just
  // stamp today so we don't re-check every render.
  if (!pendingDate || pendingDate === todayKey) {
    const updatedGame = { ...game, lastRolloverDate: todayKey };
    saveGameState(updatedGame);
    return { game: updatedGame, streak: nextStreak, history };
  }

  const gapDays = Math.min(
    Math.max(0, dayDiff(pendingDate, todayKey)),
    MAX_BACKFILL_DAYS
  );

  let runningXP = game.totalXP;
  let streakBroken = false;

  for (let offset = 0; offset < gapDays; offset++) {
    const cursor = new Date(`${pendingDate}T00:00:00`);
    cursor.setDate(cursor.getDate() + offset);
    const dateKey = cursor.toISOString().split("T")[0];

    const isFirstPendingDay = offset === 0;
    const completedMap = isFirstPendingDay ? rawHabitsRecord.data || {} : {};

    const visible = allHabitsForDate(dateKey);
    const total = visible.length;
    const completed = visible.filter((h) => completedMap[h.id]).length;
    const percent = total ? Math.round((completed / total) * 100) : 0;

    const xpEarned = visible.reduce(
      (sum, h) => (completedMap[h.id] ? sum + h.xp : sum),
      0
    );
    const xpMissed = visible.reduce(
      (sum, h) => (completedMap[h.id] ? sum : sum + h.xp),
      0
    );
    // Missing a habit costs half its XP value as a discipline penalty.
    const xpPenalty = Math.round(xpMissed * 0.5);
    const net = xpEarned - xpPenalty;

    runningXP = Math.max(0, runningXP + net);
    history = upsertHistoryEntry(history, {
      date: dateKey,
      percent,
      completed,
      total,
      xpEarned,
      xpPenalty,
      net,
    });

    const fullyComplete = total > 0 && completed === total;
    if (!fullyComplete) streakBroken = true;
  }

  if (streakBroken) {
    nextStreak = { streak: 0, lastCompleted: nextStreak.lastCompleted };
  }

  const bestStreak = Math.max(game.bestStreak || 0, nextStreak.streak || 0);
  const updatedGame = {
    totalXP: runningXP,
    bestStreak,
    lastRolloverDate: todayKey,
  };

  saveGameState(updatedGame);
  history = saveHistory(history);

  return { game: updatedGame, streak: nextStreak, history };
};

// Called live whenever today's XP total changes, so the level shown
// during the day reflects "lifetime XP so far + today's progress"
// without double-counting once rollover archives today for real.
export const previewTotalXP = (todayEarnedXP = 0) => {
  const game = loadGameState();
  return game.totalXP + Math.max(0, todayEarnedXP);
};

// -------------------------------
// Trend detection for the "red alert"
// -------------------------------
export const analyzeTrend = (history = []) => {
  if (history.length < 2) {
    return { direction: "flat", alert: false, avgRecent: 0, avgPrior: 0 };
  }

  const recent = history.slice(-3);
  const prior = history.slice(-6, -3);

  const avg = (arr) =>
    arr.length ? arr.reduce((s, e) => s + e.percent, 0) / arr.length : 0;

  const avgRecent = avg(recent);
  const avgPrior = avg(prior.length ? prior : recent);

  const lastEntry = history[history.length - 1];
  const droppedHard = lastEntry && lastEntry.percent < 50;
  const trendingDown = avgRecent < avgPrior - 10;

  return {
    direction:
      avgRecent > avgPrior + 5 ? "up" : avgRecent < avgPrior - 5 ? "down" : "flat",
    alert: droppedHard || trendingDown,
    avgRecent: Math.round(avgRecent),
    avgPrior: Math.round(avgPrior),
  };
};

export const isSunday = dateIsSunday;
