"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/glass"
import { liquidProps } from "@/lib/liquid-glass/material"

const INSTALL = "pnpm dlx shadcn@latest add @glass-ui/button"

export function Hero() {
  const [copied, setCopied] = React.useState(false)
  return (
    <div className="flex max-w-md flex-col gap-6 text-white [text-shadow:0_2px_24px_rgb(0_0_0/0.25)]">
      <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight xl:text-6xl">Liquid glass,<br />for the web.</h1>
      <p className="text-lg text-white/85">Fifty-plus React components whose glass really bends light. Drop-in replacements for shadcn/ui.</p>
      <div className="flex flex-wrap gap-3">
        <Button asChild size="lg" material="tinted"><Link href="/docs/getting-started">Get started <ArrowRight className="size-4" /></Link></Button>
        <Button asChild size="lg"><Link href="/components">Browse components</Link></Button>
      </div>
      <button
        type="button"
        onClick={() => { navigator.clipboard.writeText(INSTALL); setCopied(true); setTimeout(() => setCopied(false), 1500) }}
        {...liquidProps({ role: "control", material: "clear" }, { className: "flex h-11 items-center gap-3 px-4 font-mono text-sm" })}
      >
        <span className="truncate">{INSTALL}</span>{copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </button>
    </div>
  )
}
