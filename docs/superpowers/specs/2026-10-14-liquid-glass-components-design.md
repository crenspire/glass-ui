# Liquid Glass across all components — design

Date: 2026-10-14
Status: approved in conversation, pending spec review

## Goal

Redesign every existing Glass UI component in the liquid-glass language introduced by the WebGL engine (`lib/liquid-glass/engine.ts`), close to Apple's Liquid Glass. The library and the website should both adopt it. The look must work everywhere (CSS), and upgrade to real refraction (WebGL) where the engine can render it correctly.

## Decisions (from the user)

1. **Hybrid rendering.** CSS/SVG liquid look on every component; inside a `LiquidGlassProvider`, eligible surfaces upgrade to WebGL refraction. Overlays stay CSS.
2. **Replace all glass variants.** `glass`, `glassSubtle`, `glassSolid`, `frosted`, `fluted`, `crystal` are removed and replaced by a `material` prop: `regular | clear | tinted`. Breaking change, accepted.
3. **Site-wide provider.** The root layout hosts the provider; the existing gradient + blob wallpaper is rendered to a canvas and used as the backdrop.

## Architecture

### Material API — `lib/liquid-glass/material.ts`

```ts
type Material = "regular" | "clear" | "tinted"
type Role = "surface" | "sheet" | "bar" | "control" | "knob" | "inline" | "overlay"

interface LiquidProps {
  material?: Material          // default "regular"
  tint?: string                // any CSS colour; used by "tinted", optional on others
  glass?: { tint?: string; frost?: number } // per-instance override (refraction stays global: it is a shader uniform)
}

liquidGlass({ material, role, tint, glass }): {
  className: string            // e.g. "lg lg-regular lg-surface"
  style: React.CSSProperties   // --lg-tint, --lg-frost, ...
  dataAttrs: Record<string, string> // data-glass, data-tint, data-frost (none for overlay)
}
```

- `regular`: frosted, adaptive tint (light: white wash, dark: near-black wash).
- `clear`: minimal frost, strongest refraction, thin wash.
- `tinted`: wash coloured by `tint` (default `var(--primary)`).
- Role → WebGL preset: `surface`→`card`, `sheet`→`sheet` (dialogs, sheets, drawers), `bar`→`bar`, `control`→`button`, `knob`→`knob`, `inline`/`overlay`→ none (CSS only). `inline` is for small, numerous items (checkbox, radio, badge, OTP slot, avatar fallback, active pagination link) that would exhaust the shape budget.
- Material → WebGL params: `regular` frost 1/tint 0.2, `clear` frost 0.1/tint 0, `tinted` frost 0.6 + tint colour.

On every glass-capable component, the glass variant names are replaced by a single `"liquid"` value, which becomes the default; existing non-glass variants (`default`, `destructive`, `outline`, `secondary`, `ghost`, `link`) are kept. Only `variant="liquid"` applies `liquidGlass()`; other variants ignore `material`. ScrollArea, Separator, Skeleton and Spinner drop `variant` (their glass variants were cosmetic or unused). During migration the old names stay accepted as deprecated aliases (`glass`/`glassSubtle`/`frosted` → liquid regular, `crystal`/`fluted` → liquid clear, `glassSolid` → liquid tinted) so the build stays green; the final cleanup removes them after the codemod.

### CSS layer — `app/globals.css`

One `@layer components` block defining:

- `.lg` base: `background: var(--lg-wash)`, `backdrop-filter: blur(var(--lg-blur)) saturate(var(--lg-sat))`, specular rim via `::before` with a masked `linear-gradient` border (bright top-left, dim bottom-right), inner top highlight via inset shadow, soft drop shadow.
- `.lg-regular`, `.lg-clear`, `.lg-tinted`: set `--lg-wash`, `--lg-blur`, `--lg-sat`; light/dark values.
- `.lg-surface` (radius 24–32px), `.lg-bar` (capsule), `.lg-control` (capsule), `.lg-overlay` (radius 20px, stronger frost for legibility over content).
- Edge lensing: an inline SVG filter (`#lg-lens`, `feTurbulence`-free displacement map from a radial gradient) defined once by a tiny `<LiquidFilters />` component (a hidden inline `<svg>`), exported from `material.ts`'s sibling `components/ui/liquid/liquid-filters.tsx` and rendered by the provider; apps that skip the provider render it themselves in their root layout; applied as `backdrop-filter: url(#lg-lens) blur(...)` behind `@supports` for Chromium only.
- Press: `.lg-control:active` squash (`scale: 0.97 1.03` spring via `transition-timing-function: cubic-bezier(.34,1.56,.64,1)`); disabled under `prefers-reduced-motion`.
- `prefers-reduced-transparency`: wash alpha → ~0.9, no lensing.
- WebGL hand-off: `html.lg-on [data-glass-live]` strips wash, blur, rim and shadow (replaces the current `[data-glass]` rule in the provider).

Old classes `.glass-bg`, `.glass-frosted`, `.glass-fluted`, `.glass-crystal` and the `--glass-*` tokens are removed once nothing references them. Calendar (`.rdp`) overrides move to `.lg`.

### Engine changes — `lib/liquid-glass/engine.ts`

