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
        glow && "data-[state=checked]:shadow-lg data-[state=checked]:shadow-purple-500/30",
        "transition-all duration-200",
        className
      )}
      {...props}
    />
  )
})
Switch.displayName = "Switch"

