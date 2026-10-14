// @vitest-environment happy-dom
import { describe, expect, it } from "vitest"
import { effectiveOpacity } from "./occlusion"

describe("effectiveOpacity", () => {
  it("multiplies the element's opacity by every ancestor's", () => {
    document.body.innerHTML = `<div style="opacity: 0.5"><div style="opacity: 0.8"><div id="g" style="opacity: 0.5"></div></div></div>`
    expect(effectiveOpacity(document.getElementById("g")!)).toBeCloseTo(0.2)
  })
  it("is 0 inside a hidden container", () => {
    document.body.innerHTML = `<div style="opacity: 0"><div id="g"></div></div>`
    expect(effectiveOpacity(document.getElementById("g")!)).toBe(0)
  })
  it("is 1 with no opacity anywhere", () => {
    document.body.innerHTML = `<div><div id="g"></div></div>`
    expect(effectiveOpacity(document.getElementById("g")!)).toBe(1)
  })
})
