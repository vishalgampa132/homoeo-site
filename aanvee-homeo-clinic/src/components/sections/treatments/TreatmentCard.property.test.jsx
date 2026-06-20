import React from 'react';
import { render, within, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import * as fc from 'fast-check';
import { MemoryRouter } from 'react-router-dom';
import TreatmentCard from './TreatmentCard';

/**
 * Property 2: Expanded treatment cards display all required information
 *
 * For any valid treatment data object, when rendered in the expanded state,
 * the component output should contain the disease overview, symptoms list,
 * benefits of homoeopathy, common medicines, and a "Book Consultation" call-to-action.
 *
 * **Validates: Requirements 6.2**
 */
describe('Feature: aanvee-homoeo-website, Property 2: Expanded treatment cards display all required information', () => {
  afterEach(() => {
    cleanup();
  });

  // Generate alphanumeric word strings without leading/trailing whitespace
  const wordArb = fc.stringMatching(/^[A-Za-z][A-Za-z0-9]{2,20}$/);

  // Arbitrary for generating a valid treatment slug
  const slugArb = fc.stringMatching(/^[a-z][a-z0-9]{2,10}$/);

  // Arbitrary for generating a single emoji icon
  const iconArb = fc.constantFrom('🧠', '🦋', '🩸', '🌸', '🌿', '💇', '🦴', '🫁', '🌬️', '🧘', '👶', '🏃');

  // Generate arrays of prefixed unique strings to avoid duplicate text in DOM
  const symptomsArb = fc.array(wordArb, { minLength: 1, maxLength: 6 })
    .map((arr) => arr.map((s, i) => `Symptom${i} ${s}`));

  const benefitsArb = fc.array(wordArb, { minLength: 1, maxLength: 6 })
    .map((arr) => arr.map((s, i) => `Benefit${i} ${s}`));

  const medicinesArb = fc.array(wordArb, { minLength: 1, maxLength: 6 })
    .map((arr) => arr.map((s, i) => `Medicine${i} ${s}`));

  // Arbitrary for generating a valid treatment object with unique field values
  const treatmentArb = fc.record({
    id: slugArb,
    name: wordArb.map((s) => `Name ${s}`),
    icon: iconArb,
    overview: wordArb.map((s) => `Overview ${s}`),
    symptoms: symptomsArb,
    benefits: benefitsArb,
    medicines: medicinesArb,
    slug: slugArb,
  });

  function renderExpandedCard(treatment) {
    return render(
      <MemoryRouter>
        <TreatmentCard treatment={treatment} isExpanded={true} onToggle={vi.fn()} />
      </MemoryRouter>
    );
  }

  it('should display overview, symptoms, benefits, medicines, and CTA when expanded', () => {
    fc.assert(
      fc.property(treatmentArb, (treatment) => {
        cleanup();
        const { container } = renderExpandedCard(treatment);
        const view = within(container);

        // Overview text should be present in the expanded content
        expect(view.getByText(treatment.overview)).toBeInTheDocument();

        // Symptoms heading should be present
        expect(view.getByText('Symptoms')).toBeInTheDocument();

        // Each symptom should be rendered
        for (const symptom of treatment.symptoms) {
          expect(view.getByText(symptom)).toBeInTheDocument();
        }

        // Benefits heading should be present
        expect(view.getByText('Benefits of homoeopathy')).toBeInTheDocument();

        // Each benefit should be rendered
        for (const benefit of treatment.benefits) {
          expect(view.getByText(benefit)).toBeInTheDocument();
        }

        // Medicines heading should be present
        expect(view.getByText('Common Medicines')).toBeInTheDocument();

        // Each medicine should be rendered
        for (const medicine of treatment.medicines) {
          expect(view.getByText(medicine)).toBeInTheDocument();
        }

        // CTA button should be present and link to /consultation
        const cta = view.getByText('Book Consultation');
        expect(cta).toBeInTheDocument();
        const link = cta.closest('a');
        expect(link).toHaveAttribute('href', '/consultation');
      }),
      { numRuns: 100 }
    );
  });
});
