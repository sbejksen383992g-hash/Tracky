import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import learningPath from "../data/learningPath";
import { getCompletedLessons } from "../utils/learning";
import { calcCourseProgress, countLessons, calcTotalStudyDays } from "../utils/progress";
import { staggerContainer, fadeUpItem, cardHover } from "../utils/motionVariants";

const LearningPage = () => {
  const totalLessons = learningPath.reduce(
    (sum, course) => sum + countLessons(course),
    0
  );

  const totalCompleted = learningPath.reduce((sum, course) => {
    const pct = calcCourseProgress(course, getCompletedLessons(course.id));
    const lessons = countLessons(course);
    return sum + Math.round((pct / 100) * lessons);
  }, 0);

  return (
    <main className="dashboard">
      <motion.header
        className="glass header"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="header-left">
          <span className="header-tag">📚 Full Roadmap</span>
          <h1>Learning Workspace</h1>
          <p>Every track you're building toward, in one place.</p>
        </div>

        <div className="header-right">
          <div className="info-card">
            <div>
              <small>Tracks</small>
              <h4>{learningPath.length}</h4>
            </div>
          </div>
          <div className="info-card">
            <div>
              <small>Lessons</small>
              <h4>
                {totalCompleted}/{totalLessons}
              </h4>
            </div>
          </div>
        </div>
      </motion.header>

      <motion.section
        className="learning-grid page-grid"
        variants={staggerContainer(0.06)}
        initial="hidden"
        animate="show"
      >
        {learningPath.map((course) => {
          const lessons = countLessons(course);
          const progress = calcCourseProgress(
            course,
            getCompletedLessons(course.id)
          );
          const studyDays = calcTotalStudyDays(course);

          return (
            <motion.div variants={fadeUpItem} {...cardHover} key={course.id}>
              <Link
                to={`/learning/${course.id}`}
                className="mission-card course-card"
                style={{ borderColor: `${course.color}55` }}
              >
                <div className="mission-title">
                  <h3>
                    {course.icon} {course.title}
                  </h3>
                </div>

                <p>{course.instructor}</p>

                {lessons > 0 ? (
                  <>
                    <div className="progress-track">
                      <motion.div
                        className="progress-fill"
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        style={{ background: course.color }}
                      />
                    </div>
                    <div className="progress-footer">
                      <span>{progress}% Complete</span>
                      <span>{lessons} lessons · ~{studyDays}d</span>
                    </div>
                  </>
                ) : (
                  <div className="progress-footer">
                    <span>No lessons added yet</span>
                    <span>Est. {course.estimatedDays}d</span>
                  </div>
                )}
              </Link>
            </motion.div>
          );
        })}
      </motion.section>
    </main>
  );
};

export default LearningPage;
