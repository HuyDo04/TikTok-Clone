'use client'

// import { useTheme } from 'next-themes' // Removed next-themes dependency
import { Toaster as Sonner } from 'sonner'

const Toaster = ({ ...props }) => {
  // const { theme = 'system' } = useTheme() // Removed useTheme usage

  return (
    <Sonner
      // theme={theme as ToasterProps['theme']} // Removed theme prop
      className="toaster group"
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        }
      }
      {...props}
    />
  )
}

export { Toaster }