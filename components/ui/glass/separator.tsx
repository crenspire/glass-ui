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
        glow && "shadow-sm shadow-purple-500/20",
        className
      )}
      {...props}
    />
  )
})
Separator.displayName = "Separator"

