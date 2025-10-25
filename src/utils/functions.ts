import { nanoid } from 'nanoid'

// Generate unique ID (replaces WordPress uniqueID function)
export const uniqueID = (): string => nanoid()

// Utility function to get nested object property safely with proper typing
export const get = <T = unknown>(
  obj: Record<string, unknown>,
  path: string,
  defaultValue?: T,
): T | undefined => {
  const keys = path.split('.')
  let result: unknown = obj

  for (const key of keys) {
    if (result == null || typeof result !== 'object') {
      return defaultValue
    }
    result = (result as Record<string, unknown>)[key]
  }

  return result !== undefined ? (result as T) : defaultValue
}

// Utility function to set nested object property
export const set = <T extends Record<string, unknown>>(obj: T, path: string, value: unknown): T => {
  const keys = path.split('.')
  const lastKey = keys.pop()
  let current: Record<string, unknown> = obj

  if (!lastKey) return obj

  for (const key of keys) {
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {}
    }
    current = current[key] as Record<string, unknown>
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
  } catch {
    return String(date)
  }
}

// Validate JSON string
export const isValidJSON = (str: string): boolean => {
  try {
    JSON.parse(str)
    return true
  } catch {
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
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
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
      } catch {
        reject(new Error('Invalid JSON file'))
      }
    }

    reader.onerror = () => {
      reject(new Error('Error reading file'))
    }

    reader.readAsText(file)
  })
}
