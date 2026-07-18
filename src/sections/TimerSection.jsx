import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  loadTimer,
  saveTimer,
  formatTime,
} from "../utils/timer";

const TimerSection = () => {
  const [timers, setTimers] = useState(loadTimer());

  useEffect(() => {
    saveTimer(timers);
  }, [timers]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => {
        const updated = { ...prev };

        ["deepLearning", "practicalLearning"].forEach((key) => {
          const timer = updated[key];

          if (!timer.running || !timer.endTime) return;

          const remaining = Math.max(
            0,
            Math.floor((timer.endTime - Date.now()) / 1000)
          );

          timer.remaining = remaining;

          if (remaining <= 0) {
            timer.running = false;
            timer.remaining = 0;
            timer.endTime = null;
          }
        });

        return { ...updated };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const startTimer = (key) => {
    setTimers((prev) => {
      const timer = prev[key];

      if (timer.running) return prev;

      return {
        ...prev,
        [key]: {
          ...timer,
          running: true,
          endTime: Date.now() + timer.remaining * 1000,
        },
      };
    });
  };

  const pauseTimer = (key) => {
    setTimers((prev) => {
      const timer = prev[key];

      if (!timer.running) return prev;

      return {
        ...prev,
        [key]: {
          ...timer,
          running: false,
          remaining: Math.max(
            0,
            Math.floor((timer.endTime - Date.now()) / 1000)
          ),
          endTime: null,
        },
      };
    });
  };

  const resetTimer = (key) => {
    setTimers((prev) => {
      const timer = prev[key];

      return {
        ...prev,
        [key]: {
          ...timer,
          running: false,
          remaining: timer.duration,
          endTime: null,
        },
      };
    });
  };

  const TimerCard = ({ title, timerKey }) => {
    const timer = timers[timerKey];

    const progress =
      ((timer.duration - timer.remaining) /
        timer.duration) *
      100;

    const radius = 95;

    const circumference =
      2 * Math.PI * radius;

    const offset =
      circumference -
      (progress / 100) * circumference;

    return (
      <motion.div
        className="glass timer-card premium-timer"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >

        <div className="timer-top">

          <span className="timer-badge">
            ⚡ Focus Session
          </span>

          <h3>{title}</h3>

        </div>

        <div className="timer-ring-wrapper">

          <svg
            className="timer-ring"
            width="240"
            height="240"
          >

            <defs>

              <linearGradient
                id="timerGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="#7C3AED"
                />

                <stop
                  offset="50%"
                  stopColor="#3B82F6"
                />

                <stop
                  offset="100%"
                  stopColor="#22D3EE"
                />

              </linearGradient>

            </defs>

            <circle
              className="timer-track"
              cx="120"
              cy="120"
              r={radius}
            />

            <motion.circle
              className={`timer-progress ${timer.running ? "pulse" : ""}`}
              cx="120"
              cy="120"
              r={radius}
              strokeDasharray={circumference}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />

          </svg>

          <div className="timer-content">

            <h1 className="timer-time">
              {formatTime(timer.remaining)}
            </h1>

            <span
              className={`timer-status ${
                timer.running
                  ? "running"
                  : "paused"
              }`}
            >
              {timer.running
                ? "🟢 Focus Mode Active"
                : "⚪ Ready To Focus"}
            </span>

          </div>

        </div>

        <div className="timer-controls">

          <motion.button
            className="timer-btn start-btn"
            onClick={() => startTimer(timerKey)}
            disabled={timer.running}
            whileTap={{ scale: 0.94 }}
          >
            ▶ Start
          </motion.button>

          <motion.button
            className="timer-btn pause-btn"
            onClick={() => pauseTimer(timerKey)}
            disabled={!timer.running}
            whileTap={{ scale: 0.94 }}
          >
            ⏸ Pause
          </motion.button>

          <motion.button
            className="timer-btn reset-btn"
            onClick={() => resetTimer(timerKey)}
            whileTap={{ scale: 0.94 }}
          >
            ↺ Reset
          </motion.button>

        </div>

      </motion.div>
    );

  };
    return (
    <section className="glass timer-section">

      <div className="timer-section-header">

        <div>
          <h2>🎯 Elite Focus Sessions</h2>
          <p>
            Deep work beats motivation. Stay consistent and complete every session.
          </p>
        </div>

      </div>

      <div className="timer-grid">

        <TimerCard
          title="Deep Learning"
          timerKey="deepLearning"
        />

        <TimerCard
          title="Practical Learning"
          timerKey="practicalLearning"
        />

      </div>

    </section>
  );

};

export default TimerSection;
