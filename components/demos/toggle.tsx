"use client"

import * as React from "react"
import { Toggle } from "@/components/ui/toggle"
import { Info, Sparkles, Inbox, Search, Calendar as CalendarIcon } from "lucide-react"
import type { DemoProps } from "./registry"

export const code = `import { Toggle } from "@/components/ui/glass/toggle"
import { Sparkles } from "lucide-react"

export function Example() {
  return (
    <div className="flex gap-2">
      <Toggle aria-label="Toggle italic">
        <Sparkles className="h-4 w-4" />
      </Toggle>
      <Toggle variant="default" aria-label="Toggle bold">
        Bold
      </Toggle>
    </div>
  )
}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Demo({ material }: DemoProps) {
  return (
        <div className="flex gap-2">
          <Toggle material={material} aria-label="Toggle italic">
            <Sparkles className="h-4 w-4" />
          </Toggle>
          <Toggle material={material} variant="default" aria-label="Toggle bold">
            Bold
          </Toggle>
        </div>
      )
}
