"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import type { DemoProps } from "./registry"

export const code = `import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/glass/hover-card"
import { Button } from "@/components/ui/glass/button"

export function Example() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Demo({ material }: DemoProps) {
  return (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link" className="cursor-pointer">@nextjs</Button>
          </HoverCardTrigger>
          <HoverCardContent material={material} className="w-80">
            <div className="flex justify-between space-x-4">
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@nextjs</h4>
                <p className="text-sm">
                  The React Framework – created and maintained by @vercel.
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      )
}
