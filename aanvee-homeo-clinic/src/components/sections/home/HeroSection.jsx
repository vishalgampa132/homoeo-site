import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import CTAButton from '../../ui/CTAButton';

/**
 * Floating decorative element with Framer Motion animation.
 */
function FloatingElement({ children, className = '', delay = 0, duration = 6, x = 0, y = 10 }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className={`absolute pointer-events-none select-none ${className}`} aria-hidden="true">
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={`absolute pointer-events-none select-none ${className}`}
      aria-hidden="true"
      animate={{
        y: [0, -y, 0],
        x: [0, x, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * HeroSection - Full-height hero banner for the Home page.
 *
 * Displays headline, subheadline, two CTA buttons, and animated floating
 * decorative elements (pills, herbs, glass orbs).
 */
export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  const headlineVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-cream via-white to-sage/20"
      aria-label="Hero"
    >
      {/* Floating decorative elements */}
      <FloatingElement
        className="top-[10%] left-[5%] md:left-[10%] text-4xl md:text-5xl opacity-60"
        delay={0}
        duration={7}
        y={15}
        x={5}
      >
        <span className="block w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/10" />
      </FloatingElement>

      <FloatingElement
        className="top-[20%] right-[8%] md:right-[15%] text-3xl md:text-4xl opacity-50"
        delay={1}
        duration={8}
        y={12}
        x={-4}
      >
        <span className="block w-6 h-6 md:w-10 md:h-10 rounded-full bg-sage/40 backdrop-blur-sm border border-sage/20" />
      </FloatingElement>

      <FloatingElement
        className="bottom-[25%] left-[8%] md:left-[12%] opacity-40"
        delay={0.5}
        duration={6}
        y={10}
        x={3}
      >
        <span className="block text-2xl md:text-3xl">🌿</span>
      </FloatingElement>

      <FloatingElement
        className="top-[35%] right-[5%] md:right-[8%] opacity-50"
        delay={2}
        duration={9}
        y={8}
        x={-6}
      >
        <span className="block text-xl md:text-2xl">💊</span>
      </FloatingElement>

      <FloatingElement
        className="bottom-[15%] right-[15%] md:right-[20%] opacity-30"
        delay={1.5}
        duration={7}
        y={14}
        x={4}
      >
        <span className="block w-14 h-14 md:w-20 md:h-20 rounded-full bg-gold/10 backdrop-blur-md border border-gold/20" />
      </FloatingElement>

      <FloatingElement
        className="top-[60%] left-[3%] md:left-[6%] opacity-35"
        delay={3}
        duration={10}
        y={12}
        x={-3}
      >
        <span className="block text-lg md:text-xl">🌱</span>
      </FloatingElement>

      <FloatingElement
        className="top-[8%] left-[40%] md:left-[45%] opacity-25"
        delay={2.5}
        duration={8}
        y={10}
        x={2}
      >
        <span className="block w-5 h-5 md:w-8 md:h-8 rounded-full bg-primaryLight/30 backdrop-blur-sm" />
      </FloatingElement>

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        variants={prefersReducedMotion ? undefined : containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-dark leading-tight mb-6"
          variants={prefersReducedMotion ? undefined : headlineVariants}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Your Complete homoeopathy Store & Clinic
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-dark/70 max-w-2xl mx-auto mb-10 leading-relaxed"
          variants={prefersReducedMotion ? undefined : headlineVariants}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Wide range of dilutions, mother tinctures, biochemic medicines & more. Expert homoeopathic consultation by Dr. G Manasa B.H.M.S (JIMS) for personalized treatment of all conditions.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={prefersReducedMotion ? undefined : headlineVariants}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <CTAButton to="/consultation" variant="primary">
            Book Appointment
          </CTAButton>
          <CTAButton to="/treatments" variant="outline">
            Explore Treatments
          </CTAButton>
        </motion.div>

        {/* Highlight badges */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mt-8"
          variants={prefersReducedMotion ? undefined : headlineVariants}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary">
            🚚 Free Delivery within 3 km on orders above ₹500
          </span>
          <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary">
            🏥 In-house & Online Consultation Available
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
