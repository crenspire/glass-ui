"use client"

import * as React from "react"
import { use } from "react"
import { notFound } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check } from "lucide-react"
import Link from "next/link"
import { DashboardBlock } from "@/components/blocks/dashboard"
import { AuthenticationBlock } from "@/components/blocks/authentication"
import { SignupBlock } from "@/components/blocks/signup"
import { ForgotPasswordBlock } from "@/components/blocks/forgot-password"
import { CalendarBlock } from "@/components/blocks/calendar"
import { ChartBlock } from "@/components/blocks/chart"

const blocks = {
  dashboard: {
    title: "Dashboard",
    description: "Complete dashboard layout with stats, charts, and navigation",
    component: DashboardBlock,
    code: `import { DashboardBlock } from "@/components/blocks/dashboard"

export default function Page() {
  return <DashboardBlock />
}`,
  },
  authentication: {
    title: "Authentication",
    description: "Login form with glassmorphism effects",
    component: AuthenticationBlock,
    code: `import { AuthenticationBlock } from "@/components/blocks/authentication"

export default function Page() {
  return <AuthenticationBlock />
}`,
  },
  signup: {
    title: "Sign Up",
    description: "Registration form with validation",
    component: SignupBlock,
    code: `import { SignupBlock } from "@/components/blocks/signup"

export default function Page() {
  return <SignupBlock />
}`,
  },
  "forgot-password": {
    title: "Forgot Password",
    description: "Password reset form",
    component: ForgotPasswordBlock,
    code: `import { ForgotPasswordBlock } from "@/components/blocks/forgot-password"

export default function Page() {
  return <ForgotPasswordBlock />
}`,
  },
  calendar: {
    title: "Calendar",
    description: "Calendar view with events and scheduling",
    component: CalendarBlock,
    code: `import { CalendarBlock } from "@/components/blocks/calendar"

export default function Page() {
  return <CalendarBlock />
}`,
  },
  chart: {
    title: "Chart",
    description: "Beautiful charts with bar, line, and area visualizations",
    component: ChartBlock,
    code: `import { ChartBlock } from "@/components/blocks/chart"

export default function Page() {
  return <ChartBlock />
}`,
  },
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <div className="glass-bg p-4 overflow-x-auto">
        <code className="text-foreground/80 text-sm font-mono whitespace-pre">{code}</code>
      </div>
      <button
        className="absolute top-3 right-3 p-2 text-foreground/40 hover:text-foreground transition-colors"
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

export default function BlockPage({
  params,
}: {
  params: Promise<{ block: string }>
}) {
  const { block: blockName } = use(params)
  const block = blocks[blockName as keyof typeof blocks]

  if (!block) {
    notFound()
  }

  const Component = block.component

  return (
    <div className="min-h-screen relative">
      <div className="container mx-auto px-4 pt-4 pb-8 relative z-10">
        <div className="mb-8">
          <Link
            href="/blocks"
            className="inline-flex items-center text-sm text-foreground/40 hover:text-foreground/70 transition-colors mb-6"
          >
            ← Blocks
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-2">{block.title}</h1>
          <p className="text-lg text-foreground/50">{block.description}</p>
        </div>

        <Tabs defaultValue="preview" className="space-y-6">
          <TabsList variant="glass">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>

          <TabsContent value="preview">
            <div className="glass-bg p-0 overflow-hidden">
              <Component />
            </div>
          </TabsContent>

          <TabsContent value="code" className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-foreground/50 mb-3">Implementation</h3>
              <CodeBlock code={block.code} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
