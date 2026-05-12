import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import ConsultationProcess from './ConsultationProcess';

// Mock IntersectionObserver for jsdom (required by Framer Motion's useInView)
beforeAll(() => {
  global.IntersectionObserver = class IntersectionObserver {
    constructor(callback) {
      this.callback = callback;
    }
    observe() {
      this.callback([{ isIntersecting: true }]);
    }
    unobserve() {}
    disconnect() {}
  };
});

function renderConsultationProcess() {
  return render(<ConsultationProcess />);
}

describe('ConsultationProcess', () => {
  it('renders the section heading "How It Works"', () => {
    renderConsultationProcess();
    expect(
      screen.getByRole('heading', { name: /how it works/i })
    ).toBeInTheDocument();
  });

  it('renders the section with proper aria-labelledby', () => {
    const { container } = renderConsultationProcess();
    const section = container.querySelector('section');
    expect(section).toHaveAttribute(
      'aria-labelledby',
      'consultation-process-heading'
    );
  });

  it('renders a subtitle paragraph', () => {
    renderConsultationProcess();
    expect(
      screen.getByText(/your journey to natural healing/i)
    ).toBeInTheDocument();
  });

  it('renders the timeline with role="list"', () => {
    renderConsultationProcess();
    const list = screen.getByRole('list', { name: /timeline steps/i });
    expect(list).toBeInTheDocument();
  });

  it('renders four timeline steps', () => {
    renderConsultationProcess();
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(4);
  });

  it('renders "Appointment Booking" step with description', () => {
    renderConsultationProcess();
    expect(screen.getByText('Appointment Booking')).toBeInTheDocument();
    expect(
      screen.getByText(/schedule your consultation online or by phone/i)
    ).toBeInTheDocument();
  });

  it('renders "Health Assessment" step with description', () => {
    renderConsultationProcess();
    expect(screen.getByText('Health Assessment')).toBeInTheDocument();
    expect(
      screen.getByText(/thorough evaluation of your symptoms/i)
    ).toBeInTheDocument();
  });

  it('renders "Personalized Medicine" step with description', () => {
    renderConsultationProcess();
    expect(screen.getByText('Personalized Medicine')).toBeInTheDocument();
    expect(
      screen.getByText(/individualized homeopathic remedies/i)
    ).toBeInTheDocument();
  });

  it('renders "Follow-up Care" step with description', () => {
    renderConsultationProcess();
    expect(screen.getByText('Follow-up Care')).toBeInTheDocument();
    expect(
      screen.getByText(/monitor your progress with regular follow-ups/i)
    ).toBeInTheDocument();
  });

  it('renders step icons with aria-hidden', () => {
    const { container } = renderConsultationProcess();
    const hiddenIcons = container.querySelectorAll('[aria-hidden="true"]');
    expect(hiddenIcons.length).toBe(4);
  });

  it('renders the correct icons for each step', () => {
    renderConsultationProcess();
    expect(screen.getByText('📅')).toBeInTheDocument();
    expect(screen.getByText('🩺')).toBeInTheDocument();
    expect(screen.getByText('💊')).toBeInTheDocument();
    expect(screen.getByText('🔄')).toBeInTheDocument();
  });
});
