"use client"

import * as React from "react"
import Link from "next/link"
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
      <div className="container mx-auto px-4 pt-4 pb-16 relative z-10">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-3">Blocks</h1>
          <p className="text-lg text-foreground/50 mb-8">
            Pre-built page layouts and component compositions
          </p>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
            <Input
              type="text"
              placeholder="Search blocks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="glass"
              className="pl-10 text-foreground placeholder:text-foreground/40"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlocks.map((block) => (
            <Link key={block.name} href={`/blocks/${block.name}`} className="group">
              <div className="glass-bg h-full p-6 transition-opacity hover:opacity-90">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-foreground">{block.title}</h3>
                  <Badge variant="glass">{block.category}</Badge>
                </div>
                <p className="text-sm text-foreground/50 mb-6">
                  {block.description}
                </p>
                <span className="text-sm text-foreground/40 group-hover:text-foreground/70 transition-colors">
                  View →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filteredBlocks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-foreground/50 text-lg">No blocks found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
