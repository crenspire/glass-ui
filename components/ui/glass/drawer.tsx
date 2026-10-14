"use client"

import * as React from "react"
import {
  Drawer as BaseDrawer,
  DrawerClose,
  DrawerContent as BaseDrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { cn } from "@/lib/utils"

export interface DrawerContentProps extends React.ComponentProps<typeof BaseDrawerContent> {
  glow?: boolean
}

/**
 * Glass UI Drawer - Enhanced drawer with glassy effects
 */
export const DrawerContent = React.forwardRef<
  React.ElementRef<typeof BaseDrawerContent>,
  DrawerContentProps
>(({ className, variant, glow = false, ...props }, ref) => {
  return (
    <BaseDrawerContent
      ref={ref}
      variant={variant}
      className={cn(
        glow && "shadow-lg shadow-purple-500/20",
        className
      )}
      {...props}
    />
  )
})
DrawerContent.displayName = "DrawerContent"

export {
  BaseDrawer as Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}

