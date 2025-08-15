export interface SchemaField {
  id: string;
  label?: string;
  type: string;
  required?: boolean;
  std?: string | string[];
  tooltip?: string;
  placeholder?: string;
  rows?: number;
  options?: Record<string, string> | Array<{ value: string; label: string }>;
  fields?: SchemaField[];
  show?: boolean;
  cloneable?: boolean;
  url?: string;
  dependency?: string;
  dependant?: boolean;
  description?: string;
  group?: string;
}

export interface Schema {
  type: string;
  fields: Record<string, any>;
  location?: Array<Array<{ name: string; value: string; label: string }>>;
}

export interface SchemaType {
  label: string;
  options: Record<string, string>;
}

export interface Variable {
  label: string;
  options: Record<string, string>;
}

export interface LocationRule {
  label: string;
  options: Array<{ value: string; label: string }>;
}

export interface SchemaLinkContextType {
  schemaLinks: Record<string, string>;
  addSchemaLink: (id: string, schema: Schema) => void;
  removeSchemaLink: (id: string) => void;
  updateSchemaLinkLabel: (id: string, label: string) => void;
}

export interface MockApiResponse<T = any> {
  data?: T;
  success?: boolean;
  message?: string;
}
