import React from 'react';
import { motion } from 'framer-motion';
import SectionReveal from '../../ui/SectionReveal';
import GlassCard from '../../ui/GlassCard';

/**
 * MissionVision - Displays the clinic's mission and vision statements.
 */
export default function MissionVision() {
  return (
    <section
      aria-labelledby="mission-vision-heading"
      className="py-16 md:py-24 bg-cream/50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal direction="up">
          <h2
            id="mission-vision-heading"
            className="text-3xl md:text-4xl font-heading font-bold text-dark mb-6 text-center"
          >
            Mission &amp; Vision
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-12 rounded-full" aria-hidden="true" />
        </SectionReveal>

        <div className="grid md:grid-cols-2 gap-8">
          <SectionReveal direction="left" delay={0.1}>
            <GlassCard className="p-8 h-full" hover={false}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl" aria-hidden="true">🎯</span>
                <h3 className="text-xl md:text-2xl font-heading font-semibold text-dark">
                  Our Mission
                </h3>
              </div>
              <p className="text-dark/75 leading-relaxed">
                To be your trusted one-stop destination for authentic homeopathic medicines —
                offering a wide range of dilutions, mother tinctures, biochemic medicines, and
                patent products along with personalized consultation. We make quality homeopathy
                accessible to every family in our community.
              </p>
            </GlassCard>
          </SectionReveal>

          <SectionReveal direction="right" delay={0.2}>
            <GlassCard className="p-8 h-full" hover={false}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl" aria-hidden="true">🌟</span>
                <h3 className="text-xl md:text-2xl font-heading font-semibold text-dark">
                  Our Vision
                </h3>
              </div>
              <p className="text-dark/75 leading-relaxed">
                To become the most trusted homeopathy store, recognized for authentic products,
                comprehensive inventory, and expert guidance. We envision a future where every
                family has easy access to genuine homeopathic medicines for safe, sustainable,
                and side-effect-free healthcare.
              </p>
            </GlassCard>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
