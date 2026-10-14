"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

export function AuthenticationBlock() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <Card className="w-full max-w-md text-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-white">Welcome back</CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your credentials to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="text-white placeholder:text-muted-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">Password</Label>
            <Input
              id="password"
              type="password"
              className="text-white placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-white text-sm cursor-pointer">
                Remember me
              </Label>
            </div>
            <Button variant="link" className="text-muted-foreground text-sm p-0">
              Forgot password?
            </Button>
          </div>
          <Button className="w-full text-white">
            Sign In
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="text-white">
              GitHub
            </Button>
            <Button variant="outline" className="text-white">
              Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

