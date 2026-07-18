import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import learningPath from "../data/learningPath";
import {
  getCompletedLessons,
  toggleLesson,
  getNote,
  saveNote,
  markVisited,
} from "../utils/learning";
import {
  calcCourseProgress,
  calcModuleProgress,
  countLessons,
  lessonKey,
  findNextLesson,
} from "../utils/progress";
import { staggerContainer, fadeUpItem } from "../utils/motionVariants";

const AUTOSAVE_DELAY = 600;

const CourseWorkspace = () => {
  const { courseId } = useParams();
  const course = useMemo(
    () => learningPath.find((c) => c.id === courseId),
    [courseId]
  );

  const [completed, setCompleted] = useState({});
  const [note, setNote] = useState("");
  const [savedNote, setSavedNote] = useState(true);
  const [openModuleId, setOpenModuleId] = useState(null);

  useEffect(() => {
    if (!course) return;
    setCompleted(getCompletedLessons(course.id));
    setNote(getNote(course.id));
    markVisited(course.id);
  }, [course]);

  // Auto-save notes after the user stops typing
  useEffect(() => {
    if (!course) return;
    setSavedNote(false);
    const timeout = setTimeout(() => {
      saveNote(course.id, note);
      setSavedNote(true);
    }, AUTOSAVE_DELAY);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note]);

  if (!course) {
    return (
      <main className="dashboard">
        <motion.section
          className="glass empty-state"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2>Track not found</h2>
          <p>This learning track doesn't exist.</p>
          <Link to="/learning" className="primary-btn">
            ← Back to Roadmap
          </Link>
        </motion.section>
      </main>
    );
  }

  const totalLessons = countLessons(course);
  const progress = calcCourseProgress(course, completed);
  const nextLesson = findNextLesson(course, completed);
  const practiceProjects = [
    ...new Set(
      course.modules
        .filter((m) => m.project)
        .map((m) => m.project)
    ),
  ];

  const handleToggle = (moduleId, lessonId) => {
    const updated = toggleLesson(course.id, moduleId, lessonId);
    setCompleted(updated.completedLessons[course.id] || {});
  };

  const jumpToNext = () => {
    if (!nextLesson) return;
    setOpenModuleId(nextLesson.moduleId);
    setTimeout(() => {
      document
        .getElementById(`lesson-${nextLesson.moduleId}-${nextLesson.id}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 80);
  };

  return (
    <main className="dashboard">
      <motion.header
        className="glass header course-header"
        style={{ borderColor: `${course.color}55` }}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="header-left">
          <span className="header-tag">
            {course.icon} {course.instructor}
          </span>
          <h1>{course.title}</h1>
          <p>
            {totalLessons > 0
              ? `${totalLessons} lessons across ${course.modules.length} modules.`
              : "No lessons have been added to this track yet."}
          </p>
        </div>

        <div className="header-right">
          <div className="info-card">
            <div>
              <small>Progress</small>
              <h4>{progress}%</h4>
            </div>
          </div>
          <div className="info-card">
            <div>
              <small>Estimated</small>
              <h4>{course.estimatedDays}d</h4>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="progress-track workspace-progress">
        <motion.div
          className="progress-fill"
          animate={{ width: `${progress}%`, background: course.color }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <AnimatePresence mode="wait">
        {nextLesson ? (
          <motion.div
            key="continue"
            className="glass continue-banner"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            <div>
              <small>Continue where you left off</small>
              <h3>
                {nextLesson.moduleTitle} → {nextLesson.title}
              </h3>
            </div>
            <motion.button
              className="primary-btn"
              onClick={jumpToNext}
              whileTap={{ scale: 0.96 }}
            >
              Jump to Lesson →
            </motion.button>
          </motion.div>
        ) : totalLessons > 0 ? (
          <motion.div
            key="complete"
            className="glass continue-banner"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div>
              <h3>🎉 Every lesson in this track is complete</h3>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <section className="workspace-grid">
        <div className="glass workspace-modules">
          <h2>Modules</h2>

          {course.modules.length === 0 && (
            <p className="muted">No modules added to this track yet.</p>
          )}

          {course.modules.map((module) => {
            const moduleProgress = calcModuleProgress(module, completed);
            const isOpen = openModuleId === module.id;

            return (
              <div className="module-block" key={module.id}>
                <button
                  className="module-header"
                  onClick={() =>
                    setOpenModuleId(isOpen ? null : module.id)
                  }
                >
                  <div>
                    <h3>{module.title}</h3>
                    {module.project && (
                      <span className="module-project">
                        Project: {module.project}
                      </span>
                    )}
                  </div>
                  <div className="module-header-right">
                    <span>{moduleProgress}%</span>
                    <motion.span
                      className="chevron"
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      ▾
                    </motion.span>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="lesson-list"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <motion.div
                        variants={staggerContainer(0.04)}
                        initial="hidden"
                        animate="show"
                      >
                        {module.lessons.map((lesson) => {
                          const done =
                            completed[lessonKey(module.id, lesson.id)] || false;
                          return (
                            <motion.div
                              id={`lesson-${module.id}-${lesson.id}`}
                              key={lesson.id}
                              variants={fadeUpItem}
                              className={`lesson-item ${done ? "completed" : ""}`}
                              onClick={() => handleToggle(module.id, lesson.id)}
                              whileTap={{ scale: 0.99 }}
                            >
                              <span className="lesson-check">
                                {done ? "✅" : "⬜"}
                              </span>
                              <div className="lesson-info">
                                <h4>{lesson.title}</h4>
                                <p>{lesson.practical}</p>
                              </div>
                              <span className="lesson-duration">
                                {lesson.duration}d
                              </span>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <motion.div
          className="workspace-side"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="glass workspace-stats">
            <h2>Stats</h2>
            <div className="stat-row">
              <span>Lessons completed</span>
              <strong>
                {Object.values(completed).filter(Boolean).length}/
                {totalLessons}
              </strong>
            </div>
            <div className="stat-row">
              <span>Modules</span>
              <strong>{course.modules.length}</strong>
            </div>
            <div className="stat-row">
              <span>Practice projects</span>
              <strong>{practiceProjects.length}</strong>
            </div>
          </div>

          {practiceProjects.length > 0 && (
            <div className="glass workspace-projects">
              <h2>Practice Projects</h2>
              <ul>
                {practiceProjects.map((project) => (
                  <li key={project}>{project}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="glass workspace-notes">
            <h2>Notes</h2>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Jot down anything worth remembering from this track..."
              rows={8}
            />
            <span className="autosave-status">
              {savedNote ? "Saved" : "Saving…"}
            </span>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default CourseWorkspace;
