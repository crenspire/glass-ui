"use client"

import * as React from "react"
import { RadioGroup as BaseRadioGroup, RadioGroupItem as BaseRadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

export interface RadioGroupItemProps extends React.ComponentProps<typeof BaseRadioGroupItem> {
  glow?: boolean
}

/**
 * Glass UI Radio Group - Enhanced radio group with glassy effects
 */
export const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof BaseRadioGroupItem>,
  RadioGroupItemProps
>(({ className, glow = false, ...props }, ref) => {
  return (
    <BaseRadioGroupItem
      ref={ref}
      className={cn(
        glow && "data-[state=checked]:shadow-lg data-[state=checked]:shadow-purple-500/30",
        "transition-all duration-200",
        className
      )}
      {...props}
    />
  )
})
RadioGroupItem.displayName = "RadioGroupItem"

export {
  BaseRadioGroup as RadioGroup,
}

