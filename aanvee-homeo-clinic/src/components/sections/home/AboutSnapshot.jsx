import React from 'react';
import SectionReveal from '../../ui/SectionReveal';
import CTAButton from '../../ui/CTAButton';

const trustIndicators = [
  { value: '1000+', label: 'Medicines Available', icon: '💊' },
  { value: '200+', label: 'Dilutions in Stock', icon: '🧪' },
  { value: '150+', label: 'Mother Tinctures', icon: '🌿' },
  { value: '100%', label: 'Authentic Products', icon: '✅' },
];

/**
 * AboutSnapshot - Brief store introduction section for the Home page.
 *
 * Displays a short overview of the store, wide range of medicines,
 * and trust indicators (dilutions, mother tinctures, etc.).
 * Wrapped in SectionReveal for scroll-triggered animation.
 */
export default function AboutSnapshot() {
  return (
    <section
      className="py-16 md:py-24 bg-cream"
      aria-labelledby="about-snapshot-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2
              id="about-snapshot-heading"
              className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-dark mb-6"
            >
              About Our Store
            </h2>
            <p className="text-lg md:text-xl text-dark/70 leading-relaxed">
              Aanvee Homoeo Store is your one-stop destination for authentic
              homeopathic medicines. We stock a wide range of dilutions, mother
              tinctures, biochemic medicines, patent products, and more from
              trusted brands. Consultation available with our qualified homeopathic doctor.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal direction="up" delay={0.2}>
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12"
            role="list"
            aria-label="Trust indicators"
          >
            {trustIndicators.map((indicator) => (
              <div
                key={indicator.label}
                className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-primary/10 shadow-card"
                role="listitem"
              >
                <span className="block text-3xl mb-2" aria-hidden="true">
                  {indicator.icon}
                </span>
                <span className="block text-2xl sm:text-3xl font-bold text-primary font-heading">
                  {indicator.value}
                </span>
                <span className="block text-sm sm:text-base text-dark/60 mt-1">
                  {indicator.label}
                </span>
              </div>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal direction="fade" delay={0.4}>
          <div className="text-center">
            <CTAButton to="/about" variant="outline">
              Learn More About Us
            </CTAButton>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
