import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import useScrollPosition from '../../hooks/useScrollPosition';

/**
 * ScrollToTop - Floating scroll-to-top button.
 *
 * Shows when scroll position > 300px, hides otherwise.
 * Smooth scrolls to top on click with Framer Motion show/hide animation.
 * Respects prefers-reduced-motion.
 *
 * Requirements: 11.3, 11.4
 */
export default function ScrollToTop() {
  const scrollPosition = useScrollPosition();
  const shouldReduceMotion = useReducedMotion();
  const isVisible = scrollPosition > 300;

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={handleScrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-36 right-6 md:bottom-24 z-50 flex items-center justify-center w-12 h-12 bg-primary text-white rounded-full shadow-lg hover:bg-primaryDark hover:shadow-xl transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
