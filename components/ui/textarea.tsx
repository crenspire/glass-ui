import * as React from "react"

import { cn } from "@/lib/utils"
import { getGlassStyles, type GlassCustomization } from "@/lib/glass-utils"

function Textarea({ 
  className, 
  variant = "glass",
  glass,
  style,
  ...props 
}: React.ComponentProps<"textarea"> & {
  variant?: "default" | "glass" | "glassSubtle" | "frosted" | "fluted" | "crystal"
  glass?: GlassCustomization
}) {
  const hasCustomGlass = glass !== undefined
  
  const getVariantClass = () => {
    if (variant === "default") return "dark:bg-input/30 border-input bg-transparent shadow-xs"
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
  
  const glassStyles = variant !== "default" ? getGlassStyles(glass) : {}
  
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full rounded-md px-3 py-2 text-base transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
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

export { Textarea }
