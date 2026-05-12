import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/**
 * FAQAccordion - An expandable FAQ component with animated expand/collapse.
 *
 * Renders a list of question/answer items that can be individually expanded.
 * Uses Framer Motion for smooth height animations and respects prefers-reduced-motion.
 *
 * @param {object} props
 * @param {{ question: string, answer: string }[]} props.items - Array of FAQ items
 * @param {string} [props.className] - Additional Tailwind classes
 * @param {boolean} [props.allowMultiple=false] - Allow multiple items open at once
 */
export default function FAQAccordion({ items = [], className = '', allowMultiple = false }) {
  const [openItems, setOpenItems] = useState([]);
  const shouldReduceMotion = useReducedMotion();

  const toggleItem = (index) => {
    setOpenItems((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      }
      if (allowMultiple) {
        return [...prev, index];
      }
      return [index];
    });
  };

  const isOpen = (index) => openItems.includes(index);

  const contentVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0, height: 0 }
      : { opacity: 0, height: 0 },
    visible: shouldReduceMotion
      ? { opacity: 1, height: 'auto' }
      : { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: 'easeOut' } },
    exit: shouldReduceMotion
      ? { opacity: 0, height: 0 }
      : { opacity: 0, height: 0, transition: { duration: 0.2, ease: 'easeIn' } },
  };

  return (
    <div className={`space-y-3 ${className}`} role="region" aria-label="Frequently Asked Questions">
      {items.map((item, index) => (
        <div
          key={index}
          className="rounded-xl border border-white/20 backdrop-blur-[12px] bg-white/15 shadow-card overflow-hidden"
        >
          <button
            type="button"
            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-medium text-dark hover:bg-white/10 transition-colors duration-150 min-h-[44px]"
            onClick={() => toggleItem(index)}
            aria-expanded={isOpen(index)}
            aria-controls={`faq-answer-${index}`}
            id={`faq-question-${index}`}
          >
            <span className="font-heading text-base md:text-lg">{item.question}</span>
            <motion.span
              className="shrink-0 text-primary"
              animate={{ rotate: isOpen(index) ? 180 : 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
              aria-hidden="true"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen(index) && (
              <motion.div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="overflow-hidden"
              >
                <div className="px-5 pb-4 text-sm md:text-base text-dark/70 leading-relaxed">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
