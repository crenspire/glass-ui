"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false)
  return (
    <div className="relative">
      <pre className="overflow-x-auto rounded-2xl bg-black/40 p-4 font-mono text-sm text-white/90">
        <code className="whitespace-pre">{code}</code>
      </pre>
      <Button variant="ghost" size="icon" className="absolute right-2 top-2 size-8 text-white/70 hover:text-white" aria-label="Copy code"
        onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000) }}>
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </Button>
    </div>
  )
}
