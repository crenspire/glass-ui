"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
    <>
      <Card className="gap-1 p-6">
        <h1 className="text-2xl font-semibold">Getting started</h1>
        <p className="text-muted-foreground">Get up and running with Glass UI in minutes.</p>
      </Card>

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
    </>
  )
}
