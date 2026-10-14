"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import * as SliderPrimitive from "@radix-ui/react-slider"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"
import { useLiquidGlass } from "./liquid-glass-provider"
import type { GlassPreset } from "@/lib/liquid-glass/engine"

/* Every component keeps the existing `glass-bg` look as its fallback.
   When the provider is active, html.lg-on strips that CSS (see app/liquid-glass.css)
   and the WebGL engine draws the glass instead. */

type GlassAttrs = { glass?: GlassPreset; layer?: 0 | 1; tint?: number; frost?: number; merge?: boolean }
const glassAttrs = ({ glass, layer, tint, frost, merge }: GlassAttrs, fallback: GlassPreset) => ({
  "data-glass": glass ?? fallback,
  ...(layer !== undefined && { "data-layer": String(layer) }),
  ...(tint !== undefined && { "data-tint": String(tint) }),
  ...(frost !== undefined && { "data-frost": String(frost) }),
  ...(merge !== undefined && { "data-merge": merge ? "1" : "0" }),
})

/* Button — capsule or circle */
export interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, GlassAttrs {
  size?: "sm" | "md" | "lg" | "icon"
}
export const LiquidButton = React.forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ className, size = "md", glass, layer, tint, frost, merge, ...props }, ref) => (
    <button
      ref={ref}
      {...glassAttrs({ glass, layer, tint, frost, merge }, "button")}
      className={cn(
        "glass-bg inline-flex items-center justify-center gap-2 rounded-full font-semibold text-foreground select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50",
        size === "sm" && "h-10 px-4 text-sm",
        size === "md" && "h-[52px] px-6 text-base",
        size === "lg" && "h-14 px-8 text-base",
        size === "icon" && "size-[52px]",
        className
      )}
      {...props}
    />
  )
)
LiquidButton.displayName = "LiquidButton"

/* Toolbar / nav bar / dock container */
export const LiquidBar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & GlassAttrs>(
  ({ className, glass, layer, tint, frost, merge, ...props }, ref) => (
    <div ref={ref} {...glassAttrs({ glass, layer, tint, frost, merge }, "bar")}
      className={cn("glass-bg flex items-center rounded-full", className)} {...props} />
  )
)
LiquidBar.displayName = "LiquidBar"

/* Card / panel */
export const LiquidCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & GlassAttrs>(
  ({ className, glass, layer, tint, frost, merge, ...props }, ref) => (
    <div ref={ref} {...glassAttrs({ glass, layer, tint, frost, merge }, "card")}
      className={cn("glass-bg rounded-[32px] p-7 text-foreground", className)} {...props} />
  )
)
LiquidCard.displayName = "LiquidCard"

/* Search field */
export const LiquidSearch = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { icon?: React.ReactNode }>(
  ({ className, icon, ...props }, ref) => (
    <label data-glass="bar" className={cn("glass-bg flex h-[52px] cursor-text items-center gap-2.5 rounded-full px-5", className)}>
      {icon && <span className="shrink-0 opacity-65">{icon}</span>}
      <input ref={ref} className="min-w-0 flex-1 bg-transparent text-[17px] outline-none placeholder:text-current placeholder:opacity-55" {...props} />
    </label>
  )
)
LiquidSearch.displayName = "LiquidSearch"

