import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import * as fc from 'fast-check';
import { MemoryRouter } from 'react-router-dom';
import HeroSection from './HeroSection';

function renderHero() {
  return render(
    <MemoryRouter>
      <HeroSection />
    </MemoryRouter>
  );
}

/**
 * Property 1: Bug Condition Exploration - Hero Section Layout Defects
 *
 * These tests encode the EXPECTED behavior after the fix is applied.
 * They are expected to FAIL on unfixed code, confirming the bug exists.
 *
 * **Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6**
 */
describe('Feature: hero-section-redesign, Property 1: Bug Condition - Hero Section Layout Defects', () => {
  afterEach(() => {
    cleanup();
  });

  it('Bug Condition: floatingElementCount > 3 — should have at most 3 aria-hidden decorative elements', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        cleanup();
        const { container } = renderHero();

        const ariaHiddenElements = container.querySelectorAll('[aria-hidden="true"]');
        expect(ariaHiddenElements.length).toBeLessThanOrEqual(3);
      }),
      { numRuns: 10 }
    );
  });

  it('Bug Condition: typographyLacksImpact — heading should have tracking-tight and text-balance classes', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        cleanup();
        const { container } = renderHero();

        const heading = container.querySelector('h1');
        expect(heading).not.toBeNull();
        expect(heading.className).toContain('tracking-tight');
        expect(heading.className).toContain('text-balance');
      }),
      { numRuns: 10 }
    );
  });

  it('Bug Condition: trustBadgesNotCompact — trust badges should use text-xs and compact padding px-3 py-1.5', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        cleanup();
        const { container } = renderHero();

        // Trust badges are the spans with delivery/consultation text
        const badges = container.querySelectorAll('span.inline-flex');
        expect(badges.length).toBeGreaterThan(0);

        badges.forEach((badge) => {
          expect(badge.className).toContain('text-xs');
          expect(badge.className).toContain('px-3');
          expect(badge.className).toContain('py-1.5');
        });
      }),
      { numRuns: 10 }
    );
  });

  it('Bug Condition: headingOverflows — content container should use max-w-3xl instead of max-w-4xl', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        cleanup();
        const { container } = renderHero();

        // The main content container should be max-w-3xl
        const contentContainer = container.querySelector('.max-w-3xl');
        expect(contentContainer).not.toBeNull();
      }),
      { numRuns: 10 }
    );
  });
});

/**
 * Property 2: Preservation - Functional and Content Behavior Unchanged
 *
 * These tests encode the baseline behavior of the HeroSection BEFORE any fix.
 * They verify that regardless of rendering conditions, the content, routes,
 * accessibility attributes, animation structure, and responsive classes
 * remain present and unchanged.
 *
 * **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8**
 */
describe('Feature: hero-section-redesign, Property 2: Preservation - Functional and Content Behavior Unchanged', () => {
  afterEach(() => {
    cleanup();
  });

  // Arbitrary for simulating multiple render scenarios (viewport width seeds)
  const viewportArb = fc.integer({ min: 320, max: 1920 });

  it('heading text "Your Complete homoeopathy Store & Clinic" is always present', () => {
    fc.assert(
      fc.property(viewportArb, () => {
        cleanup();
        renderHero();

        const heading = screen.getByRole('heading', {
          name: /Your Complete homoeopathy Store & Clinic/i,
        });
        expect(heading).toBeInTheDocument();
        expect(heading.textContent).toBe('Your Complete homoeopathy Store & Clinic');
      }),
      { numRuns: 50 }
    );
  });

  it('description text about dilutions and Dr. G Manasa is always present', () => {
    fc.assert(
      fc.property(viewportArb, () => {
        cleanup();
        renderHero();

        expect(
          screen.getByText(/Wide range of dilutions, mother tinctures, biochemic medicines/i)
        ).toBeInTheDocument();
        expect(
          screen.getByText(/Dr\. G Manasa B\.H\.M\.S/i)
        ).toBeInTheDocument();
      }),
      { numRuns: 50 }
    );
  });

  it('CTA "Book Appointment" links to /consultation for all renders', () => {
    fc.assert(
      fc.property(viewportArb, () => {
        cleanup();
        renderHero();

        const link = screen.getByRole('link', { name: /Book Appointment/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/consultation');
      }),
      { numRuns: 50 }
    );
  });

  it('CTA "Explore Treatments" links to /treatments for all renders', () => {
    fc.assert(
      fc.property(viewportArb, () => {
        cleanup();
        renderHero();

        const link = screen.getByRole('link', { name: /Explore Treatments/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/treatments');
      }),
      { numRuns: 50 }
    );
  });

  it('aria-label="Hero" exists on section element for all renders', () => {
    fc.assert(
      fc.property(viewportArb, () => {
        cleanup();
        const { container } = renderHero();

        const section = container.querySelector('section[aria-label="Hero"]');
        expect(section).not.toBeNull();
      }),
      { numRuns: 50 }
    );
  });

  it('trust badge messaging is preserved for all renders', () => {
    fc.assert(
      fc.property(viewportArb, () => {
        cleanup();
        renderHero();

        expect(
          screen.getByText(/Free Delivery within 3 km on orders above ₹500/i)
        ).toBeInTheDocument();
        expect(
          screen.getByText(/In-house & Online Consultation Available/i)
        ).toBeInTheDocument();
      }),
      { numRuns: 50 }
    );
  });

  it('Framer Motion motion.div wrappers are present (animation structure preserved)', () => {
    fc.assert(
      fc.property(viewportArb, () => {
        cleanup();
        const { container } = renderHero();

        // Framer Motion renders divs with data-* attributes or style transforms
        // The main content container and child elements use motion.div
        // which renders as regular div elements in jsdom
        const section = container.querySelector('section[aria-label="Hero"]');
        // The main content motion.div has z-10 and text-center
        const mainContent = section.querySelector('.relative.z-10.text-center');
        expect(mainContent).not.toBeNull();

        // Multiple motion.div children exist (heading, description, CTA container, badges)
        const motionChildren = mainContent.children;
        expect(motionChildren.length).toBeGreaterThanOrEqual(4);
      }),
      { numRuns: 50 }
    );
  });

  it('CTAs stack on mobile with flex-col sm:flex-row classes present', () => {
    fc.assert(
      fc.property(viewportArb, () => {
        cleanup();
        const { container } = renderHero();

        // The CTA container has flex flex-col sm:flex-row
        const ctaContainer = container.querySelector('.flex.flex-col.sm\\:flex-row');
        expect(ctaContainer).not.toBeNull();
      }),
      { numRuns: 50 }
    );
  });

  it('all decorative elements have aria-hidden="true"', () => {
    fc.assert(
      fc.property(viewportArb, () => {
        cleanup();
        const { container } = renderHero();

        const ariaHiddenElements = container.querySelectorAll('[aria-hidden="true"]');
        // Every aria-hidden element should be a decorative floating element
        ariaHiddenElements.forEach((el) => {
          expect(el.classList.contains('absolute')).toBe(true);
          expect(el.classList.contains('pointer-events-none')).toBe(true);
        });
      }),
      { numRuns: 50 }
    );
  });

  it('background gradient classes are present on section', () => {
    fc.assert(
      fc.property(viewportArb, () => {
        cleanup();
        const { container } = renderHero();

        const section = container.querySelector('section');
        expect(section.className).toContain('bg-gradient-to-br');
        expect(section.className).toContain('from-cream');
        expect(section.className).toContain('via-white');
        expect(section.className).toContain('to-sage/20');
      }),
      { numRuns: 50 }
    );
  });
});
