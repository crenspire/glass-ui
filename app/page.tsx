"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/glass/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/glass/card"
import { Badge } from "@/components/ui/glass/badge"
import { Input } from "@/components/ui/glass/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/glass/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/glass/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/glass/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/glass/sonner"
import {
  ArrowRight,
  Copy,
  Check,
  Bot,
  Send,
  Mail,
  Lock,
  User,
  CreditCard,
  Settings,
  TrendingUp,
  DollarSign,
  Zap,
  Sparkles,
  Palette,
  Layers,
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
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText("npx shadcn@latest add https://glass-ui.com/r/styles/glass")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen relative">
      <Toaster />
      <div className="relative z-10">

        {/* ───────────────────── Hero ───────────────────── */}
        <section className="container mx-auto px-4 pt-24 pb-32 md:pt-32 md:pb-40">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="glass" className="mb-8 px-4 py-1.5 text-sm">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              50+ Liquid Glass Components
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.08]">
              <span className="text-foreground">Beautiful interfaces,</span>
              <br />
              <span className="text-foreground/35">built with liquid glass.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              A component library inspired by Apple&apos;s design language. Drop-in
              replacements for shadcn/ui with blur, depth, and translucency baked&nbsp;in.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap mb-12">
              <Button asChild size="lg" variant="glass" effect="glow">
                <Link href="/docs/getting-started">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" effect="lift">
                <Link href="/components">
                  Components
                </Link>
              </Button>
            </div>

            <div
              className="glass-bg max-w-xl mx-auto flex items-center justify-between gap-3 px-5 py-3 font-mono text-sm rounded-xl"
              onClick={handleCopy}
            >
              <code className="text-foreground/70 truncate select-all">pnpm dlx shadcn@latest add @glass-ui/button</code>
              {copied ? (
                <Check className="h-4 w-4 text-green-500 shrink-0" />
              ) : (
                <Copy className="h-4 w-4 shrink-0 text-muted-foreground hover:text-foreground transition-colors" />
              )}
            </div>
          </div>
        </section>

        {/* ───────────────── Component Showcase ───────────────── */}
        <section className="container mx-auto px-4 pb-32">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
              Components that speak for themselves
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Real UI patterns built entirely with Liquid Glass components.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Settings */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </CardTitle>
                <CardDescription>Appearance preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm">Dark Mode</Label>
                    <p className="text-xs text-muted-foreground">Use dark theme</p>
                  </div>
                  <Switch variant="glass" />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label className="text-sm">Volume</Label>
                  <Slider variant="glass" defaultValue={[65]} max={100} step={1} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm">Notifications</Label>
                    <p className="text-xs text-muted-foreground">Push alerts</p>
                  </div>
                  <Switch variant="glass" defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Chat */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bot className="h-4 w-4" />
                  AI Chat
                </CardTitle>
                <CardDescription>Conversational interface</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="bg-purple-500/20 text-purple-600 dark:text-purple-400 text-xs">
                        <Bot className="h-3.5 w-3.5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="glass-bg rounded-lg px-3 py-2">
                      <p className="text-sm">How can I help you today?</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 justify-end">
                    <div className="glass-bg rounded-lg px-3 py-2 max-w-[80%]">
                      <p className="text-sm">Show me the glass variants.</p>
                    </div>
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="text-xs">U</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input variant="glass" placeholder="Type a message..." className="flex-1 min-w-0" />
                  <Button variant="glass" size="icon" effect="glow" className="shrink-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Profile */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </CardTitle>
                <CardDescription>User information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://github.com/akshaypjoshi.png" />
                    <AvatarFallback>AJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-sm text-foreground">Akshay Joshi</div>
                    <div className="text-xs text-muted-foreground">Developer</div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant="glass" className="bg-green-500/20 text-green-600 dark:text-green-400">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Role</span>
                    <span className="font-medium text-foreground">Admin</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full" size="sm">View Profile</Button>
              </CardContent>
            </Card>

            {/* Metrics */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Metrics
                </CardTitle>
                <CardDescription>Key performance data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="glass-bg rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Revenue</span>
                    <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">$45,231</div>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    +20.1% from last month
                  </p>
                </div>
                <div className="glass-bg rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Users</span>
                    <User className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">2,350</div>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    +12.5% from last month
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Payment */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Payment
                </CardTitle>
                <CardDescription>Saved payment method</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="glass-bg rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <Badge variant="glass">Primary</Badge>
                  </div>
                  <p className="text-sm font-mono tracking-wider text-foreground">**** **** **** 4242</p>
                  <p className="text-xs text-muted-foreground mt-1">Expires 12/27</p>
                </div>
                <Button variant="outline" className="w-full" size="sm">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Add New Card
                </Button>
              </CardContent>
            </Card>

            {/* Sign In */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Sign In
                </CardTitle>
                <CardDescription>Authentication form</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  variant="glass"
                  placeholder="Email address"
                  icon={<Mail className="h-4 w-4 text-muted-foreground" />}
                />
                <Input
                  variant="glass"
                  type="password"
                  placeholder="Password"
                  icon={<Lock className="h-4 w-4 text-muted-foreground" />}
                />
                <Button variant="glass" className="w-full" effect="glow">
                  Sign In
                </Button>
              </CardContent>
            </Card>

          </div>
        </section>

        {/* ───────────────── Variants ───────────────── */}
        <section className="container mx-auto px-4 pb-32">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
              Four distinct glass variants
            </h2>
            <p className="text-muted-foreground">
              Every component ships with Glass, Frosted, Fluted, and Crystal styles.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Tabs defaultValue="glass">
              <TabsList variant="glass" className="mb-6 w-full grid grid-cols-4">
                <TabsTrigger value="glass">Glass</TabsTrigger>
                <TabsTrigger value="frosted">Frosted</TabsTrigger>
                <TabsTrigger value="fluted">Fluted</TabsTrigger>
                <TabsTrigger value="crystal">Crystal</TabsTrigger>
              </TabsList>

              {(["glass", "frosted", "fluted", "crystal"] as const).map((v) => (
                <TabsContent key={v} value={v}>
                  <Card variant={v}>
                    <CardHeader>
                      <CardTitle className="capitalize">{v} Variant</CardTitle>
                      <CardDescription>See how every primitive adapts to the {v} style.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant={v}>Badge</Badge>
                        <Badge variant={v}>Status</Badge>
                        <Badge variant={v}>Tag</Badge>
                      </div>
                      <Input variant={v} placeholder={`${v} input...`} />
                      <div className="flex gap-3">
                        <Button variant={v} effect="glow" className="flex-1">Primary</Button>
                        <Button variant="outline" className="flex-1">Secondary</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* ───────────────── Interactive ───────────────── */}
        <section className="container mx-auto px-4 pb-32">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
              Try it live
            </h2>
            <p className="text-muted-foreground">
              Click to experience liquid glass in action.
            </p>
          </div>
        </section>

          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <button className="glass-bg rounded-lg py-6 px-4 text-center transition-transform hover:scale-[1.02] active:scale-[0.98]">
                  <div className="font-semibold text-foreground">Open Dialog</div>
                  <div className="text-xs text-muted-foreground mt-1">Glass modal overlay</div>
                </button>
              </DialogTrigger>
              <DialogContent variant="frosted" className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Glass Dialog</DialogTitle>
                  <DialogDescription>
                    A frosted glass modal with form controls inside.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Input variant="glass" placeholder="Your name" />
                  <Select>
                    <SelectTrigger variant="glass">
                      <SelectValue placeholder="Pick an option" />
                    </SelectTrigger>
                    <SelectContent variant="glass">
                      <SelectItem value="a">Option A</SelectItem>
                      <SelectItem value="b">Option B</SelectItem>
                      <SelectItem value="c">Option C</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline">Cancel</Button>
                    <Button variant="glass" effect="glow">Confirm</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <button
              className="glass-bg rounded-lg py-6 px-4 text-center transition-transform hover:scale-[1.02] active:scale-[0.98]"
              onClick={() =>
                toast.success("Success!", {
                  description: "This is a glass toast notification.",
                })
              }
            >
              <div className="font-semibold text-foreground">Show Toast</div>
              <div className="text-xs text-muted-foreground mt-1">Success notification</div>
            </button>

            <button
              className="glass-bg rounded-lg py-6 px-4 text-center transition-transform hover:scale-[1.02] active:scale-[0.98]"
              onClick={() =>
                toast("New update available", {
                  description: "Glass UI v2.0 includes 10 new components.",
                  action: {
                    label: "View",
                    onClick: () => window.open("/docs/getting-started", "_blank"),
                  },
                })
              }
            >
              <div className="font-semibold text-foreground">Action Toast</div>
              <div className="text-xs text-muted-foreground mt-1">Toast with button</div>
            </button>
          </div>
        </section>

        {/* ───────────────── Features ───────────────── */}
        <section className="container mx-auto px-4 pb-32">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
              Why Liquid Glass?
            </h2>
            <p className="text-muted-foreground">
              Everything you need to ship polished interfaces.
            </p>
          </div>
        </section>

          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Zap,
                title: "40+ Components",
                desc: "Buttons, cards, dialogs, selects, tabs, and more — all glass-ready out of the box.",
              },
              {
                icon: Palette,
                title: "4 Variants",
                desc: "Glass, Frosted, Fluted, and Crystal. Each component adapts to every variant automatically.",
              },
              {
                icon: Layers,
                title: "Fully Customizable",
                desc: "Tweak blur, transparency, color, and glow per component via simple props or CSS variables.",
              },
              {
                icon: Sparkles,
                title: "Accessible",
                desc: "Built on Radix UI primitives with full keyboard navigation and screen reader support.",
              },
            ].map((f) => (
              <div key={f.title} className="glass-bg rounded-xl p-6 text-center">
                <div className="glass-bg w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <f.icon className="h-6 w-6 text-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────────── CTA ───────────────── */}
        <section className="container mx-auto px-4 pb-32">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Start building today.
            </h2>
            <p className="text-muted-foreground mb-10 max-w-md mx-auto">
              Install a single component or the full library.
              Works with any Next.js + shadcn/ui project.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button asChild size="lg" variant="glass" effect="glow">
                <Link href="/docs/getting-started">
                  Read the Docs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" effect="lift">
                <Link href="/components">
                  Browse Components
                </Link>
              </Button>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
