import { describe, expect, it } from "vitest"
import { searchCommands, type CommandItem } from "./commands"

const items: CommandItem[] = [
  { id: "c:button", title: "Button", group: "Components", keywords: ["inputs", "press"] },
  { id: "c:dialog", title: "Dialog", group: "Components", keywords: ["overlays", "modal"] },
  { id: "w:tahoe", title: "Tahoe wallpaper", group: "Wallpapers", keywords: ["blue"] },
]

describe("searchCommands", () => {
  it("returns everything for an empty query", () => {
    expect(searchCommands(items, "  ")).toHaveLength(3)
  })
  it("matches title case-insensitively", () => {
    expect(searchCommands(items, "BUT").map(i => i.id)).toEqual(["c:button"])
  })
  it("matches keywords and groups", () => {
    expect(searchCommands(items, "modal").map(i => i.id)).toEqual(["c:dialog"])
    expect(searchCommands(items, "wallpapers").map(i => i.id)).toEqual(["w:tahoe"])
  })
  it("ranks title prefix matches first", () => {
    const more = [...items, { id: "c:tab", title: "Tabs", group: "Components" as const, keywords: ["button bar"] }]
    expect(searchCommands(more, "b")[0].id).toBe("c:button")
  })
  it("returns nothing when nothing matches", () => {
    expect(searchCommands(items, "zzz")).toEqual([])
  })
})
