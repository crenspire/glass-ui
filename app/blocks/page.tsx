"use client"

import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const blocks = [
  {
    name: "dashboard",
    title: "Dashboard",
    description: "Complete dashboard layout with stats, charts, and navigation",
    category: "Layout",
  },
  {
    name: "authentication",
    title: "Authentication",
    description: "Login form with glassmorphism effects",
    category: "Auth",
  },
  {
    name: "signup",
    title: "Sign Up",
    description: "Registration form with validation",
    category: "Auth",
  },
  {
    name: "forgot-password",
    title: "Forgot Password",
    description: "Password reset form",
    category: "Auth",
  },
  {
    name: "calendar",
    title: "Calendar",
    description: "Calendar view with events and scheduling",
    category: "Data Display",
  },
  {
    name: "chart",
    title: "Chart",
    description: "Beautiful charts with bar, line, and area visualizations",
    category: "Data Display",
  },
]

export default function BlocksPage() {
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredBlocks = blocks.filter((block) =>
    block.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    block.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    block.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen relative">
      <div className="container mx-auto px-4 pt-8 pb-20 relative z-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-foreground mb-3">Blocks</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Pre-built page layouts and component compositions.
          </p>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search blocks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlocks.map((block) => (
            <Link key={block.name} href={`/blocks/${block.name}`} className="group">
              <Card className="h-full transition-opacity hover:opacity-90">
                <CardHeader>
                  <div className="flex items-center justify-between mb-1">
                    <CardTitle className="text-foreground">{block.title}</CardTitle>
                    <Badge>{block.category}</Badge>
                  </div>
                  <CardDescription className="text-muted-foreground">
                    {block.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    View &rarr;
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredBlocks.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No blocks found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}

