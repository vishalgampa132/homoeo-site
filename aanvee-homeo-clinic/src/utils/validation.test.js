import { describe, it, expect } from 'vitest';
import {
  validateField,
  validateForm,
  patterns,
  appointmentFormRules,
} from './validation';

describe('validateField', () => {
  describe('required rule', () => {
    const rules = { required: true };

    it('returns error for empty string', () => {
      expect(validateField('fullName', '', rules)).toBe('Full Name is required');
    });

    it('returns error for whitespace-only string', () => {
      expect(validateField('fullName', '   ', rules)).toBe('Full Name is required');
    });

    it('returns error for null value', () => {
      expect(validateField('email', null, rules)).toBe('Email is required');
    });

    it('returns error for undefined value', () => {
      expect(validateField('email', undefined, rules)).toBe('Email is required');
    });

    it('returns null for non-empty value', () => {
      expect(validateField('fullName', 'John', rules)).toBeNull();
    });
  });

  describe('minLength rule', () => {
    const rules = { required: true, minLength: 5 };

    it('returns error when value is shorter than minLength', () => {
      expect(validateField('fullName', 'Jo', rules)).toBe(
        'Full Name must be at least 5 characters'
      );
    });

    it('returns null when value meets minLength', () => {
      expect(validateField('fullName', 'James', rules)).toBeNull();
    });

    it('returns null when value exceeds minLength', () => {
      expect(validateField('fullName', 'Jonathan', rules)).toBeNull();
    });

    it('trims whitespace before checking length', () => {
      expect(validateField('fullName', '  Jo  ', rules)).toBe(
        'Full Name must be at least 5 characters'
      );
    });

    it('skips minLength check if field is empty and not required', () => {
      const optionalRules = { minLength: 5 };
      expect(validateField('message', '', optionalRules)).toBeNull();
    });
  });

  describe('pattern rule', () => {
    it('returns error for invalid email', () => {
      const rules = { required: true, pattern: patterns.email };
      expect(validateField('email', 'notanemail', rules)).toBe(
        'Please enter a valid email address'
      );
    });

    it('returns null for valid email', () => {
      const rules = { required: true, pattern: patterns.email };
      expect(validateField('email', 'user@example.com', rules)).toBeNull();
    });

    it('returns error for invalid phone number', () => {
      const rules = { required: true, pattern: patterns.phone };
      expect(validateField('mobile', '12345', rules)).toBe(
        'Please enter a valid 10-digit mobile number'
      );
    });

    it('returns null for valid 10-digit phone', () => {
      const rules = { required: true, pattern: patterns.phone };
      expect(validateField('mobile', '9876543210', rules)).toBeNull();
    });

    it('returns error for phone with non-digit characters', () => {
      const rules = { required: true, pattern: patterns.phone };
      expect(validateField('mobile', '98765-4321', rules)).toBe(
        'Please enter a valid 10-digit mobile number'
      );
    });

    it('skips pattern check if field is empty and not required', () => {
      const rules = { pattern: patterns.email };
      expect(validateField('email', '', rules)).toBeNull();
    });
  });

  describe('custom validator rule', () => {
    const ageRules = {
      required: true,
      custom: {
        validator: (value) => {
          const num = Number(value);
          return Number.isInteger(num) && num >= 1 && num <= 120;
        },
        message: 'Please enter a valid age (1-120)',
      },
    };

    it('returns error when custom validator fails', () => {
      expect(validateField('age', '0', ageRules)).toBe(
        'Please enter a valid age (1-120)'
      );
    });

    it('returns error for age above 120', () => {
      expect(validateField('age', '121', ageRules)).toBe(
        'Please enter a valid age (1-120)'
      );
    });

    it('returns error for non-numeric age', () => {
      expect(validateField('age', 'abc', ageRules)).toBe(
        'Please enter a valid age (1-120)'
      );
    });

    it('returns null for valid age', () => {
      expect(validateField('age', '25', ageRules)).toBeNull();
    });

    it('returns null for boundary age 1', () => {
      expect(validateField('age', '1', ageRules)).toBeNull();
    });

    it('returns null for boundary age 120', () => {
      expect(validateField('age', '120', ageRules)).toBeNull();
    });
  });

  describe('rule priority', () => {
    it('checks required before minLength', () => {
      const rules = { required: true, minLength: 5 };
      expect(validateField('fullName', '', rules)).toBe('Full Name is required');
    });

    it('checks minLength before pattern', () => {
      const rules = { required: true, minLength: 5, pattern: patterns.email };
      expect(validateField('email', 'a@b', rules)).toBe(
        'Email must be at least 5 characters'
      );
    });

    it('checks pattern before custom', () => {
      const rules = {
        required: true,
        pattern: { regex: /^\d+$/, message: 'Must be numeric' },
        custom: { validator: () => false, message: 'Custom failed' },
      };
      expect(validateField('field', 'abc', rules)).toBe('Must be numeric');
    });
  });

  describe('no rules', () => {
    it('returns null when rules is null', () => {
      expect(validateField('field', 'value', null)).toBeNull();
    });

    it('returns null when rules is undefined', () => {
      expect(validateField('field', 'value', undefined)).toBeNull();
    });
  });

  describe('field name formatting', () => {
    it('formats camelCase field names', () => {
      expect(validateField('healthConcern', '', { required: true })).toBe(
        'Health Concern is required'
      );
    });

    it('formats multi-word camelCase', () => {
      expect(validateField('preferredDate', '', { required: true })).toBe(
        'Preferred Date is required'
      );
    });

    it('handles single-word field names', () => {
      expect(validateField('age', '', { required: true })).toBe(
        'Age is required'
      );
    });
  });
});

