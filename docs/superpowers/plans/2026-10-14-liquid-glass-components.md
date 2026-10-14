# Liquid Glass Components Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign every Glass UI component in the liquid-glass language: a CSS/SVG look everywhere, upgraded to WebGL refraction inside `LiquidGlassProvider`, with a single `material` prop replacing all old glass variants.

**Architecture:** One helper (`lib/liquid-glass/material.ts`) turns `{ role, material, tint, glass }` into classes, CSS variables and `data-glass` attributes. One CSS layer (`.lg*` in `app/globals.css`) draws the look. The existing WebGL engine draws the elements it can (`data-glass-live`); everything else keeps the CSS look. The site hosts one provider in the root layout, refracting a canvas copy of the existing wallpaper.

**Tech Stack:** Next.js 16 (app router, Turbopack), React 19, Tailwind CSS v4, Radix UI, class-variance-authority, WebGL 1. Vitest is added as a dev dependency for pure-logic tests.

**Spec:** `docs/superpowers/specs/2026-10-14-liquid-glass-components-design.md`

## Global Constraints

- No new runtime dependencies. Dev-only addition: `vitest`.
- Materials: `regular` (default), `clear`, `tinted`. Roles: `surface`, `sheet`, `bar`, `control`, `knob`, `inline`, `overlay`. `inline` and `overlay` never get `data-glass`.
- Old variant names map to: `glass`, `glassSubtle`, `frosted` → regular; `crystal`, `fluted` → clear; `glassSolid` → tinted.
- Per-instance override is `glass?: { tint?: string; frost?: number }`. Refraction stays global.
- Engine shape cap `MAXG = 32`, solids cap `MAXS = 8`, max nesting depth drawn by WebGL = 2 (layer 0 and layer 1).
- Control heights: sm 36px (`h-9`), default 44px (`h-11`), lg 52px (`h-13`), icon `size-11`. Controls and bars are capsules (`rounded-full`); surfaces use `rounded-[28px]`; sheets use `rounded-[34px]`.
- `prefers-reduced-motion` disables press squash and engine squash. `prefers-reduced-transparency` disables WebGL and makes CSS glass near-opaque.
- Commits: conventional style (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`). **No `Co-Authored-By` trailer, no AI attribution** (user's global rule).
- Gates after every task: `npx tsc --noEmit -p . 2>&1 | grep -v rss.xml` prints nothing; `pnpm test` passes; `pnpm build` succeeds. (`.next/types/validator.ts` has a pre-existing `rss.xml` error; ignore only that line.)
- ESLint does not run in this environment (broken `globals` package in `node_modules`). Do not try to fix it.
- Dev server: `pnpm dev` (it picks port 3001 if 3000 is taken; read the port from its output).

## Review Focus

1. **More eligible glass on screen than the cap** (e.g. `/components` gallery) → the extra elements keep the CSS look; nothing ever turns invisible. Pinned by `selectShapes` tests in Task 3 and the `/components` check in Task 13.
2. **Glass three levels deep** (button in a card in a dialog) → the innermost renders as CSS, the outer two as WebGL. Pinned by the depth test in Task 3.
3. **Theme toggle while the provider is active** → wallpaper canvas repaints, glass tint switches, no frame where glass disappears. Pinned by the theme check in Task 4.
4. **Navigating away from `/liquid`** → the site wallpaper comes back (the photo backdrop is popped). Pinned by the backdrop-stack test in Task 3 and the navigation check in Task 10.
5. **No WebGL / reduced transparency** → no `lg-on` class; every component shows the CSS look. Pinned by the fallback check in Task 13.

---

### Task 1: Test runner and the material helper

**Files:**
- Modify: `package.json` (devDependency + `test` script)
- Create: `vitest.config.ts`
- Create: `lib/liquid-glass/material.ts`
- Test: `lib/liquid-glass/material.test.ts`

**Interfaces:**
- Produces (used by every later task):
  ```ts
  export type Material = "regular" | "clear" | "tinted"
  export type GlassRole = "surface" | "sheet" | "bar" | "control" | "knob" | "inline" | "overlay"
  export interface GlassOverride { tint?: string; frost?: number }
  export interface LiquidProps { material?: Material; tint?: string; glass?: GlassOverride }
  export type LegacyGlassVariant = "glass" | "glassSubtle" | "glassSolid" | "frosted" | "fluted" | "crystal"
  export function liquidGlass(opts: LiquidProps & { role: GlassRole }): { className: string; style: React.CSSProperties; attrs: DataAttrs }
  export type DataAttrs = { [K in `data-${string}`]?: string }
  export function liquidProps(opts: LiquidProps & { role: GlassRole }, own?: { className?: string; style?: React.CSSProperties }): { className: string; style: React.CSSProperties } & DataAttrs
  export function resolveVariant<V extends string>(variant: V | LegacyGlassVariant | undefined, material: Material | undefined): { variant: V | "liquid"; material: Material }
  ```

- [ ] **Step 1: Add vitest**

Run: `pnpm add -D vitest@3.2.4`
Then add to `package.json` `scripts`: `"test": "vitest run"`.

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config"
import path from "node:path"

export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
  test: { include: ["lib/**/*.test.ts"], environment: "node" },
})
```

- [ ] **Step 2: Write the failing tests**

Create `lib/liquid-glass/material.test.ts`:

```ts
import { describe, expect, it } from "vitest"
import { liquidGlass, liquidProps, resolveVariant } from "./material"

describe("liquidGlass", () => {
  it("defaults to the regular material", () => {
    const r = liquidGlass({ role: "surface" })
    expect(r.className).toBe("lg lg-regular lg-surface")
    expect(r.attrs).toEqual({ "data-glass": "card", "data-frost": "1", "data-tint": "0.2" })
    expect(r.style).toEqual({})
  })

  it("maps roles to engine presets", () => {
    expect(liquidGlass({ role: "sheet" }).attrs["data-glass"]).toBe("sheet")
    expect(liquidGlass({ role: "bar" }).attrs["data-glass"]).toBe("bar")
    expect(liquidGlass({ role: "control" }).attrs["data-glass"]).toBe("button")
    expect(liquidGlass({ role: "knob" }).attrs["data-glass"]).toBe("knob")
  })

  it("never hands inline or overlay glass to WebGL", () => {
    expect(liquidGlass({ role: "inline" }).attrs).toEqual({})
    expect(liquidGlass({ role: "overlay" }).attrs).toEqual({})
  })

  it("uses clear and tinted material parameters", () => {
    expect(liquidGlass({ role: "control", material: "clear" }).attrs).toMatchObject({ "data-frost": "0.1", "data-tint": "0" })
    const t = liquidGlass({ role: "control", material: "tinted" })
    expect(t.className).toBe("lg lg-tinted lg-control")
    expect(t.attrs).toMatchObject({ "data-frost": "0.6", "data-tint": "0.35" })
  })

  it("applies a tint colour as CSS variables", () => {
    const r = liquidGlass({ role: "surface", tint: "#ff0000" })
    expect(r.style).toEqual({ "--lg-tint": "#ff0000", "--lg-tint-amt": "18%" })
  })

  it("lets the glass override win over tint and material frost", () => {
    const r = liquidGlass({ role: "surface", tint: "red", glass: { tint: "blue", frost: 0.4 } })
    expect(r.style).toMatchObject({ "--lg-tint": "blue" })
    expect(r.attrs["data-frost"]).toBe("0.4")
  })
})

describe("liquidProps", () => {
  it("merges own className and style after the material", () => {
    const p = liquidProps({ role: "bar" }, { className: "px-2", style: { color: "red" } })
    expect(p.className).toBe("lg lg-regular lg-bar px-2")
    expect(p.style).toEqual({ color: "red" })
    expect(p["data-glass"]).toBe("bar")
  })
})

describe("resolveVariant", () => {
  it("passes non-glass variants through", () => {
    expect(resolveVariant<"default" | "liquid">("default", undefined)).toEqual({ variant: "default", material: "regular" })
  })
  it("maps legacy glass names to liquid materials", () => {
    expect(resolveVariant("glass", undefined)).toEqual({ variant: "liquid", material: "regular" })
    expect(resolveVariant("frosted", undefined)).toEqual({ variant: "liquid", material: "regular" })
    expect(resolveVariant("crystal", undefined)).toEqual({ variant: "liquid", material: "clear" })
    expect(resolveVariant("fluted", undefined)).toEqual({ variant: "liquid", material: "clear" })
    expect(resolveVariant("glassSolid", undefined)).toEqual({ variant: "liquid", material: "tinted" })
  })
  it("prefers an explicit material", () => {
    expect(resolveVariant("crystal", "tinted")).toEqual({ variant: "liquid", material: "tinted" })
  })
  it("defaults to liquid", () => {
    expect(resolveVariant(undefined, undefined)).toEqual({ variant: "liquid", material: "regular" })
  })
})
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `pnpm test`
Expected: FAIL, `Failed to resolve import "./material"`.

- [ ] **Step 4: Implement `lib/liquid-glass/material.ts`**

```ts
import type * as React from "react"
import { cn } from "@/lib/utils"

/* Liquid glass material: turns a role + material into the CSS classes (see the .lg layer in
   app/globals.css) and the data-glass attributes the WebGL engine picks up. */

export type Material = "regular" | "clear" | "tinted"
export type GlassRole = "surface" | "sheet" | "bar" | "control" | "knob" | "inline" | "overlay"
export interface GlassOverride { tint?: string; frost?: number }
export interface LiquidProps {
  /** Glass material. Default `regular`. */
  material?: Material
  /** Tint colour (any CSS colour). Defaults to the primary colour for `tinted`. */
  tint?: string
  /** Per-instance override. */
  glass?: GlassOverride
}

/** `data-*` attributes for the WebGL engine. */
export type DataAttrs = { [K in `data-${string}`]?: string }

/** @deprecated Old variant names, accepted until every usage is migrated. */
export type LegacyGlassVariant = "glass" | "glassSubtle" | "glassSolid" | "frosted" | "fluted" | "crystal"

const PRESET: Record<GlassRole, string | null> = {
  surface: "card", sheet: "sheet", bar: "bar", control: "button", knob: "knob", inline: null, overlay: null,
}
const PARAMS: Record<Material, { frost: number; tint: number }> = {
  regular: { frost: 1, tint: 0.2 },
  clear: { frost: 0.1, tint: 0 },
  tinted: { frost: 0.6, tint: 0.35 },
}
const LEGACY: Record<LegacyGlassVariant, Material> = {
  glass: "regular", glassSubtle: "regular", frosted: "regular", crystal: "clear", fluted: "clear", glassSolid: "tinted",
}

export function liquidGlass({ role, material = "regular", tint, glass }: LiquidProps & { role: GlassRole }): {
  className: string; style: React.CSSProperties; attrs: DataAttrs
} {
  const p = PARAMS[material]
  const color = glass?.tint ?? tint
  const frost = glass?.frost ?? p.frost
  const style: Record<string, string> = {}
  if (color) {
    style["--lg-tint"] = color
    if (material !== "tinted") style["--lg-tint-amt"] = "18%"
  }
  const preset = PRESET[role]
  const attrs: DataAttrs = preset
    ? { "data-glass": preset, "data-frost": String(frost), "data-tint": String(p.tint) }
    : {}
  return { className: `lg lg-${material} lg-${role}`, style: style as React.CSSProperties, attrs }
}

/** Spread onto an element: material classes/attrs merged with the element's own className and style. */
export function liquidProps(
  opts: LiquidProps & { role: GlassRole },
  own: { className?: string; style?: React.CSSProperties } = {}
): { className: string; style: React.CSSProperties } & DataAttrs {
  const r = liquidGlass(opts)
  return { ...r.attrs, className: cn(r.className, own.className), style: { ...r.style, ...own.style } }
}

/** Maps a component's `variant` (including deprecated glass names) to a variant + material. */
export function resolveVariant<V extends string>(
  variant: V | LegacyGlassVariant | undefined,
  material: Material | undefined
): { variant: V | "liquid"; material: Material } {
  if (variant === undefined) return { variant: "liquid", material: material ?? "regular" }
  if (variant in LEGACY) return { variant: "liquid", material: material ?? LEGACY[variant as LegacyGlassVariant] }
  return { variant: variant as V, material: material ?? "regular" }
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `pnpm test`
Expected: PASS (all tests in `material.test.ts`). Then run the type-check gate.

- [ ] **Step 6: Commit**

```bash
git add package.json pnpm-lock.yaml vitest.config.ts lib/liquid-glass/material.ts lib/liquid-glass/material.test.ts
git commit -m "feat: add liquid glass material helper with vitest"
```

---

### Task 2: CSS liquid layer, lens filter, site chrome

**Files:**
- Modify: `app/globals.css` (append a new `@layer components` block after the existing `@layer utilities` block, which ends near line 393)
- Create: `components/ui/liquid/liquid-filters.tsx`
- Modify: `app/layout.tsx` (render `<LiquidFilters />`)
- Modify: `components/header.tsx`, `components/footer.tsx` (use `liquidProps`)

**Interfaces:**
- Consumes: `liquidProps` from Task 1.
- Produces: CSS classes `.lg`, `.lg-regular|clear|tinted`, `.lg-surface|sheet|bar|control|knob|inline|overlay`, CSS vars `--lg-tint`, `--lg-tint-amt`, `--lg-base`, `--lg-blur`, `--lg-sat`; `export function LiquidFilters(): JSX.Element` (renders SVG filter `#lg-lens`, toggles `html.lg-lens`).

- [ ] **Step 1: Add the CSS layer to `app/globals.css`**

Insert this block directly after the closing `}` of the existing `@layer utilities { ... }` block:

```css
/* Liquid glass material. Classes come from liquidGlass() in lib/liquid-glass/material.ts.
   The rim is a gradient border-box under a padding-box wash, so no pseudo-elements are used. */
@layer components {
  :root {
    --lg-rim-hi: rgba(255, 255, 255, 0.8);
    --lg-rim-lo: rgba(255, 255, 255, 0.18);
    --lg-highlight: rgba(255, 255, 255, 0.6);
    --lg-drop: rgba(15, 23, 42, 0.14);
  }
  .dark {
    --lg-rim-hi: rgba(255, 255, 255, 0.34);
    --lg-rim-lo: rgba(255, 255, 255, 0.06);
    --lg-highlight: rgba(255, 255, 255, 0.16);
    --lg-drop: rgba(0, 0, 0, 0.45);
  }
  .lg {
    --lg-tint: transparent;
    --lg-tint-amt: 0%;
    --lg-wash: color-mix(in oklab, var(--lg-tint) var(--lg-tint-amt), var(--lg-base));
    color: var(--foreground);
    border: 1px solid transparent;
    background:
      linear-gradient(var(--lg-wash), var(--lg-wash)) padding-box,
      linear-gradient(135deg, var(--lg-rim-hi), var(--lg-rim-lo) 35%, var(--lg-rim-lo) 65%, var(--lg-rim-hi)) border-box;
    backdrop-filter: blur(var(--lg-blur)) saturate(var(--lg-sat));
    -webkit-backdrop-filter: blur(var(--lg-blur)) saturate(var(--lg-sat));
    box-shadow: inset 0 1px 0 var(--lg-highlight), 0 1px 2px var(--lg-drop), 0 12px 32px -14px var(--lg-drop);
  }

  .lg-regular { --lg-base: rgba(255, 255, 255, 0.42); --lg-blur: 16px; --lg-sat: 180%; }
  .dark .lg-regular { --lg-base: rgba(30, 32, 40, 0.45); }
  .lg-clear { --lg-base: rgba(255, 255, 255, 0.1); --lg-blur: 2px; --lg-sat: 150%; }
  .dark .lg-clear { --lg-base: rgba(255, 255, 255, 0.04); }
  .lg-tinted { --lg-tint: var(--primary); --lg-tint-amt: 55%; --lg-base: rgba(255, 255, 255, 0.3); --lg-blur: 12px; --lg-sat: 180%; color: var(--primary-foreground); }
  .dark .lg-tinted { --lg-base: rgba(30, 32, 40, 0.35); }

  .lg-surface { border-radius: 28px; }
  .lg-sheet { border-radius: 34px; }
  .lg-bar, .lg-control, .lg-knob, .lg-inline { border-radius: 9999px; }
  .lg-inline { box-shadow: inset 0 1px 0 var(--lg-highlight); }
  .lg-overlay { border-radius: 20px; }
  .lg-overlay.lg-regular { --lg-base: rgba(255, 255, 255, 0.72); --lg-blur: 24px; }
  .dark .lg-overlay.lg-regular { --lg-base: rgba(28, 30, 38, 0.74); }

  .lg-control { transition: scale 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s; }
  .lg-control:active:not(:disabled) { scale: 1.04 0.96; }

  /* Edge lensing: Chromium only (html.lg-lens is set by <LiquidFilters />). */
  html.lg-lens .lg:not(.lg-inline):not(.lg-overlay) {
    backdrop-filter: url(#lg-lens) blur(var(--lg-blur)) saturate(var(--lg-sat));
  }

  @media (prefers-reduced-motion: reduce) {
    .lg-control { transition: none; }
    .lg-control:active:not(:disabled) { scale: none; }
  }
  @media (prefers-reduced-transparency: reduce) {
    .lg.lg { --lg-base: color-mix(in oklab, var(--background) 94%, transparent); backdrop-filter: none; -webkit-backdrop-filter: none; }
  }
}
```

- [ ] **Step 2: Create `components/ui/liquid/liquid-filters.tsx`**

```tsx
"use client"

import * as React from "react"

/* SVG filter used by the .lg CSS layer for edge lensing. Displacement is neutral (0.5) in the
   middle and ramps to the edges: red drives x, green drives y. Only Chromium applies url()
   filters inside backdrop-filter, so html.lg-lens is set there and nowhere else. */
const ramp = (dir: "x" | "y", channel: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" preserveAspectRatio="none"><defs><linearGradient id="g" x2="${dir === "x" ? 1 : 0}" y2="${dir === "y" ? 1 : 0}"><stop offset="0" stop-color="${channel}" stop-opacity="1"/><stop offset=".14" stop-color="${channel}" stop-opacity=".5"/><stop offset=".86" stop-color="${channel}" stop-opacity=".5"/><stop offset="1" stop-color="${channel}" stop-opacity="0"/></linearGradient></defs><rect width="100" height="100" fill="url(#g)"/></svg>`
  )}`

export function LiquidFilters() {
  React.useEffect(() => {
    if (!/Chrome\//.test(navigator.userAgent)) return
    document.documentElement.classList.add("lg-lens")
    return () => document.documentElement.classList.remove("lg-lens")
  }, [])
  return (
    <svg aria-hidden width="0" height="0" style={{ position: "absolute" }}>
      <filter id="lg-lens" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feImage href={ramp("x", "#f00")} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="rx" />
        <feImage href={ramp("y", "#0f0")} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="gy" />
        <feComposite in="rx" in2="gy" operator="arithmetic" k2="1" k3="1" result="map" />
        <feDisplacementMap in="SourceGraphic" in2="map" scale="24" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  )
}
```

