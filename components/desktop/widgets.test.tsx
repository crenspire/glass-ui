import { describe, expect, it } from "vitest"
import { renderToStaticMarkup } from "react-dom/server"
import { About, CalendarWidget } from "./widgets"

describe("CalendarWidget", () => {
  it("does not prerender a date grid (the build date would not match the visitor's today)", () => {
    const html = renderToStaticMarkup(<CalendarWidget />)
    expect(html).not.toContain('role="grid"')
    expect(html).toContain("Calendar")
  })
})

describe("About", () => {
  it("credits the author and links GitHub and sponsoring", () => {
    const html = renderToStaticMarkup(<About />)
    expect(html).toContain("Akshay Joshi")
    expect(html).toContain('href="https://github.com/akshaypjoshi"')
    expect(html).toContain('href="https://crenspire.com"')
    expect(html).toContain('href="https://github.com/crenspire/glass-ui"')
    expect(html).toContain('href="https://github.com/sponsors/akshaypjoshi"')
  })
})