/* Switch — painted track + glass knob that goes clear & grows while pressed */
export const LiquidSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, onCheckedChange, ...props }, ref) => {
  const lg = useLiquidGlass()
  const thumb = React.useRef<HTMLSpanElement>(null)
  return (
    <SwitchPrimitives.Root
      ref={ref}
      className={cn(
        "group peer relative inline-flex h-8 w-[60px] shrink-0 cursor-pointer items-center rounded-full",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      onCheckedChange={(v) => {
        if (thumb.current && lg) { lg.press(thumb.current, true); setTimeout(() => thumb.current && lg.press(thumb.current, false), 380) }
        onCheckedChange?.(v)
      }}
      {...props}
    >
      {/* The track is painted into the shader scene (and hidden in the DOM), so it lives on
          its own span: the root keeps its focus ring and disabled styling. */}
      <span
        aria-hidden
        data-glass-solid=""
        data-layer="1"
        className="absolute inset-0 rounded-full transition-colors duration-200 group-data-[state=unchecked]:bg-black/15 dark:group-data-[state=unchecked]:bg-white/20 group-data-[state=checked]:bg-green-500"
      />
      <SwitchPrimitives.Thumb
        ref={thumb}
        data-glass="knob"
        className={cn(
          "relative block h-7 w-9 rounded-full bg-white shadow-md",
          "translate-x-0.5 data-[state=checked]:translate-x-[22px]",
          "transition-[translate] duration-[450ms] ease-[cubic-bezier(.34,1.56,.64,1)]"
        )}
      />
    </SwitchPrimitives.Root>
  )
})
LiquidSwitch.displayName = "LiquidSwitch"

/* Slider — painted track/range + glass knob */
export const LiquidSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root ref={ref} className={cn("relative flex h-7 w-full touch-none select-none items-center", className)} {...props}>
    <SliderPrimitive.Track data-glass-solid="" data-layer="1" className="relative h-2 w-full grow rounded-full bg-black/12 dark:bg-white/20">
      <SliderPrimitive.Range data-glass-solid="" data-layer="1" className="absolute h-full rounded-full bg-primary" />
    </SliderPrimitive.Track>
    {(props.value ?? props.defaultValue ?? [0]).map((_, i) => (
      <SliderPrimitive.Thumb
        key={i}
        data-glass="knob"
        className="block h-7 w-11 cursor-grab rounded-full bg-white shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:cursor-grabbing"
      />
    ))}
  </SliderPrimitive.Root>
))
LiquidSlider.displayName = "LiquidSlider"

/* Tabs — glass bar with a sliding glass-on-glass selection pill */
export const LiquidTabs = TabsPrimitive.Root
export const LiquidTabsContent = TabsPrimitive.Content

export const LiquidTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, children, ...props }, ref) => {
  const list = React.useRef<HTMLDivElement | null>(null)
  const pill = React.useRef<HTMLSpanElement>(null)
  React.useEffect(() => {
    const el = list.current
    if (!el) return
    const place = () => {
      const a = el.querySelector<HTMLElement>('[data-state="active"]')
      if (!a || !pill.current) return
      Object.assign(pill.current.style, { left: a.offsetLeft + "px", width: a.offsetWidth + "px", opacity: "1" })
    }
    place()
    const mo = new MutationObserver(place)
    mo.observe(el, { subtree: true, attributes: true, attributeFilter: ["data-state"] })
    const ro = new ResizeObserver(place)
    ro.observe(el)
    return () => { mo.disconnect(); ro.disconnect() }
  }, [])
  return (
    <TabsPrimitive.List
      ref={(n) => { list.current = n; if (typeof ref === "function") ref(n); else if (ref) ref.current = n }}
      data-glass="bar"
      className={cn("glass-bg relative inline-flex h-[60px] items-center rounded-full p-1.5", className)}
      {...props}
    >
      <span
        ref={pill}
        aria-hidden
        data-glass="button"
        data-layer="1"
        data-tint="0.08"
        className="pointer-events-none absolute top-1.5 bottom-1.5 rounded-full bg-black/5 opacity-0 transition-[left,width] duration-500 ease-[cubic-bezier(.34,1.4,.64,1)] dark:bg-white/10"
      />
      {children}
    </TabsPrimitive.List>
  )
})
LiquidTabsList.displayName = "LiquidTabsList"

export const LiquidTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative z-10 flex h-full min-w-[96px] flex-col items-center justify-center gap-0.5 rounded-full px-4 text-[11px] font-semibold",
      "text-foreground data-[state=active]:text-primary focus-visible:outline-none",
      className
    )}
    {...props}
  />
))
LiquidTabsTrigger.displayName = "LiquidTabsTrigger"

/* Dialog / alert — glass sheet. Overlay is transparent on purpose: a DOM overlay
   would sit above the canvas and dim the sheet's own glass. */
export const LiquidDialog = DialogPrimitive.Root
export const LiquidDialogTrigger = DialogPrimitive.Trigger
export const LiquidDialogClose = DialogPrimitive.Close
export const LiquidDialogTitle = DialogPrimitive.Title
export const LiquidDialogDescription = DialogPrimitive.Description

export const LiquidDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-transparent" />
    <DialogPrimitive.Content
      ref={ref}
      data-glass="sheet"
      className={cn(
        "glass-bg fixed left-1/2 top-1/2 z-50 flex w-[min(360px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded-[34px] p-7 text-foreground",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:zoom-in-50 data-[state=closed]:zoom-out-90 data-[state=closed]:fade-out-0 duration-300",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
))
LiquidDialogContent.displayName = "LiquidDialogContent"
