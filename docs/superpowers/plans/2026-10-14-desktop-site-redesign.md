# Desktop Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Glass UI site as a macOS-style desktop over an animated generated wallpaper so the liquid glass visibly refracts: menu bar + dock shell, a widget desktop home, a System-Settings-style components/docs area, Mission Control blocks, and an Appearance themes pane.

**Architecture:** A canvas wallpaper (`lib/wallpapers`) is painted at ~30 fps and registered as the base backdrop of the existing `LiquidGlassProvider`; it doubles as the DOM fallback. An app shell (`components/shell`) gives desktop-size screens a non-scrolling frame (menu bar, content, dock) so floating chrome never covers content and can be WebGL glass. Pages are rebuilt from the library's own components; component demos move to one file per component behind a typed registry.

**Tech Stack:** Next.js 16 app router, React 19, Tailwind v4, Radix, lucide-react, vitest (+ happy-dom for DOM tests), existing `lib/liquid-glass` engine.

**Spec:** `docs/superpowers/specs/2026-10-14-desktop-site-redesign-design.md`

## Global Constraints

- No new runtime dependencies.
- Wallpaper presets: `sonoma` (default), `aurora`, `tahoe`, `graphite`; each has `light` and `dark`.
- Wallpaper canvas: half viewport resolution, ≤ 30 fps, paused when `document.visibilityState === "hidden"`, single static frame under `prefers-reduced-motion` or `prefers-reduced-transparency`.
- Wallpaper choice stored in `localStorage` key `glass-ui:wallpaper` (wrapped in try/catch).
- Desktop frame applies at `(min-width: 1024px) and (min-height: 640px)`: document does not scroll, menu bar and dock are WebGL glass. Otherwise: document scrolls, menu bar and dock use `webgl={false}`.
- Windows and widgets tile; never overlap. Preview stages have no background.
- Demo categories, exactly: `Inputs`, `Overlays`, `Navigation`, `Data display`, `Feedback`, `Layout`.
- No component API changes; no new components or blocks.
- Commits: conventional style, **no `Co-Authored-By` trailer, no AI attribution**.
- Gates after every task: `pnpm test` passes; `npx tsc --noEmit -p . 2>&1 | grep -v rss.xml` prints nothing; `pnpm build` succeeds.
- Spec deviation (recorded): the engine needs no `markSourceDirty()`; the wallpaper registers as a non-live source and calls the existing `engine.invalidate()` after each paint, which uploads exactly once per painted frame.
- Visual checks need the Chrome tab visible (`document.visibilityState === "visible"`); if hidden, ask the user to bring Chrome to the front rather than judging WebGL output.

## Review Focus

1. **Window narrower/shorter than the desktop query while on a scroll-free page** → layout switches to stacked scrolling; nothing is cut off and the dock/menu bar become CSS glass. Pinned by `useDesktopFrame` test (Task 4) and the 390×844 pass (Task 10).
2. **localStorage throws or holds an unknown preset id** → site uses `sonoma`, no crash. Pinned by `readStoredPreset` tests (Task 2).
3. **A component in `registry.json` without a demo (or a demo for no component)** → build-time test fails, so no blank gallery tile ships. Pinned by registry coverage test (Task 3).
4. **Wallpaper switched or theme toggled repeatedly** → canvas repaints the new palette on the next frame, engine re-uploads, no stale palette. Pinned by `paintWallpaper` palette test (Task 1) and Task 10 visual pass.
5. **⌘K query with no matches / mixed case / category word** → empty state shown; matching is case-insensitive over title, category and keywords. Pinned by `searchCommands` tests (Task 4).

---

### Task 1: Wallpaper presets and painter

**Files:**
- Create: `lib/wallpapers/presets.ts`, `lib/wallpapers/render.ts`
- Test: `lib/wallpapers/render.test.ts`

**Interfaces:**
- Produces:
  ```ts
  export type WallpaperId = "sonoma" | "aurora" | "tahoe" | "graphite"
  export type Theme = "light" | "dark"
  export interface Palette { base: [string, string, string]; shapes: string[] }
  export interface WallpaperPreset { id: WallpaperId; name: string; kind: "ribbons" | "conic"; light: Palette; dark: Palette }
  export const WALLPAPERS: WallpaperPreset[]
  export const DEFAULT_WALLPAPER: WallpaperId
  export function getWallpaper(id: string | null | undefined): WallpaperPreset
  export function paintWallpaper(ctx: CanvasRenderingContext2D, preset: WallpaperPreset, theme: Theme, t: number, w: number, h: number): void
  ```

- [ ] **Step 1: Write the failing tests** — `lib/wallpapers/render.test.ts`:

```ts
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
```

- [ ] **Step 2: Run to see it fail** — `pnpm test`; expected FAIL: cannot resolve `./presets`.

- [ ] **Step 3: Implement `lib/wallpapers/presets.ts`**

```ts
/* Generated wallpapers in the spirit of macOS and iOS. Each preset is a set of colours; render.ts
   turns them into slowly moving shapes. Strong colour and edges make the glass refraction visible. */

export type WallpaperId = "sonoma" | "aurora" | "tahoe" | "graphite"
export type Theme = "light" | "dark"
export interface Palette {
  /** Background gradient, top-left → bottom-right. */
  base: [string, string, string]
  /** Ribbon / blob colours, drawn in order. */
  shapes: string[]
}
export interface WallpaperPreset { id: WallpaperId; name: string; kind: "ribbons" | "conic"; light: Palette; dark: Palette }

export const WALLPAPERS: WallpaperPreset[] = [
  {
    id: "sonoma", name: "Sonoma", kind: "ribbons",
    light: { base: ["#ffd9c2", "#f6b3c8", "#b9a8ff"], shapes: ["#ff7a59", "#ffb347", "#7b61ff", "#ff5e9c"] },
    dark: { base: ["#1b1446", "#3a1f6b", "#12324f"], shapes: ["#ff7a59", "#ffb347", "#6a5cff", "#e0457b"] },
  },
  {
    id: "aurora", name: "Aurora", kind: "conic",
    light: { base: ["#e9f4ff", "#f3e8ff", "#ffeef2"], shapes: ["#00c6ff", "#7b2ff7", "#f107a3", "#ff9a00"] },
    dark: { base: ["#05060f", "#120a2a", "#0a1a2a"], shapes: ["#00b4ff", "#6a2bff", "#d1047f", "#ff8a00"] },
  },
  {
    id: "tahoe", name: "Tahoe", kind: "ribbons",
    light: { base: ["#eaf5ff", "#b9d7ff", "#5d8df5"], shapes: ["#8fd3ff", "#2b6cff", "#ffffff", "#3fb6c9"] },
    dark: { base: ["#071526", "#0d2a52", "#04101f"], shapes: ["#2b6cff", "#3fb6c9", "#8fd3ff", "#1d3f8f"] },
  },
  {
    id: "graphite", name: "Graphite", kind: "ribbons",
    light: { base: ["#f1f2f4", "#dfe1e6", "#c9ccd3"], shapes: ["#b8bcc6", "#9aa0ad", "#7c8aa5", "#d6d9df"] },
    dark: { base: ["#16171a", "#1f2126", "#0f1013"], shapes: ["#3a3d45", "#4b5060", "#2c3a55", "#5a6070"] },
  },
]

export const DEFAULT_WALLPAPER: WallpaperId = "sonoma"

export function getWallpaper(id: string | null | undefined): WallpaperPreset {
  return WALLPAPERS.find(w => w.id === id) ?? WALLPAPERS.find(w => w.id === DEFAULT_WALLPAPER)!
}
```

- [ ] **Step 4: Implement `lib/wallpapers/render.ts`**

```ts
import type { Theme, WallpaperPreset } from "./presets"

/* Paints one frame. Pure in its inputs: the same preset, theme, time and size always issue the
   same canvas calls. Motion is slow (one loop ≈ 90 s) so it reads as a living wallpaper. */
const TAU = Math.PI * 2

export function paintWallpaper(
  ctx: CanvasRenderingContext2D, preset: WallpaperPreset, theme: Theme, t: number, w: number, h: number
) {
  const p = preset[theme]
  const phase = (t / 90) * TAU

  const bg = ctx.createLinearGradient(0, 0, w, h)
  bg.addColorStop(0, p.base[0]); bg.addColorStop(0.55, p.base[1]); bg.addColorStop(1, p.base[2])
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, w, h)

  if (preset.kind === "conic") {
    const cx = w * (0.5 + 0.12 * Math.sin(phase)), cy = h * (0.55 + 0.1 * Math.cos(phase))
    const cg = ctx.createConicGradient(phase, cx, cy)
    p.shapes.forEach((c, i) => cg.addColorStop(i / p.shapes.length, c))
    cg.addColorStop(1, p.shapes[0])
    ctx.globalAlpha = theme === "dark" ? 0.75 : 0.6
    ctx.filter = `blur(${Math.round(Math.min(w, h) * 0.06)}px)`
    ctx.fillStyle = cg
    ctx.fillRect(0, 0, w, h)
    ctx.filter = "none"
    ctx.globalAlpha = 1
  }

  // Soft glows
  p.shapes.forEach((c, i) => {
    const a = phase + i * 1.7
    const x = w * (0.5 + 0.38 * Math.sin(a * (i % 2 ? 1 : -1))), y = h * (0.5 + 0.34 * Math.cos(a * 0.8))
    const r = Math.max(w, h) * (0.28 + 0.06 * i)
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, c); g.addColorStop(1, "transparent")
    ctx.globalAlpha = theme === "dark" ? 0.55 : 0.5
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)
  })
  ctx.globalAlpha = 1

  if (preset.kind !== "ribbons") return

  // Flowing ribbons: wide bezier bands with a crisp leading edge — the edges are what the glass bends.
  p.shapes.forEach((c, i) => {
    const off = Math.sin(phase + i * 1.3) * h * 0.08
    const y0 = h * (0.25 + i * 0.18) + off, thick = h * (0.16 + 0.03 * i)
    const band = ctx.createLinearGradient(0, y0 - thick, 0, y0 + thick)
    band.addColorStop(0, "transparent"); band.addColorStop(0.45, c); band.addColorStop(1, "transparent")
    ctx.beginPath()
    ctx.moveTo(-w * 0.1, y0)
    ctx.bezierCurveTo(w * 0.3, y0 - h * 0.25 + off, w * 0.65, y0 + h * 0.25 - off, w * 1.1, y0 - h * 0.05)
    ctx.lineTo(w * 1.1, y0 + thick)
    ctx.bezierCurveTo(w * 0.65, y0 + thick + h * 0.2 - off, w * 0.3, y0 + thick - h * 0.2 + off, -w * 0.1, y0 + thick)
    ctx.closePath()
    ctx.globalAlpha = theme === "dark" ? 0.7 : 0.55
    ctx.fillStyle = band
    ctx.fill()
  })
  ctx.globalAlpha = 1
}
```

