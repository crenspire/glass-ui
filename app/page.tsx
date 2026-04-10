"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/glass/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/glass/card"
import { Badge } from "@/components/ui/glass/badge"
import { Input } from "@/components/ui/glass/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/glass/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/glass/sonner"
import {
  ArrowRight,
  Check,
  Copy,
  Layers,
  Paintbrush,
  Shield,
  Zap,
  Bell,
  Search,
  Send,
  Bot,
  Settings,
  User,
  CreditCard,
  TrendingUp,
  BarChart3,
  MessageSquare,
} from "lucide-react"

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
      className="text-foreground/40 hover:text-foreground/80 transition-colors"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </button>
  )
}

export default function Home() {
  const [sliderValue, setSliderValue] = React.useState([65])

  const installCmd = "npx shadcn@latest add https://glass-ui.crenspire.com/r/button.json"

  return (
    <div className="min-h-screen relative">
      <Toaster />
      <div className="relative z-10">

        {/* ── Hero ────────────────────────────────────── */}
        <section className="container mx-auto px-4 pt-20 pb-24 md:pt-32 md:pb-36">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="glass" className="mb-6 px-4 py-1.5 text-xs tracking-wide">
              50+ Liquid Glass Components
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
              Beautiful interfaces,{" "}
              <span className="text-foreground/60">built with liquid glass.</span>
            </h1>

            <p className="text-lg text-foreground/50 max-w-xl mx-auto mb-10 leading-relaxed">
              A component library inspired by Apple&apos;s design language.
              Drop-in replacements for shadcn/ui with blur, depth, and translucency baked in.
            </p>

            <div className="flex items-center justify-center gap-3 mb-12">
              <Button asChild size="lg" variant="glass" effect="glow">
                <Link href="/docs/getting-started">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/components">
                  Components
                </Link>
              </Button>
            </div>

            {/* Install command */}
            <div className="glass-bg max-w-xl mx-auto flex items-center justify-between gap-3 px-5 py-3 font-mono text-sm">
              <code className="text-foreground/70 truncate">{installCmd}</code>
              <CopyButton text={installCmd} />
            </div>
          </div>
        </section>

        {/* ── Component Showcase ──────────────────────── */}
        <section className="container mx-auto px-4 pb-24">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
              Components that speak for themselves
            </h2>
            <p className="text-foreground/40 max-w-lg mx-auto">
              Real UI patterns built entirely with Liquid Glass components.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">

            {/* Card 1 — Settings */}
            <Card variant="glass">
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Settings</CardTitle>
                <CardDescription className="text-xs">Preferences & controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Notifications</Label>
                  <Switch variant="glass" defaultChecked />
                </div>
                <Separator className="opacity-20" />
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Dark Mode</Label>
                  <Switch variant="glass" defaultChecked />
                </div>
                <Separator className="opacity-20" />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Volume</Label>
                    <span className="text-xs text-foreground/40">{sliderValue[0]}%</span>
                  </div>
                  <Slider
                    variant="glass"
                    value={sliderValue}
                    onValueChange={setSliderValue}
                    max={100}
                    step={1}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Card 2 — Chat */}
            <Card variant="glass">
              <CardHeader className="pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <Bot className="h-4 w-4 text-foreground/50" />
                  Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="h-7 w-7 rounded-full glass-bg flex items-center justify-center shrink-0">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                  <div className="glass-bg rounded-lg rounded-tl-none px-3 py-2">
                    <p className="text-sm text-foreground/80">How can I help you today?</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 justify-end">
                  <div className="glass-bg rounded-lg rounded-tr-none px-3 py-2">
                    <p className="text-sm text-foreground/80">Show me the button docs</p>
                  </div>
                  <Avatar className="h-7 w-7">
                    <AvatarImage src="https://github.com/akshaypjoshi.png" />
                    <AvatarFallback className="text-xs">AJ</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex gap-2 pt-1">
                  <Input variant="glass" placeholder="Type a message..." className="flex-1" />
                  <Button variant="glass" size="icon" className="shrink-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Card 3 — User Profile */}
            <Card variant="glass">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-16 w-16 mb-3">
                    <AvatarImage src="https://github.com/akshaypjoshi.png" />
                    <AvatarFallback>AJ</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-foreground">Akshay Joshi</h3>
                  <p className="text-xs text-foreground/40 mb-4">Product Designer</p>
                  <div className="flex gap-6 mb-5">
                    <div className="text-center">
                      <div className="font-semibold text-foreground">128</div>
                      <div className="text-[11px] text-foreground/40">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-foreground">4.2k</div>
                      <div className="text-[11px] text-foreground/40">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-foreground">312</div>
                      <div className="text-[11px] text-foreground/40">Following</div>
                    </div>
                  </div>
                  <Button variant="glass" className="w-full" size="sm">
                    <User className="mr-2 h-3.5 w-3.5" />
                    Follow
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Card 4 — Metrics */}
            <Card variant="glass">
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Overview</CardTitle>
                <CardDescription className="text-xs">Key metrics at a glance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "Revenue", value: "$45,231", change: "+20.1%", icon: TrendingUp },
                  { label: "Users", value: "2,350", change: "+12.5%", icon: User },
                  { label: "Conversion", value: "3.2%", change: "+4.1%", icon: BarChart3 },
                ].map((item) => (
                  <div key={item.label} className="glass-bg rounded-lg px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 text-foreground/40" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.value}</p>
                        <p className="text-[11px] text-foreground/40">{item.label}</p>
                      </div>
                    </div>
                    <Badge variant="glass" className="text-[11px] text-emerald-400">
                      {item.change}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Card 5 — Payment */}
            <Card variant="glass">
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Payment</CardTitle>
                <CardDescription className="text-xs">Saved cards</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="glass-bg rounded-lg p-4">
                  <div className="flex items-center justify-between mb-6">
                    <CreditCard className="h-5 w-5 text-foreground/50" />
                    <Badge variant="glass" className="text-[11px]">Primary</Badge>
                  </div>
                  <p className="text-sm font-mono tracking-widest text-foreground/70 mb-1">
                    •••• •••• •••• 4242
                  </p>
                  <p className="text-[11px] text-foreground/30">Expires 12/26</p>
                </div>
                <Button variant="outline" className="w-full" size="sm">
                  <CreditCard className="mr-2 h-3.5 w-3.5" />
                  Add Card
                </Button>
              </CardContent>
            </Card>

            {/* Card 6 — Sign In */}
            <Card variant="glass">
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Sign In</CardTitle>
                <CardDescription className="text-xs">Welcome back</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input variant="glass" placeholder="Email" type="email" />
                <Input variant="glass" placeholder="Password" type="password" />
                <div className="flex items-center justify-between text-xs text-foreground/40">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    Remember me
                  </label>
                  <button className="hover:text-foreground/60 transition-colors">Forgot?</button>
                </div>
                <Button variant="glass" className="w-full" effect="glow">
                  Sign In
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ── Variants ───────────────────────────────── */}
        <section className="container mx-auto px-4 pb-24">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
                Four distinct glass variants
              </h2>
              <p className="text-foreground/40">
                Every component ships with Glass, Frosted, Fluted, and Crystal styles.
              </p>
            </div>
            <Tabs defaultValue="glass">
              <TabsList variant="glass" className="w-full grid grid-cols-4 mb-6">
                <TabsTrigger value="glass">Glass</TabsTrigger>
                <TabsTrigger value="frosted">Frosted</TabsTrigger>
                <TabsTrigger value="fluted">Fluted</TabsTrigger>
                <TabsTrigger value="crystal">Crystal</TabsTrigger>
              </TabsList>
              {[
                { key: "glass", title: "Glass", desc: "Translucent material with backdrop blur. The default for all components." },
                { key: "frosted", title: "Frosted", desc: "Heavier blur and slightly more fill. Ideal for prominent surfaces like dialogs and sheets." },
                { key: "fluted", title: "Fluted", desc: "Ribbed texture overlaid on glass. Adds tactile visual interest to panels and sidebars." },
                { key: "crystal", title: "Crystal", desc: "Minimal fill, maximum clarity. Best for overlays where content visibility matters." },
              ].map((v) => (
                <TabsContent key={v.key} value={v.key}>
                  <Card variant={v.key as "glass" | "frosted" | "fluted" | "crystal"}>
                    <CardHeader>
                      <CardTitle>{v.title}</CardTitle>
                      <CardDescription>{v.desc}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-3">
                      <Button variant={v.key as "glass" | "frosted" | "fluted" | "crystal"} size="sm">Button</Button>
                      <Badge variant={v.key as "glass" | "frosted" | "fluted" | "crystal"}>Badge</Badge>
                      <Input variant={v.key as "glass" | "frosted" | "fluted" | "crystal"} placeholder="Input" className="max-w-[180px]" />
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* ── Interactive ─────────────────────────────── */}
        <section className="container mx-auto px-4 pb-24">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
                Try it live
              </h2>
              <p className="text-foreground/40">
                Click to experience liquid glass in action.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="glass-bg p-6 text-center group cursor-pointer">
                    <MessageSquare className="h-6 w-6 mx-auto mb-3 text-foreground/50 group-hover:text-foreground/80 transition-colors" />
                    <p className="text-sm font-medium text-foreground">Open Dialog</p>
                    <p className="text-[11px] text-foreground/40 mt-1">Glass modal</p>
                  </button>
                </DialogTrigger>
                <DialogContent variant="glass" className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Liquid Glass Dialog</DialogTitle>
                    <DialogDescription>
                      Fully translucent with backdrop blur. Notice how the background shows through.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3 pt-2">
                    <Input variant="glass" placeholder="Your name" />
                    <Select>
                      <SelectTrigger variant="glass">
                        <SelectValue placeholder="Pick a variant" />
                      </SelectTrigger>
                      <SelectContent variant="glass">
                        <SelectItem value="glass">Glass</SelectItem>
                        <SelectItem value="frosted">Frosted</SelectItem>
                        <SelectItem value="crystal">Crystal</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex gap-2 justify-end pt-2">
                      <Button variant="outline" size="sm">Cancel</Button>
                      <Button variant="glass" size="sm" effect="glow">Confirm</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <button
                className="glass-bg p-6 text-center group cursor-pointer"
                onClick={() => toast.success("Saved successfully", { description: "Your changes are live." })}
              >
                <Bell className="h-6 w-6 mx-auto mb-3 text-foreground/50 group-hover:text-foreground/80 transition-colors" />
                <p className="text-sm font-medium text-foreground">Toast</p>
                <p className="text-[11px] text-foreground/40 mt-1">Glass notification</p>
              </button>

              <button
                className="glass-bg p-6 text-center group cursor-pointer"
                onClick={() =>
                  toast("New update available", {
                    description: "Liquid Glass v2.0 is here.",
                    action: { label: "Update", onClick: () => {} },
                  })
                }
              >
                <Search className="h-6 w-6 mx-auto mb-3 text-foreground/50 group-hover:text-foreground/80 transition-colors" />
                <p className="text-sm font-medium text-foreground">Action Toast</p>
                <p className="text-[11px] text-foreground/40 mt-1">With button</p>
              </button>
            </div>
          </div>
        </section>

        {/* ── Features ───────────────────────────────── */}
        <section className="container mx-auto px-4 pb-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
                Why Liquid Glass?
              </h2>
              <p className="text-foreground/40">
                Everything you need to ship polished interfaces.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  icon: Layers,
                  title: "50+ Components",
                  desc: "Cards, dialogs, inputs, tables, charts — all with liquid glass baked in.",
                },
                {
                  icon: Paintbrush,
                  title: "4 Variants",
                  desc: "Glass, Frosted, Fluted, Crystal. Pick the one that fits your surface.",
                },
                {
                  icon: Settings,
                  title: "Fully Customizable",
                  desc: "Override blur, tint, border, and shadow per component via props or CSS.",
                },
                {
                  icon: Shield,
                  title: "Accessible",
                  desc: "Built on Radix UI primitives. Keyboard nav, screen readers, focus management.",
                },
              ].map((f) => (
                <div key={f.title} className="glass-bg p-6">
                  <f.icon className="h-5 w-5 text-foreground/50 mb-4" />
                  <h3 className="text-sm font-semibold text-foreground mb-1.5">{f.title}</h3>
                  <p className="text-xs text-foreground/40 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────── */}
        <section className="container mx-auto px-4 pb-24">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Start building today.
            </h2>
            <p className="text-foreground/40 mb-8 max-w-md mx-auto">
              Install a single component or the full library. Works with any Next.js + shadcn/ui project.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Button asChild size="lg" variant="glass" effect="glow">
                <Link href="/docs/getting-started">
                  Read the Docs
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="https://github.com/crenspire/glass-ui" target="_blank">
                  GitHub
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
