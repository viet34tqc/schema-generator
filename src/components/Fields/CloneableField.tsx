import { Plus, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { SchemaField } from '../../types/schema'
import { __ } from '../../utils/functions'
import Property from '../Property'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

interface CloneableFieldProps {
  field: SchemaField
  value: any[]
  onChange: (value: any[]) => void
  schemaId: string
}

const CloneableField: React.FC<CloneableFieldProps> = ({
  field,
  value = [],
  onChange,
  schemaId,
}) => {
  const [items, setItems] = useState<any[]>(() => {
    // Ensure value is always an array
    const safeValue = Array.isArray(value) ? value : value ? [value] : []
    return safeValue
  })

  // Sync items with value prop changes
  useEffect(() => {
    const safeValue = Array.isArray(value) ? value : value ? [value] : []
    setItems(safeValue)
  }, [value])

  const handleItemChange = (index: number, newValue: any) => {
    const newItems = [...items]
    newItems[index] = newValue
    setItems(newItems)
    onChange(newItems)
  }

  const handleAddItem = () => {
    const newItems = [...items, field.std || '']
    setItems(newItems)
    onChange(newItems)
  }

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index)
    setItems(newItems)
    onChange(newItems)
  }

  const itemLabel = field.label || 'Item'
  const canRemove = items.length > 0

  return (
    <div className='space-y-3'>
      {items.length === 0 ? (
        <div className='text-center py-6 border-2 border-dashed border-border rounded-lg'>
          <p className='text-muted-foreground text-sm mb-3'>{__('No items added yet')}</p>
          <Button type='button' variant='outline' onClick={handleAddItem}>
            <Plus className='h-4 w-4 mr-2' />
            {__('Add')} {itemLabel}
          </Button>
        </div>
      ) : (
        <>
          {items.map((item, index) => (
            <Card key={index} className='relative'>
              <CardHeader className='pb-3'>
                <div className='flex items-center justify-between'>
                  <CardTitle className='text-sm font-medium'>
                    {itemLabel} {items.length > 1 ? `#${index + 1}` : ''}
                  </CardTitle>
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => handleRemoveItem(index)}
                    className='text-destructive hover:text-destructive'
                    title={__('Remove item')}
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Property
                  field={{
                    ...field,
                    cloneable: false, // Prevent infinite recursion
                    label: '', // Remove label since it's in the card header
                  }}
                  value={item}
                  onChange={(newValue) => handleItemChange(index, newValue)}
                  schemaId={schemaId}
                />
              </CardContent>
            </Card>
          ))}

          <Button type='button' variant='outline' onClick={handleAddItem} className='w-full'>
            <Plus className='h-4 w-4 mr-2' />
            {__('Add')} {itemLabel}
          </Button>
        </>
      )}
    </div>
  )
}

export default CloneableField
