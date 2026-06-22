# Bugfix Requirements Document

## Introduction

The hero section of the Aanvee Homoeo Store & Clinic website has multiple UX and layout issues that reduce its effectiveness as a landing area. The heading text overflows on desktop viewports, excessive floating decorative elements compete with the primary content for attention, and the overall visual hierarchy (typography, spacing, trust badges) does not convey a professional, premium feel. These issues collectively degrade readability, reduce conversion potential for appointment bookings, and make the page appear cluttered rather than trustworthy.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN the hero section is viewed on desktop THEN the heading "Your Complete homoeopathy Store & Clinic" gets cut off or overflows its container due to insufficient responsive text sizing and lack of controlled line breaks

1.2 WHEN the hero section renders THEN seven floating decorative elements (colored circles, 🌿, 💊, 🌱 emojis, glass orbs) animate simultaneously, creating visual clutter that distracts from the primary heading and CTAs

1.3 WHEN a user scans the hero section THEN the visual hierarchy is unclear because the heading, description, CTAs, and trust badges lack sufficient contrast in size, weight, and spacing to establish a clear reading order

1.4 WHEN the heading renders THEN the typography does not feel impactful because it uses standard font sizing without letter-spacing refinement, and line breaks occur at awkward positions on various viewport widths

1.5 WHEN the trust badges render THEN they appear as overly wide pill-shaped elements with long text that do not feel compact or premium, reducing scannability

1.6 WHEN the hero section content stacks vertically THEN the spacing between heading, description, CTAs, and trust badges is not balanced — the gap between CTAs and trust badges (mt-8) feels disconnected while other elements are too close together

### Expected Behavior (Correct)

2.1 WHEN the hero section is viewed on any viewport (mobile through desktop) THEN the heading "Your Complete Homoeopathy Store & Clinic" SHALL render fully visible without overflow or text clipping, using responsive sizing that fits within its container

2.2 WHEN the hero section renders THEN decorative elements SHALL be reduced to a maximum of 2-3 subtle, non-distracting background elements that do not compete with the main content for user attention

2.3 WHEN a user scans the hero section THEN the visual hierarchy SHALL be clear: the heading is the dominant element, followed by the description, then CTAs as the primary action, and trust badges as supporting information — achieved through deliberate size contrast, font weight differentiation, and progressive spacing

2.4 WHEN the heading renders THEN it SHALL use impactful typography with refined letter-spacing, controlled line breaks (using responsive text scaling), and clear word grouping to ensure readability within 2-3 seconds

2.5 WHEN the trust badges render THEN they SHALL appear as compact, inline indicators with concise text and subtle styling that reinforces credibility without dominating the layout

2.6 WHEN the hero section content stacks vertically THEN spacing between elements SHALL feel balanced and intentional — progressive spacing that creates visual breathing room between the heading, description, CTAs, and trust badges

### Unchanged Behavior (Regression Prevention)

3.1 WHEN the hero section renders THEN the system SHALL CONTINUE TO use the existing color palette (primary: #8B1A1A, primaryLight: #B22222, cream: #FFF8F6, sage: #D4A59A, gold: #D4A853, dark: #2D2424) without modification

3.2 WHEN the "Book Appointment" CTA is clicked THEN the system SHALL CONTINUE TO navigate to the /consultation route

3.3 WHEN the "Explore Treatments" CTA is clicked THEN the system SHALL CONTINUE TO navigate to the /treatments route

3.4 WHEN the hero section renders THEN the system SHALL CONTINUE TO display the full heading text "Your Complete Homoeopathy Store & Clinic" and the full description text about dilutions, mother tinctures, and Dr. G Manasa

3.5 WHEN the hero section renders THEN the system SHALL CONTINUE TO use Framer Motion for entrance animations with reduced-motion accessibility support via useReducedMotion

3.6 WHEN the hero section renders THEN the system SHALL CONTINUE TO use the CTAButton component with "primary" and "outline" variants for the two call-to-action buttons

3.7 WHEN the hero section renders on mobile THEN the system SHALL CONTINUE TO be fully responsive with stacked layout for CTAs and readable text at smaller breakpoints

3.8 WHEN the trust badges render THEN the system SHALL CONTINUE TO display "Free Delivery within 3 km on orders above ₹500" and "In-house & Online Consultation Available" messaging

---

## Bug Condition (Formal)

```pascal
FUNCTION isBugCondition(X)
  INPUT: X of type HeroSectionRender
  OUTPUT: boolean
  
  // The bug triggers whenever the hero section renders, as the layout/hierarchy issues
  // are always present regardless of viewport
  RETURN X.hasExcessiveFloatingElements OR
         X.headingOverflows OR
         X.visualHierarchyIsUnclear OR
         X.typographyLacksImpact OR
         X.trustBadgesNotCompact OR
         X.spacingIsUnbalanced
END FUNCTION
```

```pascal
// Property: Fix Checking - Hero Section UX
FOR ALL X WHERE isBugCondition(X) DO
  result ← renderHeroSection'(X)
  ASSERT result.headingFullyVisible = true
  ASSERT result.floatingElementCount <= 3
  ASSERT result.visualHierarchyClear = true
  ASSERT result.typographyImpactful = true
  ASSERT result.trustBadgesCompact = true
  ASSERT result.spacingBalanced = true
END FOR
```

```pascal
// Property: Preservation Checking
FOR ALL X WHERE NOT isBugCondition(X) DO
  ASSERT renderHeroSection(X) = renderHeroSection'(X)
END FOR
```

This ensures that navigation routes, color palette, content text, Framer Motion animations, CTAButton usage, responsive behavior, and trust badge messaging all remain unchanged after the fix.
