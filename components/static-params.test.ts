import { describe, expect, it, vi } from "vitest"
import registry from "@/registry.json"
import { BLOCKS } from "@/lib/blocks"

vi.mock("next/navigation", () => ({ usePathname: () => "/", useRouter: () => ({ push: () => {} }), notFound: () => {} }))

/* GitHub Pages serves a static export: every dynamic route must list its pages at build time. */
describe("static export params", () => {
  it("prerenders a docs page for every registry component", async () => {
    const page = await import("@/app/(settings)/docs/components/[component]/page")
    const names = registry.items.filter(i => i.type === "registry:component").map(i => i.name).sort()
    expect(page.dynamicParams).toBe(false)
    expect((await page.generateStaticParams()).map((p: { component: string }) => p.component).sort()).toEqual(names)
  })
  it("prerenders a page for every block", async () => {
    const page = await import("@/app/blocks/[block]/page")
    expect(page.dynamicParams).toBe(false)
    expect((await page.generateStaticParams()).map((p: { block: string }) => p.block).sort()).toEqual(BLOCKS.map(b => b.name).sort())
  })
})
