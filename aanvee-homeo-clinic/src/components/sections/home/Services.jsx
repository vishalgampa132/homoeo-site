import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionReveal from '../../ui/SectionReveal';
import { services } from '../../../data/services';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

/**
 * Services - Displays six service items from services data with icons.
 *
 * Features a responsive grid layout (3 cols desktop, 2 tablet, 1 mobile)
 * with staggered reveal animation on scroll.
 */
export default function Services() {
  return (
    <section
      className="py-16 md:py-24 bg-cream"
      aria-labelledby="services-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2
              id="services-heading"
              className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-dark mb-4"
            >
              Our Services
            </h2>
            <p className="text-lg md:text-xl text-dark/70 leading-relaxed">
              Comprehensive homeopathic care tailored to your health needs,
              from consultation to complete wellness solutions.
            </p>
          </div>
        </SectionReveal>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          role="list"
          aria-label="Our services"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={cardVariants} role="listitem">
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ service }) {
  const content = (
    <div className="bg-white/80 backdrop-blur-sm border border-sage/30 rounded-xl shadow-card hover:shadow-card-hover transition-shadow duration-300 p-6 md:p-8 h-full flex flex-col items-center text-center">
      <span
        className="text-4xl md:text-5xl mb-4"
        aria-hidden="true"
      >
        {service.icon}
      </span>
      <h3 className="font-heading text-lg md:text-xl font-semibold text-dark mb-3">
        {service.name}
      </h3>
      <p className="text-dark/70 text-sm md:text-base leading-relaxed flex-1">
        {service.description}
      </p>
      {service.link && (
        <span className="mt-4 text-primary font-medium text-sm hover:text-primaryDark transition-colors">
          Learn more →
        </span>
      )}
    </div>
  );

  if (service.link) {
    return (
      <Link
        to={service.link}
        className="block h-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
        aria-label={`Learn more about ${service.name}`}
      >
        {content}
      </Link>
    );
  }

  return content;
}
