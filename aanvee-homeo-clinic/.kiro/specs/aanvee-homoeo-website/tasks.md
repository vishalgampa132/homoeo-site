# Implementation Plan: Aanvee Homoeo Stores & Clinic Website

## Overview

Build a premium, responsive static website for "Aanvee Homoeo Stores & Clinic" using React + Vite, Tailwind CSS v3, Framer Motion, and React Router v6. The implementation follows an incremental approach: project scaffolding → design system → shared components → layout → pages (Home, About, Treatments, Consultation, Contact) → animations → floating elements → SEO → testing.

## Tasks

- [x] 1. Project scaffolding and configuration
  - [x] 1.1 Initialize Vite + React project and install dependencies
    - Create project with Vite React template
    - Install dependencies: react-router-dom, framer-motion, tailwindcss, postcss, autoprefixer
    - Install dev dependencies: vitest, @testing-library/react, @testing-library/jest-dom, jsdom, fast-check
    - Configure Vitest in vite.config.js with jsdom environment
    - _Requirements: 14.1_

  - [x] 1.2 Configure Tailwind CSS with custom design tokens
    - Initialize Tailwind CSS config with content paths
    - Extend theme with basil green color palette (primary, primaryLight, primaryDark, sage, cream, gold)
    - Add custom glassmorphism utilities (backdrop-blur, semi-transparent backgrounds)
    - Configure custom border-radius, shadow, and animation tokens
    - Set up base styles in index.css with Tailwind directives and global typography (16px min body)
    - _Requirements: 12.1, 12.2, 12.3, 12.4_

  - [x] 1.3 Set up project directory structure
    - Create folder structure: src/components/layout, src/components/ui, src/components/sections/home, src/components/sections/about, src/components/sections/treatments, src/components/sections/consultation, src/components/sections/contact, src/pages, src/data, src/hooks, src/utils
    - _Requirements: 14.2_

  - [x] 1.4 Create data files and constants
    - Create src/data/navigation.js with navLinks array and breadcrumbMap
    - Create src/data/treatments.js with treatment objects (Migraine, Thyroid, Diabetes Support, PCOS, Skin Allergies, Hair Fall, Arthritis, Gastric Issues, Respiratory Problems, Stress & Anxiety, Child Immunity, Lifestyle Disorders)
    - Create src/data/services.js with six service items
    - Create src/data/testimonials.js with patient review data
    - Create src/utils/constants.js with design tokens and clinic contact info
    - _Requirements: 4.3, 4.4, 6.1_

- [ ] 2. Shared UI components
  - [x] 2.1 Implement GlassCard component
    - Create src/components/ui/GlassCard.jsx with backdrop-blur, bg-white/15, border, rounded-xl, shadow
    - Accept children, className, and hover props
    - Apply Framer Motion whileHover scale and shadow animation when hover=true
    - _Requirements: 12.4_

  - [x] 2.2 Implement CTAButton component
    - Create src/components/ui/CTAButton.jsx with gradient background (basil green to primaryLight)
    - Support variant props (primary, secondary, outline)
    - Add hover animation (scale, shadow change) with 150ms transition
    - Support as Link (react-router) or button element via `to` prop
    - _Requirements: 12.2, 10.2_

  - [x] 2.3 Implement SectionReveal animation wrapper
    - Create src/components/ui/SectionReveal.jsx using Framer Motion
    - Accept direction prop (up, left, right, fade), delay, and className
    - Use useInView hook (Framer Motion) to trigger animation once on viewport entry
    - Respect prefers-reduced-motion media query (disable animations)
    - _Requirements: 10.1, 10.4_

  - [x] 2.4 Implement Timeline component
    - Create src/components/ui/Timeline.jsx for step-by-step process display
    - Accept steps array with title, description, and icon
    - Render vertical timeline with connecting lines and animated step reveals
    - _Requirements: 4.6_

  - [x] 2.5 Implement Carousel component
    - Create src/components/ui/Carousel.jsx for product showcase sliding
    - Accept items array, autoPlay, and interval props
    - Implement touch swipe support for mobile and arrow navigation for desktop
    - _Requirements: 4.5_

  - [x] 2.6 Implement FAQAccordion component
    - Create src/components/ui/FAQAccordion.jsx with expandable items
    - Accept items array with question and answer fields
    - Animate expand/collapse with Framer Motion
    - _Requirements: 7.1_

  - [x] 2.7 Implement Breadcrumb component
    - Create src/components/layout/Breadcrumb.jsx
    - Accept items array from breadcrumbMap data
    - Render linked path segments with separator, last item non-linked
    - _Requirements: 5.3, 6.4, 7.6, 8.2_

