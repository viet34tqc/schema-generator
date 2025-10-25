import { Search } from 'lucide-react'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { DropdownMenuItem } from './ui/dropdown-menu'
import { Input } from './ui/input'

import { SchemaType } from '@/types/schema'

interface InserterProps {
  items?: SchemaType[]
  group?: boolean
  hasSearch?: boolean
  onSelect?: (e: React.MouseEvent<HTMLButtonElement>, onToggle: () => void) => void
}

const Inserter: React.FC<InserterProps> = ({
  items = [],
  group = false,
  hasSearch = false,
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Filter items based on search term
  const filteredItems = useMemo(() => {
    if (!searchTerm) return items

    if (group) {
      // For grouped items, filter within each group
      return items
        .map((groupItem) => ({
          ...groupItem,
          options: Object.entries(groupItem.options || {}).reduce(
            (acc, [key, value]) => {
              if (
                key.toLowerCase().includes(searchTerm.toLowerCase()) ||
                value.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                acc[key] = value
              }
              return acc
            },
            {} as Record<string, string>,
          ),
        }))
        .filter((groupItem) => Object.keys(groupItem.options).length > 0)
    } else {
      // For flat items, filter directly
      return items.filter(
        (item) =>
          item.label?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item as any).value?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }
  }, [items, searchTerm, group])

  const handleSelect = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onSelect) {
        onSelect(e, () => setSearchTerm(''))
      }
    },
    [onSelect],
  )

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }, [])

  // Simple focus management
  useEffect(() => {
    if (hasSearch && searchInputRef.current) {
      // Focus the input when component mounts
      const focusTimeout = setTimeout(() => {
        searchInputRef.current?.focus()
      }, 50)

      return () => {
        clearTimeout(focusTimeout)
      }
    }
  }, [hasSearch])

  const handleSearchFocus = useCallback(() => {
    // Ensure the input stays focused
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [])

  const handleContainerMouseDown = useCallback((e: React.MouseEvent) => {
    // Prevent the container from stealing focus from the search input
    const target = e.target as HTMLElement
    const searchContainer = searchInputRef.current?.closest('.sticky')

    // If clicking within the search container, don't prevent default
    if (searchContainer && searchContainer.contains(target)) {
      return
    }

    // For other areas, prevent focus loss
    if (searchInputRef.current && target !== searchInputRef.current) {
      e.preventDefault()
    }
  }, [])

  const handleSearchContainerClick = useCallback((e: React.MouseEvent) => {
    // Prevent dropdown from closing when clicking in search area
    e.stopPropagation()
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [])

  const handleSearchKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Stop propagation to prevent Radix UI from handling these events
      if (e.key !== 'Tab') {
        e.stopPropagation()
      }

      // Handle Escape key
      if (e.key === 'Escape') {
        if (searchTerm === '') {
          // Let the dropdown close
          return
        } else {
          // Clear search instead of closing dropdown
          e.preventDefault()
          setSearchTerm('')
        }
      }
    },
    [searchTerm],
  )

  const handleSearchMouseDown = useCallback((e: React.MouseEvent) => {
    // Prevent the dropdown from closing when interacting with search
    e.stopPropagation()
  }, [])

  if (group) {
    return (
      <div className='max-h-96 overflow-y-auto' onMouseDown={handleContainerMouseDown}>
        {hasSearch && (
          <div
            className='sticky top-0 bg-background border-b border-border p-3 z-10'
            onClick={handleSearchContainerClick}
            onMouseDown={handleSearchMouseDown}
          >
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
              <Input
                ref={searchInputRef}
                type='text'
                placeholder='Search schemas...'
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onKeyDown={handleSearchKeyDown}
                onMouseDown={handleSearchMouseDown}
                className='pl-10'
                autoComplete='off'
                autoFocus={hasSearch}
              />
            </div>
          </div>
        )}

        {filteredItems.length === 0 ? (
          <div className='p-4 text-center text-muted-foreground text-sm'>
            {searchTerm ? 'No schemas found' : 'No schemas available'}
          </div>
        ) : (
          filteredItems.map((groupItem, groupIndex) => (
            <div
              key={groupItem.label || groupIndex}
              className='border-b border-border last:border-b-0'
            >
              <div className='px-4 py-2 bg-muted text-xs font-medium text-muted-foreground uppercase tracking-wider'>
                {groupItem.label}
              </div>
              <div className='py-1'>
                {Object.entries(groupItem.options || {}).map(([key, value]) => (
                  <DropdownMenuItem key={key} asChild>
                    <button
                      type='button'
                      data-value={key}
                      onClick={handleSelect}
                      className='w-full text-left cursor-pointer'
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
    )
  }

  // Flat list rendering
  return (
    <div className='max-h-96 overflow-y-auto' onMouseDown={handleContainerMouseDown}>
      {hasSearch && (
        <div
          className='sticky top-0 bg-background border-b border-border p-3 z-10'
          onClick={handleSearchContainerClick}
          onMouseDown={handleSearchMouseDown}
        >
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
            <Input
              ref={searchInputRef}
              type='text'
              placeholder='Search...'
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              onKeyDown={handleSearchKeyDown}
              onMouseDown={handleSearchMouseDown}
              className='pl-10'
              autoComplete='off'
              autoFocus={hasSearch}
            />
          </div>
        </div>
      )}

      {filteredItems.length === 0 ? (
        <div className='p-4 text-center text-muted-foreground text-sm'>
          {searchTerm ? 'No items found' : 'No items available'}
        </div>
      ) : (
        <div className='py-1'>
          {filteredItems.map((item, index) => (
            <DropdownMenuItem key={(item as any).value || index} asChild>
              <button
                type='button'
                data-value={(item as any).value}
                onClick={handleSelect}
                className='w-full text-left cursor-pointer'
              >
                {item.label}
              </button>
            </DropdownMenuItem>
          ))}
        </div>
      )}
    </div>
  )
}

export default Inserter
