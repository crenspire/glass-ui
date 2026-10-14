"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"
import { liquidProps, resolveVariant, type LiquidProps } from "@/lib/liquid-glass/material"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & LiquidProps & {
    variant?: "liquid" | "default"
  }
>(({ className, variant, material, tint, glass, webgl, style, children, ...props }, ref) => {
  const v = resolveVariant<"liquid" | "default">(variant, material)
  const list = React.useRef<HTMLDivElement | null>(null)
  const pill = React.useRef<HTMLSpanElement>(null)
  const liquid = v.variant === "liquid"

  // Slide the glass pill under the active trigger.
  React.useEffect(() => {
    const el = list.current
    if (!liquid || !el) return
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
  }, [liquid])

  const base = "group/tabs relative inline-flex items-center justify-center p-1 text-muted-foreground"
  const own = liquid
    ? liquidProps({ role: "bar", material: v.material, tint, glass, webgl }, { className: cn(base, "h-11", className), style })
    : { className: cn(base, "h-9 rounded-lg bg-muted", className), style }

  return (
    <TabsPrimitive.List
      ref={(n) => { list.current = n; if (typeof ref === "function") ref(n); else if (ref) ref.current = n }}
      data-variant={v.variant}
      {...own}
      {...props}
    >
      {liquid && (
        <span
          ref={pill}
          aria-hidden
          {...liquidProps({ role: "control", material: "clear" }, {
            className: "pointer-events-none absolute top-1 bottom-1 opacity-0 transition-[left,width] duration-500 ease-[cubic-bezier(.34,1.4,.64,1)]",
          })}
        />
      )}
      {children}
    </TabsPrimitive.List>
  )
})
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative z-10 inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      // Inactive state - transparent, blends with background
      "text-muted-foreground",
      // Active state in a default list - lighter, more opaque background with shadow
      "data-[state=active]:bg-white/80 data-[state=active]:text-foreground",
      "data-[state=active]:shadow-[0_1px_3px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.5)]",
      "dark:data-[state=active]:bg-white/20 dark:data-[state=active]:text-foreground",
      "dark:data-[state=active]:shadow-[0_2px_6px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.15),inset_0_0_8px_rgba(255,255,255,0.1)]",
      // In a liquid list the glass pill marks the active tab instead
      "group-data-[variant=liquid]/tabs:h-full group-data-[variant=liquid]/tabs:rounded-full group-data-[variant=liquid]/tabs:px-4",
      "group-data-[variant=liquid]/tabs:data-[state=active]:bg-transparent group-data-[variant=liquid]/tabs:data-[state=active]:shadow-none group-data-[variant=liquid]/tabs:data-[state=active]:text-primary",
      // dark: carries class specificity (:is(.dark *)), so the override is repeated under it
      "dark:group-data-[variant=liquid]/tabs:data-[state=active]:bg-transparent dark:group-data-[variant=liquid]/tabs:data-[state=active]:shadow-none dark:group-data-[variant=liquid]/tabs:data-[state=active]:text-primary",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }

