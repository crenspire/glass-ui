import { Home, LayoutGrid, Boxes, Palette, Droplets, type LucideIcon } from "lucide-react"

export const NAV: { title: string; href: string; icon: LucideIcon }[] = [
  { title: "Home", href: "/", icon: Home },
  { title: "Docs", href: "/docs/getting-started", icon: Droplets },
  { title: "Components", href: "/components", icon: LayoutGrid },
  { title: "Blocks", href: "/blocks", icon: Boxes },
  { title: "Themes", href: "/themes", icon: Palette },
]
