import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../../ui/GlassCard';
import CTAButton from '../../ui/CTAButton';
import { validateField, validateForm, appointmentFormRules } from '../../../utils/validation';

const TIME_SLOTS = [
  '09:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '12:00 PM - 01:00 PM',
  '02:00 PM - 03:00 PM',
  '03:00 PM - 04:00 PM',
  '04:00 PM - 05:00 PM',
  '05:00 PM - 06:00 PM',
];

const initialFormData = {
  fullName: '',
  mobile: '',
  email: '',
  age: '',
  gender: '',
  healthConcern: '',
  preferredDate: '',
  preferredTime: '',
  consultationType: '',
  message: '',
};

/**
 * AppointmentForm - Consultation booking form with inline validation and success popup.
 * Uses GlassCard styling and Framer Motion animations.
 */
export default function AppointmentForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing in a touched field
    if (touched[name] && errors[name]) {
      const error = validateField(name, value, appointmentFormRules[name]);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value, appointmentFormRules[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(appointmentFormRules).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(allTouched);

    const { isValid, errors: validationErrors } = validateForm(formData, appointmentFormRules);
    setErrors(validationErrors);

    if (!isValid) return;

    setIsSubmitting(true);

    // Post to Google Sheets
    const payload = {
      formType: 'consultation',
      name: formData.fullName,
      mobile: formData.mobile,
      email: formData.email,
      age: formData.age,
      gender: formData.gender,
      healthConcern: formData.healthConcern,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      consultationType: formData.consultationType,
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

  const handleCloseSuccess = () => {
    setIsSuccess(false);
    setFormData(initialFormData);
    setTouched({});
    setErrors({});
  };

  const getFieldError = (fieldName) => {
    return touched[fieldName] ? errors[fieldName] : null;
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="relative">
      <GlassCard hover={false} className="p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-dark mb-6">
          Book Your Consultation
        </h2>

        <form onSubmit={handleSubmit} noValidate aria-label="Appointment booking form">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Full Name */}
            <FormField
              label="Full Name"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              error={getFieldError('fullName')}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />

            {/* Mobile */}
            <FormField
              label="Mobile Number"
              name="mobile"
              type="tel"
              placeholder="10-digit mobile number"
              value={formData.mobile}
              error={getFieldError('mobile')}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />

            {/* Email */}
            <FormField
              label="Email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              error={getFieldError('email')}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />

            {/* Age */}
            <FormField
              label="Age"
              name="age"
              type="number"
              placeholder="Your age"
              value={formData.age}
              error={getFieldError('age')}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              min="1"
              max="120"
            />

            {/* Gender */}
            <SelectField
              label="Gender"
              name="gender"
              value={formData.gender}
              error={getFieldError('gender')}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              options={[
                { value: '', label: 'Select gender' },
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
                { value: 'Other', label: 'Other' },
              ]}
            />

            {/* Preferred Date */}
            <FormField
              label="Preferred Date"
              name="preferredDate"
              type="date"
              value={formData.preferredDate}
              error={getFieldError('preferredDate')}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              min={getMinDate()}
            />

            {/* Preferred Time */}
            <SelectField
              label="Preferred Time"
              name="preferredTime"
              value={formData.preferredTime}
              error={getFieldError('preferredTime')}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              options={[
                { value: '', label: 'Select time slot' },
                ...TIME_SLOTS.map((slot) => ({ value: slot, label: slot })),
              ]}
            />

            {/* Consultation Type */}
            <SelectField
              label="Consultation Type"
              name="consultationType"
              value={formData.consultationType}
              error={getFieldError('consultationType')}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              options={[
                { value: '', label: 'Select type' },
                { value: 'online', label: 'Online Consultation' },
                { value: 'offline', label: 'In-Person Visit' },
              ]}
            />
          </div>

          {/* Health Concern - full width */}
          <div className="mt-4 md:mt-6">
            <TextAreaField
              label="Health Concern"
              name="healthConcern"
              placeholder="Describe your health concern in detail (min 10 characters)"
              value={formData.healthConcern}
              error={getFieldError('healthConcern')}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              rows={3}
            />
          </div>

          {/* Message - full width, optional */}
          <div className="mt-4 md:mt-6">
            <TextAreaField
              label="Message (Optional)"
              name="message"
              placeholder="Any additional message or questions"
              value={formData.message}
              error={getFieldError('message')}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={3}
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
              {isSubmitting ? 'Submitting...' : 'Book Appointment'}
            </CTAButton>
          </div>
        </form>
      </GlassCard>

      {/* Success Popup */}
      <AnimatePresence>
        {isSuccess && (
          <SuccessPopup onClose={handleCloseSuccess} />
        )}
      </AnimatePresence>
    </div>
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
 * SelectField - Reusable select field with label and error display.
 */
function SelectField({ label, name, value, error, onChange, onBlur, required, options }) {
  const errorId = `${name}-error`;
  const hasError = !!error;

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-sm font-medium text-dark mb-1">
        {label}
        {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
        aria-required={required}
        className={`w-full px-4 py-3 min-h-[44px] rounded-lg border bg-white/80 backdrop-blur-sm
          text-dark transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
          ${hasError ? 'border-red-400 focus:ring-red-300' : 'border-gray-200'}
          ${!value ? 'text-gray-400' : ''}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
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

/**
 * SuccessPopup - Animated success confirmation overlay.
 */
function SuccessPopup({ onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Appointment booked successfully"
    >
      <motion.div
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl text-center"
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated checkmark */}
        <motion.div
          className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', damping: 12 }}
        >
          <motion.svg
            className="w-8 h-8 text-primary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <motion.path
              d="M5 13l4 4L19 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            />
          </motion.svg>
        </motion.div>

        <h3 className="text-xl font-heading font-bold text-dark mb-2">
          Appointment Booked!
        </h3>
        <p className="text-gray-600 mb-6">
          Your consultation has been scheduled successfully. We will contact you shortly to confirm your appointment.
        </p>

        <button
          onClick={onClose}
          className="px-6 py-3 min-h-[44px] bg-primary text-white rounded-full font-semibold
            hover:bg-primaryDark transition-colors duration-200"
        >
          Done
        </button>
      </motion.div>
    </motion.div>
  );
}
