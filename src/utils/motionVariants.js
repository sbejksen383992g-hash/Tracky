// ===============================
// Shared Framer Motion Variants
// ===============================
// Centralised so every grid/list in the app staggers and eases the
// same way instead of each component inventing its own timing.

export const staggerContainer = (staggerDelay = 0.06, initialDelay = 0) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: initialDelay,
    },
  },
});

export const fadeUpItem = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeItem = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
};

export const cardHover = {
  whileHover: { y: -4, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
  whileTap: { scale: 0.98 },
};
