import React from 'react'
import { SchemaField } from '../../types/schema'
import { Input } from '../ui/input'

interface ImageFieldProps {
  field: SchemaField
  value: string
  onChange: (value: string) => void
  id?: string
}

const Image: React.FC<ImageFieldProps> = ({ field, value, onChange, id }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className='space-y-2'>
      <Input
        id={id}
        type='url'
        value={value || ''}
        onChange={handleChange}
        placeholder={field.placeholder || 'Enter image URL...'}
        required={field.required}
      />
      {value && (
        <div className='mt-2'>
          <img
            src={value}
            alt='Preview'
            className='max-w-xs max-h-32 object-cover rounded border'
            onError={(e) => {
              ;(e.target as HTMLImageElement).style.display = 'none'
            }}
          />
        </div>
      )}
    </div>
  )
}

export default Image
