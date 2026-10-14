"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface InstallationInstructionsProps {
  componentName: string
  packageName?: string
}

export function InstallationInstructions({ 
  componentName, 
  packageName = "@crenspire/glass-ui" 
}: InstallationInstructionsProps) {
  const [copied, setCopied] = React.useState<string | null>(null)

  const commands = {
    pnpm: `pnpm dlx shadcn@latest add @glass-ui/${componentName}`,
    yarn: `yarn dlx shadcn@latest add @glass-ui/${componentName}`,
    npm: `npx shadcn@latest add @glass-ui/${componentName}`,
    bun: `bunx shadcn@latest add @glass-ui/${componentName}`,
  }

  const copyToClipboard = (command: string, key: string) => {
    navigator.clipboard.writeText(command)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <Tabs defaultValue="pnpm" className="w-full">
      <TabsList className="mb-4 grid w-full grid-cols-4">
        <TabsTrigger value="pnpm">pnpm</TabsTrigger>
        <TabsTrigger value="yarn">yarn</TabsTrigger>
        <TabsTrigger value="npm">npm</TabsTrigger>
        <TabsTrigger value="bun">bun</TabsTrigger>
      </TabsList>
      {Object.entries(commands).map(([key, command]) => (
        <TabsContent key={key} value={key}>
          <div className="relative">
            <pre className="bg-muted/50 backdrop-blur-sm border border-border rounded-lg p-3 sm:p-4 overflow-x-auto text-xs sm:text-sm">
              <code className="text-foreground font-mono whitespace-pre break-words">{command}</code>
            </pre>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={() => copyToClipboard(command, key)}
            >
              {copied === key ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}

