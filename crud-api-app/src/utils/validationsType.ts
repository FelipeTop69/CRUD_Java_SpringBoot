export type ValidationRule = {
    condition: (value: string) => boolean;
    message: string;
};

export type FieldValidationConfig = {
    [fieldName: string]: ValidationRule[];
};