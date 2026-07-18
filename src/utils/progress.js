// ===============================
// Shared Progress Calculations
// ===============================

// Flattens a course's modules into a single lesson list, each tagged
// with its parent module id so completion state can be looked up.
export const flattenLessons = (course) => {
  if (!course || !Array.isArray(course.modules)) return [];

  return course.modules.flatMap((module) =>
    (module.lessons || []).map((lesson) => ({
      ...lesson,
      moduleId: module.id,
      moduleTitle: module.title,
    }))
  );
};

export const countLessons = (course) => flattenLessons(course).length;

// completedMap shape: { [courseId]: { [lessonKey]: true } }
export const lessonKey = (moduleId, lessonId) => `${moduleId}-${lessonId}`;

export const calcCourseProgress = (course, completedLessons = {}) => {
  const lessons = flattenLessons(course);
  if (lessons.length === 0) return 0;

  const done = lessons.filter(
    (lesson) => completedLessons[lessonKey(lesson.moduleId, lesson.id)]
  ).length;

  return Math.round((done / lessons.length) * 100);
};

export const calcModuleProgress = (module, completedLessons = {}) => {
  const lessons = module.lessons || [];
  if (lessons.length === 0) return 0;

  const done = lessons.filter(
    (lesson) => completedLessons[lessonKey(module.id, lesson.id)]
  ).length;

  return Math.round((done / lessons.length) * 100);
};

// Finds the first incomplete lesson so "Continue" can resume exactly
// where the learner left off. Returns null when everything is done
// or the course has no lessons yet.
export const findNextLesson = (course, completedLessons = {}) => {
  const lessons = flattenLessons(course);

  return (
    lessons.find(
      (lesson) => !completedLessons[lessonKey(lesson.moduleId, lesson.id)]
    ) || null
  );
};

export const calcTotalStudyDays = (course) => {
  const lessons = flattenLessons(course);
  return lessons.reduce((sum, lesson) => sum + (lesson.duration || 0), 0);
};
