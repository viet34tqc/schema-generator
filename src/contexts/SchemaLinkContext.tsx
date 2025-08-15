import React, { createContext, ReactNode, useContext, useEffect } from 'react';
import { useImmer } from 'use-immer';
import { Schema, SchemaLinkContextType } from '../types/schema';
import { get, request } from '../utils/functions';

export const SchemaLinkContext = createContext<
  SchemaLinkContextType | undefined
>(undefined);

interface SchemaLinkProviderProps {
  children: ReactNode;
}

export const SchemaLinkProvider: React.FC<SchemaLinkProviderProps> = ({
  children,
}) => {
  const [schemaLinks, setSchemaLinks] = useImmer<Record<string, string>>({});

  useEffect(() => {
    request('schemas').then((data: Record<string, Schema>) => {
      if (!data) {
        return;
      }
      setSchemaLinks(draft => {
        Object.entries(data).forEach(([id, schema]) => {
          draft[id] = get(schema, 'fields._label', schema.type);
        });
      });
    });
  }, [setSchemaLinks]);

  const addSchemaLink = (id: string, schema: Schema) =>
    setSchemaLinks(draft => {
      draft[id] = get(schema, 'fields._label', schema.type);
    });

  const updateSchemaLinkLabel = (id: string, label: string) =>
    setSchemaLinks(draft => {
      draft[id] = label;
    });

  const removeSchemaLink = (id: string) =>
    setSchemaLinks(draft => {
      delete draft[id];
    });

  return (
    <SchemaLinkContext.Provider
      value={{
        schemaLinks,
        addSchemaLink,
        removeSchemaLink,
        updateSchemaLinkLabel,
      }}
    >
      {children}
    </SchemaLinkContext.Provider>
  );
};

export const useSchemaLinks = () => {
  const context = useContext(SchemaLinkContext);
  if (context === undefined) {
    throw new Error('useSchemaLinks must be used within a SchemaLinkProvider');
  }
  return context;
};
