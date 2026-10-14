"use client"

import * as React from "react"
import { MenuBar, MenuBarItem } from "@/components/ui/glass/menu-bar"
import type { DemoProps } from "./registry"

export const code = `import { MenuBar, MenuBarItem } from "@/components/ui/glass/menu-bar"

export function Example() {
  return (
    <MenuBar>
      <MenuBarItem active>File</MenuBarItem>
      <MenuBarItem>Edit</MenuBarItem>
      <MenuBarItem>View</MenuBarItem>
      <MenuBarItem>Help</MenuBarItem>
    </MenuBar>
  )
}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Demo({ material }: DemoProps) {
  return (
        <MenuBar material={material}>
          <MenuBarItem active>File</MenuBarItem>
          <MenuBarItem>Edit</MenuBarItem>
          <MenuBarItem>View</MenuBarItem>
          <MenuBarItem>Help</MenuBarItem>
        </MenuBar>
      )
}
