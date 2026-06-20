import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BusinessInfo from './BusinessInfo';

describe('BusinessInfo', () => {
  describe('Rendering', () => {
    it('renders the heading', () => {
      render(<BusinessInfo />);
      expect(screen.getByText('Contact Information')).toBeInTheDocument();
    });

    it('applies GlassCard styling', () => {
      const { container } = render(<BusinessInfo />);
      const glassCard = container.querySelector('.backdrop-blur-\\[12px\\]');
      expect(glassCard).toBeInTheDocument();
    });
  });

  describe('Address', () => {
    it('displays the clinic address', () => {
      render(<BusinessInfo />);
      expect(screen.getByText(/shop no\. 12, green valley complex/i)).toBeInTheDocument();
      expect(screen.getByText(/pune/i)).toBeInTheDocument();
    });

    it('displays the Address label', () => {
      render(<BusinessInfo />);
      expect(screen.getByText('Address')).toBeInTheDocument();
    });
  });

  describe('Phone', () => {
    it('renders a clickable phone link', () => {
      render(<BusinessInfo />);
      const phoneLink = screen.getByRole('link', { name: /call us at/i });
      expect(phoneLink).toBeInTheDocument();
      expect(phoneLink).toHaveAttribute('href', 'tel:+919849941115');
    });

    it('displays the phone number text', () => {ß
      render(<BusinessInfo />);
      expect(screen.getByText('+91 98499 41115')).toBeInTheDocument();
    });
  });

  describe('WhatsApp', () => {
    it('renders a WhatsApp link', () => {
      render(<BusinessInfo />);
      const whatsappLink = screen.getByRole('link', { name: /chat with us on whatsapp/i });
      expect(whatsappLink).toBeInTheDocument();
      expect(whatsappLink).toHaveAttribute('href', 'https://wa.me/+919849941115');
    });

    it('WhatsApp link opens in new tab', () => {
      render(<BusinessInfo />);
      const whatsappLink = screen.getByRole('link', { name: /chat with us on whatsapp/i });
      expect(whatsappLink).toHaveAttribute('target', '_blank');
      expect(whatsappLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Email', () => {
    it('renders a clickable email link', () => {
      render(<BusinessInfo />);
      const emailLink = screen.getByRole('link', { name: /email us at/i });
      expect(emailLink).toBeInTheDocument();
      expect(emailLink).toHaveAttribute('href', 'mailto:contact@aanveehomoeo.com');
    });

    it('displays the email address text', () => {
      render(<BusinessInfo />);
      expect(screen.getByText('contact@aanveehomoeo.com')).toBeInTheDocument();
    });
  });

  describe('Working Hours', () => {
    it('displays weekday hours', () => {
      render(<BusinessInfo />);
      expect(screen.getByText(/mon - sat: 9:00 am - 8:00 pm/i)).toBeInTheDocument();
    });

    it('displays sunday hours', () => {
      render(<BusinessInfo />);
      expect(screen.getByText(/sun: 10:00 am - 2:00 pm/i)).toBeInTheDocument();
    });
  });

  describe('Social Media Links', () => {
    it('renders social media section', () => {
      render(<BusinessInfo />);
      expect(screen.getByText('Follow Us')).toBeInTheDocument();
    });

    it('renders all social media links', () => {
      render(<BusinessInfo />);
      expect(screen.getByRole('listitem', { name: /visit our facebook page/i })).toBeInTheDocument();
      expect(screen.getByRole('listitem', { name: /visit our instagram page/i })).toBeInTheDocument();
      expect(screen.getByRole('listitem', { name: /visit our twitter page/i })).toBeInTheDocument();
      expect(screen.getByRole('listitem', { name: /visit our youtube page/i })).toBeInTheDocument();
    });

    it('social media links open in new tab', () => {
      render(<BusinessInfo />);
      const fbLink = screen.getByRole('listitem', { name: /visit our facebook page/i });
      expect(fbLink).toHaveAttribute('target', '_blank');
      expect(fbLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('social media links have correct hrefs', () => {
      render(<BusinessInfo />);
      expect(screen.getByRole('listitem', { name: /visit our facebook page/i })).toHaveAttribute('href', 'https://facebook.com/aanveehomoeo');
      expect(screen.getByRole('listitem', { name: /visit our instagram page/i })).toHaveAttribute('href', 'https://instagram.com/aanveehomoeo');
      expect(screen.getByRole('listitem', { name: /visit our twitter page/i })).toHaveAttribute('href', 'https://twitter.com/aanveehomoeo');
      expect(screen.getByRole('listitem', { name: /visit our youtube page/i })).toHaveAttribute('href', 'https://youtube.com/@aanveehomoeo');
    });

    it('has social media list with proper aria-label', () => {
      render(<BusinessInfo />);
      expect(screen.getByRole('list', { name: /social media links/i })).toBeInTheDocument();
    });
  });
});
