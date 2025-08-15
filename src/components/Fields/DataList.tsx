import React from 'react';
import { Input } from '../ui/input';
import { SchemaField } from '../../types/schema';

interface DataListFieldProps {
  field: SchemaField;
  value: string;
  onChange: (value: string) => void;
  id?: string;
}

const DataList: React.FC<DataListFieldProps> = ({ field, value, onChange, id }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <Input
        id={id}
        type="text"
        value={value || ''}
        onChange={handleChange}
        placeholder={field.placeholder || 'Enter value...'}
        list={`${id}-datalist`}
        required={field.required}
      />
      {field.options && (
        <datalist id={`${id}-datalist`}>
          {Array.isArray(field.options) 
            ? field.options.map((option, index) => (
                <option key={option.value || index} value={option.value}>
                  {option.label}
                </option>
              ))
            : Object.entries(field.options).map(([key, value]) => (
                <option key={key} value={key}>
                  {String(value)}
                </option>
              ))
          }
        </datalist>
      )}
    </div>
  );
};

export default DataList;
