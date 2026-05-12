import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/**
 * StickyBookButton - Sticky "Book Appointment" button for mobile.
 *
 * Displays at the bottom of the screen only on viewports < 768px.
 * Links to /consultation page.
 * Uses a media query listener to show/hide based on viewport width.
 *
 * Requirements: 11.5
 */
export default function StickyBookButton() {
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const handleChange = (e) => {
      setIsMobile(e.matches);
    };

    // Set initial value
    setIsMobile(mediaQuery.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <AnimatePresence>
      {isMobile && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <Link
            to="/consultation"
            className="block w-full py-3 px-6 text-center text-white font-semibold bg-gradient-to-r from-primary to-primaryLight rounded-lg shadow-cta hover:from-primaryDark hover:to-primary transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Book Appointment"
          >
            Book Appointment
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
