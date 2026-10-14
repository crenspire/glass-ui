"use client"

import * as React from "react"
import {
  Select as BaseSelect,
  SelectContent as BaseSelectContent,
  SelectItem,
  SelectTrigger as BaseSelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export interface SelectTriggerProps extends React.ComponentProps<typeof BaseSelectTrigger> {
  glow?: boolean
}

export interface SelectContentProps extends React.ComponentProps<typeof BaseSelectContent> {
  glow?: boolean
}

/**
 * Glass UI Select - Enhanced select with glassy effects
 */
export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof BaseSelectTrigger>,
  SelectTriggerProps
>(({ className, variant, glow = false, ...props }, ref) => {
  return (
    <BaseSelectTrigger
      ref={ref}
      variant={variant}
      className={cn(
        glow && "shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_0_28px_-4px_rgba(255,255,255,0.45)]",
        "transition-all duration-200",
        className
      )}
      {...props}
    />
  )
})
SelectTrigger.displayName = "SelectTrigger"

export const SelectContent = React.forwardRef<
  React.ElementRef<typeof BaseSelectContent>,
  SelectContentProps
>(({ className, variant, glow = false, ...props }, ref) => {
  return (
    <BaseSelectContent
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
SelectContent.displayName = "SelectContent"

export {
  BaseSelect as Select,
  SelectValue,
  SelectItem,
}

