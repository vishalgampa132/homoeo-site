import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ConsultationBenefits from './ConsultationBenefits';

function renderComponent() {
  return render(
    <MemoryRouter>
      <ConsultationBenefits />
    </MemoryRouter>
  );
}

describe('ConsultationBenefits', () => {
  it('renders the section heading', () => {
    renderComponent();
    expect(screen.getByText('Consultation Options')).toBeInTheDocument();
  });

  it('renders the section description', () => {
    renderComponent();
    expect(
      screen.getByText(/choose the consultation mode that works best for you/i)
    ).toBeInTheDocument();
  });

  it('renders online consultation heading', () => {
    renderComponent();
    expect(screen.getByText('Online Consultation')).toBeInTheDocument();
  });

  it('renders in-clinic consultation heading', () => {
    renderComponent();
    expect(screen.getByText('In-Clinic Consultation')).toBeInTheDocument();
  });

  it('renders all online benefits', () => {
    renderComponent();
    expect(screen.getByText('Consult from Home')).toBeInTheDocument();
    expect(screen.getByText('Flexible Scheduling')).toBeInTheDocument();
    expect(screen.getByText('Medicine Delivery')).toBeInTheDocument();
    expect(screen.getByText('Easy Follow-ups')).toBeInTheDocument();
  });

  it('renders all offline benefits', () => {
    renderComponent();
    expect(screen.getByText('In-Person Assessment')).toBeInTheDocument();
    expect(screen.getByText('Personal Connection')).toBeInTheDocument();
    expect(screen.getByText('Immediate Medicine')).toBeInTheDocument();
    expect(screen.getByText('Family Consultations')).toBeInTheDocument();
  });

  it('has proper aria-labelledby on the section', () => {
    renderComponent();
    const section = screen.getByRole('region', { name: /consultation options/i });
    expect(section).toBeInTheDocument();
  });

  it('renders benefit lists with proper aria labels', () => {
    renderComponent();
    expect(screen.getByRole('list', { name: /online consultation benefits/i })).toBeInTheDocument();
    expect(screen.getByRole('list', { name: /in-clinic consultation benefits/i })).toBeInTheDocument();
  });

  it('renders benefit descriptions', () => {
    renderComponent();
    expect(
      screen.getByText(/get expert homoeopathic consultation from the comfort of your home/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/thorough physical examination and detailed case-taking/i)
    ).toBeInTheDocument();
  });
});
