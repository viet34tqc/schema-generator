/**
 * Schema Validation Utilities
 *
 * Provides validation functions for schema fields based on field definitions.
 */

import { Schema, SchemaField } from '@/types/schema'

export interface ValidationError {
  field: string
  message: string
}

export interface ValidationResult {
  valid: boolean
  errors: ValidationError[]
}

/**
 * Validates schema fields against their field definitions
 * @param schema - The schema to validate
 * @param fieldDefinitions - The field definitions for the schema type
 * @returns ValidationResult with valid flag and array of errors
 */
export const validateSchemaFields = (
  schema: Schema,
  fieldDefinitions: SchemaField[],
): ValidationResult => {
  const errors: ValidationError[] = []

  // Recursively validate fields
  const validateFields = (
    fields: SchemaField[],
    schemaFields: Record<string, unknown>,
    path = '',
  ) => {
    fields.forEach((field) => {
      // Skip fields that are not required or are hidden
      if (!field.required || field.show === false) {
        return
      }

      const fieldPath = path ? `${path}.${field.id}` : field.id
      const value = schemaFields[field.id]

      // Check if required field is missing or empty
      if (value === undefined || value === null || value === '') {
        errors.push({
          field: fieldPath,
          message: `${field.label || field.id} is required`,
        })
      }

      // If field has nested fields (like cloneable fields), validate them recursively
      if (field.fields && Array.isArray(value)) {
        value.forEach((item: any, index: number) => {
          if (typeof item === 'object' && item !== null) {
            validateFields(field.fields!, item, `${fieldPath}[${index}]`)
          }
        })
      } else if (field.fields && typeof value === 'object' && value !== null) {
        validateFields(field.fields, value as Record<string, unknown>, fieldPath)
      }
    })
  }

  validateFields(fieldDefinitions, schema.fields as Record<string, unknown>)

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Gets a user-friendly summary of validation errors
 * @param errors - Array of validation errors
 * @returns A formatted string summarizing the errors
 */
export const getValidationSummary = (errors: ValidationError[]): string => {
  if (errors.length === 0) {
    return ''
  }

  if (errors.length === 1) {
    return errors[0].message
  }

  return `${errors.length} required fields are missing`
}
