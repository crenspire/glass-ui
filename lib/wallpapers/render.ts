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
