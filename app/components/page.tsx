"use client"

import * as React from "react"
import Link from "next/link"
import { Input } from "@/components/ui/glass/input"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { getComponents } from "@/lib/registry"

const components = getComponents()

// New components that should show NEW badge
const newComponents = new Set([
  'spinner',
  'button-group',
  'input-group',
  'empty-state',
  'menu-bar',
  'date-picker-input',
  'context-menu',
  'carousel',
])

export default function ComponentsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredComponents = components.filter((component) =>
    component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    component.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    component.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen relative">
      <div className="container mx-auto px-4 pt-8 pb-20 relative z-10">
        <div className="mb-12">
          <h1 className="text-4xl font-semibold text-foreground tracking-tight mb-2">Components</h1>
          <p className="text-lg text-foreground/50 mb-8">
            {components.length} components built with glassmorphism
          </p>
          <div className="relative max-w-sm">
            <Input
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="glass"
              icon={<Search className="h-4 w-4 text-foreground/40" />}
              className="text-foreground placeholder:text-foreground/30"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredComponents.map((component) => (
            <Link
              key={component.name}
              href={`/docs/components/${component.name}`}
              className="group"
            >
              <div className="glass-bg h-full p-5 transition-opacity hover:opacity-80">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-foreground font-medium">
                    {component.title || component.name}
                  </h3>
                  {newComponents.has(component.name) && (
                    <Badge variant="glass" className="text-[10px] px-1.5 py-0 bg-white/5 text-foreground/70 border-white/10">
                      NEW
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-foreground/40 mb-4 line-clamp-2">
                  {component.description || "No description available"}
                </p>
                <span className="text-xs text-foreground/30 group-hover:text-foreground/60 transition-colors">
                  View →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filteredComponents.length === 0 && (
          <div className="text-center py-16">
            <p className="text-foreground/40 text-base">No components found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
