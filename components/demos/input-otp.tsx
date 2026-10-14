"use client"

import * as React from "react"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import type { DemoProps } from "./registry"

export const code = `import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/glass/input-otp"

export function Example() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Demo({ material }: DemoProps) {
  return (
        <div className="p-4 lg lg-regular lg-surface rounded-lg inline-block">
          <InputOTP material={material} maxLength={6} />
        </div>
      )
}
