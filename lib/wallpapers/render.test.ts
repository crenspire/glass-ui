import { describe, expect, it } from "vitest"
import { DEFAULT_WALLPAPER, WALLPAPERS, getWallpaper } from "./presets"
import { paintWallpaper } from "./render"

/** Records every 2D call so paints can be compared without a real canvas. */
function recorder() {
  const calls: unknown[][] = []
  const grad = () => ({ addColorStop: (o: number, c: string) => calls.push(["stop", o, c]) })
  const ctx = new Proxy({} as Record<string, unknown>, {
    get(_, key: string) {
      if (key === "createLinearGradient" || key === "createRadialGradient" || key === "createConicGradient")
        return (...a: number[]) => { calls.push([key, ...a.map(n => Math.round(n))]); return grad() }
      return (...a: unknown[]) => calls.push([key, ...a])
    },
    set(_, key: string, v) { calls.push(["set", key, typeof v === "string" ? v : "obj"]); return true },
  })
  return { ctx: ctx as unknown as CanvasRenderingContext2D, calls }
}

describe("wallpaper presets", () => {
  it("ships four presets with light and dark palettes", () => {
    expect(WALLPAPERS.map(w => w.id)).toEqual(["sonoma", "aurora", "tahoe", "graphite"])
    for (const w of WALLPAPERS) {
      for (const p of [w.light, w.dark]) {
        expect(p.base).toHaveLength(3)
        expect(p.shapes.length).toBeGreaterThanOrEqual(3)
      }
    }
  })
  it("falls back to the default for unknown ids", () => {
    expect(DEFAULT_WALLPAPER).toBe("sonoma")
    expect(getWallpaper("nope").id).toBe("sonoma")
    expect(getWallpaper(null).id).toBe("sonoma")
    expect(getWallpaper("tahoe").id).toBe("tahoe")
  })
})

describe("paintWallpaper", () => {
  const sonoma = getWallpaper("sonoma")
  it("is deterministic for the same inputs", () => {
    const a = recorder(), b = recorder()
    paintWallpaper(a.ctx, sonoma, "dark", 12, 800, 600)
    paintWallpaper(b.ctx, sonoma, "dark", 12, 800, 600)
    expect(a.calls).toEqual(b.calls)
  })
  it("moves over time", () => {
    const a = recorder(), b = recorder()
    paintWallpaper(a.ctx, sonoma, "dark", 0, 800, 600)
    paintWallpaper(b.ctx, sonoma, "dark", 20, 800, 600)
    expect(a.calls).not.toEqual(b.calls)
  })
  it("uses the palette of the requested theme", () => {
    const light = recorder(), dark = recorder()
    paintWallpaper(light.ctx, sonoma, "light", 0, 800, 600)
    paintWallpaper(dark.ctx, sonoma, "dark", 0, 800, 600)
    const stops = (c: unknown[][]) => c.filter(x => x[0] === "stop").map(x => x[2])
    expect(stops(light.calls)).toContain(sonoma.light.base[0])
    expect(stops(dark.calls)).toContain(sonoma.dark.base[0])
    expect(stops(dark.calls)).not.toContain(sonoma.light.base[0])
  })
  it("paints the conic preset with a conic gradient", () => {
    const r = recorder()
    paintWallpaper(r.ctx, getWallpaper("aurora"), "light", 0, 800, 600)
    expect(r.calls.some(c => c[0] === "createConicGradient")).toBe(true)
  })
})
