import { ExternalLink } from 'lucide-react'
import React from 'react'
import { __ } from '../../utils/functions'

interface SchemaDocsProps {
  field: {
    id: string
    type: string
    url: string
    show?: boolean
  }
  value?: any
  onChange?: (value: any) => void
  schemaId?: string
}

const SchemaDocs: React.FC<SchemaDocsProps> = ({ field }) => {
  if (!field.show) {
    return null
  }

  return (
    <div className='mb-4 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg'>
      <a
        href={field.url}
        target='_blank'
        rel='noopener noreferrer'
        className='inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 font-medium text-sm transition-colors'
      >
        {__('Schema.org documentation')}
        <ExternalLink className='ml-1 h-4 w-4' />
      </a>
    </div>
  )
}

export default SchemaDocs
