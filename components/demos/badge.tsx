"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import type { DemoProps } from "./registry"

export const code = `import { Badge } from "@/components/ui/glass/badge"

export function Example() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Glass Badge</Badge>
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  )
}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Demo({ material }: DemoProps) {
  return (
        <div className="flex flex-wrap gap-2">
          <Badge material={material}>Glass Badge</Badge>
          <Badge material={material} variant="default">Default</Badge>
          <Badge material={material} variant="secondary">Secondary</Badge>
          <Badge material={material} variant="destructive">Destructive</Badge>
        </div>
      )
}
