/* WebGL glass is drawn on a canvas behind the whole page, so it is only visible where nothing in
   the DOM paints over it. An element whose ancestor has a background or a backdrop filter must
   keep its CSS glass instead. */

export interface PaintStyle { backgroundColor: string; backgroundImage: string; backdropFilter: string }

const MIN_ALPHA = 0.05

function alpha(color: string) {
  if (!color || color === "transparent") return 0
  const slash = color.match(/\/\s*([\d.]+)(%?)\s*\)$/)
  if (slash) return parseFloat(slash[1]) / (slash[2] ? 100 : 1)
  const rgba = color.match(/^rgba\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\s*\)$/)
  if (rgba) return parseFloat(rgba[1])
  return 1
}

export function paintsOverBackdrop(s: PaintStyle) {
  return (s.backdropFilter !== "" && s.backdropFilter !== "none")
    || (s.backgroundImage !== "" && s.backgroundImage !== "none")
    || alpha(s.backgroundColor) > MIN_ALPHA
}

/** Opacity as rendered: the element's own times every ancestor's (fades on a parent fade the glass too). */
export function effectiveOpacity(el: Element) {
  let o = 1
  for (let p: Element | null = el; p && p !== document.body && o > 0; p = p.parentElement) {
    const v = parseFloat(getComputedStyle(p).opacity)
    if (!Number.isNaN(v)) o *= v
  }
  return o
}

type Box = Pick<DOMRect, "left" | "top" | "right" | "bottom">

/** True when an element's overflow cuts off its descendants (a scroll container or overflow-hidden box). */
export function clipsContent(s: Pick<CSSStyleDeclaration, "overflowX" | "overflowY">) {
  return (s.overflowX !== "" && s.overflowX !== "visible") || (s.overflowY !== "" && s.overflowY !== "visible")
}

/** Shader glass ignores DOM clipping, so only draw an element that is wholly inside every clip. */
export function insideClips(r: Box, clips: Box[], tolerance = 1) {
  return clips.every(c =>
    r.left >= c.left - tolerance && r.top >= c.top - tolerance && r.right <= c.right + tolerance && r.bottom <= c.bottom + tolerance)
}
