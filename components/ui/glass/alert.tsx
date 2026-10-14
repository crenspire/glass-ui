"use client"

import * as React from "react"
import { Alert as BaseAlert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { hoverEffects, type HoverEffect } from "@/lib/hover-effects"

export interface AlertProps extends React.ComponentProps<typeof BaseAlert> {
  glow?: boolean
  hover?: HoverEffect
}

/**
 * Glass UI Alert - Enhanced alert with glassy effects and hover animations
 * 
 * @example
 * ```tsx
 * <Alert hover="glow">
 *   <AlertTitle>Heads up!</AlertTitle>
 *   <AlertDescription>You have new notifications</AlertDescription>
 * </Alert>
 * ```
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, glow = false, hover = "none", ...props }, ref) => {
    return (
      <BaseAlert
        ref={ref}
        variant={variant}
        className={cn(
          "relative overflow-hidden",
          glow && "shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_0_28px_-4px_rgba(255,255,255,0.45)]",
          "transition-all duration-200",
          hoverEffects({ hover }),
          className
        )}
        {...props}
      />
    )
  }
)
Alert.displayName = "Alert"

export {
  AlertDescription,
  AlertTitle,
}

