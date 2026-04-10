import * as React from "react"
import { cn } from "@/lib/utils"
import { getGlassStyles, type GlassCustomization } from "@/lib/glass-utils"

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "glassSubtle" | "frosted" | "fluted" | "crystal"
  orientation?: "horizontal" | "vertical"
  glass?: GlassCustomization
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, variant = "glass", orientation = "horizontal", glass, ...props }, ref) => {
    const hasCustomGlass = glass !== undefined
    
    const getVariantClass = () => {
      if (variant === "default") return "bg-card border shadow-sm"
      if (hasCustomGlass) return "glass-bg"
      
      const variants = {
        glass: "glass-bg",
        glassSubtle: "glass-bg opacity-60",
        frosted: "glass-frosted",
        fluted: "glass-fluted",
        crystal: "glass-crystal",
      }
      return variants[variant] || variants.glass
    }
    
    const glassStyles = variant !== "default" ? getGlassStyles(glass) : {}
    
    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          "inline-flex rounded-md",
          orientation === "horizontal" ? "flex-row" : "flex-col",
          getVariantClass(),
          className
        )}
        style={{
          ...glassStyles,
        }}
        {...props}
      />
    )
  }
)
ButtonGroup.displayName = "ButtonGroup"

export { ButtonGroup }

