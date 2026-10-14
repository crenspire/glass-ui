"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { liquidProps, resolveVariant, type LiquidProps } from "@/lib/liquid-glass/material"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & LiquidProps & {
    variant?: "liquid" | "default"
  }
>(({ className, variant, material, tint, glass, webgl, style, ...props }, ref) => {
  const v = resolveVariant<"liquid" | "default">(variant, material)
  const base = "peer shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
  const own = v.variant === "liquid"
    ? liquidProps({ role: "inline", material: v.material, tint, glass, webgl }, {
        className: cn(base, "size-5 rounded-md data-[state=checked]:[--lg-tint:var(--primary)] data-[state=checked]:[--lg-tint-amt:70%] data-[state=checked]:text-primary-foreground", className),
        style,
      })
    : { className: cn(base, "h-4 w-4 rounded-sm border border-primary shadow data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className), style }

  return (
    <CheckboxPrimitive.Root ref={ref} {...own} {...props}>
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current")}
      >
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }

