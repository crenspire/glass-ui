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
   transparent so the canvas shows through, and once the canvas shows the backdrop (.lg-ready) any
   DOM copy of it marked data-glass-backdrop is hidden. Shipped with the provider so installing it needs
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
html.lg-ready [data-glass-backdrop] { visibility: hidden; }
html.lg-on body { background: transparent; }
`

const LiquidGlassContext = React.createContext<LiquidGlass | null>(null)
const BackdropContext = React.createContext<{
  push: (e: BackdropEntry<Backdrop>) => void
  pop: (id: number) => void
} | null>(null)

export const useLiquidGlass = () => React.useContext(LiquidGlassContext)

let nextBackdropId = 1
/** Makes `src` the refracted backdrop while the calling component is mounted. A `base` backdrop
    (the site wallpaper) stays below any page backdrop. */
export function useLiquidBackdrop(src: Backdrop | null, { live, base }: { live?: boolean; base?: boolean } = {}) {
  const ctx = React.useContext(BackdropContext)
  const id = React.useRef(0)
  if (!id.current) id.current = nextBackdropId++
  React.useEffect(() => {
    if (!ctx || !src) return
    ctx.push({ id: id.current, src, live, base })
    return () => ctx.pop(id.current)
  }, [ctx, src, live, base])
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

  React.useEffect(() => {
    if (!engine) return
    engine.set({ mode })
    // Backgrounds change with the theme; re-check which glass the canvas can show.
    const raf = requestAnimationFrame(() => engine.scan(document.body))
    return () => cancelAnimationFrame(raf)
  }, [engine, mode])
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
