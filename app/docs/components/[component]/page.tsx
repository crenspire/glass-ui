"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check, BookOpen } from "lucide-react"
import * as React from "react"
import { getComponent } from "@/lib/registry"
import { ComponentPreview } from "@/components/component-preview"
import { getComponentExampleCode } from "@/lib/component-examples"
import { InstallationInstructions } from "@/components/installation-instructions"
import { getStorybookUrl } from "@/lib/storybook-url"

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <pre className="glass-bg p-4 rounded-lg font-mono text-sm overflow-x-auto">
        <code className="text-foreground whitespace-pre break-words">{code}</code>
      </pre>
      <button
        className="absolute top-3 right-3 p-1.5 rounded-md text-foreground/30 hover:text-foreground/70 transition-colors"
        onClick={copyToClipboard}
      >
        {copied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
    </div>
  )
}

export default function ComponentPage({
  params,
}: {
  params: Promise<{ component: string }>
}) {
  const { component: componentName } = use(params)
  const component = getComponent(componentName)

  if (!component) {
    notFound()
  }

  const exampleCode = getComponentExampleCode(component.name)

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight mb-2">
          {component.title || component.name}
        </h1>
        <p className="text-base sm:text-lg text-foreground/50 mb-3">
          {component.description || "No description available"}
        </p>
        <a
          href={getStorybookUrl(component.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-foreground/40 hover:text-foreground/70 transition-colors"
        >
          <BookOpen className="h-3.5 w-3.5" />
          View in Storybook
        </a>
      </div>

      <div className="space-y-8">
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="text-foreground text-lg font-medium">Installation</CardTitle>
            <p className="text-sm text-foreground/40">
              Install using the shadcn CLI with your preferred package manager
            </p>
          </CardHeader>
          <CardContent>
            <InstallationInstructions componentName={component.name} />
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader>
            <CardTitle className="text-foreground text-lg font-medium">Usage</CardTitle>
            <p className="text-sm text-foreground/40">
              Example code for using this component
            </p>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="example" className="w-full">
              <TabsList variant="glass" className="mb-4">
                <TabsTrigger value="example">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
              <TabsContent value="example" className="space-y-4">
                <div className="glass-bg p-6">
                  <ComponentPreview componentName={component.name} />
                </div>
              </TabsContent>
              <TabsContent value="code">
                <CodeBlock code={exampleCode} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader>
            <CardTitle className="text-foreground text-lg font-medium">Props</CardTitle>
            <p className="text-sm text-foreground/40">
              Component props and variants
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-foreground/60">
              <p>This component supports the following variants:</p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li><span className="text-foreground/80">default</span> — Standard styling</li>
                <li><span className="text-foreground/80">glass</span> — Glassmorphism effect</li>
                {component.name === "button" && (
                  <>
                    <li><span className="text-foreground/80">glassSolid</span> — Solid glass variant</li>
                    <li><span className="text-foreground/80">outline</span> — Outline variant</li>
                    <li><span className="text-foreground/80">ghost</span> — Ghost variant</li>
                  </>
                )}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
