"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check } from "lucide-react"
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
    <div className="min-h-screen relative">
      <div className="container mx-auto px-4 pt-8 pb-20 relative z-10">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <Palette className="h-7 w-7 text-foreground" />
            <h1 className="text-4xl font-bold text-foreground">Themes</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Hand-picked themes that you can copy and paste into your apps.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "presets" | "custom")} className="space-y-8">
          <TabsList variant="glass" className="mb-8">
            <TabsTrigger value="presets">Presets</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>

          <TabsContent value="presets" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {presetThemes.map((theme) => (
                <div
                  key={theme.name}
                  variant="glass"
                  className={`cursor-pointer transition-opacity hover:opacity-90 ${
                    selectedTheme.name === theme.name ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedTheme(theme)}
                >
                  <h3 className="text-lg font-semibold text-foreground mb-1">{theme.name}</h3>
                  <p className="text-sm text-foreground/40 mb-4">Click to select this theme</p>
                  <div className="flex gap-2">
                    <div
                      className="w-8 h-8 rounded-md border border-white/10"
                      style={{ backgroundColor: theme.colors.primary }}
                    />
                    <div
                      className="w-8 h-8 rounded-md border border-white/10"
                      style={{ backgroundColor: theme.colors.background }}
                    />
                    <div
                      className="w-8 h-8 rounded-md border border-white/10"
                      style={{ backgroundColor: theme.colors.accent }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="custom" className="space-y-8">
            <div className="glass-bg p-6 space-y-8">
              <div>
                <h3 className="text-foreground font-semibold mb-1">Customize Colors</h3>
                <p className="text-sm text-foreground/40 mb-6">Adjust colors to create your own theme</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-foreground/50 mb-4">Theme Colors</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.keys(customColors).map((key) => {
                    if (key === "radius" || key.startsWith("glass") || key.startsWith("blur") || key.startsWith("dark")) return null
                    return (
                      <div key={key} className="space-y-2">
                        <Label className="text-foreground/50 capitalize text-sm">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </Label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={customColors[key as keyof ThemeColors] || "#000000"}
                            onChange={(e) => updateColor(key as keyof ThemeColors, e.target.value)}
                            className="h-10 w-20 cursor-pointer rounded-md border border-white/10 bg-transparent"
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
                <h4 className="text-sm font-medium text-foreground/50 mb-4">Glass Effect (Light Mode)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["glassBg", "glassBorder", "glassShadow", "glassShadowLg", "glassShadowSm", "blur", "blurSm", "blurLg"].map((key) => (
                    <div key={key} className="space-y-2">
                      <Label className="text-foreground/50 capitalize text-sm">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </Label>
                      <Input
                        type="text"
                        value={customColors[key as keyof ThemeColors] || ""}
                        onChange={(e) => updateColor(key as keyof ThemeColors, e.target.value)}
                        placeholder={key.includes("blur") ? "e.g., 30px" : key.includes("glassBg") ? "e.g., rgba(255, 255, 255, 0.25)" : key.includes("glassBorder") ? "e.g., rgba(255, 255, 255, 0.18)" : "e.g., 0 8px 32px rgba(0, 0, 0, 0.1)"}
                        className="text-foreground placeholder:text-foreground/20"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-foreground/50 mb-4">Glass Effect (Dark Mode)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["darkGlassBg", "darkGlassBorder", "darkGlassShadow", "darkGlassShadowLg", "darkGlassShadowSm"].map((key) => (
                    <div key={key} className="space-y-2">
                      <Label className="text-foreground/50 capitalize text-sm">
                        {key.replace(/([A-Z])/g, " $1").replace("dark ", "").trim()}
                      </Label>
                      <Input
                        type="text"
                        value={customColors[key as keyof ThemeColors] || ""}
                        onChange={(e) => updateColor(key as keyof ThemeColors, e.target.value)}
                        placeholder={key.includes("darkGlassBg") ? "e.g., rgba(255, 255, 255, 0.05)" : key.includes("darkGlassBorder") ? "e.g., rgba(255, 255, 255, 0.15)" : "e.g., 0 8px 32px rgba(0, 0, 0, 0.4)"}
                        className="text-foreground placeholder:text-foreground/20"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="glass-bg p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <code className="text-foreground whitespace-pre">
                  {currentCSS}
                </code>
              </pre>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </div>
  )
}
