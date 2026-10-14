"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator } from "@/components/ui/glass/context-menu"
import type { DemoProps } from "./registry"

export const code = `import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
} from "@/components/ui/glass/context-menu"
import { Card, CardContent } from "@/components/ui/glass/card"

export function Example() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="p-8 cursor-pointer">
          <CardContent>Right click me</CardContent>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>My Account</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem>Profile</ContextMenuItem>
        <ContextMenuItem>Settings</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Logout</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Demo({ material }: DemoProps) {
  return (
        <ContextMenu>
          <ContextMenuTrigger>
            <Card className="p-8 cursor-pointer w-fit">
              <CardContent>Right click me</CardContent>
            </Card>
          </ContextMenuTrigger>
          <ContextMenuContent material={material}>
            <ContextMenuLabel>My Account</ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuItem>Profile</ContextMenuItem>
            <ContextMenuItem>Settings</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Logout</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      )
}
