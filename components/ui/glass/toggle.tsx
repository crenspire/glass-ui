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
        glow && "data-[state=on]:shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_0_28px_-4px_rgba(255,255,255,0.45)]",
        "transition-all duration-200",
        className
      )}
      {...props}
    />
  )
})
Toggle.displayName = "Toggle"

export { toggleVariants }

