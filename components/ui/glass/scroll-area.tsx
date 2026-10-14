"use client"

import * as React from "react"
import { ScrollArea as BaseScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

export interface ScrollAreaProps extends React.ComponentProps<typeof BaseScrollArea> {
  glow?: boolean
}

/**
 * Glass UI Scroll Area - Enhanced scroll area with glassy effects
 */
export const ScrollArea = React.forwardRef<
  React.ElementRef<typeof BaseScrollArea>,
  ScrollAreaProps
>(({ className, glow = false, ...props }, ref) => {
  return (
    <BaseScrollArea
      ref={ref}
      className={cn(
        glow && "shadow-md shadow-purple-500/20",
        className
      )}
      {...props}
    />
  )
})
ScrollArea.displayName = "ScrollArea"

export {
  ScrollBar,
}

