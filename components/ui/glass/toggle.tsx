"use client"

import * as React from "react"
import { Toggle as BaseToggle, toggleVariants } from "@/components/ui/toggle"
import { cn } from "@/lib/utils"

export interface ToggleProps extends React.ComponentProps<typeof BaseToggle> {
  glow?: boolean
}

/**
 * Glass UI Toggle - Enhanced toggle with glassy effects
 */
export const Toggle = React.forwardRef<
  React.ElementRef<typeof BaseToggle>,
  ToggleProps
>(({ className, variant, glow = false, ...props }, ref) => {
  return (
    <BaseToggle
      ref={ref}
      variant={variant}
      className={cn(
        glow && "data-[state=on]:shadow-lg data-[state=on]:shadow-purple-500/30",
        "transition-all duration-200",
        className
      )}
      {...props}
    />
  )
})
Toggle.displayName = "Toggle"

export { toggleVariants }

