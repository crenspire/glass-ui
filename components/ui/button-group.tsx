import * as React from "react"
import { cn } from "@/lib/utils"
import { liquidProps, resolveVariant, type LiquidProps } from "@/lib/liquid-glass/material"

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement>, LiquidProps {
  variant?: "liquid" | "default"
  orientation?: "horizontal" | "vertical"
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, variant, material, tint, glass, webgl, style, orientation = "horizontal", ...props }, ref) => {
    const v = resolveVariant<"liquid" | "default">(variant, material)
    const lg = v.variant === "liquid" ? liquidProps({ role: "bar", material: v.material, tint, glass, webgl }) : null
    
    return (
      <div
        ref={ref}
        role="group"
        {...lg}
        className={cn(
          "inline-flex",
          orientation === "horizontal" ? "flex-row" : "flex-col",
          lg ? lg.className : "bg-card border shadow-sm rounded-md",
          className
        )}
        style={{ ...lg?.style, ...style }}
        {...props}
      />
    )
  }
)
ButtonGroup.displayName = "ButtonGroup"

export { ButtonGroup }

