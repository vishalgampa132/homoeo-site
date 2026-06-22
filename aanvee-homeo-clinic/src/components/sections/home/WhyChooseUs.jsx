import React from 'react';
import { motion } from 'framer-motion';
import SectionReveal from '../../ui/SectionReveal';
import GlassCard from '../../ui/GlassCard';

const reasons = [
  {
    icon: '💊',
    title: 'Authentic Medicines',
    description:
      'Wide range of genuine dilutions, mother tinctures & biochemic medicines from trusted brands.',
  },
  {
    icon: '👩‍⚕️',
    title: 'Expert Consultation',
    description:
      'Personalized treatment by Dr. G Manasa B.H.M.S (JIMS) for acute and chronic conditions.',
  },
  {
    icon: '👨‍👩‍👧‍👦',
    title: 'Complete Family Care',
    description:
      'Safe, gentle & affordable homoeopathy for all ages — from infants to elders.',
  },
];

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
 * WhyChooseUs - Displays six reasons to choose the clinic using GlassCards.
 *
 * Features staggered reveal animation on scroll and responsive grid layout.
 * Each card contains an icon, title, and brief description.
 */
export default function WhyChooseUs() {
  return (
    <section
      className="py-16 md:py-24 bg-gradient-to-b from-white to-cream"
      aria-labelledby="why-choose-us-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2
              id="why-choose-us-heading"
              className="section-heading mb-4"
            >
              Why Choose Us
            </h2>
            <p className="section-subtitle mx-auto">
              Discover what makes Aanvee Homoeo your trusted partner in natural
              healing and wellness.
            </p>
          </div>
        </SectionReveal>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          role="list"
          aria-label="Reasons to choose us"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {reasons.map((reason) => (
            <motion.div key={reason.title} variants={cardVariants} role="listitem">
              <GlassCard
                hover
                className="p-6 md:p-8 h-full flex flex-col items-center text-center"
              >
                <span
                  className="text-4xl md:text-5xl mb-4"
                  aria-hidden="true"
                >
                  {reason.icon}
                </span>
                <h3 className="card-title mb-2">
                  {reason.title}
                </h3>
                <p className="card-body">
                  {reason.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
