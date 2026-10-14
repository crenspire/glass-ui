import { describe, expect, it } from "vitest"
import fs from "node:fs"
import path from "node:path"
import { BLOCKS, getBlock } from "./blocks"

describe("blocks", () => {
  it("has a component file and code for every block", () => {
    for (const b of BLOCKS) {
      expect(fs.existsSync(path.join(__dirname, "..", "components/blocks", `${b.name}.tsx`))).toBe(true)
      expect(b.code).toContain(`@/components/blocks/${b.name}`)
    }
  })
  it("finds blocks by name", () => {
    expect(getBlock("dashboard")?.title).toBe("Dashboard")
    expect(getBlock("nope")).toBeUndefined()
  })
})
