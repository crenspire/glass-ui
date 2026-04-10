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
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-foreground mb-3">Components</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Browse our collection of {components.length} beautiful, glassy UI components.
          </p>
          <div className="relative max-w-sm">
            <Input
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="glass"
              icon={<Search className="h-4 w-4 text-muted-foreground" />}
              className="text-foreground placeholder:text-muted-foreground"
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
              <Card variant="glass" className="h-full transition-opacity hover:opacity-90">
                <CardHeader>
                  <div className="flex items-center justify-between mb-1">
                    <CardTitle className="text-foreground">
                      {component.title || component.name}
                    </CardTitle>
                    {newComponents.has(component.name) && (
                      <Badge variant="glass" className="bg-primary/20 text-primary border-primary/30">
                        NEW
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-muted-foreground">
                    {component.description || "No description available"}
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

        {filteredComponents.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No components found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
