"use client"

import * as React from "react"
import {
  NavigationMenu as BaseNavigationMenu,
  NavigationMenuContent as BaseNavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuIndicator,
  NavigationMenuLink,
  NavigationMenuList as BaseNavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport as BaseNavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

export interface NavigationMenuListProps extends React.ComponentProps<typeof BaseNavigationMenuList> {
  glow?: boolean
}

export interface NavigationMenuContentProps extends React.ComponentProps<typeof BaseNavigationMenuContent> {
  glow?: boolean
}

export interface NavigationMenuViewportProps extends React.ComponentProps<typeof BaseNavigationMenuViewport> {
  glow?: boolean
}

/**
 * Glass UI Navigation Menu - Enhanced navigation menu with glassy effects
 */
export const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof BaseNavigationMenuList>,
  NavigationMenuListProps
>(({ className, glow = false, ...props }, ref) => {
  return (
    <BaseNavigationMenuList
      ref={ref}
      className={cn(
        glow && "shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_0_28px_-4px_rgba(255,255,255,0.45)]",
        className
      )}
      {...props}
    />
  )
})
NavigationMenuList.displayName = "NavigationMenuList"

export const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof BaseNavigationMenuContent>,
  NavigationMenuContentProps
>(({ className, glow = false, ...props }, ref) => {
  return (
    <BaseNavigationMenuContent
      ref={ref}
      className={cn(
        glow && "shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_0_28px_-4px_rgba(255,255,255,0.45)]",
        className
      )}
      {...props}
    />
  )
})
NavigationMenuContent.displayName = "NavigationMenuContent"

export const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof BaseNavigationMenuViewport>,
  NavigationMenuViewportProps
>(({ className, glow = false, ...props }, ref) => {
  return (
    <BaseNavigationMenuViewport
      ref={ref}
      className={cn(
        glow && "shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_0_28px_-4px_rgba(255,255,255,0.45)]",
        className
      )}
      {...props}
    />
  )
})
NavigationMenuViewport.displayName = "NavigationMenuViewport"

export {
  BaseNavigationMenu as NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuTrigger,
}

