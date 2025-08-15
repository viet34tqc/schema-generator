import { ChevronDown, Plus } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import { mockApi } from '../api/mockApi';
import { SchemaLinkContext } from '../contexts/SchemaLinkContext';
import { Schema, SchemaType as SchemaTypeData } from '../types/schema';
import { __, request, uniqueID } from '../utils/functions';
import Inserter from './Inserter';
import SchemaComponent from './Schema';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const Schemas = () => {
  const [items, setItems] = useState<SchemaTypeData[]>([]);
  const [schemas, setSchemas] = useImmer<Record<string, Schema>>({});

  const [isSaving, setIsSaving] = useState(false);
  const context = useContext(SchemaLinkContext);
  if (!context) {
    throw new Error('Schemas must be used within a SchemaLinkProvider');
  }
  const { addSchemaLink, removeSchemaLink } = context;

  useEffect(() => {
    request('data', { type: 'schemas' }).then(setItems);
  }, []);

  useEffect(() => {
    request('schemas').then(data => data && setSchemas(data));
  }, [setSchemas]);

  const addSchema = (
    e: React.MouseEvent<HTMLButtonElement>,
    onToggle: () => void
  ) =>
    setSchemas(draft => {
      onToggle();
      const target = e.target as HTMLButtonElement;
      const type = target.dataset.value;
      const label = target.textContent?.trim() || type;
      const id = uniqueID();
      const newSchema: Schema = { type: type!, fields: { _label: label } };

      draft[id] = newSchema;
      addSchemaLink(id, newSchema);
    });

  const deleteSchema = (id: string) =>
    setSchemas(draft => {
      delete draft[id];
      removeSchemaLink(id);
    });

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await mockApi.saveSchemas(schemas);
      // Show success message - in a real app you'd use a toast notification
      alert(__('Schemas saved successfully!'));
    } catch (error) {
      console.error('Error saving schemas:', error);
      alert(__('Error saving schemas. Please try again.'));
    } finally {
      setIsSaving(false);
    }
  };

  const hasSchemas = Object.keys(schemas).length > 0;

  return (
    <div className="space-y-6">
      {hasSchemas ? (
        <div className="space-y-4">
          {Object.entries(schemas).map(([id, schema]) => (
            <SchemaComponent
              key={id}
              schema={schema}
              deleteProp={deleteSchema}
              id={id}
              setSchemas={setSchemas}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-gray-500 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-lg mb-4">
            {__('There are no schemas here.')}
          </p>
          <p className="text-gray-400 text-sm">
            {__('Click the "Add Schema" button to add a new schema.')}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between pt-6 border-t border-border">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? __('Saving...') : __('Save Changes')}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              {__('Add Schema')}
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80">
            <Inserter
              items={items}
              group={true}
              hasSearch={true}
              onSelect={addSchema}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Schemas;
