import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ContactForm from './ContactForm';

function renderForm() {
  return render(
    <MemoryRouter>
      <ContactForm />
    </MemoryRouter>
  );
}

describe('ContactForm', () => {
  describe('Rendering', () => {
    it('renders the form heading', () => {
      renderForm();
      expect(screen.getByText('Send Us a Message')).toBeInTheDocument();
    });

    it('renders all form fields', () => {
      renderForm();
      expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    });

    it('renders the submit button', () => {
      renderForm();
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    });

    it('applies GlassCard styling to form container', () => {
      const { container } = renderForm();
      const glassCard = container.querySelector('.backdrop-blur-\\[12px\\]');
      expect(glassCard).toBeInTheDocument();
    });

    it('has proper form aria-label', () => {
      renderForm();
      expect(screen.getByRole('form', { name: /contact form/i })).toBeInTheDocument();
    });

    it('marks required fields with asterisk', () => {
      renderForm();
      const labels = screen.getAllByText('*');
      expect(labels.length).toBe(4);
    });
  });

  describe('Inline validation on blur', () => {
    it('shows error when name is left empty on blur', () => {
      renderForm();
      const input = screen.getByLabelText(/your name/i);
      fireEvent.focus(input);
      fireEvent.blur(input);
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    });

    it('shows error for invalid email on blur', () => {
      renderForm();
      const input = screen.getByLabelText(/email address/i);
      fireEvent.change(input, { target: { value: 'invalid-email' } });
      fireEvent.blur(input);
      expect(screen.getByText(/valid email address/i)).toBeInTheDocument();
    });

    it('shows error when subject is too short on blur', () => {
      renderForm();
      const input = screen.getByLabelText(/subject/i);
      fireEvent.change(input, { target: { value: 'ab' } });
      fireEvent.blur(input);
      expect(screen.getByText(/at least 3 characters/i)).toBeInTheDocument();
    });

    it('shows error when message is too short on blur', () => {
      renderForm();
      const input = screen.getByLabelText(/message/i);
      fireEvent.change(input, { target: { value: 'short' } });
      fireEvent.blur(input);
      expect(screen.getByText(/at least 10 characters/i)).toBeInTheDocument();
    });

    it('clears error when field is corrected', () => {
      renderForm();
      const input = screen.getByLabelText(/your name/i);
      fireEvent.focus(input);
      fireEvent.blur(input);
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();

      fireEvent.change(input, { target: { value: 'John Doe' } });
      expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
    });

    it('sets aria-invalid on fields with errors', () => {
      renderForm();
      const input = screen.getByLabelText(/your name/i);
      fireEvent.focus(input);
      fireEvent.blur(input);
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('sets aria-describedby linking to error message', () => {
      renderForm();
      const input = screen.getByLabelText(/your name/i);
      fireEvent.focus(input);
      fireEvent.blur(input);
      expect(input).toHaveAttribute('aria-describedby', 'name-error');
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('Form submission validation', () => {
    it('shows all validation errors on submit with empty form', () => {
      renderForm();
      const submitBtn = screen.getByRole('button', { name: /send message/i });
      fireEvent.click(submitBtn);

      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/subject is required/i)).toBeInTheDocument();
      expect(screen.getByText(/message is required/i)).toBeInTheDocument();
    });

    it('does not show success state with invalid data', () => {
      renderForm();
      const submitBtn = screen.getByRole('button', { name: /send message/i });
      fireEvent.click(submitBtn);

      expect(screen.queryByText(/message sent/i)).not.toBeInTheDocument();
    });

    it('shows success state on valid submission', async () => {
      renderForm();

      fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: 'General Inquiry' } });
      fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'I would like to know more about your services.' } });

      const submitBtn = screen.getByRole('button', { name: /send message/i });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText(/message sent/i)).toBeInTheDocument();
      });
    });

    it('success state has reset button that shows form again', async () => {
      renderForm();

      fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: 'General Inquiry' } });
      fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'I would like to know more about your services.' } });

      fireEvent.click(screen.getByRole('button', { name: /send message/i }));

      await waitFor(() => {
        expect(screen.getByText(/message sent/i)).toBeInTheDocument();
      });

      fireEvent.click(screen.getByRole('button', { name: /send another message/i }));

      await waitFor(() => {
        expect(screen.queryByText(/message sent/i)).not.toBeInTheDocument();
      });

      expect(screen.getByLabelText(/your name/i)).toHaveValue('');
    });
  });
});
