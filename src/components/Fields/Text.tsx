import React from 'react';
import { Input } from '../ui/input';
import { SchemaField } from '../../types/schema';

interface TextFieldProps {
  field: SchemaField;
  value: string;
  onChange: (value: string) => void;
  id?: string;
}

const Text: React.FC<TextFieldProps> = ({ field, value, onChange, id }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Input
      id={id}
      type="text"
      value={value || ''}
      onChange={handleChange}
      placeholder={field.placeholder || (typeof field.std === 'string' ? field.std : '') || ''}
      required={field.required}
    />
  );
};

export default Text;
