"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/glass"
import { CATEGORIES, DEMOS } from "@/components/demos/registry"
import { cn } from "@/lib/utils"

const GUIDES = [
  { title: "Getting started", href: "/docs/getting-started" },
  { title: "Customization", href: "/docs/customization" },
  { title: "Appearance", href: "/themes" },
  { title: "All components", href: "/components" },
]

export function SettingsSidebar({ onNavigate }: { onNavigate?: () => void }) {
  // The static export adds a trailing slash to every route; compare without it.
  const pathname = (usePathname() ?? "").replace(/(.)\/$/, "$1")
  const [q, setQ] = React.useState("")
  const match = (t: string) => t.toLowerCase().includes(q.trim().toLowerCase())
  const link = (title: string, href: string) => (
    <Link key={href} href={href} onClick={onNavigate} aria-current={pathname === href ? "page" : undefined}
      className={cn("block rounded-full px-3 py-1.5 text-sm transition-colors hover:bg-foreground/8",
        pathname === href && "bg-primary text-primary-foreground hover:bg-primary")}>
      {title}
    </Link>
  )
  return (
    <div className="flex h-full flex-col gap-3 p-3">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 opacity-60" />
        <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search" className="pl-9" aria-label="Search docs" />
      </div>
      <nav className="-mx-1 flex-1 space-y-4 overflow-y-auto px-1 pb-4">
        <div className="space-y-0.5">{GUIDES.filter(g => match(g.title)).map(g => link(g.title, g.href))}</div>
        {CATEGORIES.map(cat => {
          const items = DEMOS.filter(d => d.category === cat && (match(d.title) || match(cat)))
          return items.length ? (
            <div key={cat} className="space-y-0.5">
              <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider opacity-55">{cat}</p>
              {items.map(d => link(d.title, `/docs/components/${d.name}`))}
            </div>
          ) : null
        })}
      </nav>
    </div>
  )
}
