import { useSchemas, useSchemaStore, useSchemaTypes } from '@/stores'
import { __ } from '@/utils/functions'
import { ChevronDown, Plus } from 'lucide-react'
import React, { useCallback, useMemo } from 'react'
import Inserter from './Inserter'
import SchemaComponent from './Schema'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu'

const Schemas = () => {
  // Zustand store hooks - using granular selectors to prevent unnecessary re-renders
  const schemas = useSchemas()
  const schemaTypes = useSchemaTypes()
  const addSchema = useSchemaStore((state) => state.addSchema)
  const deleteSchema = useSchemaStore((state) => state.deleteSchema)

  // Memoize handlers to prevent unnecessary re-renders
  const handleAddSchema = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, onToggle: () => void) => {
      onToggle()
      const target = e.target as HTMLButtonElement
      const type = target.dataset.value
      const label = target.textContent?.trim() || type || 'Schema'

      if (type) {
        // addSchema already updates schema links internally
        addSchema(type, label)
      }
    },
    [addSchema],
  )

  const handleDeleteSchema = useCallback(
    (id: string) => {
      // deleteSchema already removes schema links internally
      deleteSchema(id)
    },
    [deleteSchema],
  )

  // Memoize schema entries to avoid recalculating on every render
  const schemaEntries = useMemo(() => Object.entries(schemas), [schemas])

  const hasSchemas = schemaEntries.length > 0

  return (
    <div className='space-y-6'>
      {hasSchemas ? (
        <div className='space-y-4'>
          {schemaEntries.map(([id, schema]) => (
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
          <DropdownMenuContent className='w-80 p-0' onCloseAutoFocus={(e) => e.preventDefault()}>
            <Inserter
              items={schemaTypes}
              group={true}
              hasSearch={true}
              onSelect={handleAddSchema}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

// Memoize Schemas component to prevent unnecessary re-renders
export default React.memo(Schemas)
