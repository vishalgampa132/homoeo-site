import React from 'react';
import SectionReveal from '../../ui/SectionReveal';
import CTAButton from '../../ui/CTAButton';

/**
 * CTABanner - A strong call-to-action banner encouraging visitors to book a consultation.
 *
 * Features a deep maroon gradient background, compelling headline and subtext,
 * and a CTA button linking to the consultation page.
 */
export default function CTABanner() {
  return (
    <section
      aria-labelledby="cta-banner-heading"
      className="py-16 md:py-20 px-4"
      style={{
        background: 'linear-gradient(135deg, #6B0F0F, #8B1A1A, #B22222)',
      }}
    >
      <SectionReveal direction="up">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            id="cta-banner-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4"
          >
            Ready to Start Your Healing Journey?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Book a personalized consultation with Dr. G Manasa B.H.M.S (JIMS).
            Natural, safe, and effective treatment tailored just
            for you.
          </p>
          <CTAButton to="/consultation" variant="secondary" className="text-lg px-8 py-4">
            Book Your Consultation
          </CTAButton>
        </div>
      </SectionReveal>
    </section>
  );
}
