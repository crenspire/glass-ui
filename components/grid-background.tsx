"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

/**
 * Theme-aware wallpaper.
 * Dark: grayish-blue with subtle color variation.
 * Light: soft pastel gradient with visible color blobs — gives
 *        the glass components something to contrast against.
 */
export function GridBackground() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = !mounted || resolvedTheme === "dark"

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden transition-colors duration-500"
      style={{
        background: isDark
          ? `linear-gradient(160deg,
              oklch(0.22 0.025 260) 0%,
              oklch(0.18 0.03 268) 30%,
              oklch(0.15 0.025 275) 60%,
              oklch(0.13 0.02 280) 100%)`
          : `linear-gradient(160deg,
              oklch(0.88 0.04 250) 0%,
              oklch(0.85 0.05 260) 30%,
              oklch(0.82 0.06 270) 55%,
              oklch(0.84 0.05 255) 80%,
              oklch(0.87 0.04 245) 100%)`,
      }}
    >
      {/* Blob top-left */}
      <div
        className="absolute"
        style={{
          width: "55vw",
          height: "55vh",
          top: "-5%",
          left: "-10%",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, oklch(0.28 0.03 280 / 0.25) 0%, transparent 70%)"
            : "radial-gradient(circle, oklch(0.82 0.08 290 / 0.5) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Blob top-right */}
      <div
        className="absolute"
        style={{
          width: "45vw",
          height: "50vh",
          top: "-5%",
          right: "-10%",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, oklch(0.25 0.025 220 / 0.2) 0%, transparent 70%)"
            : "radial-gradient(circle, oklch(0.85 0.07 210 / 0.45) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Blob center */}
      <div
        className="absolute"
        style={{
          width: "65vw",
          height: "55vh",
          top: "25%",
          left: "15%",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, oklch(0.23 0.025 200 / 0.2) 0%, transparent 70%)"
            : "radial-gradient(circle, oklch(0.88 0.06 240 / 0.4) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Blob bottom-left */}
      <div
        className="absolute"
        style={{
          width: "50vw",
          height: "50vh",
          bottom: "-5%",
          left: "0%",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, oklch(0.2 0.025 300 / 0.2) 0%, transparent 70%)"
            : "radial-gradient(circle, oklch(0.8 0.08 310 / 0.4) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* Blob bottom-right */}
      <div
        className="absolute"
        style={{
          width: "50vw",
          height: "45vh",
          bottom: "-10%",
          right: "-5%",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, oklch(0.24 0.02 240 / 0.18) 0%, transparent 70%)"
            : "radial-gradient(circle, oklch(0.83 0.06 225 / 0.35) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: isDark
            ? `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
               linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`
            : `linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
               linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: isDark
            ? `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
               linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`
            : `linear-gradient(rgba(0,0,0,0.015) 1px, transparent 1px),
               linear-gradient(90deg, rgba(0,0,0,0.015) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />
    </div>
  )
}
