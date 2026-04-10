import * as React from "react"
import { cn } from "@/lib/utils"
import { getGlassStyles, type GlassCustomization } from "@/lib/glass-utils"

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "glassSubtle" | "frosted" | "fluted" | "crystal"
  glass?: GlassCustomization
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, variant = "glass", glass, children, ...props }, ref) => {
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
    
    const glassStyles = variant !== "default" ? getGlassStyles(glass) : {}
    
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center rounded-xl p-12 text-center",
          getVariantClass(),
          className
        )}
        style={{
          ...glassStyles,
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)
EmptyState.displayName = "EmptyState"

function EmptyStateIcon({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mb-4 text-muted-foreground", className)}
      {...props}
    />
  )
}

function EmptyStateTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-lg font-semibold text-foreground mb-2", className)}
      {...props}
    />
  )
}

function EmptyStateDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-muted-foreground max-w-sm", className)}
      {...props}
    />
  )
}

export { EmptyState, EmptyStateIcon, EmptyStateTitle, EmptyStateDescription }

