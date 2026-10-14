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
