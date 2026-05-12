import React, { useEffect, useState } from 'react';
import SectionReveal from '../components/ui/SectionReveal';
import TreatmentCard from '../components/sections/treatments/TreatmentCard';
import { treatments } from '../data/treatments';

/**
 * TreatmentsPage - Displays all 12 treatment cards in an accordion layout.
 *
 * Features:
 * - Breadcrumb navigation (Home > Treatments)
 * - Page header with title and description
 * - Accordion behavior: only one card expanded at a time
 * - SectionReveal scroll animations
 * - SEO meta tags (title, description, Open Graph)
 *
 * Requirements: 6.1, 6.2, 6.3, 6.4, 13.3
 */
export default function TreatmentsPage() {
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    document.title = 'Treatments | Aanvee Homoeo Store';

    const metaTags = {
      description:
        'Explore our homeopathic treatments for migraine, thyroid, PCOS, skin allergies, arthritis, and more. Natural healing with no side effects.',
      'og:title': 'Treatments | Aanvee Homoeo Store',
      'og:description':
        'Explore our homeopathic treatments for migraine, thyroid, PCOS, skin allergies, arthritis, and more. Natural healing with no side effects.',
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

  const handleToggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-8">
        <div className="space-y-4">
          {treatments.map((treatment, index) => (
            <SectionReveal
              key={treatment.id}
              direction="up"
              delay={Math.min(index * 0.05, 0.3)}
            >
              <TreatmentCard
                treatment={treatment}
                isExpanded={expandedId === treatment.id}
                onToggle={() => handleToggle(treatment.id)}
              />
            </SectionReveal>
          ))}
        </div>
      </div>
    </>
  );
}
