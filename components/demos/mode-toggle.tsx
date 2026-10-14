"use client"

import * as React from "react"
import { ModeToggle } from "@/components/ui/glass/mode-toggle"
import type { DemoProps } from "./registry"

export const code = `import { ModeToggle } from "@/components/ui/glass/mode-toggle"

export function Example() {
  return (
    <ModeToggle />
  )
}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Demo({ material }: DemoProps) {
  return (
        <div className="p-4 lg lg-regular lg-surface rounded-lg inline-block">
          <ModeToggle />
        </div>
      )
}
