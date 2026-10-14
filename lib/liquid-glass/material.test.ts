import { describe, expect, it } from "vitest"
import { liquidGlass, liquidProps, resolveVariant } from "./material"

describe("liquidGlass", () => {
  it("defaults to the regular material", () => {
    const r = liquidGlass({ role: "surface" })
    expect(r.className).toBe("lg lg-regular lg-surface")
    expect(r.attrs).toEqual({ "data-glass": "card", "data-frost": "1", "data-tint": "0.2" })
    expect(r.style).toEqual({})
  })

  it("maps roles to engine presets", () => {
    expect(liquidGlass({ role: "bar" }).attrs["data-glass"]).toBe("bar")
    expect(liquidGlass({ role: "control" }).attrs["data-glass"]).toBe("button")
    expect(liquidGlass({ role: "knob" }).attrs["data-glass"]).toBe("knob")
  })

  it("never hands inline or overlay glass to WebGL", () => {
    expect(liquidGlass({ role: "inline" }).attrs).toEqual({})
    expect(liquidGlass({ role: "overlay" }).attrs).toEqual({})
  })

  it("keeps floating sheets CSS-only unless WebGL is requested", () => {
    expect(liquidGlass({ role: "sheet" }).attrs).toEqual({})
    expect(liquidGlass({ role: "sheet", webgl: true }).attrs["data-glass"]).toBe("sheet")
  })

  it("lets in-flow roles opt out of WebGL", () => {
    expect(liquidGlass({ role: "bar", webgl: false }).attrs).toEqual({})
    expect(liquidGlass({ role: "bar", webgl: false }).className).toBe("lg lg-regular lg-bar")
  })

  it("never upgrades overlays, even when asked", () => {
    expect(liquidGlass({ role: "overlay", webgl: true }).attrs).toEqual({})
  })

  it("uses clear and tinted material parameters", () => {
    expect(liquidGlass({ role: "control", material: "clear" }).attrs).toMatchObject({ "data-frost": "0.1", "data-tint": "0" })
    const t = liquidGlass({ role: "control", material: "tinted" })
    expect(t.className).toBe("lg lg-tinted lg-control")
    expect(t.attrs).toMatchObject({ "data-frost": "0.6", "data-tint": "0.35" })
  })

  it("applies a tint colour as CSS variables", () => {
    const r = liquidGlass({ role: "surface", tint: "#ff0000" })
    expect(r.style).toEqual({ "--lg-tint": "#ff0000", "--lg-tint-amt": "18%" })
  })

  it("lets the glass override win over tint and material frost", () => {
    const r = liquidGlass({ role: "surface", tint: "red", glass: { tint: "blue", frost: 0.4 } })
    expect(r.style).toMatchObject({ "--lg-tint": "blue" })
    expect(r.attrs["data-frost"]).toBe("0.4")
  })
})

describe("liquidProps", () => {
  it("merges own className and style after the material", () => {
    const p = liquidProps({ role: "bar" }, { className: "px-2", style: { color: "red" } })
    expect(p.className).toBe("lg lg-regular lg-bar px-2")
    expect(p.style).toEqual({ color: "red" })
    expect(p["data-glass"]).toBe("bar")
  })
})

describe("resolveVariant", () => {
  it("passes non-glass variants through", () => {
    expect(resolveVariant<"default" | "liquid">("default", undefined)).toEqual({ variant: "default", material: "regular" })
  })
  it("defaults to liquid", () => {
    expect(resolveVariant(undefined, undefined)).toEqual({ variant: "liquid", material: "regular" })
  })
})
