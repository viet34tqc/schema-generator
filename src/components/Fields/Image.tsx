import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Upload } from 'lucide-react';
import { SchemaField } from '../../types/schema';

interface ImageFieldProps {
  field: SchemaField;
  value: string;
  onChange: (value: string) => void;
  id?: string;
}

const Image: React.FC<ImageFieldProps> = ({ field, value, onChange, id }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleFileSelect = () => {
    // In a real implementation, this would open a file picker
    // For now, just show a placeholder
    const url = prompt('Enter image URL:');
    if (url) {
      onChange(url);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <Input
          id={id}
          type="url"
          value={value || ''}
          onChange={handleChange}
          placeholder={field.placeholder || 'Enter image URL...'}
          required={field.required}
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleFileSelect}
          title="Select image"
        >
          <Upload className="h-4 w-4" />
        </Button>
      </div>
      {value && (
        <div className="mt-2">
          <img
            src={value}
            alt="Preview"
            className="max-w-xs max-h-32 object-cover rounded border"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Image;
