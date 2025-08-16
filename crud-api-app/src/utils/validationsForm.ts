import { FieldValidationConfig, ValidationRule } from "./validationsType";

export const commonValidations = {
    required: (message: string): ValidationRule => ({
        condition: (value) => !!String(value ?? '').trim(),
        message
    }),
    exactLength: (length: number, message: string): ValidationRule => ({
        condition: (value) => String(value ?? '').length === length,
        message
    }),
    numeric: (message: string): ValidationRule => ({
        condition: (value) => /^\d+$/.test(String(value ?? '')),
        message
    }),
    minLength: (min: number, message: string): ValidationRule => ({
        condition: (value) => String(value ?? '').length >= min,
        message
    }),
    maxLength: (max: number, message: string): ValidationRule => ({
        condition: (value) => String(value ?? '').length <= max,
        message
    }),
        minValue: (min: number, message: string): ValidationRule => ({
        condition: (value) => Number(value) >= min,
        message
    }),
    
    maxValue: (max: number, message: string): ValidationRule => ({
        condition: (value) => Number(value) <= max,
        message
    }),
    
    positiveNumber: (message: string): ValidationRule => ({
        condition: (value) => Number(value) >= 0,
        message
    }),
    
    integer: (message: string): ValidationRule => ({
        condition: (value) => Number.isInteger(Number(value)),
        message
    })
};

export const validateForm = (
    formData: Record<string, string | number>,
    config: FieldValidationConfig
): Record<string, string | null> => {
    const errors: Record<string, string | null> = {};

    for (const fieldName in config) {
        const rules = config[fieldName];
        if (!rules) continue;

        const value = formData[fieldName] ?? '';

        for (const rule of rules) {
            if (!rule.condition(value)) {
                errors[fieldName] = rule.message;
                break;
            }
        }
    }

    return errors;
};