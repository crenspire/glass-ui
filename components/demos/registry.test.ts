import { describe, expect, it } from "vitest"
import fs from "node:fs"
import path from "node:path"
import registry from "../../registry.json"
import { CATEGORIES, CATEGORY, DEMOS, LOADERS, getDemo } from "./registry"

const componentNames = registry.items.filter(i => i.type === "registry:component").map(i => i.name).sort()

describe("demo registry", () => {
  it("has exactly one demo per registry component", () => {
    expect(DEMOS.map(d => d.name).sort()).toEqual(componentNames)
  })
  it("puts every demo in a known category", () => {
    for (const d of DEMOS) expect(CATEGORIES).toContain(d.category)
  })
  it("has a module file for every demo", () => {
    for (const d of DEMOS) expect(fs.existsSync(path.join(__dirname, `${d.name}.tsx`))).toBe(true)
  })
  it("has no orphan demo files, loaders or categories", () => {
    const files = fs.readdirSync(__dirname).filter(f => f.endsWith(".tsx")).map(f => f.slice(0, -4)).sort()
    expect(files).toEqual(componentNames)
    expect(Object.keys(LOADERS).sort()).toEqual(componentNames)
    expect(Object.keys(CATEGORY).sort()).toEqual(componentNames)
  })
  it("finds demos by name", () => {
    expect(getDemo("button")?.category).toBe("Inputs")
    expect(getDemo("nope")).toBeUndefined()
  })
})
