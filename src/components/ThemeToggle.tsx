import { useSetTheme, useTheme } from '@/hooks/useTheme'
import { Monitor, Moon, Sun } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

const ThemeToggle: React.FC = () => {
  const { theme } = useTheme()
  const { setTheme } = useSetTheme()

  const themes = [
    {
      value: 'light' as const,
      label: 'Light',
      icon: Sun,
    },
    {
      value: 'dark' as const,
      label: 'Dark',
      icon: Moon,
    },
    {
      value: 'system' as const,
      label: 'System',
      icon: Monitor,
    },
  ]

  const currentTheme = themes.find((t) => t.value === theme)
  const CurrentIcon = currentTheme?.icon || Sun

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='h-9 w-9' title='Toggle theme'>
          <CurrentIcon className='h-4 w-4' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-40'>
        {themes.map((themeOption) => {
          const Icon = themeOption.icon
          return (
            <DropdownMenuItem
              key={themeOption.value}
              onClick={() => setTheme(themeOption.value)}
              className='flex items-center space-x-2 cursor-pointer'
            >
              <Icon className='h-4 w-4' />
              <span>{themeOption.label}</span>
              {theme === themeOption.value && (
                <div className='ml-auto h-2 w-2 rounded-full bg-primary' />
              )}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemeToggle
