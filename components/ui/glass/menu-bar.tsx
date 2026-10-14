"use client"

import * as React from "react"
import { MenuBar as BaseMenuBar, MenuBarItem as BaseMenuBarItem } from "@/components/ui/menu-bar"
import { cn } from "@/lib/utils"
import { hoverEffects, type HoverEffect } from "@/lib/hover-effects"

export interface MenuBarProps extends React.ComponentProps<typeof BaseMenuBar> {
  effect?: HoverEffect
}

/**
 * Glass UI Menu Bar - A beautifully designed menu bar with glassy effects
 * Built on top of the base MenuBar component with enhanced visual styling
 */
export const MenuBar = React.forwardRef<HTMLDivElement, MenuBarProps>(
  ({ className, effect = "none", ...props }, ref) => {
    return (
      <BaseMenuBar
        ref={ref}
        className={cn(
          hoverEffects({ hover: effect }),
          className
        )}
        {...props}
      />
    )
  }
)
MenuBar.displayName = "MenuBar"

export interface MenuBarItemProps extends React.ComponentProps<typeof BaseMenuBarItem> {}

export const MenuBarItem = React.forwardRef<HTMLButtonElement, MenuBarItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseMenuBarItem
        ref={ref}
        className={className}
        {...props}
      />
    )
  }
)
MenuBarItem.displayName = "MenuBarItem"

