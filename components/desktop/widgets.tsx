"use client"

import * as React from "react"
import Link from "next/link"
import { Wifi, Bluetooth, Moon, Sun, Volume2, SkipBack, SkipForward, Play, Pause, CloudSun, Send, Github, Heart } from "lucide-react"
import { Button, Card, Switch, Slider, Calendar, Input, Tabs, TabsList, TabsTrigger, Badge } from "@/components/ui/glass"
import { cn } from "@/lib/utils"
import { useDesktopMaterial } from "./material-context"

function Widget({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  const [material] = useDesktopMaterial()
  return (
    <Card material={material} className={cn("gap-3 p-4", className)}>
      <p className="text-xs font-semibold uppercase tracking-wider opacity-60">{title}</p>
      {children}
    </Card>
  )
}

export function ControlCenter() {
  const [wifi, setWifi] = React.useState(true)
  const [bt, setBt] = React.useState(true)
  const [focus, setFocus] = React.useState(false)
  const [brightness, setBrightness] = React.useState([70])
  const [volume, setVolume] = React.useState([45])
  const row = (icon: React.ReactNode, label: string, on: boolean, set: (v: boolean) => void) => (
    <div className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-2 text-sm font-medium">{icon}{label}</span>
      <Switch checked={on} onCheckedChange={set} aria-label={label} />
    </div>
  )
  return (
    <Widget title="Control Center">
      {row(<Wifi className="size-4" />, "Wi-Fi", wifi, setWifi)}
      {row(<Bluetooth className="size-4" />, "Bluetooth", bt, setBt)}
      {row(<Moon className="size-4" />, "Focus", focus, setFocus)}
      <div className="flex items-center gap-3"><Sun className="size-4 shrink-0 opacity-70" /><Slider value={brightness} onValueChange={setBrightness} aria-label="Brightness" /></div>
      <div className="flex items-center gap-3"><Volume2 className="size-4 shrink-0 opacity-70" /><Slider value={volume} onValueChange={setVolume} aria-label="Volume" /></div>
    </Widget>
  )
}

export function NowPlaying() {
  const [playing, setPlaying] = React.useState(true)
  const [pos, setPos] = React.useState([38])
  return (
    <Widget title="Now Playing">
      <div className="flex items-center gap-3">
        <div className="size-14 shrink-0 rounded-2xl bg-gradient-to-br from-fuchsia-500 via-orange-400 to-amber-300" />
        <div className="min-w-0"><p className="truncate font-semibold">Refraction</p><p className="truncate text-sm opacity-70">Glass UI Sessions</p></div>
      </div>
      <Slider value={pos} onValueChange={setPos} aria-label="Position" />
      <div className="flex items-center justify-center gap-3">
        <Button size="icon" material="clear" aria-label="Previous"><SkipBack className="size-4" /></Button>
        <Button size="icon" aria-label={playing ? "Pause" : "Play"} onClick={() => setPlaying(p => !p)}>{playing ? <Pause className="size-4" /> : <Play className="size-4" />}</Button>
        <Button size="icon" material="clear" aria-label="Next"><SkipForward className="size-4" /></Button>
      </div>
    </Widget>
  )
}

export function Weather() {
  const hours = [["Now", 21], ["13", 22], ["14", 23], ["15", 23], ["16", 22]] as const
  return (
    <Widget title="Weather">
      <div className="flex items-end justify-between">
        <div><p className="text-4xl font-light">21°</p><p className="text-sm opacity-70">Cupertino · Partly cloudy</p></div>
        <CloudSun className="size-10 opacity-80" />
      </div>
      <div className="flex justify-between text-center text-xs">
        {hours.map(([h, t]) => <div key={h}><p className="opacity-60">{h}</p><p className="font-semibold">{t}°</p></div>)}
      </div>
    </Widget>
  )
}

export function CalendarWidget() {
  // The page is prerendered at build time, so "today" is only known on the client.
  const [day, setDay] = React.useState<Date | undefined>()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => { setDay(new Date()); setMounted(true) }, [])
  return (
    <Widget title="Calendar" className="items-center">
      {mounted
        ? <Calendar mode="single" selected={day} onSelect={setDay} variant="default" className="p-0" />
        : <div aria-hidden className="h-[296px] w-[252px]" />}
    </Widget>
  )
}

export function Messages() {
  const [messages, setMessages] = React.useState([
    { me: false, text: "Did you try the new glass?" },
    { me: true, text: "It actually bends the wallpaper 🤯" },
  ])
  const [draft, setDraft] = React.useState("")
  const send = () => {
    if (!draft.trim()) return
    setMessages(m => [...m, { me: true, text: draft.trim() }])
    setDraft("")
  }
  return (
    <Widget title="Messages">
      <div className="flex flex-col gap-2">
        {messages.slice(-3).map((m, i) => (
          <p key={i} className={cn("max-w-[85%] rounded-2xl px-3 py-1.5 text-sm", m.me ? "self-end bg-primary text-primary-foreground" : "self-start bg-foreground/10")}>{m.text}</p>
        ))}
      </div>
      <form className="flex gap-2" onSubmit={e => { e.preventDefault(); send() }}>
        <Input value={draft} onChange={e => setDraft(e.target.value)} placeholder="iMessage" aria-label="Message" />
        <Button type="submit" size="icon" material="tinted" aria-label="Send"><Send className="size-4" /></Button>
      </form>
    </Widget>
  )
}

export function MaterialsWidget() {
  const [material, setMaterial] = useDesktopMaterial()
  return (
    <Widget title="Material">
      <Tabs value={material} onValueChange={v => setMaterial(v as typeof material)}>
        <TabsList className="w-full">
          <TabsTrigger value="regular" className="flex-1">Regular</TabsTrigger>
          <TabsTrigger value="clear" className="flex-1">Clear</TabsTrigger>
          <TabsTrigger value="tinted" className="flex-1">Tinted</TabsTrigger>
        </TabsList>
      </Tabs>
      <p className="text-sm opacity-70">Switches every widget on this desktop.</p>
    </Widget>
  )
}

export function About() {
  return (
    <Widget title="About">
      <p className="text-sm">50+ React components with real liquid glass — refraction, dispersion and a light-tracking rim.</p>
      <div className="flex flex-wrap gap-2">
        <Badge>shadcn registry</Badge><Badge>Radix</Badge><Badge>Tailwind v4</Badge>
      </div>
      <p className="text-xs opacity-75">
        Built by <a href="https://github.com/akshaypjoshi" target="_blank" rel="noreferrer" className="font-semibold underline-offset-4 hover:underline">Akshay Joshi</a>
        {" "}at <a href="https://crenspire.com" target="_blank" rel="noreferrer" className="font-semibold underline-offset-4 hover:underline">Crenspire Technologies</a>
      </p>
      <div className="flex flex-wrap gap-2">
        <Button asChild size="sm" material="clear"><a href="https://github.com/crenspire/glass-ui" target="_blank" rel="noreferrer"><Github className="size-4" />GitHub</a></Button>
        <Button asChild size="sm" material="clear"><a href="https://github.com/sponsors/akshaypjoshi" target="_blank" rel="noreferrer" aria-label="Sponsor akshaypjoshi"><Heart className="size-4 fill-current" />Sponsor</a></Button>
        <Button asChild size="sm" material="clear"><Link href="/docs/getting-started">Docs</Link></Button>
      </div>
    </Widget>
  )
}
