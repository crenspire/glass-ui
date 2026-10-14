"use client"

import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { DemoProps } from "./registry"

export const code = `import { Checkbox } from "@/components/ui/glass/checkbox"
import { Label } from "@/components/ui/glass/label"

export function Example() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  )
}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Demo({ material }: DemoProps) {
  return (
        <div className="flex items-center space-x-2">
          <Checkbox material={material} id="terms" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
      )
}
