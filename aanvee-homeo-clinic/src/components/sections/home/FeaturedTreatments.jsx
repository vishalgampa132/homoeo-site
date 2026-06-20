import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionReveal from '../../ui/SectionReveal';
import GlassCard from '../../ui/GlassCard';
import { treatments } from '../../../data/treatments';

const featuredTreatments = treatments.slice(0, 8);

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

/**
 * FeaturedTreatments - Displays animated Treatment Cards for 8 featured conditions.
 *
 * Features a responsive grid layout (4 cols desktop, 2 tablet, 1 mobile)
 * with staggered reveal animation on scroll. Each card links to the treatments page.
 */
export default function FeaturedTreatments() {
  return (
    <section
      className="py-16 md:py-24 bg-white"
      aria-labelledby="featured-treatments-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2
              id="featured-treatments-heading"
              className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-dark mb-4"
            >
              Featured Treatments
            </h2>
            <p className="text-lg md:text-xl text-dark/70 leading-relaxed">
              Explore our specialized homoeopathic treatments for common health
              conditions, designed to heal naturally and holistically.
            </p>
          </div>
        </SectionReveal>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          role="list"
          aria-label="Featured treatments"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {featuredTreatments.map((treatment) => (
            <motion.div key={treatment.id} variants={cardVariants} role="listitem">
              <TreatmentCard treatment={treatment} />
            </motion.div>
          ))}
        </motion.div>

        <SectionReveal direction="up" delay={0.4}>
          <div className="text-center mt-12">
            <Link
              to="/treatments"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-white shadow-cta transition-all duration-150 hover:scale-105 hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #8B1A1A, #B22222)' }}
            >
              View All Treatments
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

function TreatmentCard({ treatment }) {
  return (
    <Link
      to="/treatments"
      className="block h-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
      aria-label={`Learn more about ${treatment.name} treatment`}
    >
      <GlassCard className="p-6 h-full flex flex-col items-center text-center bg-cream/50">
        <span
          className="text-4xl md:text-5xl mb-4"
          aria-hidden="true"
        >
          {treatment.icon}
        </span>
        <h3 className="font-heading text-lg md:text-xl font-semibold text-dark mb-3">
          {treatment.name}
        </h3>
        <p className="text-dark/70 text-sm md:text-base leading-relaxed line-clamp-3">
          {treatment.overview}
        </p>
      </GlassCard>
    </Link>
  );
}
