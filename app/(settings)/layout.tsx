"use client"

import * as React from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/glass"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { SettingsSidebar } from "@/components/settings/sidebar"
import { SettingsWindow } from "@/components/settings/window"
import { useDesktopFrame } from "@/components/shell/use-desktop-frame"

/** System Settings: a sidebar window beside a scrolling detail column of tiles. */
export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const desktop = useDesktopFrame()
  const [open, setOpen] = React.useState(false)
  if (!desktop) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild><Button size="sm" className="self-start"><Menu className="size-4" />Browse</Button></SheetTrigger>
          <SheetContent side="left" className="w-[300px] p-0"><SheetTitle className="sr-only">Docs</SheetTitle><SettingsSidebar onNavigate={() => setOpen(false)} /></SheetContent>
        </Sheet>
        {children}
      </div>
    )
  }
  return (
    <div className="mx-auto flex h-full max-w-7xl gap-4">
      <SettingsWindow className="w-64 shrink-0"><SettingsSidebar /></SettingsWindow>
      <div className="min-w-0 flex-1 overflow-y-auto pr-1">
        <div className="flex flex-col gap-4 pb-4">{children}</div>
      </div>
    </div>
  )
}
