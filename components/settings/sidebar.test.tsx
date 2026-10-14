import { describe, expect, it, vi } from "vitest"
import { renderToStaticMarkup } from "react-dom/server"

vi.mock("next/navigation", () => ({ usePathname: () => "/docs/components/slider/" }))
const { SettingsSidebar } = await import("./sidebar")

describe("SettingsSidebar", () => {
  it("marks the current page even with the static export's trailing slash", () => {
    const html = renderToStaticMarkup(<SettingsSidebar />)
    expect(html).toMatch(/aria-current="page"[^>]*href="\/docs\/components\/slider\/?"|href="\/docs\/components\/slider\/?"[^>]*aria-current="page"/)
  })
})
