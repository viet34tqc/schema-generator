import { cn } from '@/lib/utils'
import { Info } from 'lucide-react'
import React from 'react'
import { SchemaField } from '../types/schema'
import CloneableField from './Fields/CloneableField'
import DataList from './Fields/DataList'
import Date from './Fields/Date'
import GoogleDocs from './Fields/GoogleDocs'
import Group from './Fields/Group'
import Hidden from './Fields/Hidden'
import Image from './Fields/Image'
import SchemaDocs from './Fields/SchemaDocs'
import Select from './Fields/Select'
import Text from './Fields/Text'
import Textarea from './Fields/Textarea'
import { Label } from './ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

// Direct imports - no lazy loading needed for schema fields
const fieldComponents = {
  Text,
  Textarea,
  Select,
  DataList,
  Date,
  Image,
  Group,
  Hidden,
  GoogleDocs,
  SchemaDocs,
}

interface PropertyProps {
  field: SchemaField
  value: any
  onChange: (value: any) => void
  schemaId: string
}

const Property: React.FC<PropertyProps> = ({ field, value, onChange, schemaId }) => {
  // Handle cloneable fields
  if (field.cloneable) {
    return (
      <div className='space-y-2'>
        {field.label && (
          <div className='flex items-center space-x-2'>
            <Label
              className={cn(
                field.required && "after:content-['*'] after:ml-0.5 after:text-destructive",
              )}
            >
              {field.label}
            </Label>
            {field.tooltip && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className='h-4 w-4 text-muted-foreground cursor-help' />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className='max-w-xs'>{field.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        )}
        {field.description && <p className='text-sm text-muted-foreground'>{field.description}</p>}
        <CloneableField field={field} value={value} onChange={onChange} schemaId={schemaId} />
      </div>
    )
  }

  // Get the field component directly - no loading needed
  const FieldComponent =
    fieldComponents[field.type as keyof typeof fieldComponents] || fieldComponents.Text

  // Don't render hidden fields
  if (field.show === false) {
    return null
  }

  const fieldId = `field-${schemaId}-${field.id}`
  const isRequired = field.required === true

  const renderLabel = () => {
    if (!field.label) return null

    return (
      <div className='flex items-center space-x-2'>
        <Label
          htmlFor={fieldId}
          className={cn(isRequired && "after:content-['*'] after:ml-0.5 after:text-destructive")}
        >
          {field.label}
        </Label>
        {field.tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className='h-4 w-4 text-muted-foreground cursor-help' />
              </TooltipTrigger>
              <TooltipContent>
                <p className='max-w-xs'>{field.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    )
  }

  return (
    <div className='space-y-2'>
      {renderLabel()}
      {field.description && <p className='text-sm text-muted-foreground'>{field.description}</p>}
      <FieldComponent
        id={fieldId}
        field={field}
        value={value}
        onChange={onChange}
        schemaId={schemaId}
      />
    </div>
  )
}

export default Property
