import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight } from 'lucide-react';
import React, { ReactNode, useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';

interface PanelProps {
  title: string;
  description?: string;
  children: ReactNode;
  defaultOpen?: boolean;
  collapsible?: boolean;
  className?: string;
}

const Panel: React.FC<PanelProps> = ({
  title,
  description,
  children,
  defaultOpen = true,
  collapsible = true,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleOpen = () => {
    if (collapsible) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader
        className={cn(
          'pb-3',
          collapsible && 'cursor-pointer hover:bg-muted/50 transition-colors'
        )}
        onClick={toggleOpen}
      >
        <div className="flex items-center space-x-3">
          {collapsible && (
            <div className="flex-shrink-0">
              {isOpen ? (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-lg font-medium">{title}</h3>
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        </div>
      </CardHeader>

      {isOpen && <CardContent className="pt-0">{children}</CardContent>}
    </Card>
  );
};

export default Panel;
