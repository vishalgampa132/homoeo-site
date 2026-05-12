import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import AppointmentForm from './AppointmentForm';

function renderForm() {
  return render(
    <MemoryRouter>
      <AppointmentForm />
    </MemoryRouter>
  );
}

describe('AppointmentForm', () => {
  describe('Rendering', () => {
    it('renders the form heading', () => {
      renderForm();
      expect(screen.getByText('Book Your Consultation')).toBeInTheDocument();
    });

    it('renders all required form fields', () => {
      renderForm();
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/mobile number/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^age/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/health concern/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/preferred date/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/preferred time/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/consultation type/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    });

    it('renders the submit button', () => {
      renderForm();
      expect(screen.getByRole('button', { name: /book appointment/i })).toBeInTheDocument();
    });

    it('applies GlassCard styling to form container', () => {
      const { container } = renderForm();
      const glassCard = container.querySelector('.backdrop-blur-\\[12px\\]');
      expect(glassCard).toBeInTheDocument();
    });

    it('has proper form aria-label', () => {
      renderForm();
      expect(screen.getByRole('form', { name: /appointment booking form/i })).toBeInTheDocument();
    });
  });

  describe('Inline validation on blur', () => {
    it('shows error when full name is left empty on blur', () => {
      renderForm();
      const input = screen.getByLabelText(/full name/i);
      fireEvent.focus(input);
      fireEvent.blur(input);
      expect(screen.getByText(/full name is required/i)).toBeInTheDocument();
    });

    it('shows error for invalid email on blur', () => {
      renderForm();
      const input = screen.getByLabelText(/email/i);
      fireEvent.change(input, { target: { value: 'invalid-email' } });
      fireEvent.blur(input);
      expect(screen.getByText(/valid email address/i)).toBeInTheDocument();
    });

    it('shows error for invalid mobile number on blur', () => {
      renderForm();
      const input = screen.getByLabelText(/mobile number/i);
      fireEvent.change(input, { target: { value: '123' } });
      fireEvent.blur(input);
      expect(screen.getByText(/valid 10-digit mobile number/i)).toBeInTheDocument();
    });

    it('shows error for invalid age on blur', () => {
      renderForm();
      const input = screen.getByLabelText(/^age/i);
      fireEvent.change(input, { target: { value: '150' } });
      fireEvent.blur(input);
      expect(screen.getByText(/valid age/i)).toBeInTheDocument();
    });

    it('clears error when field is corrected', () => {
      renderForm();
      const input = screen.getByLabelText(/full name/i);
      fireEvent.focus(input);
      fireEvent.blur(input);
      expect(screen.getByText(/full name is required/i)).toBeInTheDocument();

      fireEvent.change(input, { target: { value: 'John Doe' } });
      expect(screen.queryByText(/full name is required/i)).not.toBeInTheDocument();
    });

    it('sets aria-invalid on fields with errors', () => {
      renderForm();
      const input = screen.getByLabelText(/full name/i);
      fireEvent.focus(input);
      fireEvent.blur(input);
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('sets aria-describedby linking to error message', () => {
      renderForm();
      const input = screen.getByLabelText(/full name/i);
      fireEvent.focus(input);
      fireEvent.blur(input);
      expect(input).toHaveAttribute('aria-describedby', 'fullName-error');
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('Form submission validation', () => {
    it('shows all validation errors on submit with empty form', () => {
      renderForm();
      const submitBtn = screen.getByRole('button', { name: /book appointment/i });
      fireEvent.click(submitBtn);

      // Should show errors for all required fields
      expect(screen.getByText(/full name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/mobile is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/age is required/i)).toBeInTheDocument();
      expect(screen.getByText(/gender is required/i)).toBeInTheDocument();
      expect(screen.getByText(/health concern is required/i)).toBeInTheDocument();
      expect(screen.getByText(/preferred date is required/i)).toBeInTheDocument();
      expect(screen.getByText(/preferred time is required/i)).toBeInTheDocument();
      expect(screen.getByText(/consultation type is required/i)).toBeInTheDocument();
    });

    it('does not submit form with invalid data', () => {
      renderForm();
      const submitBtn = screen.getByRole('button', { name: /book appointment/i });
      fireEvent.click(submitBtn);

      // Success popup should not appear
      expect(screen.queryByText(/appointment booked/i)).not.toBeInTheDocument();
    });

    it('shows success popup on valid submission', async () => {
      renderForm();

      // Fill all required fields with valid data
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dateStr = tomorrow.toISOString().split('T')[0];

      fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText(/mobile number/i), { target: { value: '9876543210' } });
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText(/^age/i), { target: { value: '30' } });
      fireEvent.change(screen.getByLabelText(/gender/i), { target: { value: 'Male' } });
      fireEvent.change(screen.getByLabelText(/health concern/i), { target: { value: 'Chronic headaches and migraines' } });
      fireEvent.change(screen.getByLabelText(/preferred date/i), { target: { value: dateStr } });
      fireEvent.change(screen.getByLabelText(/preferred time/i), { target: { value: '09:00 AM - 10:00 AM' } });
      fireEvent.change(screen.getByLabelText(/consultation type/i), { target: { value: 'online' } });

      const submitBtn = screen.getByRole('button', { name: /book appointment/i });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText(/appointment booked/i)).toBeInTheDocument();
      });
    });

    it('success popup has close button that resets form', async () => {
      renderForm();

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dateStr = tomorrow.toISOString().split('T')[0];

      fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText(/mobile number/i), { target: { value: '9876543210' } });
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText(/^age/i), { target: { value: '30' } });
      fireEvent.change(screen.getByLabelText(/gender/i), { target: { value: 'Male' } });
      fireEvent.change(screen.getByLabelText(/health concern/i), { target: { value: 'Chronic headaches and migraines' } });
      fireEvent.change(screen.getByLabelText(/preferred date/i), { target: { value: dateStr } });
      fireEvent.change(screen.getByLabelText(/preferred time/i), { target: { value: '09:00 AM - 10:00 AM' } });
      fireEvent.change(screen.getByLabelText(/consultation type/i), { target: { value: 'online' } });

      fireEvent.click(screen.getByRole('button', { name: /book appointment/i }));

      await waitFor(() => {
        expect(screen.getByText(/appointment booked/i)).toBeInTheDocument();
      });

      // Click Done button to close
      fireEvent.click(screen.getByRole('button', { name: /done/i }));

      await waitFor(() => {
        expect(screen.queryByText(/appointment booked/i)).not.toBeInTheDocument();
      });

      // Form should be reset
      expect(screen.getByLabelText(/full name/i)).toHaveValue('');
    });
  });
});
