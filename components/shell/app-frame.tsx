"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useDesktopFrame } from "./use-desktop-frame"
import { MenuBar } from "./menu-bar"
import { Dock } from "./dock"
import { CommandMenu } from "./command-menu"

/**
 * Desktop-size screens: a non-scrolling frame (menu bar, content, dock); content scrolls inside
 * windows, so nothing ever slides under the bar or dock and both can be WebGL glass. Smaller
 * screens: the page scrolls and the bar and dock fall back to CSS glass.
 */
export function AppFrame({ children }: { children: React.ReactNode }) {
  const desktop = useDesktopFrame()
  const [command, setCommand] = React.useState(false)
  return (
    <div className={cn("flex flex-col", desktop ? "h-dvh overflow-hidden" : "min-h-dvh")}>
      <header className={cn("z-40 px-3 pt-3", !desktop && "sticky top-0")}>
        <MenuBar webgl={desktop} onCommand={() => setCommand(true)} />
      </header>
      <main className={cn("min-h-0 flex-1 px-3 py-3", desktop ? "overflow-hidden" : "pb-28")}>
        <div className={cn(desktop && "h-full overflow-y-auto")}>{children}</div>
      </main>
      <footer className={cn("z-40 flex justify-center pb-3", !desktop && "fixed inset-x-0 bottom-0")}>
        <Dock webgl={desktop} />
      </footer>
      <CommandMenu open={command} onOpenChange={setCommand} />
    </div>
  )
}
