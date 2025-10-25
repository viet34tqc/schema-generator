import { SchemaField } from '@/types/schema'
import { ExternalLink } from 'lucide-react'
import { useMemo } from 'react'
import { Button } from '../ui/button'

type Props = {
  fieldDefinitions: SchemaField[]
}

const DocumentationButtons = ({ fieldDefinitions }: Props) => {
  // Memoize documentation URLs from field definitions
  const documentationLinks = useMemo(
    () =>
      fieldDefinitions
        .filter(
          (field) =>
            (field.type === 'SchemaDocs' || field.type === 'GoogleDocs') && field.url && field.show,
        )
        .map((field) => ({
          url: field.url,
          type: field.type,
          label: field.type === 'GoogleDocs' ? 'Google Docs' : 'Schema.org Docs',
        })),
    [fieldDefinitions],
  )

  if (documentationLinks.length === 0) {
    return null
  }

  return (
    <>
      {documentationLinks.map((link) => (
        <Button
          key={link.url}
          variant='ghost'
          size='icon'
          asChild
          title={link.label}
          className={
            link.type === 'GoogleDocs'
              ? 'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
              : 'text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300'
          }
        >
          <a href={link.url} target='_blank' rel='noopener noreferrer'>
            <ExternalLink className='h-4 w-4' />
          </a>
        </Button>
      ))}
    </>
  )
}

export default DocumentationButtons
