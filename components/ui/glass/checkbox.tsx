"use client"

import * as React from "react"
import { Checkbox as BaseCheckbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

export interface CheckboxProps extends React.ComponentProps<typeof BaseCheckbox> {
  glow?: boolean
}

/**
 * Glass UI Checkbox - Enhanced checkbox with glassy effects
 */
export const Checkbox = React.forwardRef<
  React.ElementRef<typeof BaseCheckbox>,
  CheckboxProps
>(({ className, glow = false, ...props }, ref) => {
  return (
    <BaseCheckbox
      ref={ref}
      className={cn(
        glow && "data-[state=checked]:shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_0_28px_-4px_rgba(255,255,255,0.45)]",
        "transition-all duration-200",
        className
      )}
      {...props}
    />
  )
})
Checkbox.displayName = "Checkbox"

