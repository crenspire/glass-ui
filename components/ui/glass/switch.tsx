"use client"

import * as React from "react"
import { Switch as BaseSwitch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

export interface SwitchProps extends React.ComponentProps<typeof BaseSwitch> {
  glow?: boolean
}

/**
 * Glass UI Switch - Enhanced switch with glassy effects
 */
export const Switch = React.forwardRef<
  React.ElementRef<typeof BaseSwitch>,
  SwitchProps
>(({ className, glow = false, ...props }, ref) => {
  return (
    <BaseSwitch
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
Switch.displayName = "Switch"

