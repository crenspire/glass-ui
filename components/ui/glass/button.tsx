"use client"

import * as React from "react"
import { Button as BaseButton } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { hoverEffects, type HoverEffect } from "@/lib/hover-effects"

export interface ButtonProps extends React.ComponentProps<typeof BaseButton> {
  effect?: HoverEffect
}

/**
 * Glass UI Button - a liquid glass capsule by default.
 *
 * @example
 * ```tsx
 * <Button>Continue</Button>
 * <Button material="clear">Clear glass</Button>
 * <Button material="tinted" tint="#3b82f6">Tinted</Button>
 * <Button glass={{ tint: "rgba(59, 130, 246, 0.6)", frost: 0.4 }}>Custom</Button>
 * ```
 */
export const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ className, effect = "none", ...props }, ref) => {
  return (
    <BaseButton
      ref={ref}
      className={cn(
        "relative overflow-hidden",
        hoverEffects({ hover: effect }),
        className
      )}
      {...props}
    />
  )
})
Button.displayName = "Button"
