"use client"

import * as React from "react"
import { notFound } from "next/navigation"
import { BookOpen } from "lucide-react"
import { Badge, Button, Card, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/glass"
import { Skeleton } from "@/components/ui/skeleton"
import { CodeBlock } from "@/components/code-block"
import { InstallationInstructions } from "@/components/installation-instructions"
import { getDemo } from "@/components/demos/registry"
import { useDemo } from "@/components/demos/use-demo"
import { getStorybookUrl } from "@/lib/storybook-url"
import { getComponent } from "@/lib/registry"
import type { Material } from "@/lib/liquid-glass/material"

export function ComponentDocs({ name }: { name: string }) {
  const component = getComponent(name)
  const entry = getDemo(name)
  const demo = useDemo(name)
  const [material, setMaterial] = React.useState<Material>("regular")
  if (!component || !entry) notFound()

  return (
    <>
      <Card className="gap-4 p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2"><h1 className="text-2xl font-semibold">{entry.title}</h1><Badge>{entry.category}</Badge></div>
            <p className="text-muted-foreground">{component.description}</p>
          </div>
          <Button asChild size="sm" material="clear"><a href={getStorybookUrl(name)} target="_blank" rel="noreferrer"><BookOpen className="size-4" />Storybook</a></Button>
        </div>
        <Tabs value={material} onValueChange={v => setMaterial(v as Material)}>
          <TabsList>
            <TabsTrigger value="regular">Regular</TabsTrigger>
            <TabsTrigger value="clear">Clear</TabsTrigger>
            <TabsTrigger value="tinted">Tinted</TabsTrigger>
          </TabsList>
        </Tabs>
      </Card>

      {/* The stage has no window: the demo rests on the wallpaper and gets real refraction. */}
      <section aria-label="Preview" className="flex min-h-80 items-center justify-center px-4 py-10">
        {demo ? <div className="flex w-full max-w-xl justify-center"><demo.default material={material} /></div> : <Skeleton className="h-24 w-64" />}
      </section>

      <Card className="gap-4 p-6">
        <Tabs defaultValue="code">
          <TabsList><TabsTrigger value="code">Code</TabsTrigger><TabsTrigger value="props">Props</TabsTrigger><TabsTrigger value="install">Install</TabsTrigger></TabsList>
          <TabsContent value="code" className="mt-4"><CodeBlock code={demo?.code ?? ""} /></TabsContent>
          <TabsContent value="props" className="mt-4 space-y-1 text-sm text-muted-foreground">
            <p><code>material</code> — regular (default), clear or tinted liquid glass</p>
            <p><code>tint</code> — any CSS colour to tint the glass</p>
            <p><code>glass</code> — per-instance override: <code>{"{ tint, frost }"}</code></p>
            <p><code>webgl</code> — draw with the WebGL shader inside a LiquidGlassProvider (default depends on the role)</p>
            <p><code>variant</code> — liquid (default) or default for the plain shadcn style</p>
          </TabsContent>
          <TabsContent value="install" className="mt-4"><InstallationInstructions componentName={name} /></TabsContent>
        </Tabs>
      </Card>
    </>
  )
}
