"use client"

import * as React from "react"
import { ToggleGroup as BaseToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

type BaseToggleGroupProps = React.ComponentProps<typeof BaseToggleGroup>

export type ToggleGroupProps = Omit<BaseToggleGroupProps, "variant" | "className"> & {
  glow?: boolean
  variant?: "liquid" | "default"
  className?: string
}

/**
 * Glass UI Toggle Group - Enhanced toggle group with glassy effects
 */
export const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof BaseToggleGroup>,
  ToggleGroupProps
>(({ className, glow = false, ...props }, ref) => {
  return (
    <BaseToggleGroup
      ref={ref}
      className={cn(
        glow && "shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_0_28px_-4px_rgba(255,255,255,0.45)]",
        className
      )}
      {...(props as BaseToggleGroupProps)}
    />
  )
})
ToggleGroup.displayName = "ToggleGroup"

export {
  ToggleGroupItem,
}

