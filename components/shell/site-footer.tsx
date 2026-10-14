import { Github, Heart } from "lucide-react"
import { Button } from "@/components/ui/glass"
import { liquidProps } from "@/lib/liquid-glass/material"
import { cn } from "@/lib/utils"

const link = "text-foreground underline-offset-4 hover:underline"

/** Credits bar: who built it, where the source lives, and how to sponsor. */
export function SiteFooter({ webgl, className }: { webgl: boolean; className?: string }) {
  return (
    <footer {...liquidProps({ role: "bar", webgl }, {
      className: cn("mx-auto flex w-full max-w-6xl flex-col items-center gap-2 px-4 py-2 text-xs text-muted-foreground sm:flex-row sm:justify-between", className),
    })}>
      <p className="text-center sm:text-left">
        Built by <a href="https://github.com/akshaypjoshi" target="_blank" rel="noreferrer" className={link}>Akshay Joshi</a>
        {" "}at <a href="https://crenspire.com" target="_blank" rel="noreferrer" className={link}>Crenspire Technologies</a>
        {" "}· Inspired by <a href="https://ui.shadcn.com/" target="_blank" rel="noreferrer" className={link}>shadcn/ui</a>
      </p>
      <div className="flex items-center gap-2">
        <Button asChild size="sm" material="clear" webgl={false} className="h-7 gap-1.5 px-3 text-xs">
          <a href="https://github.com/sponsors/akshaypjoshi" target="_blank" rel="noreferrer" aria-label="Sponsor akshaypjoshi">
            <Heart className="size-3.5 fill-current" />Sponsor
          </a>
        </Button>
        <Button asChild size="sm" material="clear" webgl={false} className="h-7 gap-1.5 px-3 text-xs">
          <a href="https://github.com/crenspire/glass-ui" target="_blank" rel="noreferrer">
            <Github className="size-3.5" />Source on GitHub
          </a>
        </Button>
      </div>
    </footer>
  )
}
