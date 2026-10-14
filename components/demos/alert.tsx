"use client"

import * as React from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info, Sparkles, Inbox, Search, Calendar as CalendarIcon } from "lucide-react"
import type { DemoProps } from "./registry"

export const code = `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/glass/alert"
import { Info } from "lucide-react"

export function Example() {
  return (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        This is an alert with glass effect.
      </AlertDescription>
    </Alert>
  )
}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Demo({ material }: DemoProps) {
  return (
        <div className="space-y-2">
          <Alert material={material}>
            <Info className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              This is an alert with glass effect.
            </AlertDescription>
          </Alert>
        </div>
      )
}
