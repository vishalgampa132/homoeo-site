import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/**
 * Timeline - A vertical step-by-step timeline component with animated reveals.
 *
 * Renders a vertical timeline with connecting lines, numbered circles/icons,
 * and staggered animation for each step as it enters the viewport.
 *
 * @param {object} props
 * @param {{ title: string, description: string, icon?: string }[]} props.steps - Array of step objects
 * @param {string} [props.className] - Additional Tailwind classes
 */
export default function Timeline({ steps = [], className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  const stepVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 30 },
    visible: shouldReduceMotion
      ? { opacity: 1, y: 0 }
      : {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: 'easeOut' },
        },
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      role="list"
      aria-label="Timeline steps"
    >
      {steps.map((step, index) => (
        <motion.div
          key={index}
          className="relative flex gap-4 md:gap-6 pb-8 md:pb-12 last:pb-0"
          variants={stepVariants}
          role="listitem"
        >
          {/* Timeline line and dot */}
          <div className="flex flex-col items-center">
            {/* Circle/dot with icon or number */}
            <div className="relative z-10 flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white font-semibold text-sm md:text-base shadow-cta">
              {step.icon ? (
                <span className="text-lg md:text-xl" aria-hidden="true">
                  {step.icon}
                </span>
              ) : (
                <span>{index + 1}</span>
              )}
            </div>

            {/* Connecting line */}
            {index < steps.length - 1 && (
              <div className="w-0.5 flex-1 bg-gradient-to-b from-primary to-sage mt-2" />
            )}
          </div>

          {/* Step content */}
          <div className="pt-1 md:pt-2 pb-2">
            <h3 className="text-lg md:text-xl font-semibold text-dark font-heading">
              {step.title}
            </h3>
            <p className="mt-1 text-sm md:text-base text-dark/70 leading-relaxed">
              {step.description}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
