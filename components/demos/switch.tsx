"use client"

import * as React from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import type { DemoProps } from "./registry"

export const code = `import { Switch } from "@/components/ui/glass/switch"
import { Label } from "@/components/ui/glass/label"

export function Example() {
  return (
    <div className="flex items-center space-x-2">
      <Switch />
      <Label>Enable notifications</Label>
    </div>
  )
}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Demo({ material }: DemoProps) {
  return (
        <div className="flex items-center space-x-2">
          <Switch material={material} />
          <Label>Enable notifications</Label>
        </div>
      )
}
