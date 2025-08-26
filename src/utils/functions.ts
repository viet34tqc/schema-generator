import { nanoid } from 'nanoid'

// Generate unique ID (replaces WordPress uniqueID function)
export const uniqueID = (): string => nanoid()

// API request cache
let apiCache: Record<string, any> = {}

// Request function using localStorage (replaces WordPress REST API calls)
export const request = async (
  apiName: string,
  params: Record<string, any> = {},
  method: string = 'GET',
  cache: boolean = true,
): Promise<any> => {
  const { localStorageApi } = await import('./localStorage.js')

  const cacheKey = JSON.stringify({ apiName, params, method })
  if (cache && apiCache[cacheKey]) {
    return apiCache[cacheKey]
  }

  let result: any

  switch (apiName) {
    case 'data':
      if (params.type === 'schemas') {
        result = localStorageApi.getSchemaTypes()
      } else {
        result = null
      }
      break
    case 'schemas':
      result = localStorageApi.getSchemas()
      break
    case 'types':
      result = localStorageApi.getSchemaFieldDefinitions(params.type)
      break
    case 'terms':
      // Mock term data for search functionality
      result = [
        { value: '1', label: 'Technology' },
        { value: '2', label: 'Business' },
        { value: '3', label: 'Health' },
        { value: '4', label: 'Education' },
        { value: '5', label: 'Entertainment' },
      ].filter(
        (term) => !params.term || term.label.toLowerCase().includes(params.term.toLowerCase()),
      )
      break
    case 'posts':
      // Mock post data for search functionality
      result = [
        { value: '1', label: 'Sample Post 1' },
        { value: '2', label: 'Sample Post 2' },
        { value: '3', label: 'About Us Page' },
        { value: '4', label: 'Contact Page' },
        { value: '5', label: 'Blog Post Example' },
      ].filter(
        (post) => !params.term || post.label.toLowerCase().includes(params.term.toLowerCase()),
      )
      break
    case 'meta_keys':
      // Mock meta keys data
      result = ['custom_field_1', 'custom_field_2', 'seo_title', 'seo_description']
      break
    default:
      result = null
  }

  if (cache) {
    apiCache[cacheKey] = result
  }

  return result
}

// Translation function (replaces WordPress __)
export const __ = (text: string): string => {
  // For now, just return the text as-is
  // In a real implementation, you could add i18n support here
  return text
}

// Clear API cache
export const clearApiCache = (): void => {
  apiCache = {}
}

// Utility function to get nested object property safely
export const get = (obj: any, path: string, defaultValue: any = undefined): any => {
  const keys = path.split('.')
  let result = obj

  for (const key of keys) {
    if (result == null || typeof result !== 'object') {
      return defaultValue
    }
    result = result[key]
  }

  return result !== undefined ? result : defaultValue
}

// Utility function to set nested object property
export const set = (obj: any, path: string, value: any): any => {
  const keys = path.split('.')
  const lastKey = keys.pop()
  let current = obj

  if (!lastKey) return obj

  for (const key of keys) {
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {}
    }
    current = current[key]
  }

  current[lastKey] = value
  return obj
}

// Debounce function for search inputs
export const debounce = <T extends (...args: any[]) => any>(func: T, wait: number) => {
  let timeout: NodeJS.Timeout
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Format date for display
export const formatDate = (date: string | Date | null | undefined): string => {
  if (!date) return ''

  try {
    return new Date(date).toLocaleDateString()
  } catch (error) {
    return String(date)
  }
}

// Validate JSON string
export const isValidJSON = (str: string): boolean => {
  try {
    JSON.parse(str)
    return true
  } catch (error) {
    return false
  }
}

// Deep clone object
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T
  }

  if (obj instanceof Array) {
    return obj.map((item) => deepClone(item)) as T
  }

  if (typeof obj === 'object') {
    const cloned: any = {}
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone((obj as any)[key])
      }
    }
    return cloned
  }

  return obj
}

// Generate download link for data
export const downloadData = (data: any, filename: string): void => {
  const jsonString = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Parse uploaded file
export const parseUploadedFile = (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      try {
        const result = event.target?.result
        if (typeof result === 'string') {
          const data = JSON.parse(result)
          resolve(data)
        } else {
          reject(new Error('Invalid file content'))
        }
      } catch (error) {
        reject(new Error('Invalid JSON file'))
      }
    }

    reader.onerror = () => {
      reject(new Error('Error reading file'))
    }

    reader.readAsText(file)
  })
}
