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
        glow && "shadow-lg shadow-purple-500/30",
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

