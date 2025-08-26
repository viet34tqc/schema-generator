import { schemaFieldDefinitions } from '../api/schemas'
import { Schema, SchemaType } from '../types/schema'

const STORAGE_KEYS = {
  SCHEMAS: 'schema-generator-schemas',
  SCHEMA_TYPES: 'schema-generator-schema-types',
}

// Default schema types data - grouped structure for the Inserter component
const defaultSchemaTypes: SchemaType[] = [
  {
    label: 'Content',
    options: {
      Article: 'Article',
      Book: 'Book',
      Recipe: 'Recipe',
      HowTo: 'How-To',
      FAQPage: 'FAQ Page',
      QAPage: 'Q&A Page',
      Review: 'Review',
    },
  },
  {
    label: 'Business',
    options: {
      Organization: 'Organization',
      LocalBusiness: 'Local Business',
      Product: 'Product',
      ProductGroup: 'Product Group',
      Service: 'Service',
      Offer: 'Offer',
      JobPosting: 'Job Posting',
    },
  },
  {
    label: 'Events & Education',
    options: {
      Event: 'Event',
      Course: 'Course',
    },
  },
  {
    label: 'Media',
    options: {
      VideoObject: 'Video',
      ImageObject: 'Image',
      AudioObject: 'Audio',
      SoftwareApplication: 'Software Application',
    },
  },
  {
    label: 'Website',
    options: {
      WebSite: 'Website',
      WebPage: 'Web Page',
      SearchAction: 'Search Action',
      BreadcrumbList: 'Breadcrumb List',
    },
  },
  {
    label: 'Other',
    options: {
      Thing: 'Thing',
      Person: 'Person',
      CustomJsonLd: 'Custom JSON-LD',
    },
  },
]

// Default schemas
const defaultSchemas: Record<string, Schema> = {
  website_schema: {
    type: 'WebSite',
    fields: {
      _label: 'Website Schema',
      name: '{{ site.name }}',
      url: '{{ site.url }}',
      description: '{{ site.description }}',
    },
  },
  organization_schema: {
    type: 'Organization',
    fields: {
      _label: 'Organization Schema',
      name: '{{ site.name }}',
      url: '{{ site.url }}',
      logo: '{{ site.logo }}',
    },
  },
}

export const localStorageApi = {
  // Get all schemas
  getSchemas(): Record<string, Schema> {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SCHEMAS)
      if (stored) {
        return JSON.parse(stored)
      }
      // Return default schemas if none exist
      this.saveSchemas(defaultSchemas)
      return defaultSchemas
    } catch (error) {
      console.error('Error loading schemas from localStorage:', error)
      return defaultSchemas
    }
  },

  // Save schemas
  saveSchemas(schemas: Record<string, Schema>): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SCHEMAS, JSON.stringify(schemas))
    } catch (error) {
      console.error('Error saving schemas to localStorage:', error)
    }
  },

  // Get schema types
  getSchemaTypes(): SchemaType[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SCHEMA_TYPES)
      if (stored) {
        return JSON.parse(stored)
      }
      // Return default schema types if none exist
      this.saveSchemaTypes(defaultSchemaTypes)
      return defaultSchemaTypes
    } catch (error) {
      console.error('Error loading schema types from localStorage:', error)
      return defaultSchemaTypes
    }
  },

  // Save schema types
  saveSchemaTypes(schemaTypes: SchemaType[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SCHEMA_TYPES, JSON.stringify(schemaTypes))
    } catch (error) {
      console.error('Error saving schema types to localStorage:', error)
    }
  },

  // Get field definitions for a schema type
  getSchemaFieldDefinitions(type: string) {
    return schemaFieldDefinitions[type as keyof typeof schemaFieldDefinitions] || []
  },

  // Clear all data (for testing/reset)
  clearAll(): void {
    localStorage.removeItem(STORAGE_KEYS.SCHEMAS)
    localStorage.removeItem(STORAGE_KEYS.SCHEMA_TYPES)
  },

  // Force refresh schema types (useful for development)
  refreshSchemaTypes(): void {
    localStorage.removeItem(STORAGE_KEYS.SCHEMA_TYPES)
    this.saveSchemaTypes(defaultSchemaTypes)
  },
}

// Request function using localStorage (no artificial delay)
export const request = async (apiName: string, params: Record<string, any> = {}): Promise<any> => {
  switch (apiName) {
    case 'schemas':
      return localStorageApi.getSchemas()

    case 'data':
      if (params.type === 'schemas') {
        return localStorageApi.getSchemaTypes()
      }
      break

    case 'types':
      if (params.type) {
        return localStorageApi.getSchemaFieldDefinitions(params.type)
      }
      break

    default:
      console.warn(`Unknown API endpoint: ${apiName}`)
      return null
  }
}
