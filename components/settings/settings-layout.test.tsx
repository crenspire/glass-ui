import { describe, expect, it, vi } from "vitest"
import { renderToStaticMarkup } from "react-dom/server"

let desktop = false
vi.mock("@/components/shell/use-desktop-frame", () => ({ useDesktopFrame: () => desktop, DESKTOP_QUERY: "" }))
vi.mock("next/navigation", () => ({ usePathname: () => "/components" }))

const { SettingsLayout } = await import("./settings-layout")

/** Markup without classes: the layout switch must be CSS-only, so page content keeps one tree position. */
const shape = () => renderToStaticMarkup(<SettingsLayout><p id="page">content</p></SettingsLayout>).replace(/ class="[^"]*"/g, "")

describe("SettingsLayout", () => {
  it("renders the same tree on desktop and phone (no remount of the page when crossing the breakpoint)", () => {
    desktop = false
    const phone = shape()
    desktop = true
    const wide = shape()
    expect(wide).toEqual(phone)
    expect(wide).toContain('id="page"')
  })
})
