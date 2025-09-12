import { Calendar } from 'lucide-react'
import React, { useRef } from 'react'
import { cn } from '../../lib/utils'
import { SchemaField } from '../../types/schema'
import { Input } from '../ui/input'

interface DateFieldProps {
  field: SchemaField
  value: string
  onChange: (value: string) => void
  id?: string
}

const Date: React.FC<DateFieldProps> = ({ field, value, onChange, id }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.showPicker?.()
      inputRef.current.focus()
    }
  }

  return (
    <div className='relative cursor-pointer' onClick={handleContainerClick}>
      <Input
        ref={inputRef}
        id={id}
        type='date'
        value={value || ''}
        onChange={handleChange}
        required={field.required}
        className={cn(
          'pr-10 cursor-pointer',
          // Hide the default calendar icon in webkit browsers
          '[&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-8 [&::-webkit-calendar-picker-indicator]:h-8 [&::-webkit-calendar-picker-indicator]:cursor-pointer',
        )}
      />
      <Calendar
        className='absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none'
        aria-hidden='true'
      />
    </div>
  )
}

export default Date
