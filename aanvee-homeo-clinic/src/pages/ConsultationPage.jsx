import React, { useEffect } from 'react';
import SectionReveal from '../components/ui/SectionReveal';
import ConsultationBenefits from '../components/sections/consultation/ConsultationBenefits';
import AppointmentForm from '../components/sections/consultation/AppointmentForm';
import DoctorAvailability from '../components/sections/consultation/DoctorAvailability';

/**
 * ConsultationPage - Consultation booking page composing benefits,
 * appointment form, doctor availability, and FAQ sections.
 *
 * Sections:
 * 1. Breadcrumb navigation (Home > Consultation)
 * 2. Page header with title and description
 * 3. ConsultationBenefits - Online vs offline consultation options
 * 4. AppointmentForm - Full booking form with validation
 * 5. DoctorAvailability - Schedule, consultation types, and FAQ
 *
 * Requirements: 7.1, 7.6, 13.3
 */
export default function ConsultationPage() {
  useEffect(() => {
    document.title = 'Book Consultation | Aanvee Homoeo Store';

    const metaTags = {
      description:
        'Book your homeopathic consultation with Dr. Gande Manasa (B.H.M.S) at Aanvee Homoeo Store. Flexible scheduling and personalized treatment plans.',
      'og:title': 'Book Consultation | Aanvee Homoeo Store',
      'og:description':
        'Book your homeopathic consultation with Dr. Gande Manasa (B.H.M.S) at Aanvee Homoeo Store. Flexible scheduling and personalized treatment plans.',
      'og:type': 'website',
    };

    const cleanupTags = [];

    Object.entries(metaTags).forEach(([name, content]) => {
      const isOg = name.startsWith('og:');
      const attr = isOg ? 'property' : 'name';
      let tag = document.querySelector(`meta[${attr}="${name}"]`);

      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
        cleanupTags.push(tag);
      }

      tag.setAttribute('content', content);
    });

    return () => {
      cleanupTags.forEach((tag) => {
        if (tag.parentNode) {
          tag.parentNode.removeChild(tag);
        }
      });
    };
  }, []);

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-8">
        <SectionReveal direction="up" delay={0.1}>
          <ConsultationBenefits />
        </SectionReveal>

        <SectionReveal direction="up" delay={0.15}>
          <AppointmentForm />
        </SectionReveal>

        <SectionReveal direction="up" delay={0.2}>
          <DoctorAvailability />
        </SectionReveal>
      </div>
    </>
  );
}
