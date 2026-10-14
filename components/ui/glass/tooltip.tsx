"use client"

import * as React from "react"
import {
  Tooltip as BaseTooltip,
  TooltipContent as BaseTooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export interface TooltipContentProps extends React.ComponentProps<typeof BaseTooltipContent> {
  glow?: boolean
}

/**
 * Glass UI Tooltip - Enhanced tooltip with glassy effects
 */
export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof BaseTooltipContent>,
  TooltipContentProps
>(({ className, variant, glow = false, ...props }, ref) => {
  return (
    <BaseTooltipContent
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
TooltipContent.displayName = "TooltipContent"

export {
  BaseTooltip as Tooltip,
  TooltipTrigger,
  TooltipProvider,
}

