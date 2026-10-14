"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check } from "lucide-react"
import { InstallationInstructions } from "@/components/installation-instructions"
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


export default function GettingStartedPage() {
  return (
    <div className="text-foreground">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">Getting Started</h1>
        <p className="text-base sm:text-lg text-muted-foreground">
          Get up and running with Glass UI in minutes
        </p>
      </div>

      <div className="space-y-8">
        <Card className="text-foreground">
          <CardHeader>
            <CardTitle className="text-foreground">Installation</CardTitle>
            <CardDescription className="text-muted-foreground">
              Install Glass UI components using the shadcn CLI
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">1. Initialize your project</h3>
              <p className="text-muted-foreground mb-4">
                Make sure you have a Next.js project set up with Tailwind CSS configured.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">2. Install components</h3>
              <p className="text-muted-foreground mb-4">
                Use the shadcn CLI to add components from the Glass UI registry with your preferred package manager:
              </p>
              <InstallationInstructions componentName="button" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">3. Start building</h3>
              <p className="text-muted-foreground">
                Import and use components in your application. All components default to glass variants.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="text-foreground" id="mcp">
          <CardHeader>
            <CardTitle className="text-foreground">MCP (Model Context Protocol) Setup</CardTitle>
            <CardDescription className="text-muted-foreground">
              Configure MCP to use Glass UI components with AI assistants
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">What is MCP?</h3>
              <p className="text-muted-foreground mb-4">
                MCP allows AI assistants to access and use Glass UI components directly. 
                This enables seamless integration with tools like Claude, ChatGPT, and other MCP-compatible assistants.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Setup Instructions</h3>
              <p className="text-muted-foreground mb-4">
                Add the following configuration to your MCP settings file (usually <code className="bg-muted px-1 rounded">~/.config/mcp.json</code> or similar):
              </p>
              <CodeBlock code={mcpCode} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Usage</h3>
              <p className="text-muted-foreground">
                Once configured, you can ask your AI assistant to add Glass UI components to your project, 
                and it will automatically use the correct registry URL and component paths.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="text-foreground">
          <CardHeader>
            <CardTitle className="text-foreground">Basic Usage</CardTitle>
            <CardDescription className="text-muted-foreground">
              Example of using Glass UI components
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="example" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="example">Example</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
              <TabsContent value="example" className="space-y-4">
                <div className="space-y-2">
                  <Button>Glass Button</Button>
                  <Button variant="outline">Outline Button</Button>
                </div>
                <Card className="text-foreground">
                  <CardHeader>
                    <CardTitle className="text-foreground">Glass Card</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      This is a card with glass effect
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Card content goes here</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="code">
                <CodeBlock code={`import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Example() {
  return (
    <div>
      <Button>Glass Button</Button>
      <Card>
        <CardHeader>
          <CardTitle>Glass Card</CardTitle>
          <CardDescription>This is a card with glass effect</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card content goes here</p>
        </CardContent>
      </Card>
    </div>
  )
}`} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="text-foreground" id="glass-customization">
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
      </div>
    </div>
  )
}

