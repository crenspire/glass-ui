import * as React from "react"
import { cn } from "@/lib/utils"
import { liquidProps, resolveVariant, type LiquidProps } from "@/lib/liquid-glass/material"

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement>, LiquidProps {
  variant?: "liquid" | "default"
}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, variant, material, tint, glass, webgl, style, ...props }, ref) => {
    const v = resolveVariant<"liquid" | "default">(variant, material)
    const lg = v.variant === "liquid" ? liquidProps({ role: "bar", material: v.material, tint, glass, webgl }) : null
    
    return (
      <div
        ref={ref}
        {...lg}
        className={cn(
          "inline-flex items-center",
          lg ? lg.className : "bg-card border shadow-sm rounded-md",
          className
        )}
        style={{ ...lg?.style, ...style }}
        {...props}
      />
    )
  }
)
InputGroup.displayName = "InputGroup"

export { InputGroup }

