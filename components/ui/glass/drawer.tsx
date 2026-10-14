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
        glow && "shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_0_28px_-4px_rgba(255,255,255,0.45)]",
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

