import { Search } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { DropdownMenuItem } from './ui/dropdown-menu';
import { Input } from './ui/input';

import { SchemaType } from '@/types/schema';
import { __ } from '@/utils/functions';

interface InserterProps {
  items?: SchemaType[];
  group?: boolean;
  hasSearch?: boolean;
  onSelect?: (
    e: React.MouseEvent<HTMLButtonElement>,
    onToggle: () => void
  ) => void;
}

const Inserter: React.FC<InserterProps> = ({
  items = [],
  group = false,
  hasSearch = false,
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter items based on search term
  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;

    if (group) {
      // For grouped items, filter within each group
      return items
        .map(groupItem => ({
          ...groupItem,
          options: Object.entries(groupItem.options || {}).reduce(
            (acc, [key, value]) => {
              if (
                key.toLowerCase().includes(searchTerm.toLowerCase()) ||
                value.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                acc[key] = value;
              }
              return acc;
            },
            {} as Record<string, string>
          ),
        }))
        .filter(groupItem => Object.keys(groupItem.options).length > 0);
    } else {
      // For flat items, filter directly
      return items.filter(
        item =>
          item.label?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item as any).value?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }, [items, searchTerm, group]);

  const handleSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onSelect) {
      onSelect(e, () => setSearchTerm(''));
    }
  };

  if (group) {
    return (
      <div className="max-h-96 overflow-y-auto">
        {hasSearch && (
          <div className="sticky top-0 bg-background border-b border-border p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={__('Search schemas...')}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        )}

        {filteredItems.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground text-sm">
            {searchTerm ? __('No schemas found') : __('No schemas available')}
          </div>
        ) : (
          filteredItems.map((groupItem, groupIndex) => (
            <div
              key={groupIndex}
              className="border-b border-border last:border-b-0"
            >
              <div className="px-4 py-2 bg-muted text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {groupItem.label}
              </div>
              <div className="py-1">
                {Object.entries(groupItem.options || {}).map(([key, value]) => (
                  <DropdownMenuItem key={key} asChild>
                    <button
                      type="button"
                      data-value={key}
                      onClick={handleSelect}
                      className="w-full text-left cursor-pointer"
                    >
                      {value}
                    </button>
                  </DropdownMenuItem>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    );
  }

  // Flat list rendering
  return (
    <div className="max-h-96 overflow-y-auto">
      {hasSearch && (
        <div className="sticky top-0 bg-background border-b border-border p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={__('Search...')}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      )}

      {filteredItems.length === 0 ? (
        <div className="p-4 text-center text-muted-foreground text-sm">
          {searchTerm ? __('No items found') : __('No items available')}
        </div>
      ) : (
        <div className="py-1">
          {filteredItems.map((item, index) => (
            <DropdownMenuItem key={(item as any).value || index} asChild>
              <button
                type="button"
                data-value={(item as any).value}
                onClick={handleSelect}
                className="w-full text-left cursor-pointer"
              >
                {item.label}
              </button>
            </DropdownMenuItem>
          ))}
        </div>
      )}
    </div>
  );
};

export default Inserter;
