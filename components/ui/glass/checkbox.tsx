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
        glow && "data-[state=checked]:shadow-lg data-[state=checked]:shadow-purple-500/30",
        "transition-all duration-200",
        className
      )}
      {...props}
    />
  )
})
Checkbox.displayName = "Checkbox"

