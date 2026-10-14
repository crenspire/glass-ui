import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { liquidProps, resolveVariant, type LiquidProps } from "@/lib/liquid-glass/material"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      variant: {
        liquid: "text-foreground",
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 active:scale-[0.98] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 active:scale-[0.98] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]",
        outline:
          "border-2 border-foreground/20 bg-transparent text-foreground shadow-xs hover:bg-foreground/10 hover:border-foreground/40 hover:text-foreground dark:border-white/40 dark:hover:bg-white/5 dark:hover:border-white/60 dark:text-white active:bg-foreground/15 active:border-foreground/50 dark:active:bg-white/10 active:scale-[0.98]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 active:scale-[0.98]",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 active:bg-accent/80 dark:active:bg-accent/60",
        link: "text-primary underline-offset-4 hover:underline active:opacity-80",
      },
      size: {
        default: "h-11 px-5 has-[>svg]:px-4",
        sm: "h-9 gap-1.5 px-4 has-[>svg]:px-3",
        lg: "h-13 px-7 has-[>svg]:px-5",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "liquid",
      size: "default",
    },
  }
)

type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>

function Button({
  className,
  variant,
  size,
  asChild = false,
  material,
  tint,
  glass,
  webgl,
  style,
  ...props
}: React.ComponentProps<"button"> &
  Omit<VariantProps<typeof buttonVariants>, "variant"> &
  LiquidProps & {
    variant?: ButtonVariant | null
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"
  const v = resolveVariant<ButtonVariant>(variant ?? undefined, material)
  const lg = v.variant === "liquid" ? liquidProps({ role: "control", material: v.material, tint, glass, webgl }) : null

  return (
    <Comp
      data-slot="button"
      {...lg}
      className={cn(buttonVariants({ variant: v.variant, size }), lg?.className, className)}
      style={{ ...lg?.style, ...style }}
      {...props}
    />
  )
}

export { Button, buttonVariants }
