import React from 'react'
import { SchemaField } from '../../types/schema'
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
  const renderOptions = (options: any) => {
    if (Array.isArray(options)) {
      // Check if this is an array of grouped options (like Article.php structure)
      if (options.length > 0 && options[0].label && options[0].options) {
        return options.map((group, groupIndex) => (
          <SelectGroup key={group.label || groupIndex}>
            <SelectLabel>{group.label}</SelectLabel>
            {Object.entries(group.options || {}).map(([key, optValue]) => (
              <SelectItem key={key} value={key}>
                {String(optValue)}
              </SelectItem>
            ))}
          </SelectGroup>
        ))
      }

      // Handle array of simple options
      return options.map((option, index) => (
        <SelectItem key={option.value || index} value={option.value}>
          {option.label}
        </SelectItem>
      ))
    }

    if (typeof options === 'object') {
      // Handle simple key-value pairs
      return Object.entries(options).map(([key, optValue]) => (
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
      <SelectContent>{renderOptions(field.options)}</SelectContent>
    </SelectUI>
  )
}

export default Select
