import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import CTAButton from './CTAButton';

function renderWithRouter(ui) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('CTAButton', () => {
  it('renders children content', () => {
    renderWithRouter(<CTAButton>Book Now</CTAButton>);
    expect(screen.getByText('Book Now')).toBeInTheDocument();
  });

  it('renders as a button element when no "to" prop is provided', () => {
    renderWithRouter(<CTAButton>Click Me</CTAButton>);
    expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument();
  });

  it('renders as a Link when "to" prop is provided', () => {
    renderWithRouter(<CTAButton to="/consultation">Book</CTAButton>);
    const link = screen.getByRole('link', { name: 'Book' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/consultation');
  });

  it('applies primary variant styles by default', () => {
    renderWithRouter(<CTAButton>Primary</CTAButton>);
    const button = screen.getByRole('button', { name: 'Primary' });
    expect(button.className).toContain('text-white');
    expect(button.className).toContain('shadow-cta');
    expect(button.style.background).toContain('linear-gradient');
  });

  it('applies secondary variant styles', () => {
    renderWithRouter(<CTAButton variant="secondary">Secondary</CTAButton>);
    const button = screen.getByRole('button', { name: 'Secondary' });
    expect(button.className).toContain('bg-sage');
    expect(button.className).toContain('text-dark');
  });

  it('applies outline variant styles', () => {
    renderWithRouter(<CTAButton variant="outline">Outline</CTAButton>);
    const button = screen.getByRole('button', { name: 'Outline' });
    expect(button.className).toContain('bg-transparent');
    expect(button.className).toContain('border-primary');
    expect(button.className).toContain('text-primary');
  });

  it('applies additional className prop', () => {
    renderWithRouter(<CTAButton className="mt-4 w-full">Styled</CTAButton>);
    const button = screen.getByRole('button', { name: 'Styled' });
    expect(button.className).toContain('mt-4');
    expect(button.className).toContain('w-full');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    renderWithRouter(<CTAButton onClick={handleClick}>Click</CTAButton>);
    fireEvent.click(screen.getByRole('button', { name: 'Click' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('sets button type attribute', () => {
    renderWithRouter(<CTAButton type="submit">Submit</CTAButton>);
    const button = screen.getByRole('button', { name: 'Submit' });
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('defaults button type to "button"', () => {
    renderWithRouter(<CTAButton>Default</CTAButton>);
    const button = screen.getByRole('button', { name: 'Default' });
    expect(button).toHaveAttribute('type', 'button');
  });

  it('applies base classes for all variants', () => {
    renderWithRouter(<CTAButton>Base</CTAButton>);
    const button = screen.getByRole('button', { name: 'Base' });
    expect(button.className).toContain('inline-flex');
    expect(button.className).toContain('items-center');
    expect(button.className).toContain('justify-center');
    expect(button.className).toContain('px-6');
    expect(button.className).toContain('py-3');
    expect(button.className).toContain('rounded-full');
    expect(button.className).toContain('font-semibold');
    expect(button.className).toContain('transition-all');
    expect(button.className).toContain('duration-150');
  });

  it('renders Link with gradient style for primary variant', () => {
    renderWithRouter(<CTAButton to="/treatments" variant="primary">Explore</CTAButton>);
    const link = screen.getByRole('link', { name: 'Explore' });
    expect(link.style.background).toContain('linear-gradient');
  });
});
