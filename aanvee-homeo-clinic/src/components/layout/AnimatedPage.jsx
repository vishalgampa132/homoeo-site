import React from 'react';
import { motion } from 'framer-motion';

/**
 * AnimatedPage - Wrapper that applies fade/slide page transition animations.
 * Used inside AnimatePresence to animate route changes.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Page content to animate
 */

const pageVariants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

export default function AnimatedPage({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
