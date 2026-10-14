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
