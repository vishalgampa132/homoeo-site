import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MissionVision from './MissionVision';

describe('MissionVision', () => {
  it('renders the "Mission & Vision" heading', () => {
    render(<MissionVision />);
    expect(
      screen.getByRole('heading', { name: /mission & vision/i })
    ).toBeInTheDocument();
  });

  it('renders the section with proper aria-labelledby', () => {
    const { container } = render(<MissionVision />);
    const section = container.querySelector('section[aria-labelledby="mission-vision-heading"]');
    expect(section).toBeInTheDocument();
  });

  it('renders the "Our Mission" subheading', () => {
    render(<MissionVision />);
    expect(
      screen.getByRole('heading', { name: /our mission/i })
    ).toBeInTheDocument();
  });

  it('renders the "Our Vision" subheading', () => {
    render(<MissionVision />);
    expect(
      screen.getByRole('heading', { name: /our vision/i })
    ).toBeInTheDocument();
  });

  it('renders mission statement content', () => {
    render(<MissionVision />);
    expect(
      screen.getByText(/accessible, personalized, and effective homeopathic healthcare/i)
    ).toBeInTheDocument();
  });

  it('renders vision statement content', () => {
    render(<MissionVision />);
    expect(
      screen.getByText(/most trusted homeopathy wellness center/i)
    ).toBeInTheDocument();
  });

  it('renders decorative icons with aria-hidden', () => {
    const { container } = render(<MissionVision />);
    const hiddenElements = container.querySelectorAll('[aria-hidden="true"]');
    expect(hiddenElements.length).toBeGreaterThan(0);
  });
});
