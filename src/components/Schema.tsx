import { Trash2 } from 'lucide-react'
import React from 'react'
import { useSchemaLinks } from '../contexts/SchemaLinkContext'
import { Schema as SchemaType } from '../types/schema'
import { __, get } from '../utils/functions'
import { formatJsonLdForDisplay, renderSchemaAsJsonLd } from '../utils/schemaRenderer'
import SchemaTypeComponent from './SchemaType'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader } from './ui/card'

interface SchemaProps {
  schema: SchemaType
  deleteProp: (id: string) => void
  id: string
  setSchemas: (updater: (draft: Record<string, SchemaType>) => void) => void
}

const generateLiveJsonLd = (schema: any, schemaId: string): string => {
  try {
    const jsonLd = renderSchemaAsJsonLd(schema, schemaId)
    return formatJsonLdForDisplay(jsonLd)
  } catch (error) {
    return '// Error generating JSON-LD\n// Please check your schema configuration'
  }
}

const Schema: React.FC<SchemaProps> = ({ schema, deleteProp, id, setSchemas }) => {
  const { updateSchemaLinkLabel } = useSchemaLinks()

  const handleDelete = () => {
    if (window.confirm(__('Are you sure you want to delete this schema?'))) {
      deleteProp(id)
    }
  }

  const updateSchema = (path: string, value: any) => {
    setSchemas((draft) => {
      const keys = path.split('.')
      let current: any = draft[id]

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i]
        if (!(key in current)) {
          current[key] = {}
        }
        current = current[key]
      }

      current[keys[keys.length - 1]] = value

      // Update schema link label if _label field is changed
      if (path === 'fields._label') {
        updateSchemaLinkLabel(id, value)
      }
    })
  }

  const schemaLabel = get(schema, 'fields._label', schema.type)

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-3'>
            <h3 className='text-lg font-medium'>{schemaLabel}</h3>
            <Badge variant='secondary'>{schema.type}</Badge>
          </div>
          <Button
            variant='ghost'
            size='icon'
            onClick={handleDelete}
            className='text-destructive hover:text-destructive'
            title={__('Delete schema')}
          >
            <Trash2 className='h-4 w-4' />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
          {/* Schema Fields Column */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>{__('Schema Properties')}</h3>
            <SchemaTypeComponent schema={schema} updateSchema={updateSchema} schemaId={id} />
          </div>

          {/* Live JSON-LD Preview Column */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>{__('Live JSON-LD Preview')}</h3>
            <div className='bg-gray-50 border rounded-lg p-4'>
              <pre className='text-sm overflow-auto max-h-96'>
                <code>{generateLiveJsonLd(schema, id)}</code>
              </pre>
              <div className='mt-3 flex justify-end'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => {
                    const jsonLd = generateLiveJsonLd(schema, id)
                    navigator.clipboard.writeText(jsonLd)
                    alert(__('JSON-LD copied to clipboard!'))
                  }}
                >
                  {__('Copy JSON-LD')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Schema
