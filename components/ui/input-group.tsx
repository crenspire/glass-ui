import * as React from "react"
import { cn } from "@/lib/utils"
import { getGlassStyles, type GlassCustomization } from "@/lib/glass-utils"

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "glassSubtle" | "frosted" | "fluted" | "crystal"
  glass?: GlassCustomization
}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, variant = "glass", glass, ...props }, ref) => {
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
        className={cn(
          "inline-flex items-center rounded-md",
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
InputGroup.displayName = "InputGroup"

export { InputGroup }

