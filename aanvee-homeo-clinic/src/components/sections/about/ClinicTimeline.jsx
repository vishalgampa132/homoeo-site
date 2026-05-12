import React from 'react';
import SectionReveal from '../../ui/SectionReveal';
import Timeline from '../../ui/Timeline';

const milestones = [
  {
    title: 'Store Established',
    description:
      'Aanvee Homoeo Store was established with a vision to provide authentic homeopathic medicines and consultation to the community.',
    icon: '🌱',
  },
  {
    title: 'Wide Range of Medicines',
    description:
      'Built a comprehensive inventory of 1000+ homeopathic medicines including dilutions, mother tinctures, biochemic salts, and patent products.',
    icon: '🏪',
  },
  {
    title: 'Consultation Services',
    description:
      'Introduced personalized homeopathic consultation with Dr. Gande Manasa (B.H.M.S) for holistic treatment of acute and chronic conditions.',
    icon: '👩‍⚕️',
  },
  {
    title: 'Trusted by Families',
    description:
      'Became a trusted destination for families seeking natural healing through authentic homeopathic medicines and expert guidance.',
    icon: '🏆',
  },
];

/**
 * ClinicTimeline - Displays an animated milestone timeline of the store's journey.
 */
export default function ClinicTimeline() {
  return (
    <section
      aria-labelledby="clinic-timeline-heading"
      className="py-16 md:py-24 bg-cream/50"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal direction="up">
          <h2
            id="clinic-timeline-heading"
            className="text-3xl md:text-4xl font-heading font-bold text-dark mb-6 text-center"
          >
            Our Journey
          </h2>
          <p className="text-center text-dark/70 max-w-2xl mx-auto mb-12">
            Key milestones in our mission to bring authentic homeopathy to every family.
          </p>
        </SectionReveal>

        <SectionReveal direction="up" delay={0.2}>
          <Timeline steps={milestones} />
        </SectionReveal>
      </div>
    </section>
  );
}
