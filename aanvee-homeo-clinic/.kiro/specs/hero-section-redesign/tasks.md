# Implementation Plan

## Overview

Fix the HeroSection component's layout/UX defects using the bug condition methodology: first write exploration tests to confirm the bug exists, then write preservation tests to capture baseline behavior, implement the fix, and validate all tests pass.

**Target File**: `src/components/sections/home/HeroSection.jsx`
**Test File**: `src/components/sections/home/HeroSection.property.test.jsx`

## Tasks

- [ ] 1. Write bug condition exploration test
  - **Property 1: Bug Condition** - Hero Section Layout Defects
  - **CRITICAL**: This test MUST FAIL on unfixed code - failure confirms the bug exists
  - **DO NOT attempt to fix the test or the code when it fails**
  - **NOTE**: This test encodes the expected behavior - it will validate the fix when it passes after implementation
  - **GOAL**: Surface counterexamples that demonstrate the layout/UX defects exist
  - **Scoped PBT Approach**: Scope the property to concrete failing cases — floating element count > 3, heading overflow, non-compact badges
  - Create test file `src/components/sections/home/HeroSection.property.test.jsx`
  - Use `fast-check` with `@testing-library/react` and `vitest`
  - Test 1: Render HeroSection and assert `querySelectorAll('[aria-hidden="true"]').length <= 3` (Bug Condition: floatingElementCount > 3)
  - Test 2: Render HeroSection and assert heading element has `tracking-tight` class and `text-balance` class (Bug Condition: typographyLacksImpact)
  - Test 3: Render HeroSection and assert trust badge elements use `text-xs` class and compact padding `px-3 py-1.5` (Bug Condition: trustBadgesNotCompact)
  - Test 4: Render HeroSection and assert content container uses `max-w-3xl` (Bug Condition: headingOverflows in max-w-4xl)
  - Run test on UNFIXED code with `npx vitest --run src/components/sections/home/HeroSection.property.test.jsx`
  - **EXPECTED OUTCOME**: Test FAILS (this is correct - it proves the bug exists)
  - Document counterexamples found: e.g., "7 aria-hidden elements found (expected ≤3)", "heading missing tracking-tight", "badges use px-4 py-2 instead of px-3 py-1.5"
  - Mark task complete when test is written, run, and failure is documented
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

- [ ] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - Functional and Content Behavior Unchanged
  - **IMPORTANT**: Follow observation-first methodology
  - Create preservation tests in the same test file `src/components/sections/home/HeroSection.property.test.jsx`
  - Use `fast-check` to generate random viewport scenarios and verify content/routes are always present
  - Observe on UNFIXED code:
    - Heading text "Your Complete homoeopathy Store & Clinic" is present in the DOM
    - Description text about dilutions and Dr. G Manasa is present
    - CTA "Book Appointment" links to `/consultation`
    - CTA "Explore Treatments" links to `/treatments`
    - `aria-label="Hero"` is on the section element
    - All decorative elements have `aria-hidden="true"`
    - CTAButton components are used with "primary" and "outline" variants
    - Background gradient classes `bg-gradient-to-br from-cream via-white to-sage/20` are present
    - Trust badge text "Free Delivery within 3 km on orders above ₹500" is present
    - Trust badge text "In-house & Online Consultation Available" is present
  - Write property-based tests:
    - Property: For all renders, heading text content is always present and unchanged
    - Property: For all renders, both CTA routes (`/consultation`, `/treatments`) are present
    - Property: For all renders, `aria-label="Hero"` exists on section
    - Property: For all renders, trust badge messaging is preserved
    - Property: For all renders, Framer Motion `motion.div` wrappers are present (animation structure preserved)
    - Property: For all renders, CTAs stack on mobile (`flex-col sm:flex-row` classes present)
  - Run tests on UNFIXED code with `npx vitest --run src/components/sections/home/HeroSection.property.test.jsx`
  - **EXPECTED OUTCOME**: Tests PASS (this confirms baseline behavior to preserve)
  - Mark task complete when tests are written, run, and passing on unfixed code
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8_

