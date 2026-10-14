export interface CommandItem {
  id: string
  title: string
  group: "Components" | "Docs" | "Blocks" | "Wallpapers" | "Actions"
  keywords: string[]
  href?: string
  action?: string
}

/** Case-insensitive match over title, group and keywords; title-prefix matches first. */
export function searchCommands(items: CommandItem[], query: string): CommandItem[] {
  const q = query.trim().toLowerCase()
  if (!q) return items
  const scored = items.flatMap(i => {
    const title = i.title.toLowerCase()
    if (title.startsWith(q)) return [{ i, s: 0 }]
    if (title.includes(q)) return [{ i, s: 1 }]
    if (i.group.toLowerCase().includes(q) || i.keywords.some(k => k.toLowerCase().includes(q))) return [{ i, s: 2 }]
    return []
  })
  return scored.sort((a, b) => a.s - b.s).map(x => x.i)
}
