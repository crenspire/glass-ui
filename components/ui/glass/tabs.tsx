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
        glow && "shadow-lg shadow-purple-500/20",
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