- [ ] **Step 5: Run tests** — `pnpm test`; expected PASS (all wallpaper tests). Gates.
- [ ] **Step 6: Commit** — `git add lib/wallpapers && git commit -m "feat: generated wallpaper presets and painter"`

---

### Task 2: Wallpaper provider and canvas

**Files:**
- Create: `lib/wallpapers/storage.ts`, `lib/wallpapers/storage.test.ts`, `components/wallpaper.tsx`
- Modify: `app/layout.tsx` (replace `<GridBackground />` with `<WallpaperProvider><Wallpaper /> …`)

**Interfaces:**
- Consumes: Task 1 exports; `useLiquidBackdrop`, `useLiquidGlass` from `@/components/ui/liquid/liquid-glass-provider`.
- Produces:
  ```ts
  // lib/wallpapers/storage.ts
  export const WALLPAPER_KEY = "glass-ui:wallpaper"
  export function readStoredPreset(storage: Pick<Storage, "getItem"> | null): WallpaperId
  export function writeStoredPreset(storage: Pick<Storage, "setItem"> | null, id: WallpaperId): void
  // components/wallpaper.tsx
  export function WallpaperProvider(props: { children: React.ReactNode }): JSX.Element
  export function useWallpaper(): { preset: WallpaperPreset; setPreset: (id: WallpaperId) => void; presets: WallpaperPreset[] }
  export function Wallpaper(): JSX.Element
  ```

- [ ] **Step 1: Failing tests** — `lib/wallpapers/storage.test.ts`:

```ts
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
```

- [ ] **Step 2: Run, see FAIL** (missing module).

- [ ] **Step 3: Implement `lib/wallpapers/storage.ts`**

```ts
import { getWallpaper, type WallpaperId } from "./presets"

export const WALLPAPER_KEY = "glass-ui:wallpaper"

export function readStoredPreset(storage: Pick<Storage, "getItem"> | null): WallpaperId {
  try { return getWallpaper(storage?.getItem(WALLPAPER_KEY)).id } catch { return getWallpaper(null).id }
}

export function writeStoredPreset(storage: Pick<Storage, "setItem"> | null, id: WallpaperId) {
  try { storage?.setItem(WALLPAPER_KEY, id) } catch { /* private mode or quota: keep the choice for this visit only */ }
}
```

Run `pnpm test`: PASS.

- [ ] **Step 4: Implement `components/wallpaper.tsx`**

```tsx
"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { useLiquidBackdrop, useLiquidGlass } from "@/components/ui/liquid/liquid-glass-provider"
import { WALLPAPERS, getWallpaper, type WallpaperId, type WallpaperPreset } from "@/lib/wallpapers/presets"
import { paintWallpaper } from "@/lib/wallpapers/render"
import { readStoredPreset, writeStoredPreset } from "@/lib/wallpapers/storage"

const safeStorage = () => { try { return window.localStorage } catch { return null } }

const WallpaperContext = React.createContext<{
  preset: WallpaperPreset; setPreset: (id: WallpaperId) => void; presets: WallpaperPreset[]
} | null>(null)

export function WallpaperProvider({ children }: { children: React.ReactNode }) {
  const [id, setId] = React.useState<WallpaperId>("sonoma")
  React.useEffect(() => setId(readStoredPreset(safeStorage())), [])
  const value = React.useMemo(() => ({
    preset: getWallpaper(id),
    presets: WALLPAPERS,
    setPreset: (next: WallpaperId) => { setId(next); writeStoredPreset(safeStorage(), next) },
  }), [id])
  return <WallpaperContext.Provider value={value}>{children}</WallpaperContext.Provider>
}

export function useWallpaper() {
  const ctx = React.useContext(WallpaperContext)
  if (!ctx) throw new Error("useWallpaper must be used inside <WallpaperProvider>")
  return ctx
}

const FPS = 30

/**
 * The desktop wallpaper: a half-resolution canvas painted ~30 times a second. It is the backdrop
 * the liquid glass refracts, and also the visible wallpaper when WebGL is unavailable (the
 * provider hides it via data-glass-backdrop once the shader draws it).
 */
export function Wallpaper() {
  const { preset } = useWallpaper()
  const { resolvedTheme } = useTheme()
  const theme = resolvedTheme === "light" ? "light" : "dark"
  const engine = useLiquidGlass()
  const ref = React.useRef<HTMLCanvasElement>(null)
  const [canvas, setCanvas] = React.useState<HTMLCanvasElement | null>(null)
  React.useEffect(() => setCanvas(ref.current), [])
  useLiquidBackdrop(canvas, { base: true })

  React.useEffect(() => {
    const cv = ref.current
    const ctx = cv?.getContext("2d")
    if (!cv || !ctx) return
    const still = window.matchMedia("(prefers-reduced-motion: reduce), (prefers-reduced-transparency: reduce)").matches
    const start = performance.now()
    let raf = 0, last = -Infinity
    const size = () => {
      const w = Math.max(2, Math.round(window.innerWidth / 2)), h = Math.max(2, Math.round(window.innerHeight / 2))
      if (cv.width !== w) cv.width = w
      if (cv.height !== h) cv.height = h
    }
    const paint = (now: number) => {
      size()
      paintWallpaper(ctx, preset, theme, (now - start) / 1000, cv.width, cv.height)
      engine?.invalidate()
    }
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      if (document.visibilityState === "hidden" || now - last < 1000 / FPS) return
      last = now
      paint(now)
    }
    paint(start)
    if (!still) raf = requestAnimationFrame(loop)
    const onResize = () => paint(performance.now())
    window.addEventListener("resize", onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize) }
  }, [preset, theme, engine])

  return (
    <canvas
      ref={ref}
      aria-hidden
      data-glass-backdrop
      className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen"
    />
  )
}
```

- [ ] **Step 5: Wire the layout** — in `app/layout.tsx` replace `import { GridBackground } …` with `import { Wallpaper, WallpaperProvider } from "@/components/wallpaper"`, and inside `<LiquidGlassProvider>` wrap the children:

```tsx
<LiquidGlassProvider>
  <WallpaperProvider>
    <Wallpaper />
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
    <Toaster />
  </WallpaperProvider>
</LiquidGlassProvider>
```

(Header/Footer are replaced in Task 4.) Delete `components/grid-background.tsx`, `components/canvas-background.tsx`, `components/canvas-background-wrapper.tsx`, `components/gradient-background.tsx` after `grep -rn "canvas-background\|gradient-background\|grid-background" app components` shows no other users.

- [ ] **Step 6: Verify** — gates; Chrome (visible): `/` shows the Sonoma ribbons moving slowly; `document.documentElement.classList.contains("lg-ready")` is `true`; live glass bends the ribbons. Run in console `localStorage.setItem("glass-ui:wallpaper","tahoe")` + reload → Tahoe. Toggle theme → dark palette on the next frame.
- [ ] **Step 7: Commit** — `git add -A lib/wallpapers components app/layout.tsx && git commit -m "feat: animated generated wallpaper as the liquid glass backdrop"`

---

### Task 3: Component demos and registry

**Files:**
- Create: `scripts/split-demos.py`, `components/demos/<name>.tsx` (49 files, generated), `components/demos/registry.ts`, `components/demos/use-demo.ts`
- Test: `components/demos/registry.test.ts` (add `components/**/*.test.ts` to `vitest.config.ts` include)
- Modify: `app/docs/components/[component]/page.tsx` (use the registry; temporary until Task 6)
- Delete: `components/component-preview.tsx`, `lib/component-examples.ts`

**Interfaces:**
- Produces:
  ```ts
  // registry.ts
  export type DemoCategory = "Inputs" | "Overlays" | "Navigation" | "Data display" | "Feedback" | "Layout"
  export const CATEGORIES: DemoCategory[]
  export interface DemoEntry { name: string; title: string; category: DemoCategory; keywords: string[]; load: () => Promise<DemoModule> }
  export interface DemoModule { default: React.ComponentType<DemoProps>; code: string }
  export interface DemoProps { material?: Material }
  export const DEMOS: DemoEntry[]
  export function getDemo(name: string): DemoEntry | undefined
  // use-demo.ts
  export function useDemo(name: string): DemoModule | null
  ```

