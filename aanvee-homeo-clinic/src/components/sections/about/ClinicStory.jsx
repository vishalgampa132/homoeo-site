import React from 'react';
import SectionReveal from '../../ui/SectionReveal';

/**
 * ClinicStory - Displays the store's founding story, journey, and values.
 */
export default function ClinicStory() {
  return (
    <section aria-labelledby="clinic-story-heading" className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal direction="up">
          <h2
            id="clinic-story-heading"
            className="section-heading mb-5 text-center"
          >
            Our Story
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-8 rounded-full" aria-hidden="true" />
        </SectionReveal>

        <SectionReveal direction="up" delay={0.1}>
          <div className="prose prose-lg max-w-none text-dark/60 leading-relaxed space-y-6">
            <p>
              Aanvee Homoeo Store was founded with a simple yet powerful vision — to make
              authentic homoeopathic medicines accessible to every family. We are your complete
              homoeopathy destination, stocking a wide range of dilutions, mother tinctures,
              biochemic medicines, patent products, and wellness supplements.
            </p>
            <p>
              We recognized the need for a reliable store where patients and practitioners alike
              could find genuine, high-quality homoeopathic products from trusted manufacturers.
              Whether you need a specific potency dilution, a rare mother tincture, or everyday
              biochemic salts — we have it all under one roof.
            </p>
            <p>
              Beyond being a store, we also offer personalized homoeopathic consultation with our
              qualified doctor, Dr. G Manasa B.H.M.S (JIMS), who provides holistic treatment plans
              addressing the root cause of ailments.
            </p>
            <p>
              At Aanvee Homoeo Store, we believe in the gentle power of homoeopathy and are
              committed to helping our community achieve natural wellness through authentic
              medicines and compassionate care.
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
