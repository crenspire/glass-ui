"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"

export function ForgotPasswordBlock() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <Card className="w-full max-w-md text-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-white">Forgot password?</CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your email address and we&apos;ll send you a link to reset your password
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
          <Button className="w-full text-white">
            Send Reset Link
          </Button>
          <Button variant="link" className="w-full text-muted-foreground" asChild>
            <a href="/authentication">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to sign in
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

