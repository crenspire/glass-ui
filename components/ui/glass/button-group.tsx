"use client"

import * as React from "react"
import { ButtonGroup as BaseButtonGroup } from "@/components/ui/button-group"
import { cn } from "@/lib/utils"
import { hoverEffects, type HoverEffect } from "@/lib/hover-effects"

export interface ButtonGroupProps extends React.ComponentProps<typeof BaseButtonGroup> {
  effect?: HoverEffect
}

/**
 * Glass UI Button Group - A beautifully designed button group with glassy effects
 * Built on top of the base ButtonGroup component with enhanced visual styling
 */
export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, effect = "none", ...props }, ref) => {
    return (
      <BaseButtonGroup
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
ButtonGroup.displayName = "ButtonGroup"

