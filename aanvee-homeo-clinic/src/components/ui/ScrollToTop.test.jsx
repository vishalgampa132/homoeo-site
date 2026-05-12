import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ScrollToTop from './ScrollToTop';

// Mock useScrollPosition hook
let mockScrollPosition = 0;
vi.mock('../../hooks/useScrollPosition', () => ({
  default: () => mockScrollPosition,
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    button: ({ children, className, onClick, 'aria-label': ariaLabel, ...props }) => (
      <button className={className} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </button>
    ),
  },
  AnimatePresence: ({ children }) => children,
  useReducedMotion: () => false,
}));

describe('ScrollToTop', () => {
  beforeEach(() => {
    mockScrollPosition = 0;
    window.scrollTo = vi.fn();
  });

  it('does not render when scroll position is less than 300px', () => {
    mockScrollPosition = 100;
    render(<ScrollToTop />);
    expect(screen.queryByLabelText('Scroll to top')).not.toBeInTheDocument();
  });

  it('renders when scroll position is greater than 300px', () => {
    mockScrollPosition = 400;
    render(<ScrollToTop />);
    expect(screen.getByLabelText('Scroll to top')).toBeInTheDocument();
  });

  it('calls window.scrollTo on click', () => {
    mockScrollPosition = 400;
    render(<ScrollToTop />);
    const button = screen.getByLabelText('Scroll to top');
    fireEvent.click(button);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('has fixed positioning classes', () => {
    mockScrollPosition = 400;
    render(<ScrollToTop />);
    const button = screen.getByLabelText('Scroll to top');
    expect(button.className).toContain('fixed');
    expect(button.className).toContain('bottom-24');
    expect(button.className).toContain('right-6');
  });

  it('has accessible focus styles', () => {
    mockScrollPosition = 400;
    render(<ScrollToTop />);
    const button = screen.getByLabelText('Scroll to top');
    expect(button.className).toContain('focus:outline-none');
    expect(button.className).toContain('focus:ring-2');
  });
});
