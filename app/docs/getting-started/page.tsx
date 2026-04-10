"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check } from "lucide-react"
import { InstallationInstructions } from "@/components/installation-instructions"

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

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <pre className="glass-bg p-4 overflow-x-auto text-sm">
        <code className="font-mono text-foreground/70">{code}</code>
      </pre>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-8 w-8 text-foreground/30 hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={copyToClipboard}
      >
        {copied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}

export default function GettingStartedPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Getting Started</h1>
        <p className="text-foreground/50">
          Get up and running with Glass UI in minutes.
        </p>
      </div>

      <div className="space-y-8">
        {/* Installation */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="text-foreground">Installation</CardTitle>
            <p className="text-sm text-foreground/40">
              Install Glass UI components using the shadcn CLI.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">1. Initialize your project</h3>
              <p className="text-foreground/50 text-sm">
                Make sure you have a Next.js project set up with Tailwind CSS configured.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">2. Install components</h3>
              <p className="text-foreground/50 text-sm mb-4">
                Use the shadcn CLI to add components from the Glass UI registry:
              </p>
              <InstallationInstructions componentName="button" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">3. Start building</h3>
              <p className="text-foreground/50 text-sm">
                Import and use components in your application. All components default to glass variants.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* MCP Setup */}
        <Card variant="glass" id="mcp">
          <CardHeader>
            <CardTitle className="text-foreground">MCP Setup</CardTitle>
            <p className="text-sm text-foreground/40">
              Configure MCP to use Glass UI components with AI assistants.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">What is MCP?</h3>
              <p className="text-foreground/50 text-sm">
                MCP allows AI assistants to access and use Glass UI components directly.
                This enables seamless integration with tools like Claude, ChatGPT, and other MCP-compatible assistants.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Configuration</h3>
              <p className="text-foreground/50 text-sm mb-4">
                Add the following to your MCP settings file
                (usually <code className="glass-bg px-1.5 py-0.5 text-foreground/70 text-xs font-mono">~/.config/mcp.json</code>):
              </p>
              <CodeBlock code={mcpCode} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Usage</h3>
              <p className="text-foreground/50 text-sm">
                Once configured, ask your AI assistant to add Glass UI components to your project.
                It will automatically use the correct registry URL and component paths.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Basic Usage */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="text-foreground">Basic Usage</CardTitle>
            <p className="text-sm text-foreground/40">
              Example of using Glass UI components.
            </p>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="example" className="w-full">
              <TabsList variant="glass" className="mb-4">
                <TabsTrigger value="example">Example</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
              <TabsContent value="example" className="space-y-4">
                <div className="flex gap-3">
                  <Button variant="glass">Glass Button</Button>
                  <Button variant="outline">Outline Button</Button>
                </div>
                <Card variant="glass">
                  <CardHeader>
                    <CardTitle className="text-foreground text-base">Glass Card</CardTitle>
                    <p className="text-sm text-foreground/40">This is a card with glass effect</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/50 text-sm">Card content goes here</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="code">
                <CodeBlock code={`import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Example() {
  return (
    <div>
      <Button variant="glass">Glass Button</Button>
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Glass Card</CardTitle>
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

        {/* Customizing Glass Effects */}
        <Card variant="glass" id="glass-customization">
          <CardHeader>
            <CardTitle className="text-foreground">Customizing Glass Effects</CardTitle>
            <p className="text-sm text-foreground/40">
              Override transparency, blur, and other glass properties globally or per-component.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Global CSS Variables</h3>
              <p className="text-foreground/50 text-sm mb-4">
                All Glass UI components use CSS variables for glass effects. Override these
                in your global CSS to change the appearance of all components at once.
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-foreground/70 mb-2">Light Mode</h4>
                  <CodeBlock code={`:root {
  --glass-bg: rgba(255, 255, 255, 0.25);
  --glass-border: rgba(255, 255, 255, 0.18);
  --blur: 30px;
  --blur-sm: 15px;
  --blur-lg: 50px;
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06);
  --glass-shadow-lg: 0 12px 48px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1);
  --glass-shadow-sm: 0 4px 16px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04);
}`} />
                </div>

                <div>
                  <h4 className="text-sm font-medium text-foreground/70 mb-2">Dark Mode</h4>
                  <CodeBlock code={`.dark {
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
  --blur: 30px;
  --blur-sm: 15px;
  --blur-lg: 50px;
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2);
  --glass-shadow-lg: 0 12px 48px rgba(0, 0, 0, 0.5), 0 4px 16px rgba(0, 0, 0, 0.3);
  --glass-shadow-sm: 0 4px 16px rgba(0, 0, 0, 0.3), 0 1px 4px rgba(0, 0, 0, 0.15);
}`} />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Example: Custom Transparency</h3>
              <p className="text-foreground/50 text-sm mb-4">
                Adjust transparency and blur to match your design:
              </p>
              <CodeBlock code={`/* More transparent, stronger blur */
