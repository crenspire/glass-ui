"use client"

import * as React from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { DemoProps } from "./registry"

export const code = `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/glass/toggle-group"

export function Example() {
  return (
    <ToggleGroup type="single">
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b">B</ToggleGroupItem>
      <ToggleGroupItem value="c">C</ToggleGroupItem>
    </ToggleGroup>
  )
}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Demo({ material }: DemoProps) {
  return (
        <div className="p-4 lg lg-regular lg-surface rounded-lg inline-block">
          <ToggleGroup material={material} type="single" defaultValue="b">
            <ToggleGroupItem value="a" className="cursor-pointer">A</ToggleGroupItem>
            <ToggleGroupItem value="b" className="cursor-pointer">B</ToggleGroupItem>
            <ToggleGroupItem value="c" className="cursor-pointer">C</ToggleGroupItem>
          </ToggleGroup>
        </div>
      )
}