- [ ] **Step 1: Failing test** — `components/demos/registry.test.ts`:

```ts
import { describe, expect, it } from "vitest"
import fs from "node:fs"
import path from "node:path"
import registry from "../../registry.json"
import { CATEGORIES, DEMOS, getDemo } from "./registry"

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
  it("finds demos by name", () => {
    expect(getDemo("button")?.category).toBe("Inputs")
    expect(getDemo("nope")).toBeUndefined()
  })
})
```

Add to `vitest.config.ts` `include`: `"components/**/*.test.ts"`. Run → FAIL (missing `./registry`).

- [ ] **Step 2: Write `scripts/split-demos.py`** — extracts each `case "<name>":` body of `ComponentPreview` and the matching `getComponentExampleCode` snippet into `components/demos/<name>.tsx`:

```python
"""One-off: split components/component-preview.tsx + lib/component-examples.ts into per-component demos."""
import re, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1]
preview = (ROOT / "components/component-preview.tsx").read_text()
examples = (ROOT / "lib/component-examples.ts").read_text()

# import line -> identifiers it provides
imports = []
for m in re.finditer(r'^import (?:type )?\{([^}]+)\} from "([^"]+)"$', preview, re.M):
    names = [n.strip().split(" as ")[-1] for n in m.group(1).split(",") if n.strip()]
    imports.append((names, m.group(0)))
helpers_end = preview.index("export function ComponentPreview")
helpers = preview[preview.index("\n", preview.rindex("\nimport ")) : helpers_end].strip()  # e.g. DatePickerInputPreview

def cases(src, fn):
    body = src[src.index(fn):]
    parts = re.split(r'\n    case "([a-z-]+)":\n', body)
    return {parts[i]: parts[i + 1] for i in range(1, len(parts) - 1, 2)}

prev_cases = cases(preview, "export function ComponentPreview")
code_cases = cases(examples, "export function getComponentExampleCode")

# Components that accept `material` in each demo (from the liquid conversion tables)
MATERIAL_TAGS = {
    "button": ["Button"], "card": ["Card"], "input": ["Input"], "badge": ["Badge"], "checkbox": ["Checkbox"],
    "switch": ["Switch"], "tabs": ["TabsList"], "alert": ["Alert"], "slider": ["Slider"], "textarea": ["Textarea"],
    "radio-group": ["RadioGroupItem"], "select": ["SelectTrigger", "SelectContent"], "tooltip": ["TooltipContent"],
    "popover": ["PopoverContent"], "dialog": ["DialogContent"], "dropdown-menu": ["DropdownMenuContent"],
    "calendar": ["Calendar"], "toggle": ["Toggle"], "toggle-group": ["ToggleGroup"], "table": ["Table"],
    "breadcrumb": ["BreadcrumbList"], "command": ["Command"], "sheet": ["SheetContent"],
    "navigation-menu": ["NavigationMenuList"], "pagination": ["PaginationContent"], "hover-card": ["HoverCardContent"],
    "drawer": ["DrawerContent"], "alert-dialog": ["AlertDialogContent"], "sidebar": ["Sidebar"],
    "chart": ["ChartContainer"], "input-otp": ["InputOTP"], "button-group": ["ButtonGroup"],
    "input-group": ["InputGroup"], "empty-state": ["EmptyState"], "menu-bar": ["MenuBar"],
    "date-picker-input": ["DatePickerInput"], "context-menu": ["ContextMenuContent"], "carousel": ["Carousel"],
}

out = ROOT / "components/demos"
out.mkdir(exist_ok=True)
for name, body in prev_cases.items():
    jsx = body.strip()
    assert jsx.startswith("return"), name
    for tag in MATERIAL_TAGS.get(name, []):
        jsx = re.sub(rf"<{tag}(?=[\s>])", f"<{tag} material={{material}}", jsx)
    used = [line for names, line in imports if any(re.search(rf"\b{n}\b", jsx + helpers) for n in names)]
    code = code_cases.get(name)
    if code is None:
        raise SystemExit(f"no example code for {name}")
    code = code.strip()
    code = code[code.index("`") + 1 : code.rindex("`")]
    uses_helper = "DatePickerInputPreview" in jsx
    text = '"use client"\n\nimport * as React from "react"\n' + "\n".join(l for l in used if "react\"" not in l) + \
        '\nimport type { DemoProps } from "./registry"\n\n' + \
        (helpers + "\n\n" if uses_helper else "") + \
        # The snippet was template-literal source already (escapes intact), so it drops straight into one.
        "export const code = `" + code + "`\n\n" + \
        "// eslint-disable-next-line @typescript-eslint/no-unused-vars\n" + \
        f"export default function Demo({{ material }}: DemoProps) {{\n  {jsx}\n}}\n"
    (out / f"{name}.tsx").write_text(text)
    print("wrote", name)
```

The script refuses to continue if a component has no example snippet; for such names add a short snippet to `lib/component-examples.ts` first, then re-run. (`getComponentExampleCode` has a generic default branch; the script does not use it.)

- [ ] **Step 3: Run it** — `python3 scripts/split-demos.py` → 49 `wrote` lines. `npx tsc --noEmit -p .` — fix each reported file by hand (typical: a tag in `MATERIAL_TAGS` that does not accept `material` → remove it from the map and re-run; an import missing → the identifier is used only via a helper; add the import line).

- [ ] **Step 4: Write `components/demos/registry.ts`**

```ts
import type * as React from "react"
import type { Material } from "@/lib/liquid-glass/material"
import registry from "@/registry.json"

export type DemoCategory = "Inputs" | "Overlays" | "Navigation" | "Data display" | "Feedback" | "Layout"
export const CATEGORIES: DemoCategory[] = ["Inputs", "Overlays", "Navigation", "Data display", "Feedback", "Layout"]

export interface DemoProps { material?: Material }
export interface DemoModule { default: React.ComponentType<DemoProps>; code: string }
export interface DemoEntry { name: string; title: string; category: DemoCategory; keywords: string[]; load: () => Promise<DemoModule> }

const CATEGORY: Record<string, DemoCategory> = {
  button: "Inputs", "button-group": "Inputs", checkbox: "Inputs", "date-picker-input": "Inputs", input: "Inputs",
  "input-group": "Inputs", "input-otp": "Inputs", label: "Inputs", "radio-group": "Inputs", select: "Inputs",
  slider: "Inputs", switch: "Inputs", textarea: "Inputs", toggle: "Inputs", "toggle-group": "Inputs", cropper: "Inputs",
  "alert-dialog": "Overlays", "context-menu": "Overlays", dialog: "Overlays", drawer: "Overlays", "dropdown-menu": "Overlays",
  "hover-card": "Overlays", popover: "Overlays", sheet: "Overlays", tooltip: "Overlays", command: "Overlays",
  breadcrumb: "Navigation", "menu-bar": "Navigation", "navigation-menu": "Navigation", pagination: "Navigation",
  tabs: "Navigation", sidebar: "Navigation", "mode-toggle": "Navigation",
  avatar: "Data display", badge: "Data display", calendar: "Data display", card: "Data display",
  carousel: "Data display", chart: "Data display", table: "Data display",
  alert: "Feedback", "empty-state": "Feedback", skeleton: "Feedback", sonner: "Feedback", spinner: "Feedback",
  separator: "Layout", "scroll-area": "Layout", collapsible: "Layout", accordion: "Layout",
}

// Static import map so the bundler can split each demo into its own chunk.
const LOADERS: Record<string, () => Promise<DemoModule>> = {
  accordion: () => import("./accordion"), alert: () => import("./alert"), "alert-dialog": () => import("./alert-dialog"),
  avatar: () => import("./avatar"), badge: () => import("./badge"), breadcrumb: () => import("./breadcrumb"),
  button: () => import("./button"), "button-group": () => import("./button-group"), calendar: () => import("./calendar"),
  card: () => import("./card"), carousel: () => import("./carousel"), chart: () => import("./chart"),
  checkbox: () => import("./checkbox"), collapsible: () => import("./collapsible"), command: () => import("./command"),
  "context-menu": () => import("./context-menu"), cropper: () => import("./cropper"),
  "date-picker-input": () => import("./date-picker-input"), dialog: () => import("./dialog"), drawer: () => import("./drawer"),
  "dropdown-menu": () => import("./dropdown-menu"), "empty-state": () => import("./empty-state"),
  "hover-card": () => import("./hover-card"), input: () => import("./input"), "input-group": () => import("./input-group"),
  "input-otp": () => import("./input-otp"), label: () => import("./label"), "menu-bar": () => import("./menu-bar"),
  "mode-toggle": () => import("./mode-toggle"), "navigation-menu": () => import("./navigation-menu"),
  pagination: () => import("./pagination"), popover: () => import("./popover"), "radio-group": () => import("./radio-group"),
  "scroll-area": () => import("./scroll-area"), select: () => import("./select"), separator: () => import("./separator"),
  sheet: () => import("./sheet"), sidebar: () => import("./sidebar"), skeleton: () => import("./skeleton"),
  slider: () => import("./slider"), sonner: () => import("./sonner"), spinner: () => import("./spinner"),
  switch: () => import("./switch"), table: () => import("./table"), tabs: () => import("./tabs"),
  textarea: () => import("./textarea"), toggle: () => import("./toggle"), "toggle-group": () => import("./toggle-group"),
}

export const DEMOS: DemoEntry[] = registry.items
  .filter(i => i.type === "registry:component" && LOADERS[i.name])
  .map(i => ({
    name: i.name,
    title: i.title ?? i.name,
    category: CATEGORY[i.name] ?? "Layout",
    keywords: [i.name, ...(i.description ?? "").toLowerCase().split(/\W+/).filter(w => w.length > 3)],
    load: LOADERS[i.name],
  }))
  .sort((a, b) => a.title.localeCompare(b.title))

export function getDemo(name: string) {
  return DEMOS.find(d => d.name === name)
}
```

