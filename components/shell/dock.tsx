"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { liquidProps } from "@/lib/liquid-glass/material"
import { cn } from "@/lib/utils"
import { NAV } from "./nav"

const ITEMS = NAV.filter(n => n.title !== "Docs")

/** macOS-style dock. Neighbours of the hovered icon grow a little; the active page gets a dot. */
export function Dock({ webgl }: { webgl: boolean }) {
  const pathname = (usePathname() ?? "").replace(/(.)\/$/, "$1")
  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href) || (href === "/components" && pathname.startsWith("/docs")))
  return (
    <TooltipProvider delayDuration={150}>
      <nav aria-label="Dock" {...liquidProps({ role: "bar", webgl }, { className: "dock flex items-end gap-2 px-2.5 py-2" })}>
        {ITEMS.map(({ title, href, icon: Icon }) => (
          <Tooltip key={href}>
            <TooltipTrigger asChild>
              <Button asChild size="icon" material="clear" webgl={webgl}
                className={cn("dock-item relative size-12 transition-[scale] duration-200 motion-reduce:transition-none", active(href) && "after:absolute after:-bottom-1.5 after:size-1 after:rounded-full after:bg-foreground")}>
                <Link href={href} aria-label={title} aria-current={active(href) ? "page" : undefined}><Icon className="size-5" /></Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">{title}</TooltipContent>
          </Tooltip>
        ))}
      </nav>
    </TooltipProvider>
  )
}
