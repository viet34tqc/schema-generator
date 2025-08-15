import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Info, Loader2 } from 'lucide-react';
import { Label } from './ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { getFieldType, __ } from '../utils/functions';
import { SchemaField } from '../types/schema';
import { cn } from '@/lib/utils';

// Lazy load field components
const fieldComponents = {
  Text: lazy(() => import('./Fields/Text')),
  Textarea: lazy(() => import('./Fields/Textarea')),
  Select: lazy(() => import('./Fields/Select')),
  DataList: lazy(() => import('./Fields/DataList')),
  Date: lazy(() => import('./Fields/Date')),
  Image: lazy(() => import('./Fields/Image')),
  Group: lazy(() => import('./Fields/Group')),
  Hidden: lazy(() => import('./Fields/Hidden')),
};

interface PropertyProps {
  field: SchemaField;
  value: any;
  onChange: (value: any) => void;
  schemaId: string;
}

const Property: React.FC<PropertyProps> = ({ field, value, onChange, schemaId }) => {
  const [FieldComponent, setFieldComponent] = useState<React.ComponentType<any> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadComponent = async () => {
      setIsLoading(true);
      try {
        let component;
        if (fieldComponents[field.type as keyof typeof fieldComponents]) {
          component = fieldComponents[field.type as keyof typeof fieldComponents];
        } else {
          // Try to load dynamically
          const dynamicComponent = await getFieldType(field.type);
          component = dynamicComponent.default || dynamicComponent;
        }
        setFieldComponent(() => component);
      } catch (error) {
        console.error(`Error loading field component for type: ${field.type}`, error);
        // Fallback to Text component
        setFieldComponent(() => fieldComponents.Text);
      } finally {
        setIsLoading(false);
      }
    };

    loadComponent();
  }, [field.type]);

  // Don't render hidden fields
  if (field.show === false) {
    return null;
  }

  const fieldId = `field-${schemaId}-${field.id}`;
  const isRequired = field.required === true;

  const renderLabel = () => {
    if (!field.label) return null;

    return (
      <div className="flex items-center space-x-2">
        <Label htmlFor={fieldId} className={cn(isRequired && "after:content-['*'] after:ml-0.5 after:text-destructive")}>
          {field.label}
        </Label>
        {field.tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{field.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    );
  };

  const renderField = () => {
    if (isLoading) {
      return (
        <div className="flex items-center space-x-2 py-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm text-muted-foreground">
            {__('Loading field...')}
          </span>
        </div>
      );
    }

    if (!FieldComponent) {
      return (
        <div className="text-sm text-destructive">
          {__('Error loading field component')}
        </div>
      );
    }

    return (
      <Suspense
        fallback={
          <div className="flex items-center space-x-2 py-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm text-muted-foreground">
              {__('Loading...')}
            </span>
          </div>
        }
      >
        <FieldComponent
          id={fieldId}
          field={field}
          value={value}
          onChange={onChange}
          schemaId={schemaId}
        />
      </Suspense>
    );
  };

  return (
    <div className="space-y-2">
      {renderLabel()}
      {field.description && (
        <p className="text-sm text-muted-foreground">
          {field.description}
        </p>
      )}
      {renderField()}
    </div>
  );
};

export default Property;