- [ ] **Step 3: Render it and convert the site chrome**

In `app/layout.tsx`, import `{ LiquidFilters } from "@/components/ui/liquid/liquid-filters"` and render `<LiquidFilters />` as the first child inside `<ThemeProvider>`.

In `components/header.tsx` and `components/footer.tsx`, find the element whose `className` contains `glass-bg` (header: the inner nav container; footer: line 11). Replace that element's `className="... glass-bg ..."` with a spread, keeping the other classes:

```tsx
import { liquidProps } from "@/lib/liquid-glass/material"
// header nav container:
<div {...liquidProps({ role: "bar" }, { className: "<the other classes, without glass-bg>" })}>
// footer:
<footer {...liquidProps({ role: "surface" }, { className: "<the other classes, without glass-bg>" })}>
```

- [ ] **Step 4: Verify visually**

Run `pnpm dev`. In Chrome, open `/` in dark and light mode (theme toggle in the header). Expected: header is a capsule with a bright top-left rim, frosted wash and visible lens bend at its ends; footer is a rounded surface; text is legible in both themes. Run `document.documentElement.classList.contains("lg-lens")` in the console: `true` in Chrome.
If the lens looks torn rather than bent, lower `scale="24"` in `liquid-filters.tsx` until edges bend smoothly (keep ≥ 8).

