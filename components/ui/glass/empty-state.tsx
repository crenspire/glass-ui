"use client"

import * as React from "react"
import {
  EmptyState as BaseEmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
} from "@/components/ui/empty-state"
import { cn } from "@/lib/utils"
import { hoverEffects, type HoverEffect } from "@/lib/hover-effects"

export interface EmptyStateProps extends React.ComponentProps<typeof BaseEmptyState> {
  effect?: HoverEffect
}

/**
 * Glass UI Empty State - A beautifully designed empty state component with glassy effects
 * Built on top of the base EmptyState component with enhanced visual styling
 */
export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, effect = "none", ...props }, ref) => {
    return (
      <BaseEmptyState
        ref={ref}
        className={cn(
          hoverEffects({ hover: effect }),
          className
        )}
        {...props}
      />
    )
  }
)
EmptyState.displayName = "EmptyState"

export { EmptyStateIcon, EmptyStateTitle, EmptyStateDescription }

