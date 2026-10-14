"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Command as CommandIcon, Github, Moon, Sun, Image as ImageIcon, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { liquidProps } from "@/lib/liquid-glass/material"
import { useWallpaper } from "@/components/wallpaper"
import { NAV } from "./nav"

export function MenuBar({ webgl, onCommand }: { webgl: boolean; onCommand: () => void }) {
  const { resolvedTheme, setTheme } = useTheme()
  const { preset, presets, setPreset } = useWallpaper()
  const [stars, setStars] = React.useState<number | null>(null)
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
    fetch("https://api.github.com/repos/crenspire/glass-ui")
      .then(r => r.json())
      .then(d => typeof d.stargazers_count === "number" && setStars(d.stargazers_count))
      .catch(() => {})
  }, [])

  return (
    <div {...liquidProps({ role: "bar", webgl }, { className: "flex h-14 items-center gap-2 px-4 text-sm" })}>
      <Link href="/" className="flex items-center gap-2 pr-2 font-semibold">
        {mounted && <Image src={resolvedTheme === "dark" ? "/logo-dark.png" : "/logo-light.png"} alt="" width={80} height={20} className="h-5 w-auto" priority />}
        <span>Glass UI</span>
      </Link>
      <nav className="hidden items-center gap-1 md:flex">
        {NAV.slice(1, 5).map(n => (
          <Button key={n.href} asChild variant="ghost" size="sm" className="h-8 rounded-full px-3">
            <Link href={n.href}>{n.title}</Link>
          </Button>
        ))}
      </nav>
      <div className="ml-auto flex items-center gap-1">
        <Button variant="ghost" size="sm" className="h-8 gap-1.5 rounded-full px-3 text-muted-foreground" onClick={onCommand} aria-label="Open command menu">
          <CommandIcon className="size-3.5" /> K
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8" aria-label="Wallpaper"><ImageIcon className="size-4" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>Wallpaper</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {presets.map(p => (
              <DropdownMenuItem key={p.id} onSelect={() => setPreset(p.id)} className="gap-2">
                <span className="size-4 rounded-full" style={{ background: `linear-gradient(135deg, ${p.dark.shapes[0]}, ${p.dark.shapes[2]})` }} />
                {p.name}
                {p.id === preset.id && <Check className="ml-auto size-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="icon" className="size-8" aria-label="Toggle theme"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
          {mounted && resolvedTheme === "light" ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>
        <Button asChild variant="ghost" size="sm" className="h-8 gap-1.5 rounded-full px-3">
          <a href="https://github.com/crenspire/glass-ui" target="_blank" rel="noreferrer"><Github className="size-4" />{stars ?? ""}</a>
        </Button>
      </div>
    </div>
  )
}