describe('validateForm', () => {
  it('returns isValid true when all fields pass', () => {
    const formData = {
      fullName: 'John Doe',
      email: 'john@example.com',
    };
    const rules = {
      fullName: { required: true, minLength: 2 },
      email: { required: true, pattern: patterns.email },
    };

    const result = validateForm(formData, rules);
    expect(result.isValid).toBe(true);
    expect(result.errors.fullName).toBeNull();
    expect(result.errors.email).toBeNull();
  });

  it('returns isValid false when any field fails', () => {
    const formData = {
      fullName: '',
      email: 'john@example.com',
    };
    const rules = {
      fullName: { required: true },
      email: { required: true, pattern: patterns.email },
    };

    const result = validateForm(formData, rules);
    expect(result.isValid).toBe(false);
    expect(result.errors.fullName).toBe('Full Name is required');
    expect(result.errors.email).toBeNull();
  });

  it('returns errors for multiple invalid fields', () => {
    const formData = {
      fullName: '',
      email: 'invalid',
      mobile: '123',
    };
    const rules = {
      fullName: { required: true },
      email: { required: true, pattern: patterns.email },
      mobile: { required: true, pattern: patterns.phone },
    };

    const result = validateForm(formData, rules);
    expect(result.isValid).toBe(false);
    expect(result.errors.fullName).toBe('Full Name is required');
    expect(result.errors.email).toBe('Please enter a valid email address');
    expect(result.errors.mobile).toBe('Please enter a valid 10-digit mobile number');
  });

  it('handles missing fields in formData', () => {
    const formData = {};
    const rules = {
      fullName: { required: true },
    };

    const result = validateForm(formData, rules);
    expect(result.isValid).toBe(false);
    expect(result.errors.fullName).toBe('Full Name is required');
  });

  it('validates all appointment form fields correctly with valid data', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formData = {
      fullName: 'John Doe',
      mobile: '9876543210',
      email: 'john@example.com',
      age: '30',
      gender: 'Male',
      healthConcern: 'I have been experiencing chronic headaches for the past month',
      preferredDate: tomorrow.toISOString().split('T')[0],
      preferredTime: '10:00 AM',
      consultationType: 'online',
      message: 'Looking forward to the consultation',
    };

    const result = validateForm(formData, appointmentFormRules);
    expect(result.isValid).toBe(true);
    Object.values(result.errors).forEach((error) => {
      expect(error).toBeNull();
    });
  });

  it('validates all appointment form fields correctly with invalid data', () => {
    const formData = {
      fullName: '',
      mobile: '123',
      email: 'notvalid',
      age: '200',
      gender: '',
      healthConcern: 'short',
      preferredDate: '2020-01-01',
      preferredTime: '',
      consultationType: '',
      message: '',
    };

    const result = validateForm(formData, appointmentFormRules);
    expect(result.isValid).toBe(false);
    expect(result.errors.fullName).toBe('Full Name is required');
    expect(result.errors.mobile).toBe('Please enter a valid 10-digit mobile number');
    expect(result.errors.email).toBe('Please enter a valid email address');
    expect(result.errors.age).toBe('Please enter a valid age (1-120)');
    expect(result.errors.gender).toBe('Gender is required');
    expect(result.errors.healthConcern).toBe(
      'Health Concern must be at least 10 characters'
    );
    expect(result.errors.preferredDate).toBe('Please select a future date');
    expect(result.errors.preferredTime).toBe('Preferred Time is required');
    expect(result.errors.consultationType).toBe('Consultation Type is required');
    expect(result.errors.message).toBeNull(); // message is optional
  });
});

describe('patterns', () => {
  describe('email pattern', () => {
    it('accepts standard email', () => {
      expect(patterns.email.regex.test('user@domain.com')).toBe(true);
    });

    it('accepts email with subdomain', () => {
      expect(patterns.email.regex.test('user@sub.domain.com')).toBe(true);
    });

    it('rejects email without @', () => {
      expect(patterns.email.regex.test('userdomain.com')).toBe(false);
    });

    it('rejects email without domain', () => {
      expect(patterns.email.regex.test('user@')).toBe(false);
    });

    it('rejects email with spaces', () => {
      expect(patterns.email.regex.test('user @domain.com')).toBe(false);
    });
  });

  describe('phone pattern', () => {
    it('accepts 10-digit number', () => {
      expect(patterns.phone.regex.test('9876543210')).toBe(true);
    });

    it('rejects less than 10 digits', () => {
      expect(patterns.phone.regex.test('987654321')).toBe(false);
    });

    it('rejects more than 10 digits', () => {
      expect(patterns.phone.regex.test('98765432101')).toBe(false);
    });

    it('rejects non-digit characters', () => {
      expect(patterns.phone.regex.test('98765-4321')).toBe(false);
    });
  });
});
