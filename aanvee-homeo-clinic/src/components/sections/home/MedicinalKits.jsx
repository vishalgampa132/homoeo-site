import React from 'react';
import SectionReveal from '../../ui/SectionReveal';
import GlassCard from '../../ui/GlassCard';
import CTAButton from '../../ui/CTAButton';

const kits = [
  {
    id: 'travel-kit',
    title: 'Travel Kit',
    icon: '✈️',
    description:
      'Essential homoeopathic remedies for common travel ailments — motion sickness, jet lag, digestive upsets, fever, and injuries on the go.',
    includes: ['Arnica', 'Nux Vomica', 'Arsenicum Album', 'Cocculus', 'Belladonna'],
  },
  {
    id: 'first-aid-kit',
    title: 'First Aid Kit',
    icon: '🩹',
    description:
      'Quick-relief remedies for everyday injuries and emergencies — cuts, bruises, burns, sprains, insect bites, and minor infections.',
    includes: ['Arnica', 'Calendula', 'Hypericum', 'Ledum', 'Cantharis'],
  },
  {
    id: 'home-kit',
    title: 'Home Kit',
    icon: '🏠',
    description:
      'A comprehensive collection of 30+ remedies for common family health needs — colds, coughs, fevers, headaches, stomach issues, and more.',
    includes: ['Aconite', 'Bryonia', 'Pulsatilla', 'Chamomilla', 'Ipecac', '25+ more'],
  },
  {
    id: 'child-care-kit',
    title: 'Child Care Kit',
    icon: '👶',
    description:
      'Safe and gentle remedies specially curated for infants and children — teething, colic, ear infections, coughs, and childhood fevers.',
    includes: ['Chamomilla', 'Calcarea Carb', 'Pulsatilla', 'Belladonna', 'Silicea'],
  },
  {
    id: 'womens-wellness-kit',
    title: "Women's Wellness Kit",
    icon: '🌸',
    description:
      'Targeted remedies for women\'s health — menstrual issues, hormonal balance, pregnancy support, and menopausal symptoms.',
    includes: ['Sepia', 'Pulsatilla', 'Lachesis', 'Caulophyllum', 'Cimicifuga'],
  },
  {
    id: 'immunity-booster-kit',
    title: 'Immunity Booster Kit',
    icon: '🛡️',
    description:
      'Build natural resistance with remedies that strengthen immunity against seasonal infections, allergies, and recurring illnesses.',
    includes: ['Thuja', 'Echinacea', 'Arsenicum Album', 'Influenzinum', 'Tuberculinum'],
  },
  {
    id: 'sports-injury-kit',
    title: 'Sports & Injury Kit',
    icon: '⚽',
    description:
      'Recovery remedies for athletes and active individuals — muscle soreness, sprains, fractures, overexertion, and joint pain.',
    includes: ['Arnica', 'Rhus Tox', 'Ruta', 'Bryonia', 'Symphytum'],
  },
  {
    id: 'skin-hair-kit',
    title: 'Skin & Hair Kit',
    icon: '💆',
    description:
      'Natural solutions for common skin and hair concerns — acne, eczema, dandruff, hair fall, and pigmentation issues.',
    includes: ['Sulphur', 'Graphites', 'Thuja', 'Lycopodium', 'Phosphorus'],
  },
];

/**
 * MedicinalKits - Displays available homoeopathic medicinal kits.
 */
export default function MedicinalKits() {
  return (
    <section
      className="py-16 md:py-24"
      aria-labelledby="medicinal-kits-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal direction="up">
          <h2
            id="medicinal-kits-heading"
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-dark text-center mb-4"
          >
            homoeopathic Medicinal Kits
          </h2>
          <p className="text-dark/70 text-center max-w-2xl mx-auto mb-12">
            Ready-to-use kits with carefully selected remedies for specific needs. Perfect for families, travelers, and everyday wellness.
          </p>
        </SectionReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {kits.map((kit, index) => (
            <SectionReveal key={kit.id} direction="up" delay={index * 0.05}>
              <GlassCard className="p-6 h-full flex flex-col bg-white/80">
                <span className="text-4xl mb-3 block" aria-hidden="true">
                  {kit.icon}
                </span>
                <h3 className="text-lg font-heading font-semibold text-dark mb-2">
                  {kit.title}
                </h3>
                <p className="text-sm text-dark/70 leading-relaxed mb-4 flex-1">
                  {kit.description}
                </p>
                <div className="mt-auto">
                  <p className="text-xs font-medium text-primary mb-1">Includes:</p>
                  <p className="text-xs text-dark/60">
                    {kit.includes.join(' • ')}
                  </p>
                </div>
              </GlassCard>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal direction="fade" delay={0.3}>
          <div className="text-center mt-10">
            <CTAButton to="/consultation" variant="outline">
              Enquire About Kits
            </CTAButton>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
