"use client"

import * as React from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/glass"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { SettingsSidebar } from "./sidebar"
import { SettingsWindow } from "./window"

/**
 * System Settings: a sidebar window beside a scrolling detail column. The switch to the phone
 * layout (a Browse sheet) is CSS-only, so the page keeps its place in the tree and its state.
 */
export function SettingsLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 desktop:h-full desktop:max-w-7xl desktop:flex-row">
      <div className="desktop:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild><Button size="sm"><Menu className="size-4" />Browse</Button></SheetTrigger>
          <SheetContent side="left" className="w-[300px] p-0">
            <SheetTitle className="sr-only">Docs</SheetTitle>
            <SettingsSidebar onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
      <SettingsWindow className="hidden w-64 shrink-0 desktop:flex"><SettingsSidebar /></SettingsWindow>
      <div className="min-w-0 flex-1 desktop:overflow-y-auto desktop:pr-1">
        <div className="flex flex-col gap-4 pb-4">{children}</div>
      </div>
    </div>
  )
}
