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
