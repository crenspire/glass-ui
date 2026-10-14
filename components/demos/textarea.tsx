"use client"

import * as React from "react"
import { Textarea } from "@/components/ui/textarea"
import type { DemoProps } from "./registry"

export const code = `import { Textarea } from "@/components/ui/glass/textarea"

export function Example() {
  return (
    <Textarea placeholder="Type your message here." />
  )
}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Demo({ material }: DemoProps) {
  return (
        <Textarea material={material} placeholder="Type your message here." />
      )
}
