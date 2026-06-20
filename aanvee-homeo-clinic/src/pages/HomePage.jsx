import React, { useEffect, Suspense, lazy } from 'react';
import HeroSection from '../components/sections/home/HeroSection';
import AboutSnapshot from '../components/sections/home/AboutSnapshot';
import WhyChooseUs from '../components/sections/home/WhyChooseUs';
import Services from '../components/sections/home/Services';
import FeaturedTreatments from '../components/sections/home/FeaturedTreatments';
import MedicinalKits from '../components/sections/home/MedicinalKits';
import ConsultationProcess from '../components/sections/home/ConsultationProcess';
import CTABanner from '../components/sections/home/CTABanner';

// Lazy-load heavy animation components below the fold
const Testimonials = lazy(() => import('../components/sections/home/Testimonials'));

/**
 * HomePage - Landing page composing all home sections in order.
 *
 * Sections:
 * 1. HeroSection - Full-height hero with headline and CTAs
 * 2. AboutSnapshot - Brief clinic introduction with trust indicators
 * 3. WhyChooseUs - Six reasons with GlassCards
 * 4. Services - Six service items in responsive grid
 * 5. FeaturedTreatments - 8 treatment cards with animations
 * 6. ProductShowcase - Product categories carousel
 * 7. ConsultationProcess - 4-step timeline
 * 8. Testimonials - Patient review cards
 * 9. CTABanner - Final call-to-action
 *
 * Requirements: 3.1, 4.1-4.8, 13.3
 */
export default function HomePage() {
  useEffect(() => {
    document.title = 'Aanvee Homoeo Store | Dilutions, Mother Tinctures & homoeopathy Medicines';

    const metaTags = {
      description:
        'Your complete homoeopathy store — dilutions, mother tinctures, biochemic medicines & more. Consultation available with Dr. G Manasa B.H.M.S (JIMS).',
      'og:title': 'Aanvee Homoeo Store | Dilutions, Mother Tinctures & homoeopathy Medicines',
      'og:description':
        'Your complete homoeopathy store — dilutions, mother tinctures, biochemic medicines & more. Consultation available with Dr. G Manasa B.H.M.S (JIMS).',
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
      <HeroSection />
      <AboutSnapshot />
      <WhyChooseUs />
      <Services />
      <FeaturedTreatments />
      <MedicinalKits />
      <ConsultationProcess />
      <Suspense fallback={<section className="py-16 md:py-24" aria-busy="true"><div className="max-w-6xl mx-auto px-4 text-center text-dark/40">Loading testimonials...</div></section>}>
        <Testimonials />
      </Suspense>
      <CTABanner />
    </>
  );
}
