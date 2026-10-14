"use client"

import * as React from "react"
import {
  Sheet as BaseSheet,
  SheetClose,
  SheetContent as BaseSheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export interface SheetContentProps extends React.ComponentProps<typeof BaseSheetContent> {
  glow?: boolean
}

/**
 * Glass UI Sheet - Enhanced sheet with glassy effects
 */
export const SheetContent = React.forwardRef<
  React.ElementRef<typeof BaseSheetContent>,
  SheetContentProps
>(({ className, variant, glow = false, ...props }, ref) => {
  return (
    <BaseSheetContent
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
SheetContent.displayName = "SheetContent"

export {
  BaseSheet as Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}

