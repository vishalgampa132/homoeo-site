import React from 'react';
import { motion } from 'framer-motion';

/**
 * GlassCard - A reusable glassmorphism card component.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} [props.className] - Additional Tailwind classes
 * @param {boolean} [props.hover=true] - Enable hover animation
 */
export default function GlassCard({ children, className = '', hover = true }) {
  const baseClasses =
    'backdrop-blur-[12px] bg-white/15 border border-white/20 rounded-xl shadow-glass';

  if (hover) {
    return (
      <motion.div
        className={`${baseClasses} ${className}`}
        whileHover={{ scale: 1.02, boxShadow: '0 8px 24px rgba(139, 26, 26, 0.15)' }}
        transition={{ duration: 0.15 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`${baseClasses} ${className}`}>
      {children}
    </div>
  );
}
