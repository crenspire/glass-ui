import { describe, expect, it } from "vitest"
import { renderToStaticMarkup } from "react-dom/server"
import { CalendarWidget } from "./widgets"

describe("CalendarWidget", () => {
  it("does not prerender a date grid (the build date would not match the visitor's today)", () => {
    const html = renderToStaticMarkup(<CalendarWidget />)
    expect(html).not.toContain('role="grid"')
    expect(html).toContain("Calendar")
  })
})
