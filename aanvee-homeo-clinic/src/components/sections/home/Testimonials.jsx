import React from 'react';
import { motion } from 'framer-motion';
import SectionReveal from '../../ui/SectionReveal';
import GlassCard from '../../ui/GlassCard';
import { testimonials } from '../../../data/testimonials';

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
 * Renders a star rating display.
 * @param {object} props
 * @param {number} props.rating - Rating value (1-5)
 */
function StarRating({ rating }) {
  return (
    <div className="flex gap-1" aria-label={`Rating: ${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`text-lg ${i < rating ? 'text-gold' : 'text-dark/20'}`}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
}

/**
 * Testimonials - Displays animated testimonial cards with patient reviews.
 *
 * Features staggered reveal animation on scroll and responsive grid layout.
 * Each card shows patient name, condition, review text, and star rating.
 */
export default function Testimonials() {
  return (
    <section
      className="py-16 md:py-24 bg-gradient-to-b from-cream to-white"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2
              id="testimonials-heading"
              className="font-heading text-3xl md:text-4xl font-bold text-dark tracking-tight mb-4"
            >
              What Our Patients Say
            </h2>
            <p className="text-base md:text-lg text-dark/60 leading-relaxed">
              Real stories from patients who found lasting relief through homoeopathy at Aanvee Homoeo.
            </p>
          </div>
        </SectionReveal>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          role="list"
          aria-label="Patient testimonials"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.id} variants={cardVariants} role="listitem">
              <GlassCard
                hover
                className="p-6 md:p-8 h-full flex flex-col"
              >
                <StarRating rating={testimonial.rating} />
                <blockquote className="mt-4 flex-1">
                  <p className="text-dark/70 text-sm md:text-base leading-relaxed italic">
                    &ldquo;{testimonial.review}&rdquo;
                  </p>
                </blockquote>
                <div className="mt-6 pt-4 border-t border-dark/10">
                  <p className="font-heading font-semibold text-dark text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-primary font-medium mt-0.5">
                    {testimonial.condition}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
