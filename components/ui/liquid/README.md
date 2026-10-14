# Liquid Glass

WebGL refractive glass, close to Apple's Liquid Glass. A single full-screen canvas sits behind the app and draws refracting, frosted glass under every `data-glass` element. Live demo: `/liquid`.

```
lib/liquid-glass/engine.ts                       WebGL engine
components/ui/liquid/liquid-glass-provider.tsx   <LiquidGlassProvider> + useLiquidGlass()
components/ui/liquid/index.tsx                   Button, Bar, Card, Search, Switch, Slider, Tabs, Dialog
```

## Install

```bash
pnpm dlx shadcn@latest add @glass-ui/liquid-glass
```

No stylesheet changes are needed: the provider ships the few CSS rules it relies on.

## 1. Wrap a page (or the whole app) in the provider

```tsx
<LiquidGlassProvider backdrop="/page.jpg" options={{ refraction: 28, dispersion: 0.1, frost: 14 }}>
  {children}
</LiquidGlassProvider>
```

- `backdrop` is what the glass refracts. It can be an image URL, or an `<img>`, `<video>` or `<canvas>` (pass `live` for animated canvases). Cross-origin images need CORS headers.
- The provider picks up every `data-glass` element in the document, Radix portals included.
- Light and dark follow `next-themes` automatically.
- Memoize `options`; a new object on every render re-applies them every render.

## 2. Use the components, or opt existing ones in

```tsx
import { LiquidButton, LiquidSwitch, LiquidSlider, LiquidCard } from "@/components/ui/liquid"
```

Any element can become liquid glass with a single attribute:

```tsx
<Button data-glass="button" className="rounded-full" />   // capsule/circle buttons
<div data-glass="bar" />      // toolbars, docks, tab bars
<Card data-glass="card" />    // panels
<div data-glass="sheet" />    // modals; merges with nearby `data-merge="1"` shapes
```

Optional attributes: `data-layer="1"` (glass on top of glass), `data-tint`, `data-frost` (0–1), `data-grow`, `data-squash`, `data-merge`.

`data-glass-solid` paints an element's background colour and radius into the scene so the glass can refract it (slider and switch tracks, selection indicators). The DOM node itself is hidden with `opacity: 0`, so use it on a dedicated, `aria-hidden` element: never on one that holds text, a focus ring or other children.

## Fallback

Every liquid component keeps the `glass-bg` classes. The shader takes over only when WebGL starts: `<html>` then gets `.lg-on`, which switches the CSS glass off. Without WebGL, or with `prefers-reduced-transparency`, the CSS glass stays. `prefers-reduced-motion` turns off squash and stretch. Outside a provider the components render as regular glass UI.

## Limits

- The glass only refracts the backdrop source. Live DOM behind a glass element (scrolling text, for example) isn't bent, so keep glass over the backdrop or draw dynamic content into a canvas.
- Each frame draws up to 20 glass shapes and 8 solids. Off-screen elements are skipped, so long pages are fine.
- Dialog overlays are transparent on purpose. A dark DOM overlay would dim the dialog's own glass.
