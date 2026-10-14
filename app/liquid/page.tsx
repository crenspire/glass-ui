"use client"

import * as React from "react"
import { ChevronLeft, Search, Share, Bell, Moon, Heart, Plus, Home, LayoutGrid, Music, User } from "lucide-react"
import { useTheme } from "next-themes"
import { LiquidGlassProvider } from "@/components/ui/liquid/liquid-glass-provider"
import {
  LiquidButton, LiquidBar, LiquidCard, LiquidSearch, LiquidSwitch, LiquidSlider,
  LiquidTabs, LiquidTabsList, LiquidTabsTrigger,
  LiquidDialog, LiquidDialogTrigger, LiquidDialogContent, LiquidDialogTitle, LiquidDialogDescription, LiquidDialogClose,
} from "@/components/ui/liquid"

export default function LiquidDemo() {
  const { resolvedTheme, setTheme } = useTheme()
  const [refraction, setRefraction] = React.useState([28])
  const [liquid, setLiquid] = React.useState(true)
  // resolvedTheme is unknown during SSR; wait for mount so the switch hydrates cleanly.
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  const options = React.useMemo(() => ({ refraction: refraction[0], liquid }), [refraction, liquid])

  return (
    <LiquidGlassProvider backdrop="/page.jpg" options={options}>
      <main className="min-h-screen p-7 text-foreground">
        <header className="flex items-center justify-between gap-4">
          <LiquidButton size="icon" aria-label="Back"><ChevronLeft className="size-6" /></LiquidButton>
          <LiquidSearch icon={<Search className="size-5" />} placeholder="Search components" className="w-[440px] max-w-full" />
          <LiquidBar className="h-[52px] gap-1 px-1">
            <LiquidButton size="icon" glass="bar" className="size-12" aria-label="Share"><Share className="size-5" /></LiquidButton>
          </LiquidBar>
        </header>

        <section className="mt-8 grid max-w-[820px] gap-8 md:grid-cols-2">
          <LiquidCard className="flex min-h-[300px] flex-col">
            <p className="font-mono text-xs uppercase tracking-widest opacity-65">Now playing</p>
            <h2 className="mt-2.5 text-[28px] font-semibold tracking-tight">Glass UI Sessions</h2>
            <p className="opacity-65">Crenspire · Vol. 2</p>
          </LiquidCard>

          <LiquidCard className="flex flex-col gap-6">
            <div className="flex items-baseline justify-between">
              <span className="font-semibold">Refraction</span>
              <span className="font-mono text-sm opacity-65">{refraction[0]}px</span>
            </div>
            <LiquidSlider value={refraction} onValueChange={setRefraction} min={0} max={60} />
            <div className="flex items-center justify-between">
              <span className="font-medium">Liquid motion</span>
              <LiquidSwitch checked={liquid} onCheckedChange={setLiquid} />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Dark appearance</span>
              <LiquidSwitch checked={mounted && resolvedTheme === "dark"} onCheckedChange={(v) => setTheme(v ? "dark" : "light")} />
            </div>
            <div className="flex gap-5">
              {[Bell, Moon, Heart, Plus].map((I, i) => (
                <LiquidButton key={i} size="icon" layer={1} tint={0.06} className="size-14"><I className="size-5" /></LiquidButton>
              ))}
            </div>
          </LiquidCard>
        </section>

        <div className="mt-8">
          <LiquidDialog>
            <LiquidDialogTrigger asChild><LiquidButton merge>Show alert</LiquidButton></LiquidDialogTrigger>
            <LiquidDialogContent>
              <LiquidDialogTitle className="text-xl font-semibold">Delete “Liquid Tab Bar”?</LiquidDialogTitle>
              <LiquidDialogDescription className="opacity-70">It will be removed from your registry.</LiquidDialogDescription>
              <div className="mt-4 flex gap-3">
                <LiquidDialogClose className="h-12 flex-1 rounded-full bg-black/10 font-semibold dark:bg-white/15">Cancel</LiquidDialogClose>
                <LiquidDialogClose className="h-12 flex-1 rounded-full bg-black/10 font-semibold text-red-600 dark:bg-white/15 dark:text-red-400">Delete</LiquidDialogClose>
              </div>
            </LiquidDialogContent>
          </LiquidDialog>
        </div>

        <nav className="fixed bottom-7 left-7">
          <LiquidTabs defaultValue="home">
            <LiquidTabsList>
              {[["home", "Home", Home], ["browse", "Browse", LayoutGrid], ["library", "Library", Music], ["profile", "Profile", User]].map(([v, l, I]: any) => (
                <LiquidTabsTrigger key={v} value={v}><I className="size-[22px]" />{l}</LiquidTabsTrigger>
              ))}
            </LiquidTabsList>
          </LiquidTabs>
        </nav>
      </main>
    </LiquidGlassProvider>
  )
}