- [ ] 3. Layout components and routing
  - [x] 3.1 Implement Navbar with scroll detection
    - Create src/components/layout/Navbar.jsx with sticky positioning
    - Create src/hooks/useScrollPosition.js custom hook
    - Implement transparent-to-solid background transition at 50px scroll threshold
    - Display logo (left), nav links (center), "Book Consultation" CTA (right)
    - Active link highlighting based on current route
    - _Requirements: 2.1, 2.2, 2.3_

  - [x] 3.2 Implement MobileMenu (hamburger navigation)
    - Create src/components/layout/MobileMenu.jsx as full-screen overlay
    - Show hamburger icon when viewport < 768px, hide desktop nav links
    - Animate menu open/close with Framer Motion (slide-in or fade)
    - Close menu on link click or outside tap
    - _Requirements: 2.4, 2.5_

  - [x] 3.3 Implement Footer component
    - Create src/components/layout/Footer.jsx
    - Include clinic details, contact info, social media icons (open in new tab), quick nav links, working hours, copyright
    - Responsive grid layout (4 columns desktop, 2 tablet, 1 mobile)
    - _Requirements: 9.1, 9.2_

  - [x] 3.4 Implement Layout wrapper and routing setup
    - Create src/components/layout/Layout.jsx wrapping Navbar, page outlet, Footer, and FloatingElements
    - Configure React Router v6 in src/App.jsx with all 5 routes
    - Implement AnimatePresence for page transition animations (fade/slide)
    - Add 404 Not Found route with link back to Home
    - _Requirements: 14.3, 15.1_

- [ ] 4. Checkpoint - Verify project structure and shared components
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Home page implementation
  - [x] 5.1 Implement HeroSection
    - Create src/components/sections/home/HeroSection.jsx
    - Display headline "Natural Healing for Better Living", subheadline, and two CTA buttons
    - "Book Appointment" links to /consultation, "Explore Treatments" links to /treatments
    - Add animated floating visual elements (pills, herbs, glass orbs) with Framer Motion
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

  - [x] 5.2 Implement AboutSnapshot section
    - Create src/components/sections/home/AboutSnapshot.jsx
    - Display brief clinic introduction, years of experience, trust indicators
    - Wrap in SectionReveal for scroll animation
    - _Requirements: 4.1_

  - [x] 5.3 Implement WhyChooseUs section
    - Create src/components/sections/home/WhyChooseUs.jsx
    - Render six GlassCard components with icons and descriptions
    - Cards: Personalized Treatment, Experienced Consultation, Authentic Medicines, Holistic Healing, Family Care, Affordable Treatment
    - Staggered reveal animation on scroll
    - _Requirements: 4.2_

  - [x] 5.4 Implement Services section
    - Create src/components/sections/home/Services.jsx
    - Display six service items from services data with icons
    - Responsive grid (3 cols desktop, 2 tablet, 1 mobile)
    - _Requirements: 4.3_

  - [x] 5.5 Implement FeaturedTreatments section
    - Create src/components/sections/home/FeaturedTreatments.jsx
    - Display animated Treatment_Cards for 8 featured conditions
    - Link each card to treatments page or expand inline
    - _Requirements: 4.4_

  - [x] 5.6 Implement ProductShowcase with Carousel
    - Create src/components/sections/home/ProductShowcase.jsx
    - Use Carousel component with 5 product categories: Immunity Boosters, Hair Care, Skin Care, Digestive Care, Wellness Drops
    - _Requirements: 4.5_

  - [x] 5.7 Implement ConsultationProcess section
    - Create src/components/sections/home/ConsultationProcess.jsx
    - Use Timeline component with 4 steps: Appointment Booking, Health Assessment, Personalized Medicine, Follow-up Care
    - _Requirements: 4.6_

  - [x] 5.8 Implement Testimonials section
    - Create src/components/sections/home/Testimonials.jsx
    - Display animated testimonial cards with patient reviews from data file
    - _Requirements: 4.7_

  - [x] 5.9 Implement CTABanner section
    - Create src/components/sections/home/CTABanner.jsx
    - Strong call-to-action with appointment form preview/link
    - Gradient background with CTA button linking to /consultation
    - _Requirements: 4.8_

  - [x] 5.10 Assemble HomePage
    - Create src/pages/HomePage.jsx composing all home sections in order
    - Add SEO meta tags (title, description, Open Graph) for home page
    - _Requirements: 3.1, 4.1-4.8, 13.3_

