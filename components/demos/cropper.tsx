"use client"

import * as React from "react"
import { Cropper } from "@/components/ui/cropper"
import type { DemoProps } from "./registry"

export const code = `import { Cropper } from "@/components/ui/glass/cropper"

export function Example() {
  return (
    <Cropper
      image="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=600&fit=crop"
      onCropComplete={(area, pixels) => console.log(pixels)}
    />
  )
}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Demo({ material }: DemoProps) {
  return (
        <Cropper
          image="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=600&fit=crop"
          onCropComplete={() => {}}
        />
      )
}