- [ ] **Step 5: Run gates and commit**

```bash
git add app/globals.css components/ui/liquid/liquid-filters.tsx app/layout.tsx components/header.tsx components/footer.tsx
git commit -m "feat: add liquid glass CSS layer and lens filter"
```

---

### Task 3: Engine budget, live flag, auto-layering; provider backdrop stack

**Files:**
- Create: `lib/liquid-glass/budget.ts`, `lib/liquid-glass/budget.test.ts`
- Create: `lib/liquid-glass/backdrop-stack.ts`, `lib/liquid-glass/backdrop-stack.test.ts`
- Modify: `lib/liquid-glass/engine.ts`
- Modify: `components/ui/liquid/liquid-glass-provider.tsx`

**Interfaces:**
- Consumes: `LiquidFilters` from Task 2.
- Produces:
  ```ts
  // budget.ts
  export interface ShapeCandidate { id: number; parent: number | null; area: number }
  export function selectShapes(cands: ShapeCandidate[], max: number): Map<number, 0 | 1> // id -> layer
  // backdrop-stack.ts
  export interface BackdropEntry<T> { id: number; src: T; live?: boolean }
  export function pushBackdrop<T>(stack: BackdropEntry<T>[], e: BackdropEntry<T>): BackdropEntry<T>[]
  export function popBackdrop<T>(stack: BackdropEntry<T>[], id: number): BackdropEntry<T>[]
  // provider
  export function LiquidGlassProvider(props: { backdrop?: Backdrop; live?: boolean; options?: Omit<LiquidGlassOptions, "mode">; children: React.ReactNode }): JSX.Element
  export function useLiquidGlass(): LiquidGlass | null
  export function useLiquidBackdrop(src: Backdrop | null, opts?: { live?: boolean }): void
  export type Backdrop = string | HTMLImageElement | HTMLVideoElement | HTMLCanvasElement
  // engine
  // elements drawn this frame carry the attribute data-glass-live
  ```

- [ ] **Step 1: Write failing tests for `selectShapes`**

Create `lib/liquid-glass/budget.test.ts`:

```ts
import { describe, expect, it } from "vitest"
import { selectShapes } from "./budget"

describe("selectShapes", () => {
  it("keeps everything under the cap, parents on layer 0 and children on layer 1", () => {
    const r = selectShapes([{ id: 1, parent: null, area: 100 }, { id: 2, parent: 1, area: 10 }], 32)
    expect([...r]).toEqual([[1, 0], [2, 1]])
  })

  it("prefers the largest shapes when over the cap", () => {
    const r = selectShapes([
      { id: 1, parent: null, area: 5 },
      { id: 2, parent: null, area: 50 },
      { id: 3, parent: null, area: 20 },
    ], 2)
    expect(new Set(r.keys())).toEqual(new Set([2, 3]))
  })

  it("draws layer 0 before any layer 1 shape, even a larger one", () => {
    const r = selectShapes([
      { id: 1, parent: null, area: 10 },
      { id: 2, parent: 1, area: 9 },
      { id: 3, parent: null, area: 1 },
    ], 2)
    expect(new Set(r.keys())).toEqual(new Set([1, 3]))
  })

  it("skips a child whose parent was not drawn", () => {
    const r = selectShapes([
      { id: 1, parent: null, area: 1 },
      { id: 2, parent: 1, area: 1 },
      { id: 3, parent: null, area: 100 },
    ], 1)
    expect([...r.keys()]).toEqual([3])
  })

  it("never draws a third nesting level", () => {
    const r = selectShapes([
      { id: 1, parent: null, area: 100 },
      { id: 2, parent: 1, area: 50 },
      { id: 3, parent: 2, area: 10 },
    ], 32)
    expect(new Set(r.keys())).toEqual(new Set([1, 2]))
  })

  it("treats a child of an unlisted (hidden) parent as top level", () => {
    const r = selectShapes([{ id: 2, parent: 9, area: 1 }], 32)
    expect([...r]).toEqual([[2, 0]])
  })
})
```

- [ ] **Step 2: Run to see it fail** — `pnpm test`; expected FAIL, cannot resolve `./budget`.

- [ ] **Step 3: Implement `lib/liquid-glass/budget.ts`**

```ts
/* Chooses which glass shapes the shader draws this frame. The shader has a fixed number of
   slots and two layers, so: layer 0 first, larger shapes first, a child only if its parent is
   drawn, and nothing deeper than one level of nesting. Undrawn shapes keep their CSS glass. */

export interface ShapeCandidate { id: number; parent: number | null; area: number }

export function selectShapes(cands: ShapeCandidate[], max: number): Map<number, 0 | 1> {
  const byId = new Map(cands.map(c => [c.id, c]))
  const depth = (c: ShapeCandidate) => {
    let d = 0
    for (let p = c.parent; p !== null && byId.has(p); p = byId.get(p)!.parent) d++
    return d
  }
  const ordered = cands
    .map(c => ({ c, d: depth(c) }))
    .filter(x => x.d <= 1)
    .sort((a, b) => a.d - b.d || b.c.area - a.c.area)
  const out = new Map<number, 0 | 1>()
  for (const { c, d } of ordered) {
    if (out.size >= max) break
    if (d === 1 && !out.has(c.parent!)) continue
    out.set(c.id, d as 0 | 1)
  }
  return out
}
```

Note: `out` is filled in layer-0-then-area order, and the first test expects insertion order `[[1,0],[2,1]]`, which this satisfies.

- [ ] **Step 4: Write failing tests for the backdrop stack**

Create `lib/liquid-glass/backdrop-stack.test.ts`:

```ts
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
})
```

- [ ] **Step 5: Implement `lib/liquid-glass/backdrop-stack.ts`**

```ts
/* The provider refracts the most recently pushed backdrop; pages push their own on mount and pop it on unmount. */
export interface BackdropEntry<T> { id: number; src: T; live?: boolean }

export function pushBackdrop<T>(stack: BackdropEntry<T>[], e: BackdropEntry<T>) {
  return [...stack.filter(x => x.id !== e.id), e]
}

export function popBackdrop<T>(stack: BackdropEntry<T>[], id: number) {
  return stack.filter(x => x.id !== id)
}
```

Run `pnpm test`; expected PASS for both new files.

- [ ] **Step 6: Engine — item bookkeeping**

In `lib/liquid-glass/engine.ts`:

1. Change `const MAXG = 20, MAXS = 8` to `const MAXG = 32, MAXS = 8`.
2. Add `import { selectShapes, type ShapeCandidate } from "./budget"` at the top.
3. Extend `GlassItem` with `id: number; parent: GlassItem | null; live: boolean` and `Solid` with `live: boolean`.
4. Add a field `private nextId = 1`.
5. In `add()`, include `id: this.nextId++, parent: null, live: false` in the item literal.
6. In `addSolid()`, push `{ el, layer, opacity: el.style.opacity, live: false }` and **remove** the `el.style.opacity = "0"` line (opacity is now set only while the solid is drawn).
7. At the end of `scan()`, link each item to its closest glass ancestor:

```ts
    const byEl = new Map(this.items.map(i => [i.el as Element, i]))
    for (const it of this.items) {
      let p = it.el.parentElement, parent: GlassItem | null = null
      while (p && !parent) { parent = byEl.get(p) ?? null; p = p.parentElement }
      it.parent = parent
    }
```

8. Add a helper and call it from `_detach()` and from `destroy()` for solids:

```ts
  private _setLive(it: GlassItem, live: boolean) {
    if (it.live === live) return
    it.live = live
    if (live) it.el.setAttribute("data-glass-live", "")
    else { it.el.removeAttribute("data-glass-live"); it.el.style.scale = ""; it.scs = ""; it.sx = it.sy = 1; it.vx = it.vy = 0 }
  }
```

`_detach(it)` becomes: remove the pointerdown listener, then `this._setLive(it, false)`. In `destroy()`, replace `this.solids.forEach(s => { s.el.style.opacity = s.opacity })` with `this.solids.forEach(s => { if (s.live) s.el.style.opacity = s.opacity })`.

- [ ] **Step 7: Engine — rewrite the item and solid loops in `_frame()`**

Replace everything in `_frame()` from `const dark = this.o.mode === "dark", liquid = this.o.liquid` down to (not including) `const u = this.u, o = this.o` with:

