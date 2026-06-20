import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ClinicStory from './ClinicStory';

describe('ClinicStory', () => {
  it('renders the "Our Story" heading', () => {
    render(<ClinicStory />);
    expect(
      screen.getByRole('heading', { name: /our story/i })
    ).toBeInTheDocument();
  });

  it('renders the section with proper aria-labelledby', () => {
    const { container } = render(<ClinicStory />);
    const section = container.querySelector('section[aria-labelledby="clinic-story-heading"]');
    expect(section).toBeInTheDocument();
  });

  it('renders narrative content about the clinic founding', () => {
    render(<ClinicStory />);
    expect(
      screen.getByText(/founded with a simple yet powerful vision/i)
    ).toBeInTheDocument();
  });

  it('renders content about personalized homoeopathic care', () => {
    render(<ClinicStory />);
    expect(
      screen.getByText(/personalized homoeopathic care/i)
    ).toBeInTheDocument();
  });

  it('renders content about the clinic values', () => {
    render(<ClinicStory />);
    expect(
      screen.getByText(/every patient is family/i)
    ).toBeInTheDocument();
  });
});