- [ ] 6. About Us page implementation
  - [x] 6.1 Implement About Us page sections
    - Create src/components/sections/about/ClinicStory.jsx with clinic history narrative
    - Create src/components/sections/about/MissionVision.jsx with mission and vision statements
    - Create src/components/sections/about/DoctorProfiles.jsx with consultant profiles in GlassCards
    - Create src/components/sections/about/ClinicTimeline.jsx with animated milestone timeline
    - _Requirements: 5.1, 5.2_

  - [x] 6.2 Assemble AboutPage
    - Create src/pages/AboutPage.jsx composing all about sections with Breadcrumb
    - Add SectionReveal wrappers for scroll animations
    - Add SEO meta tags for About page
    - _Requirements: 5.1, 5.2, 5.3, 13.3_

- [ ] 7. Treatments page implementation
  - [x] 7.1 Implement TreatmentCard component
    - Create src/components/sections/treatments/TreatmentCard.jsx
    - Collapsed state: icon, name, brief overview
    - Expanded state: full overview, symptoms list, benefits, medicines, "Book Consultation" CTA
    - Animate expand/collapse with Framer Motion
    - Use GlassCard styling
    - _Requirements: 6.1, 6.2, 6.3_

  - [x] 7.2 Assemble TreatmentsPage
    - Create src/pages/TreatmentsPage.jsx with Breadcrumb and all 12 TreatmentCards
    - Implement accordion/expandable card layout for information hierarchy
    - Add SectionReveal animations and SEO meta tags
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 13.3_

- [ ] 8. Consultation page with appointment form
  - [x] 8.1 Implement form validation utility
    - Create src/utils/validation.js with validateField and validateForm functions
    - Implement rules: required, minLength, pattern (email, phone), custom validators
    - Return error messages or null per field
    - _Requirements: 7.3_

  - [x] 8.2 Implement AppointmentForm component
    - Create src/components/sections/consultation/AppointmentForm.jsx
    - Include all fields: Full Name, Mobile, Email, Age, Gender, Health Concern, Preferred Date, Preferred Time, Consultation Type, Message
    - Implement inline validation on blur and on submit
    - Display success popup animation on valid submission
    - Apply GlassCard styling to form container
    - _Requirements: 7.2, 7.3, 7.4, 7.5_

  - [x] 8.3 Write property test for form validation (Property 1)
    - **Property 1: Form validation rejects empty required fields**
    - Generate random subsets of required fields as empty/whitespace → verify validation catches exactly those fields
    - Use fast-check arbitrary to generate field combinations
    - **Validates: Requirements 7.3**

  - [x] 8.4 Implement ConsultationBenefits and DoctorAvailability sections
    - Create src/components/sections/consultation/ConsultationBenefits.jsx with online/offline options
    - Create src/components/sections/consultation/DoctorAvailability.jsx with availability info
    - Add FAQ accordion for consultation questions
    - _Requirements: 7.1_

  - [x] 8.5 Assemble ConsultationPage
    - Create src/pages/ConsultationPage.jsx with Breadcrumb, benefits, form, process, FAQ
    - Add SectionReveal animations and SEO meta tags
    - _Requirements: 7.1, 7.6, 13.3_

- [ ] 9. Contact Us page implementation
  - [x] 9.1 Implement Contact page sections
    - Create src/components/sections/contact/ContactForm.jsx with name, email, subject, message fields and validation
    - Create src/components/sections/contact/MapEmbed.jsx with Google Maps placeholder
    - Create src/components/sections/contact/BusinessInfo.jsx with address, phone, WhatsApp link, email, hours, social links
    - _Requirements: 8.1_

  - [x] 9.2 Assemble ContactPage
    - Create src/pages/ContactPage.jsx with Breadcrumb and all contact sections
    - Add SectionReveal animations and SEO meta tags
    - _Requirements: 8.1, 8.2, 13.3_

