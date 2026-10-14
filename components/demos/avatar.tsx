"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { DemoProps } from "./registry"

export const code = `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/glass/avatar"

export function Example() {
  return (
    <div className="flex gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/akshaypjoshi.png" alt="@akshaypjoshi" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/akshaypjoshi.png" alt="@akshaypjoshi" />
        <AvatarFallback>AJ</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    </div>
  )
}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Demo({ material }: DemoProps) {
  return (
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/akshaypjoshi.png" alt="@akshaypjoshi" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/akshaypjoshi.png" alt="@akshaypjoshi" />
            <AvatarFallback>AJ</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      )
}
