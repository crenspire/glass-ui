"use client"

import Link from "next/link"
import { Card } from "@/components/ui/glass"
import { CATEGORIES, DEMOS } from "@/components/demos/registry"
import { useDemo } from "@/components/demos/use-demo"
import { Skeleton } from "@/components/ui/skeleton"

function Tile({ name, title }: { name: string; title: string }) {
  const demo = useDemo(name)
  return (
    <Card className="gap-3 p-4">
      <div className="flex min-h-36 items-center justify-center overflow-hidden">
        {demo ? <div className="flex w-full origin-center scale-[.85] justify-center"><demo.default /></div> : <Skeleton className="h-20 w-3/4" />}
      </div>
      <Link href={`/docs/components/${name}`} className="text-sm font-semibold hover:underline">{title} →</Link>
    </Card>
  )
}

export default function ComponentsPage() {
  return (
    <>
      <Card className="gap-1 p-6">
        <h1 className="text-2xl font-semibold">Components</h1>
        <p className="text-muted-foreground">{DEMOS.length} liquid glass components. Every tile is live.</p>
      </Card>
      {CATEGORIES.map(cat => (
        <section key={cat} className="space-y-3">
          <h2 className="px-2 text-sm font-semibold uppercase tracking-wider text-white/85 [text-shadow:0_1px_12px_rgb(0_0_0/0.3)]">{cat}</h2>
          <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
            {DEMOS.filter(d => d.category === cat).map(d => <Tile key={d.name} name={d.name} title={d.title} />)}
          </div>
        </section>
      ))}
    </>
  )
}
