"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import type { DemoProps } from "./registry"

export const code = `import { Input } from "@/components/ui/glass/input"

export function Example() {
  return (
    <div className="space-y-2">
      <Input placeholder="Enter text..." />
      <Input variant="default" placeholder="Default input" />
    </div>
  )
}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Demo({ material }: DemoProps) {
  return (
        <div className="space-y-2">
          <Input material={material} placeholder="Enter text..." />
          <Input material={material} variant="default" placeholder="Default input" />
        </div>
      )
}
