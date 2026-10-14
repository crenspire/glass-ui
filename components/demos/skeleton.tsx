"use client"

import * as React from "react"
import { Skeleton } from "@/components/ui/skeleton"
import type { DemoProps } from "./registry"

export const code = `import { Skeleton } from "@/components/ui/glass/skeleton"

export function Example() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
      <Skeleton className="h-12 w-full" />
    </div>
  )
}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Demo({ material }: DemoProps) {
  return (
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-12 w-full" />
        </div>
      )
}
