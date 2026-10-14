"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel } from "@/components/ui/glass/carousel"
import type { DemoProps } from "./registry"

export const code = `import { Carousel } from "@/components/ui/glass/carousel"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/glass/card"

export function Example() {
  return (
    <Carousel className="w-full max-w-md h-[200px]">
      <Card className="h-full m-2">
        <CardHeader>
          <CardTitle>Slide 1</CardTitle>
        </CardHeader>
        <CardContent>Content for slide 1</CardContent>
      </Card>
      <Card className="h-full m-2">
        <CardHeader>
          <CardTitle>Slide 2</CardTitle>
        </CardHeader>
        <CardContent>Content for slide 2</CardContent>
      </Card>
      <Card className="h-full m-2">
        <CardHeader>
          <CardTitle>Slide 3</CardTitle>
        </CardHeader>
        <CardContent>Content for slide 3</CardContent>
      </Card>
    </Carousel>
  )
}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Demo({ material }: DemoProps) {
  return (
        <Carousel material={material} className="w-full max-w-md h-[200px]">
          <Card className="h-full m-2">
            <CardHeader>
              <CardTitle>Slide 1</CardTitle>
            </CardHeader>
            <CardContent>Content for slide 1</CardContent>
          </Card>
          <Card className="h-full m-2">
            <CardHeader>
              <CardTitle>Slide 2</CardTitle>
            </CardHeader>
            <CardContent>Content for slide 2</CardContent>
          </Card>
          <Card className="h-full m-2">
            <CardHeader>
              <CardTitle>Slide 3</CardTitle>
            </CardHeader>
            <CardContent>Content for slide 3</CardContent>
          </Card>
        </Carousel>
      )
}
