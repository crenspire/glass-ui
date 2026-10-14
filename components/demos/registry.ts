import type * as React from "react"
import type { Material } from "@/lib/liquid-glass/material"
import registry from "@/registry.json"

export type DemoCategory = "Inputs" | "Overlays" | "Navigation" | "Data display" | "Feedback" | "Layout"
export const CATEGORIES: DemoCategory[] = ["Inputs", "Overlays", "Navigation", "Data display", "Feedback", "Layout"]

export interface DemoProps { material?: Material }
export interface DemoModule { default: React.ComponentType<DemoProps>; code: string }
export interface DemoEntry { name: string; title: string; category: DemoCategory; keywords: string[]; load: () => Promise<DemoModule> }

export const CATEGORY: Record<string, DemoCategory> = {
  button: "Inputs", "button-group": "Inputs", checkbox: "Inputs", "date-picker-input": "Inputs", input: "Inputs",
  "input-group": "Inputs", "input-otp": "Inputs", label: "Inputs", "radio-group": "Inputs", select: "Inputs",
  slider: "Inputs", switch: "Inputs", textarea: "Inputs", toggle: "Inputs", "toggle-group": "Inputs", cropper: "Inputs",
  "alert-dialog": "Overlays", "context-menu": "Overlays", dialog: "Overlays", drawer: "Overlays", "dropdown-menu": "Overlays",
  "hover-card": "Overlays", popover: "Overlays", sheet: "Overlays", tooltip: "Overlays", command: "Overlays",
  breadcrumb: "Navigation", "menu-bar": "Navigation", "navigation-menu": "Navigation", pagination: "Navigation",
  tabs: "Navigation", sidebar: "Navigation", "mode-toggle": "Navigation",
  avatar: "Data display", badge: "Data display", calendar: "Data display", card: "Data display",
  carousel: "Data display", chart: "Data display", table: "Data display",
  alert: "Feedback", "empty-state": "Feedback", skeleton: "Feedback", sonner: "Feedback", spinner: "Feedback",
  separator: "Layout", "scroll-area": "Layout", collapsible: "Layout", accordion: "Layout",
}

// Static import map so the bundler can split each demo into its own chunk.
export const LOADERS: Record<string, () => Promise<DemoModule>> = {
  accordion: () => import("./accordion"), alert: () => import("./alert"), "alert-dialog": () => import("./alert-dialog"),
  avatar: () => import("./avatar"), badge: () => import("./badge"), breadcrumb: () => import("./breadcrumb"),
  button: () => import("./button"), "button-group": () => import("./button-group"), calendar: () => import("./calendar"),
  card: () => import("./card"), carousel: () => import("./carousel"), chart: () => import("./chart"),
  checkbox: () => import("./checkbox"), collapsible: () => import("./collapsible"), command: () => import("./command"),
  "context-menu": () => import("./context-menu"), cropper: () => import("./cropper"),
  "date-picker-input": () => import("./date-picker-input"), dialog: () => import("./dialog"), drawer: () => import("./drawer"),
  "dropdown-menu": () => import("./dropdown-menu"), "empty-state": () => import("./empty-state"),
  "hover-card": () => import("./hover-card"), input: () => import("./input"), "input-group": () => import("./input-group"),
  "input-otp": () => import("./input-otp"), label: () => import("./label"), "menu-bar": () => import("./menu-bar"),
  "mode-toggle": () => import("./mode-toggle"), "navigation-menu": () => import("./navigation-menu"),
  pagination: () => import("./pagination"), popover: () => import("./popover"), "radio-group": () => import("./radio-group"),
  "scroll-area": () => import("./scroll-area"), select: () => import("./select"), separator: () => import("./separator"),
  sheet: () => import("./sheet"), sidebar: () => import("./sidebar"), skeleton: () => import("./skeleton"),
  slider: () => import("./slider"), sonner: () => import("./sonner"), spinner: () => import("./spinner"),
  switch: () => import("./switch"), table: () => import("./table"), tabs: () => import("./tabs"),
  textarea: () => import("./textarea"), toggle: () => import("./toggle"), "toggle-group": () => import("./toggle-group"),
  tooltip: () => import("./tooltip"),
}

export const DEMOS: DemoEntry[] = registry.items
  .filter(i => i.type === "registry:component" && LOADERS[i.name])
  .map(i => ({
    name: i.name,
    title: i.title ?? i.name,
    category: CATEGORY[i.name],
    keywords: [i.name, ...(i.description ?? "").toLowerCase().split(/\W+/).filter(w => w.length > 3)],
    load: LOADERS[i.name],
  }))
  .sort((a, b) => a.title.localeCompare(b.title))

export function getDemo(name: string) {
  return DEMOS.find(d => d.name === name)
}
