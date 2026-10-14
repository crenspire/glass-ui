"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/glass/button-group"
import type { DemoProps } from "./registry"

export const code = `import { ButtonGroup } from "@/components/ui/glass/button-group"
import { Button } from "@/components/ui/glass/button"

export function Example() {
  return (
    <ButtonGroup orientation="horizontal">
      <Button variant="ghost">One</Button>
      <Button variant="ghost">Two</Button>
      <Button variant="ghost">Three</Button>
    </ButtonGroup>
  )
}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Demo({ material }: DemoProps) {
  return (
        <ButtonGroup material={material} orientation="horizontal">
          <Button variant="ghost" className="cursor-pointer">One</Button>
          <Button variant="ghost" className="cursor-pointer">Two</Button>
          <Button variant="ghost" className="cursor-pointer">Three</Button>
        </ButtonGroup>
      )
}
