"use client"

import * as React from "react"
import { useDesktopFrame } from "./use-desktop-frame"
import { MenuBar } from "./menu-bar"
import { Dock } from "./dock"
import { CommandMenu } from "./command-menu"

/**
 * Desktop-size screens: a non-scrolling frame (menu bar, content, dock); content scrolls inside
 * windows, so nothing ever slides under the bar or dock and both can be WebGL glass. Smaller
 * screens: the page scrolls and the bar and dock fall back to CSS glass. Layout is CSS (the
 * `desktop:` variant), so the server HTML is already right; JS only decides the WebGL opt-in.
 */
export function AppFrame({ children }: { children: React.ReactNode }) {
  const desktop = useDesktopFrame()
  const [command, setCommand] = React.useState(false)
  return (
    <div className="flex min-h-dvh flex-col desktop:h-dvh desktop:overflow-hidden">
      <header className="sticky top-0 z-40 px-3 pt-3 desktop:static">
        <div className="mx-auto w-full max-w-[1440px]">
          <MenuBar webgl={desktop} onCommand={() => setCommand(true)} />
        </div>
      </header>
      <main className="min-h-0 flex-1 px-3 py-3 pb-28 desktop:overflow-hidden desktop:pb-3">
        <div className="desktop:h-full desktop:overflow-y-auto">{children}</div>
      </main>
      <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center pb-3 desktop:static">
        <Dock webgl={desktop} />
      </div>
      <CommandMenu open={command} onOpenChange={setCommand} />
    </div>
  )
}
