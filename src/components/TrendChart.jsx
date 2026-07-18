import React, { useMemo } from "react";
import { motion } from "framer-motion";

// A dependency-free line chart. Built by hand instead of pulling in a
// charting library so the build doesn't gain a new package that has
// to be npm-installed/verified — it draws a smooth-ish path across
// `points` (0..100 values) and fills underneath with a gradient.
// `danger` renders it in the red "declining" palette.
const TrendChart = ({
  points = [],
  labels = [],
  height = 160,
  danger = false,
  showAlertLine = true,
}) => {
  const width = 600;
  const pad = 16;

  const { path, areaPath, coords } = useMemo(() => {
    if (!points.length) return { path: "", areaPath: "", coords: [] };

    const stepX = (width - pad * 2) / Math.max(1, points.length - 1);
    const coords = points.map((v, i) => {
      const x = pad + i * stepX;
      const y = pad + (1 - Math.max(0, Math.min(100, v)) / 100) * (height - pad * 2);
      return [x, y];
    });

    const line = coords
      .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
      .join(" ");

    const area =
      `${line} L${coords[coords.length - 1][0].toFixed(1)},${height - pad} ` +
      `L${coords[0][0].toFixed(1)},${height - pad} Z`;

    return { path: line, areaPath: area, coords };
  }, [points, height]);

  const gradId = danger ? "trendGradDanger" : "trendGradOk";
  const strokeColor = danger ? "var(--danger)" : "var(--elite)";

  return (
    <div className="trend-chart">
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="trend-chart-svg">
        <defs>
          <linearGradient id="trendGradOk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--elite)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--elite)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="trendGradDanger" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--danger)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--danger)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {showAlertLine && (
          <line
            x1={pad}
            x2={width - pad}
            y1={pad + (1 - 0.5) * (height - pad * 2)}
            y2={pad + (1 - 0.5) * (height - pad * 2)}
            className="trend-chart-alert-line"
          />
        )}

        {areaPath && (
          <motion.path
            d={areaPath}
            fill={`url(#${gradId})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        )}

        {path && (
          <motion.path
            d={path}
            fill="none"
            stroke={strokeColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          />
        )}

        {coords.map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r="4"
            fill={strokeColor}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 + i * 0.03, duration: 0.25 }}
          />
        ))}
      </svg>

      {labels.length > 0 && (
        <div className="trend-chart-labels">
          {labels.map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendChart;