- [ ] **Step 5: Write `components/demos/use-demo.ts`**

```ts
"use client"

import * as React from "react"
import { getDemo, type DemoModule } from "./registry"

/** Loads a demo module on the client; null until it has loaded (or for unknown names). */
export function useDemo(name: string): DemoModule | null {
  const [mod, setMod] = React.useState<DemoModule | null>(null)
  React.useEffect(() => {
    let alive = true
    setMod(null)
    getDemo(name)?.load().then(m => { if (alive) setMod(m) })
    return () => { alive = false }
  }, [name])
  return mod
}
```

- [ ] **Step 6:** In `app/docs/components/[component]/page.tsx` replace `ComponentPreview`/`getComponentExampleCode` with:

```tsx
const demo = useDemo(component.name)
// preview:
{demo ? <demo.default /> : <Skeleton className="h-24 w-full" />}
// code:
<CodeBlock code={demo?.code ?? ""} />
```

Then `git rm components/component-preview.tsx lib/component-examples.ts scripts/split-demos.py` (the script is one-off; its output is the source of truth now).

- [ ] **Step 7:** `pnpm test` (registry tests PASS), gates, Chrome: `/docs/components/button`, `/docs/components/dialog`, `/docs/components/chart` show their demos and code.
- [ ] **Step 8: Commit** — `git add -A components/demos vitest.config.ts app/docs && git commit -m "refactor: one demo module per component behind a typed registry"`

---

### Task 4: App shell — desktop frame, menu bar, dock, command menu

**Files:**
- Create: `components/shell/use-desktop-frame.ts`, `components/shell/app-frame.tsx`, `components/shell/menu-bar.tsx`, `components/shell/dock.tsx`, `components/shell/command-menu.tsx`, `components/shell/commands.ts`
- Test: `components/shell/commands.test.ts`, `components/shell/use-desktop-frame.test.ts`
- Modify: `app/layout.tsx`
- Delete: `components/header.tsx`, `components/footer.tsx`

**Interfaces:**
- Consumes: `useWallpaper` (Task 2), `DEMOS`/`CATEGORIES` (Task 3), `Command*` from `@/components/ui/command`, `DropdownMenu*`, `Tooltip*`, `Button`, `liquidProps`.
- Produces:
  ```ts
  export const DESKTOP_QUERY = "(min-width: 1024px) and (min-height: 640px)"
  export function useDesktopFrame(): boolean           // false during SSR and first client render
  export interface CommandItem { id: string; title: string; group: "Components" | "Docs" | "Blocks" | "Wallpapers" | "Actions"; keywords: string[]; href?: string; action?: string }
  export function searchCommands(items: CommandItem[], query: string): CommandItem[]
  export function AppFrame(props: { children: React.ReactNode }): JSX.Element
  export const NAV: { title: string; href: string; icon: LucideIcon }[]   // used by dock + menu bar
  ```

- [ ] **Step 1: Failing tests**

`components/shell/commands.test.ts`:

```ts
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
```

`components/shell/use-desktop-frame.test.ts`:

```ts
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
```

Add `"components/**/*.test.ts"` to vitest include if Task 3 didn't. Run → FAIL.

- [ ] **Step 2: Implement `components/shell/commands.ts`**

```ts
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
```

- [ ] **Step 3: Implement `components/shell/use-desktop-frame.ts`**

```ts
"use client"

import * as React from "react"

export const DESKTOP_QUERY = "(min-width: 1024px) and (min-height: 640px)"

export function matchesDesktop() {
  return typeof matchMedia === "function" && matchMedia(DESKTOP_QUERY).matches
}

/** True when the non-scrolling desktop frame applies. False on the server and first client render. */
export function useDesktopFrame() {
  const [desktop, setDesktop] = React.useState(false)
  React.useEffect(() => {
    const mq = matchMedia(DESKTOP_QUERY)
    const update = () => setDesktop(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])
  return desktop
}
```

Run `pnpm test` → both new test files PASS.

- [ ] **Step 4: Implement `components/shell/menu-bar.tsx`**

```tsx
"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Command as CommandIcon, Github, Moon, Sun, Image as ImageIcon, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { liquidProps } from "@/lib/liquid-glass/material"
import { useWallpaper } from "@/components/wallpaper"
import { NAV } from "./nav"

export function MenuBar({ webgl, onCommand }: { webgl: boolean; onCommand: () => void }) {
  const { resolvedTheme, setTheme } = useTheme()
  const { preset, presets, setPreset } = useWallpaper()
  const [stars, setStars] = React.useState<number | null>(null)
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
    fetch("https://api.github.com/repos/crenspire/glass-ui")
      .then(r => r.json())
      .then(d => typeof d.stargazers_count === "number" && setStars(d.stargazers_count))
      .catch(() => {})
  }, [])

  return (
    <div {...liquidProps({ role: "bar", webgl }, { className: "flex h-12 items-center gap-2 px-3 text-sm" })}>
      <Link href="/" className="flex items-center gap-2 pr-2 font-semibold">
        {mounted && <Image src={resolvedTheme === "dark" ? "/logo-dark.png" : "/logo-light.png"} alt="" width={80} height={20} className="h-5 w-auto" priority />}
        <span>Glass UI</span>
      </Link>
      <nav className="hidden items-center gap-1 md:flex">
        {NAV.slice(1, 5).map(n => (
          <Button key={n.href} asChild variant="ghost" size="sm" className="h-8 rounded-full px-3">
            <Link href={n.href}>{n.title}</Link>
          </Button>
        ))}
      </nav>
      <div className="ml-auto flex items-center gap-1">
        <Button variant="ghost" size="sm" className="h-8 gap-1.5 rounded-full px-3 text-muted-foreground" onClick={onCommand} aria-label="Open command menu">
          <CommandIcon className="size-3.5" /> K
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8" aria-label="Wallpaper"><ImageIcon className="size-4" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>Wallpaper</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {presets.map(p => (
              <DropdownMenuItem key={p.id} onSelect={() => setPreset(p.id)} className="gap-2">
                <span className="size-4 rounded-full" style={{ background: `linear-gradient(135deg, ${p.dark.shapes[0]}, ${p.dark.shapes[2]})` }} />
                {p.name}
                {p.id === preset.id && <Check className="ml-auto size-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="icon" className="size-8" aria-label="Toggle theme"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
          {mounted && resolvedTheme === "light" ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>
        <Button asChild variant="ghost" size="sm" className="h-8 gap-1.5 rounded-full px-3">
          <a href="https://github.com/crenspire/glass-ui" target="_blank" rel="noreferrer"><Github className="size-4" />{stars ?? ""}</a>
        </Button>
      </div>
    </div>
  )
}
```

`components/shell/nav.ts`:

```ts
import { Home, LayoutGrid, Boxes, Palette, Droplets, type LucideIcon } from "lucide-react"

export const NAV: { title: string; href: string; icon: LucideIcon }[] = [
  { title: "Home", href: "/", icon: Home },
  { title: "Docs", href: "/docs/getting-started", icon: Droplets },
  { title: "Components", href: "/components", icon: LayoutGrid },
  { title: "Blocks", href: "/blocks", icon: Boxes },
  { title: "Themes", href: "/themes", icon: Palette },
]
```

(The dock also links `/liquid`; see below.)

- [ ] **Step 5: Implement `components/shell/dock.tsx`**

```tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { liquidProps } from "@/lib/liquid-glass/material"
import { cn } from "@/lib/utils"
import { NAV } from "./nav"

const ITEMS = [...NAV.filter(n => n.title !== "Docs"), { title: "Liquid demo", href: "/liquid", icon: Sparkles }]

/** macOS-style dock. Neighbours of the hovered icon grow a little; the active page gets a dot. */
export function Dock({ webgl }: { webgl: boolean }) {
  const pathname = usePathname()
  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href) || (href === "/components" && pathname.startsWith("/docs")))
  return (
    <TooltipProvider delayDuration={150}>
      <nav aria-label="Dock" {...liquidProps({ role: "bar", webgl }, { className: "dock flex items-end gap-2 px-2.5 py-2" })}>
        {ITEMS.map(({ title, href, icon: Icon }) => (
          <Tooltip key={href}>
            <TooltipTrigger asChild>
              <Button asChild size="icon" material="clear" webgl={webgl}
                className={cn("dock-item relative size-12 transition-[scale] duration-200 motion-reduce:transition-none", active(href) && "after:absolute after:-bottom-1.5 after:size-1 after:rounded-full after:bg-foreground")}>
                <Link href={href} aria-label={title} aria-current={active(href) ? "page" : undefined}><Icon className="size-5" /></Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">{title}</TooltipContent>
          </Tooltip>
        ))}
      </nav>
    </TooltipProvider>
  )
}
```

Append to `app/globals.css` (inside the `@layer components` block, after `.lg-control:active`):

