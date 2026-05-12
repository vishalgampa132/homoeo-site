import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../../ui/GlassCard';
import CTAButton from '../../ui/CTAButton';
import { validateField, validateForm, patterns } from '../../../utils/validation';

const contactFormRules = {
  name: {
    required: true,
    minLength: 2,
  },
  email: {
    required: true,
    pattern: patterns.email,
  },
  subject: {
    required: true,
    minLength: 3,
  },
  message: {
    required: true,
    minLength: 10,
  },
};

const initialFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

/**
 * ContactForm - Contact page form with name, email, subject, message fields.
 * Validates on blur and submit. Shows success state on valid submission.
 */
export default function ContactForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name] && errors[name]) {
      const error = validateField(name, value, contactFormRules[name]);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value, contactFormRules[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allTouched = Object.keys(contactFormRules).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(allTouched);

    const { isValid, errors: validationErrors } = validateForm(formData, contactFormRules);
    setErrors(validationErrors);

    if (!isValid) return;

    setIsSubmitting(true);

    // Post to Google Sheets
    const payload = {
      formType: 'contact',
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    fetch('https://script.google.com/macros/s/AKfycbxuJbENAG7dYWrP0unkp3kKhl-wnUgDQdwj1EJenH-ofkxbqTxSy-w7TzrLm_ZHrHGX/exec', {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      })
      .catch(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      });
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData(initialFormData);
    setTouched({});
    setErrors({});
  };

  const getFieldError = (fieldName) => {
    return touched[fieldName] ? errors[fieldName] : null;
  };

  if (isSuccess) {
    return (
      <GlassCard hover={false} className="p-6 md:p-8">
        <motion.div
          className="text-center py-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-heading font-bold text-dark mb-2">
            Message Sent!
          </h3>
          <p className="text-gray-600 mb-6">
            Thank you for reaching out. We will get back to you shortly.
          </p>
          <button
            onClick={handleReset}
            className="px-6 py-3 min-h-[44px] bg-primary text-white rounded-full font-semibold
              hover:bg-primaryDark transition-colors duration-200"
          >
            Send Another Message
          </button>
        </motion.div>
      </GlassCard>
    );
  }

  return (
    <GlassCard hover={false} className="p-6 md:p-8">
      <h2 className="text-2xl md:text-3xl font-heading font-bold text-dark mb-6">
        Send Us a Message
      </h2>

      <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
        <div className="space-y-4 md:space-y-6">
          {/* Name */}
          <FormField
            label="Your Name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            error={getFieldError('name')}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />

          {/* Email */}
          <FormField
            label="Email Address"
            name="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            error={getFieldError('email')}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />

          {/* Subject */}
          <FormField
            label="Subject"
            name="subject"
            type="text"
            placeholder="What is this regarding?"
            value={formData.subject}
            error={getFieldError('subject')}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />

          {/* Message */}
          <TextAreaField
            label="Message"
            name="message"
            placeholder="Write your message here (min 10 characters)"
            value={formData.message}
            error={getFieldError('message')}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            rows={5}
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6 md:mt-8">
          <CTAButton
            type="submit"
            variant="primary"
            className="w-full md:w-auto min-h-[44px]"
            onClick={undefined}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </CTAButton>
        </div>
      </form>
    </GlassCard>
  );
}

/**
 * FormField - Reusable input field with label and error display.
 */
function FormField({ label, name, type, placeholder, value, error, onChange, onBlur, required, ...props }) {
  const errorId = `${name}-error`;
  const hasError = !!error;

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-sm font-medium text-dark mb-1">
        {label}
        {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
        aria-required={required}
        className={`w-full px-4 py-3 min-h-[44px] rounded-lg border bg-white/80 backdrop-blur-sm
          text-dark placeholder-gray-400 transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
          ${hasError ? 'border-red-400 focus:ring-red-300' : 'border-gray-200'}`}
        {...props}
      />
      {hasError && (
        <p id={errorId} className="text-red-500 text-xs mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * TextAreaField - Reusable textarea field with label and error display.
 */
function TextAreaField({ label, name, placeholder, value, error, onChange, onBlur, required, rows = 3 }) {
  const errorId = `${name}-error`;
  const hasError = !!error;

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-sm font-medium text-dark mb-1">
        {label}
        {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        rows={rows}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
        aria-required={required}
        className={`w-full px-4 py-3 min-h-[44px] rounded-lg border bg-white/80 backdrop-blur-sm
          text-dark placeholder-gray-400 transition-colors duration-200 resize-y
          focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
          ${hasError ? 'border-red-400 focus:ring-red-300' : 'border-gray-200'}`}
      />
      {hasError && (
        <p id={errorId} className="text-red-500 text-xs mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
