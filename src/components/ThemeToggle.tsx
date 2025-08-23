import React from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { __ } from '../utils/functions'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'

const ThemeToggle: React.FC = () => {
  const { theme, setTheme, actualTheme } = useTheme()

  const themes = [
    {
      value: 'light' as const,
      label: __('Light'),
      icon: Sun,
    },
    {
      value: 'dark' as const,
      label: __('Dark'),
      icon: Moon,
    },
    {
      value: 'system' as const,
      label: __('System'),
      icon: Monitor,
    },
  ]

  const currentTheme = themes.find(t => t.value === theme)
  const CurrentIcon = currentTheme?.icon || Sun

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          title={__('Toggle theme')}
        >
          <CurrentIcon className="h-4 w-4" />
          <span className="sr-only">{__('Toggle theme')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {themes.map((themeOption) => {
          const Icon = themeOption.icon
          return (
            <DropdownMenuItem
              key={themeOption.value}
              onClick={() => setTheme(themeOption.value)}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <Icon className="h-4 w-4" />
              <span>{themeOption.label}</span>
              {theme === themeOption.value && (
                <div className="ml-auto h-2 w-2 rounded-full bg-primary" />
              )}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemeToggle
