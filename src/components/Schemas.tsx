import { ChevronDown, Plus } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { useImmer } from 'use-immer'
import { SchemaLinkContext } from '../contexts/SchemaLinkContext'
import { Schema, SchemaType as SchemaTypeData } from '../types/schema'
import { __, uniqueID } from '../utils/functions'
import { localStorageApi } from '../utils/localStorage'
import Inserter from './Inserter'
import SchemaComponent from './Schema'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu'

const Schemas = () => {
  const [items, setItems] = useState<SchemaTypeData[]>([])
  const [schemas, setSchemas] = useImmer<Record<string, Schema>>({})

  const context = useContext(SchemaLinkContext)
  if (!context) {
    throw new Error('Schemas must be used within a SchemaLinkProvider')
  }
  const { addSchemaLink, removeSchemaLink } = context

  useEffect(() => {
    // Force refresh schema types to ensure new structure is loaded
    localStorageApi.refreshSchemaTypes()

    // Load schema types
    const schemaTypes = localStorageApi.getSchemaTypes()
    setItems(schemaTypes)
  }, [])

  useEffect(() => {
    // Load schemas
    const data = localStorageApi.getSchemas()
    if (data) {
      setSchemas(data)
    }
  }, [setSchemas])

  const addSchema = (e: React.MouseEvent<HTMLButtonElement>, onToggle: () => void) =>
    setSchemas((draft) => {
      onToggle()
      const target = e.target as HTMLButtonElement
      const type = target.dataset.value
      const label = target.textContent?.trim() || type
      const id = uniqueID()
      const newSchema: Schema = { type: type!, fields: { _label: label } }

      draft[id] = newSchema
      addSchemaLink(id, newSchema)
      // Save to localStorage
      localStorageApi.saveSchemas(draft)
    })

  const deleteSchema = (id: string) =>
    setSchemas((draft) => {
      delete draft[id]
      removeSchemaLink(id)
      // Save to localStorage
      localStorageApi.saveSchemas(draft)
    })

  const hasSchemas = Object.keys(schemas).length > 0

  return (
    <div className='space-y-6'>
      {hasSchemas ? (
        <div className='space-y-4'>
          {Object.entries(schemas).map(([id, schema]) => (
            <SchemaComponent
              key={id}
              schema={schema}
              deleteProp={deleteSchema}
              id={id}
              setSchemas={setSchemas}
            />
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
            <Inserter items={items} group={true} hasSearch={true} onSelect={addSchema} />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default Schemas
