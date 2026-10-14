// @vitest-environment happy-dom
import { describe, expect, it, vi } from "vitest"
import { DESKTOP_QUERY, matchesDesktop } from "./use-desktop-frame"

describe("desktop frame query", () => {
  it("uses the spec breakpoint", () => {
    expect(DESKTOP_QUERY).toBe("(min-width: 1024px) and (min-height: 640px)")
  })
  it("reads matchMedia and is false without it", () => {
    vi.stubGlobal("matchMedia", (q: string) => ({ matches: q === DESKTOP_QUERY }))
    expect(matchesDesktop()).toBe(true)
    vi.stubGlobal("matchMedia", () => ({ matches: false }))
    expect(matchesDesktop()).toBe(false)
    vi.unstubAllGlobals()
  })
})
