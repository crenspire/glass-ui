"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"
import { liquidProps, resolveVariant, type LiquidProps } from "@/lib/liquid-glass/material"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & LiquidProps & {
    variant?: "liquid" | "default"
  }
>(({ className, variant, material, tint, glass, webgl, style, ...props }, ref) => {
  const v = resolveVariant<"liquid" | "default">(variant, material)
  const base = "aspect-square focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
  const own = v.variant === "liquid"
    ? liquidProps({ role: "inline", material: v.material, tint, glass, webgl }, { className: cn(base, "size-5", className), style })
    : { className: cn(base, "h-4 w-4 rounded-full border border-primary shadow", className), style }

  return (
    <RadioGroupPrimitive.Item ref={ref} {...own} {...props}>
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-primary text-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }

