import * as React from "react"

import { cn } from "@/lib/utils"
import { getGlassStyles, type GlassCustomization } from "@/lib/glass-utils"

function Card({ 
  className, 
  variant = "glass",
  glass,
  style,
  ...props 
}: React.ComponentProps<"div"> & {
  variant?: "default" | "glass" | "glassSubtle" | "frosted" | "fluted" | "crystal"
  glass?: GlassCustomization
}) {
  // When custom glass props are provided, use base glass-bg class and apply custom styles
  // Otherwise use the variant-specific class
  const hasCustomGlass = glass !== undefined
  
  const getVariantClass = () => {
    if (variant === "default") return "bg-card text-card-foreground border shadow-sm"
    if (hasCustomGlass) return "glass-bg text-foreground"

    const variants = {
      glass: "glass-bg text-foreground",
      glassSubtle: "glass-bg text-foreground opacity-60",
      frosted: "glass-frosted text-foreground",
      fluted: "glass-fluted text-foreground",
      crystal: "glass-crystal text-foreground",
    }
    return variants[variant] || variants.glass
  }
  
  const glassStyles = variant !== "default"
    ? getGlassStyles(glass) 
    : {}
  
  return (
    <div
      data-slot="card"
      className={cn(
        "flex flex-col gap-6 py-6",
        getVariantClass(),
        className
      )}
      style={{
        ...glassStyles,
        ...style,
      }}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
