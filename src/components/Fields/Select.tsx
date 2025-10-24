import { SchemaField } from '@/types/schema'
import React from 'react'
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  Select as SelectUI,
  SelectValue,
} from '../ui/select'

interface SelectFieldProps {
  field: SchemaField
  value: string
  onChange: (value: string) => void
  id?: string
}

const Select: React.FC<SelectFieldProps> = ({ field, value, onChange, id }) => {
  const renderOptions = (
    options:
      | Record<string, string>
      | Array<{ value: string; label: string }>
      | Array<{ label: string; options: Record<string, string> }>,
  ) => {
    if (Array.isArray(options)) {
      // Check if this is an array of grouped options (like Article.php structure)
      if (
        options.length > 0 &&
        'label' in options[0] &&
        'options' in options[0] &&
        typeof options[0].options === 'object'
      ) {
        return (options as Array<{ label: string; options: Record<string, string> }>).map(
          (group, groupIndex) => (
            <SelectGroup key={group.label || groupIndex}>
              <SelectLabel>{group.label}</SelectLabel>
              {Object.entries(group.options || {}).map(([key, optValue]) => (
                <SelectItem key={key} value={key}>
                  {String(optValue)}
                </SelectItem>
              ))}
            </SelectGroup>
          ),
        )
      }

      // Handle array of simple options
      return (options as Array<{ value: string; label: string }>).map((option, index) => (
        <SelectItem key={option.value || index} value={option.value}>
          {option.label}
        </SelectItem>
      ))
    }

    if (typeof options === 'object') {
      // Handle simple key-value pairs
      return Object.entries(options as Record<string, string>).map(([key, optValue]) => (
        <SelectItem key={key} value={key}>
          {String(optValue)}
        </SelectItem>
      ))
    }

    return null
  }

  if (!field.options) {
    return <div className='text-sm text-muted-foreground'>No options available</div>
  }

  return (
    <SelectUI value={value || ''} onValueChange={onChange}>
      <SelectTrigger id={id}>
        <SelectValue placeholder={field.placeholder || 'Select an option...'} />
      </SelectTrigger>
      <SelectContent>
        {renderOptions(
          field.options as
            | Record<string, string>
            | Array<{ value: string; label: string }>
            | Array<{ label: string; options: Record<string, string> }>,
        )}
      </SelectContent>
    </SelectUI>
  )
}

export default Select
