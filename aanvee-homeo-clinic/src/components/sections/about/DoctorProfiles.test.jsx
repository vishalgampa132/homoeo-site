import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DoctorProfiles from './DoctorProfiles';

describe('DoctorProfiles', () => {
  it('renders the "Our Consultants" heading', () => {
    render(<DoctorProfiles />);
    expect(
      screen.getByRole('heading', { name: /our consultants/i })
    ).toBeInTheDocument();
  });

  it('renders the section with proper aria-labelledby', () => {
    const { container } = render(<DoctorProfiles />);
    const section = container.querySelector('section[aria-labelledby="doctor-profiles-heading"]');
    expect(section).toBeInTheDocument();
  });

  it('renders all three doctor names', () => {
    render(<DoctorProfiles />);
    expect(screen.getByText('Dr. Anand Verma')).toBeInTheDocument();
    expect(screen.getByText('Dr. Veena Sharma')).toBeInTheDocument();
    expect(screen.getByText('Dr. Rajesh Kulkarni')).toBeInTheDocument();
  });

  it('renders doctor qualifications', () => {
    render(<DoctorProfiles />);
    expect(screen.getByText('BHMS, MD (homoeopathy)')).toBeInTheDocument();
    expect(screen.getByText('BHMS, PGDPC')).toBeInTheDocument();
    expect(screen.getByText('BHMS, CCH')).toBeInTheDocument();
  });

  it('renders doctor specializations', () => {
    render(<DoctorProfiles />);
    expect(screen.getByText(/chronic diseases & lifestyle disorders/i)).toBeInTheDocument();
    expect(screen.getByText(/pediatrics & women's health/i)).toBeInTheDocument();
    expect(screen.getByText(/skin & hair disorders/i)).toBeInTheDocument();
  });

  it('renders experience badges for each doctor', () => {
    render(<DoctorProfiles />);
    expect(screen.getByText(/15\+ years experience/i)).toBeInTheDocument();
    expect(screen.getByText(/12\+ years experience/i)).toBeInTheDocument();
    expect(screen.getByText(/10\+ years experience/i)).toBeInTheDocument();
  });

  it('renders a list with proper role and label', () => {
    render(<DoctorProfiles />);
    expect(screen.getByRole('list', { name: /doctor profiles/i })).toBeInTheDocument();
  });

  it('renders list items for each doctor', () => {
    render(<DoctorProfiles />);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(3);
  });
});
