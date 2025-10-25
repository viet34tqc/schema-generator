import { useSchemas, useSchemaStore } from '@/stores'
import { downloadData, parseUploadedFile } from '@/utils/functions'
import { AlertCircle, CheckCircle, Download, FileText, Upload } from 'lucide-react'
import React, { useRef, useState } from 'react'
import Panel from './Panel'
import { Alert, AlertDescription } from './ui/alert'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

const ImportExport: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [importStatus, setImportStatus] = useState('')
  const [statusType, setStatusType] = useState<'success' | 'error' | ''>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Zustand store hooks
  const schemas = useSchemas()
  const importSchemas = useSchemaStore((state) => state.importSchemas)

  const handleExport = async () => {
    setIsExporting(true)
    setImportStatus('')
    try {
      const filename = `schema-export-${new Date().toISOString().split('T')[0]}.json`
      downloadData(schemas, filename)
      setImportStatus('Schemas exported successfully!')
      setStatusType('success')
    } catch (error) {
      console.error('Export error:', error)
      setImportStatus('Error exporting schemas. Please try again.')
      setStatusType('error')
    } finally {
      setIsExporting(false)
    }
  }

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsImporting(true)
    setImportStatus('')

    try {
      const data = await parseUploadedFile(file)

      if (!data || typeof data !== 'object') {
        throw new Error('Invalid file format')
      }

      // Import schemas using Zustand store
      importSchemas(data)
      const result = { success: true, message: 'Schemas imported successfully' }

      if (result.success) {
        setImportStatus('Schemas imported successfully!')
        setStatusType('success')
        // Refresh the page to show imported schemas
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      } else {
        throw new Error(result.message || 'Import failed')
      }
    } catch (error) {
      console.error('Import error:', error)
      setImportStatus(
        error instanceof Error
          ? error.message
          : 'Error importing schemas. Please check the file format.',
      )
      setStatusType('error')
    } finally {
      setIsImporting(false)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className='space-y-6'>
      <div className='grid gap-6 md:grid-cols-2'>
        {/* Export Section */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center space-x-2'>
              <Download className='h-5 w-5' />
              <span>Export Schemas</span>
            </CardTitle>
            <CardDescription>
              Download all your schemas as a JSON file for backup or migration.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleExport} disabled={isExporting} className='w-full'>
              {isExporting ? (
                <>
                  <Download className='mr-2 h-4 w-4 animate-pulse' />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className='mr-2 h-4 w-4' />
                  Export All Schemas
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Import Section */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center space-x-2'>
              <Upload className='h-5 w-5' />
              <span>Import Schemas</span>
            </CardTitle>
            <CardDescription>
              Upload a JSON file to import schemas. This will merge with existing schemas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <input
              ref={fileInputRef}
              type='file'
              accept='.json'
              onChange={handleImport}
              className='hidden'
            />
            <Button
              onClick={triggerFileInput}
              disabled={isImporting}
              variant='outline'
              className='w-full'
            >
              {isImporting ? (
                <>
                  <Upload className='mr-2 h-4 w-4 animate-pulse' />
                  Importing...
                </>
              ) : (
                <>
                  <Upload className='mr-2 h-4 w-4' />
                  Choose File to Import
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Status Messages */}
      {importStatus && (
        <Alert variant={statusType === 'error' ? 'destructive' : 'default'}>
          {statusType === 'success' ? (
            <CheckCircle className='h-4 w-4' />
          ) : (
            <AlertCircle className='h-4 w-4' />
          )}
          <AlertDescription>{importStatus}</AlertDescription>
        </Alert>
      )}

      {/* Instructions Panel */}
      <Panel
        title='Import/Export Instructions'
        description='Learn how to backup and restore your schemas'
        defaultOpen={false}
      >
        <div className='space-y-4'>
          <div>
            <h4 className='font-medium flex items-center space-x-2 mb-2'>
              <FileText className='h-4 w-4' />
              <span>File Format</span>
            </h4>
            <p className='text-sm text-muted-foreground'>
              Import/export files are in JSON format and contain all schema definitions, including
              field values and configurations.
            </p>
          </div>

          <div>
            <h4 className='font-medium mb-2'>Export Process</h4>
            <ul className='text-sm text-muted-foreground space-y-1 list-disc list-inside'>
              <li>Click &quot;Export All Schemas&quot; to download your current schemas</li>
              <li>The file will be saved with the current date in the filename</li>
              <li>Store this file safely as a backup of your schema configurations</li>
            </ul>
          </div>

          <div>
            <h4 className='font-medium mb-2'>Import Process</h4>
            <ul className='text-sm text-muted-foreground space-y-1 list-disc list-inside'>
              <li>Click &quot;Choose File to Import&quot; and select a valid JSON export file</li>
              <li>Imported schemas will be merged with your existing schemas</li>
              <li>If a schema with the same ID exists, it will be overwritten</li>
              <li>The page will refresh automatically after successful import</li>
            </ul>
          </div>

          <div className='bg-yellow-50 border border-yellow-200 rounded-md p-4'>
            <div className='flex'>
              <AlertCircle className='h-5 w-5 text-yellow-400' />
              <div className='ml-3'>
                <h3 className='text-sm font-medium text-yellow-800'>Important Notes</h3>
                <div className='mt-2 text-sm text-yellow-700'>
                  <ul className='list-disc list-inside space-y-1'>
                    <li>Always backup your current schemas before importing</li>
                    <li>Only import files that were exported from this application</li>
                    <li>Large imports may take a few moments to process</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  )
}

export default ImportExport
