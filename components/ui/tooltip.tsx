"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"
import { liquidProps, resolveVariant, type LiquidProps } from "@/lib/liquid-glass/material"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & LiquidProps & {
    variant?: "liquid" | "default"
  }
>(({ className, variant, material, tint, glass, webgl, style, ...props }, ref) => {
  const v = resolveVariant<"liquid" | "default">(variant, material)
  const lg = v.variant === "liquid" ? liquidProps({ role: "overlay", material: v.material, tint, glass, webgl }, { className: "rounded-full text-xs" }) : null
  
  return (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={4}
      {...lg}
      style={{ ...lg?.style, ...style }}
      className={cn(
        "z-50 overflow-hidden px-3 py-1.5 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        lg ? lg.className : "bg-primary text-primary-foreground rounded-md text-sm shadow-md",
        className
      )}
      {...props}
    />
  )
})
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

