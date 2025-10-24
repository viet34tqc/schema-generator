import { schemaFieldDefinitions } from '@/api/schemas'
import { defaultSchemas, schemaTypes } from '@/constants'
import { Schema, SchemaField, SchemaType } from '@/types/schema'
import { get, uniqueID } from '@/utils/functions'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

// Type guard to check if a schema type has field definitions
const hasSchemaFieldDefinitions = (type: string): type is keyof typeof schemaFieldDefinitions => {
  return type in schemaFieldDefinitions
}

// Helper function to get nested object properties with type safety
const getNestedValue = <T = unknown>(
  obj: Record<string, unknown>,
  path: string,
  defaultValue?: T,
): T | undefined => {
  return get<T>(obj, path, defaultValue)
}

interface SchemaStore {
  // State
  schemas: Record<string, Schema>
  schemaTypes: SchemaType[]
  schemaLinks: Record<string, string>

  // Schema actions
  addSchema: (type: string, label: string) => string
  updateSchema: (id: string, path: string, value: unknown) => void
  deleteSchema: (id: string) => void
  importSchemas: (newSchemas: Record<string, Schema>) => void

  // Schema types actions
  getSchemaTypes: () => SchemaType[]
  refreshSchemaTypes: () => void

  // Schema field definitions
  getSchemaFieldDefinitions: (type: string) => SchemaField[]

  // Schema links actions
  addSchemaLink: (id: string, schema: Schema) => void
  updateSchemaLinkLabel: (id: string, label: string) => void
  removeSchemaLink: (id: string) => void

  // Utility actions
  clearAll: () => void
}

export const useSchemaStore = create<SchemaStore>()(
  // @ts-expect-error - Zustand v5 middleware type inference issue
  persist(
    immer((set, get) => ({
      // Initial state
      schemas: defaultSchemas,
      schemaTypes: schemaTypes,
      schemaLinks: {},

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

      updateSchema: (id: string, path: string, value: unknown) => {
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
          if (path === 'fields._label' && typeof value === 'string') {
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
            const label = getNestedValue<string>(
              schema.fields as Record<string, unknown>,
              '_label',
              schema.type,
            )
            state.schemaLinks[id] = label ?? schema.type
          })
        })
      },

      // Schema types actions
      getSchemaTypes: () => get().schemaTypes,

      refreshSchemaTypes: () => {
        set((state) => {
          state.schemaTypes = schemaTypes
        })
      },

      // Schema field definitions
      getSchemaFieldDefinitions: (type: string): SchemaField[] => {
        if (hasSchemaFieldDefinitions(type)) {
          return schemaFieldDefinitions[type] as SchemaField[]
        }
        return []
      },

      // Schema links actions
      addSchemaLink: (id: string, schema: Schema) => {
        set((state) => {
          const label = getNestedValue<string>(
            schema.fields as Record<string, unknown>,
            '_label',
            schema.type,
          )
          state.schemaLinks[id] = label ?? schema.type
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
          state.schemaTypes = schemaTypes
          state.schemaLinks = {}
        })
      },
    })),
    {
      name: 'schema-generator-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

// Convenience hooks for specific parts of the store
// These use granular selectors to prevent unnecessary re-renders
// Using reference equality (immer ensures immutable updates, so references only change when data changes)
export const useSchemas = () => useSchemaStore((state) => state.schemas)
export const useSchemaTypes = () => useSchemaStore((state) => state.schemaTypes)
export const useSchemaLinks = () => useSchemaStore((state) => state.schemaLinks)

// Utility function to get schema field definitions (doesn't cause re-renders)
export const getSchemaFieldDefinitions = (type: string): SchemaField[] => {
  if (hasSchemaFieldDefinitions(type)) {
    return schemaFieldDefinitions[type] as SchemaField[]
  }
  return []
}

// Action hooks - individual selectors to prevent re-renders
// These hooks only select actions, not state, so they don't cause re-renders
// Using a stable selector that returns the same reference
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
