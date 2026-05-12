/**
 * Form validation utility for Aanvee Homoeo website.
 * Provides field-level and form-level validation with configurable rules.
 */

/**
 * Validates a single field against its rules.
 * @param {string} fieldName - The name of the field being validated
 * @param {string} value - The current value of the field
 * @param {object} rules - Validation rules for this field
 * @param {boolean} [rules.required] - Whether the field is required
 * @param {number} [rules.minLength] - Minimum character count
 * @param {object} [rules.pattern] - Regex pattern validation
 * @param {RegExp} rules.pattern.regex - The regex to test against
 * @param {string} rules.pattern.message - Error message on pattern failure
 * @param {object} [rules.custom] - Custom validator
 * @param {function} rules.custom.validator - Function that returns true if valid
 * @param {string} rules.custom.message - Error message on custom validation failure
 * @returns {string|null} Error message or null if valid
 */
export function validateField(fieldName, value, rules) {
  if (!rules) return null;

  const stringValue = value == null ? '' : String(value);

  // Required check
  if (rules.required && stringValue.trim() === '') {
    return `${formatFieldName(fieldName)} is required`;
  }

  // If field is empty and not required, skip remaining validations
  if (stringValue.trim() === '') {
    return null;
  }

  // MinLength check
  if (rules.minLength && stringValue.trim().length < rules.minLength) {
    return `${formatFieldName(fieldName)} must be at least ${rules.minLength} characters`;
  }

  // Pattern check
  if (rules.pattern && !rules.pattern.regex.test(stringValue)) {
    return rules.pattern.message;
  }

  // Custom validator check
  if (rules.custom && !rules.custom.validator(stringValue)) {
    return rules.custom.message;
  }

  return null;
}

/**
 * Validates all fields in a form against their respective rules.
 * @param {object} formData - Object with field names as keys and values as values
 * @param {object} validationRules - Object with field names as keys and rule objects as values
 * @returns {{ isValid: boolean, errors: object }} Validation result with error messages per field
 */
export function validateForm(formData, validationRules) {
  const errors = {};
  let isValid = true;

  for (const fieldName of Object.keys(validationRules)) {
    const value = formData[fieldName];
    const rules = validationRules[fieldName];
    const error = validateField(fieldName, value, rules);

    errors[fieldName] = error;

    if (error !== null) {
      isValid = false;
    }
  }

  return { isValid, errors };
}

/**
 * Converts a camelCase field name to a human-readable label.
 * @param {string} fieldName - camelCase field name
 * @returns {string} Human-readable field name
 */
function formatFieldName(fieldName) {
  return fieldName
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

// Common validation patterns
export const patterns = {
  email: {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address',
  },
  phone: {
    regex: /^\d{10}$/,
    message: 'Please enter a valid 10-digit mobile number',
  },
};

// Appointment form validation rules
export const appointmentFormRules = {
  fullName: {
    required: true,
    minLength: 2,
  },
  mobile: {
    required: true,
    pattern: patterns.phone,
  },
  email: {
    required: true,
    pattern: patterns.email,
  },
  age: {
    required: true,
    custom: {
      validator: (value) => {
        const num = Number(value);
        return Number.isInteger(num) && num >= 1 && num <= 120;
      },
      message: 'Please enter a valid age (1-120)',
    },
  },
  gender: {
    required: true,
  },
  healthConcern: {
    required: true,
    minLength: 10,
  },
  preferredDate: {
    required: true,
    custom: {
      validator: (value) => {
        const selected = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selected >= today;
      },
      message: 'Please select a future date',
    },
  },
  preferredTime: {
    required: true,
  },
  consultationType: {
    required: true,
  },
  message: {
    // Optional field, but has max length via custom validator
    custom: {
      validator: (value) => value.length <= 500,
      message: 'Message must not exceed 500 characters',
    },
  },
};
