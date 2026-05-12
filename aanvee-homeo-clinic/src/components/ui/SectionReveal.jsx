import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/**
 * SectionReveal - A scroll-triggered animation wrapper using Framer Motion.
 *
 * Triggers a fade + translate animation once when the element enters the viewport.
 * Respects prefers-reduced-motion by disabling animations.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Content to animate
 * @param {'up' | 'left' | 'right' | 'fade'} [props.direction='up'] - Animation direction
 * @param {number} [props.delay=0] - Animation delay in seconds
 * @param {string} [props.className] - Additional Tailwind classes
 */
export default function SectionReveal({ children, direction = 'up', delay = 0, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const shouldReduceMotion = useReducedMotion();

  const getInitialTransform = () => {
    if (shouldReduceMotion) {
      return { opacity: 1, x: 0, y: 0 };
    }

    switch (direction) {
      case 'up':
        return { opacity: 0, y: 30 };
      case 'left':
        return { opacity: 0, x: -30 };
      case 'right':
        return { opacity: 0, x: 30 };
      case 'fade':
      default:
        return { opacity: 0 };
    }
  };

  const getAnimateTransform = () => {
    if (shouldReduceMotion) {
      return { opacity: 1, x: 0, y: 0 };
    }

    return { opacity: 1, x: 0, y: 0 };
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitialTransform()}
      animate={isInView ? getAnimateTransform() : getInitialTransform()}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