```css
  /* Dock magnification */
  .dock .dock-item:hover { scale: 1.3; }
  .dock .dock-item:has(+ .dock-item:hover), .dock .dock-item:hover + .dock-item { scale: 1.12; }
  @media (prefers-reduced-motion: reduce) { .dock .dock-item:hover, .dock .dock-item:has(+ .dock-item:hover), .dock .dock-item:hover + .dock-item { scale: none; } }
```

- [ ] **Step 6: Implement `components/shell/command-menu.tsx`**

```tsx
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { DEMOS } from "@/components/demos/registry"
import { useWallpaper } from "@/components/wallpaper"
import { searchCommands, type CommandItem as Item } from "./commands"

const BLOCKS = ["dashboard", "authentication", "signup", "forgot-password", "calendar", "chart"]
const DOCS = [
  { title: "Getting started", href: "/docs/getting-started" },
  { title: "Customization", href: "/docs/customization" },
]

export function CommandMenu({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()
  const { presets, setPreset } = useWallpaper()
  const [query, setQuery] = React.useState("")

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); onOpenChange(!open) }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onOpenChange])

  const items = React.useMemo<Item[]>(() => [
    ...DEMOS.map(d => ({ id: `c:${d.name}`, title: d.title, group: "Components" as const, keywords: [d.category, ...d.keywords], href: `/docs/components/${d.name}` })),
    ...DOCS.map(d => ({ id: `d:${d.href}`, title: d.title, group: "Docs" as const, keywords: ["docs"], href: d.href })),
    ...BLOCKS.map(b => ({ id: `b:${b}`, title: b.replace(/-/g, " "), group: "Blocks" as const, keywords: ["block"], href: `/blocks/${b}` })),
    ...presets.map(p => ({ id: `w:${p.id}`, title: `${p.name} wallpaper`, group: "Wallpapers" as const, keywords: ["wallpaper", "background"], action: `wallpaper:${p.id}` })),
    { id: "a:theme", title: "Toggle light / dark", group: "Actions", keywords: ["theme", "dark", "light"], action: "theme" },
  ], [presets])

  const results = searchCommands(items, query)
  const groups = ["Components", "Docs", "Blocks", "Wallpapers", "Actions"] as const

  const run = (item: Item) => {
    onOpenChange(false)
    setQuery("")
    if (item.href) router.push(item.href)
    else if (item.action === "theme") setTheme(resolvedTheme === "dark" ? "light" : "dark")
    else if (item.action?.startsWith("wallpaper:")) setPreset(item.action.slice(10) as Parameters<typeof setPreset>[0])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0">
      <DialogTitle className="sr-only">Command menu</DialogTitle>
      {/* Filtering is ours (searchCommands), so cmdk's own filter is off. */}
      <Command shouldFilter={false}>
      <CommandInput placeholder="Search components, docs, wallpapers…" value={query} onValueChange={setQuery} />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        {groups.map(g => {
          const list = results.filter(r => r.group === g)
          return list.length ? (
            <CommandGroup key={g} heading={g}>
              {list.map(i => <CommandItem key={i.id} value={i.id} onSelect={() => run(i)}>{i.title}</CommandItem>)}
            </CommandGroup>
          ) : null
        })}
      </CommandList>
      </Command>
      </DialogContent>
    </Dialog>
  )
}
```

`CommandDialog` cannot disable cmdk's own filtering, so the menu composes `Dialog` + `Command shouldFilter={false}` directly; no component changes.

- [ ] **Step 7: Implement `components/shell/app-frame.tsx`**

```tsx
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useDesktopFrame } from "./use-desktop-frame"
import { MenuBar } from "./menu-bar"
import { Dock } from "./dock"
import { CommandMenu } from "./command-menu"

/**
 * Desktop-size screens: a non-scrolling frame (menu bar, content, dock); content scrolls inside
 * windows, so nothing ever slides under the bar or dock and both can be WebGL glass. Smaller
 * screens: the page scrolls and the bar and dock fall back to CSS glass.
 */
export function AppFrame({ children }: { children: React.ReactNode }) {
  const desktop = useDesktopFrame()
  const [command, setCommand] = React.useState(false)
  return (
    <div className={cn("flex flex-col", desktop ? "h-dvh overflow-hidden" : "min-h-dvh")}>
      <header className={cn("z-40 px-3 pt-3", !desktop && "sticky top-0")}>
        <MenuBar webgl={desktop} onCommand={() => setCommand(true)} />
      </header>
      <main className={cn("min-h-0 flex-1 px-3 py-3", desktop ? "overflow-hidden" : "pb-28")}>{children}</main>
      <footer className={cn("z-40 flex justify-center pb-3", !desktop && "fixed inset-x-0 bottom-0")}>
        <Dock webgl={desktop} />
      </footer>
      <CommandMenu open={command} onOpenChange={setCommand} />
    </div>
  )
}
```

- [ ] **Step 8: Layout** — `app/layout.tsx` body becomes:

```tsx
<ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
  <LiquidGlassProvider>
    <WallpaperProvider>
      <Wallpaper />
      <AppFrame>{children}</AppFrame>
      <Toaster />
    </WallpaperProvider>
  </LiquidGlassProvider>
</ThemeProvider>
```

Remove the `Header`/`Footer` imports; `git rm components/header.tsx components/footer.tsx`. Existing pages that assumed page scrolling (`/`, `/components`, `/docs/*`, `/blocks/*`, `/themes`, `/liquid`) must scroll inside the content area on desktop until their redesign tasks land: wrap `{children}` in `<div className={cn(desktop && "h-full overflow-y-auto")}>` inside `<main>` (Tasks 5–9 replace this per page with windows).

- [ ] **Step 9: Verify** — gates. Chrome at 1440×900 (visible): menu bar and dock are `data-glass-live`; dock magnifies on hover; ⌘K opens, typing "dia" lists Dialog, Enter navigates; wallpaper menu switches presets; resize to 390×844: page scrolls, bar is sticky, dock fixed at bottom, both without `data-glass` attribute (CSS glass).
- [ ] **Step 10: Commit** — `git add -A components/shell app && git commit -m "feat: desktop shell with menu bar, dock and command menu"`

---

### Task 5: Home desktop

**Files:**
- Create: `components/desktop/material-context.tsx`, `components/desktop/widgets.tsx`, `components/desktop/hero.tsx`
- Modify: `app/page.tsx` (rewrite)

**Interfaces:**
- Consumes: Button, Card*, Switch, Slider, Calendar, Input, Tabs*, Badge from `@/components/ui/glass`; `useDesktopFrame`.
- Produces: `DesktopMaterialProvider`, `useDesktopMaterial(): [Material, (m: Material) => void]`; widgets `ControlCenter`, `NowPlaying`, `Weather`, `CalendarWidget`, `Messages`, `MaterialsWidget`, `About`.

- [ ] **Step 1: `components/desktop/material-context.tsx`**

```tsx
"use client"

import * as React from "react"
import type { Material } from "@/lib/liquid-glass/material"

const Ctx = React.createContext<[Material, (m: Material) => void]>(["regular", () => {}])

/** The Materials widget switches every widget on the desktop between regular, clear and tinted. */
export function DesktopMaterialProvider({ children }: { children: React.ReactNode }) {
  const state = React.useState<Material>("regular")
  return <Ctx.Provider value={state}>{children}</Ctx.Provider>
}

export const useDesktopMaterial = () => React.useContext(Ctx)
```

- [ ] **Step 2: `components/desktop/widgets.tsx`**

