"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { DEMOS } from "@/components/demos/registry"
import { useWallpaper } from "@/components/wallpaper"
import { searchCommands, type CommandItem as Item } from "./commands"

const BLOCKS = ["dashboard", "authentication", "signup", "forgot-password", "calendar", "chart"]
const DOCS = [
  { title: "Getting started", href: "/docs/getting-started" },
  { title: "Customization", href: "/docs/customization" },
]

export function CommandMenu({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()
  const { presets, setPreset } = useWallpaper()
  const [query, setQuery] = React.useState("")

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); onOpenChange(!open) }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onOpenChange])

  const items = React.useMemo<Item[]>(() => [
    ...DEMOS.map(d => ({ id: `c:${d.name}`, title: d.title, group: "Components" as const, keywords: [d.category, ...d.keywords], href: `/docs/components/${d.name}` })),
    ...DOCS.map(d => ({ id: `d:${d.href}`, title: d.title, group: "Docs" as const, keywords: ["docs"], href: d.href })),
    ...BLOCKS.map(b => ({ id: `b:${b}`, title: b.replace(/-/g, " "), group: "Blocks" as const, keywords: ["block"], href: `/blocks/${b}` })),
    ...presets.map(p => ({ id: `w:${p.id}`, title: `${p.name} wallpaper`, group: "Wallpapers" as const, keywords: ["wallpaper", "background"], action: `wallpaper:${p.id}` })),
    { id: "a:theme", title: "Toggle light / dark", group: "Actions", keywords: ["theme", "dark", "light"], action: "theme" },
  ], [presets])

  const results = searchCommands(items, query)
  const groups = ["Components", "Docs", "Blocks", "Wallpapers", "Actions"] as const

  const run = (item: Item) => {
    onOpenChange(false)
    setQuery("")
    if (item.href) router.push(item.href)
    else if (item.action === "theme") setTheme(resolvedTheme === "dark" ? "light" : "dark")
    else if (item.action?.startsWith("wallpaper:")) setPreset(item.action.slice(10) as Parameters<typeof setPreset>[0])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0">
      <DialogTitle className="sr-only">Command menu</DialogTitle>
      <DialogDescription className="sr-only">Search components, docs, blocks and wallpapers.</DialogDescription>
      {/* Filtering is ours (searchCommands), so cmdk's own filter is off. */}
      <Command shouldFilter={false}>
      <CommandInput placeholder="Search components, docs, wallpapers…" value={query} onValueChange={setQuery} />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        {groups.map(g => {
          const list = results.filter(r => r.group === g)
          return list.length ? (
            <CommandGroup key={g} heading={g}>
              {list.map(i => <CommandItem key={i.id} value={i.id} onSelect={() => run(i)}>{i.title}</CommandItem>)}
            </CommandGroup>
          ) : null
        })}
      </CommandList>
      </Command>
      </DialogContent>
    </Dialog>
  )
}
