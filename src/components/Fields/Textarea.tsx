import React from 'react';
import { Textarea as TextareaUI } from '../ui/textarea';
import { SchemaField } from '../../types/schema';

interface TextareaFieldProps {
  field: SchemaField;
  value: string;
  onChange: (value: string) => void;
  id?: string;
}

const Textarea: React.FC<TextareaFieldProps> = ({ field, value, onChange, id }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <TextareaUI
      id={id}
      value={value || ''}
      onChange={handleChange}
      placeholder={field.placeholder || (typeof field.std === 'string' ? field.std : '') || ''}
      rows={field.rows || 4}
      required={field.required}
    />
  );
};

export default Textarea;