1. **`data-glass-live`.** Each frame, set `data-glass-live` on elements actually drawn and remove it from those skipped (over cap, off-screen, hidden). Only toggled on change, to avoid attribute churn and MutationObserver loops (the provider's observer must ignore this attribute).
2. **Priority cap.** `MAXG` 20 → 32. When more candidates are visible than the cap, keep the largest on-screen area first; layer-0 parents before their children.
3. **Auto-layering.** If an element has a `data-glass` ancestor that is drawn, it is drawn on layer 1. A third level (grand-child glass) is not drawn → stays CSS (no `data-glass-live`).
4. `MAXS` stays 8; solids beyond the cap are not hidden (opacity is only forced to 0 while drawn — same live-flag treatment).

### Provider & site

- `LiquidGlassProvider` moves into `app/layout.tsx`, wrapping header, main and footer.
- `GridBackground` gains a canvas renderer: draws the same gradient + blobs into an offscreen `<canvas>` sized to the viewport, redrawn on theme change and resize, passed as `backdrop` (not `live`; `invalidate()` after redraw). The DOM gradient stays as the no-WebGL fallback.
- There is one engine per page. `/liquid` keeps its photo backdrop by calling a new `useLiquidBackdrop(src)` hook from the provider context, which swaps the backdrop while the page is mounted and restores the site backdrop on unmount.
- `components/ui/liquid/index.tsx` (`LiquidButton` etc.) is deleted; `/liquid` is rebuilt with the regular components.

## Component mapping

| Role | WebGL | Components |
|---|---|---|
| surface | yes | Card, Alert, EmptyState, Sidebar, Table, Calendar, ChartContainer, Carousel (root; its nav buttons are liquid Buttons) |
| sheet | yes | DialogContent, AlertDialogContent, SheetContent, DrawerContent |
| bar | yes | Tabs list, Menubar, NavigationMenu (list), ButtonGroup, ToggleGroup, Pagination, Breadcrumb, InputGroup |
| control | yes | Button, Toggle, Input, Textarea, SelectTrigger, DatePickerInput (via Button), ModeToggle (via Button) |
| knob | yes | Switch, Slider (painted track as `data-glass-solid` on a dedicated `aria-hidden` span, glass knob) |
| inline | no | Checkbox, RadioGroupItem, Badge, InputOTPSlot, AvatarFallback, PaginationLink (active) |
| overlay | no | PopoverContent, DropdownMenu(Sub)Content, ContextMenu(Sub)Content, SelectContent, HoverCardContent, TooltipContent, Command, ChartTooltipContent, NavigationMenuContent/Viewport, Sonner toasts |
| none | – | Label, Collapsible, Separator, Skeleton, Spinner, ScrollArea, Cropper, ChartLegendContent (token updates only); AccordionTrigger gets a soft hover wash, not a glass shape |

Shape/spacing: controls become capsules (heights sm 36 / default 44 / lg 52); surfaces 24–32px radius. `components/ui/glass/*` wrappers keep `effect`, default changes from `glow` to `none`; `glow` is restyled as a soft white rim bloom instead of purple.

## Migration

1. Groundwork: `material.ts`, CSS layer, `<LiquidFilters />`, engine changes, provider CSS update.
2. Convert components by role, in this order: control, surface, bar, knob, overlay (base + `glass/*` wrapper together). `tsc` + `next build` after each role.
3. Codemod usages in `app/`, `stories/`, `lib/component-examples.ts`, blocks, and docs code snippets:
   - `variant="glass" | "frosted" | "glassSubtle"` → prop removed (defaults to `liquid`)
   - `variant="crystal" | "fluted"` → `material="clear"`
   - `variant="glassSolid"` → `material="tinted"`
4. Site: provider in root layout, canvas `GridBackground`, `/liquid` rebuilt.
5. Remove dead CSS/tokens; rebuild registry. Today each item ships only the `glass/` wrapper and resolves the base component from stock shadcn (`registryDependencies: ["<name>"]`), which has no glass variants — so installs lose the look. Each item now ships its base `components/ui/<name>.tsx` and `lib/liquid-glass/material.ts` instead of `lib/glass-utils.ts`; `liquid-glass` item becomes provider + engine + filters. READMEs (`components/ui/glass/README.md`, `GLASS_CUSTOMIZATION.md`, `components/ui/liquid/README.md`, root `README.md`) updated for the `material` API.

## Error handling / fallbacks

- No WebGL, or reduced transparency → no `lg-on`; CSS look everywhere.
- Over the shape cap / third nesting level → element keeps its CSS look (no `data-glass-live`).
- Backdrop not ready (image loading, CORS) → engine not `ready`, no `data-glass-live` set → CSS look.
- Firefox/Safari → no SVG lensing in `backdrop-filter`; rest of CSS look intact.

## Testing

- `tsc --noEmit` and `pnpm build` after each migration step.
- Visual pass in Chrome, light and dark: `/`, `/components`, `/docs/components/<each>`, `/blocks`, `/blocks/<one>`, `/liquid`. Check: no invisible elements, overlays legible over content, nested glass (button in card) on layer 1, dialogs open/close, switches/sliders paint tracks.
- Fallback pass: WebGL disabled (provider sees `failed`), emulated `prefers-reduced-transparency` and `prefers-reduced-motion`.
- `pnpm build-storybook` succeeds.

## Out of scope

- Refracting live DOM content behind glass.
- Non-Next.js consumers of the provider.
- Restoring ESLint in this environment (broken `globals` package in `node_modules`).
