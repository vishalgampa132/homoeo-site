import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { validateForm, appointmentFormRules } from './validation';

/**
 * Property 1: Form validation rejects empty required fields
 *
 * For any subset of required form fields left empty (or containing only whitespace),
 * submitting the appointment form should produce validation error messages for exactly
 * those empty fields, and the form should not be submitted.
 *
 * **Validates: Requirements 7.3**
 */
describe('Feature: aanvee-homoeo-website, Property 1: Form validation rejects empty required fields', () => {
  // Identify all required fields from appointmentFormRules
  const requiredFields = Object.entries(appointmentFormRules)
    .filter(([, rules]) => rules.required)
    .map(([fieldName]) => fieldName);

  // Valid data generators for each field that will pass all validation rules
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const futureDate = tomorrow.toISOString().split('T')[0];

  const validFieldValues = {
    fullName: 'John Doe',
    mobile: '9876543210',
    email: 'user@example.com',
    age: '30',
    gender: 'Male',
    healthConcern: 'I have been experiencing chronic headaches for the past month',
    preferredDate: futureDate,
    preferredTime: '10:00 AM',
    consultationType: 'online',
    message: 'Looking forward to the consultation',
  };

  // Arbitrary that generates a non-empty subset of required fields to leave empty
  const emptyFieldSubsetArb = fc
    .subarray(requiredFields, { minLength: 1, maxLength: requiredFields.length })
    .filter((subset) => subset.length > 0);

  // Arbitrary for empty/whitespace values
  const emptyValueArb = fc.oneof(
    fc.constant(''),
    fc.constant('   '),
    fc.constant('  '),
    fc.constant(' '),
    fc.constant('\t'),
    fc.constant(' \n '),
    fc.constant('    ')
  );

  it('should produce validation errors for exactly the empty required fields and no others', () => {
    fc.assert(
      fc.property(
        emptyFieldSubsetArb,
        emptyValueArb,
        (emptyFields, emptyValue) => {
          // Build form data: valid values for all fields, empty/whitespace for the chosen subset
          const formData = { ...validFieldValues };
          for (const field of emptyFields) {
            formData[field] = emptyValue;
          }

          const result = validateForm(formData, appointmentFormRules);

          // Form should be invalid when any required field is empty
          expect(result.isValid).toBe(false);

          // Each field in the empty subset should have a non-null error
          for (const field of emptyFields) {
            expect(result.errors[field]).not.toBeNull();
            expect(typeof result.errors[field]).toBe('string');
            expect(result.errors[field].length).toBeGreaterThan(0);
          }

          // Fields NOT in the empty subset should have null errors (valid)
          const validFields = requiredFields.filter(
            (f) => !emptyFields.includes(f)
          );
          for (const field of validFields) {
            expect(result.errors[field]).toBeNull();
          }

          // The optional 'message' field should always be null (no error)
          // since it's not required and we provide a valid value
          if (!emptyFields.includes('message')) {
            expect(result.errors.message).toBeNull();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should pass validation when all required fields have valid values', () => {
    fc.assert(
      fc.property(
        fc.constant(validFieldValues),
        (formData) => {
          const result = validateForm(formData, appointmentFormRules);
          expect(result.isValid).toBe(true);

          // All errors should be null
          for (const field of Object.keys(appointmentFormRules)) {
            expect(result.errors[field]).toBeNull();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should mark form as invalid for any non-empty subset of required fields left empty', () => {
    fc.assert(
      fc.property(
        emptyFieldSubsetArb,
        (emptyFields) => {
          const formData = { ...validFieldValues };
          for (const field of emptyFields) {
            formData[field] = '';
          }

          const result = validateForm(formData, appointmentFormRules);

          // Form must always be invalid
          expect(result.isValid).toBe(false);

          // The number of fields with errors should be at least the number of empty fields
          const errorCount = Object.values(result.errors).filter(
            (e) => e !== null
          ).length;
          expect(errorCount).toBeGreaterThanOrEqual(emptyFields.length);
        }
      ),
      { numRuns: 100 }
    );
  });
});