- [ ] 3. Fix for Hero Section Layout and UX Defects

  - [ ] 3.1 Reduce floating elements from 7 to 2-3 subtle ones
    - Remove 4-5 FloatingElement instances, keeping only 2-3 subtle decorative elements
    - Keep one soft circle (e.g., top-right area) and one leaf accent (e.g., bottom-left area)
    - Optionally keep one small orb for depth
    - Reduce max opacity to 30% on remaining elements
    - Ensure remaining elements still use `aria-hidden="true"` and `pointer-events-none`
    - _Bug_Condition: isBugCondition(X) where X.hasExcessiveFloatingElements = true (count > 3)_
    - _Expected_Behavior: result.floatingElementCount <= 3_
    - _Preservation: FloatingElement component structure, aria-hidden="true", pointer-events-none unchanged_
    - _Requirements: 2.2_

  - [ ] 3.2 Fix heading typography
    - Add `tracking-tight` class to the h1 element for tighter letter-spacing at large sizes
    - Add `text-balance` class for controlled line breaks
    - Keep responsive sizing `text-3xl sm:text-4xl md:text-5xl lg:text-6xl` but ensure it works within narrower container
    - Maintain the full heading text "Your Complete Homoeopathy Store & Clinic" unchanged
    - _Bug_Condition: isBugCondition(X) where X.typographyLacksImpact = true_
    - _Expected_Behavior: heading uses tracking-tight and text-balance for impactful, controlled typography_
    - _Preservation: Heading text content unchanged, Framer Motion variants on h1 preserved_
    - _Requirements: 2.1, 2.4_

  - [ ] 3.3 Improve visual hierarchy
    - Increase size contrast ratio between heading and body text (≥2.5x on all breakpoints)
    - Add a decorative divider element between heading and description (e.g., `w-16 h-1 bg-primary/30 rounded-full mx-auto`)
    - Adjust description text opacity from `text-dark/70` to `text-dark/60` to push it further back in hierarchy
    - _Bug_Condition: isBugCondition(X) where X.visualHierarchyIsUnclear = true_
    - _Expected_Behavior: clear heading dominance, decorative divider separating sections, adjusted opacity_
    - _Preservation: Description text content unchanged, color palette tokens unchanged_
    - _Requirements: 2.3_

  - [ ] 3.4 Make trust badges compact
    - Reduce badge padding from `px-4 py-2` to `px-3 py-1.5`
    - Change text size from `text-sm` to `text-xs`
    - Keep badge messaging text unchanged: "Free Delivery within 3 km on orders above ₹500" and "In-house & Online Consultation Available"
    - Maintain `bg-primary/10 border border-primary/20 rounded-full` styling
    - _Bug_Condition: isBugCondition(X) where X.trustBadgesNotCompact = true_
    - _Expected_Behavior: badges render with compact padding (px-3 py-1.5) and text-xs_
    - _Preservation: Badge messaging text unchanged, color palette unchanged_
    - _Requirements: 2.5_

  - [ ] 3.5 Balance vertical spacing
    - Replace current spacing (mb-6 → mb-10 → gap-4 → mt-8) with progressive rhythm
    - Use: `mb-4` (heading→divider), `mb-3` (divider→description), `mb-8` (description→CTAs), `mt-6` (CTAs→badges)
    - Ensure spacing feels intentional and creates visual breathing room
    - _Bug_Condition: isBugCondition(X) where X.spacingIsUnbalanced = true_
    - _Expected_Behavior: balanced progressive spacing between all content blocks_
    - _Preservation: Content stacking order unchanged, responsive flex-col sm:flex-row on CTAs preserved_
    - _Requirements: 2.6_

  - [ ] 3.6 Reduce container max-width
    - Change content container from `max-w-4xl` to `max-w-3xl`
    - This creates more generous side margins and prevents the heading from stretching too wide
    - Keeps `mx-auto` centering and responsive padding `px-4 sm:px-6 lg:px-8`
    - _Bug_Condition: isBugCondition(X) where X.headingOverflows = true_
    - _Expected_Behavior: content contained within max-w-3xl, no heading overflow_
    - _Preservation: px-4 sm:px-6 lg:px-8 responsive padding unchanged_
    - _Requirements: 2.1_

  - [ ] 3.7 Verify bug condition exploration test now passes
    - **Property 1: Expected Behavior** - Hero Section Layout Defects Fixed
    - **IMPORTANT**: Re-run the SAME test from task 1 - do NOT write a new test
    - The test from task 1 encodes the expected behavior (≤3 floaters, tracking-tight, compact badges, max-w-3xl)
    - Run `npx vitest --run src/components/sections/home/HeroSection.property.test.jsx`
    - **EXPECTED OUTCOME**: Test PASSES (confirms all layout defects are fixed)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

  - [ ] 3.8 Verify preservation tests still pass
    - **Property 2: Preservation** - Functional and Content Behavior Unchanged
    - **IMPORTANT**: Re-run the SAME tests from task 2 - do NOT write new tests
    - Run `npx vitest --run src/components/sections/home/HeroSection.property.test.jsx`
    - **EXPECTED OUTCOME**: Tests PASS (confirms no regressions in routes, content, animations, accessibility)
    - Confirm all preservation properties still hold after fix (no regressions)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8_

- [ ] 4. Checkpoint - Ensure all tests pass
  - Run full test suite: `npx vitest --run`
  - Ensure all property-based tests (bug condition + preservation) pass
  - Ensure no other existing tests are broken by the changes
  - Verify the build completes without errors: `npm run build`
  - Ask the user if questions arise or if visual review is needed


## Task Dependency Graph

```json
{
  "waves": [
    ["1", "2"],
    ["3.1", "3.2", "3.3", "3.4", "3.5", "3.6"],
    ["3.7"],
    ["3.8"],
    ["4"]
  ]
}
```

## Notes

- All implementation sub-tasks (3.1–3.6) can be done in parallel as they modify different parts of HeroSection.jsx
- Tests use `fast-check` for property-based testing and `@testing-library/react` for rendering
- Run tests with `npx vitest --run src/components/sections/home/HeroSection.property.test.jsx`
- The fix is purely visual/CSS — no functional logic, routing, or component interfaces change
