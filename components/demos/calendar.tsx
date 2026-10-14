"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import type { DemoProps } from "./registry"

export const code = `import { Calendar } from "@/components/ui/glass/calendar"

export function Example() {
  return (
    <Calendar mode="single" className="rounded-md border" className="[--cell-size:--spacing(12)]" />
  )
}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Demo({ material }: DemoProps) {
  return (
        <div className="p-6 lg lg-regular lg-surface rounded-lg inline-block bg-white/10 dark:bg-white/5">
          <Calendar material={material} mode="single" />
        </div>
      )
}
