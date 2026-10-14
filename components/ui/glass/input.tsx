"use client"

import * as React from "react"
import { Input as BaseInput } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { hoverEffects, type HoverEffect } from "@/lib/hover-effects"

export interface InputProps extends React.ComponentProps<typeof BaseInput> {
  icon?: React.ReactNode
  error?: boolean
  hover?: HoverEffect
}

/**
 * Glass UI Input - A beautifully designed input component with glassy effects
 * Built on top of the base Input component with enhanced visual styling
 * 
 * @example
 * ```tsx
 * <Input placeholder="Enter text..." />
 * <Input material="clear" glass={{ tint: "rgba(255, 255, 255, 0.3)", frost: 0.4 }} />
 * ```
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, error, hover = "none", ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-muted-foreground pointer-events-none">
            {icon}
          </div>
        )}
        <BaseInput
          ref={ref}
          className={cn(
            "relative overflow-hidden",
            icon && "pl-10",
            error && "border-destructive focus-visible:ring-destructive",
            "transition-all duration-200 focus-visible:scale-[1.02]",
            hoverEffects({ hover }),
            className
          )}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

