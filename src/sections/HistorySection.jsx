import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { loadHistory, analyzeTrend } from "../utils/gamification";
import { formatShortDate } from "../utils/dateUtils";
import TrendChart from "../components/TrendChart";

const HistorySection = () => {
  const history = useMemo(() => loadHistory(), []);
  const recent = history.slice(-14);
  const trend = analyzeTrend(history);

  const points = recent.map((h) => h.percent);
  const labels = recent
    .filter((_, i) => i % Math.max(1, Math.ceil(recent.length / 6)) === 0)
    .map((h) => formatShortDate(h.date));

  const hasData = recent.length > 0;

  return (
    <section className="glass history-card">
      <div className="history-header">
        <div>
          <h2>📈 Progress History</h2>
          <p>How consistent you've been, day by day.</p>
        </div>
        <Link to="/analytics" className="history-link">
          Full Analytics →
        </Link>
      </div>

      {!hasData ? (
        <p className="history-empty">
          Complete today's habits to start building your history graph.
        </p>
      ) : (
        <>
          <TrendChart points={points} labels={labels} danger={trend.alert} height={140} />

          <AnimatePresenceAlert trend={trend} />

          <div className="history-stats">
            <div>
              <small>Last 3 days avg</small>
              <strong>{trend.avgRecent}%</strong>
            </div>
            <div>
              <small>Prior 3 days avg</small>
              <strong>{trend.avgPrior}%</strong>
            </div>
            <div>
              <small>Direction</small>
              <strong className={`trend-${trend.direction}`}>
                {trend.direction === "up" ? "▲ Rising" : trend.direction === "down" ? "▼ Falling" : "— Flat"}
              </strong>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

// Small helper so the red alert banner animates in/out cleanly.
const AnimatePresenceAlert = ({ trend }) => {
  if (!trend.alert) return null;
  return (
    <motion.div
      className="history-alert"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      🔻 Your consistency is dropping — recent days are trending down. Get back on track today.
    </motion.div>
  );
};

export default HistorySection;
