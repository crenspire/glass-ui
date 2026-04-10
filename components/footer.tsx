import Link from "next/link"
import { Github, Heart } from "lucide-react"
import { Button } from "@/components/ui/glass/button"

export function Footer() {
  return (
    <footer className="w-full pb-4 bg-transparent">
      <div className="container mx-auto px-4">
        <div
          className="rounded-xl glass-bg px-4 py-6 md:px-6 md:py-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col items-center md:items-start gap-1 text-xs text-foreground/40">
              <div className="flex items-center gap-1.5 flex-wrap justify-center md:justify-start">
                <span>Built by</span>
                <Link
                  href="https://github.com/akshaypjoshi"
                  className="text-foreground/60 hover:text-foreground/80 transition-colors"
                  target="_blank"
                >
                  Akshay Joshi
                </Link>
                <span>at</span>
                <Link
                  href="https://crenspire.com"
                  className="text-foreground/60 hover:text-foreground/80 transition-colors"
                  target="_blank"
                >
                  Crenspire Technologies
                </Link>
              </div>
              <div className="flex items-center gap-1.5">
                <span>Inspired by</span>
                <Link
                  href="https://ui.shadcn.com/"
                  className="text-foreground/60 hover:text-foreground/80 transition-colors"
                  target="_blank"
                >
                  shadcn/ui
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="glass" size="sm" asChild className="gap-1.5">
                <Link
                  href="https://github.com/sponsors/akshaypjoshi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Heart className="h-3.5 w-3.5 fill-current" />
                  Sponsor
                </Link>
              </Button>
              <Link
                href="https://github.com/crenspire/glass-ui"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/30 hover:text-foreground/60 transition-colors"
              >
                <Github className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
