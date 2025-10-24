import { getSchemaFieldDefinitions } from '@/stores'
import { Schema, SchemaField } from '@/types/schema'
import { __, get } from '@/utils/functions'
import React, { useCallback, useMemo } from 'react'
import Panel from './Panel'
import Property from './Property'

interface SchemaTypeProps {
  schema: Schema
  updateSchema: (path: string, value: unknown) => void
  schemaId: string
}

const SchemaType: React.FC<SchemaTypeProps> = ({ schema, updateSchema, schemaId }) => {
  // Memoize field definitions to avoid recalculating on every render
  const fields = useMemo(() => {
    if (!schema.type) return []
    try {
      const fieldData = getSchemaFieldDefinitions(schema.type)
      return (fieldData || []) as SchemaField[]
    } catch (error) {
      console.error('Error loading schema fields:', error)
      return []
    }
  }, [schema.type])

  // Memoize field change handler to prevent unnecessary re-renders
  const handleFieldChange = useCallback(
    (fieldId: string, value: unknown) => {
      updateSchema(`fields.${fieldId}`, value)
    },
    [updateSchema],
  )

  // Memoize field rendering function
  const renderField = useCallback(
    (field: SchemaField) => {
      const fieldValue = get(schema, `fields.${field.id}`, field.std || '')

      return (
        <Property
          key={`${schemaId}-${field.id}`}
          field={field}
          value={fieldValue}
          onChange={(value) => handleFieldChange(field.id, value)}
          schemaId={schemaId}
        />
      )
    },
    [schema, schemaId, handleFieldChange],
  )

  // Memoize field group rendering
  const renderFieldGroup = useCallback(
    (fields: SchemaField[], title?: string) => {
      if (!fields.length) return null

      const content = <div className='space-y-4'>{fields.map(renderField)}</div>

      if (title) {
        return (
          <Panel title={title} key={`${schemaId}-${title}`}>
            {content}
          </Panel>
        )
      }

      return content
    },
    [renderField, schemaId],
  )

  // Memoize grouped fields computation to avoid recalculating on every render
  const groupedFields = useMemo(() => {
    return fields.reduce(
      (groups, field) => {
        const group = field.group || 'main'
        if (!groups[group]) {
          groups[group] = []
        }
        groups[group].push(field)
        return groups
      },
      {} as Record<string, SchemaField[]>,
    )
  }, [fields])

  if (!fields.length) {
    return (
      <div className='text-center py-8'>
        <p className='text-muted-foreground'>{__('No fields available for this schema type.')}</p>
      </div>
    )
  }

  // If there's only a main group, render fields without grouping
  if (Object.keys(groupedFields).length === 1 && groupedFields.main) {
    return renderFieldGroup(groupedFields.main)
  }

  // Render grouped fields
  return (
    <div className='space-y-6'>
      {Object.entries(groupedFields).map(([groupName, groupFields]) => {
        const title = groupName === 'main' ? undefined : groupName
        return renderFieldGroup(groupFields, title)
      })}
    </div>
  )
}

// Memoize SchemaType component to prevent unnecessary re-renders
export default React.memo(SchemaType, (prevProps, nextProps) => {
  return (
    prevProps.schema === nextProps.schema &&
    prevProps.schemaId === nextProps.schemaId &&
    prevProps.updateSchema === nextProps.updateSchema
  )
})
