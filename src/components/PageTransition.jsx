import React from "react";
import { motion } from "framer-motion";

// Cinematic enter/exit motion for every route: a soft blur-and-scale settle
// rather than a plain fade, plus a signature gold sweep that fires across
// the top of the viewport on every navigation - the one recurring "premium"
// beat that ties the whole app together.
const variants = {
  initial: { opacity: 0, y: 22, scale: 0.985, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -14,
    scale: 0.985,
    filter: "blur(4px)",
    transition: { duration: 0.32, ease: [0.4, 0, 1, 1] },
  },
};

const sweepVariants = {
  initial: { scaleX: 0, opacity: 1 },
  animate: {
    scaleX: 1,
    opacity: [1, 1, 0],
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], times: [0, 0.7, 1] },
  },
  exit: { opacity: 0 },
};

const PageTransition = ({ children }) => (
  <>
    <motion.div
      className="route-sweep"
      variants={sweepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    />
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  </>
);

export default PageTransition;
