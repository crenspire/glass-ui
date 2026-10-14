"use client"

import * as React from "react"
import { DatePickerInput as BaseDatePickerInput } from "@/components/ui/date-picker-input"
import { cn } from "@/lib/utils"
import { hoverEffects, type HoverEffect } from "@/lib/hover-effects"

export interface DatePickerInputProps extends React.ComponentProps<typeof BaseDatePickerInput> {
  effect?: HoverEffect
}

/**
 * Glass UI Date Picker Input - A beautifully designed date picker with glassy effects
 * Built on top of the base DatePickerInput component with enhanced visual styling
 */
export const DatePickerInput = React.forwardRef<HTMLInputElement, DatePickerInputProps>(
  ({ className, effect = "none", ...props }, ref) => {
    return (
      <BaseDatePickerInput
        ref={ref}
        className={cn(
          hoverEffects({ hover: effect }),
          className
        )}
        {...props}
      />
    )
  }
)
DatePickerInput.displayName = "DatePickerInput"

