"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"
import { liquidProps, resolveVariant, type LiquidProps } from "@/lib/liquid-glass/material"
import { useLiquidGlass } from "@/components/ui/liquid/liquid-glass-provider"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & LiquidProps & {
    variant?: "liquid" | "default"
  }
>(({ className, variant, material, tint, glass, webgl, onCheckedChange, ...props }, ref) => {
  const v = resolveVariant<"liquid" | "default">(variant, material)
  const engine = useLiquidGlass()
  const thumb = React.useRef<HTMLSpanElement>(null)

  if (v.variant !== "liquid") {
    return (
      <SwitchPrimitives.Root
        className={cn(
          "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
          className
        )}
        onCheckedChange={onCheckedChange}
        {...props}
        ref={ref}
      >
        <SwitchPrimitives.Thumb className="pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0" />
      </SwitchPrimitives.Root>
    )
  }

  return (
    <SwitchPrimitives.Root
      className={cn(
        "group peer relative inline-flex h-8 w-[60px] shrink-0 cursor-pointer items-center rounded-full",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      onCheckedChange={(checked) => {
        // The knob turns clear and grows while it travels, like iOS.
        if (thumb.current && engine) {
          engine.press(thumb.current, true)
          setTimeout(() => thumb.current && engine.press(thumb.current, false), 380)
        }
        onCheckedChange?.(checked)
      }}
      {...props}
      ref={ref}
    >
      {/* The track is painted into the shader scene (and hidden in the DOM), so it lives on
          its own span: the root keeps its focus ring and disabled styling. */}
      <span
        aria-hidden
        data-glass-solid=""
        data-layer="1"
        className="absolute inset-0 rounded-full transition-colors duration-200 group-data-[state=unchecked]:bg-black/15 dark:group-data-[state=unchecked]:bg-white/20 group-data-[state=checked]:bg-green-500"
      />
      <SwitchPrimitives.Thumb
        ref={thumb}
        {...liquidProps({ role: "knob", material: v.material, tint, glass, webgl }, {
          className: "pointer-events-none relative block h-7 w-9 bg-white shadow-md translate-x-0.5 data-[state=checked]:translate-x-[22px] transition-[translate] duration-[450ms] ease-[cubic-bezier(.34,1.56,.64,1)]",
        })}
      />
    </SwitchPrimitives.Root>
  )
})
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