```ts
    const dark = this.o.mode === "dark", liquid = this.o.liquid
    type Vis = { it: GlassItem; r: DOMRect; cs: CSSStyleDeclaration }
    const vis = new Map<number, Vis>()
    const cands: ShapeCandidate[] = []
    for (const it of this.items) {
      const el = it.el
      if (!el.isConnected) continue
      const r = el.getBoundingClientRect()
      if (r.width < 1 || r.height < 1) continue
      if (r.bottom < cr.top - 40 || r.top > cr.bottom + 40 || r.right < cr.left - 40 || r.left > cr.right + 40) continue
      const cs = getComputedStyle(el)
      if (cs.visibility === "hidden") continue
      vis.set(it.id, { it, r, cs })
      cands.push({ id: it.id, parent: it.parent?.id ?? null, area: r.width * r.height })
    }
    const chosen = selectShapes(cands, MAXG)
    for (const it of this.items) this._setLive(it, chosen.has(it.id))
    let n = 0
    for (const [id, depth] of chosen) {
      const { it, r, cs } = vis.get(id)!
      const el = it.el
      const op = parseFloat(cs.opacity)
      const cx = (r.left + r.width / 2 - cr.left) * k, cy = (r.top + r.height / 2 - cr.top) * k
      const hx = r.width / 2 * k / it.sx, hy = r.height / 2 * k / it.sy
      if (it.last) { it.v.x = it.v.x * 0.6 + (cx - it.last.x) * 0.4; it.v.y = it.v.y * 0.6 + (cy - it.last.y) * 0.4 }
      it.last = { x: cx, y: cy }
      const g = it.pressed && liquid ? 1 + it.grow : 1, sq = liquid ? it.squash : 0
      const ax = Math.abs(it.v.x), ay = Math.abs(it.v.y)
      const tX = g * (1 + Math.min(ax * 0.018 * sq, 0.35) - Math.min(ay * 0.009 * sq, 0.18))
      const tY = g * (1 + Math.min(ay * 0.018 * sq, 0.35) - Math.min(ax * 0.009 * sq, 0.18))
      if (liquid) { it.vx = (it.vx + (tX - it.sx) * 0.22) * 0.7; it.sx += it.vx; it.vy = (it.vy + (tY - it.sy) * 0.22) * 0.7; it.sy += it.vy }
      else { it.sx = tX; it.sy = tY; it.vx = it.vy = 0 }
      const scs = Math.abs(it.sx - 1) < 0.002 && Math.abs(it.sy - 1) < 0.002 ? "" : `${it.sx.toFixed(4)} ${it.sy.toFixed(4)}`
      if (scs !== it.scs) { el.style.scale = scs; it.scs = scs }
      const Hx = hx * it.sx, Hy = hy * it.sy, ow = el.offsetWidth || r.width
      const rad = Math.min(len(cs.borderTopLeftRadius, ow) * (hx * 2 / ow) * Math.min(it.sx, it.sy), Hx, Hy)
      const tt = it.pressed && it.tintPressed !== undefined ? it.tintPressed : it.tint
      it.t += (tt - it.t) * 0.2
      const tv = cs.getPropertyValue("--lg-tint").trim()
      const custom = tv && tv !== "transparent" ? parseColor(tv) : null
      const tc: [number, number, number] = it.tintColor || (custom ? [custom[0], custom[1], custom[2]] : dark ? [0.07, 0.07, 0.09] : [1, 1, 1])
      const layer = Math.max(depth, it.layer >= 1 ? 1 : 0)
      this.bG.set([cx, cy, Hx, Hy], n * 4)
      this.bGP.set([rad, layer >= 1 ? 2 : (it.merge ? 1 : 0), it.t, it.frost], n * 4)
      this.bGT.set([tc[0], tc[1], tc[2], op], n * 4)
      n++
    }
    let m = 0
    for (const s of this.solids) {
      const el = s.el
      const r = el.isConnected ? el.getBoundingClientRect() : null
      const draw = m < MAXS && !!r && r.width >= 1 && r.height >= 1
      if (draw !== s.live) { s.live = draw; el.style.opacity = draw ? "0" : s.opacity }
      if (!draw) continue
      const cs = getComputedStyle(el), hx = r!.width / 2 * k, hy = r!.height / 2 * k, ow = el.offsetWidth || r!.width
      this.bS.set([(r!.left + r!.width / 2 - cr.left) * k, (r!.top + r!.height / 2 - cr.top) * k, hx, hy], m * 4)
      this.bSC.set(parseColor(cs.backgroundColor), m * 4)
      this.bSP.set([Math.min(len(cs.borderTopLeftRadius, ow) * (hx * 2 / ow), hx, hy), s.layer, 0, 0], m * 4)
      m++
    }
```

Also in `_frame()`, in the line `if (!this.ready) return`, nothing is live yet, which is correct: no change needed. The old `if (n >= MAXG) break` guard is gone because `selectShapes` enforces the cap.

- [ ] **Step 8: Provider — backdrop stack, live-only hand-off CSS, filters**

Replace `components/ui/liquid/liquid-glass-provider.tsx` with:

```tsx
"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { LiquidGlass, type LiquidGlassOptions } from "@/lib/liquid-glass/engine"
import { popBackdrop, pushBackdrop, type BackdropEntry } from "@/lib/liquid-glass/backdrop-stack"
import { LiquidFilters } from "./liquid-filters"

export type Backdrop = string | HTMLImageElement | HTMLVideoElement | HTMLCanvasElement

/* While the engine runs, <html> has .lg-on. Elements the engine actually draws carry
   data-glass-live and lose their CSS glass so only the shader glass shows; everything else
   (overlays, shapes over the cap, deep nesting) keeps the CSS look. The app shell goes
   transparent so the canvas shows through. Shipped with the provider so installing it needs
   no stylesheet edits. */
const LIQUID_GLASS_CSS = `
html.lg-on [data-glass-live] {
  background: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  border-color: transparent !important;
  box-shadow: none !important;
}
html.lg-on .lg-control[data-glass-live]:active { scale: none; }
html.lg-on body { background: transparent; }
`

const LiquidGlassContext = React.createContext<LiquidGlass | null>(null)
const BackdropContext = React.createContext<{
  push: (e: BackdropEntry<Backdrop>) => void
  pop: (id: number) => void
} | null>(null)

export const useLiquidGlass = () => React.useContext(LiquidGlassContext)

let nextBackdropId = 1
/** Makes `src` the refracted backdrop while the calling component is mounted. */
export function useLiquidBackdrop(src: Backdrop | null, { live }: { live?: boolean } = {}) {
  const ctx = React.useContext(BackdropContext)
  const id = React.useRef(0)
  if (!id.current) id.current = nextBackdropId++
  React.useEffect(() => {
    if (!ctx || !src) return
    ctx.push({ id: id.current, src, live })
    return () => ctx.pop(id.current)
  }, [ctx, src, live])
}

export interface LiquidGlassProviderProps {
  /** Default backdrop: image URL, or an <img>/<video>/<canvas>. Pages can override it with useLiquidBackdrop. */
  backdrop?: Backdrop
  /** Re-upload the source every frame (auto for video; set for animated canvases). */
  live?: boolean
  options?: Omit<LiquidGlassOptions, "mode">
  children: React.ReactNode
}

/**
 * Renders the backdrop + all liquid glass on one fixed, full-viewport WebGL canvas behind the
 * app. Elements with `data-glass` anywhere in the document (including Radix portals) get glass
 * drawn beneath them. Without WebGL, or with reduced transparency, the CSS glass stays.
 */
export function LiquidGlassProvider({ backdrop, live, options, children }: LiquidGlassProviderProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [engine, setEngine] = React.useState<LiquidGlass | null>(null)
  const [stack, setStack] = React.useState<BackdropEntry<Backdrop>[]>([])
  const { resolvedTheme } = useTheme()
  const mode = resolvedTheme === "dark" ? "dark" : "light"

  const backdropApi = React.useMemo(() => ({
    push: (e: BackdropEntry<Backdrop>) => setStack(s => pushBackdrop(s, e)),
    pop: (id: number) => setStack(s => popBackdrop(s, id)),
  }), [])

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.matchMedia("(prefers-reduced-transparency: reduce)").matches) return
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const lg = new LiquidGlass(canvas, { ...options, mode, liquid: reduceMotion ? false : options?.liquid ?? true })
    if (lg.failed) return
    document.documentElement.classList.add("lg-on")
    lg.scan(document.body)
    let queued = false
    const mo = new MutationObserver(() => {
      if (queued) return
      queued = true
      requestAnimationFrame(() => { queued = false; lg.scan(document.body) })
    })
    mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-glass", "data-glass-solid"] })
    setEngine(lg)
    return () => {
      mo.disconnect()
      lg.destroy()
      document.documentElement.classList.remove("lg-on")
      setEngine(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => { engine?.set({ mode }) }, [engine, mode])
  React.useEffect(() => { if (engine && options) engine.set(options) }, [engine, options])

  const top = stack.at(-1) ?? (backdrop ? { id: 0, src: backdrop, live } : null)
  const src = top?.src, srcLive = top?.live
  React.useEffect(() => {
    if (!engine || !src) return
    if (typeof src !== "string") { engine.setSource(src, { live: srcLive }); return }
    let cancelled = false
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => { if (!cancelled) engine.setSource(img) }
    img.src = src
    return () => { cancelled = true }
  }, [engine, src, srcLive])

  return (
    <LiquidGlassContext.Provider value={engine}>
      <BackdropContext.Provider value={backdropApi}>
        <style href="liquid-glass" precedence="default">{LIQUID_GLASS_CSS}</style>
        <LiquidFilters />
        <canvas
          ref={canvasRef}
          aria-hidden
          style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", zIndex: 0, pointerEvents: "none" }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      </BackdropContext.Provider>
    </LiquidGlassContext.Provider>
  )
}
```

Because the provider now renders `<LiquidFilters />`, remove the `<LiquidFilters />` you added to `app/layout.tsx` in Task 2 **only in Task 4**, when the provider moves into the layout (until then `/liquid` has the provider but the rest of the site does not).

- [ ] **Step 9: Verify on `/liquid`**

Run `pnpm test` (all pass) and the type-check gate. Open `/liquid` in Chrome. Expected: same look as before this task. In the console: `document.querySelectorAll("[data-glass-live]").length` equals the number of visible liquid elements (cards, buttons, bar, tabs, pill, knobs). The four icon buttons inside the right card are on layer 1 (they show glass-on-glass, not holes).

- [ ] **Step 10: Commit**

```bash
git add lib/liquid-glass components/ui/liquid/liquid-glass-provider.tsx
git commit -m "feat: engine shape budget, live flag and auto-layering; provider backdrop stack"
```

---

### Task 4: Site-wide provider and canvas wallpaper

**Files:**
- Modify: `components/grid-background.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/liquid/page.tsx`

**Interfaces:**
- Consumes: `LiquidGlassProvider`, `useLiquidBackdrop`, `useLiquidGlass` (Task 3).
- Produces: the root layout is wrapped in `LiquidGlassProvider`; `GridBackground` supplies the default backdrop.

- [ ] **Step 1: Refactor `GridBackground` to data + two renderers**

Rewrite `components/grid-background.tsx` so the gradient, blobs and grid are described once and drawn both as DOM (fallback, unchanged visuals) and into a canvas (shader backdrop):

