import React, { useEffect } from 'react';
import SectionReveal from '../components/ui/SectionReveal';
import ClinicStory from '../components/sections/about/ClinicStory';
import MissionVision from '../components/sections/about/MissionVision';
import DoctorProfiles from '../components/sections/about/DoctorProfiles';
import ClinicTimeline from '../components/sections/about/ClinicTimeline';

/**
 * AboutPage - About Us page composing clinic story, mission/vision,
 * doctor profiles, and clinic timeline sections.
 *
 * Sections:
 * 1. Breadcrumb navigation
 * 2. Page header with title
 * 3. ClinicStory - Founding story and values
 * 4. MissionVision - Mission and vision statements
 * 5. DoctorProfiles - Consultant profiles in GlassCards
 * 6. ClinicTimeline - Animated milestone timeline
 *
 * Requirements: 5.1, 5.2, 5.3, 13.3
 */
export default function AboutPage() {
  useEffect(() => {
    document.title = 'About Us | Aanvee Homoeo Store';

    const metaTags = {
      description:
        'Learn about Aanvee Homoeo Store — your complete homoeopathy destination for dilutions, mother tinctures, and authentic medicines with consultation by Dr. G Manasa B.H.M.S (JIMS).',
      'og:title': 'About Us | Aanvee Homoeo Store',
      'og:description':
        'Learn about Aanvee Homoeo Store — your complete homoeopathy destination for dilutions, mother tinctures, and authentic medicines with consultation by Dr. G Manasa B.H.M.S (JIMS).',
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
      <SectionReveal direction="up" delay={0.1}>
        <ClinicStory />
      </SectionReveal>

      <SectionReveal direction="up" delay={0.15}>
        <MissionVision />
      </SectionReveal>

      <SectionReveal direction="up" delay={0.2}>
        <DoctorProfiles />
      </SectionReveal>

      <SectionReveal direction="up" delay={0.25}>
        <ClinicTimeline />
      </SectionReveal>
    </>
  );
}
