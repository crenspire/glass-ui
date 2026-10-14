"use client"

import * as React from "react"
import {
  Popover as BasePopover,
  PopoverContent as BasePopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export interface PopoverContentProps extends React.ComponentProps<typeof BasePopoverContent> {
  glow?: boolean
}

/**
 * Glass UI Popover - Enhanced popover with glassy effects
 */
export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof BasePopoverContent>,
  PopoverContentProps
>(({ className, variant, glow = false, ...props }, ref) => {
  return (
    <BasePopoverContent
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
PopoverContent.displayName = "PopoverContent"

export {
  BasePopover as Popover,
  PopoverTrigger,
}

