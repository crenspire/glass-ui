"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { LiquidGlass, type LiquidGlassOptions } from "@/lib/liquid-glass/engine"

type Backdrop = string | HTMLImageElement | HTMLVideoElement | HTMLCanvasElement

/* While the engine runs, <html> has .lg-on: the CSS glass on every [data-glass] element is
   switched off so only the shader glass shows, and the app shell goes transparent so the
   canvas shows through. Shipped with the provider so installing it needs no stylesheet edits. */
const LIQUID_GLASS_CSS = `
html.lg-on [data-glass] {
  background: transparent !important;
  background-image: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  border-color: transparent !important;
  box-shadow: none !important;
}
html.lg-on body { background: transparent; }
`

const LiquidGlassContext = React.createContext<LiquidGlass | null>(null)
export const useLiquidGlass = () => React.useContext(LiquidGlassContext)

export interface LiquidGlassProviderProps {
  /** Image URL, or an <img>/<video>/<canvas>. This is what the glass refracts. */
  backdrop: Backdrop
  /** Re-upload the source every frame (auto for video; set for animated canvases). */
  live?: boolean
  options?: Omit<LiquidGlassOptions, "mode">
  children: React.ReactNode
}

/**
 * Renders the backdrop + all liquid glass on one fixed, full-viewport WebGL canvas
 * behind the app. Any element with `data-glass` anywhere in the document (including
 * Radix portals) gets glass drawn beneath it. If WebGL is unavailable or the user
 * prefers reduced transparency, the existing CSS glass stays in place.
 */
export function LiquidGlassProvider({ backdrop, live, options, children }: LiquidGlassProviderProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [engine, setEngine] = React.useState<LiquidGlass | null>(null)
  const { resolvedTheme } = useTheme()
  const mode = resolvedTheme === "dark" ? "dark" : "light"

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

  React.useEffect(() => {
    if (!engine) return
    if (typeof backdrop !== "string") { engine.setSource(backdrop, { live }); return }
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => engine.setSource(img)
    img.src = backdrop
  }, [engine, backdrop, live])

  return (
    <LiquidGlassContext.Provider value={engine}>
      <style href="liquid-glass" precedence="default">{LIQUID_GLASS_CSS}</style>
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", zIndex: 0, pointerEvents: "none" }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </LiquidGlassContext.Provider>
  )
}
