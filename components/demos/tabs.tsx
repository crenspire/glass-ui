"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { DemoProps } from "./registry"

export const code = `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/glass/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/glass/card"

export function Example() {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Make changes to your account here.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Account settings</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your password here.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Password settings</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Demo({ material }: DemoProps) {
  return (
        <Tabs defaultValue="account" className="w-full">
          <TabsList material={material} className="lg lg-regular lg-surface p-1">
            <TabsTrigger value="account" className="cursor-pointer">Account</TabsTrigger>
            <TabsTrigger value="password" className="cursor-pointer">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Make changes to your account here.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Account settings</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="password" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Change your password here.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Password settings</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )
}
