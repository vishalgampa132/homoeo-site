import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';
import { clinicInfo } from '../../utils/constants';
import { navLinks } from '../../data/navigation';

function renderFooter() {
  return render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );
}

describe('Footer', () => {
  it('renders the clinic name', () => {
    renderFooter();
    expect(screen.getByText(clinicInfo.name)).toBeInTheDocument();
  });

  it('renders contact information', () => {
    renderFooter();
    expect(screen.getByText(clinicInfo.phone)).toBeInTheDocument();
    expect(screen.getByText(clinicInfo.email)).toBeInTheDocument();
    expect(screen.getByText('WhatsApp Us')).toBeInTheDocument();
  });

  it('renders the clinic address', () => {
    renderFooter();
    const addressText = `${clinicInfo.address.line1}, ${clinicInfo.address.line2}, ${clinicInfo.address.city}, ${clinicInfo.address.state} - ${clinicInfo.address.pincode}`;
    expect(screen.getByText(addressText)).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    renderFooter();
    navLinks.forEach((link) => {
      expect(screen.getByRole('link', { name: link.label })).toBeInTheDocument();
    });
  });

  it('renders working hours', () => {
    renderFooter();
    expect(screen.getByText(clinicInfo.workingHours.weekdays)).toBeInTheDocument();
    expect(screen.getByText(clinicInfo.workingHours.sunday)).toBeInTheDocument();
  });

  it('renders copyright notice with current year', () => {
    renderFooter();
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© ${currentYear} ${clinicInfo.name}. All rights reserved.`)
    ).toBeInTheDocument();
  });

  it('renders social media links that open in new tab', () => {
    renderFooter();
    const facebookLink = screen.getByLabelText('Visit our Facebook page');
    const instagramLink = screen.getByLabelText('Visit our Instagram page');
    const twitterLink = screen.getByLabelText('Visit our Twitter page');

    expect(facebookLink).toHaveAttribute('href', clinicInfo.socialMedia.facebook);
    expect(facebookLink).toHaveAttribute('target', '_blank');
    expect(facebookLink).toHaveAttribute('rel', 'noopener noreferrer');

    expect(instagramLink).toHaveAttribute('href', clinicInfo.socialMedia.instagram);
    expect(instagramLink).toHaveAttribute('target', '_blank');
    expect(instagramLink).toHaveAttribute('rel', 'noopener noreferrer');

    expect(twitterLink).toHaveAttribute('href', clinicInfo.socialMedia.twitter);
    expect(twitterLink).toHaveAttribute('target', '_blank');
    expect(twitterLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('uses semantic footer element with proper ARIA', () => {
    renderFooter();
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveAttribute('aria-label', 'Site footer');
  });

  it('renders footer navigation with aria-label', () => {
    renderFooter();
    const nav = screen.getByRole('navigation', { name: 'Footer navigation' });
    expect(nav).toBeInTheDocument();
  });

  it('renders WhatsApp link with correct href', () => {
    renderFooter();
    const whatsappLink = screen.getByText('WhatsApp Us');
    expect(whatsappLink).toHaveAttribute(
      'href',
      `https://wa.me/${clinicInfo.whatsapp}`
    );
    expect(whatsappLink).toHaveAttribute('target', '_blank');
    expect(whatsappLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders Book Appointment link to consultation page', () => {
    renderFooter();
    const bookLink = screen.getByRole('link', { name: 'Book Appointment' });
    expect(bookLink).toHaveAttribute('href', '/consultation');
  });
});
