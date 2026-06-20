import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../ui/GlassCard';
import SectionReveal from '../../ui/SectionReveal';

const onlineBenefits = [
  {
    icon: '🏠',
    title: 'Consult from Home',
    description: 'Get expert homoeopathic consultation from the comfort of your home, anywhere in India.',
  },
  {
    icon: '⏰',
    title: 'Flexible Scheduling',
    description: 'Choose appointment slots that fit your schedule, including evenings and weekends.',
  },
  {
    icon: '💊',
    title: 'Medicine Delivery',
    description: 'Prescribed medicines delivered to your doorstep with proper packaging and instructions.',
  },
  {
    icon: '📱',
    title: 'Easy Follow-ups',
    description: 'Quick follow-up consultations via video call without travel time or waiting.',
  },
];

const offlineBenefits = [
  {
    icon: '🩺',
    title: 'In-Person Assessment',
    description: 'Thorough physical examination and detailed case-taking for accurate diagnosis.',
  },
  {
    icon: '🤝',
    title: 'Personal Connection',
    description: 'Build a stronger doctor-patient relationship with face-to-face interaction.',
  },
  {
    icon: '🏥',
    title: 'Immediate Medicine',
    description: 'Walk out with your prescribed medicines directly from our in-house store.',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Family Consultations',
    description: 'Bring the whole family for comprehensive health assessments in one visit.',
  },
];

/**
 * ConsultationBenefits - Displays benefits of online vs offline consultation.
 *
 * Shows two sections comparing the advantages of each consultation mode
 * using GlassCard components with icons and descriptions.
 */
export default function ConsultationBenefits() {
  return (
    <section aria-labelledby="consultation-benefits-heading" className="py-12 md:py-16">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Online Consultation */}
        <SectionReveal direction="left" delay={0.1}>
          <div>
            <h3 className="text-xl font-heading font-semibold text-primary mb-4 flex items-center gap-2">
              <span aria-hidden="true">💻</span> Online Consultation
            </h3>
            <div className="space-y-4" role="list" aria-label="Online consultation benefits">
              {onlineBenefits.map((benefit, index) => (
                <GlassCard key={index} className="p-4" hover={true}>
                  <div className="flex items-start gap-3" role="listitem">
                    <span className="text-2xl shrink-0" aria-hidden="true">
                      {benefit.icon}
                    </span>
                    <div>
                      <h4 className="font-medium text-dark">{benefit.title}</h4>
                      <p className="text-sm text-dark/70 mt-1">{benefit.description}</p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* Offline Consultation */}
        <SectionReveal direction="right" delay={0.2}>
          <div>
            <h3 className="text-xl font-heading font-semibold text-primary mb-4 flex items-center gap-2">
              <span aria-hidden="true">🏥</span> In-Clinic Consultation
            </h3>
            <div className="space-y-4" role="list" aria-label="In-clinic consultation benefits">
              {offlineBenefits.map((benefit, index) => (
                <GlassCard key={index} className="p-4" hover={true}>
                  <div className="flex items-start gap-3" role="listitem">
                    <span className="text-2xl shrink-0" aria-hidden="true">
                      {benefit.icon}
                    </span>
                    <div>
                      <h4 className="font-medium text-dark">{benefit.title}</h4>
                      <p className="text-sm text-dark/70 mt-1">{benefit.description}</p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
