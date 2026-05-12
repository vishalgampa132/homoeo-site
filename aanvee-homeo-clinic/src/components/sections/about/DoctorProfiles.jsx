import React from 'react';
import SectionReveal from '../../ui/SectionReveal';
import GlassCard from '../../ui/GlassCard';

/**
 * DoctorProfiles - Displays the consulting doctor profile.
 */
export default function DoctorProfiles() {
  return (
    <section aria-labelledby="doctor-profiles-heading" className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal direction="up">
          <h2
            id="doctor-profiles-heading"
            className="text-3xl md:text-4xl font-heading font-bold text-dark mb-6 text-center"
          >
            Our Consultant
          </h2>
          <p className="text-center text-dark/70 max-w-2xl mx-auto mb-12">
            Get personalized homeopathic consultation from our qualified practitioner.
          </p>
        </SectionReveal>

        <SectionReveal direction="up" delay={0.1}>
          <div className="max-w-md mx-auto">
            <GlassCard className="p-8 md:p-10 flex flex-col items-center text-center">
              {/* Avatar placeholder */}
              <div
                className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primaryLight flex items-center justify-center mb-5"
                aria-hidden="true"
              >
                <span className="text-white text-3xl font-bold">GM</span>
              </div>

              <h3 className="text-xl md:text-2xl font-heading font-semibold text-dark">
                Dr. Gande Manasa
              </h3>
              <p className="text-base text-primary font-medium mt-2">
                B.H.M.S
              </p>
              <p className="mt-4 text-dark/70 leading-relaxed">
                Providing personalized homeopathic consultation and treatment for a wide range of acute and chronic conditions.
              </p>
            </GlassCard>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
