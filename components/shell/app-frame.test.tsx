import { describe, expect, it, vi } from "vitest"
import { renderToStaticMarkup } from "react-dom/server"

let desktop = false
vi.mock("./use-desktop-frame", () => ({ useDesktopFrame: () => desktop, DESKTOP_QUERY: "" }))
vi.mock("next/navigation", () => ({ usePathname: () => "/", useRouter: () => ({ push: () => {} }) }))

const { AppFrame } = await import("./app-frame")
const { WallpaperProvider } = await import("@/components/wallpaper")

/** Server HTML must already be the right layout for the viewport: only the WebGL opt-in may depend on JS. */
const markup = () => renderToStaticMarkup(<WallpaperProvider><AppFrame><p>page</p></AppFrame></WallpaperProvider>)
  .replace(/ data-(glass|frost|tint)="[^"]*"/g, "")

describe("AppFrame", () => {
  it("lays out with CSS, not with the JS media-query hook", () => {
    desktop = false
    const phone = markup()
    desktop = true
    expect(markup()).toEqual(phone)
  })

  it("has no footer bar and no Liquid demo entry", () => {
    const html = markup()
    expect(html).not.toContain("<footer")
    expect(html).not.toContain('href="/liquid"')
  })
})
