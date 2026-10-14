"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"

import { cn } from "@/lib/utils"
import { liquidProps, resolveVariant, type LiquidProps } from "@/lib/liquid-glass/material"

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & LiquidProps & {
    variant?: "liquid" | "default"
  }
>(({ className, variant, material, tint, glass, webgl, style, ...props }, ref) => {
  const v = resolveVariant<"liquid" | "default">(variant, material)
  const lg = v.variant === "liquid" ? liquidProps({ role: "bar", material: v.material, tint, glass, webgl }, { className: "p-1" }) : null
  
  return (
    <ToggleGroupPrimitive.Root
      ref={ref}
      {...lg}
      style={{ ...lg?.style, ...style }}
      className={cn("inline-flex items-center justify-center", lg ? lg.className : "rounded-md", className)}
      {...props}
    />
  )
})

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <ToggleGroupPrimitive.Item
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-sm px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      // Inactive state - transparent, blends with background
      "text-muted-foreground",
      // Active state - lighter, more opaque background with shadow (same as tabs)
      "data-[state=on]:bg-white/80 dark:data-[state=on]:bg-white/20",
      "data-[state=on]:text-foreground",
      "data-[state=on]:shadow-[0_1px_3px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.5)]",
      "dark:data-[state=on]:shadow-[0_2px_6px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.15),inset_0_0_8px_rgba(255,255,255,0.1)]",
      "hover:bg-accent/50 hover:text-accent-foreground",
      className
    )}
    {...props}
  />
))

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }

