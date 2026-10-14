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

  useLiquidBackdrop(canvas, { base: true })

  return (
    <div
      data-glass-backdrop
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