```tsx
"use client"

import * as React from "react"
import Link from "next/link"
import { Wifi, Bluetooth, Moon, Sun, Volume2, SkipBack, SkipForward, Play, Pause, CloudSun, Send, Github } from "lucide-react"
import { Button, Card, Switch, Slider, Calendar, Input, Tabs, TabsList, TabsTrigger, Badge } from "@/components/ui/glass"
import { cn } from "@/lib/utils"
import { useDesktopMaterial } from "./material-context"

function Widget({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  const [material] = useDesktopMaterial()
  return (
    <Card material={material} className={cn("gap-3 p-4", className)}>
      <p className="text-xs font-semibold uppercase tracking-wider opacity-60">{title}</p>
      {children}
    </Card>
  )
}

export function ControlCenter() {
  const [wifi, setWifi] = React.useState(true)
  const [bt, setBt] = React.useState(true)
  const [focus, setFocus] = React.useState(false)
  const [brightness, setBrightness] = React.useState([70])
  const [volume, setVolume] = React.useState([45])
  const row = (icon: React.ReactNode, label: string, on: boolean, set: (v: boolean) => void) => (
    <div className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-2 text-sm font-medium">{icon}{label}</span>
      <Switch checked={on} onCheckedChange={set} aria-label={label} />
    </div>
  )
  return (
    <Widget title="Control Center">
      {row(<Wifi className="size-4" />, "Wi-Fi", wifi, setWifi)}
      {row(<Bluetooth className="size-4" />, "Bluetooth", bt, setBt)}
      {row(<Moon className="size-4" />, "Focus", focus, setFocus)}
      <div className="flex items-center gap-3"><Sun className="size-4 shrink-0 opacity-70" /><Slider value={brightness} onValueChange={setBrightness} aria-label="Brightness" /></div>
      <div className="flex items-center gap-3"><Volume2 className="size-4 shrink-0 opacity-70" /><Slider value={volume} onValueChange={setVolume} aria-label="Volume" /></div>
    </Widget>
  )
}

export function NowPlaying() {
  const [playing, setPlaying] = React.useState(true)
  const [pos, setPos] = React.useState([38])
  return (
    <Widget title="Now Playing">
      <div className="flex items-center gap-3">
        <div className="size-14 shrink-0 rounded-2xl bg-gradient-to-br from-fuchsia-500 via-orange-400 to-amber-300" />
        <div className="min-w-0"><p className="truncate font-semibold">Refraction</p><p className="truncate text-sm opacity-70">Glass UI Sessions</p></div>
      </div>
      <Slider value={pos} onValueChange={setPos} aria-label="Position" />
      <div className="flex items-center justify-center gap-3">
        <Button size="icon" material="clear" aria-label="Previous"><SkipBack className="size-4" /></Button>
        <Button size="icon" aria-label={playing ? "Pause" : "Play"} onClick={() => setPlaying(p => !p)}>{playing ? <Pause className="size-4" /> : <Play className="size-4" />}</Button>
        <Button size="icon" material="clear" aria-label="Next"><SkipForward className="size-4" /></Button>
      </div>
    </Widget>
  )
}

export function Weather() {
  const hours = [["Now", 21], ["13", 22], ["14", 23], ["15", 23], ["16", 22]] as const
  return (
    <Widget title="Weather">
      <div className="flex items-end justify-between">
        <div><p className="text-4xl font-light">21°</p><p className="text-sm opacity-70">Cupertino · Partly cloudy</p></div>
        <CloudSun className="size-10 opacity-80" />
      </div>
      <div className="flex justify-between text-center text-xs">
        {hours.map(([h, t]) => <div key={h}><p className="opacity-60">{h}</p><p className="font-semibold">{t}°</p></div>)}
      </div>
    </Widget>
  )
}

export function CalendarWidget() {
  const [day, setDay] = React.useState<Date | undefined>(new Date())
  return (
    <Widget title="Calendar" className="items-center">
      <Calendar mode="single" selected={day} onSelect={setDay} variant="default" className="p-0" />
    </Widget>
  )
}

export function Messages() {
  const [messages, setMessages] = React.useState([
    { me: false, text: "Did you try the new glass?" },
    { me: true, text: "It actually bends the wallpaper 🤯" },
  ])
  const [draft, setDraft] = React.useState("")
  const send = () => {
    if (!draft.trim()) return
    setMessages(m => [...m, { me: true, text: draft.trim() }])
    setDraft("")
  }
  return (
    <Widget title="Messages">
      <div className="flex flex-col gap-2">
        {messages.slice(-3).map((m, i) => (
          <p key={i} className={cn("max-w-[85%] rounded-2xl px-3 py-1.5 text-sm", m.me ? "self-end bg-primary text-primary-foreground" : "self-start bg-foreground/10")}>{m.text}</p>
        ))}
      </div>
      <form className="flex gap-2" onSubmit={e => { e.preventDefault(); send() }}>
        <Input value={draft} onChange={e => setDraft(e.target.value)} placeholder="iMessage" aria-label="Message" />
        <Button type="submit" size="icon" material="tinted" aria-label="Send"><Send className="size-4" /></Button>
      </form>
    </Widget>
  )
}

export function MaterialsWidget() {
  const [material, setMaterial] = useDesktopMaterial()
  return (
    <Widget title="Material">
      <Tabs value={material} onValueChange={v => setMaterial(v as typeof material)}>
        <TabsList className="w-full">
          <TabsTrigger value="regular" className="flex-1">Regular</TabsTrigger>
          <TabsTrigger value="clear" className="flex-1">Clear</TabsTrigger>
          <TabsTrigger value="tinted" className="flex-1">Tinted</TabsTrigger>
        </TabsList>
      </Tabs>
      <p className="text-sm opacity-70">Switches every widget on this desktop.</p>
    </Widget>
  )
}

export function About() {
  return (
    <Widget title="About">
      <p className="text-sm">50+ React components with real liquid glass — refraction, dispersion and a light-tracking rim.</p>
      <div className="flex flex-wrap gap-2">
        <Badge>shadcn registry</Badge><Badge>Radix</Badge><Badge>Tailwind v4</Badge>
      </div>
      <div className="flex gap-2">
        <Button asChild size="sm" material="clear"><a href="https://github.com/crenspire/glass-ui" target="_blank" rel="noreferrer"><Github className="size-4" />GitHub</a></Button>
        <Button asChild size="sm" material="clear"><Link href="/docs/getting-started">Docs</Link></Button>
      </div>
    </Widget>
  )
}
```

- [ ] **Step 3: `components/desktop/hero.tsx`**

```tsx
"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/glass"
import { liquidProps } from "@/lib/liquid-glass/material"

const INSTALL = "pnpm dlx shadcn@latest add @glass-ui/button"

export function Hero() {
  const [copied, setCopied] = React.useState(false)
  return (
    <div className="flex max-w-md flex-col gap-6 text-white [text-shadow:0_2px_24px_rgb(0_0_0/0.25)]">
      <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight xl:text-6xl">Liquid glass,<br />for the web.</h1>
      <p className="text-lg text-white/85">Fifty-plus React components whose glass really bends light. Drop-in replacements for shadcn/ui.</p>
      <div className="flex flex-wrap gap-3">
        <Button asChild size="lg" material="tinted"><Link href="/docs/getting-started">Get started <ArrowRight className="size-4" /></Link></Button>
        <Button asChild size="lg"><Link href="/components">Browse components</Link></Button>
      </div>
      <button
        type="button"
        onClick={() => { navigator.clipboard.writeText(INSTALL); setCopied(true); setTimeout(() => setCopied(false), 1500) }}
        {...liquidProps({ role: "control", material: "clear" }, { className: "flex h-11 items-center gap-3 px-4 font-mono text-sm" })}
      >
        <span className="truncate">{INSTALL}</span>{copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </button>
    </div>
  )
}
```

(The hero text sits directly on the wallpaper, so it is white with a soft shadow in both themes.)

- [ ] **Step 4: Rewrite `app/page.tsx`**

```tsx
import { Hero } from "@/components/desktop/hero"
import { DesktopMaterialProvider } from "@/components/desktop/material-context"
import { About, CalendarWidget, ControlCenter, MaterialsWidget, Messages, NowPlaying, Weather } from "@/components/desktop/widgets"

export default function Home() {
  return (
    <DesktopMaterialProvider>
      <div className="mx-auto flex h-full max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:gap-12 lg:px-6">
        <div className="pt-10 lg:w-[38%] lg:pt-0"><Hero /></div>
        {/* Widgets tile; they never overlap, so each can be shader glass. */}
        <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 lg:max-h-full lg:overflow-y-auto lg:py-2">
          <ControlCenter />
          <NowPlaying />
          <Weather />
          <Messages />
          <CalendarWidget />
          <div className="flex flex-col gap-4"><MaterialsWidget /><About /></div>
        </div>
      </div>
    </DesktopMaterialProvider>
  )
}
```

- [ ] **Step 5: Verify** — gates; Chrome 1440×900 visible: no document scroll; widgets are live glass (count with `document.querySelectorAll('[data-glass-live]').length` ≥ 6 cards); switch tracks painted; Materials tabs switch all widget cards; 390×844: hero then widgets stack, page scrolls.
- [ ] **Step 6: Commit** — `git add -A components/desktop app/page.tsx && git commit -m "feat: desktop home with live glass widgets"`

---

### Task 6: Settings layout — components gallery and component docs

**Files:**
- Create: `components/settings/sidebar.tsx`, `components/settings/window.tsx`, `components/code-block.tsx`, `app/(settings)/layout.tsx`
- Move: `app/components/page.tsx` → `app/(settings)/components/page.tsx`; `app/docs/**` → `app/(settings)/docs/**` (`git mv`; URLs unchanged)
- Modify/rewrite: `app/(settings)/components/page.tsx`, `app/(settings)/docs/components/[component]/page.tsx`
- Delete: `app/docs/layout.tsx` (replaced by the group layout), `components/docs-sidebar.tsx`

**Interfaces:**
- Consumes: `DEMOS`, `CATEGORIES`, `useDemo` (Task 3); `useDesktopFrame` (Task 4).
- Produces: `SettingsWindow({ className, children })` (a liquid surface window with internal scroll), `CodeBlock({ code })`, `SettingsSidebar({ onNavigate? })`.

- [ ] **Step 1: `components/code-block.tsx`** — move the duplicated `CodeBlock` (currently in `app/docs/components/[component]/page.tsx`, `app/docs/getting-started/page.tsx`, `app/blocks/[block]/page.tsx`) here, with `rounded-2xl bg-black/35 text-white` instead of glass classes so code stays readable on any wallpaper:

```tsx
"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false)
  return (
    <div className="relative">
      <pre className="overflow-x-auto rounded-2xl bg-black/40 p-4 font-mono text-sm text-white/90">
        <code className="whitespace-pre">{code}</code>
      </pre>
      <Button variant="ghost" size="icon" className="absolute right-2 top-2 size-8 text-white/70 hover:text-white" aria-label="Copy code"
        onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000) }}>
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </Button>
    </div>
  )
}
```

Replace the three local copies with `import { CodeBlock } from "@/components/code-block"`.

- [ ] **Step 2: `components/settings/window.tsx`**

```tsx
import { Card } from "@/components/ui/glass"
import { cn } from "@/lib/utils"

/** A glass window tile. Content scrolls inside it on desktop. */
export function SettingsWindow({ className, children }: { className?: string; children: React.ReactNode }) {
  return <Card className={cn("gap-0 overflow-hidden p-0", className)}>{children}</Card>
}
```

- [ ] **Step 3: `components/settings/sidebar.tsx`**

