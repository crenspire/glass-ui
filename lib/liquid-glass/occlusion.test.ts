import { describe, expect, it } from "vitest"
import { paintsOverBackdrop } from "./occlusion"

const style = (o: Partial<{ backgroundColor: string; backgroundImage: string; backdropFilter: string }>) => ({
  backgroundColor: "rgba(0, 0, 0, 0)", backgroundImage: "none", backdropFilter: "none", ...o,
})

describe("paintsOverBackdrop", () => {
  it("is false for a fully transparent element", () => {
    expect(paintsOverBackdrop(style({}))).toBe(false)
    expect(paintsOverBackdrop(style({ backgroundColor: "transparent" }))).toBe(false)
  })
  it("is true for an element with a backdrop filter", () => {
    expect(paintsOverBackdrop(style({ backdropFilter: "blur(16px)" }))).toBe(true)
  })
  it("is true for a background image", () => {
    expect(paintsOverBackdrop(style({ backgroundImage: "linear-gradient(red, blue)" }))).toBe(true)
  })
  it("is true for a visible background colour in any syntax", () => {
    expect(paintsOverBackdrop(style({ backgroundColor: "rgb(10, 10, 10)" }))).toBe(true)
    expect(paintsOverBackdrop(style({ backgroundColor: "rgba(0, 0, 0, 0.5)" }))).toBe(true)
    expect(paintsOverBackdrop(style({ backgroundColor: "oklab(0.99 0 0 / 0.2)" }))).toBe(true)
  })
  it("ignores nearly invisible washes", () => {
    expect(paintsOverBackdrop(style({ backgroundColor: "rgba(255, 255, 255, 0.02)" }))).toBe(false)
    expect(paintsOverBackdrop(style({ backgroundColor: "oklab(0.99 0 0 / 0.03)" }))).toBe(false)
  })
})

describe("insideClips", () => {
  const r = (left: number, top: number, right: number, bottom: number) => ({ left, top, right, bottom })
  it("is true with no clipping ancestors", async () => {
    const { insideClips } = await import("./occlusion")
    expect(insideClips(r(0, 0, 10, 10), [])).toBe(true)
  })
  it("is true when fully inside every clip", async () => {
    const { insideClips } = await import("./occlusion")
    expect(insideClips(r(10, 10, 20, 20), [r(0, 0, 100, 100), r(5, 5, 50, 50)])).toBe(true)
  })
  it("is false when scrolled partly out of a clip", async () => {
    const { insideClips } = await import("./occlusion")
    expect(insideClips(r(10, -5, 20, 20), [r(0, 0, 100, 100)])).toBe(false)
  })
  it("tolerates subpixel overlap", async () => {
    const { insideClips } = await import("./occlusion")
    expect(insideClips(r(0, -0.5, 10, 10), [r(0, 0, 100, 100)])).toBe(true)
  })
})
