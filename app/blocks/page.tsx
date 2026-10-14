"use client"

import Link from "next/link"
import { BLOCKS } from "@/lib/blocks"
import { BLOCK_COMPONENTS } from "./block-components"

/** Mission Control: each block is a scaled live window on the wallpaper. */
export default function BlocksPage() {
  return (
    <div className="mx-auto h-full max-w-7xl overflow-y-auto">
      <div className="grid gap-x-6 gap-y-10 p-2 md:grid-cols-2 xl:grid-cols-3">
        {BLOCKS.map(b => {
          const Block = BLOCK_COMPONENTS[b.name]
          return (
            // One link per tile, stretched over it with ::after: the live preview holds its own
            // links and inputs, so it must not sit inside the <a>, and it is inert (not tabbable).
            <div key={b.name} className="group relative flex flex-col items-center gap-3">
              <div data-block-preview inert className="relative h-64 w-full overflow-hidden rounded-[28px] transition-[scale] duration-300 group-hover:scale-[1.02]">
                <div className="pointer-events-none absolute left-0 top-0 w-[200%] origin-top-left scale-50"><Block /></div>
              </div>
              <div className="text-center text-white [text-shadow:0_1px_12px_rgb(0_0_0/0.35)]">
                <Link href={`/blocks/${b.name}`} className="font-semibold after:absolute after:inset-0 after:rounded-[28px] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring">
                  {b.title}
                </Link>
                <p className="text-sm text-white/80">{b.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
