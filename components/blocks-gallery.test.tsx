import { describe, expect, it, vi } from "vitest"
import { renderToStaticMarkup } from "react-dom/server"

vi.mock("next/navigation", () => ({ usePathname: () => "/blocks", useRouter: () => ({ push: () => {} }) }))

const { default: BlocksPage } = await import("@/app/blocks/page")

/** Depth of <a> nesting at each opening anchor, from server markup. */
function maxAnchorDepth(html: string) {
  let depth = 0, max = 0
  for (const m of html.matchAll(/<(\/?)a[\s>]/g)) {
    depth += m[1] ? -1 : 1
    max = Math.max(max, depth)
  }
  return max
}

describe("blocks gallery", () => {
  const html = renderToStaticMarkup(<BlocksPage />)
  it("never nests a link inside a link", () => {
    expect(maxAnchorDepth(html)).toBe(1)
  })
  it("keeps the scaled live previews out of the tab order", () => {
    const previews = html.match(/data-block-preview[^>]*>/g) ?? []
    expect(previews.length).toBeGreaterThan(0)
    for (const p of previews) expect(p).toContain("inert")
  })
})
