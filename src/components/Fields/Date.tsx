import React from 'react';
import { Input } from '../ui/input';
import { SchemaField } from '../../types/schema';

interface DateFieldProps {
  field: SchemaField;
  value: string;
  onChange: (value: string) => void;
  id?: string;
}

const Date: React.FC<DateFieldProps> = ({ field, value, onChange, id }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Input
      id={id}
      type="date"
      value={value || ''}
      onChange={handleChange}
      required={field.required}
    />
  );
};

export default Date;
