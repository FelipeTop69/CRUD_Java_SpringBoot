export type ValidationValue = string | number;

export type ValidationRule = {
    condition: (value: ValidationValue) => boolean;
    message: string;
};

export type FieldValidationConfig = Record<string, ValidationRule[]>;
