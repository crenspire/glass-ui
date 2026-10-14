"use client"

import * as React from "react"
import { Carousel as BaseCarousel } from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { hoverEffects, type HoverEffect } from "@/lib/hover-effects"

export interface CarouselProps extends React.ComponentProps<typeof BaseCarousel> {
  effect?: HoverEffect
}

/**
 * Glass UI Carousel - A beautifully designed carousel with glassy effects
 * Built on top of the base Carousel component with enhanced visual styling
 */
export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ className, effect = "none", ...props }, ref) => {
    return (
      <BaseCarousel
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
Carousel.displayName = "Carousel"

