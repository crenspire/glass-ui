// @vitest-environment happy-dom
import { describe, expect, it } from "vitest"
import { LiquidGlass } from "./engine"

/* happy-dom has no WebGL, so the engine starts in its failed state; scan() still tracks elements,
   which is all these tests need. Drawn state is simulated through the internal item list. */
type Internals = { items: { el: HTMLElement; live: boolean; blocked: boolean; clips: Element[] }[]; solids: { el: HTMLElement; live: boolean }[] }

describe("LiquidGlass.scan", () => {
  it("stops drawing an element that loses data-glass", () => {
    document.body.innerHTML = `<div id="g" data-glass="card"></div>`
    const el = document.getElementById("g")!
    const lg = new LiquidGlass(document.createElement("canvas"))
    const inner = lg as unknown as Internals
    lg.scan(document.body)
    inner.items[0].live = true
    el.setAttribute("data-glass-live", "")

    el.removeAttribute("data-glass")
    lg.scan(document.body)

    expect(inner.items).toHaveLength(0)
    expect(el.hasAttribute("data-glass-live")).toBe(false)
  })

  it("restores a solid that loses data-glass-solid", () => {
    document.body.innerHTML = `<span id="s" data-glass-solid=""></span>`
    const el = document.getElementById("s")!
    const lg = new LiquidGlass(document.createElement("canvas"))
    const inner = lg as unknown as Internals
    lg.scan(document.body)
    inner.solids[0].live = true
    el.style.opacity = "0"

    el.removeAttribute("data-glass-solid")
    lg.scan(document.body)

    expect(inner.solids).toHaveLength(0)
    expect(el.style.opacity).toBe("")
  })

  it("notices an ancestor that starts painting after the scan", () => {
    document.body.innerHTML = `<div id="p"><div data-glass="card"></div></div>`
    const lg = new LiquidGlass(document.createElement("canvas"))
    const inner = lg as unknown as Internals
    lg.scan(document.body)
    expect(inner.items[0].blocked).toBe(false)

    document.getElementById("p")!.style.backgroundColor = "rgb(20, 20, 20)"
    lg.refreshOcclusion()

    expect(inner.items[0].blocked).toBe(true)
  })

  it("records the scroll containers that clip an element", () => {
    document.body.innerHTML = `<div id="s" style="overflow-y: auto"><div><div data-glass="card"></div></div></div>`
    const lg = new LiquidGlass(document.createElement("canvas"))
    lg.scan(document.body)
    expect((lg as unknown as Internals).items[0].clips).toEqual([document.getElementById("s")])
  })
})
