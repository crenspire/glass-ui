"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useWallpaper } from "@/components/wallpaper"
import { cn } from "@/lib/utils"
import { generateThemeCSS, defaultTheme, type ThemeColors } from "@/lib/theme-generator"

const presetThemes = [
  {
    name: "Default",
    colors: defaultTheme,
    darkColors: {
      primary: "oklch(0.5 0.2 260)",
      primaryForeground: "oklch(0.9 0.02 260)",
      background: "oklch(0.1 0.1 280)",
      foreground: "oklch(0.9 0.02 260)",
      card: "oklch(0.1 0.1 280)",
      cardForeground: "oklch(0.9 0.02 260)",
    },
  },
  {
    name: "Apple Glass",
    colors: {
      ...defaultTheme,
      primary: "oklch(0.25 0.15 250)",
      primaryForeground: "oklch(1 0 0)",
      background: "oklch(1 0 0)",
      foreground: "oklch(1 0 0)",
    },
  },
]

export default function ThemesPage() {
  const [selectedTheme, setSelectedTheme] = React.useState(presetThemes[0])
  const { resolvedTheme, setTheme } = useTheme()
  const { preset, presets, setPreset } = useWallpaper()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  const [customColors, setCustomColors] = React.useState<ThemeColors>(defaultTheme)
  const [copied, setCopied] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<"presets" | "custom">("presets")

  const currentCSS = React.useMemo(() => {
    if (activeTab === "presets") {
      return generateThemeCSS(selectedTheme.colors, selectedTheme.darkColors)
    }
    return generateThemeCSS(customColors)
  }, [selectedTheme, customColors, activeTab])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentCSS)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const updateColor = (key: keyof ThemeColors, value: string) => {
    setCustomColors((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <>
      <Card className="gap-4 p-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Appearance</h1>
          <p className="text-muted-foreground">Light or dark, and the wallpaper the glass refracts.</p>
        </div>
        <div className="flex gap-2">
          <Button material={mounted && resolvedTheme === "light" ? "tinted" : "regular"} onClick={() => setTheme("light")}><Sun className="size-4" />Light</Button>
          <Button material={mounted && resolvedTheme === "dark" ? "tinted" : "regular"} onClick={() => setTheme("dark")}><Moon className="size-4" />Dark</Button>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {presets.map(p => (
            <button key={p.id} type="button" onClick={() => setPreset(p.id)} aria-pressed={p.id === preset.id}
              className={cn("flex flex-col gap-2 rounded-2xl p-1.5 text-left text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring", p.id === preset.id && "ring-2 ring-primary")}>
              <span className="h-20 rounded-xl" style={{ background: `linear-gradient(135deg, ${p.dark.base[0]}, ${p.dark.shapes[0]} 45%, ${p.dark.shapes[2]})` }} />
              {p.name}
            </button>
          ))}
        </div>
      </Card>

      <Card className="gap-4 p-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Colour themes</h2>
          <p className="text-muted-foreground">Hand-picked themes that you can copy and paste into your apps.</p>
        </div>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "presets" | "custom")} className="space-y-8">
          <TabsList className="mb-8">
            <TabsTrigger value="presets">Presets</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>

          <TabsContent value="presets" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {presetThemes.map((theme) => (
                <Card
                  key={theme.name}
                  className={`cursor-pointer transition-opacity hover:opacity-90 ${
                    selectedTheme.name === theme.name ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedTheme(theme)}
                >
                  <CardHeader>
                    <CardTitle className="text-foreground">{theme.name}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Click to select this theme
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <div
                        className="w-8 h-8 rounded border border-border"
                        style={{ backgroundColor: theme.colors.primary }}
                      />
                      <div
                        className="w-8 h-8 rounded border border-border"
                        style={{ backgroundColor: theme.colors.background }}
                      />
                      <div
                        className="w-8 h-8 rounded border border-border"
                        style={{ backgroundColor: theme.colors.accent }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="custom" className="space-y-8">
            <Card className="text-foreground">
              <CardHeader>
                <CardTitle className="text-foreground">Customize Colors</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Adjust colors to create your own theme
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Theme Colors</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.keys(customColors).map((key) => {
                      if (key === "radius" || key.startsWith("glass") || key.startsWith("blur") || key.startsWith("dark")) return null
                      return (
                        <div key={key} className="space-y-2">
                          <Label className="text-foreground capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </Label>
                          <div className="flex gap-2">
                            <input
                              type="color"
                              value={customColors[key as keyof ThemeColors] || "#000000"}
                              onChange={(e) => updateColor(key as keyof ThemeColors, e.target.value)}
                              className="h-10 w-20 cursor-pointer rounded border border-border"
                            />
                            <Input
                              type="text"
                              value={customColors[key as keyof ThemeColors] || ""}
                              onChange={(e) => updateColor(key as keyof ThemeColors, e.target.value)}
                              className="flex-1 text-foreground"
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Liquid Glass (Light Mode)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {["glassWash", "glassBlur", "glassRimHi", "glassRimLo", "glassHighlight", "glassDrop"].map((key) => (
                      <div key={key} className="space-y-2">
                        <Label className="text-foreground capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </Label>
                        <Input
                          type="text"
                          value={customColors[key as keyof ThemeColors] || ""}
                          onChange={(e) => updateColor(key as keyof ThemeColors, e.target.value)}
                          placeholder={key === "glassBlur" ? "e.g., 16px" : "e.g., rgba(255, 255, 255, 0.4)"}
                          className="text-foreground"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Liquid Glass (Dark Mode)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {["darkGlassWash", "darkGlassRimHi", "darkGlassRimLo", "darkGlassHighlight", "darkGlassDrop"].map((key) => (
                      <div key={key} className="space-y-2">
                        <Label className="text-foreground capitalize">
                          {key.replace(/([A-Z])/g, " $1").replace("dark ", "").trim()}
                        </Label>
                        <Input
                          type="text"
                          value={customColors[key as keyof ThemeColors] || ""}
                          onChange={(e) => updateColor(key as keyof ThemeColors, e.target.value)}
                          placeholder="e.g., rgba(255, 255, 255, 0.07)"
                          className="text-foreground"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <Card className="text-foreground">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground">CSS Code</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Copy and paste this into your CSS file
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  onClick={copyToClipboard}
                >
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="overflow-x-auto rounded-2xl bg-black/40 p-4 font-mono text-sm text-white/90">
                <code className="whitespace-pre">
                  {currentCSS}
                </code>
              </pre>
            </CardContent>
          </Card>
        </Tabs>
      </Card>
    </>
  )
}

