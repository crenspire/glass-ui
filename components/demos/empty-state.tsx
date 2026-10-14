"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Info, Sparkles, Inbox, Search, Calendar as CalendarIcon } from "lucide-react"
import { EmptyState, EmptyStateIcon, EmptyStateTitle, EmptyStateDescription } from "@/components/ui/glass/empty-state"
import type { DemoProps } from "./registry"

export const code = `import { EmptyState, EmptyStateIcon, EmptyStateTitle, EmptyStateDescription } from "@/components/ui/glass/empty-state"
import { Button } from "@/components/ui/glass/button"
import { Inbox } from "lucide-react"

export function Example() {
  return (
    <EmptyState>
      <EmptyStateIcon>
        <Inbox className="h-12 w-12" />
      </EmptyStateIcon>
      <EmptyStateTitle>No items found</EmptyStateTitle>
      <EmptyStateDescription>
        Get started by creating a new item.
      </EmptyStateDescription>
      <Button className="mt-4">
        Create Item
      </Button>
    </EmptyState>
  )
}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Demo({ material }: DemoProps) {
  return (
        <div className="space-y-4">
          <EmptyState material={material}>
            <EmptyStateIcon>
              <Inbox className="h-12 w-12" />
            </EmptyStateIcon>
            <EmptyStateTitle>No items found</EmptyStateTitle>
            <EmptyStateDescription>
              Get started by creating a new item.
            </EmptyStateDescription>
            <Button className="mt-4 cursor-pointer">
              Create Item
            </Button>
          </EmptyState>
        </div>
      )
}
