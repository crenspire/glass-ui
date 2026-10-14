"use client"

import * as React from "react"
import { Separator as BaseSeparator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export interface SeparatorProps extends React.ComponentProps<typeof BaseSeparator> {
  glow?: boolean
}

/**
 * Glass UI Separator - Enhanced separator with glassy effects
 */
export const Separator = React.forwardRef<
  React.ElementRef<typeof BaseSeparator>,
  SeparatorProps
>(({ className, glow = false, ...props }, ref) => {
  return (
    <BaseSeparator
      ref={ref}
      className={cn(
        glow && "shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_0_28px_-4px_rgba(255,255,255,0.45)]",
        className
      )}
      {...props}
    />
  )
})
Separator.displayName = "Separator"

