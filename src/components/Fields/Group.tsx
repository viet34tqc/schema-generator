import { SchemaField } from '@/types/schema'
import React, { useCallback } from 'react'
import Property from '../Property'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

interface GroupFieldProps {
  field: SchemaField
  value: Record<string, unknown>
  onChange: (value: Record<string, unknown>) => void
  id?: string
  schemaId?: string
}

const Group: React.FC<GroupFieldProps> = ({ field, value, onChange, schemaId }) => {
  // Memoize field change handler to prevent unnecessary re-renders
  const handleFieldChange = useCallback(
    (fieldId: string, fieldValue: unknown) => {
      const newValue = { ...value }
      newValue[fieldId] = fieldValue
      onChange(newValue)
    },
    [value, onChange],
  )

  if (!field.fields || field.fields.length === 0) {
    return <div className='text-sm text-muted-foreground'>No fields defined for this group</div>
  }

  // If hideGroupTitle is true, render fields without the card wrapper
  if ((field as any).hideGroupTitle) {
    return (
      <div className='space-y-4'>
        {field.fields.map((subField) => (
          <Property
            key={`${schemaId}-${field.id}-${subField.id}`}
            field={subField}
            value={value?.[subField.id] || subField.std || ''}
            onChange={(fieldValue) => handleFieldChange(subField.id, fieldValue)}
            schemaId={schemaId || ''}
          />
        ))}
      </div>
    )
  }

  return (
    <Card>
      <CardHeader className='pb-3'>
        <CardTitle className='text-base'>{field.label || 'Group'}</CardTitle>
        {field.description && <p className='text-sm text-muted-foreground'>{field.description}</p>}
      </CardHeader>
      <CardContent className='space-y-4'>
        {field.fields.map((subField) => (
          <Property
            key={`${schemaId}-${field.id}-${subField.id}`}
            field={subField}
            value={value?.[subField.id] || subField.std || ''}
            onChange={(fieldValue) => handleFieldChange(subField.id, fieldValue)}
            schemaId={schemaId || ''}
          />
        ))}
      </CardContent>
    </Card>
  )
}

// Memoize Group component to prevent unnecessary re-renders
export default React.memo(Group, (prevProps, nextProps) => {
  return (
    prevProps.field === nextProps.field &&
    prevProps.value === nextProps.value &&
    prevProps.schemaId === nextProps.schemaId &&
    prevProps.onChange === nextProps.onChange
  )
})
