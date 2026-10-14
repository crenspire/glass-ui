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
          glow && "shadow-lg shadow-purple-500/20",
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

