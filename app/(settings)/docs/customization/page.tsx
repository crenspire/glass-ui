"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/components/code-block"

const mcpCode = `{
  "mcpServers": {
    "crenspire-glass": {
      "command": "npx",
      "args": [
        "-y",
        "@shadcn/mcp-server",
        "--registry",
        "https://glass-ui.crenspire.com/r/registry.json"
      ]
    }
  }
}`


export default function CustomizationPage() {
  return (
    <>
      <Card className="gap-1 p-6">
        <h1 className="text-2xl font-semibold">Customization</h1>
        <p className="text-muted-foreground">Materials, tints and the CSS variables behind the liquid glass.</p>
      </Card>

      {/* On the wallpaper, so the shader glass shows how each material bends it. */}
      <section aria-label="Materials" className="flex flex-wrap items-center justify-center gap-4 py-8">
        <Button>Regular</Button>
        <Button material="clear">Clear</Button>
        <Button material="tinted">Tinted</Button>
        <Button material="tinted" tint="#f97316">Tinted orange</Button>
      </section>

        <Card className="text-foreground">
          <CardHeader>
            <CardTitle className="text-foreground">Customizing Glass Effects</CardTitle>
            <CardDescription className="text-muted-foreground">
              Override transparency, blur, and other glass properties globally or per-component
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Materials</h3>
              <p className="text-muted-foreground mb-4">
                Every glass component takes a <code className="bg-muted px-1 rounded">material</code> prop:{" "}
                <code className="bg-muted px-1 rounded">regular</code> (default, frosted),{" "}
                <code className="bg-muted px-1 rounded">clear</code> (barely frosted, most refraction) or{" "}
                <code className="bg-muted px-1 rounded">tinted</code> (washed with a colour, the primary colour by default).
              </p>
              <CodeBlock code={`<Button>Regular</Button>
<Button material="clear">Clear</Button>
<Button material="tinted" tint="#3b82f6">Tinted</Button>`} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Per-Component Customization</h3>
              <p className="text-muted-foreground mb-4">
                Override the tint colour and frost of a single component with the <code className="bg-muted px-1 rounded">glass</code> prop:
              </p>
              <CodeBlock code={`import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function CustomGlassCard() {
  return (
    <Card glass={{ tint: "rgba(139, 92, 246, 0.6)", frost: 0.5 }}>
      <CardHeader>
        <CardTitle>Custom Glass Card</CardTitle>
      </CardHeader>
      <CardContent>
        This card has a violet tint and lighter frost.
      </CardContent>
    </Card>
  )
}`} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Global CSS Variables</h3>
              <p className="text-muted-foreground mb-4">
                The CSS look comes from the <code className="bg-muted px-1 rounded">.lg</code> layer in globals.css. Override its
                variables to restyle every component at once:
              </p>
              <CodeBlock code={`:root {
  --lg-rim-hi: rgba(255, 255, 255, 0.8);   /* bright edge of the rim */
  --lg-rim-lo: rgba(255, 255, 255, 0.18);  /* dim edge of the rim */
  --lg-highlight: rgba(255, 255, 255, 0.6); /* inner top highlight */
  --lg-drop: rgba(15, 23, 42, 0.14);       /* drop shadow */
}

/* Per material: wash colour, blur and saturation */
.lg-regular { --lg-base: rgba(255, 255, 255, 0.42); --lg-blur: 16px; --lg-sat: 180%; }
.dark .lg-regular { --lg-base: rgba(255, 255, 255, 0.07); }`} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Real Refraction with WebGL</h3>
              <p className="text-muted-foreground mb-4">
                Wrap your app in <code className="bg-muted px-1 rounded">LiquidGlassProvider</code> and components that rest
                on the backdrop are drawn by a WebGL shader with real refraction, chromatic dispersion and a light-tracking rim.
                Popovers, menus, dialogs and anything over other content keep the CSS look, and so does everything when WebGL
                is unavailable or the user prefers reduced transparency.
              </p>
              <CodeBlock code={`import { LiquidGlassProvider } from "@/components/ui/liquid/liquid-glass-provider"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LiquidGlassProvider backdrop="/wallpaper.jpg">{children}</LiquidGlassProvider>
}`} />
            </div>
          </CardContent>
        </Card>
    </>
  )
}