```tsx
"use client"

import { useTheme } from "next-themes"
import { useEffect, useRef, useState } from "react"
import { useLiquidBackdrop, useLiquidGlass } from "@/components/ui/liquid/liquid-glass-provider"

/**
 * Theme-aware wallpaper.
 * Dark: grayish-blue with subtle color variation.
 * Light: soft pastel gradient with visible color blobs — gives
 *        the glass components something to contrast against.
 * Drawn in the DOM (fallback) and into a canvas that the liquid glass refracts.
 */
const GRADIENT = {
  dark: [[0, "oklch(0.22 0.025 260)"], [0.3, "oklch(0.18 0.03 268)"], [0.6, "oklch(0.15 0.025 275)"], [1, "oklch(0.13 0.02 280)"]],
  light: [[0, "oklch(0.88 0.04 250)"], [0.3, "oklch(0.85 0.05 260)"], [0.55, "oklch(0.82 0.06 270)"], [0.8, "oklch(0.84 0.05 255)"], [1, "oklch(0.87 0.04 245)"]],
} as const

// Box in viewport fractions (x, y = top-left), colour per theme, blur in px.
const BLOBS = [
  { x: -0.1, y: -0.05, w: 0.55, h: 0.55, blur: 60, dark: "oklch(0.28 0.03 280 / 0.25)", light: "oklch(0.82 0.08 290 / 0.5)" },
  { x: 0.65, y: -0.05, w: 0.45, h: 0.5, blur: 60, dark: "oklch(0.25 0.025 220 / 0.2)", light: "oklch(0.85 0.07 210 / 0.45)" },
  { x: 0.15, y: 0.25, w: 0.65, h: 0.55, blur: 80, dark: "oklch(0.23 0.025 200 / 0.2)", light: "oklch(0.88 0.06 240 / 0.4)" },
  { x: 0, y: 0.55, w: 0.5, h: 0.5, blur: 70, dark: "oklch(0.2 0.025 300 / 0.2)", light: "oklch(0.8 0.08 310 / 0.4)" },
  { x: 0.55, y: 0.65, w: 0.5, h: 0.45, blur: 60, dark: "oklch(0.24 0.02 240 / 0.18)", light: "oklch(0.83 0.06 225 / 0.35)" },
]

const GRID = [
  { size: 80, dark: "rgba(255,255,255,0.03)", light: "rgba(0,0,0,0.03)" },
  { size: 20, dark: "rgba(255,255,255,0.015)", light: "rgba(0,0,0,0.015)" },
]

function paint(cv: HTMLCanvasElement, theme: "dark" | "light") {
  const W = window.innerWidth, H = window.innerHeight
  cv.width = W; cv.height = H
  const x = cv.getContext("2d")!
  // CSS linear-gradient(160deg): direction (sin, -cos), length covers the box corners.
  const a = (160 * Math.PI) / 180, dx = Math.sin(a), dy = -Math.cos(a)
  const L = Math.abs(W * dx) + Math.abs(H * dy)
  const g = x.createLinearGradient(W / 2 - (dx * L) / 2, H / 2 - (dy * L) / 2, W / 2 + (dx * L) / 2, H / 2 + (dy * L) / 2)
  for (const [o, c] of GRADIENT[theme]) g.addColorStop(o, c)
  x.fillStyle = g
  x.fillRect(0, 0, W, H)
  for (const b of BLOBS) {
    const w = b.w * W, h = b.h * H, cx = b.x * W + w / 2, cy = b.y * H + h / 2
    x.save()
    x.filter = `blur(${b.blur}px)`
    x.translate(cx, cy)
    x.scale(w / 2, h / 2)
    const rg = x.createRadialGradient(0, 0, 0, 0, 0, 1)
    rg.addColorStop(0, b[theme]); rg.addColorStop(0.7, "transparent")
    x.fillStyle = rg
    x.fillRect(-1, -1, 2, 2)
    x.restore()
  }
  x.lineWidth = 1
  for (const l of GRID) {
    x.strokeStyle = l[theme]
    x.beginPath()
    for (let px = 0.5; px < W; px += l.size) { x.moveTo(px, 0); x.lineTo(px, H) }
    for (let py = 0.5; py < H; py += l.size) { x.moveTo(0, py); x.lineTo(W, py) }
    x.stroke()
  }
}

export function GridBackground() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const engine = useLiquidGlass()
  const themeRef = useRef<"dark" | "light">("dark")

  useEffect(() => {
    setMounted(true)
    setCanvas(document.createElement("canvas"))
  }, [])

  const isDark = !mounted || resolvedTheme === "dark"
  const theme = isDark ? "dark" : "light"
  themeRef.current = theme

  useEffect(() => {
    if (!canvas) return
    paint(canvas, theme)
    engine?.invalidate()
  }, [canvas, theme, engine])

  useEffect(() => {
    if (!canvas) return
    const onResize = () => { paint(canvas, themeRef.current); engine?.invalidate() }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [canvas, engine])

  useLiquidBackdrop(canvas)

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden transition-colors duration-500"
      style={{ background: `linear-gradient(160deg, ${GRADIENT[theme].map(([o, c]) => `${c} ${o * 100}%`).join(", ")})` }}
    >
      {BLOBS.map((b, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${b.x * 100}vw`, top: `${b.y * 100}vh`, width: `${b.w * 100}vw`, height: `${b.h * 100}vh`,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${b[theme]} 0%, transparent 70%)`,
            filter: `blur(${b.blur}px)`,
          }}
        />
      ))}
      {GRID.map((l) => (
        <div
          key={l.size}
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(${l[theme]} 1px, transparent 1px), linear-gradient(90deg, ${l[theme]} 1px, transparent 1px)`,
            backgroundSize: `${l.size}px ${l.size}px`,
          }}
        />
      ))}
    </div>
  )
}
```

Blob boxes above are converted from the old `top/left/right/bottom` percentages: right `-10%` with width `45vw` → `x = 1 + 0.1 - 0.45 = 0.65`; bottom `-5%` with height `50vh` → `y = 1 + 0.05 - 0.5 = 0.55`; bottom `-10%`, right `-5%`, `50vw × 45vh` → `x = 0.55, y = 0.65`.

- [ ] **Step 2: Wrap the root layout**

In `app/layout.tsx`: import `LiquidGlassProvider`; remove the `<LiquidFilters />` line and its import added in Task 2 (the provider renders it now); wrap everything inside `<ThemeProvider>` in `<LiquidGlassProvider>`:

```tsx
<ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
  <LiquidGlassProvider>
    <GridBackground />
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
    <Toaster />
  </LiquidGlassProvider>
</ThemeProvider>
```

`layout.tsx` is a server component; `LiquidGlassProvider` is a client component, which is fine to render from it.

- [ ] **Step 3: Move `/liquid` onto the site provider**

In `app/liquid/page.tsx`: remove the `LiquidGlassProvider` import and wrapper element (keep its children); add:

```tsx
import { useLiquidBackdrop, useLiquidGlass } from "@/components/ui/liquid/liquid-glass-provider"
// inside LiquidDemo, after `options`:
  useLiquidBackdrop("/page.jpg")
  const engine = useLiquidGlass()
  React.useEffect(() => {
    if (!engine) return
    engine.set(options)
    return () => engine.set({ refraction: 28, liquid: true })
  }, [engine, options])
```

- [ ] **Step 4: Verify**

Gates, then in Chrome:
- `/`: `html` has `lg-on`; the wallpaper looks the same as before (compare with `git stash`-free memory of Task 2's screenshot); the header capsule now shows WebGL refraction (rim highlight follows the pointer).
- Toggle the theme twice: wallpaper and glass switch together; no frame where the header disappears.
- Resize the window: wallpaper re-fits, no stretching.
- `/liquid`: photo backdrop; navigate to `/docs` via the header: wallpaper returns.

- [ ] **Step 5: Commit**

```bash
git add components/grid-background.tsx app/layout.tsx app/liquid/page.tsx
git commit -m "feat: site-wide liquid glass provider over a canvas wallpaper"
```

---

### Conversion pattern (Tasks 5–9)

Every component conversion follows one of these two shapes. The per-task tables say which shape, role and variant union each component gets.

**Shape A — map-based / inline components** (e.g. `card.tsx`). Before:

```tsx
variant?: "default" | "glass" | "glassSubtle" | "frosted" | "fluted" | "crystal"
glass?: GlassCustomization
// getVariantClass() map + getGlassStyles(glass)
```

After:

```tsx
import { liquidProps, resolveVariant, type LegacyGlassVariant, type LiquidProps } from "@/lib/liquid-glass/material"

function Card({ className, variant, material, tint, glass, style, ...props }:
  React.ComponentProps<"div"> & LiquidProps & {
    variant?: "liquid" | "default" | LegacyGlassVariant
  }) {
  const v = resolveVariant<"liquid" | "default">(variant, material)
  const base = "flex flex-col gap-6 py-6"
  const own = v.variant === "liquid"
    ? liquidProps({ role: "surface", material: v.material, tint, glass }, { className: cn(base, className), style })
    : { className: cn(base, "rounded-xl bg-card text-card-foreground border shadow-sm", className), style }
  return <div data-slot="card" {...own} {...props} />
}
```

Rules:
- Delete the `getVariantClass` map and the `getGlassStyles` import/call.
- Keep the component's structural classes in `base`; move `rounded-*` out of `base` for liquid (the role sets the radius), but keep it for the non-liquid branch.
- The `liquid` branch must not include `glass-*`, `backdrop-blur-*`, `border-[var(--glass-*)]` or `shadow-[var(--glass-*)]` classes.

**Shape B — cva components** (`button`, `badge`, `alert`, `toggle`). Add a `liquid: ""` key to the `variant` map, remove the glass keys, set `defaultVariants.variant: "liquid"`, and in the render function:

```tsx
const v = resolveVariant<NonNullable<VariantProps<typeof buttonVariants>["variant"]>>(variant, material)
const lg = v.variant === "liquid" ? liquidProps({ role: "control", material: v.material, tint, glass }) : null
<Comp
  data-slot="button"
  {...(lg ?? {})}
  className={cn(buttonVariants({ variant: v.variant, size }), lg?.className, className)}
  style={{ ...lg?.style, ...style }}
  {...props}
