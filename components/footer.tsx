import Link from "next/link"
import { Github, Heart } from "lucide-react"
import { Button } from "@/components/ui/glass/button"
import { liquidProps } from "@/lib/liquid-glass/material"

export function Footer() {

  return (
    <footer className="w-full pb-4 bg-transparent mt-16">
      <div className="container mx-auto px-4">
        <div {...liquidProps({ role: "surface" }, { className: "px-4 py-6 md:px-6 md:py-8" })}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col items-center text-center md:items-start md:text-left gap-1 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
                <span>Built by</span>
                <Link
                  href="https://github.com/akshaypjoshi"
                  className="text-foreground hover:text-foreground/80 transition-colors whitespace-nowrap"
                  target="_blank"
                >
                  Akshay Joshi
                </Link>
                <span>at</span>
                <Link
                  href="https://crenspire.com"
                  className="text-foreground hover:text-foreground/80 transition-colors whitespace-nowrap"
                  target="_blank"
                >
                  Crenspire Technologies
                </Link>
              </div>
              <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
                <span>Inspired by</span>
                <Link
                  href="https://ui.shadcn.com/"
                  className="text-foreground hover:text-foreground/80 transition-colors whitespace-nowrap"
                  target="_blank"
                >
                  ShadCN
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4 flex-wrap justify-center md:justify-end">
              <Button
                size="sm"
                asChild
                effect="glow"
                className="gap-2"
              >
                <Link
                  href="https://github.com/sponsors/akshaypjoshi"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Sponsor akshaypjoshi"
                >
                  <Heart className="h-4 w-4 fill-current" />
                  <span>Sponsor</span>
                </Link>
              </Button>
              <Link
                href="https://github.com/crenspire/glass-ui"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
              <span className="text-xs sm:text-sm text-muted-foreground">
                The source code is available on GitHub.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

