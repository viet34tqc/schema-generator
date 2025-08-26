import React, { useEffect, useState } from 'react'
import { Schema, SchemaField } from '../types/schema'
import { __, get } from '../utils/functions'
import { localStorageApi } from '../utils/localStorage'
import Panel from './Panel'
import Property from './Property'

interface SchemaTypeProps {
  schema: Schema
  updateSchema: (path: string, value: any) => void
  schemaId: string
}

const SchemaType: React.FC<SchemaTypeProps> = ({ schema, updateSchema, schemaId }) => {
  const [fields, setFields] = useState<SchemaField[]>([])

  useEffect(() => {
    if (schema.type) {
      try {
        const fieldData = localStorageApi.getSchemaFieldDefinitions(schema.type)
        setFields(fieldData || [])
      } catch (error) {
        console.error('Error loading schema fields:', error)
        setFields([])
      }
    }
  }, [schema.type])

  const handleFieldChange = (fieldId: string, value: any) => {
    updateSchema(`fields.${fieldId}`, value)
  }

  const renderField = (field: SchemaField) => {
    const fieldValue = get(schema, `fields.${field.id}`, field.std || '')

    return (
      <Property
        key={field.id}
        field={field}
        value={fieldValue}
        onChange={(value) => handleFieldChange(field.id, value)}
        schemaId={schemaId}
      />
    )
  }

  const renderFieldGroup = (fields: SchemaField[], title?: string) => {
    if (!fields.length) return null

    const content = <div className='space-y-4'>{fields.map(renderField)}</div>

    if (title) {
      return (
        <Panel title={title} key={title}>
          {content}
        </Panel>
      )
    }

    return content
  }

  if (!fields.length) {
    return (
      <div className='text-center py-8'>
        <p className='text-muted-foreground'>{__('No fields available for this schema type.')}</p>
      </div>
    )
  }

  // Group fields by their group property or render them flat
  const groupedFields = fields.reduce(
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

export default SchemaType