- [ ] 10. Checkpoint - Verify all pages render correctly
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. Floating action elements and scroll behavior
  - [x] 11.1 Implement FloatingWhatsApp button
    - Create src/components/ui/FloatingWhatsApp.jsx
    - Position fixed bottom-right on all pages
    - Open WhatsApp with clinic phone number pre-filled on click
    - Add pulse/bounce entrance animation
    - _Requirements: 11.1, 11.2_

  - [x] 11.2 Implement ScrollToTop button
    - Create src/components/ui/ScrollToTop.jsx
    - Show button when scroll > 300px, hide otherwise
    - Smooth scroll to top on click
    - Animate show/hide with Framer Motion
    - _Requirements: 11.3, 11.4_

  - [x] 11.3 Implement StickyBookButton for mobile
    - Create src/components/ui/StickyBookButton.jsx
    - Display sticky "Book Appointment" button at bottom of screen on mobile (< 768px)
    - Link to /consultation
    - _Requirements: 11.5_

  - [x] 11.4 Implement smooth anchor scrolling
    - Add smooth scroll behavior for in-page anchor links with easing
    - Ensure scroll-to-top on route change
    - _Requirements: 15.2_

- [ ] 12. SEO and performance optimization
  - [x] 12.1 Implement SEO meta tags for all pages
    - Create a reusable SEO/Head component or use document.title + meta tag updates per page
    - Add unique title, meta description, og:title, og:description for each of the 5 pages
    - _Requirements: 13.2, 13.3_

  - [x] 12.2 Implement lazy loading and code splitting
    - Lazy-load page components with React.lazy and Suspense
    - Add loading="lazy" to images below the fold
    - Lazy-load heavy animation components (Carousel, Testimonials)
    - Use semantic HTML elements throughout (header, nav, main, section, article, footer)
    - _Requirements: 13.1, 13.2, 13.4_

- [ ] 13. Responsive layout verification and polish
  - [x] 13.1 Ensure responsive layouts across all breakpoints
    - Verify mobile layout (320px-767px): single-column, 44px min tap targets, hamburger menu
    - Verify tablet layout (768px-1024px): adjusted grids, proper spacing
    - Verify desktop layout (>1024px): full multi-column grids, expanded nav
    - Fix any layout issues found during verification
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [ ] 14. Testing
  - [x] 14.1 Write unit tests for core components
    - Test Navbar: renders links, scroll background toggle, hamburger menu toggle
    - Test GlassCard: renders children, applies glassmorphism classes
    - Test CTAButton: renders with correct styles, handles click/navigation
    - Test Breadcrumb: renders correct path per route
    - Test TreatmentCard: collapsed/expanded states, content visibility
    - _Requirements: 14.1_

  - [x] 14.2 Write unit tests for AppointmentForm
    - Test all fields render correctly
    - Test inline validation error display on blur
    - Test form does not submit with invalid data
    - Test success state on valid submission
    - _Requirements: 7.2, 7.3, 7.4_

  - [x] 14.3 Write property test for TreatmentCard (Property 2)
    - **Property 2: Expanded treatment cards display all required information**
    - Generate random valid treatment objects → verify expanded card contains overview, symptoms, benefits, medicines, and CTA
    - Use fast-check arbitrary for treatment data generation
    - **Validates: Requirements 6.2**

  - [x] 14.4 Write property test for global UI elements (Property 3)
    - **Property 3: Global UI elements present on all pages**
    - Iterate all routes → verify footer and WhatsApp button presence in rendered output
    - **Validates: Requirements 9.1, 11.1**

  - [x] 14.5 Write property test for SEO meta tags (Property 4)
    - **Property 4: SEO meta tags present on all pages**
    - Iterate all routes → verify title, meta description, og:title, og:description are present and non-empty
    - **Validates: Requirements 13.3**

  - [x] 14.6 Write property test for mobile tap targets (Property 5)
    - **Property 5: Mobile interactive elements meet minimum tap target size**
    - Render pages at mobile viewport → verify interactive elements have ≥ 44px clickable area
    - **Validates: Requirements 1.2**

- [ ] 15. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The project uses React + Vite + Tailwind CSS v3 + Framer Motion + React Router v6
- Testing stack: Vitest + React Testing Library + fast-check
- Form submissions can use Formspree, EmailJS, or WhatsApp redirect (no backend required)
