const STORAGE_KEY = "apex_timer";

const defaultTimerState = {
  deepLearning: {
    duration: 7200,
    remaining: 7200,
    running: false,
    endTime: null,
  },

  practicalLearning: {
    duration: 3600,
    remaining: 3600,
    running: false,
    endTime: null,
  },
};

export const loadTimer = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    return saved
      ? JSON.parse(saved)
      : defaultTimerState;
  } catch {
    return defaultTimerState;
  }
};

export const saveTimer = (timer) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(timer)
  );
};

export const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return [
    hrs.toString().padStart(2, "0"),
    mins.toString().padStart(2, "0"),
    secs.toString().padStart(2, "0"),
  ].join(":");
};