"use client"

import * as React from "react"
import { Card as BaseCard, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { hoverEffects, type HoverEffect } from "@/lib/hover-effects"

export interface CardProps extends React.ComponentProps<typeof BaseCard> {
  gradient?: boolean
  animated?: boolean
  hover?: HoverEffect
}

/**
 * Glass UI Card - A beautifully designed card component with glassy effects
 * Built on top of the base Card component with enhanced visual styling
 * 
 * @example
 * ```tsx
 * <Card>Regular liquid glass (default)</Card>
 * <Card material="clear">Clear glass: least frost, most refraction</Card>
 * <Card material="tinted" tint="#8b5cf6">Tinted glass</Card>
 * <Card glass={{ tint: "rgba(139, 92, 246, 0.6)", frost: 0.5 }} gradient animated>
 *   Custom tint and frost
 * </Card>
 * ```
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, gradient = false, animated = false, hover = "none", children, ...props }, ref) => {
    return (
      <BaseCard
        ref={ref}
        className={cn(
          "relative overflow-hidden",
          // A violet wash through the glass (a background utility would replace the material).
          gradient && "[--lg-tint:oklch(0.62_0.2_290)] [--lg-tint-amt:14%]",
          animated && "transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_18px_40px_-16px_var(--lg-drop)]",
          hoverEffects({ hover }),
          className
        )}
        {...props}
      >
        {children}
      </BaseCard>
    )
  }
)
Card.displayName = "Card"

export {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
}

