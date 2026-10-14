"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { liquidProps, resolveVariant, type LiquidProps } from "@/lib/liquid-glass/material"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement>, LiquidProps {
  variant?: "liquid" | "default"
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, variant, material, tint, glass, webgl, style, ...props }, ref) => {
    const v = resolveVariant<"liquid" | "default">(variant, material)
    // Liquid sidebars float inset from the viewport edge, Apple-style.
    const own = v.variant === "liquid"
      ? liquidProps({ role: "surface", material: v.material, tint, glass, webgl }, { className: cn("m-2 flex h-[calc(100vh-1rem)] w-64 flex-col", className), style })
      : { className: cn("flex h-screen w-64 flex-col bg-sidebar text-sidebar-foreground border-r", className), style }

    return <aside ref={ref} {...own} {...props} />
  }
)
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex h-16 items-center border-b px-6", className)}
    {...props}
  />
))
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-y-auto px-4 py-4", className)}
    {...props}
  />
))
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex h-16 items-center border-t px-6", className)}
    {...props}
  />
))
SidebarFooter.displayName = "SidebarFooter"

const SidebarItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    active?: boolean
  }
>(({ className, active, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
      active
        ? "bg-sidebar-accent text-sidebar-accent-foreground"
        : "hover:bg-sidebar-accent/50",
      className
    )}
    {...props}
  />
))
SidebarItem.displayName = "SidebarItem"

export { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarItem }

