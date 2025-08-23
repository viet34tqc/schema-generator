import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import * as React from 'react'

interface DialogProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

interface DialogContextType {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DialogContext = React.createContext<DialogContextType | undefined>(undefined)

const Dialog: React.FC<DialogProps> = ({ children, open: controlledOpen, onOpenChange }) => {
  const [internalOpen, setInternalOpen] = React.useState(false)

  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const handleOpenChange = onOpenChange || setInternalOpen

  return (
    <DialogContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
      {children}
    </DialogContext.Provider>
  )
}

const DialogTrigger: React.FC<{ children: React.ReactNode; asChild?: boolean }> = ({
  children,
  asChild = false,
}) => {
  const context = React.useContext(DialogContext)
  if (!context) throw new Error('DialogTrigger must be used within Dialog')

  const handleClick = () => context.onOpenChange(true)

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...children.props,
      onClick: (e: React.MouseEvent) => {
        children.props.onClick?.(e)
        handleClick()
      },
    })
  }

  return <button onClick={handleClick}>{children}</button>
}

const DialogContent: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => {
  const context = React.useContext(DialogContext)
  if (!context) throw new Error('DialogContent must be used within Dialog')

  if (!context.open) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      {/* Backdrop */}
      <div className='fixed inset-0 bg-black/50' onClick={() => context.onOpenChange(false)} />

      {/* Dialog */}
      <div
        className={cn(
          'relative bg-background border rounded-lg shadow-lg max-w-lg w-full mx-4 max-h-[90vh] overflow-auto',
          className,
        )}
      >
        <button
          onClick={() => context.onOpenChange(false)}
          className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
        >
          <X className='h-4 w-4' />
          <span className='sr-only'>Close</span>
        </button>
        {children}
      </div>
    </div>
  )
}

const DialogHeader: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left p-6 pb-0', className)}>
    {children}
  </div>
)

const DialogTitle: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => (
  <h3 className={cn('text-lg font-semibold leading-none tracking-tight', className)}>{children}</h3>
)

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger }
