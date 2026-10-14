"use client"

import * as React from "react"
import {
  Sidebar as BaseSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export interface SidebarProps extends React.ComponentProps<typeof BaseSidebar> {
  glow?: boolean
}

/**
 * Glass UI Sidebar - Enhanced sidebar with glassy effects
 */
export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, variant, glow = false, ...props }, ref) => {
    return (
      <BaseSidebar
        ref={ref}
        variant={variant}
        className={cn(
          glow && "shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_0_28px_-4px_rgba(255,255,255,0.45)]",
          className
        )}
        {...props}
      />
    )
  }
)
Sidebar.displayName = "Sidebar"

export {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarItem,
}

