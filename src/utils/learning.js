// ===============================
// Learning Module Logic
// ===============================
// Thin domain layer between the Learning Workspace UI and storage,
// so components never touch localStorage directly.

import { loadLearningState, saveLearningState } from "./storage";
import { lessonKey } from "./progress";

export const getLearningState = loadLearningState;

export const toggleLesson = (courseId, moduleId, lessonId) => {
  const state = loadLearningState();
  const courseLessons = { ...(state.completedLessons[courseId] || {}) };
  const key = lessonKey(moduleId, lessonId);

  courseLessons[key] = !courseLessons[key];

  const updated = {
    ...state,
    completedLessons: {
      ...state.completedLessons,
      [courseId]: courseLessons,
    },
  };

  saveLearningState(updated);
  return updated;
};

export const getCompletedLessons = (courseId) => {
  const state = loadLearningState();
  return state.completedLessons[courseId] || {};
};

export const saveNote = (courseId, text) => {
  const state = loadLearningState();
  const updated = {
    ...state,
    notes: { ...state.notes, [courseId]: text },
  };
  saveLearningState(updated);
  return updated;
};

export const getNote = (courseId) => {
  const state = loadLearningState();
  return state.notes[courseId] || "";
};

export const markVisited = (courseId) => {
  const state = loadLearningState();
  const updated = {
    ...state,
    lastVisited: { ...state.lastVisited, [courseId]: new Date().toISOString() },
  };
  saveLearningState(updated);
  return updated;
};
