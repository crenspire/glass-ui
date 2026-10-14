"use client"

import * as React from "react"
import { Sidebar, SidebarContent, SidebarHeader, SidebarItem } from "@/components/ui/sidebar"
import type { DemoProps } from "./registry"

export const code = `import { Sidebar, SidebarContent, SidebarHeader, SidebarItem } from "@/components/ui/glass/sidebar"

export function Example() {
  return (
    <Sidebar className="w-64">
      <SidebarHeader>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Sidebar</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarItem>Home</SidebarItem>
        <SidebarItem>Settings</SidebarItem>
        <SidebarItem>Profile</SidebarItem>
      </SidebarContent>
    </Sidebar>
  )
}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Demo({ material }: DemoProps) {
  return (
        <Sidebar material={material} className="w-64">
          <SidebarHeader>
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold">Sidebar</h2>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarItem>Home</SidebarItem>
            <SidebarItem>Settings</SidebarItem>
            <SidebarItem>Profile</SidebarItem>
          </SidebarContent>
        </Sidebar>
      )
}
