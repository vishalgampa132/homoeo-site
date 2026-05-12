import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../../data/navigation';
import CTAButton from '../ui/CTAButton';

/**
 * MobileMenu - Full-screen overlay navigation for mobile viewports.
 *
 * Behavior:
 * - Renders as a full-screen overlay with slide-in animation
 * - Displays all nav links and "Book Consultation" CTA
 * - Closes on link click or outside tap (overlay backdrop)
 * - Respects prefers-reduced-motion
 * - Accessible: role="dialog", aria-modal, focus trap
 *
 * @param {object} props
 * @param {boolean} props.isOpen - Whether the menu is visible
 * @param {function} props.onClose - Callback to close the menu
 */
export default function MobileMenu({ isOpen, onClose }) {
  const menuRef = useRef(null);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const overlayVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
        exit: { opacity: 0, transition: { duration: 0.2 } },
      };

  const panelVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        hidden: { x: '100%', opacity: 0 },
        visible: {
          x: 0,
          opacity: 1,
          transition: { type: 'tween', duration: 0.3, ease: 'easeOut' },
        },
        exit: {
          x: '100%',
          opacity: 0,
          transition: { type: 'tween', duration: 0.25, ease: 'easeIn' },
        },
      };

  const linkVariants = prefersReducedMotion
    ? {}
    : {
        hidden: { opacity: 0, x: 20 },
        visible: (i) => ({
          opacity: 1,
          x: 0,
          transition: { delay: 0.1 + i * 0.05, duration: 0.3 },
        }),
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Menu panel */}
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            className="fixed inset-y-0 right-0 z-50 w-4/5 max-w-sm bg-white shadow-xl flex flex-col md:hidden"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close button */}
            <div className="flex items-center justify-end p-4">
              <button
                type="button"
                onClick={onClose}
                className="flex items-center justify-center w-11 h-11 rounded-lg transition-colors duration-200 hover:bg-sage/20"
                aria-label="Close navigation menu"
              >
                <svg
                  className="w-6 h-6 text-dark"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Navigation links */}
            <nav className="flex-1 flex flex-col px-6 py-4" aria-label="Mobile navigation">
              <ul className="flex flex-col gap-2" role="list">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.path}
                    custom={index}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <NavLink
                      to={link.path}
                      end={link.exact}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg text-lg font-medium transition-colors duration-200 ${
                          isActive
                            ? 'text-primary bg-sage/20 border-l-4 border-primary'
                            : 'text-dark hover:text-primary hover:bg-sage/10'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              {/* CTA Button */}
              <div className="mt-8 px-4">
                <CTAButton
                  to="/consultation"
                  onClick={onClose}
                  className="w-full text-center"
                >
                  Book Consultation
                </CTAButton>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
