"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { liquidProps, resolveVariant, type LiquidProps } from "@/lib/liquid-glass/material"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker> & LiquidProps & {
  variant?: "liquid" | "default"
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  variant,
  material,
  tint,
  glass,
  webgl,
  style,
  ...props
}: CalendarProps) {
  const v = resolveVariant<"liquid" | "default">(variant, material)
  const lg = v.variant === "liquid" ? liquidProps({ role: "surface", material: v.material, tint, glass, webgl }, { className: "p-4 w-fit" }) : null

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      {...lg}
      className={cn(lg?.className, className)}
      style={{ ...lg?.style, ...style }}
      // react-day-picker v9 class keys
      classNames={{
        months: "relative flex flex-col gap-4 sm:flex-row",
        month: "flex w-full flex-col gap-3",
        month_caption: "flex h-8 w-full items-center justify-center px-8",
        caption_label: "text-sm font-medium text-foreground",
        nav: "absolute inset-x-0 top-0 flex w-full items-center justify-between",
        button_previous: cn(buttonVariants({ variant: "ghost" }), "size-8 p-0 opacity-70 hover:opacity-100 aria-disabled:opacity-40"),
        button_next: cn(buttonVariants({ variant: "ghost" }), "size-8 p-0 opacity-70 hover:opacity-100 aria-disabled:opacity-40"),
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "w-9 text-center text-[0.8rem] font-normal text-muted-foreground",
        week: "mt-1.5 flex w-full",
        day: "relative size-9 p-0 text-center text-sm",
        day_button: cn(buttonVariants({ variant: "ghost" }), "size-9 p-0 font-normal transition-colors"),
        selected: "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary",
        today: "[&>button]:font-semibold [&>button]:ring-1 [&>button]:ring-foreground/30",
        outside: "text-muted-foreground opacity-50",
        disabled: "text-muted-foreground opacity-50",
        range_middle: "[&>button]:bg-accent [&>button]:text-accent-foreground",
        range_end: "day-range-end",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: (props) => {
          if (props.orientation === "left") {
            return <ChevronLeft className="h-4 w-4" />
          }
          return <ChevronRight className="h-4 w-4" />
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }

