import React from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../../../../screenshots/homoeo.png';
import doctorImg from '../../../assets/doctor image.jpeg';

/**
 * HeroSection - Premium healthcare hero inspired by Apollo, Practo, 1mg.
 *
 * Clean layout, generous whitespace, strong image presence,
 * subtle trust indicators, and polished typography.
 */
export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      aria-label="Hero"
      style={{
        background: 'linear-gradient(165deg, #FDFBFA 0%, #FFF9F7 35%, #FFFFFF 100%)',
      }}
    >
      {/* Subtle decorative elements */}
      <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-[#A61D1D]/[0.03] blur-3xl" aria-hidden="true" />
      <div className="absolute top-1/2 -left-32 h-64 w-64 rounded-full bg-[#F5E6E3]/50 blur-2xl" aria-hidden="true" />

      {/* Hero Content */}
      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <div
          className="grid min-h-[72vh] items-center gap-6 lg:gap-0"
          style={{ gridTemplateColumns: '1fr' }}
        >
          {/* Desktop 2-col layout */}
          <div className="relative grid items-center grid-cols-1 lg:grid-cols-[55%_45%] gap-6 lg:gap-4">

            {/* Left — Content */}
            <div className="relative z-10 pt-12 pb-8 lg:py-16">
              {/* Tagline badge */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#A61D1D]/[0.06] px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A61D1D]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#A61D1D]">
                  Homoeopathy Store & Clinic
                </span>
              </div>

              {/* Heading */}
              <h1
                className="text-dark"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.035em',
                  fontWeight: 800,
                }}
              >
                Quality Homoeopathic
                <br />
                <span className="text-primary">Medicines</span> & Expert
                <br />
                Consultation
              </h1>

              {/* Description */}
              <p
                className="mt-5 text-dark/60 leading-[1.7]"
                style={{ maxWidth: '540px', fontSize: '1.125rem', fontFamily: "'Outfit', sans-serif", fontWeight: 400 }}
              >
                Genuine homoeopathic medicines, mother tinctures & dilutions with
                personalized expert consultation for holistic care.
              </p>

              {/* Doctor trust badge - highlighted */}
              <div className="mt-6 inline-flex items-center gap-4 rounded-2xl border border-primary/15 bg-cream px-4 py-3 shadow-md shadow-primary/5">
                <img
                  src={doctorImg}
                  alt="Dr. G. Manasa"
                  className="h-14 w-14 flex-shrink-0 rounded-full object-cover border-2 border-primary/30 shadow-sm"
                />
                <div>
                  <p className="text-base font-bold text-dark">Dr. G. Manasa</p>
                  <p className="text-xs text-dark/50 mt-0.5">B.H.M.S (JIMS)</p>
                  <p className="text-xs text-primary font-medium mt-0.5">Homoeopathic Consultant</p>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  to="/consultation"
                  className="inline-flex items-center gap-2 rounded-full bg-[#A61D1D] px-7 py-3 text-[15px] font-semibold text-white shadow-lg shadow-[#A61D1D]/20 transition-all hover:bg-[#8B1818] hover:shadow-xl hover:shadow-[#A61D1D]/30"
                >
                  Book Consultation
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  to="/treatments"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[#A61D1D]/20 px-7 py-3 text-[15px] font-semibold text-[#A61D1D] transition-all hover:border-[#A61D1D]/40 hover:bg-[#A61D1D]/[0.04]"
                >
                  Order Medicines
                </Link>
              </div>

            </div>

            {/* Right — Image (pinned to top-right, below header) */}
            <div className="hidden lg:flex relative lg:absolute lg:right-0 lg:top-0 lg:w-[65%] xl:w-[65%] lg:h-full items-start justify-end pointer-events-none">
              {/* Glow */}
              <div
                className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 h-[80%] w-[80%] rounded-full opacity-40"
                style={{
                  background: 'radial-gradient(circle, #F8E4E0 0%, #FDF5F3 40%, transparent 70%)',
                  filter: 'blur(50px)',
                }}
                aria-hidden="true"
              />
              <img
                src={heroImg}
                alt="Homoeopathic medicines collection"
                className="relative object-contain object-right-top"
                style={{
                  width: '120%',
                  maxWidth: '1080px',
                  height: 'auto',
                  maskImage: 'linear-gradient(to left, black 50%, transparent 100%), linear-gradient(to bottom, black 60%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to left, black 50%, transparent 100%), linear-gradient(to bottom, black 60%, transparent 100%)',
                  maskComposite: 'intersect',
                  WebkitMaskComposite: 'source-in',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Trust Strip - full width, inline */}
      <div className="w-full border-t border-primary/5 bg-cream/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Genuine Medicines */}
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-bold text-dark">Genuine Medicines</p>
                <p className="text-xs text-dark/50">100% Authentic</p>
              </div>
            </div>

            {/* Expert Consultation */}
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sage/20 flex-shrink-0">
                <svg className="h-5 w-5 text-primaryDark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-bold text-dark">Expert Consultation</p>
                <p className="text-xs text-dark/50">Personalized Treatment</p>
              </div>
            </div>

            {/* Online & In-Clinic */}
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primaryLight/10 flex-shrink-0">
                <svg className="h-5 w-5 text-primaryLight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-bold text-dark">Online & In-Clinic</p>
                <p className="text-xs text-dark/50">Consultation Available</p>
              </div>
            </div>

            {/* Free Delivery */}
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 flex-shrink-0">
                <svg className="h-5 w-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-bold text-dark">Free Delivery</p>
                <p className="text-xs text-dark/50">Above ₹500</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

