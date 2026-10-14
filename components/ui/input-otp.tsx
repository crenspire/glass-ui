"use client"

import * as React from "react"
import { OTPInput, type SlotProps } from "input-otp"
import { Dot } from "lucide-react"

import { cn } from "@/lib/utils"
import { liquidProps, resolveVariant, type LiquidProps } from "@/lib/liquid-glass/material"

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput> & LiquidProps & {
    variant?: "liquid" | "default"
  }
>(({ className, variant, material, tint, glass, webgl, render, ...props }, ref) => {
  const defaultRender = ({ slots }: { slots: SlotProps[] }) => (
    <InputOTPGroup variant={variant}>
      {slots.map((slot, index) => (
        <InputOTPSlot key={index} {...slot} variant={variant} material={material} tint={tint} glass={glass} webgl={webgl} />
      ))}
    </InputOTPGroup>
  )
  
  return (
    <OTPInput
      ref={ref}
      containerClassName={cn("flex items-center gap-2", className)}
      render={render || defaultRender}
      {...props}
    />
  )
})
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & {
    /** Kept for API compatibility; the group has no glass of its own. */
    variant?: "liquid" | "default"
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
>(({ className, variant, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("flex items-center gap-1", className)} {...props} />
  )
})
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  SlotProps & React.ComponentPropsWithoutRef<"div"> & LiquidProps & {
    variant?: "liquid" | "default"
  }
>(({ variant, material, tint, glass, webgl, style, className, char, isActive, hasFakeCaret, placeholderChar = "○", ...props }, ref) => {
  const v = resolveVariant<"liquid" | "default">(variant, material)
  const base = "relative flex h-12 w-12 items-center justify-center text-foreground text-lg font-semibold transition-all"
  const own = v.variant === "liquid"
    ? liquidProps({ role: "inline", material: v.material, tint, glass, webgl }, { className: "rounded-xl", style })
    : { className: "border-y border-r border-input first:rounded-l-md first:border-l last:rounded-r-md", style }

  return (
    <div
      ref={ref}
      {...own}
      className={cn(
        base,
        own.className,
        isActive && "z-10 ring-2 ring-ring ring-offset-background opacity-100",
        !char && !isActive && "opacity-70",
        className
      )}
      {...props}
    >
      <span className={cn(
        "text-foreground font-semibold",
        !char && "text-muted-foreground"
      )}>
        {char ?? placeholderChar}
      </span>
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-6 w-0.5 bg-foreground animate-pulse" />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" aria-orientation="vertical" {...props}>
    <Dot />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }

