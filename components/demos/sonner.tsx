"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { Info, Sparkles, Inbox, Search, Calendar as CalendarIcon } from "lucide-react"
import type { DemoProps } from "./registry"

export const code = `import { Button } from "@/components/ui/glass/button"
import { toast } from "sonner"

export function Example() {
  return (
    <div className="flex flex-col gap-3">
      <Button
        onClick={() => toast.success('Success!', {
          description: 'Your action was completed successfully'
        })}
      >
        Show Success Toast
      </Button>
      
      <Button
        onClick={() => toast.error('Error!', {
          description: 'Something went wrong'
        })}
      >
        Show Error Toast
      </Button>
      
      <Button
        onClick={() => toast('Event Created', {
          description: 'Your event has been scheduled',
          action: {
            label: 'View',
            onClick: () => console.log('View clicked'),
          },
        })}
      >
        Toast with Action
      </Button>
    </div>
  )
}

// Don't forget to add <Toaster /> to your root layout:
// import { Toaster } from "@/components/ui/glass/sonner"
// 
// export default function RootLayout({ children }) {
//   return (
//     <html>
//       <body>
//         {children}
//         <Toaster />
//       </body>
//     </html>
//   )
// }
//
// Note: All toasts automatically use glass effects!
// Success toasts have green borders, errors have red borders,
// warnings have yellow borders, and info toasts have blue borders.`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Demo({ material }: DemoProps) {
  return (
        <>
          <Alert className="mb-4">
            <Info className="h-4 w-4" />
            <AlertTitle>Glass Effects Enabled</AlertTitle>
            <AlertDescription>
              All toasts automatically use glass effects with color-coded borders (green for success, red for error, yellow for warning, blue for info).
            </AlertDescription>
          </Alert>
          <div className="flex flex-col gap-3">
            <Button
              className="cursor-pointer"
              onClick={() => toast.success('Success!', {
                description: 'Your action was completed successfully'
              })}
            >
              Show Success Toast
            </Button>
            
            <Button
              className="cursor-pointer"
              onClick={() => toast.error('Error!', {
                description: 'Something went wrong'
              })}
            >
              Show Error Toast
            </Button>
            
            <Button
              className="cursor-pointer"
              onClick={() => toast('Event Created', {
                description: 'Your event has been scheduled',
                action: {
                  label: 'View',
                  onClick: () => console.log('View clicked'),
                },
              })}
            >
              Toast with Action
            </Button>
          </div>
          <Toaster />
        </>
      )
}
