"use client"

import * as React from "react"
import { OTPInput, type SlotProps } from "input-otp"
import { Dot } from "lucide-react"

import { cn } from "@/lib/utils"

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput> & {
    variant?: "default" | "glass"
  }
>(({ className, variant = "glass", render, ...props }, ref) => {
  const variants = {
    default: "",
    glass: "glass-bg text-foreground",
  }
  
  const defaultRender = ({ slots }: { slots: SlotProps[] }) => (
    <InputOTPGroup variant={variant}>
      {slots.map((slot, index) => (
        <InputOTPSlot key={index} {...slot} variant={variant} />
      ))}
    </InputOTPGroup>
  )
  
  return (
    <OTPInput
      ref={ref}
      containerClassName={cn("flex items-center gap-2", variants[variant], className)}
      render={render || defaultRender}
      {...props}
    />
  )
})
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & {
    variant?: "default" | "glass"
  }
>(({ className, variant = "glass", ...props }, ref) => {
  const variants = {
    default: "flex items-center gap-1",
    glass: "flex items-center gap-1",
  }
  
  return (
    <div ref={ref} className={cn(variants[variant], className)} {...props} />
  )
})
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  SlotProps & React.ComponentPropsWithoutRef<"div"> & {
    variant?: "default" | "glass"
  }
>(({ variant = "glass", className, char, isActive, hasFakeCaret, placeholderChar = "○", ...props }, ref) => {
  const variants = {
    default: "relative flex h-12 w-12 items-center justify-center border-y border-r border-input text-foreground text-lg font-semibold transition-all first:rounded-l-md first:border-l last:rounded-r-md",
    glass: "relative flex h-12 w-12 items-center justify-center glass-bg text-foreground text-lg font-semibold transition-all first:rounded-l-md last:rounded-r-md",
  }

  return (
    <div
      ref={ref}
      className={cn(
        variants[variant],
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

