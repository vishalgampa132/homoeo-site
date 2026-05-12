import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import MobileMenu from './MobileMenu';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, whileHover, transition, variants, initial, animate, exit, custom, ...props }) => (
      <div {...props}>{children}</div>
    ),
    li: ({ children, whileHover, transition, variants, initial, animate, exit, custom, ...props }) => (
      <li {...props}>{children}</li>
    ),
    button: ({ children, whileHover, transition, variants, initial, animate, exit, custom, ...props }) => (
      <button {...props}>{children}</button>
    ),
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

function renderMobileMenu(props = {}, initialRoute = '/') {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
  };
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <MobileMenu {...defaultProps} {...props} />
    </MemoryRouter>
  );
}

describe('MobileMenu', () => {
  beforeEach(() => {
    document.body.style.overflow = '';
  });

  afterEach(() => {
    document.body.style.overflow = '';
    vi.restoreAllMocks();
  });

  it('renders all navigation links when open', () => {
    renderMobileMenu();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Treatments')).toBeInTheDocument();
    expect(screen.getByText('Consultation')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  it('renders the Book Consultation CTA button', () => {
    renderMobileMenu();
    expect(screen.getByText('Book Consultation')).toBeInTheDocument();
  });

  it('does not render content when closed', () => {
    renderMobileMenu({ isOpen: false });
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('has proper ARIA attributes', () => {
    renderMobileMenu();
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('id', 'mobile-menu');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-label', 'Mobile navigation menu');
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    renderMobileMenu({ onClose });

    const closeButton = screen.getByLabelText('Close navigation menu');
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when a nav link is clicked', () => {
    const onClose = vi.fn();
    renderMobileMenu({ onClose });

    fireEvent.click(screen.getByText('About Us'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when CTA button is clicked', () => {
    const onClose = vi.fn();
    renderMobileMenu({ onClose });

    fireEvent.click(screen.getByText('Book Consultation'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop overlay is clicked', () => {
    const onClose = vi.fn();
    renderMobileMenu({ onClose });

    // The backdrop is the first div with aria-hidden="true"
    const backdrop = document.querySelector('[aria-hidden="true"]');
    fireEvent.click(backdrop);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', () => {
    const onClose = vi.fn();
    renderMobileMenu({ onClose });

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose on Escape when menu is closed', () => {
    const onClose = vi.fn();
    renderMobileMenu({ isOpen: false, onClose });

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onClose).not.toHaveBeenCalled();
  });

  it('locks body scroll when open', () => {
    renderMobileMenu({ isOpen: true });
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scroll when closed', () => {
    const { rerender } = render(
      <MemoryRouter>
        <MobileMenu isOpen={true} onClose={vi.fn()} />
      </MemoryRouter>
    );

    expect(document.body.style.overflow).toBe('hidden');

    rerender(
      <MemoryRouter>
        <MobileMenu isOpen={false} onClose={vi.fn()} />
      </MemoryRouter>
    );

    expect(document.body.style.overflow).toBe('');
  });

  it('highlights the active link based on current route', () => {
    renderMobileMenu({}, '/about');
    const aboutLink = screen.getByText('About Us');
    expect(aboutLink.className).toContain('text-primary');
    expect(aboutLink.className).toContain('border-primary');
  });

  it('does not highlight inactive links', () => {
    renderMobileMenu({}, '/about');
    const homeLink = screen.getByText('Home');
    expect(homeLink.className).not.toContain('border-primary');
  });

  it('CTA button links to /consultation', () => {
    renderMobileMenu();
    const ctaLink = screen.getByText('Book Consultation').closest('a');
    expect(ctaLink).toHaveAttribute('href', '/consultation');
  });

  it('renders close button with minimum 44px tap target', () => {
    renderMobileMenu();
    const closeButton = screen.getByLabelText('Close navigation menu');
    expect(closeButton.className).toContain('w-11');
    expect(closeButton.className).toContain('h-11');
  });

  it('has mobile navigation aria-label', () => {
    renderMobileMenu();
    const nav = screen.getByRole('navigation', { name: 'Mobile navigation' });
    expect(nav).toBeInTheDocument();
  });
});
