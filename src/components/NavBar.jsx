import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const LINKS = [
  { to: "/", label: "Dashboard", icon: "🏠", end: true },
  { to: "/analytics", label: "Analytics", icon: "📈" },
  { to: "/learning", label: "Learning", icon: "📚" },
  { to: "/diary", label: "Diary", icon: "📝" },
];

const NavBar = () => {
  const location = useLocation();

  const isActive = (link) =>
    link.end ? location.pathname === link.to : location.pathname.startsWith(link.to);

  return (
    <motion.nav
      className="glass top-nav"
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="nav-brand">⚡ APEX</span>

      <div className="nav-links">
        {LINKS.map((link) => {
          const active = isActive(link);
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={`nav-link${active ? " active" : ""}`}
            >
              {active && (
                <motion.span
                  layoutId="nav-pill"
                  className="nav-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="nav-link-content">
                <span>{link.icon}</span>
                {link.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default NavBar;
