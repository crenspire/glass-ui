"use client"

import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { DemoProps } from "./registry"

export const code = `import { ScrollArea } from "@/components/ui/glass/scroll-area"

export function Example() {
  return (
    <ScrollArea className="h-[200px] w-full rounded-md border p-4">
      <div className="space-y-2">
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i} className="text-sm">Item {i + 1}</p>
        ))}
      </div>
    </ScrollArea>
  )
}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Demo({ material }: DemoProps) {
  return (
        <ScrollArea className="h-[200px] w-full rounded-md border p-4">
          <div className="space-y-2">
            {Array.from({ length: 20 }).map((_, i) => (
              <p key={i} className="text-sm">Item {i + 1}</p>
            ))}
          </div>
        </ScrollArea>
      )
}
