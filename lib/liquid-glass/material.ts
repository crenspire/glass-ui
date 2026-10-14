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
  /** Draw with the WebGL engine when a LiquidGlassProvider is present. WebGL glass sits behind
      the page, so only elements resting directly on the backdrop should use it. Defaults to
      true for in-flow roles and false for sheets; overlays and inline items never use it. */
  webgl?: boolean
}

/** `data-*` attributes for the WebGL engine. */
export type DataAttrs = { [K in `data-${string}`]?: string }

const PRESET: Record<GlassRole, string | null> = {
  surface: "card", sheet: "sheet", bar: "bar", control: "button", knob: "knob", inline: null, overlay: null,
}
// Roles whose elements usually float over page content default to CSS-only.
const WEBGL_DEFAULT: Record<GlassRole, boolean> = {
  surface: true, sheet: false, bar: true, control: true, knob: true, inline: false, overlay: false,
}
const PARAMS: Record<Material, { frost: number; tint: number }> = {
  regular: { frost: 1, tint: 0.2 },
  clear: { frost: 0.1, tint: 0 },
  tinted: { frost: 0.6, tint: 0.35 },
}
export function liquidGlass({ role, material = "regular", tint, glass, webgl = WEBGL_DEFAULT[role] }: LiquidProps & { role: GlassRole }): {
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
  const preset = webgl ? PRESET[role] : null
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

/** A component's `variant` (default `liquid`) together with its material (default `regular`). */
export function resolveVariant<V extends string>(variant: V | undefined, material: Material | undefined) {
  return { variant: (variant ?? "liquid") as V | "liquid", material: material ?? "regular" }
}
