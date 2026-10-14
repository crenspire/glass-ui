"use client"

import * as React from "react"
import { ToggleGroup as BaseToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"
import type { LegacyGlassVariant } from "@/lib/liquid-glass/material"

type BaseToggleGroupProps = React.ComponentProps<typeof BaseToggleGroup>

export type ToggleGroupProps = Omit<BaseToggleGroupProps, "variant" | "className"> & {
  glow?: boolean
  variant?: "liquid" | "default" | LegacyGlassVariant
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
        glow && "shadow-md shadow-purple-500/20",
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

