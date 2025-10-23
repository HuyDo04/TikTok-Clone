import { cn } from '../../lib/utils'
// import { Loader2Icon } from 'lucide-react' // TODO: Replace with existing icon component or install lucide-react

function Spinner({ className, ...props }) {
  return (
    <svg
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004 12.591V12m0 0v-5h.582m15.356 2A8.001 8.001 0 0120 12.591V12"></path>
    </svg>
  )
}

export { Spinner }