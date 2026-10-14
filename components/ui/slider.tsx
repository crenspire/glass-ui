"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"
import { liquidProps, resolveVariant, type LiquidProps } from "@/lib/liquid-glass/material"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & LiquidProps & {
    variant?: "liquid" | "default"
  }
>(({ className, variant, material, tint, glass, webgl, ...props }, ref) => {
  const v = resolveVariant<"liquid" | "default">(variant, material)
  const thumbs = (props.value ?? props.defaultValue ?? [0]).length

  if (v.variant !== "liquid") {
    return (
      <SliderPrimitive.Root ref={ref} className={cn("relative flex w-full touch-none select-none items-center", className)} {...props}>
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        {Array.from({ length: thumbs }, (_, i) => (
          <SliderPrimitive.Thumb key={i} className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
        ))}
      </SliderPrimitive.Root>
    )
  }

  // Track and range are painted into the shader scene; the thumbs are glass knobs above them.
  return (
    <SliderPrimitive.Root ref={ref} className={cn("relative flex h-7 w-full touch-none select-none items-center", className)} {...props}>
      <SliderPrimitive.Track data-glass-solid="" data-layer="1" className="relative h-2 w-full grow rounded-full bg-black/12 dark:bg-white/20">
        <SliderPrimitive.Range data-glass-solid="" data-layer="1" className="absolute h-full rounded-full bg-primary" />
      </SliderPrimitive.Track>
      {Array.from({ length: thumbs }, (_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          {...liquidProps({ role: "knob", material: v.material, tint, glass, webgl }, {
            className: "block h-7 w-11 bg-white shadow-md cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          })}
        />
      ))}
    </SliderPrimitive.Root>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
