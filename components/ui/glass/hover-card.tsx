"use client"

import * as React from "react"
import {
  HoverCard as BaseHoverCard,
  HoverCardContent as BaseHoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { cn } from "@/lib/utils"

export interface HoverCardContentProps extends React.ComponentProps<typeof BaseHoverCardContent> {
  glow?: boolean
}

/**
 * Glass UI Hover Card - Enhanced hover card with glassy effects
 */
export const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof BaseHoverCardContent>,
  HoverCardContentProps
>(({ className, variant, glow = false, ...props }, ref) => {
  return (
    <BaseHoverCardContent
      ref={ref}
      variant={variant}
      className={cn(
        glow && "shadow-lg shadow-purple-500/30",
        className
      )}
      {...props}
    />
  )
})
HoverCardContent.displayName = "HoverCardContent"

export {
  BaseHoverCard as HoverCard,
  HoverCardTrigger,
}

