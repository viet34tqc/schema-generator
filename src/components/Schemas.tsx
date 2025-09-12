import { ChevronDown, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSchemas, useSchemaStore, useSchemaTypes } from '../stores/schemaStore'
import { SchemaType as SchemaTypeData } from '../types/schema'
import { __ } from '../utils/functions'
import Inserter from './Inserter'
import SchemaComponent from './Schema'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu'

const Schemas = () => {
  const [items, setItems] = useState<SchemaTypeData[]>([])

  // Zustand store hooks
  const schemas = useSchemas()
  const schemaTypes = useSchemaTypes()
  const addSchema = useSchemaStore((state) => state.addSchema)
  const deleteSchema = useSchemaStore((state) => state.deleteSchema)

  useEffect(() => {
    // Load schema types from store
    setItems(schemaTypes)
  }, [schemaTypes])

  const handleAddSchema = (e: React.MouseEvent<HTMLButtonElement>, onToggle: () => void) => {
    onToggle()
    const target = e.target as HTMLButtonElement
    const type = target.dataset.value
    const label = target.textContent?.trim() || type || 'Schema'

    if (type) {
      // addSchema already updates schema links internally
      addSchema(type, label)
    }
  }

  const handleDeleteSchema = (id: string) => {
    // deleteSchema already removes schema links internally
    deleteSchema(id)
  }

  const hasSchemas = Object.keys(schemas).length > 0

  return (
    <div className='space-y-6'>
      {hasSchemas ? (
        <div className='space-y-4'>
          {Object.entries(schemas).map(([id, schema]) => (
            <SchemaComponent key={id} schema={schema} deleteProp={handleDeleteSchema} id={id} />
          ))}
        </div>
      ) : (
        <div className='text-center py-12 bg-muted rounded-lg border-2 border-dashed border-border'>
          <div className='text-muted-foreground mb-4'>
            <svg
              className='mx-auto h-12 w-12'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1}
                d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
              />
            </svg>
          </div>
          <p className='text-muted-foreground text-lg mb-4'>{__('There are no schemas here.')}</p>
          <p className='text-muted-foreground/70 text-sm'>
            {__('Click the "Add Schema" button to add a new schema.')}
          </p>
        </div>
      )}

      <div className='flex justify-end pt-6 border-t border-border'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>
              <Plus className='w-4 h-4 mr-2' />
              {__('Add Schema')}
              <ChevronDown className='w-4 h-4 ml-2' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-80'>
            <Inserter items={items} group={true} hasSearch={true} onSelect={handleAddSchema} />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default Schemas
