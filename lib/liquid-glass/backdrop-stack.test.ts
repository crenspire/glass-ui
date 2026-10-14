import { describe, expect, it } from "vitest"
import { popBackdrop, pushBackdrop } from "./backdrop-stack"

describe("backdrop stack", () => {
  it("returns to the previous backdrop after a pop", () => {
    let s = pushBackdrop([], { id: 1, src: "site" })
    s = pushBackdrop(s, { id: 2, src: "photo" })
    expect(s.at(-1)?.src).toBe("photo")
    s = popBackdrop(s, 2)
    expect(s.at(-1)?.src).toBe("site")
  })
  it("pops by id, not by position", () => {
    let s = pushBackdrop([], { id: 1, src: "a" })
    s = pushBackdrop(s, { id: 2, src: "b" })
    s = popBackdrop(s, 1)
    expect(s.map(e => e.src)).toEqual(["b"])
  })
  it("replaces an entry pushed again with the same id", () => {
    let s = pushBackdrop([], { id: 1, src: "a" })
    s = pushBackdrop(s, { id: 1, src: "a2" })
    expect(s).toEqual([{ id: 1, src: "a2" }])
  })
  it("keeps a base backdrop below page backdrops pushed before it", () => {
    let s = pushBackdrop([], { id: 2, src: "photo" })
    s = pushBackdrop(s, { id: 1, src: "site", base: true })
    expect(s.at(-1)?.src).toBe("photo")
    s = popBackdrop(s, 2)
    expect(s.at(-1)?.src).toBe("site")
  })
})
