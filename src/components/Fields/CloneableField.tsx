import { SchemaField } from '@/types/schema'
import { Plus, Trash2 } from 'lucide-react'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Property from '../Property'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

interface CloneableFieldProps {
  field: SchemaField
  value: unknown[]
  onChange: (value: unknown[]) => void
  schemaId: string
}

const CloneableField: React.FC<CloneableFieldProps> = ({
  field,
  value = [],
  onChange,
  schemaId,
}) => {
  const [items, setItems] = useState<unknown[]>(() => {
    // Ensure value is always an array
    const safeValue = Array.isArray(value) ? value : value ? [value] : []
    return safeValue
  })

  // Sync items with value prop changes
  useEffect(() => {
    const safeValue = Array.isArray(value) ? value : value ? [value] : []
    setItems(safeValue)
  }, [value])

  // Memoize handlers to prevent unnecessary re-renders
  const handleItemChange = useCallback(
    (index: number, newValue: unknown) => {
      const newItems = [...items]
      newItems[index] = newValue
      setItems(newItems)
      onChange(newItems)
    },
    [items, onChange],
  )

  const handleAddItem = useCallback(() => {
    const newItems = [...items, field.std || '']
    setItems(newItems)
    onChange(newItems)
  }, [items, field.std, onChange])

  const handleRemoveItem = useCallback(
    (index: number) => {
      const newItems = items.filter((_, i) => i !== index)
      setItems(newItems)
      onChange(newItems)
    },
    [items, onChange],
  )

  // Memoize item label to avoid recalculation
  const itemLabel = useMemo(() => field.label || 'Item', [field.label])

  // Memoize field configuration for Property component
  const propertyField = useMemo(
    () => ({
      ...field,
      cloneable: false, // Prevent infinite recursion
      label: '', // Remove label since it's in the card header
    }),
    [field],
  )

  return (
    <div className='space-y-3'>
      {items.length === 0 ? (
        <div className='text-center py-6 border-2 border-dashed border-border rounded-lg'>
          <p className='text-muted-foreground text-sm mb-3'>No items added yet</p>
          <Button type='button' variant='outline' onClick={handleAddItem}>
            <Plus className='h-4 w-4 mr-2' />
            Add {itemLabel}
          </Button>
        </div>
      ) : (
        <>
          {items.map((item, index) => (
            <Card key={`${schemaId}-${field.id}-${index}`} className='relative'>
              <CardHeader className='pb-3'>
                <div className='flex items-center justify-between'>
                  <CardTitle className='text-sm font-medium'>
                    {itemLabel} #{index + 1}
                  </CardTitle>
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => handleRemoveItem(index)}
                    className='text-destructive hover:text-destructive'
                    title='Remove item'
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Property
                  field={propertyField}
                  value={item}
                  onChange={(newValue) => handleItemChange(index, newValue)}
                  schemaId={schemaId}
                />
              </CardContent>
            </Card>
          ))}

          <Button type='button' variant='outline' onClick={handleAddItem} className='w-full'>
            <Plus className='h-4 w-4 mr-2' />
            Add {itemLabel}
          </Button>
        </>
      )}
    </div>
  )
}

// Memoize CloneableField component to prevent unnecessary re-renders
export default React.memo(CloneableField, (prevProps, nextProps) => {
  return (
    prevProps.field === nextProps.field &&
    prevProps.value === nextProps.value &&
    prevProps.schemaId === nextProps.schemaId &&
    prevProps.onChange === nextProps.onChange
  )
})
