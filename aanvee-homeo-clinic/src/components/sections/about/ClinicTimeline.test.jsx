import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ClinicTimeline from './ClinicTimeline';

describe('ClinicTimeline', () => {
  it('renders the "Our Journey" heading', () => {
    render(<ClinicTimeline />);
    expect(
      screen.getByRole('heading', { name: /our journey/i })
    ).toBeInTheDocument();
  });

  it('renders the section with proper aria-labelledby', () => {
    const { container } = render(<ClinicTimeline />);
    const section = container.querySelector('section[aria-labelledby="clinic-timeline-heading"]');
    expect(section).toBeInTheDocument();
  });

  it('renders the founding milestone', () => {
    render(<ClinicTimeline />);
    expect(screen.getByText(/2012 — Founded/i)).toBeInTheDocument();
  });

  it('renders the expansion milestone', () => {
    render(<ClinicTimeline />);
    expect(screen.getByText(/2015 — Medicine Store Expansion/i)).toBeInTheDocument();
  });

  it('renders the patient milestone', () => {
    render(<ClinicTimeline />);
    expect(screen.getByText(/5,000 Patients Milestone/i)).toBeInTheDocument();
  });

  it('renders the online consultations milestone', () => {
    render(<ClinicTimeline />);
    expect(screen.getByText(/Online Consultations Launched/i)).toBeInTheDocument();
  });

  it('renders the multi-specialist team milestone', () => {
    render(<ClinicTimeline />);
    expect(screen.getByText(/Multi-Specialist Team/i)).toBeInTheDocument();
  });

  it('renders the 10,000+ patients milestone', () => {
    render(<ClinicTimeline />);
    expect(screen.getByText(/10,000\+ Happy Patients/i)).toBeInTheDocument();
  });

  it('renders the Timeline component with list role', () => {
    render(<ClinicTimeline />);
    expect(screen.getByRole('list', { name: /timeline steps/i })).toBeInTheDocument();
  });
});
