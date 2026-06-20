import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import CTAButton from '../../ui/CTAButton';

/**
 * TreatmentCard - An expandable card displaying treatment information.
 *
 * Collapsed state: icon, name, brief overview (truncated)
 * Expanded state: full overview, symptoms list, benefits, medicines, "Book Consultation" CTA
 *
 * @param {object} props
 * @param {object} props.treatment - Treatment data object
 * @param {string} props.treatment.id - Unique identifier
 * @param {string} props.treatment.name - Treatment name
 * @param {string} props.treatment.icon - Emoji icon
 * @param {string} props.treatment.overview - Full overview text
 * @param {string[]} props.treatment.symptoms - List of symptoms
 * @param {string[]} props.treatment.benefits - List of benefits
 * @param {string[]} props.treatment.medicines - List of medicines
 * @param {string} props.treatment.slug - URL slug
 * @param {boolean} props.isExpanded - Whether the card is expanded
 * @param {function} props.onToggle - Callback to toggle expand/collapse
 */
export default function TreatmentCard({ treatment, isExpanded, onToggle }) {
  const shouldReduceMotion = useReducedMotion();

  const contentVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0, height: 0 }
      : { opacity: 0, height: 0, transition: { duration: 0.2, ease: 'easeIn' } },
    visible: shouldReduceMotion
      ? { opacity: 1, height: 'auto' }
      : { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: 'easeOut' } },
  };

  return (
    <div className="backdrop-blur-[12px] bg-white/15 border border-white/20 rounded-xl shadow-glass overflow-hidden">
      {/* Collapsed header - always visible */}
      <button
        type="button"
        className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-white/10 transition-colors duration-150 min-h-[44px]"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={`treatment-content-${treatment.id}`}
        id={`treatment-header-${treatment.id}`}
      >
        <span className="text-3xl shrink-0" aria-hidden="true">
          {treatment.icon}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-semibold text-lg text-dark">
            {treatment.name}
          </h3>
          {!isExpanded && (
            <p className="text-sm text-dark/60 mt-1 line-clamp-2">
              {treatment.overview}
            </p>
          )}
        </div>
        <motion.span
          className="shrink-0 text-primary"
          animate={{ rotate: isExpanded ? 180 : 0 }}
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

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={`treatment-content-${treatment.id}`}
            role="region"
            aria-labelledby={`treatment-header-${treatment.id}`}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4">
              {/* Full overview */}
              <p className="text-sm md:text-base text-dark/80 leading-relaxed">
                {treatment.overview}
              </p>

              {/* Symptoms */}
              {treatment.symptoms && treatment.symptoms.length > 0 && (
                <div>
                  <h4 className="font-heading font-semibold text-sm text-dark mb-2">
                    Symptoms
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-dark/70">
                    {treatment.symptoms.map((symptom, index) => (
                      <li key={index}>{symptom}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {treatment.benefits && treatment.benefits.length > 0 && (
                <div>
                  <h4 className="font-heading font-semibold text-sm text-dark mb-2">
                    Benefits of homoeopathy
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-dark/70">
                    {treatment.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Medicines */}
              {treatment.medicines && treatment.medicines.length > 0 && (
                <div>
                  <h4 className="font-heading font-semibold text-sm text-dark mb-2">
                    Common Medicines
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {treatment.medicines.map((medicine, index) => (
                      <span
                        key={index}
                        className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                      >
                        {medicine}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Button */}
              <div className="pt-2">
                <CTAButton to="/consultation" variant="primary">
                  Book Consultation
                </CTAButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
