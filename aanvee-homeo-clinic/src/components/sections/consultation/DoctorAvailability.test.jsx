import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import DoctorAvailability from './DoctorAvailability';

function renderComponent() {
  return render(
    <MemoryRouter>
      <DoctorAvailability />
    </MemoryRouter>
  );
}

describe('DoctorAvailability', () => {
  describe('Section heading and description', () => {
    it('renders the section heading', () => {
      renderComponent();
      expect(screen.getByText('Doctor Availability & Schedule')).toBeInTheDocument();
    });

    it('renders the section description', () => {
      renderComponent();
      expect(
        screen.getByText(/our experienced homeopathic doctors are available throughout the week/i)
      ).toBeInTheDocument();
    });

    it('has proper aria-labelledby on the section', () => {
      renderComponent();
      const section = screen.getByRole('region', { name: /doctor availability/i });
      expect(section).toBeInTheDocument();
    });
  });

  describe('Weekly Schedule', () => {
    it('renders the weekly schedule heading', () => {
      renderComponent();
      expect(screen.getByText('Weekly Schedule')).toBeInTheDocument();
    });

    it('renders all schedule days', () => {
      renderComponent();
      expect(screen.getByText('Monday - Friday')).toBeInTheDocument();
      expect(screen.getByText('Saturday')).toBeInTheDocument();
      expect(screen.getByText('Sunday')).toBeInTheDocument();
    });

    it('renders schedule hours', () => {
      renderComponent();
      expect(screen.getByText('9:00 AM - 8:00 PM')).toBeInTheDocument();
      expect(screen.getByText('9:00 AM - 6:00 PM')).toBeInTheDocument();
      expect(screen.getByText('10:00 AM - 2:00 PM')).toBeInTheDocument();
    });

    it('renders schedule list with proper aria label', () => {
      renderComponent();
      expect(screen.getByRole('list', { name: /doctor weekly schedule/i })).toBeInTheDocument();
    });
  });

  describe('Consultation Types', () => {
    it('renders the consultation types heading', () => {
      renderComponent();
      expect(screen.getByText('Consultation Types')).toBeInTheDocument();
    });

    it('renders all consultation types', () => {
      renderComponent();
      expect(screen.getByText('First Visit')).toBeInTheDocument();
      expect(screen.getByText('Follow-up')).toBeInTheDocument();
      expect(screen.getByText('Online Video')).toBeInTheDocument();
      expect(screen.getByText('Emergency')).toBeInTheDocument();
    });

    it('renders consultation durations', () => {
      renderComponent();
      expect(screen.getByText('45-60 minutes')).toBeInTheDocument();
      expect(screen.getByText('15-20 minutes')).toBeInTheDocument();
      expect(screen.getByText('30-45 minutes')).toBeInTheDocument();
      expect(screen.getByText('As needed')).toBeInTheDocument();
    });

    it('renders consultation type descriptions', () => {
      renderComponent();
      expect(
        screen.getByText(/comprehensive case-taking, medical history review/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/progress review, dosage adjustments/i)
      ).toBeInTheDocument();
    });

    it('renders consultation types list with proper aria label', () => {
      renderComponent();
      expect(
        screen.getByRole('list', { name: /available consultation types/i })
      ).toBeInTheDocument();
    });
  });

  describe('FAQ Section', () => {
    it('renders the FAQ heading', () => {
      renderComponent();
      expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    });

    it('renders FAQ questions', () => {
      renderComponent();
      expect(screen.getByText('How long is a typical consultation?')).toBeInTheDocument();
      expect(screen.getByText('What should I bring to my appointment?')).toBeInTheDocument();
      expect(screen.getByText('Is online consultation as effective as in-person?')).toBeInTheDocument();
      expect(screen.getByText('How do I prepare for a homeopathic consultation?')).toBeInTheDocument();
      expect(screen.getByText('Can I book a consultation for my child?')).toBeInTheDocument();
      expect(screen.getByText('What payment methods do you accept?')).toBeInTheDocument();
      expect(screen.getByText('How soon can I expect results from homeopathic treatment?')).toBeInTheDocument();
    });

    it('expands FAQ item on click to show answer', () => {
      renderComponent();
      const question = screen.getByText('How long is a typical consultation?');
      fireEvent.click(question);
      expect(
        screen.getByText(/a first-time consultation usually takes 45-60 minutes/i)
      ).toBeInTheDocument();
    });

    it('renders FAQ region with proper aria label', () => {
      renderComponent();
      expect(
        screen.getByRole('region', { name: /frequently asked questions/i })
      ).toBeInTheDocument();
    });
  });
});
