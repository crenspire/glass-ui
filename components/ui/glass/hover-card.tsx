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
        glow && "shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_0_28px_-4px_rgba(255,255,255,0.45)]",
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

