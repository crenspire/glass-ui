import * as React from "react"
import { cn } from "@/lib/utils"
import { liquidProps, resolveVariant, type LiquidProps } from "@/lib/liquid-glass/material"

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement>, LiquidProps {
  variant?: "liquid" | "default"
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, variant, material, tint, glass, webgl, style, children, ...props }, ref) => {
    const v = resolveVariant<"liquid" | "default">(variant, material)
    const base = "flex flex-col items-center justify-center p-12 text-center"
    const own = v.variant === "liquid"
      ? liquidProps({ role: "surface", material: v.material, tint, glass, webgl }, { className: cn(base, className), style })
      : { className: cn(base, "rounded-xl bg-card text-card-foreground border shadow-sm", className), style }

    return (
      <div ref={ref} {...own} {...props}>
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

