import { describe, expect, it } from "vitest"
import { selectShapes } from "./budget"

describe("selectShapes", () => {
  it("keeps everything under the cap, parents on layer 0 and children on layer 1", () => {
    const r = selectShapes([{ id: 1, parent: null, area: 100 }, { id: 2, parent: 1, area: 10 }], 32)
    expect([...r]).toEqual([[1, 0], [2, 1]])
  })

  it("prefers the largest shapes when over the cap", () => {
    const r = selectShapes([
      { id: 1, parent: null, area: 5 },
      { id: 2, parent: null, area: 50 },
      { id: 3, parent: null, area: 20 },
    ], 2)
    expect(new Set(r.keys())).toEqual(new Set([2, 3]))
  })

  it("draws layer 0 before any layer 1 shape, even a larger one", () => {
    const r = selectShapes([
      { id: 1, parent: null, area: 10 },
      { id: 2, parent: 1, area: 9 },
      { id: 3, parent: null, area: 1 },
    ], 2)
    expect(new Set(r.keys())).toEqual(new Set([1, 3]))
  })

  it("skips a child whose parent was not drawn", () => {
    const r = selectShapes([
      { id: 1, parent: null, area: 1 },
      { id: 2, parent: 1, area: 1 },
      { id: 3, parent: null, area: 100 },
    ], 1)
    expect([...r.keys()]).toEqual([3])
  })

  it("never draws a third nesting level", () => {
    const r = selectShapes([
      { id: 1, parent: null, area: 100 },
      { id: 2, parent: 1, area: 50 },
      { id: 3, parent: 2, area: 10 },
    ], 32)
    expect(new Set(r.keys())).toEqual(new Set([1, 2]))
  })

  it("skips a child whose parent is not a candidate (clipped or hidden glass still paints its CSS over the canvas)", () => {
    const r = selectShapes([{ id: 2, parent: 9, area: 1 }, { id: 3, parent: null, area: 1 }], 32)
    expect([...r]).toEqual([[3, 0]])
  })
})
