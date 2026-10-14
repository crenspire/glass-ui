"use client"

import * as React from "react"
import { getDemo, type DemoModule } from "./registry"

/** Loads a demo module on the client; null until it has loaded (or for unknown names). */
export function useDemo(name: string): DemoModule | null {
  const [mod, setMod] = React.useState<DemoModule | null>(null)
  React.useEffect(() => {
    let alive = true
    setMod(null)
    getDemo(name)?.load().then(m => { if (alive) setMod(m) })
    return () => { alive = false }
  }, [name])
  return mod
}
