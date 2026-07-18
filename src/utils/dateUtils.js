// ===============================
// Shared Date Utilities
// ===============================
// Single source of truth for "what day is it" so every module
// (habits, timer, learning, diary) agrees on day boundaries.

export const getTodayKey = () => {
  return new Date().toISOString().split("T")[0]; // YYYY-MM-DD
};

export const isSunday = (date = new Date()) => date.getDay() === 0;

export const formatLongDate = (date = new Date(), locale = "en-IN") => {
  return date.toLocaleDateString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const formatShortDate = (dateKey, locale = "en-IN") => {
  const date = new Date(`${dateKey}T00:00:00`);
  return date.toLocaleDateString(locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
};

// Difference in whole days between two YYYY-MM-DD keys (b - a)
export const dayDiff = (aKey, bKey) => {
  const a = new Date(`${aKey}T00:00:00`);
  const b = new Date(`${bKey}T00:00:00`);
  return Math.round((b - a) / 86400000);
};
