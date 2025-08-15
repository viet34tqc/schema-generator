import { nanoid } from 'nanoid';

// Generate unique ID (replaces WordPress uniqueID function)
export const uniqueID = (): string => nanoid();

// API request cache
let apiCache: Record<string, any> = {};

// Mock request function (replaces WordPress REST API calls)
export const request = async (
  apiName: string,
  params: Record<string, any> = {},
  method: string = 'GET',
  cache: boolean = true
): Promise<any> => {
  const { mockApi } = await import('../api/mockApi.js');

  const cacheKey = JSON.stringify({ apiName, params, method });
  if (cache && apiCache[cacheKey]) {
    return apiCache[cacheKey];
  }

  let result: any;

  switch (apiName) {
    case 'data':
      result = await mockApi.getData(params);
      break;
    case 'schemas':
      result = await mockApi.getSchemas();
      break;
    case 'types':
      result = await mockApi.getSchemaType(params);
      break;
    case 'terms':
      result = await mockApi.searchTerms(params);
      break;
    case 'posts':
      result = await mockApi.searchPosts(params);
      break;
    case 'meta_keys':
      result = await mockApi.getMetaKeys();
      break;
    default:
      result = null;
  }

  if (cache) {
    apiCache[cacheKey] = result;
  }

  return result;
};

// Dynamic field type loader (replaces WordPress lazy loading)
let typeCache: Record<string, Promise<any>> = {};
export const getFieldType = (name: string): Promise<any> => {
  if (!typeCache[name]) {
    // Return a promise that resolves to the component
    typeCache[name] = import(`../components/Fields/${name}.tsx`).catch(() => {
      // Fallback to Text component if specific field type doesn't exist
      return import('../components/Fields/Text.tsx');
    });
  }
  return typeCache[name];
};

// Translation function (replaces WordPress __)
export const __ = (text: string): string => {
  // For now, just return the text as-is
  // In a real implementation, you could add i18n support here
  return text;
};

// Clear API cache
export const clearApiCache = (): void => {
  apiCache = {};
};

// Utility function to get nested object property safely
export const get = (
  obj: any,
  path: string,
  defaultValue: any = undefined
): any => {
  const keys = path.split('.');
  let result = obj;

  for (const key of keys) {
    if (result == null || typeof result !== 'object') {
      return defaultValue;
    }
    result = result[key];
  }

  return result !== undefined ? result : defaultValue;
};

// Utility function to set nested object property
export const set = (obj: any, path: string, value: any): any => {
  const keys = path.split('.');
  const lastKey = keys.pop();
  let current = obj;

  if (!lastKey) return obj;

  for (const key of keys) {
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }

  current[lastKey] = value;
  return obj;
};

// Debounce function for search inputs
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Format date for display
export const formatDate = (date: string | Date | null | undefined): string => {
  if (!date) return '';

  try {
    return new Date(date).toLocaleDateString();
  } catch (error) {
    return String(date);
  }
};

// Validate JSON string
export const isValidJSON = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
};

// Deep clone object
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as T;
  }

  if (typeof obj === 'object') {
    const cloned: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone((obj as any)[key]);
      }
    }
    return cloned;
  }

  return obj;
};

// Generate download link for data
export const downloadData = (data: any, filename: string): void => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Parse uploaded file
export const parseUploadedFile = (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = event => {
      try {
        const result = event.target?.result;
        if (typeof result === 'string') {
          const data = JSON.parse(result);
          resolve(data);
        } else {
          reject(new Error('Invalid file content'));
        }
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };

    reader.readAsText(file);
  });
};
