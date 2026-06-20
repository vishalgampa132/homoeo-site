import React from 'react';
import GlassCard from '../../ui/GlassCard';
import SectionReveal from '../../ui/SectionReveal';
import FAQAccordion from '../../ui/FAQAccordion';
import { clinicInfo } from '../../../utils/constants';

const schedule = [
  { day: 'Monday - Friday', hours: '9:00 AM - 8:00 PM', available: true },
  { day: 'Saturday', hours: '9:00 AM - 6:00 PM', available: true },
  { day: 'Sunday', hours: '10:00 AM - 2:00 PM', available: true },
];

const faqItems = [
  {
    question: 'What should I bring to my appointment?',
    answer:
      'Please bring any previous medical reports, test results, current medication list, and a brief history of your health concern. For online consultations, ensure you have a stable internet connection and a quiet space.',
  },
  {
    question: 'Is online consultation as effective as in-person?',
    answer:
      'Yes, online consultations are highly effective for most conditions. Our doctor conducts detailed case-taking virtually. However, for conditions requiring physical examination, we may recommend an in-clinic visit.',
  },
  {
    question: 'How do I prepare for a homoeopathic consultation?',
    answer:
      'Avoid eating or drinking anything strong-flavored (coffee, mint, garlic) 30 minutes before your appointment. Note down your symptoms, their triggers, and any patterns you have observed.',
  },
  {
    question: 'Can I book a consultation for my child?',
    answer:
      'Absolutely! We specialize in pediatric homoeopathy. For children under 12, a parent or guardian must be present during the consultation. Please bring the child\'s vaccination and medical records.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept cash, UPI, credit/debit cards, and net banking. For online consultations, payment is collected before the session via our secure payment link.',
  },
  {
    question: 'How soon can I expect results from homoeopathic treatment?',
    answer:
      'Acute conditions may show improvement within hours to days. Chronic conditions typically require 2-4 weeks for initial improvement, with full treatment courses lasting 3-6 months depending on the condition.',
  },
];

/**
 * DoctorAvailability - Displays doctor availability schedule, consultation types, and FAQ.
 *
 * Shows the weekly schedule, types of consultations available,
 * and a FAQ accordion for common consultation questions.
 */
export default function DoctorAvailability() {
  return (
    <section aria-labelledby="doctor-availability-heading" className="py-12 md:py-16">
      <SectionReveal direction="up">
        <h2
          id="doctor-availability-heading"
          className="text-2xl md:text-3xl font-heading font-bold text-dark text-center mb-4"
        >
          Doctor Availability & Schedule
        </h2>
        <p className="text-dark/70 text-center max-w-2xl mx-auto mb-10">
          Dr. G Manasa B.H.M.S (JIMS) is available for consultation throughout the week. Book your preferred slot below.
        </p>
      </SectionReveal>

      <div className="max-w-lg mx-auto mb-12">
        {/* Weekly Schedule */}
        <SectionReveal direction="up" delay={0.1}>
          <GlassCard className="p-6" hover={false}>
            <h3 className="text-lg font-heading font-semibold text-dark mb-4">
              Weekly Schedule
            </h3>
            <div className="space-y-3" role="list" aria-label="Doctor weekly schedule">
              {schedule.map((slot, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-white/10 last:border-0"
                  role="listitem"
                >
                  <span className="font-medium text-dark">{slot.day}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-dark/70">{slot.hours}</span>
                    <span
                      className={`w-2 h-2 rounded-full ${slot.available ? 'bg-primary' : 'bg-red-400'}`}
                      aria-label={slot.available ? 'Available' : 'Unavailable'}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-dark/50 mt-4">
              * Schedule may vary on public holidays. Please call to confirm.
            </p>
          </GlassCard>
        </SectionReveal>
      </div>

      {/* FAQ Section */}
      <SectionReveal direction="up" delay={0.3}>
        <div className="max-w-3xl mx-auto">
          <h3
            id="consultation-faq-heading"
            className="text-xl md:text-2xl font-heading font-semibold text-dark text-center mb-6"
          >
            Frequently Asked Questions
          </h3>
          <FAQAccordion items={faqItems} aria-labelledby="consultation-faq-heading" />
        </div>
      </SectionReveal>
    </section>
  );
}
