import React from 'react';
import SectionReveal from '../../ui/SectionReveal';
import Timeline from '../../ui/Timeline';

const consultationSteps = [
  {
    title: 'Appointment Booking',
    description:
      'Schedule your consultation online or by phone. Choose between in-clinic or virtual appointments at a time that suits you.',
    icon: '📅',
  },
  {
    title: 'Health Assessment',
    description:
      'Our homeopath conducts a thorough evaluation of your symptoms, medical history, and lifestyle to understand your unique health profile.',
    icon: '🩺',
  },
  {
    title: 'Personalized Medicine',
    description:
      'Based on your assessment, we prescribe individualized homeopathic remedies sourced from trusted manufacturers for safe and effective healing.',
    icon: '💊',
  },
  {
    title: 'Doorstep Delivery',
    description:
      'Get your medicines delivered to your doorstep. Free delivery within 3 km on orders above ₹500.',
    icon: '🚚',
  },
  {
    title: 'Follow-up Care',
    description:
      'We monitor your progress with regular follow-ups, adjusting treatment as needed to ensure long-term wellness and recovery.',
    icon: '🔄',
  },
];

/**
 * ConsultationProcess - Displays the 4-step consultation workflow as a timeline.
 *
 * Uses the Timeline component to show the process from booking to follow-up care.
 * Wrapped in SectionReveal for scroll-triggered animation.
 */
export default function ConsultationProcess() {
  return (
    <section
      className="py-16 md:py-24 bg-white"
      aria-labelledby="consultation-process-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2
              id="consultation-process-heading"
              className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-dark mb-4"
            >
              How It Works
            </h2>
            <p className="text-lg md:text-xl text-dark/70 leading-relaxed">
              Your journey to natural healing in five simple steps — from
              booking to doorstep delivery.
            </p>
          </div>
        </SectionReveal>

        <Timeline steps={consultationSteps} className="max-w-2xl mx-auto" />
      </div>
    </section>
  );
}
