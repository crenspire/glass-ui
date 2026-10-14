import { describe, expect, it } from "vitest"
import { WALLPAPER_KEY, readStoredPreset, writeStoredPreset } from "./storage"

describe("wallpaper storage", () => {
  it("reads a stored preset", () => {
    expect(readStoredPreset({ getItem: k => (k === WALLPAPER_KEY ? "tahoe" : null) })).toBe("tahoe")
  })
  it("falls back to sonoma for unknown, missing or throwing storage", () => {
    expect(readStoredPreset({ getItem: () => "neon" })).toBe("sonoma")
    expect(readStoredPreset({ getItem: () => null })).toBe("sonoma")
    expect(readStoredPreset(null)).toBe("sonoma")
    expect(readStoredPreset({ getItem: () => { throw new Error("blocked") } })).toBe("sonoma")
  })
  it("writes, and swallows storage errors", () => {
    const saved: Record<string, string> = {}
    writeStoredPreset({ setItem: (k, v) => { saved[k] = v } }, "aurora")
    expect(saved[WALLPAPER_KEY]).toBe("aurora")
    expect(() => writeStoredPreset({ setItem: () => { throw new Error("quota") } }, "aurora")).not.toThrow()
    expect(() => writeStoredPreset(null, "aurora")).not.toThrow()
  })
})
