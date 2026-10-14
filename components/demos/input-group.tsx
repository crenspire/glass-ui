"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Info, Sparkles, Inbox, Search, Calendar as CalendarIcon } from "lucide-react"
import { InputGroup } from "@/components/ui/glass/input-group"
import type { DemoProps } from "./registry"

export const code = `import { InputGroup } from "@/components/ui/glass/input-group"
import { Input } from "@/components/ui/glass/input"
import { Button } from "@/components/ui/glass/button"
import { Search } from "lucide-react"

export function Example() {
  return (
    <InputGroup>
      <Input placeholder="Search..." className="border-0 rounded-r-none" />
      <Button variant="ghost" size="icon" className="rounded-l-none">
        <Search className="h-4 w-4" />
      </Button>
    </InputGroup>
  )
}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Demo({ material }: DemoProps) {
  return (
        <div className="space-y-8">
          <InputGroup material={material}>
            <Input placeholder="Search..." className="border-0 rounded-r-none" />
            <Button variant="ghost" size="icon" className="rounded-l-none cursor-pointer">
              <Search className="h-4 w-4" />
            </Button>
          </InputGroup>
          <InputGroup material={material}>
            <Input placeholder="Email" type="email" className="border-0 rounded-r-none" />
            <Button variant="ghost" size="icon" className="rounded-l-none cursor-pointer">
              <Info className="h-4 w-4" />
            </Button>
          </InputGroup>
        </div>
      )
}
