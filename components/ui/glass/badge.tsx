"use client"

import * as React from "react"
import { Badge as BaseBadge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { hoverEffects, type HoverEffect } from "@/lib/hover-effects"

export interface BadgeProps extends React.ComponentProps<typeof BaseBadge> {
  glow?: boolean
  hover?: HoverEffect
}

/**
 * Glass UI Badge - Enhanced badge with glassy effects and glow option
 */
export function Badge({ className, glow = false, hover = "none", ...props }: BadgeProps) {
  return (
    <BaseBadge
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

