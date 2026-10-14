"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"

export interface DatePickerInputProps extends Omit<React.ComponentProps<typeof Input>, "value" | "onChange"> {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  variant?: "liquid" | "default"
}

const DatePickerInput = React.forwardRef<HTMLInputElement, DatePickerInputProps>(
  ({ className, value, onChange, placeholder = "Pick a date", variant, material, tint, glass, webgl }, ref) => {
    const [open, setOpen] = React.useState(false)
    
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={variant}
            material={material}
            tint={tint}
            glass={glass}
            webgl={webgl}
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground",
              className
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, "PPP") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" variant={variant === "default" ? "default" : undefined}>
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange?.(date)
              setOpen(false)
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    )
  }
)
DatePickerInput.displayName = "DatePickerInput"

export { DatePickerInput }

