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
