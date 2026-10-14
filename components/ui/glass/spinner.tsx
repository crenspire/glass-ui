"use client"

import * as React from "react"
import { Spinner as BaseSpinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import { hoverEffects, type HoverEffect } from "@/lib/hover-effects"

export interface SpinnerProps extends React.ComponentProps<typeof BaseSpinner> {
  effect?: HoverEffect
}

/**
 * Glass UI Spinner - A beautifully designed loading spinner with glassy effects
 * Built on top of the base Spinner component with enhanced visual styling
 */
export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, effect = "none", ...props }, ref) => {
    return (
      <BaseSpinner
        ref={ref}
        className={cn(
          hoverEffects({ hover: effect }),
          className
        )}
        {...props}
      />
    )
  }
)
Spinner.displayName = "Spinner"