```tsx
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/glass"
import { CATEGORIES, DEMOS } from "@/components/demos/registry"
import { cn } from "@/lib/utils"

const GUIDES = [
  { title: "Getting started", href: "/docs/getting-started" },
  { title: "Customization", href: "/docs/customization" },
  { title: "Appearance", href: "/themes" },
  { title: "All components", href: "/components" },
]

export function SettingsSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const [q, setQ] = React.useState("")
  const match = (t: string) => t.toLowerCase().includes(q.trim().toLowerCase())
  const link = (title: string, href: string) => (
    <Link key={href} href={href} onClick={onNavigate} aria-current={pathname === href ? "page" : undefined}
      className={cn("block rounded-full px-3 py-1.5 text-sm transition-colors hover:bg-foreground/8",
        pathname === href && "bg-primary text-primary-foreground hover:bg-primary")}>
      {title}
    </Link>
  )
  return (
    <div className="flex h-full flex-col gap-3 p-3">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 opacity-60" />
        <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search" className="pl-9" aria-label="Search docs" />
      </div>
      <nav className="-mx-1 flex-1 space-y-4 overflow-y-auto px-1 pb-4">
        <div className="space-y-0.5">{GUIDES.filter(g => match(g.title)).map(g => link(g.title, g.href))}</div>
        {CATEGORIES.map(cat => {
          const items = DEMOS.filter(d => d.category === cat && (match(d.title) || match(cat)))
          return items.length ? (
            <div key={cat} className="space-y-0.5">
              <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider opacity-55">{cat}</p>
              {items.map(d => link(d.title, `/docs/components/${d.name}`))}
            </div>
          ) : null
        })}
      </nav>
    </div>
  )
}
```

- [ ] **Step 4: `app/(settings)/layout.tsx`**

```tsx
"use client"

import * as React from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/glass"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { SettingsSidebar } from "@/components/settings/sidebar"
import { SettingsWindow } from "@/components/settings/window"
import { useDesktopFrame } from "@/components/shell/use-desktop-frame"

/** System Settings: a sidebar window beside a scrolling detail column of tiles. */
export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const desktop = useDesktopFrame()
  const [open, setOpen] = React.useState(false)
  if (!desktop) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild><Button size="sm" className="self-start"><Menu className="size-4" />Browse</Button></SheetTrigger>
          <SheetContent side="left" className="w-[300px] p-0"><SheetTitle className="sr-only">Docs</SheetTitle><SettingsSidebar onNavigate={() => setOpen(false)} /></SheetContent>
        </Sheet>
        {children}
      </div>
    )
  }
  return (
    <div className="mx-auto flex h-full max-w-7xl gap-4">
      <SettingsWindow className="w-64 shrink-0"><SettingsSidebar /></SettingsWindow>
      <div className="min-w-0 flex-1 overflow-y-auto pr-1">
        <div className="flex flex-col gap-4 pb-4">{children}</div>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Gallery `app/(settings)/components/page.tsx`** (rewrite)

```tsx
"use client"

import Link from "next/link"
import { Card } from "@/components/ui/glass"
import { CATEGORIES, DEMOS } from "@/components/demos/registry"
import { useDemo } from "@/components/demos/use-demo"
import { Skeleton } from "@/components/ui/skeleton"

function Tile({ name, title }: { name: string; title: string }) {
  const demo = useDemo(name)
  return (
    <Card className="gap-3 p-4">
      <div className="flex min-h-36 items-center justify-center overflow-hidden">
        {demo ? <div className="pointer-events-auto origin-center scale-[.85]"><demo.default /></div> : <Skeleton className="h-20 w-3/4" />}
      </div>
      <Link href={`/docs/components/${name}`} className="text-sm font-semibold hover:underline">{title} →</Link>
    </Card>
  )
}

export default function ComponentsPage() {
  return (
    <>
      <Card className="gap-1 p-6">
        <h1 className="text-2xl font-semibold">Components</h1>
        <p className="text-muted-foreground">{DEMOS.length} liquid glass components. Every tile is live.</p>
      </Card>
      {CATEGORIES.map(cat => (
        <section key={cat} className="space-y-3">
          <h2 className="px-2 text-sm font-semibold uppercase tracking-wider text-white/85 [text-shadow:0_1px_12px_rgb(0_0_0/0.3)]">{cat}</h2>
          <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
            {DEMOS.filter(d => d.category === cat).map(d => <Tile key={d.name} name={d.name} title={d.title} />)}
          </div>
        </section>
      ))}
    </>
  )
}
```

- [ ] **Step 6: Docs page `app/(settings)/docs/components/[component]/page.tsx`** (rewrite)

```tsx
"use client"

