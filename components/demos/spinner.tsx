"use client"

import * as React from "react"
import { Spinner } from "@/components/ui/glass/spinner"
import type { DemoProps } from "./registry"

export const code = `import { Spinner } from "@/components/ui/glass/spinner"

export function Example() {
  return (
    <div className="flex items-center gap-4">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  )
}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Demo({ material }: DemoProps) {
  return (
        <div className="flex items-center gap-4 p-6 lg lg-regular lg-surface rounded-lg bg-white/10 dark:bg-white/5">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
          <Spinner size="md" />
          <Spinner size="md" />
        </div>
      )
}
