"use client"

import * as React from "react"
import { Calendar as BaseCalendar, type CalendarProps as BaseCalendarProps } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

export type CalendarProps = BaseCalendarProps & {
  glow?: boolean
}

/**
 * Glass UI Calendar - Enhanced calendar with glassy effects
 */
export function Calendar({ className, variant, glow = false, ...props }: CalendarProps) {
  return (
    <div
      className={cn(
        glow && "shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_0_28px_-4px_rgba(255,255,255,0.45)]",
        className
      )}
    >
      <BaseCalendar
        variant={variant}
        {...props}
      />
    </div>
  )
}

