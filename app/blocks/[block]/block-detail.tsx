"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button, Card } from "@/components/ui/glass"
import { CodeBlock } from "@/components/code-block"
import { getBlock } from "@/lib/blocks"
import { BLOCK_COMPONENTS } from "../block-components"

export function BlockDetail({ name }: { name: string }) {
  const block = getBlock(name)
  const Block = BLOCK_COMPONENTS[name]
  if (!block || !Block) notFound()
  return (
    <div className="mx-auto grid h-full max-w-[1600px] gap-4 lg:grid-cols-[1fr_380px]">
      <div className="min-h-0 overflow-y-auto">
        <Button asChild size="sm" material="clear" className="mb-4"><Link href="/blocks"><ArrowLeft className="size-4" />All blocks</Link></Button>
        {/* The block rests on the wallpaper: its glass is layer 0. */}
        <Block />
      </div>
      <Card className="min-h-0 gap-4 overflow-y-auto p-6">
        <div><h1 className="text-xl font-semibold">{block.title}</h1><p className="text-sm text-muted-foreground">{block.description}</p></div>
        <CodeBlock code={block.code} />
      </Card>
    </div>
  )
}
