import React from 'react';
import { SchemaField } from '../../types/schema';

interface HiddenFieldProps {
  field: SchemaField;
  value: string;
  onChange: (value: string) => void;
  id?: string;
}

const Hidden: React.FC<HiddenFieldProps> = ({ field, value, onChange, id }) => {
  return (
    <input
      id={id}
      type="hidden"
      value={value || field.std || ''}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Hidden;
