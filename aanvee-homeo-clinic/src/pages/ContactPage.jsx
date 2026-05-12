import React, { useEffect } from 'react';
import SectionReveal from '../components/ui/SectionReveal';
import ContactForm from '../components/sections/contact/ContactForm';
import BusinessInfo from '../components/sections/contact/BusinessInfo';
import MapEmbed from '../components/sections/contact/MapEmbed';

/**
 * ContactPage - Contact Us page composing contact form, business info,
 * and map embed sections with breadcrumb navigation.
 *
 * Sections:
 * 1. Breadcrumb navigation (Home > Contact Us)
 * 2. Page header with title and description
 * 3. Grid layout with ContactForm (left) and BusinessInfo (right)
 * 4. MapEmbed below the grid
 *
 * Requirements: 8.1, 8.2, 13.3
 */
export default function ContactPage() {
  useEffect(() => {
    document.title = 'Contact Us | Aanvee Homoeo Store';

    const metaTags = {
      description:
        'Get in touch with Aanvee Homoeo Store. Visit us, call, WhatsApp, or send a message. Find our address, working hours, and location map.',
      'og:title': 'Contact Us | Aanvee Homoeo Store',
      'og:description':
        'Get in touch with Aanvee Homoeo Store. Visit us, call, WhatsApp, or send a message. Find our address, working hours, and location map.',
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
        {/* Contact Form and Business Info side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <SectionReveal direction="left" delay={0.1}>
            <ContactForm />
          </SectionReveal>

          <SectionReveal direction="right" delay={0.15}>
            <BusinessInfo />
          </SectionReveal>
        </div>

        {/* Map below */}
        <SectionReveal direction="up" delay={0.2}>
          <MapEmbed />
        </SectionReveal>
      </div>
    </>
  );
}
