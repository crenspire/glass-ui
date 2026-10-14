import * as React from "react"

import { cn } from "@/lib/utils"
import { liquidProps, resolveVariant, type LiquidProps } from "@/lib/liquid-glass/material"

function Textarea({
  className,
  variant,
  material,
  tint,
  glass,
  webgl,
  style,
  ...props
}: React.ComponentProps<"textarea"> & LiquidProps & {
  variant?: "liquid" | "default"
}) {
  const v = resolveVariant<"liquid" | "default">(variant, material)
  const base = "placeholder:text-muted-foreground focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full text-base transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
  const own = v.variant === "liquid"
    ? liquidProps({ role: "control", material: v.material, tint, glass, webgl }, { className: cn(base, "rounded-2xl px-4 py-3 active:scale-none", className), style })
    : { className: cn(base, "rounded-md border px-3 py-2 dark:bg-input/30 border-input bg-transparent shadow-xs focus-visible:border-ring", className), style }

  return <textarea data-slot="textarea" {...own} {...props} />
}

export { Textarea }
