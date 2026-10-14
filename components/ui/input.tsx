import * as React from "react"

import { cn } from "@/lib/utils"
import { liquidProps, resolveVariant, type LiquidProps } from "@/lib/liquid-glass/material"

function Input({
  className,
  type,
  variant,
  material,
  tint,
  glass,
  webgl,
  style,
  ...props
}: React.ComponentProps<"input"> & LiquidProps & {
  variant?: "liquid" | "default"
}) {
  const v = resolveVariant<"liquid" | "default">(variant, material)
  const base = cn(
    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex w-full min-w-0 text-base transition-[color,box-shadow,scale] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
    "focus-visible:ring-ring/50 focus-visible:ring-[3px]",
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  )
  const own = v.variant === "liquid"
    ? liquidProps({ role: "control", material: v.material, tint, glass, webgl }, { className: cn(base, "h-11 px-4", className), style })
    : { className: cn(base, "h-9 rounded-md border px-3 py-1 dark:bg-input/30 border-input bg-transparent shadow-xs focus-visible:border-ring", className), style }

  return <input type={type} data-slot="input" {...own} {...props} />
}

export { Input }
