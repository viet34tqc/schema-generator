import { ChevronDown, ChevronRight, ExternalLink, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { getSchemaFieldDefinitions, useSchemaStore } from '../stores/schemaStore'
import { Schema as SchemaType } from '../types/schema'
import { __, get } from '../utils/functions'
import { formatJsonLdForDisplay, renderSchemaAsJsonLd } from '../utils/schemaRenderer'
import SchemaTypeComponent from './SchemaType'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader } from './ui/card'
import ConfirmationDialog from './ui/confirmation-dialog'
import { useToast } from './ui/toast'

interface SchemaProps {
  schema: SchemaType
  deleteProp: (id: string) => void
  id: string
}

const generateLiveJsonLd = (schema: any, schemaId: string): string => {
  try {
    const jsonLd = renderSchemaAsJsonLd(schema, schemaId)
    return formatJsonLdForDisplay(jsonLd)
  } catch (error) {
    return '// Error generating JSON-LD\n// Please check your schema configuration'
  }
}

const Schema: React.FC<SchemaProps> = ({ schema, deleteProp, id }) => {
  const { updateSchema } = useSchemaStore()
  const { addToast } = useToast()
  const [documentationUrl, setDocumentationUrl] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true)

  // Load schema fields to find documentation URL
  useEffect(() => {
    const loadDocumentationUrl = () => {
      try {
        const fieldData = getSchemaFieldDefinitions(schema.type)
        if (fieldData && Array.isArray(fieldData)) {
          const docsField = fieldData.find(
            (field: any) =>
              (field.type === 'SchemaDocs' || field.type === 'GoogleDocs') && field.url,
          )
          if (docsField && (docsField as any).url) {
            setDocumentationUrl((docsField as any).url)
          }
        }
      } catch (error) {
        console.error('Error loading documentation URL:', error)
      }
    }

    if (schema.type) {
      loadDocumentationUrl()
    }
  }, [schema.type])

  const handleDelete = () => {
    setShowDeleteConfirm(true)
  }

  const confirmDelete = () => {
    deleteProp(id)
  }

  const handleUpdateSchema = (path: string, value: any) => {
    updateSchema(id, path, value)
  }

  const schemaLabel = get(schema, 'fields._label', schema.type)

  return (
    <>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div
              className='flex items-center space-x-3 cursor-pointer flex-1'
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Button variant='ghost' size='icon' className='h-6 w-6'>
                {isExpanded ? (
                  <ChevronDown className='h-4 w-4' />
                ) : (
                  <ChevronRight className='h-4 w-4' />
                )}
              </Button>
              <h3 className='text-lg font-medium'>{schemaLabel}</h3>
              <Badge variant='secondary'>{schema.type}</Badge>
            </div>
            <div className='flex items-center space-x-2'>
              {documentationUrl && (
                <Button variant='ghost' size='icon' asChild title={__('View documentation')}>
                  <a
                    href={documentationUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-muted-foreground hover:text-foreground'
                  >
                    <ExternalLink className='h-4 w-4' />
                  </a>
                </Button>
              )}
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
          </div>
        </CardHeader>

        {isExpanded && (
          <CardContent>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
              {/* Schema Fields Column */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>{__('Schema Properties')}</h3>
                <div className='max-h-[70vh] overflow-y-auto pr-2'>
                  <SchemaTypeComponent
                    schema={schema}
                    updateSchema={handleUpdateSchema}
                    schemaId={id}
                  />
                </div>
              </div>

              {/* Live JSON-LD Preview Column */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>{__('Live JSON-LD Preview')}</h3>
                <div className='bg-muted border rounded-lg p-4'>
                  <pre className='text-sm overflow-auto max-h-[70vh] text-foreground'>
                    <code>{generateLiveJsonLd(schema, id)}</code>
                  </pre>
                  <div className='mt-3 flex justify-end'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => {
                        const jsonLd = generateLiveJsonLd(schema, id)
                        navigator.clipboard.writeText(jsonLd)
                        addToast({
                          title: __('JSON-LD copied to clipboard!'),
                          variant: 'success',
                        })
                      }}
                    >
                      {__('Copy JSON-LD')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      <ConfirmationDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        title={__('Delete Schema')}
        description={__(
          'Are you sure you want to delete this schema? This action cannot be undone.',
        )}
        confirmText={__('Delete')}
        cancelText={__('Cancel')}
        onConfirm={confirmDelete}
        variant='destructive'
      />
    </>
  )
}

export default Schema
