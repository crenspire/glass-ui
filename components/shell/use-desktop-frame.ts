"use client"

import * as React from "react"

export const DESKTOP_QUERY = "(min-width: 1024px) and (min-height: 640px)"

export function matchesDesktop() {
  return typeof matchMedia === "function" && matchMedia(DESKTOP_QUERY).matches
}

/** True when the non-scrolling desktop frame applies. False on the server and first client render. */
export function useDesktopFrame() {
  const [desktop, setDesktop] = React.useState(false)
  React.useEffect(() => {
    const mq = matchMedia(DESKTOP_QUERY)
    const update = () => setDesktop(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])
  return desktop
}
