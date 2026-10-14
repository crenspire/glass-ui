"use client"

import * as React from "react"
import {
  InputOTP as BaseInputOTP,
  InputOTPGroup as BaseInputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot as BaseInputOTPSlot,
} from "@/components/ui/input-otp"
import { cn } from "@/lib/utils"

export interface InputOTPProps extends React.ComponentProps<typeof BaseInputOTP> {
  glow?: boolean
}

export interface InputOTPGroupProps extends React.ComponentProps<typeof BaseInputOTPGroup> {
  glow?: boolean
}

export interface InputOTPSlotProps extends React.ComponentProps<typeof BaseInputOTPSlot> {
  glow?: boolean
}

/**
 * Glass UI Input OTP - Enhanced OTP input with glassy effects
 */
export const InputOTP = React.forwardRef<
  React.ElementRef<typeof BaseInputOTP>,
  InputOTPProps
>(({ className, glow = false, ...props }, ref) => {
  return (
    <BaseInputOTP
      ref={ref}
      className={cn(
        glow && "shadow-md shadow-purple-500/20",
        className
      )}
      {...props}
    />
  )
})
InputOTP.displayName = "InputOTP"

export const InputOTPGroup = React.forwardRef<
  HTMLDivElement,
  InputOTPGroupProps
>(({ className, glow = false, ...props }, ref) => {
  return (
    <BaseInputOTPGroup
      ref={ref}
      className={cn(
        glow && "shadow-md shadow-purple-500/20",
        className
      )}
      {...props}
    />
  )
})
InputOTPGroup.displayName = "InputOTPGroup"

export const InputOTPSlot = React.forwardRef<
  HTMLDivElement,
  InputOTPSlotProps
>(({ className, glow = false, ...props }, ref) => {
  return (
    <BaseInputOTPSlot
      ref={ref}
      className={cn(
        glow && "ring-1 ring-purple-500/20",
        className
      )}
      {...props}
    />
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

export {
  InputOTPSeparator,
}

