import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { schemaFieldDefinitions } from '../api/schemas'
import { Schema, SchemaType } from '../types/schema'
import { uniqueID } from '../utils/functions'

// Helper function to get nested object properties
const getNestedValue = (obj: any, path: string, defaultValue?: any): any => {
  const keys = path.split('.')
  let result = obj
  for (const key of keys) {
    if (result == null || typeof result !== 'object') {
      return defaultValue
    }
    result = result[key]
  }
  return result !== undefined ? result : defaultValue
}

// Default schemas and schema types (from localStorage.ts)
const defaultSchemas: Record<string, Schema> = {
  'default-article': {
    type: 'Article',
    fields: {
      _label: 'Article',
      headline: 'Sample Article Title',
      description: 'This is a sample article description',
    },
  },
}

const defaultSchemaTypes: SchemaType[] = [
  {
    label: 'E-commerce',
    options: {
      Book: 'Book',
      FAQPage: 'FAQ',
      Product: 'Product',
      Review: 'Review snippet',
      SoftwareApplication: 'Software app',
    },
  },
  {
    label: 'Organizations',
    options: {
      HowTo: 'How-to',
      LocalBusiness: 'Local business',
    },
  },
  {
    label: 'Jobs',
    options: {
      EmployerAggregateRating: 'Employer aggregate rating',
      Occupation: 'Estimated salary',
      JobPosting: 'Job posting',
    },
  },
  {
    label: 'Entertainment',
    options: {
      Event: 'Event',
      ImageObject: 'Image license',
      ItemList: 'Movie',
    },
  },
  {
    label: 'News',
    options: {
      Article: 'Article',
      ClaimReview: 'Fact check',
      VideoObject: 'Video',
    },
  },
  {
    label: 'Food and Drink',
    options: {
      Recipe: 'Recipe',
    },
  },
  {
    label: 'Education and Science',
    options: {
      Course: 'Course',
      Dataset: 'Dataset',
      MathSolver: 'Math solver',
      Quiz: 'Practice problems (Quiz)',
      QAPage: 'Q&A',
    },
  },
  {
    label: 'Basic',
    options: {
      WebSite: 'WebSite',
      WebPage: 'WebPage',
      SearchAction: 'SearchAction',
      BreadcrumbList: 'BreadcrumbList',
      Thing: 'Thing',
      Person: 'Person',
      Organization: 'Organization',
      Service: 'Service',
      Offer: 'Offer',
      CustomJsonLd: 'Custom JSON-LD',
    },
  },
  {
    label: 'Additional',
    options: {
      AudioObject: 'Audio',
      ProductGroup: 'Product Group',
    },
  },
]

interface SchemaStore {
  // State
  schemas: Record<string, Schema>
  schemaTypes: SchemaType[]
  schemaLinks: Record<string, string>

  // Schema actions
  addSchema: (type: string, label: string) => string
  updateSchema: (id: string, path: string, value: any) => void
  deleteSchema: (id: string) => void
  importSchemas: (newSchemas: Record<string, Schema>) => void

  // Schema types actions
  getSchemaTypes: () => SchemaType[]
  refreshSchemaTypes: () => void

  // Schema field definitions
  getSchemaFieldDefinitions: (type: string) => any[]

  // Schema links actions
  addSchemaLink: (id: string, schema: Schema) => void
  updateSchemaLinkLabel: (id: string, label: string) => void
  removeSchemaLink: (id: string) => void

  // Utility actions
  clearAll: () => void
}

export const useSchemaStore = create<SchemaStore>()(
  persist(
    immer((set, get) => ({
      // Initial state
      schemas: defaultSchemas,
      schemaTypes: defaultSchemaTypes,
      schemaLinks: {
        'default-article': 'Article',
      },

      // Schema actions
      addSchema: (type: string, label: string) => {
        const id = uniqueID()
        const newSchema: Schema = { type, fields: { _label: label } }

        set((state) => {
          state.schemas[id] = newSchema
          state.schemaLinks[id] = label
        })

        return id
      },

      updateSchema: (id: string, path: string, value: any) => {
        set((state) => {
          const keys = path.split('.')
          let current: any = state.schemas[id]

          for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i]
            if (!(key in current)) {
              current[key] = {}
            }
            current = current[key]
          }

          current[keys[keys.length - 1]] = value

          // Update schema link label if _label field is changed
          if (path === 'fields._label') {
            state.schemaLinks[id] = value
          }
        })
      },

      deleteSchema: (id: string) => {
        set((state) => {
          delete state.schemas[id]
          delete state.schemaLinks[id]
        })
      },

      importSchemas: (newSchemas: Record<string, Schema>) => {
        set((state) => {
          // Merge new schemas with existing ones
          Object.assign(state.schemas, newSchemas)

          // Update schema links for imported schemas
          Object.entries(newSchemas).forEach(([id, schema]) => {
            state.schemaLinks[id] = getNestedValue(schema, 'fields._label', schema.type)
          })
        })
      },

      // Schema types actions
      getSchemaTypes: () => get().schemaTypes,

      refreshSchemaTypes: () => {
        set((state) => {
          state.schemaTypes = defaultSchemaTypes
        })
      },

      // Schema field definitions
      getSchemaFieldDefinitions: (type: string) => {
        return schemaFieldDefinitions[type as keyof typeof schemaFieldDefinitions] || []
      },

      // Schema links actions
      addSchemaLink: (id: string, schema: Schema) => {
        set((state) => {
          state.schemaLinks[id] = getNestedValue(schema, 'fields._label', schema.type)
        })
      },

      updateSchemaLinkLabel: (id: string, label: string) => {
        set((state) => {
          state.schemaLinks[id] = label
        })
      },

      removeSchemaLink: (id: string) => {
        set((state) => {
          delete state.schemaLinks[id]
        })
      },

      // Utility actions
      clearAll: () => {
        set((state) => {
          state.schemas = defaultSchemas
          state.schemaTypes = defaultSchemaTypes
          state.schemaLinks = { 'default-article': 'Article' }
        })
      },
    })),
    {
      name: 'schema-generator-store',
      partialize: (state) => ({
        schemas: state.schemas,
        schemaLinks: state.schemaLinks,
      }),
    },
  ),
)

// Convenience hooks for specific parts of the store
export const useSchemas = () => useSchemaStore((state) => state.schemas)
export const useSchemaTypes = () => useSchemaStore((state) => state.schemaTypes)
export const useSchemaLinks = () => useSchemaStore((state) => state.schemaLinks)

// Utility function to get schema field definitions (doesn't cause re-renders)
export const getSchemaFieldDefinitions = (type: string) => {
  return schemaFieldDefinitions[type as keyof typeof schemaFieldDefinitions] || []
}

// Action hooks - using individual selectors to prevent re-renders
export const useSchemaActions = () => {
  const addSchema = useSchemaStore((state) => state.addSchema)
  const updateSchema = useSchemaStore((state) => state.updateSchema)
  const deleteSchema = useSchemaStore((state) => state.deleteSchema)
  const importSchemas = useSchemaStore((state) => state.importSchemas)

  return { addSchema, updateSchema, deleteSchema, importSchemas }
}

export const useSchemaLinkActions = () => {
  const addSchemaLink = useSchemaStore((state) => state.addSchemaLink)
  const updateSchemaLinkLabel = useSchemaStore((state) => state.updateSchemaLinkLabel)
  const removeSchemaLink = useSchemaStore((state) => state.removeSchemaLink)

  return { addSchemaLink, updateSchemaLinkLabel, removeSchemaLink }
}
