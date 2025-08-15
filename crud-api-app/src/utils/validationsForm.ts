import { FieldValidationConfig, ValidationRule } from "./validationsType";

export const commonValidations = {
    required: (message: string): ValidationRule => ({
        condition: (value) => !!value?.trim(),
        message
    }),
    exactLength: (length: number, message: string): ValidationRule => ({
        condition: (value) => value?.length === length,
        message
    }),
    numeric: (message: string): ValidationRule => ({
        condition: (value) => /^\d+$/.test(value || ''),
        message
    }),
    minLength: (min: number, message: string): ValidationRule => ({
        condition: (value) => (value?.length || 0) >= min,
        message
    }),
    maxLength: (max: number, message: string): ValidationRule => ({
        condition: (value) => (value?.length || 0) <= max,
        message
    })
};

export const validateForm = (
    formData: Record<string, string>,
    config: FieldValidationConfig
): Record<string, string | null> => {
    const errors: Record<string, string | null> = {};

    // Validar cada campo definido en la configuración
    for (const fieldName in config) {
        const rules = config[fieldName];
        if (!rules) continue;

        // Buscar la primera regla que falle
        for (const rule of rules) {
            if (!rule.condition(formData[fieldName] || '')) {
                errors[fieldName] = rule.message;
                break;
            }
        }
    }

    return errors;
};
