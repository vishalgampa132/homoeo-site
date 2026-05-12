import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Navbar from './Navbar';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, whileHover, transition, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, whileHover, transition, ...props }) => (
      <button {...props}>{children}</button>
    ),
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

function renderNavbar(props = {}, initialRoute = '/') {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Navbar onMobileMenuToggle={vi.fn()} {...props} />
    </MemoryRouter>
  );
}

describe('Navbar', () => {
  beforeEach(() => {
    // Reset scroll position
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the logo link', () => {
    renderNavbar();
    const logo = screen.getByLabelText('Aanvee Homoeo - Home');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('href', '/');
  });

  it('renders all navigation links', () => {
    renderNavbar();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Treatments')).toBeInTheDocument();
    expect(screen.getByText('Consultation')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  it('renders the Book Consultation CTA button', () => {
    renderNavbar();
    expect(screen.getByText('Book Consultation')).toBeInTheDocument();
  });

  it('has transparent background when not scrolled', () => {
    renderNavbar();
    const header = screen.getByRole('banner');
    expect(header.className).toContain('bg-transparent');
    expect(header.className).not.toContain('bg-white');
  });

  it('transitions to solid background when scrolled past 50px', () => {
    renderNavbar();

    // Simulate scroll past 50px
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    fireEvent.scroll(window);

    const header = screen.getByRole('banner');
    expect(header.className).toContain('bg-white');
    expect(header.className).toContain('shadow-card');
  });

  it('remains transparent when scrolled less than 50px', () => {
    renderNavbar();

    Object.defineProperty(window, 'scrollY', { value: 30, writable: true });
    fireEvent.scroll(window);

    const header = screen.getByRole('banner');
    expect(header.className).toContain('bg-transparent');
  });

  it('renders hamburger button on mobile', () => {
    renderNavbar();
    const hamburger = screen.getByLabelText('Open navigation menu');
    expect(hamburger).toBeInTheDocument();
  });

  it('calls onMobileMenuToggle when hamburger is clicked', () => {
    const onToggle = vi.fn();
    renderNavbar({ onMobileMenuToggle: onToggle });

    const hamburger = screen.getByLabelText('Open navigation menu');
    fireEvent.click(hamburger);

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('highlights the active link based on current route', () => {
    renderNavbar({}, '/about');
    const aboutLink = screen.getByText('About Us');
    expect(aboutLink.className).toContain('text-primary');
    expect(aboutLink.className).toContain('border-primary');
  });

  it('does not highlight inactive links', () => {
    renderNavbar({}, '/');
    const aboutLink = screen.getByText('About Us');
    expect(aboutLink.className).not.toContain('border-primary');
  });

  it('has proper ARIA attributes on the nav element', () => {
    renderNavbar();
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
  });

  it('hamburger button has proper ARIA attributes', () => {
    renderNavbar();
    const hamburger = screen.getByLabelText('Open navigation menu');
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
    expect(hamburger).toHaveAttribute('aria-controls', 'mobile-menu');
  });

  it('CTA button links to /consultation', () => {
    renderNavbar();
    const ctaLink = screen.getByText('Book Consultation').closest('a');
    expect(ctaLink).toHaveAttribute('href', '/consultation');
  });
});
