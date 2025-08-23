import React from 'react';
import { ExternalLink } from 'lucide-react';
import { __ } from '../../utils/functions';

interface GoogleDocsProps {
  field: {
    id: string;
    type: string;
    url: string;
    show?: boolean;
  };
  value?: any;
  onChange?: (value: any) => void;
  schemaId?: string;
}

const GoogleDocs: React.FC<GoogleDocsProps> = ({ field }) => {
  if (!field.show) {
    return null;
  }

  return (
    <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <a
        href={field.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
      >
        {__('Google documentation')}
        <ExternalLink className="ml-1 h-4 w-4" />
      </a>
    </div>
  );
};

export default GoogleDocs;
