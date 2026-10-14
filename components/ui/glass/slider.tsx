"use client"

import * as React from "react"
import { Slider as BaseSlider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

export interface SliderProps extends React.ComponentProps<typeof BaseSlider> {
  glow?: boolean
}

/**
 * Glass UI Slider - Enhanced slider with glassy effects
 */
export const Slider = React.forwardRef<
  React.ElementRef<typeof BaseSlider>,
  SliderProps
>(({ className, glow = false, ...props }, ref) => {
  return (
    <BaseSlider
      ref={ref}
      className={cn(
        glow && "shadow-md shadow-purple-500/20",
        className
      )}
      {...props}
    />
  )
})
Slider.displayName = "Slider"

