import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import learningPath from "../data/learningPath";
import { getCompletedLessons } from "../utils/learning";
import { calcCourseProgress, countLessons } from "../utils/progress";
import { staggerContainer, fadeUpItem, cardHover } from "../utils/motionVariants";

const LearningSection = () => {
  return (
    <section className="glass learning-card">
      <div className="learning-header">
        <div>
          <h2>📚 Learning Roadmap</h2>
          <p>Complete every milestone to become a full-stack developer.</p>
        </div>

        <div className="learning-header-right">
          <span className="course-badge">{learningPath.length} Modules</span>
          <Link to="/learning" className="view-all-link">
            View All →
          </Link>
        </div>
      </div>

      <motion.div
        className="learning-grid"
        variants={staggerContainer(0.07)}
        initial="hidden"
        animate="show"
      >
        {learningPath.map((course) => {
          const totalLessons = countLessons(course);
          const progress = calcCourseProgress(
            course,
            getCompletedLessons(course.id)
          );

          return (
            <motion.div
              className="mission-card"
              key={course.id}
              variants={fadeUpItem}
              {...cardHover}
            >
              <div className="mission-title">
                <h3>
                  {course.icon} {course.title}
                </h3>
              </div>

              <p>
                {totalLessons > 0
                  ? `${totalLessons} lessons · ${course.instructor}`
                  : "No lessons added to this track yet"}
              </p>

              <div className="progress-track">
                <motion.div
                  className="progress-fill"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              <div className="progress-footer">
                <span>{progress}% Complete</span>

                <Link to={`/learning/${course.id}`} className="primary-btn">
                  Continue →
                </Link>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default LearningSection;
