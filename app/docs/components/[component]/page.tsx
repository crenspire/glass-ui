"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check, BookOpen } from "lucide-react"
import * as React from "react"
import { getComponent } from "@/lib/registry"
import { useDemo } from "@/components/demos/use-demo"
import { Skeleton } from "@/components/ui/skeleton"
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
      <pre className="lg lg-regular lg-surface p-4 rounded-lg font-mono text-sm overflow-x-auto">
        <code className="text-foreground whitespace-pre break-words">{code}</code>
      </pre>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-8 w-8 text-muted-foreground hover:text-foreground"
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

export default function ComponentPage({
  params,
}: {
  params: Promise<{ component: string }>
}) {
  const { component: componentName } = use(params)
  const component = getComponent(componentName)
  const demo = useDemo(componentName)

  if (!component) {
    notFound()
  }


  return (
    <div className="text-foreground">
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">{component.title || component.name}</h1>
            <Badge className="w-fit">Component</Badge>
          </div>
          <Button
            size="sm"
            asChild
          >
            <a
              href={getStorybookUrl(component.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 w-fit"
            >
              <BookOpen className="h-4 w-4" />
              View in Storybook
            </a>
          </Button>
        </div>
        <p className="text-base sm:text-lg text-muted-foreground">{component.description || "No description available"}</p>
      </div>

      <div className="space-y-8">
        <Card className="text-foreground">
          <CardHeader>
            <CardTitle className="text-foreground">Installation</CardTitle>
            <CardDescription className="text-muted-foreground">
              Install this component using the shadcn CLI with your preferred package manager
            </CardDescription>
          </CardHeader>
          <CardContent>
            <InstallationInstructions componentName={component.name} />
          </CardContent>
        </Card>

        <Card className="text-foreground">
          <CardHeader>
            <CardTitle className="text-foreground">Usage</CardTitle>
            <CardDescription className="text-muted-foreground">
              Example code for using this component
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="example" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="example">Example</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
              <TabsContent value="example" className="space-y-4">
                <div className="p-4 border border-border rounded-lg bg-muted/20">
                  {demo ? <demo.default /> : <Skeleton className="h-24 w-full" />}
                </div>
              </TabsContent>
              <TabsContent value="code">
                <CodeBlock code={demo?.code ?? ""} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="text-foreground">
          <CardHeader>
            <CardTitle className="text-foreground">Props</CardTitle>
            <CardDescription className="text-muted-foreground">
              Component props and variants
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Glass props shared by every Glass UI component:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><code>material</code> - regular (default), clear or tinted liquid glass</li>
                <li><code>tint</code> - any CSS colour to tint the glass</li>
                <li><code>glass</code> - per-instance override: <code>{"{ tint, frost }"}</code></li>
                <li><code>variant</code> - liquid (default) or default for the plain shadcn style{component.name === "button" && "; also destructive, outline, secondary, ghost and link"}</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

