import { getSchemaFieldDefinitions, useSchemaStore } from '@/stores'
import { Schema as SchemaType } from '@/types/schema'
import { get } from '@/utils/functions'
import { formatJsonLdForDisplay, renderSchemaAsJsonLd } from '@/utils/schemaRenderer'
import { getValidationSummary, validateSchemaFields } from '@/utils/validation'
import { AlertCircle, ChevronDown, ChevronRight, ExternalLink, Trash2 } from 'lucide-react'
import React, { useMemo, useState } from 'react'
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

const generateLiveJsonLd = (schema: SchemaType, schemaId: string): string => {
  try {
    const jsonLd = renderSchemaAsJsonLd(schema, schemaId)
    return formatJsonLdForDisplay(jsonLd)
  } catch {
    return '// Error generating JSON-LD\n// Please check your schema configuration'
  }
}

const Schema: React.FC<SchemaProps> = ({ schema, deleteProp, id }) => {
  // Use granular selector to only get updateSchema action
  const updateSchema = useSchemaStore((state) => state.updateSchema)
  const { addToast } = useToast()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true)
  const [showValidationErrors, setShowValidationErrors] = useState(false)

  // Memoize field definitions to avoid recalculating on every render
  const fieldDefinitions = useMemo(() => {
    try {
      const fieldData = getSchemaFieldDefinitions(schema.type)
      return fieldData && Array.isArray(fieldData) ? fieldData : []
    } catch {
      return []
    }
  }, [schema.type])

  // Memoize documentation URL from field definitions
  const documentationUrl = useMemo(() => {
    try {
      const docsField = fieldDefinitions.find(
        (field) => (field.type === 'SchemaDocs' || field.type === 'GoogleDocs') && field.url,
      )
      return docsField?.url || null
    } catch {
      return null
    }
  }, [fieldDefinitions])

  const handleDelete = () => {
    setShowDeleteConfirm(true)
  }

  const confirmDelete = () => {
    deleteProp(id)
  }

  const handleUpdateSchema = (path: string, value: unknown) => {
    updateSchema(id, path, value)
  }

  const schemaLabel = get(schema, 'fields._label', schema.type)

  // Memoize JSON-LD generation to prevent unnecessary recalculations
  const jsonLdOutput = useMemo(() => generateLiveJsonLd(schema, id), [schema, id])

  // Validate schema fields
  const validationResult = useMemo(() => {
    if (fieldDefinitions.length === 0) {
      return { valid: true, errors: [] }
    }
    return validateSchemaFields(schema, fieldDefinitions)
  }, [schema, fieldDefinitions])

  const hasValidationErrors = !validationResult.valid
  const validationSummary = getValidationSummary(validationResult.errors)

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
              {hasValidationErrors && (
                <Badge
                  variant='destructive'
                  className='cursor-pointer'
                  onClick={(e) => {
                    e.stopPropagation()
                    // If schema is collapsed, expand it first
                    if (!isExpanded) {
                      setIsExpanded(true)
                    }
                    // Toggle validation errors display
                    setShowValidationErrors(!showValidationErrors)
                  }}
                  title={validationSummary}
                >
                  <AlertCircle className='h-3 w-3 mr-1' />
                  {validationResult.errors.length}{' '}
                  {validationResult.errors.length === 1 ? 'issue' : 'issues'}
                </Badge>
              )}
            </div>
            <div className='flex items-center space-x-2'>
              {documentationUrl && (
                <Button variant='ghost' size='icon' asChild title='View documentation'>
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
                title='Delete schema'
              >
                <Trash2 className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </CardHeader>

        {isExpanded && (
          <CardContent>
            {/* Validation Errors Display */}
            {hasValidationErrors && showValidationErrors && (
              <div className='mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg'>
                <div className='flex items-start space-x-2'>
                  <AlertCircle className='h-5 w-5 text-destructive mt-0.5 flex-shrink-0' />
                  <div className='flex-1'>
                    <h4 className='font-semibold text-destructive mb-2'>Validation Issues</h4>
                    <ul className='space-y-1 text-sm'>
                      {validationResult.errors.map((error, index) => (
                        <li key={index} className='text-muted-foreground'>
                          • {error.message}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => setShowValidationErrors(false)}
                    className='text-muted-foreground hover:text-foreground'
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            )}

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
              {/* Schema Fields Column */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>Schema Properties</h3>
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
                <h3 className='text-lg font-semibold'>Live JSON-LD Preview</h3>
                <div className='bg-muted border rounded-lg p-4'>
                  <pre className='text-sm overflow-auto max-h-[70vh] text-foreground'>
                    <code>{jsonLdOutput}</code>
                  </pre>
                  <div className='mt-3 flex justify-end'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => {
                        navigator.clipboard.writeText(jsonLdOutput)
                        addToast({
                          title: 'JSON-LD copied to clipboard!',
                          variant: 'success',
                        })
                      }}
                    >
                      Copy JSON-LD
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
        title='Delete Schema'
        description='Are you sure you want to delete this schema? This action cannot be undone.'
        confirmText='Delete'
        cancelText='Cancel'
        onConfirm={confirmDelete}
        variant='destructive'
      />
    </>
  )
}

// Memoize Schema component with custom comparison to prevent unnecessary re-renders
export default React.memo(Schema, (prevProps, nextProps) => {
  // Only re-render if schema content, id, or deleteProp function reference changes
  return (
    prevProps.id === nextProps.id &&
    prevProps.schema === nextProps.schema &&
    prevProps.deleteProp === nextProps.deleteProp
  )
})
