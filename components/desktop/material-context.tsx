"use client"

import * as React from "react"
import type { Material } from "@/lib/liquid-glass/material"

const Ctx = React.createContext<[Material, (m: Material) => void]>(["regular", () => {}])

/** The Materials widget switches every widget on the desktop between regular, clear and tinted. */
export function DesktopMaterialProvider({ children }: { children: React.ReactNode }) {
  const state = React.useState<Material>("regular")
  return <Ctx.Provider value={state}>{children}</Ctx.Provider>
}

export const useDesktopMaterial = () => React.useContext(Ctx)
