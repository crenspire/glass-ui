"use client"

import * as React from "react"
import {
  ChartContainer as BaseChartContainer,
  ChartTooltip,
  ChartTooltipContent as BaseChartTooltipContent,
  ChartLegend,
  ChartLegendContent as BaseChartLegendContent,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import type { ChartConfig } from "@/components/ui/chart"

export interface ChartContainerProps extends React.ComponentProps<typeof BaseChartContainer> {
  glow?: boolean
}

export interface ChartTooltipContentProps extends React.ComponentProps<typeof BaseChartTooltipContent> {
  glow?: boolean
}

export interface ChartLegendContentProps extends React.ComponentProps<typeof BaseChartLegendContent> {
  glow?: boolean
}

/**
 * Glass UI Chart - Enhanced chart components with glassy effects
 */
export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  ChartContainerProps
>(({ className, variant, glow = false, ...props }, ref) => {
  return (
    <BaseChartContainer
      ref={ref}
      variant={variant}
      className={cn(
        glow && "shadow-lg shadow-purple-500/20",
        className
      )}
      {...props}
    />
  )
})
ChartContainer.displayName = "ChartContainer"

export const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  ChartTooltipContentProps
>(({ className, variant, glow = false, ...props }, ref) => {
  return (
    <BaseChartTooltipContent
      ref={ref}
      variant={variant}
      className={cn(
        glow && "shadow-lg shadow-purple-500/30",
        className
      )}
      {...props}
    />
  )
})
ChartTooltipContent.displayName = "ChartTooltipContent"

export const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  ChartLegendContentProps
>(({ className, variant, glow = false, ...props }, ref) => {
  return (
    <BaseChartLegendContent
      ref={ref}
      variant={variant}
      className={cn(
        glow && "shadow-md shadow-purple-500/20",
        className
      )}
      {...props}
    />
  )
})
ChartLegendContent.displayName = "ChartLegendContent"

export {
  ChartTooltip,
  ChartLegend,
}

export type { ChartConfig }

