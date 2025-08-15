import React from 'react';
import { Select as SelectUI, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { SchemaField } from '../../types/schema';

interface SelectFieldProps {
  field: SchemaField;
  value: string;
  onChange: (value: string) => void;
  id?: string;
}

const Select: React.FC<SelectFieldProps> = ({ field, value, onChange, id }) => {
  const renderOptions = (options: any) => {
    if (Array.isArray(options)) {
      // Handle array of options
      return options.map((option, index) => (
        <SelectItem key={option.value || index} value={option.value}>
          {option.label}
        </SelectItem>
      ));
    }

    if (typeof options === 'object') {
      // Handle simple key-value pairs (grouped options not supported in shadcn/ui Select)
      return Object.entries(options).map(([key, optValue]) => (
        <SelectItem key={key} value={key}>
          {String(optValue)}
        </SelectItem>
      ));
    }

    return null;
  };

  if (!field.options) {
    return (
      <div className="text-sm text-muted-foreground">
        No options available
      </div>
    );
  }

  return (
    <SelectUI value={value || ''} onValueChange={onChange}>
      <SelectTrigger id={id}>
        <SelectValue placeholder={field.placeholder || 'Select an option...'} />
      </SelectTrigger>
      <SelectContent>
        {renderOptions(field.options)}
      </SelectContent>
    </SelectUI>
  );
};

export default Select;
