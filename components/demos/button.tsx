"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import type { DemoProps } from "./registry"

export const code = `import { Button } from "@/components/ui/glass/button"

export function Example() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button>Glass Button</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="default">Default</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  )
}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Demo({ material }: DemoProps) {
  return (
        <div className="flex flex-wrap gap-2">
          <Button material={material} className="cursor-pointer">Glass Button</Button>
          <Button material={material} variant="outline" className="cursor-pointer">Outline</Button>
          <Button material={material} variant="default" className="cursor-pointer">Default</Button>
          <Button material={material} variant="ghost" className="cursor-pointer">Ghost</Button>
          <Button material={material} variant="destructive" className="cursor-pointer">Destructive</Button>
        </div>
      )
}
