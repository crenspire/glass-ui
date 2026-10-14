"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { liquidProps, resolveVariant, type LiquidProps } from "@/lib/liquid-glass/material"
import { Button } from "@/components/ui/button"

export interface MenuBarProps extends React.HTMLAttributes<HTMLDivElement>, LiquidProps {
  variant?: "liquid" | "default"
}

const MenuBar = React.forwardRef<HTMLDivElement, MenuBarProps>(
  ({ className, variant, material, tint, glass, webgl, style, children, ...props }, ref) => {
    const v = resolveVariant<"liquid" | "default">(variant, material)
    const lg = v.variant === "liquid" ? liquidProps({ role: "bar", material: v.material, tint, glass, webgl }) : null
    
    return (
      <div
        ref={ref}
        role="menubar"
        {...lg}
        className={cn(
          "inline-flex items-center gap-1 p-1",
          lg ? lg.className : "bg-card text-card-foreground border shadow-sm rounded-md",
          className
        )}
        style={{ ...lg?.style, ...style }}
        {...props}
      >
        {children}
      </div>
    )
  }
)
MenuBar.displayName = "MenuBar"

export interface MenuBarItemProps extends React.ComponentProps<typeof Button> {
  active?: boolean
}

const MenuBarItem = React.forwardRef<HTMLButtonElement, MenuBarItemProps>(
  ({ className, active, variant = "ghost", ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        className={cn(
          "h-8 px-3 text-sm",
          active && "bg-accent text-accent-foreground",
          className
        )}
        {...props}
      />
    )
  }
)
MenuBarItem.displayName = "MenuBarItem"

export { MenuBar, MenuBarItem }

