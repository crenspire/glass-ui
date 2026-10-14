"use client"

import * as React from "react"
import { DatePickerInput } from "@/components/ui/glass/date-picker-input"
import type { DemoProps } from "./registry"

function DatePickerInputPreview() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  return (
    <DatePickerInput
      value={date}
      onChange={setDate}
      placeholder="Pick a date"
    />
  )
}

export const code = `import { DatePickerInput } from "@/components/ui/glass/date-picker-input"
import { useState } from "react"

export function Example() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  
  return (
    <DatePickerInput
      value={date}
      onChange={setDate}
      placeholder="Pick a date"
    />
  )
}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Demo({ material }: DemoProps) {
  return (
        <div className="p-6 lg lg-regular lg-surface rounded-lg inline-block bg-white/10 dark:bg-white/5">
          <DatePickerInputPreview />
        </div>
      )
}
