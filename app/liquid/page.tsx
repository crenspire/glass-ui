"use client"

import * as React from "react"
import { ChevronLeft, Search, Share, Bell, Moon, Heart, Plus, Home, LayoutGrid, Music, User } from "lucide-react"
import { useTheme } from "next-themes"
import { useLiquidBackdrop, useLiquidGlass } from "@/components/ui/liquid/liquid-glass-provider"
import {
  Button, ButtonGroup, Card, Input, InputGroup, Slider, Switch,
  Tabs, TabsList, TabsTrigger,
  Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription,
} from "@/components/ui/glass"
import { DialogClose } from "@/components/ui/dialog"

const TABS = [
  { value: "home", label: "Home", icon: Home },
  { value: "browse", label: "Browse", icon: LayoutGrid },
  { value: "library", label: "Library", icon: Music },
  { value: "profile", label: "Profile", icon: User },
]

export default function LiquidDemo() {
  const { resolvedTheme, setTheme } = useTheme()
  const [refraction, setRefraction] = React.useState([28])
  const [liquid, setLiquid] = React.useState(true)
  // resolvedTheme is unknown during SSR; wait for mount so the switch hydrates cleanly.
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  const options = React.useMemo(() => ({ refraction: refraction[0], liquid }), [refraction, liquid])
  useLiquidBackdrop("/page.jpg")
  const engine = useLiquidGlass()
  React.useEffect(() => {
    if (!engine) return
    engine.set(options)
    return () => engine.set({ refraction: 28, liquid: true })
  }, [engine, options])

  return (
    <div className="h-full overflow-y-auto p-4 text-foreground">
      <header className="flex items-center justify-between gap-4">
        <Button size="icon" className="size-[52px]" aria-label="Back"><ChevronLeft className="size-6" /></Button>
        <InputGroup className="h-[52px] w-[440px] max-w-full gap-2.5 px-5">
          <Search className="size-5 shrink-0 opacity-65" />
          <Input variant="default" placeholder="Search components" className="h-auto border-0 bg-transparent px-0 text-[17px] shadow-none dark:bg-transparent focus-visible:ring-0" />
        </InputGroup>
        <ButtonGroup className="h-[52px] items-center gap-1 px-1">
          <Button size="icon" className="size-12" aria-label="Share"><Share className="size-5" /></Button>
        </ButtonGroup>
      </header>

      <section className="mt-8 grid max-w-[820px] gap-8 md:grid-cols-2">
        <Card className="min-h-[300px] gap-0 p-7">
          <p className="font-mono text-xs uppercase tracking-widest opacity-65">Now playing</p>
          <h2 className="mt-2.5 text-[28px] font-semibold tracking-tight">Glass UI Sessions</h2>
          <p className="opacity-65">Crenspire · Vol. 2</p>
        </Card>

        <Card className="gap-6 p-7">
          <div className="flex items-baseline justify-between">
            <span className="font-semibold">Refraction</span>
            <span className="font-mono text-sm opacity-65">{refraction[0]}px</span>
          </div>
          <Slider value={refraction} onValueChange={setRefraction} min={0} max={60} />
          <div className="flex items-center justify-between">
            <span className="font-medium">Liquid motion</span>
            <Switch checked={liquid} onCheckedChange={setLiquid} />
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Dark appearance</span>
            <Switch checked={mounted && resolvedTheme === "dark"} onCheckedChange={(v) => setTheme(v ? "dark" : "light")} />
          </div>
          <div className="flex gap-5">
            {[Bell, Moon, Heart, Plus].map((Icon, i) => (
              <Button key={i} size="icon" material="clear" className="size-14"><Icon className="size-5" /></Button>
            ))}
          </div>
        </Card>
      </section>

      <div className="mt-8">
        <Dialog>
          <DialogTrigger asChild><Button size="lg">Show alert</Button></DialogTrigger>
          <DialogContent className="w-[min(360px,calc(100vw-32px))]">
            <DialogTitle className="text-xl font-semibold">Delete “Liquid Tab Bar”?</DialogTitle>
            <DialogDescription className="opacity-70">It will be removed from your registry.</DialogDescription>
            <div className="mt-4 flex gap-3">
              <DialogClose asChild><Button variant="secondary" className="flex-1">Cancel</Button></DialogClose>
              <DialogClose asChild><Button variant="secondary" className="flex-1 text-red-600 dark:text-red-400">Delete</Button></DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <nav className="mt-8">
        <Tabs defaultValue="home">
          <TabsList className="h-[60px] p-1.5">
            {TABS.map(({ value, label, icon: Icon }) => (
              <TabsTrigger key={value} value={value} className="h-full min-w-[96px] flex-col gap-0.5 px-4 text-[11px] font-semibold">
                <Icon className="size-[22px]" />{label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </nav>
    </div>
  )
}
