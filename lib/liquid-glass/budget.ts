/* Chooses which glass shapes the shader draws this frame. The shader has a fixed number of
   slots and two layers, so: layer 0 first, larger shapes first, a child only if its parent is
   drawn, and nothing deeper than one level of nesting. Undrawn shapes keep their CSS glass. */

export interface ShapeCandidate { id: number; parent: number | null; area: number }

export function selectShapes(cands: ShapeCandidate[], max: number): Map<number, 0 | 1> {
  const byId = new Map(cands.map(c => [c.id, c]))
  // Depth below the nearest drawn root. A glass ancestor that is not a candidate (clipped,
  // hidden, blocked) keeps its CSS glass and paints over the canvas, so its subtree is out.
  const depth = (c: ShapeCandidate) => {
    let d = 0
    for (let p = c.parent; p !== null; p = byId.get(p)!.parent) {
      if (!byId.has(p)) return Infinity
      d++
    }
    return d
  }
  const ordered = cands
    .map(c => ({ c, d: depth(c) }))
    .filter(x => x.d <= 1)
    .sort((a, b) => a.d - b.d || b.c.area - a.c.area)
  const out = new Map<number, 0 | 1>()
  for (const { c, d } of ordered) {
    if (out.size >= max) break
    if (d === 1 && !out.has(c.parent!)) continue
    out.set(c.id, d as 0 | 1)
  }
  return out
}