/>
```

The prop type becomes `Omit<VariantProps<typeof buttonVariants>, "variant"> & { variant?: VariantProps<typeof buttonVariants>["variant"] | LegacyGlassVariant } & LiquidProps`.

**Wrappers in `components/ui/glass/`:** remove `variant = "glass"` defaults (pass `variant` through untouched), change `glass?: GlassCustomization` to `glass?: GlassOverride` (import from `@/lib/liquid-glass/material`), and forward `material`, `tint`, `glass` (they arrive in `...props` if not destructured; do not destructure them unless the wrapper used them).

**After each task, smoke-check** the components touched on `/components` and their `/docs/components/<name>` pages in Chrome (dark and light): no invisible components, legible text, liquid look visible.

---

### Task 5: Controls

**Files (base + wrapper for each):** `components/ui/{button,toggle,input,textarea,select,date-picker-input,mode-toggle}.tsx`, `components/ui/glass/{button,toggle,input,textarea,select,date-picker-input}.tsx`, `lib/hover-effects.ts`

**Interfaces:**
- Consumes: Task 1 helpers; Conversion pattern.
- Produces: `Button`/`buttonVariants` with `variant: "liquid" | "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"` (default `liquid`) and sizes `default | sm | lg | icon`; all controls accept `LiquidProps`.

| Component | Shape | Role | Variant union (plus `LegacyGlassVariant`) | Notes |
|---|---|---|---|---|
| `Button` | B | control | liquid, default, destructive, outline, secondary, ghost, link | Base class: replace `rounded-md` with `rounded-full`; sizes become `default: "h-11 px-5 has-[>svg]:px-4"`, `sm: "h-9 gap-1.5 px-4 has-[>svg]:px-3"`, `lg: "h-13 px-7 has-[>svg]:px-5"`, `icon: "size-11"`. Remove `isGlassVariant`. |
| `Toggle` | B | control | liquid, default, outline | `toggleVariants` glass key (lines 17–18) becomes `liquid: ""`; `data-[state=on]` for liquid: `data-[state=on]:[--lg-tint:var(--primary)] data-[state=on]:[--lg-tint-amt:22%]`. |
| `Input` | A | control | liquid, default | Liquid branch base: `h-11 w-full min-w-0 px-4 text-base md:text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/50` plus existing file/selection/aria-invalid classes from the default string. |
| `Textarea` | A | control | liquid, default | Same as Input but `min-h-16 px-4 py-3` and add `rounded-2xl` in the liquid branch's own className (overrides the capsule radius). |
| `SelectTrigger` | A | control | liquid, default | Keep trigger layout classes; liquid height follows `size` prop (`data-[size=default]:h-11 data-[size=sm]:h-9`). `SelectContent` is converted in Task 9; leave its map untouched now. |
| `DatePickerInput` | – | – | `"liquid" \| "default" \| LegacyGlassVariant` | Pass `variant`, `material`, `tint` to `<Button>`; pass `variant` and `material` to `<PopoverContent>`. Popover still accepts legacy names until Task 9, so this compiles. |
| `ModeToggle` | – | – | `"liquid" \| "default" \| LegacyGlassVariant` | `variant === "default"` → `<Button variant="outline">`, otherwise `<Button>` (liquid). |

- [ ] **Step 1:** Convert `Button` (Shape B) and its wrapper. In `components/ui/glass/button.tsx` change `effect = "glow"` to `effect = "none"`.
- [ ] **Step 2:** In `lib/hover-effects.ts`, change the `glow` entry to a soft white rim bloom and export it for wrappers:

```ts
export const glowRing = "shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_0_28px_-4px_rgba(255,255,255,0.45)]"
// in hoverEffects variants.hover:
glow: `${glowRing} hover:shadow-[0_0_0_1px_rgba(255,255,255,0.5),0_0_36px_-4px_rgba(255,255,255,0.6)]`,
```

- [ ] **Step 3:** Convert `Toggle`, `Input`, `Textarea`, `SelectTrigger`, `DatePickerInput`, `ModeToggle` and their wrappers per the table.
- [ ] **Step 4:** Run gates. Smoke-check `/components` (Button, Toggle, Input, Textarea, Select, Date Picker sections) and `/docs/components/button`. Press and hold a button: it squashes (WebGL grow when live; CSS squash when not).
- [ ] **Step 5: Commit** — `git commit -am "feat: liquid glass controls"`

---

### Task 6: Surfaces and sheets

**Files (base + wrapper):** `components/ui/{card,alert,empty-state,sidebar,table,calendar,chart,carousel,dialog,alert-dialog,sheet,drawer}.tsx` and matching `components/ui/glass/*.tsx`; `app/globals.css` (rdp rules)

| Component | Shape | Role | Variant union (+ legacy) | Notes |
|---|---|---|---|---|
| `Card` | A | surface | liquid, default | Exactly the pattern example. Wrapper `glass/card.tsx`: `gradient`/`animated`/`hover` stay; replace line 70's `hover:shadow-[var(--glass-shadow-lg)]` with `hover:shadow-[0_18px_40px_-16px_var(--lg-drop)]`; update the JSDoc example (lines 19–58) to `material="clear"` / `glass={{ tint: "...", frost: 0.4 }}`. |
| `Alert` | B | surface | liquid, default, destructive | `rounded-[20px]` in liquid own className (alerts are short). |
| `EmptyState` | A | surface | liquid, default | |
| `Sidebar` | A | surface | liquid, default | Liquid own className: `m-2 h-[calc(100%-1rem)]` so it floats inset, Apple-style (the role supplies the 28px radius; no `border-r`). |
| `Table` | A | surface | liquid, default | Liquid base: `w-full caption-bottom text-sm overflow-hidden`; the role radius applies. |
| `Calendar` | A | surface | liquid, default | Liquid own className: `p-4 w-fit`. In `globals.css`, change the three `.glass-bg` rdp selectors (lines ~382–392) to `.lg`. |
| `ChartContainer` | A | surface | liquid, default | Only `ChartContainer` here; `ChartTooltipContent` is Task 9; `ChartLegendContent` drops its glass map (liquid → `""`). |
| `Carousel` | A | surface | liquid, default | Nav buttons (lines 93–103): remove `variant="ghost"` and the `glass-bg` class so they are liquid Buttons with `size="icon"`. |
| `DialogContent` | A | sheet | liquid, default | Wrapper `glass/dialog.tsx`: line 18 re-declared union → `"liquid" \| "default" \| LegacyGlassVariant`; line 51 `animated && "backdrop-blur-[var(--blur-lg)]"` → delete. |
| `AlertDialogContent` | A | sheet | liquid, default | Wrapper line 33 `backdrop-blur-[var(--blur-lg)]` → delete. Action/Cancel already use `buttonVariants` (liquid by default now; Cancel keeps `outline`). |
| `SheetContent` | A | sheet | liquid, default | Liquid own className per side: `top`/`bottom` → `rounded-none` on the edge-attached side only (`data-[side=bottom]:rounded-b-none` etc.); `left`/`right` → `inset-y-2 h-[calc(100%-1rem)]` and `left-2`/`right-2` so the sheet floats. |
| `DrawerContent` | A | sheet | liquid, default | `rounded-b-none` in liquid own className. |

- [ ] **Step 1:** Convert Card + wrapper, run gates.
- [ ] **Step 2:** Convert Alert, EmptyState, Sidebar, Table, Calendar (+ rdp CSS), ChartContainer/ChartLegendContent, Carousel + wrappers.
- [ ] **Step 3:** Convert DialogContent, AlertDialogContent, SheetContent, DrawerContent + wrappers.
- [ ] **Step 4:** Gates. Smoke-check `/components` and `/docs/components/{card,dialog,sheet,drawer,alert-dialog,table,calendar,carousel}`. Open a dialog: the sheet is WebGL glass (has `data-glass-live`), buttons inside are layer 1. Open a dialog from inside a card preview: the card's own button inside the dialog content renders CSS if it is a third level — never invisible.
- [ ] **Step 5: Commit** — `git commit -am "feat: liquid glass surfaces and sheets"`

---

### Task 7: Bars

**Files (base + wrapper):** `components/ui/{tabs,menu-bar,navigation-menu,button-group,toggle-group,pagination,breadcrumb,input-group}.tsx` and matching wrappers.

| Component | Shape | Role | Variant union (+ legacy) | Notes |
|---|---|---|---|---|
| `TabsList` | A | bar | liquid, default | Liquid: `inline-flex h-11 items-center p-1 relative`. Add the sliding selection pill from `LiquidTabsList` (`components/ui/liquid/index.tsx` lines ~120–160): a `span` with `data-glass="button" data-layer="1" data-tint="0.08"`, positioned by a `MutationObserver` + `ResizeObserver` on `[data-state="active"]`. Only render the pill in the liquid branch. `TabsTrigger`: in liquid, `relative z-10 rounded-full data-[state=active]:text-primary` and no active background. |
| `MenuBar` | A | bar | liquid, default | `MenuBarItem` keeps `variant="ghost"`. |
| `NavigationMenuList` | A | bar | liquid, default | Content/Viewport are Task 9. |
| `ButtonGroup` | A | bar | liquid, default | Children Buttons inside become layer 1 automatically. |
| `ToggleGroup` | A | bar | liquid, default | Wrapper re-declares G2 union (line 11) → update. |
| `PaginationContent` | A | bar | liquid, default | `PaginationLink` is Task 8. |
| `BreadcrumbList` | A | bar | liquid, default | Liquid own className: `px-4 py-2`. |
| `InputGroup` | A | bar | liquid, default | Inner Input should use `variant="default"` styling stripped of border: if `InputGroup` renders an `Input`, pass `variant="default"` and `className="border-0 bg-transparent shadow-none"`. |

- [ ] **Step 1:** Convert TabsList/TabsTrigger with the pill; gates; check `/docs/components/tabs`: pill slides with a spring and refracts on top of the bar.
- [ ] **Step 2:** Convert the rest + wrappers.
- [ ] **Step 3:** Gates; smoke-check `/components` bars section and `/docs/components/{menu-bar,navigation-menu,button-group,toggle-group,pagination,breadcrumb,input-group}`.
- [ ] **Step 4: Commit** — `git commit -am "feat: liquid glass bars"`

---

### Task 8: Knob controls, inline items, plain components

**Files (base + wrapper):** `components/ui/{switch,slider,checkbox,radio-group,badge,input-otp,avatar,pagination,accordion,scroll-area,separator,skeleton,spinner,cropper}.tsx` and matching wrappers.

| Component | Role | Variant union (+ legacy) | Notes |
|---|---|---|---|
| `Switch` | knob | liquid, default | Port `LiquidSwitch` from `components/ui/liquid/index.tsx`: root keeps focus ring/`group`; inner `aria-hidden` span with `data-glass-solid data-layer="1"` and classes `absolute inset-0 rounded-full transition-colors duration-200 group-data-[state=unchecked]:bg-black/15 dark:group-data-[state=unchecked]:bg-white/20 group-data-[state=checked]:bg-green-500`; Thumb gets `liquidProps({ role: "knob", material, tint, glass }, { className: "relative block h-7 w-9 bg-white shadow-md translate-x-0.5 data-[state=checked]:translate-x-[22px] transition-[translate] duration-[450ms] ease-[cubic-bezier(.34,1.56,.64,1)]" })`; root `h-8 w-[60px]`; press via `useLiquidGlass()?.press(thumb, true)` then release after 380 ms (same as `LiquidSwitch`). Liquid branch only; `default` keeps the current shadcn look. |
| `Slider` | knob | liquid, default | Port `LiquidSlider`: Track and Range get `data-glass-solid data-layer="1"`; but Track contains Range, and solids are hidden with `opacity: 0` while drawn, which hides the Range DOM too — acceptable because Range is itself drawn as a solid. Thumbs get `liquidProps({ role: "knob", ... }, { className: "block h-7 w-11 bg-white shadow-md cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" })`. |
| `Checkbox` | inline | liquid, default | `liquidProps({ role: "inline" })` on the root with `size-5 rounded-md` (overrides capsule) and `data-[state=checked]:[--lg-tint:var(--primary)] data-[state=checked]:[--lg-tint-amt:70%] data-[state=checked]:text-primary-foreground`. Remove line 26's `data-[state=checked]:glass-bg`. |
| `RadioGroupItem` | inline | liquid, default | `size-5`, same checked tint as Checkbox. |
| `Badge` | inline (cva, Shape B) | liquid, default, secondary, destructive, outline | `badgeVariants` glass keys → `liquid: ""`. Role `inline`. |
| `InputOTPSlot` | inline | liquid, default | `rounded-xl` override; `InputOTP` and `InputOTPGroup` drop their (no-op) glass maps: liquid → same classes as default. |
| `AvatarFallback` | inline | (no variant) | Replace the hardcoded `glass-bg backdrop-blur-[var(--blur-sm)] border-[var(--glass-border)]` (line 42) with `liquidProps({ role: "inline" }, { className: <remaining classes> })`. |
| `PaginationLink` | inline | liquid, default | Applies only when `isActive` (as today); non-active stays `buttonVariants({ variant: "ghost" })`; active liquid → `liquidProps({ role: "inline" })` instead of `buttonVariants({variant:"outline"})`. |
| `AccordionTrigger` | none | liquid, default | liquid → `rounded-2xl hover:bg-foreground/5` (no glass shape). |
| `ScrollArea`, `Separator`, `Skeleton`, `Spinner` | none | **drop `variant`** | Separator: always `bg-foreground/10`. Skeleton: `bg-foreground/10 animate-pulse rounded-xl`. ScrollArea: `relative overflow-hidden`. Spinner: remove the unused `variant` and `glass` props and the `getGlassStyles` import. Wrappers: remove `variant`/`glass` passing; `glass/spinner.tsx` drops `glass`. Usages passing `variant=` to these break `tsc` — fix each reported usage by deleting the prop. |
| `Cropper` | surface | liquid, default | liquid → `liquidProps({ role: "surface", ... })` replacing the inline `glass-bg …` string at line 39. Wrapper re-declared union (line 11) → update. |

- [ ] **Step 1:** Convert Switch and Slider; gates; check `/docs/components/{switch,slider}`: tracks visible in both themes, checked switch green, knob turns clear and grows while pressed, focus ring visible on keyboard focus (Tab key).
- [ ] **Step 2:** Convert the inline components and plain components + wrappers.
- [ ] **Step 3:** Gates (fix `variant=` usages on ScrollArea/Separator/Skeleton/Spinner that `tsc` reports); smoke-check `/components`.
- [ ] **Step 4: Commit** — `git commit -am "feat: liquid glass knobs, inline items and plain components"`

---

### Task 9: Overlays and toasts

**Files (base + wrapper):** `components/ui/{popover,dropdown-menu,context-menu,select,hover-card,tooltip,command,chart,navigation-menu,sonner}.tsx` and matching wrappers; `app/globals.css` (sonner rules)

| Component | Variant union (+ legacy) | Notes |
|---|---|---|
| `PopoverContent`, `HoverCardContent`, `SelectContent`, `DropdownMenuContent`, `DropdownMenuSubContent`, `ContextMenuContent`, `ContextMenuSubContent`, `Command`, `ChartTooltipContent`, `NavigationMenuContent`, `NavigationMenuViewport` | liquid, default | `liquidProps({ role: "overlay", ... })`. Keep each component's animation/position classes. Menu items inside: `rounded-xl` highlight `focus:bg-foreground/8`. `context-menu` wrapper re-declares FULL6 inline (lines 32–34) → update. |
| `TooltipContent` | liquid, default | overlay with `rounded-full px-3 py-1.5 text-xs` (capsule tooltip). Arrow: hide in liquid (`hidden`). |
| `Toaster` (sonner) | – | `toastOptions.classNames.toast`: replace `group-[.toaster]:glass-bg …` with `group-[.toaster]:lg group-[.toaster]:lg-regular group-[.toaster]:lg-overlay`; action/cancel buttons → `group-[.toast]:lg group-[.toast]:lg-regular group-[.toast]:lg-inline`. In `globals.css` sonner rules (lines ~404–472): replace `background: var(--glass-bg)`, `backdrop-filter: blur(var(--blur…))`, `border: … var(--glass-border)`, `box-shadow: var(--glass-shadow-lg)` declarations with nothing (the classes now carry the look); keep the type colour rules. |

- [ ] **Step 1:** Convert all overlay components + wrappers.
- [ ] **Step 2:** Sonner classes + CSS.
- [ ] **Step 3:** Gates. In Chrome: open a dropdown/select/popover over a card: overlay is CSS glass (no `data-glass` attribute), text fully legible over the card; fire a toast from `/docs/components/sonner`: capsule-ish overlay toast.
- [ ] **Step 4: Commit** — `git commit -am "feat: liquid glass overlays and toasts"`

---

### Task 10: Rebuild `/liquid` with the library components

**Files:**
- Modify: `app/liquid/page.tsx`
- Delete: `components/ui/liquid/index.tsx`

- [ ] **Step 1:** Rewrite `app/liquid/page.tsx` with the regular components (same layout and content as now):
  - `LiquidButton size="icon"` → `<Button size="icon" className="size-[52px]">`; `LiquidButton merge` → `<Button size="lg" data-merge="1">`.
  - `LiquidSearch` → `<InputGroup className="w-[440px] max-w-full h-[52px] px-5">` with the search icon and an `<Input variant="default" className="border-0 bg-transparent shadow-none">`.
  - `LiquidBar` → `<ButtonGroup>` holding the share `<Button size="icon">`.
  - `LiquidCard` → `<Card className="p-7">`.
  - `LiquidSlider` → `<Slider>`; `LiquidSwitch` → `<Switch>`.
  - `LiquidTabs*` → `<Tabs>`, `<TabsList>`, `<TabsTrigger>` (trigger classes: `h-full min-w-[96px] flex-col gap-0.5 px-4 text-[11px] font-semibold`).
  - `LiquidDialog*` → `<Dialog>`, `<DialogTrigger asChild>`, `<DialogContent className="w-[min(360px,calc(100vw-32px))]">`, `<DialogTitle>`, `<DialogDescription>`, `<DialogClose asChild><Button variant="secondary" className="flex-1">`.
  - Import from `@/components/ui/glass`.
- [ ] **Step 2:** `git rm components/ui/liquid/index.tsx`. Remove `components/ui/liquid/index.tsx` from the `liquid-glass` item in `registry.json`.
- [ ] **Step 3:** Gates. Chrome `/liquid`: everything renders as before; navigate to `/` via the header: the grid wallpaper is back (backdrop popped).
- [ ] **Step 4: Commit** — `git commit -am "refactor: rebuild /liquid with library components; drop Liquid* components"`

---

### Task 11: Codemod usages, remove legacy aliases and old glass CSS

**Files:**
- Create: `scripts/codemod-liquid.mjs`
- Modify: everything the codemod touches in `app/`, `components/` (non-ui and `components/blocks/`), `lib/component-examples.ts`, `stories/`
- Modify: `lib/liquid-glass/material.ts` (remove `LegacyGlassVariant`, `resolveVariant` legacy branch), every component's variant union, `app/globals.css`, `components/ui/glass/*` (glow strings), `components/ui/glass/README.md`, `components/ui/glass/GLASS_CUSTOMIZATION.md`
- Delete: `lib/glass-utils.ts`

- [ ] **Step 1: Write the codemod**

```js
// scripts/codemod-liquid.mjs — migrates old glass variant names to the liquid material API.
// Usage: node scripts/codemod-liquid.mjs <dir|file>...
import fs from "node:fs"
import path from "node:path"

const DROP = ["glass", "glassSubtle", "frosted"]
const CLEAR = ["crystal", "fluted"]
const rules = [
  // JSX attributes
  [new RegExp(`\\s+variant=["'](?:${DROP.join("|")})["']`, "g"), ""],
  [new RegExp(`variant=(["'])(?:${CLEAR.join("|")})\\1`, "g"), 'material="clear"'],
  [/variant=(["'])glassSolid\1/g, 'material="tinted"'],
  // Storybook args objects
  [new RegExp(`^\\s*variant:\\s*["'](?:${DROP.join("|")})["'],?\\n`, "gm"), ""],
  [new RegExp(`variant:\\s*(["'])(?:${CLEAR.join("|")})\\1`, "g"), "material: 'clear'"],
  [/variant:\s*(["'])glassSolid\1/g, "material: 'tinted'"],
  // Raw classes outside components/ui
  [/(?<![\w:-])glass-(?:bg|frosted)(?![\w-])/g, "lg lg-regular lg-surface"],
  [/(?<![\w:-])glass-(?:crystal|fluted)(?![\w-])/g, "lg lg-clear lg-surface"],
]

function walk(p, out) {
  const st = fs.statSync(p)
  if (st.isDirectory()) { for (const f of fs.readdirSync(p)) if (f !== "node_modules" && f !== "ui") walk(path.join(p, f), out) }
  else if (/\.(tsx?|mdx?)$/.test(p)) out.push(p)
  return out
}

let changed = 0
for (const f of process.argv.slice(2).flatMap(a => walk(a, []))) {
  const src = fs.readFileSync(f, "utf8")
  const next = rules.reduce((s, [re, to]) => s.replace(re, to), src)
  if (next !== src) { fs.writeFileSync(f, next); changed++; console.log("updated", f) }
}
console.log(`${changed} files updated`)
```

`walk` skips any directory named `ui`, so `components/ui/**` is never rewritten by the codemod.

- [ ] **Step 2: Run it**

Run: `node scripts/codemod-liquid.mjs app components lib/component-examples.ts stories`
Expected: a list of updated files ending with `N files updated` (N ≈ 60–80). Then `git diff --stat` to review.

- [ ] **Step 3: Manual fixes the codemod cannot do**
  - `app/page.tsx` ~line 329: the loop `(["glass","frosted","fluted","crystal"] as const).map(v => …)` passing `variant={v}` → `(["regular","clear","tinted"] as const).map(m => …)` passing `material={m}`; update visible labels to "Regular", "Clear", "Tinted".
  - `stories/*.stories.tsx` `argTypes` option arrays (≈ line 14–21 in Alert, Badge, Button, ButtonGroup, Card, Carousel, Command, DatePickerInput, EmptyState, HoverCard, Input, InputGroup, MenuBar, Spinner, Table, Textarea): remove the glass names from `variant.options` (add `'liquid'`), and add `material: { control: 'select', options: ['regular', 'clear', 'tinted'] }`. `stories/Card.stories.tsx` line ~156 `glass: {…}` args → `glass: { tint: 'rgba(59,130,246,0.6)', frost: 0.5 }`.
  - `app/docs/getting-started/page.tsx`: code snippets at lines ~164–165 and ~297–298 → `<Button>` / `<Card material="clear" glass={{ tint: "#3b82f6", frost: 0.5 }}>`; CSS snippets (~200–279) → document `--lg-tint`, `--lg-base`, `--lg-blur`, `--lg-sat`, `--lg-rim-hi`, `--lg-rim-lo` instead of `--glass-*`/`--blur*`.
  - `components/ui/glass/button.tsx` JSDoc (lines 17–29) and `card.tsx` JSDoc: use `material`/`glass={{ tint, frost }}`.

- [ ] **Step 4: Remove the legacy aliases**

In `lib/liquid-glass/material.ts`: delete `LegacyGlassVariant` and `LEGACY`; `resolveVariant` becomes:

```ts
export function resolveVariant<V extends string>(variant: V | undefined, material: Material | undefined) {
  return { variant: (variant ?? "liquid") as V | "liquid", material: material ?? "regular" }
}
```

Update `material.test.ts`: delete the `"maps legacy glass names"` and `"prefers an explicit material"` cases. Remove `| LegacyGlassVariant` from every component's variant type (`grep -rn LegacyGlassVariant components` must print nothing).

- [ ] **Step 5: Remove old glass styling**
  - `app/globals.css`: delete `--shadow-glass` in `@theme inline`; all `--glass-*`, `--blur*` tokens in `:root` and `.dark`; the `.glass-bg`, `.glass-frosted`, `.glass-fluted`, `.glass-crystal` rules (and `::before/::after/:hover`). Keep `@keyframes shimmer`.
  - `git rm lib/glass-utils.ts`.
  - Replace every unprefixed `shadow-lg shadow-purple-500/{20,30}` / `shadow-md shadow-purple-500/…` glow string in `components/ui/glass/*.tsx` with `glowRing` (import from `@/lib/hover-effects`).
  - Where the original had a state prefix (e.g. `data-[state=checked]:shadow-lg data-[state=checked]:shadow-purple-500/30`), write the literal with the same prefix: `data-[state=checked]:shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_0_28px_-4px_rgba(255,255,255,0.45)]`. Do not build it by string interpolation: Tailwind only generates classes it can see literally in source.
  - Remove now-redundant `variant = "glass"` defaults left in wrappers.

- [ ] **Step 6: Verify nothing old remains**

Run:
```bash
grep -rnE 'glass-(bg|frosted|fluted|crystal)|--glass-|var\(--blur|glassSubtle|glassSolid|variant="(glass|frosted|crystal|fluted)"|GlassCustomization|getGlassStyles|purple-500' app components lib stories --include=*.ts --include=*.tsx --include=*.css
```
Expected: no output. Then gates (`tsc`, `pnpm test`, `pnpm build`).

- [ ] **Step 7: Docs**

Rewrite `components/ui/glass/README.md` usage section and `components/ui/glass/GLASS_CUSTOMIZATION.md` for the `material` / `tint` / `glass={{ tint, frost }}` API (examples for each material; the role table from the spec; note WebGL upgrade via `LiquidGlassProvider`). In the root `README.md`, replace `variant="glass"` examples with the default/`material` API and add a short "Liquid glass" section linking to `components/ui/liquid/README.md`. Update `components/ui/liquid/README.md`: remove the `Liquid*` components section; document `useLiquidBackdrop`; state that components get `data-glass` automatically via `material.ts`.

- [ ] **Step 8: Commit**

```bash
git add -A scripts app components lib stories
git commit -m "refactor: migrate all usages to the liquid material API and remove old glass styling"
```

---

### Task 12: Registry

**Files:**
- Modify: `registry.json`
- Generated: `public/r/*.json`

- [ ] **Step 1: Rewrite each component item's files with a script**

```bash
python3 - <<'EOF'
import json, os
p = "registry.json"
d = json.load(open(p))
f = lambda path, t: {"path": path, "type": t, "target": path}
for it in d["items"]:
    if it["type"] != "registry:component":
        continue
    name = it["name"]
    base = f"components/ui/{name}.tsx"
    files = [f("lib/utils.ts", "registry:lib"), f("lib/liquid-glass/material.ts", "registry:lib"),
             f("lib/hover-effects.ts", "registry:lib"), f("app/globals.css", "registry:style")]
    if os.path.exists(base):
        files.append(f(base, "registry:ui"))
    files.append(f(f"components/ui/glass/{name}.tsx", "registry:component"))
    it["files"] = files
    # The base file now ships with the item; only keep dependencies on *other* components.
    deps = [r for r in it.get("registryDependencies", []) if r != name]
    if deps: it["registryDependencies"] = deps
    else: it.pop("registryDependencies", None)
lg = next(i for i in d["items"] if i["name"] == "liquid-glass")
lg["files"] = [f("lib/utils.ts", "registry:lib"), f("lib/liquid-glass/engine.ts", "registry:lib"),
               f("lib/liquid-glass/budget.ts", "registry:lib"), f("lib/liquid-glass/backdrop-stack.ts", "registry:lib"),
               f("lib/liquid-glass/material.ts", "registry:lib"),
               f("components/ui/liquid/liquid-glass-provider.tsx", "registry:ui"),
               f("components/ui/liquid/liquid-filters.tsx", "registry:ui")]
open(p, "w").write(json.dumps(d, indent=2, ensure_ascii=False) + "\n")
EOF
```

Components whose base file imports another base component (e.g. `date-picker-input` imports button/calendar/popover/input; `alert-dialog`, `calendar`, `carousel`, `pagination`, `menu-bar`, `mode-toggle` import `button`) keep those as `registryDependencies`. Check with: `grep -ln '@/components/ui/[a-z-]*"' components/ui/*.tsx` and make sure each imported sibling is listed in that item's `registryDependencies`. Note these still resolve by bare name; a namespaced `@glass-ui/<name>` form is out of scope.

- [ ] **Step 2:** `pnpm registry:build`. Expected: `✔ Building registry.`; `git status` shows every `public/r/*.json` changed (they embed the new globals and material files).
- [ ] **Step 3:** Spot-check: `node -e 'const j=require("./public/r/button.json");console.log(j.files.map(f=>f.path))'` lists `components/ui/button.tsx` and `lib/liquid-glass/material.ts`, and no `lib/glass-utils.ts`.
- [ ] **Step 4: Commit** — `git commit -am "feat(registry): ship base components and the liquid material with every item"`

---

### Task 13: Final verification pass

No code unless a check fails (then fix in the owning component and commit `fix: …`).

- [ ] **Step 1:** `pnpm test`, type-check gate, `pnpm build`, `pnpm build-storybook` — all succeed.
- [ ] **Step 2: Pages, dark and light** — `/`, `/components`, `/docs/getting-started`, `/docs/components/button`, `/docs/components/dialog`, `/docs/components/select`, `/blocks`, one `/blocks/<block>`, `/themes`, `/liquid`. For each: screenshot; no invisible components; overlays legible; header capsule refracts.
- [ ] **Step 3: Budget (Review Focus 1)** — on `/components`, run `document.querySelectorAll("[data-glass]").length` (expect > 32) and `document.querySelectorAll("[data-glass-live]").length` (expect ≤ 32). Scroll through the page: every component visible, either WebGL or CSS.
- [ ] **Step 4: Fallback (Review Focus 5)** — in the console run `document.documentElement.classList.remove("lg-on")` on `/` and `/components`: every component still shows the CSS liquid look (rim, frost) — nothing transparent. Reload to restore.
- [ ] **Step 5: Reduced motion** — DevTools → Rendering → emulate `prefers-reduced-motion: reduce`, reload `/liquid`: pressing a button does not squash.
- [ ] **Step 6:** Report results to the user with screenshots of `/` and `/components` in both themes.
