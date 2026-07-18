import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  loadHistory,
  analyzeTrend,
  loadGameState,
} from "../utils/gamification";
import { formatShortDate } from "../utils/dateUtils";
import TrendChart from "../components/TrendChart";
import LevelBadge from "../components/LevelBadge";

const RANGES = [
  { key: "7", label: "7 Days", days: 7 },
  { key: "30", label: "30 Days", days: 30 },
  { key: "90", label: "90 Days", days: 90 },
];

// Buckets daily entries into weekly averages for the "weeks" view.
const toWeeklyBuckets = (entries) => {
  const buckets = [];
  for (let i = 0; i < entries.length; i += 7) {
    const chunk = entries.slice(i, i + 7);
    const avg = Math.round(
      chunk.reduce((s, e) => s + e.percent, 0) / chunk.length
    );
    buckets.push({
      date: chunk[chunk.length - 1].date,
      percent: avg,
      label: `Wk of ${formatShortDate(chunk[0].date)}`,
    });
  }
  return buckets;
};

const AnalyticsPage = () => {
  const history = useMemo(() => loadHistory(), []);
  const gameState = useMemo(() => loadGameState(), []);
  const [rangeKey, setRangeKey] = useState("30");
  const [view, setView] = useState("daily"); // daily | weekly

  const range = RANGES.find((r) => r.key === rangeKey);
  const sliced = history.slice(-range.days);
  const trend = analyzeTrend(sliced);

  const weekly = useMemo(() => toWeeklyBuckets(sliced), [sliced]);

  const activeSeries = view === "daily" ? sliced : weekly;
  const points = activeSeries.map((e) => e.percent);
  const labels =
    view === "daily"
      ? sliced
          .filter((_, i) => i % Math.max(1, Math.ceil(sliced.length / 7)) === 0)
          .map((e) => formatShortDate(e.date))
      : weekly.map((w) => w.label);

  const totalXPEarned = sliced.reduce((s, e) => s + e.xpEarned, 0);
  const totalPenalty = sliced.reduce((s, e) => s + e.xpPenalty, 0);
  const perfectDays = sliced.filter((e) => e.percent === 100).length;
  const avgCompletion = sliced.length
    ? Math.round(sliced.reduce((s, e) => s + e.percent, 0) / sliced.length)
    : 0;

  return (
    <main className="dashboard analytics-page">
      <motion.header
        className="glass analytics-hero"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <span className="header-tag">◆ APEX — Analytics</span>
          <h1>Your Discipline, Charted</h1>
          <p>Every day you show up (or don't) shapes this line.</p>
        </div>
        <LevelBadge gameState={gameState} />
      </motion.header>

      <section className="glass analytics-controls">
        <div className="analytics-tabs">
          {RANGES.map((r) => (
            <button
              key={r.key}
              className={`analytics-tab ${rangeKey === r.key ? "active" : ""}`}
              onClick={() => setRangeKey(r.key)}
            >
              {r.label}
            </button>
          ))}
        </div>
        <div className="analytics-tabs analytics-tabs-secondary">
          <button
            className={`analytics-tab ${view === "daily" ? "active" : ""}`}
            onClick={() => setView("daily")}
          >
            Daily
          </button>
          <button
            className={`analytics-tab ${view === "weekly" ? "active" : ""}`}
            onClick={() => setView("weekly")}
          >
            Weekly Avg
          </button>
        </div>
      </section>

      {trend.alert && (
        <motion.div
          className="history-alert analytics-alert"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🔻 Alert: your completion rate has dropped. Recent avg {trend.avgRecent}% vs
          {" "}
          {trend.avgPrior}% before. Missed habits are already deducting XP — don't let the
          slide continue.
        </motion.div>
      )}

      <section className="glass analytics-chart-card">
        {points.length === 0 ? (
          <p className="history-empty">No history yet — complete a few days of habits first.</p>
        ) : (
          <TrendChart points={points} labels={labels} danger={trend.alert} height={220} />
        )}
      </section>

      <section className="analytics-stat-grid">
        <StatCard label="Avg Completion" value={`${avgCompletion}%`} />
        <StatCard label="Perfect Days" value={perfectDays} />
        <StatCard label="XP Earned" value={`+${totalXPEarned}`} tone="up" />
        <StatCard label="XP Lost to Penalty" value={`-${totalPenalty}`} tone="down" />
        <StatCard label="Best Streak" value={`${gameState.bestStreak || 0} days`} />
      </section>
    </main>
  );
};

const StatCard = ({ label, value, tone }) => (
  <div className={`glass analytics-stat ${tone ? `tone-${tone}` : ""}`}>
    <small>{label}</small>
    <strong>{value}</strong>
  </div>
);

export default AnalyticsPage;
