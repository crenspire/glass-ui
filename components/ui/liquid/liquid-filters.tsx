"use client"

import * as React from "react"

/* SVG filter used by the .lg CSS layer for edge lensing. Displacement is neutral (0.5) in the
   middle and ramps to the edges: red drives x, green drives y. Only Chromium applies url()
   filters inside backdrop-filter, so html.lg-lens is set there and nowhere else. */
const ramp = (dir: "x" | "y", channel: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" preserveAspectRatio="none"><defs><linearGradient id="g" x2="${dir === "x" ? 1 : 0}" y2="${dir === "y" ? 1 : 0}"><stop offset="0" stop-color="${channel}" stop-opacity="1"/><stop offset=".14" stop-color="${channel}" stop-opacity=".5"/><stop offset=".86" stop-color="${channel}" stop-opacity=".5"/><stop offset="1" stop-color="${channel}" stop-opacity="0"/></linearGradient></defs><rect width="100" height="100" fill="url(#g)"/></svg>`
  )}`

export function LiquidFilters() {
  React.useEffect(() => {
    if (!/Chrome\//.test(navigator.userAgent)) return
    document.documentElement.classList.add("lg-lens")
    return () => document.documentElement.classList.remove("lg-lens")
  }, [])
  return (
    <svg aria-hidden width="0" height="0" style={{ position: "absolute" }}>
      <filter id="lg-lens" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feImage href={ramp("x", "#f00")} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="rx" />
        <feImage href={ramp("y", "#0f0")} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="gy" />
        <feComposite in="rx" in2="gy" operator="arithmetic" k2="1" k3="1" result="map" />
        <feDisplacementMap in="SourceGraphic" in2="map" scale="24" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  )
}
