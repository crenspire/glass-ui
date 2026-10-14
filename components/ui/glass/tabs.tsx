"use client"

import * as React from "react"
import { Tabs as BaseTabs, TabsContent, TabsList as BaseTabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { hoverEffects, type HoverEffect } from "@/lib/hover-effects"

export interface TabsListProps extends React.ComponentProps<typeof BaseTabsList> {
  glow?: boolean
  hover?: HoverEffect
}

/**
 * Glass UI Tabs - Enhanced tabs with glassy effects
 */
export const TabsList = React.forwardRef<
  React.ElementRef<typeof BaseTabsList>,
  TabsListProps
>(({ className, glow = false, hover = "none", ...props }, ref) => {
  return (
    <BaseTabsList
      ref={ref}
      className={cn(
        "relative overflow-hidden",
        glow && "shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_0_28px_-4px_rgba(255,255,255,0.45)]",
        hoverEffects({ hover }),
        className
      )}
      {...props}
    />
  )
})
TabsList.displayName = "TabsList"

export {
  BaseTabs as Tabs,
  TabsContent,
  TabsTrigger,
}

