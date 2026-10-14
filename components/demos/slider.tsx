"use client"

import * as React from "react"
import { Slider } from "@/components/ui/slider"
import type { DemoProps } from "./registry"

export const code = `import { Slider } from "@/components/ui/glass/slider"

export function Example() {
  return (
    <div className="space-y-4">
      <Slider defaultValue={[50]} max={100} step={1} />
    </div>
  )
}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Demo({ material }: DemoProps) {
  return (
        <div className="w-full max-w-sm space-y-4">
          <Slider material={material} defaultValue={[50]} max={100} step={1} />
        </div>
      )
}
