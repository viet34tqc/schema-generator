import { AlertTriangle } from 'lucide-react'
import React from 'react'
import { __ } from '../../utils/functions'
import { Button } from './button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog'

interface ConfirmationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  variant?: 'default' | 'destructive'
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onOpenChange,
  title = __('Are you sure?'),
  description = __('This action cannot be undone.'),
  confirmText = __('Confirm'),
  cancelText = __('Cancel'),
  onConfirm,
  variant = 'default',
}) => {
  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader className='text-left'>
          <DialogTitle className='flex items-center space-x-3 text-lg font-semibold'>
            {variant === 'destructive' && (
              <AlertTriangle className='h-5 w-5 text-destructive flex-shrink-0' />
            )}
            <span>{title}</span>
          </DialogTitle>
          {description && (
            <div className='mt-3'>
              <p className='text-sm text-muted-foreground leading-relaxed'>{description}</p>
            </div>
          )}
        </DialogHeader>
        <div className='flex justify-end space-x-3 mt-6 pt-4 border-t border-border'>
          <Button variant='outline' onClick={handleCancel} className='min-w-[80px]'>
            {cancelText}
          </Button>
          <Button
            variant={variant === 'destructive' ? 'destructive' : 'default'}
            onClick={handleConfirm}
            className='min-w-[80px]'
          >
            {confirmText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmationDialog
