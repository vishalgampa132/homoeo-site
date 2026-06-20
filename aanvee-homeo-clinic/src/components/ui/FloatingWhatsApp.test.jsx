import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FloatingWhatsApp from './FloatingWhatsApp';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    a: ({ children, className, href, target, rel, 'aria-label': ariaLabel, ...props }) => (
      <a className={className} href={href} target={target} rel={rel} aria-label={ariaLabel}>
        {children}
      </a>
    ),
  },
  useReducedMotion: () => false,
  AnimatePresence: ({ children }) => children,
}));

describe('FloatingWhatsApp', () => {
  it('renders a WhatsApp link with correct href', () => {
    render(<FloatingWhatsApp />);
    const link = screen.getByLabelText('Chat on WhatsApp');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://wa.me/919849941115');
  });

  it('opens in a new tab', () => {
    render(<FloatingWhatsApp />);
    const link = screen.getByLabelText('Chat on WhatsApp');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has fixed positioning classes', () => {
    render(<FloatingWhatsApp />);
    const link = screen.getByLabelText('Chat on WhatsApp');
    expect(link.className).toContain('fixed');
    expect(link.className).toContain('bottom-6');
    expect(link.className).toContain('right-6');
  });

  it('contains an SVG icon', () => {
    render(<FloatingWhatsApp />);
    const link = screen.getByLabelText('Chat on WhatsApp');
    const svg = link.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('has accessible focus styles', () => {
    render(<FloatingWhatsApp />);
    const link = screen.getByLabelText('Chat on WhatsApp');
    expect(link.className).toContain('focus:outline-none');
    expect(link.className).toContain('focus:ring-2');
  });
});
