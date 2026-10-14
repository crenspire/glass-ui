# Liquid Glass (WebGL)

Real refractive glass, close to Apple's Liquid Glass. One full-screen canvas sits behind the app; a WebGL shader draws refracting, frosted glass under Glass UI components that rest on the backdrop. The whole Glass UI site runs on it.

```
lib/liquid-glass/engine.ts                       WebGL engine
lib/liquid-glass/budget.ts                       Which shapes the shader draws each frame
lib/liquid-glass/occlusion.ts                    Which shapes the canvas can show
lib/liquid-glass/backdrop-stack.ts               Page-level backdrop overrides
lib/liquid-glass/material.ts                     material/role → classes + data-glass attributes
components/ui/liquid/liquid-glass-provider.tsx   <LiquidGlassProvider>, useLiquidGlass(), useLiquidBackdrop()
components/ui/liquid/liquid-filters.tsx          SVG lens filter for the CSS look
```

## Install

```bash
pnpm dlx shadcn@latest add @glass-ui/liquid-glass
```

No stylesheet changes are needed: the provider ships the few CSS rules it relies on. Components need no changes either: every Glass UI component already carries the `data-glass` attributes the engine picks up.

## 1. Wrap the app in the provider

```tsx
<LiquidGlassProvider backdrop="/wallpaper.jpg" options={{ refraction: 28, dispersion: 0.1, frost: 14 }}>
  {children}
</LiquidGlassProvider>
```

- `backdrop` is what the glass refracts: an image URL, or an `<img>`, `<video>` or `<canvas>` (pass `live` for animated canvases). Cross-origin images need CORS headers. It is optional; a child can supply it with `useLiquidBackdrop`.
- Light and dark follow `next-themes` automatically.
- Memoize `options`; a new object on every render re-applies them every render.

## 2. Swap the backdrop for one page

```tsx
function PhotoPage() {
  useLiquidBackdrop("/photo.jpg")   // restored when the page unmounts
  return <Card>…</Card>
}
```

## A DOM copy of the backdrop

If you also show the backdrop in the DOM (for example a `<canvas>` wallpaper, which is what you see when WebGL is unavailable), mark it `data-glass-backdrop`. It sits above the shader canvas, so the provider hides it once the canvas shows the backdrop (`html.lg-ready`). The Glass UI site does exactly this with its animated wallpaper (`components/wallpaper.tsx`): one canvas is both the shader's backdrop and the fallback.

## What gets WebGL glass

The shader draws behind the page, so it only shows where nothing else paints over the backdrop. The engine therefore draws an element only when:

- its role allows it (surfaces, bars, controls, knobs; sheets only with `webgl`; never overlays or inline items),
- no ancestor other than another drawn glass element has a background or backdrop filter,
- it is at most one level of glass-on-glass deep (deeper glass keeps the CSS look),
- it is wholly inside every scroll container that clips it (partly scrolled glass keeps its CSS look, which the DOM clips),
- it is among the 32 largest visible candidates.

Drawn elements get a `data-glass-live` attribute and drop their CSS glass; everything else keeps the CSS look, so nothing ever disappears. Use `webgl={false}` on a component that floats over other content (a sticky header, buttons over an image), and `webgl` on a sheet that sits directly over the backdrop.

Opt any plain element in with attributes: `data-glass="button" | "bar" | "card" | "sheet" | "knob"`, plus optional `data-layer="1"`, `data-tint`, `data-frost` (0–1), `data-grow`, `data-squash`, `data-merge`. `data-glass-solid` paints an element's background colour and radius into the scene (slider and switch tracks); it is hidden in the DOM while drawn, so use it on a dedicated `aria-hidden` element.

## Fallback

Without WebGL, or with `prefers-reduced-transparency`, the provider does nothing and every component keeps its CSS liquid look. `prefers-reduced-motion` turns off squash and stretch.

## Limits

- The glass refracts the backdrop source only, not live DOM behind it.
- Up to 32 glass shapes and 8 solids per frame; off-screen elements are skipped, so long pages are fine.
