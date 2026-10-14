"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import type { DemoProps } from "./registry"

export const code = `import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/glass/sheet"
import { Button } from "@/components/ui/glass/button"

export function Example() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Demo({ material }: DemoProps) {
  return (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="cursor-pointer">Open Sheet</Button>
          </SheetTrigger>
          <SheetContent material={material}>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you&apos;re done.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      )
}
