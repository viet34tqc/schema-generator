import React from 'react';
import { SchemaField } from '../../types/schema';
import Property from '../Property';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface GroupFieldProps {
  field: SchemaField;
  value: any;
  onChange: (value: any) => void;
  id?: string;
  schemaId?: string;
}

const Group: React.FC<GroupFieldProps> = ({
  field,
  value,
  onChange,
  schemaId,
}) => {
  const handleFieldChange = (fieldId: string, fieldValue: any) => {
    const newValue = { ...value };
    newValue[fieldId] = fieldValue;
    onChange(newValue);
  };

  if (!field.fields || field.fields.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        No fields defined for this group
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{field.label || 'Group'}</CardTitle>
        {field.description && (
          <p className="text-sm text-muted-foreground">{field.description}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {field.fields.map(subField => (
          <Property
            key={subField.id}
            field={subField}
            value={value?.[subField.id] || subField.std || ''}
            onChange={fieldValue => handleFieldChange(subField.id, fieldValue)}
            schemaId={schemaId || ''}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default Group;
