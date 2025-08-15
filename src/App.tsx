import { useEffect } from 'react';
import Schemas from './components/Schemas';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { SchemaLinkProvider } from './contexts/SchemaLinkContext';
import ImportExport from './components/ImportExport';

function App() {
  useEffect(() => {
    // Prevent form submission on Enter key press (like the original WordPress plugin)
    const handleKeyPress = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (e.keyCode === 13 && target.tagName === 'INPUT') {
        e.preventDefault();
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('keyup', handleKeyPress);

    return () => {
      document.removeEventListener('keypress', handleKeyPress);
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('keyup', handleKeyPress);
    };
  }, []);

  return (
    <SchemaLinkProvider>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Schema Generator
            </h1>
            <p className="mt-2 text-muted-foreground">
              Create and manage Schema.org structured data for better SEO
            </p>
          </div>

          <Tabs defaultValue="schemas" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="schemas">Schema Generator</TabsTrigger>
              <TabsTrigger value="import-export">Import/Export</TabsTrigger>
            </TabsList>
            <TabsContent value="schemas" className="mt-6">
              <Schemas />
            </TabsContent>
            <TabsContent value="import-export" className="mt-6">
              <ImportExport />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SchemaLinkProvider>
  );
}

export default App;
