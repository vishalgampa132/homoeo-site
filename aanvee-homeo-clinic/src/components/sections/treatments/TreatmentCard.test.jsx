import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import TreatmentCard from './TreatmentCard';

const mockTreatment = {
  id: 'migraine',
  name: 'Migraine',
  icon: '🧠',
  overview: 'Migraine is a neurological condition causing intense, throbbing headaches often accompanied by nausea and sensitivity to light.',
  symptoms: ['Throbbing headache', 'Nausea and vomiting', 'Light sensitivity'],
  benefits: ['No side effects', 'Treats root cause', 'Long-term relief'],
  medicines: ['Belladonna', 'Natrum Muriaticum', 'Spigelia'],
  slug: 'migraine',
};

function renderCard(props = {}) {
  const defaultProps = {
    treatment: mockTreatment,
    isExpanded: false,
    onToggle: vi.fn(),
    ...props,
  };
  return render(
    <MemoryRouter>
      <TreatmentCard {...defaultProps} />
    </MemoryRouter>
  );
}

describe('TreatmentCard', () => {
  describe('Collapsed state', () => {
    it('renders the treatment icon', () => {
      renderCard();
      expect(screen.getByText('🧠')).toBeInTheDocument();
    });

    it('renders the treatment name', () => {
      renderCard();
      expect(screen.getByText('Migraine')).toBeInTheDocument();
    });

    it('renders a truncated overview', () => {
      renderCard();
      expect(screen.getByText(mockTreatment.overview)).toBeInTheDocument();
    });

    it('does not render symptoms list when collapsed', () => {
      renderCard();
      expect(screen.queryByText('Symptoms')).not.toBeInTheDocument();
    });

    it('does not render benefits list when collapsed', () => {
      renderCard();
      expect(screen.queryByText('Benefits of Homeopathy')).not.toBeInTheDocument();
    });

    it('does not render medicines when collapsed', () => {
      renderCard();
      expect(screen.queryByText('Common Medicines')).not.toBeInTheDocument();
    });

    it('does not render Book Consultation CTA when collapsed', () => {
      renderCard();
      expect(screen.queryByText('Book Consultation')).not.toBeInTheDocument();
    });
  });

  describe('Expanded state', () => {
    it('renders the full overview', () => {
      renderCard({ isExpanded: true });
      expect(screen.getByText(mockTreatment.overview)).toBeInTheDocument();
    });

    it('renders the symptoms list', () => {
      renderCard({ isExpanded: true });
      expect(screen.getByText('Symptoms')).toBeInTheDocument();
      mockTreatment.symptoms.forEach((symptom) => {
        expect(screen.getByText(symptom)).toBeInTheDocument();
      });
    });

    it('renders the benefits list', () => {
      renderCard({ isExpanded: true });
      expect(screen.getByText('Benefits of Homeopathy')).toBeInTheDocument();
      mockTreatment.benefits.forEach((benefit) => {
        expect(screen.getByText(benefit)).toBeInTheDocument();
      });
    });

    it('renders the medicines list', () => {
      renderCard({ isExpanded: true });
      expect(screen.getByText('Common Medicines')).toBeInTheDocument();
      mockTreatment.medicines.forEach((medicine) => {
        expect(screen.getByText(medicine)).toBeInTheDocument();
      });
    });

    it('renders the Book Consultation CTA button', () => {
      renderCard({ isExpanded: true });
      expect(screen.getByText('Book Consultation')).toBeInTheDocument();
    });

    it('CTA button links to /consultation', () => {
      renderCard({ isExpanded: true });
      const link = screen.getByText('Book Consultation').closest('a');
      expect(link).toHaveAttribute('href', '/consultation');
    });
  });

  describe('Toggle interaction', () => {
    it('calls onToggle when the header button is clicked', () => {
      const onToggle = vi.fn();
      renderCard({ onToggle });
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(onToggle).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('has aria-expanded=false when collapsed', () => {
      renderCard({ isExpanded: false });
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('has aria-expanded=true when expanded', () => {
      renderCard({ isExpanded: true });
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('has aria-controls pointing to the content region', () => {
      renderCard({ isExpanded: true });
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-controls', 'treatment-content-migraine');
    });

    it('expanded content has role=region with aria-labelledby', () => {
      renderCard({ isExpanded: true });
      const region = screen.getByRole('region');
      expect(region).toHaveAttribute('aria-labelledby', 'treatment-header-migraine');
    });
  });

  describe('Edge cases', () => {
    it('renders without symptoms when array is empty', () => {
      renderCard({
        isExpanded: true,
        treatment: { ...mockTreatment, symptoms: [] },
      });
      expect(screen.queryByText('Symptoms')).not.toBeInTheDocument();
    });

    it('renders without benefits when array is empty', () => {
      renderCard({
        isExpanded: true,
        treatment: { ...mockTreatment, benefits: [] },
      });
      expect(screen.queryByText('Benefits of Homeopathy')).not.toBeInTheDocument();
    });

    it('renders without medicines when array is empty', () => {
      renderCard({
        isExpanded: true,
        treatment: { ...mockTreatment, medicines: [] },
      });
      expect(screen.queryByText('Common Medicines')).not.toBeInTheDocument();
    });
  });
});