:root {
  --glass-bg: rgba(255, 255, 255, 0.15);
  --blur: 40px;
}

.dark {
  --glass-bg: rgba(255, 255, 255, 0.08);
  --blur: 40px;
}

/* Less transparent, subtle blur */
:root {
  --glass-bg: rgba(255, 255, 255, 0.4);
  --blur: 20px;
}

.dark {
  --glass-bg: rgba(255, 255, 255, 0.15);
  --blur: 20px;
}`} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">How It Works</h3>
              <p className="text-foreground/50 text-sm mb-3">
                All glass-variant components automatically use these CSS variables:
              </p>
              <ul className="space-y-1.5 text-foreground/50 text-sm ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-foreground/20 mt-1.5 shrink-0">--</span>
                  <code className="glass-bg px-1.5 py-0.5 text-foreground/70 text-xs font-mono">--glass-bg</code> for background color
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground/20 mt-1.5 shrink-0">--</span>
                  <code className="glass-bg px-1.5 py-0.5 text-foreground/70 text-xs font-mono">--blur</code> for backdrop blur
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground/20 mt-1.5 shrink-0">--</span>
                  <code className="glass-bg px-1.5 py-0.5 text-foreground/70 text-xs font-mono">--glass-border</code> for border color
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground/20 mt-1.5 shrink-0">--</span>
                  <code className="glass-bg px-1.5 py-0.5 text-foreground/70 text-xs font-mono">--glass-shadow</code> for shadows
                </li>
              </ul>
              <p className="text-foreground/50 text-sm mt-4">
                Changing these variables updates all glass components without modifying individual component code.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Per-Component Customization</h3>
              <p className="text-foreground/50 text-sm mb-4">
                Customize glass effects for individual components using the <code className="glass-bg px-1.5 py-0.5 text-foreground/70 text-xs font-mono">glass</code> prop:
              </p>
              <CodeBlock code={`import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function CustomGlassCard() {
  return (
    <Card
      variant="glass"
      glass={{
        color: "rgba(139, 92, 246, 0.2)",
        blur: 40,
        transparency: 0.3,
        outline: "rgba(139, 92, 246, 0.5)",
      }}
    >
      <CardHeader>
        <CardTitle>Custom Glass Card</CardTitle>
      </CardHeader>
      <CardContent>
        This card has custom glass properties.
      </CardContent>
    </Card>
  )
}`} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Apple Standards</h3>
              <p className="text-foreground/50 text-sm mb-3">
                Glass UI uses Apple&apos;s glassmorphism standards by default:
              </p>
              <ul className="space-y-1.5 text-foreground/50 text-sm ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-foreground/20 mt-1.5 shrink-0">--</span>
                  <span><strong className="text-foreground/70">Light Mode:</strong> 25% opacity, 30px blur</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground/20 mt-1.5 shrink-0">--</span>
                  <span><strong className="text-foreground/70">Dark Mode:</strong> 10% opacity, 30px blur</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground/20 mt-1.5 shrink-0">--</span>
                  Subtle borders and shadows for depth
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground/20 mt-1.5 shrink-0">--</span>
                  Consistent blur values across all components
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
