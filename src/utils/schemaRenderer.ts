import { Schema } from '../types/schema'

/**
 * Renders a schema object as JSON-LD structured data
 */
export function renderSchemaAsJsonLd(schema: Schema, schemaId: string): Record<string, unknown> {
  const { type, fields } = schema

  // Start with the basic schema structure
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': type,
  }

  // Process all fields and add them to the JSON-LD output
  Object.entries(fields).forEach(([key, value]) => {
    // Skip internal fields like _label
    if (key.startsWith('_')) {
      return
    }

    // Handle different field types
    if (value !== null && value !== undefined && value !== '') {
      // Handle arrays (like images)
      if (Array.isArray(value)) {
        if (value.length > 0) {
          jsonLd[key] = value.filter((v) => v !== null && v !== undefined && v !== '')
        }
      } else if (typeof value === 'object') {
        // Handle nested objects/groups
        const processedObject = processNestedObject(value)
        if (
          typeof processedObject === 'object' &&
          processedObject !== null &&
          Object.keys(processedObject as Record<string, unknown>).length > 0
        ) {
          jsonLd[key] = processedObject
        }
      } else {
        // Handle simple values
        jsonLd[key] = value
      }
    }
  })

  // Add default fields if not present
  if (!jsonLd['@id']) {
    jsonLd['@id'] = `#${schemaId}`
  }

  return jsonLd
}

/**
 * Formats JSON-LD object for display with proper indentation
 */
export function formatJsonLdForDisplay(
  jsonLd: Record<string, unknown> | Record<string, unknown>[],
): string {
  return JSON.stringify(jsonLd, null, 2)
}

/**
 * Process nested objects recursively
 */
function processNestedObject(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj
      .map((item) => (typeof item === 'object' ? processNestedObject(item) : item))
      .filter((item) => item !== null && item !== undefined && item !== '')
  }

  if (typeof obj === 'object' && obj !== null) {
    const processed: Record<string, unknown> = {}
    Object.entries(obj).forEach(([key, value]) => {
      if (key.startsWith('_')) return // Skip internal fields

      if (value !== null && value !== undefined && value !== '') {
        if (typeof value === 'object') {
          const nestedProcessed = processNestedObject(value)
          if (
            Array.isArray(nestedProcessed)
              ? nestedProcessed.length > 0
              : typeof nestedProcessed === 'object' &&
                nestedProcessed !== null &&
                Object.keys(nestedProcessed).length > 0
          ) {
            processed[key] = nestedProcessed
          }
        } else {
          processed[key] = value
        }
      }
    })
    return processed
  }

  return obj
}

/**
 * Renders all schemas as a complete JSON-LD array
 */
export function renderAllSchemasAsJsonLd(
  schemas: Record<string, Schema>,
): Record<string, unknown>[] {
  return Object.entries(schemas).map(([id, schema]) => renderSchemaAsJsonLd(schema, id))
}
