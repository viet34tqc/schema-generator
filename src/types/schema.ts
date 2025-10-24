export interface SchemaField {
  id: string
  label?: string
  type?: string // Optional - defaults to 'Text' if not specified
  required?: boolean
  std?: string | string[]
  tooltip?: string
  placeholder?: string
  rows?: number
  options?:
    | Record<string, string>
    | Array<{ value: string; label: string }>
    | Array<{ label: string; options: Record<string, string> | Record<string, string | undefined> }>
  fields?: SchemaField[]
  show?: boolean
  cloneable?: boolean
  cloneItemHeading?: string
  url?: string
  dependency?: string
  dependant?: boolean
  description?: string
  group?: string
  hideGroupTitle?: boolean
}

export interface Schema extends Record<string, unknown> {
  type: string
  fields: Record<string, unknown>
}

export interface SchemaType {
  label: string
  options: Record<string, string>
}

export interface Variable {
  label: string
  options: Record<string, string>
}

export interface SchemaLinkContextType {
  schemaLinks: Record<string, string>
  addSchemaLink: (id: string, schema: Schema) => void
  removeSchemaLink: (id: string) => void
  updateSchemaLinkLabel: (id: string, label: string) => void
}

export interface MockApiResponse<T = any> {
  data?: T
  success?: boolean
  message?: string
}