import * as React from "react"
import { use } from "react"
import { notFound } from "next/navigation"
import { BookOpen } from "lucide-react"
import { Badge, Button, Card, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/glass"
import { Skeleton } from "@/components/ui/skeleton"
import { CodeBlock } from "@/components/code-block"
import { InstallationInstructions } from "@/components/installation-instructions"
import { getDemo } from "@/components/demos/registry"
import { useDemo } from "@/components/demos/use-demo"
import { getStorybookUrl } from "@/lib/storybook-url"
import { getComponent } from "@/lib/registry"
import type { Material } from "@/lib/liquid-glass/material"

export default function ComponentDocs({ params }: { params: Promise<{ component: string }> }) {
  const { component: name } = use(params)
  const component = getComponent(name)
  const entry = getDemo(name)
  const demo = useDemo(name)
  const [material, setMaterial] = React.useState<Material>("regular")
  if (!component || !entry) notFound()

  return (
    <>
      <Card className="gap-4 p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2"><h1 className="text-2xl font-semibold">{entry.title}</h1><Badge>{entry.category}</Badge></div>
            <p className="text-muted-foreground">{component.description}</p>
          </div>
          <Button asChild size="sm" material="clear"><a href={getStorybookUrl(name)} target="_blank" rel="noreferrer"><BookOpen className="size-4" />Storybook</a></Button>
        </div>
        <Tabs value={material} onValueChange={v => setMaterial(v as Material)}>
          <TabsList>
            <TabsTrigger value="regular">Regular</TabsTrigger>
            <TabsTrigger value="clear">Clear</TabsTrigger>
            <TabsTrigger value="tinted">Tinted</TabsTrigger>
          </TabsList>
        </Tabs>
      </Card>

      {/* The stage has no window: the demo rests on the wallpaper and gets real refraction. */}
      <section aria-label="Preview" className="flex min-h-80 items-center justify-center px-4 py-10">
        {demo ? <demo.default material={material} /> : <Skeleton className="h-24 w-64" />}
      </section>

      <Card className="gap-4 p-6">
        <Tabs defaultValue="code">
          <TabsList><TabsTrigger value="code">Code</TabsTrigger><TabsTrigger value="props">Props</TabsTrigger><TabsTrigger value="install">Install</TabsTrigger></TabsList>
          <TabsContent value="code" className="mt-4"><CodeBlock code={demo?.code ?? ""} /></TabsContent>
          <TabsContent value="props" className="mt-4 space-y-1 text-sm text-muted-foreground">
            <p><code>material</code> — regular (default), clear or tinted liquid glass</p>
            <p><code>tint</code> — any CSS colour to tint the glass</p>
            <p><code>glass</code> — per-instance override: <code>{"{ tint, frost }"}</code></p>
            <p><code>webgl</code> — draw with the WebGL shader inside a LiquidGlassProvider (default depends on the role)</p>
            <p><code>variant</code> — liquid (default) or default for the plain shadcn style</p>
          </TabsContent>
          <TabsContent value="install" className="mt-4"><InstallationInstructions componentName={name} /></TabsContent>
        </Tabs>
      </Card>
    </>
  )
}
```

`getStorybookUrl(componentName: string): string` is exported by `lib/storybook-url.ts`.

- [ ] **Step 7: Move files** — `git mv app/components app/(settings)/components`; `git mv app/docs app/(settings)/docs`; `git rm "app/(settings)/docs/layout.tsx" components/docs-sidebar.tsx`. Quote the paths with parentheses in the shell.

- [ ] **Step 8: Verify** — gates; Chrome 1440×900 visible: `/components` sidebar + category sections, tiles live; `/docs/components/button`: header window, bare-wallpaper stage with the button **live on layer 0** (`data-glass-live` and no glass ancestor), material tabs change it; code/props/install tabs work; sidebar search "sli" shows Slider; 390×844: Browse sheet.
- [ ] **Step 9: Commit** — `git add -A app components && git commit -m "feat: System Settings layout for components and docs"`

---

### Task 7: Docs prose pages

**Files:**
- Modify: `app/(settings)/docs/getting-started/page.tsx`
- Create: `app/(settings)/docs/customization/page.tsx`

- [ ] **Step 1:** Split `getting-started/page.tsx`: everything from the `<Card … id="glass-customization">` block moves into `customization/page.tsx` (same JSX, wrapped in the page's own default export); getting-started keeps installation, MCP and usage. Replace the outer page wrappers (`container`, headings outside cards) with `<Card className="gap-6 p-8">` windows; keep inner content. Remove the page's local `CodeBlock` (Task 6 made the shared one) and the `#glass-customization` anchor links (`/docs/customization` instead).
- [ ] **Step 2:** In `customization/page.tsx` add at the top a live comparison row on bare wallpaper:

```tsx
<section aria-label="Materials" className="flex flex-wrap items-center justify-center gap-4 py-8">
  <Button>Regular</Button>
  <Button material="clear">Clear</Button>
  <Button material="tinted">Tinted</Button>
  <Button material="tinted" tint="#f97316">Tinted orange</Button>
</section>
```

- [ ] **Step 3:** Verify — gates; `/docs/getting-started` and `/docs/customization` render as windows, links in the sidebar highlight; ⌘K "custom" finds Customization.
- [ ] **Step 4: Commit** — `git commit -am "feat: docs prose pages as Settings windows"` (add the new file first).

---

### Task 8: Blocks — Mission Control and block detail

**Files:**
- Create: `lib/blocks.ts`
- Modify: `app/blocks/page.tsx`, `app/blocks/[block]/page.tsx` (rewrite both)
- Test: `lib/blocks.test.ts`

**Interfaces:**
- Produces: `BLOCKS: { name: string; title: string; description: string; category: string; code: string }[]`, `getBlock(name): Block | undefined`, `BLOCK_COMPONENTS: Record<string, React.ComponentType>` (in the page file).

- [ ] **Step 1: Failing test** `lib/blocks.test.ts`:

```ts
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
```

Run → FAIL.

- [ ] **Step 2:** Create `lib/blocks.ts` by moving the `blocks` array from `app/blocks/page.tsx` (name/title/description/category) and the `code` strings from `app/blocks/[block]/page.tsx` into one list, plus `export function getBlock(name: string) { return BLOCKS.find(b => b.name === name) }`. Run → PASS.

- [ ] **Step 3: `app/blocks/page.tsx`** (rewrite)

```tsx
"use client"

import Link from "next/link"
import { BLOCKS } from "@/lib/blocks"
import { BLOCK_COMPONENTS } from "./block-components"

/** Mission Control: each block is a scaled live window on the wallpaper. */
export default function BlocksPage() {
  return (
    <div className="mx-auto h-full max-w-7xl overflow-y-auto">
      <div className="grid gap-x-6 gap-y-10 p-2 md:grid-cols-2 xl:grid-cols-3">
        {BLOCKS.map(b => {
          const Block = BLOCK_COMPONENTS[b.name]
          return (
            <Link key={b.name} href={`/blocks/${b.name}`} className="group flex flex-col items-center gap-3">
              <div className="relative h-64 w-full overflow-hidden rounded-[28px] transition-[scale] duration-300 group-hover:scale-[1.02]">
                <div className="pointer-events-none absolute left-0 top-0 w-[200%] origin-top-left scale-50"><Block /></div>
              </div>
              <div className="text-center text-white [text-shadow:0_1px_12px_rgb(0_0_0/0.35)]">
                <p className="font-semibold">{b.title}</p><p className="text-sm text-white/80">{b.description}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
```

Create `app/blocks/block-components.ts`:

```ts
import type * as React from "react"
import { DashboardBlock } from "@/components/blocks/dashboard"
import { AuthenticationBlock } from "@/components/blocks/authentication"
import { SignupBlock } from "@/components/blocks/signup"
import { ForgotPasswordBlock } from "@/components/blocks/forgot-password"
import { CalendarBlock } from "@/components/blocks/calendar"
import { ChartBlock } from "@/components/blocks/chart"

export const BLOCK_COMPONENTS: Record<string, React.ComponentType> = {
  dashboard: DashboardBlock, authentication: AuthenticationBlock, signup: SignupBlock,
  "forgot-password": ForgotPasswordBlock, calendar: CalendarBlock, chart: ChartBlock,
}
```

(Scaled tiles are transformed, so the engine measures their transformed rects; glass inside still draws correctly.)

- [ ] **Step 4: `app/blocks/[block]/page.tsx`** (rewrite)

```tsx
"use client"

import { use } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button, Card } from "@/components/ui/glass"
import { CodeBlock } from "@/components/code-block"
import { getBlock } from "@/lib/blocks"
import { BLOCK_COMPONENTS } from "../block-components"

export default function BlockPage({ params }: { params: Promise<{ block: string }> }) {
  const { block: name } = use(params)
  const block = getBlock(name)
  const Block = BLOCK_COMPONENTS[name]
  if (!block || !Block) notFound()
  return (
    <div className="mx-auto grid h-full max-w-7xl gap-4 lg:grid-cols-[1fr_420px]">
      <div className="min-h-0 overflow-y-auto">
        <Button asChild size="sm" material="clear" className="mb-4"><Link href="/blocks"><ArrowLeft className="size-4" />All blocks</Link></Button>
        {/* The block rests on the wallpaper: its glass is layer 0. */}
        <Block />
      </div>
      <Card className="min-h-0 gap-4 overflow-y-auto p-6">
        <div><h1 className="text-xl font-semibold">{block.title}</h1><p className="text-sm text-muted-foreground">{block.description}</p></div>
        <CodeBlock code={block.code} />
      </Card>
    </div>
  )
}
```

- [ ] **Step 5:** Verify — gates; `/blocks` grid of scaled live windows with captions on the wallpaper; `/blocks/dashboard` block left, code right; 390×844 stacks.
- [ ] **Step 6: Commit** — `git add -A lib/blocks.ts lib/blocks.test.ts app/blocks && git commit -m "feat: Mission Control blocks gallery and block detail"`

---

### Task 9: Themes — Appearance pane

**Files:**
- Move: `app/themes/page.tsx` → `app/(settings)/themes/page.tsx` (`git mv`, URL unchanged)
- Modify: that file

- [ ] **Step 1:** `git mv app/themes "app/(settings)/themes"`.
- [ ] **Step 2:** Add a Wallpaper window as the first tile:

```tsx
const { preset, presets, setPreset } = useWallpaper()
const { resolvedTheme, setTheme } = useTheme()
// …
<Card className="gap-4 p-6">
  <h1 className="text-2xl font-semibold">Appearance</h1>
  <div className="flex gap-2">
    <Button material={resolvedTheme === "light" ? "tinted" : "regular"} onClick={() => setTheme("light")}><Sun className="size-4" />Light</Button>
    <Button material={resolvedTheme === "dark" ? "tinted" : "regular"} onClick={() => setTheme("dark")}><Moon className="size-4" />Dark</Button>
  </div>
  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
    {presets.map(p => (
      <button key={p.id} onClick={() => setPreset(p.id)} aria-pressed={p.id === preset.id}
        className={cn("flex flex-col gap-2 rounded-2xl p-1.5 text-left text-sm font-medium outline-none ring-offset-2 focus-visible:ring-2", p.id === preset.id && "ring-2 ring-primary")}>
        <span className="h-20 rounded-xl" style={{ background: `linear-gradient(135deg, ${p.dark.base[0]}, ${p.dark.shapes[0]} 45%, ${p.dark.shapes[2]})` }} />
        {p.name}
      </button>
    ))}
  </div>
</Card>
```

Imports: `useWallpaper` from `@/components/wallpaper`, `useTheme` from `next-themes`, `Sun`, `Moon` from `lucide-react`, `cn`, and `Button`, `Card` from `@/components/ui/glass`.
- [ ] **Step 3:** Wrap the existing preset/custom tabs and the CSS export in `<Card className="gap-4 p-6">` windows; remove the page's outer container/margins (the Settings layout provides them); replace its local `CodeBlock`-like `<pre>` with the shared `CodeBlock`.
- [ ] **Step 4:** Verify — gates; `/themes` in the Settings layout with the sidebar's "Appearance" highlighted; wallpaper swatches switch the live wallpaper; theme buttons work; CSS export unchanged.
- [ ] **Step 5: Commit** — `git commit -am "feat: Appearance pane with wallpaper picker"`

---

### Task 10: `/liquid`, cleanup, final verification

**Files:**
- Modify: `app/liquid/page.tsx` (bottom tab bar position), `README.md` (screenshots section text), `components/ui/liquid/README.md` (mention `data-glass-backdrop` usage by the site wallpaper)

- [ ] **Step 1:** `/liquid`: change the root `<main className="min-h-screen p-7 …">` to `<div className="h-full overflow-y-auto p-4 …">` and its `<nav className="fixed bottom-7 left-7">` to `<nav className="sticky bottom-0 mt-8">` so the demo tab bar no longer collides with the dock.
- [ ] **Step 2:** `grep -rn "components/header\|components/footer\|grid-background\|component-preview\|component-examples\|docs-sidebar" app components lib stories` → no output.
- [ ] **Step 3:** Gates + `pnpm build-storybook -o <scratch dir>`.
- [ ] **Step 4: Visual pass (Chrome visible)** — for each of `/`, `/components`, `/docs/getting-started`, `/docs/customization`, `/docs/components/{button,dialog,switch,tabs,chart}`, `/blocks`, `/blocks/dashboard`, `/themes`, `/liquid`:
  - 1440×900 dark and light; screenshot.
  - Wallpapers: switch through all four on `/` and `/docs/components/button`.
  - 390×844: no horizontal scroll, dock is a bottom bar, menu bar sticky.
  - Console: no errors.
  - `[...document.querySelectorAll('[data-glass]')].filter(e => { const r = e.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight && !e.hasAttribute('data-glass-live') && getComputedStyle(e).backgroundImage === 'none' }).length` is `0` (nothing invisible).
- [ ] **Step 5: Performance** — Chrome Performance panel on `/` at 1440×900, 5 s recording: frame rate ≈ 60 fps, no long task > 50 ms attributed to `paint`/`_frame`. If above budget, lower wallpaper `FPS` to 24 and re-measure; record the result.
- [ ] **Step 6: Commit** — `git commit -am "chore: fit /liquid into the desktop shell; docs"`
