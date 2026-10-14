"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { liquidProps, resolveVariant, type LiquidProps } from "@/lib/liquid-glass/material"

const toggleVariants = cva(
  "inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        liquid: "data-[state=on]:text-primary data-[state=on]:[--lg-tint:var(--primary)] data-[state=on]:[--lg-tint-amt:22%]",
        default: "rounded-md bg-transparent hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
        outline:
          "rounded-md border border-input bg-transparent hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
      },
      size: {
        default: "h-11 px-4",
        sm: "h-9 px-3",
        lg: "h-13 px-5",
      },
    },
    defaultVariants: {
      variant: "liquid",
      size: "default",
    },
  }
)

type ToggleVariant = NonNullable<VariantProps<typeof toggleVariants>["variant"]>

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    Omit<VariantProps<typeof toggleVariants>, "variant"> &
    LiquidProps & { variant?: ToggleVariant | null }
>(({ className, variant, size, material, tint, glass, webgl, style, ...props }, ref) => {
  const v = resolveVariant<ToggleVariant>(variant ?? undefined, material)
  const lg = v.variant === "liquid" ? liquidProps({ role: "control", material: v.material, tint, glass, webgl }) : null
  return (
    <TogglePrimitive.Root
      ref={ref}
      {...lg}
      className={cn(toggleVariants({ variant: v.variant, size }), lg?.className, className)}
      style={{ ...lg?.style, ...style }}
      {...props}
    />
  )
})

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }

