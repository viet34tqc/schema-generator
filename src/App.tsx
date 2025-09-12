import ImportExport from './components/ImportExport'
import Schemas from './components/Schemas'
import ThemeToggle from './components/ThemeToggle'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { ToastProvider } from './components/ui/toast'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <div className='min-h-screen bg-background'>
          <div className='container mx-auto py-6'>
            <div className='mb-8 flex items-center justify-between'>
              <div>
                <h1 className='text-3xl font-bold text-foreground'>Schema Generator</h1>
                <p className='mt-2 text-muted-foreground'>
                  Create and manage Schema.org structured data for better SEO
                </p>
              </div>
              <ThemeToggle />
            </div>

            <Tabs defaultValue='schemas' className='w-full'>
              <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='schemas'>Schema Generator</TabsTrigger>
                <TabsTrigger value='import-export'>Import/Export</TabsTrigger>
              </TabsList>
              <TabsContent value='schemas' className='mt-6'>
                <Schemas />
              </TabsContent>
              <TabsContent value='import-export' className='mt-6'>
                <ImportExport />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App
