"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"
import { liquidProps, resolveVariant, type LiquidProps } from "@/lib/liquid-glass/material"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & LiquidProps & {
    variant?: "liquid" | "default"
  }
>(({ className, align = "center", sideOffset = 4, variant, material, tint, glass, webgl, style, ...props }, ref) => {
  const v = resolveVariant<"liquid" | "default">(variant, material)
  const lg = v.variant === "liquid" ? liquidProps({ role: "overlay", material: v.material, tint, glass, webgl }) : null
  
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        {...lg}
        style={{ ...lg?.style, ...style }}
        className={cn(
          "z-50 w-72 p-4 outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          lg ? lg.className : "bg-popover text-popover-foreground border rounded-md shadow-md",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
})
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }

