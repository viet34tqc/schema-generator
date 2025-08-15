import {
  defaultSchemas,
  locations,
  metaKeys,
  schemaTypes,
  variables,
} from './mockData';
import { schemaFieldDefinitions } from './schemaFields';

// Local storage keys
const STORAGE_KEYS = {
  SCHEMAS: 'schema_generator_schemas',
  SETTINGS: 'schema_generator_settings',
};

// Simulate API delay
const delay = (ms = 100) => new Promise(resolve => setTimeout(resolve, ms));

// Get data from localStorage or return default
const getStoredData = (key: string, defaultValue: any = {}): any => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

// Save data to localStorage
const saveStoredData = (key: string, data: any): boolean => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

// Initialize default schemas if none exist
const initializeDefaultSchemas = () => {
  const existing = getStoredData(STORAGE_KEYS.SCHEMAS);
  if (Object.keys(existing).length === 0) {
    saveStoredData(STORAGE_KEYS.SCHEMAS, defaultSchemas);
    return defaultSchemas;
  }
  return existing;
};

// Mock API functions
export const mockApi = {
  // Get schema types for dropdown
  async getData(params: { type?: string } = {}) {
    await delay();

    const { type = 'variables' } = params;

    switch (type) {
      case 'schemas':
        return schemaTypes;
      case 'variables':
        return variables;
      default:
        return variables;
    }
  },

  // Get saved schemas
  async getSchemas() {
    await delay();
    return initializeDefaultSchemas();
  },

  // Save schemas
  async saveSchemas(schemas: any) {
    await delay();
    const success = saveStoredData(STORAGE_KEYS.SCHEMAS, schemas);
    return success ? schemas : null;
  },

  // Get schema type field definitions
  async getSchemaType(params: { type?: string } = {}) {
    await delay();

    const { type } = params;
    const fields = type ? (schemaFieldDefinitions as any)[type] || [] : [];

    // Add custom field option at the end
    const fieldsWithCustom = [
      ...fields,
      {
        label: 'Custom',
        id: 'custom',
        type: 'Custom',
        tooltip: 'Custom properties for the schema.',
      },
    ];

    return fieldsWithCustom;
  },

  // Get location options (for location-based rules)
  async getLocations() {
    await delay();
    return locations;
  },

  // Search posts (mock implementation)
  async searchPosts(
    params: { term?: string; name?: string; selected?: string } = {}
  ) {
    await delay();

    const { term = '' } = params;

    // Mock post data
    const mockPosts = [
      { value: '1', label: 'Sample Post 1' },
      { value: '2', label: 'Sample Post 2' },
      { value: '3', label: 'About Us Page' },
      { value: '4', label: 'Contact Page' },
      { value: '5', label: 'Blog Post Example' },
    ];

    // Filter by search term
    const filtered = mockPosts.filter(
      post => !term || post.label.toLowerCase().includes(term.toLowerCase())
    );

    return filtered;
  },

  // Search terms (mock implementation)
  async searchTerms(
    params: { term?: string; name?: string; selected?: string } = {}
  ) {
    await delay();

    const { term = '' } = params;

    // Mock term data
    const mockTerms = [
      { value: '1', label: 'Technology' },
      { value: '2', label: 'Business' },
      { value: '3', label: 'Health' },
      { value: '4', label: 'Education' },
      { value: '5', label: 'Entertainment' },
    ];

    // Filter by search term
    const filtered = mockTerms.filter(
      termItem =>
        !term || termItem.label.toLowerCase().includes(term.toLowerCase())
    );

    return filtered;
  },

  // Get meta keys
  async getMetaKeys() {
    await delay();
    return metaKeys;
  },

  // Import schemas
  async importSchemas(
    data: any
  ): Promise<{ success: boolean; message: string }> {
    await delay();

    try {
      // Validate the data structure
      if (typeof data !== 'object' || data === null) {
        return { success: false, message: 'Invalid data format' };
      }

      // Get existing schemas
      const existingSchemas = getStoredData(STORAGE_KEYS.SCHEMAS, {});

      // Merge with existing (with unique IDs for conflicts)
      const mergedSchemas = { ...existingSchemas };

      Object.entries(data).forEach(([id, schema]) => {
        // Generate unique ID if conflict exists
        let uniqueId = id;
        let counter = 1;
        while (mergedSchemas[uniqueId]) {
          uniqueId = `${id}_${counter}`;
          counter++;
        }
        mergedSchemas[uniqueId] = schema;
      });

      // Save merged schemas
      const success = saveStoredData(STORAGE_KEYS.SCHEMAS, mergedSchemas);

      if (success) {
        return { success: true, message: 'Schemas imported successfully' };
      } else {
        return { success: false, message: 'Failed to save imported schemas' };
      }
    } catch (error) {
      console.error('Import error:', error);
      return { success: false, message: 'Import failed due to an error' };
    }
  },

  // Export schemas
  async exportSchemas() {
    await delay();
    const schemas = getStoredData(STORAGE_KEYS.SCHEMAS, {});
    return schemas;
  },

  // Clear all schemas (for testing)
  async clearSchemas() {
    await delay();
    localStorage.removeItem(STORAGE_KEYS.SCHEMAS);
    return true;
  },
};
