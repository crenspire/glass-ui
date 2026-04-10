"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

/**
 * Theme-aware wallpaper with color variation spread across
 * the full viewport so backdrop-filter blur is visible everywhere.
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
              oklch(0.97 0.01 240) 0%,
              oklch(0.96 0.015 250) 30%,
              oklch(0.95 0.02 260) 60%,
              oklch(0.96 0.01 248) 100%)`,
      }}
    >
      {/* Blob top-left — always visible behind top content */}
      <div
        className="absolute"
        style={{
          width: "50vw",
          height: "50vh",
          top: "5%",
          left: "-5%",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, oklch(0.28 0.03 280 / 0.25) 0%, transparent 70%)"
            : "radial-gradient(circle, oklch(0.9 0.04 280 / 0.2) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Blob top-right */}
      <div
        className="absolute"
        style={{
          width: "40vw",
          height: "45vh",
          top: "0%",
          right: "-5%",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, oklch(0.25 0.025 220 / 0.2) 0%, transparent 70%)"
            : "radial-gradient(circle, oklch(0.92 0.03 220 / 0.18) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Blob center — behind the main card grid */}
      <div
        className="absolute"
        style={{
          width: "60vw",
          height: "50vh",
          top: "30%",
          left: "20%",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, oklch(0.23 0.025 200 / 0.2) 0%, transparent 70%)"
            : "radial-gradient(circle, oklch(0.92 0.03 200 / 0.15) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Blob bottom-left */}
      <div
        className="absolute"
        style={{
          width: "45vw",
          height: "45vh",
          bottom: "0%",
          left: "5%",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, oklch(0.2 0.025 300 / 0.2) 0%, transparent 70%)"
            : "radial-gradient(circle, oklch(0.92 0.03 300 / 0.15) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* Blob bottom-right */}
      <div
        className="absolute"
        style={{
          width: "50vw",
          height: "40vh",
          bottom: "-5%",
          right: "-5%",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, oklch(0.24 0.02 240 / 0.18) 0%, transparent 70%)"
            : "radial-gradient(circle, oklch(0.93 0.025 240 / 0.12) 0%, transparent 70%)",
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
            : `linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),
               linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: isDark
            ? `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
               linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`
            : `linear-gradient(rgba(0,0,0,0.01) 1px, transparent 1px),
               linear-gradient(90deg, rgba(0,0,0,0.01) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />
    </div>
  )
}
