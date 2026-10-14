"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import type { DemoProps } from "./registry"

export const code = `import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/glass/collapsible"
import { Button } from "@/components/ui/glass/button"

export function Example() {
  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button variant="outline">Toggle</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="space-y-2">
          <p className="text-sm">This is collapsible content.</p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Demo({ material }: DemoProps) {
  return (
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="cursor-pointer">Toggle</Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-2">
              <p className="text-sm">This is collapsible content.</p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )
}
