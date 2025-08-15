import { Trash2 } from 'lucide-react';
import React from 'react';
import { useSchemaLinks } from '../contexts/SchemaLinkContext';
import { Schema as SchemaType } from '../types/schema';
import { __, get } from '../utils/functions';
import Panel from './Panel';
import SchemaTypeComponent from './SchemaType';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface SchemaProps {
  schema: SchemaType;
  deleteProp: (id: string) => void;
  id: string;
  setSchemas: (updater: (draft: Record<string, SchemaType>) => void) => void;
}

const Schema: React.FC<SchemaProps> = ({
  schema,
  deleteProp,
  id,
  setSchemas,
}) => {
  const { updateSchemaLinkLabel } = useSchemaLinks();

  const handleDelete = () => {
    if (window.confirm(__('Are you sure you want to delete this schema?'))) {
      deleteProp(id);
    }
  };

  const updateSchema = (path: string, value: any) => {
    setSchemas(draft => {
      const keys = path.split('.');
      let current: any = draft[id];

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!(key in current)) {
          current[key] = {};
        }
        current = current[key];
      }

      current[keys[keys.length - 1]] = value;

      // Update schema link label if _label field is changed
      if (path === 'fields._label') {
        updateSchemaLinkLabel(id, value);
      }
    });
  };

  const schemaLabel = get(schema, 'fields._label', schema.type);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-medium">{schemaLabel}</h3>
            <Badge variant="secondary">{schema.type}</Badge>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            className="text-destructive hover:text-destructive"
            title={__('Delete schema')}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="properties" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="properties">{__('Properties')}</TabsTrigger>
            <TabsTrigger value="location">{__('Location')}</TabsTrigger>
          </TabsList>

          <TabsContent value="properties" className="mt-6">
            <SchemaTypeComponent
              schema={schema}
              updateSchema={updateSchema}
              schemaId={id}
            />
          </TabsContent>

          <TabsContent value="location" className="mt-6">
            <Panel
              title={__('Location Rules')}
              description={__('Define where this schema should be displayed')}
            >
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {__('Location rules functionality will be implemented here.')}
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">
                        {__('Coming Soon')}
                      </h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>
                          {__(
                            'Location-based rules for displaying schemas on specific pages, post types, categories, etc. will be available in a future update.'
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Panel>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Schema;
