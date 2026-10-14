# Desktop site redesign — design

Date: 2026-10-14
Status: approved in conversation, pending spec review
Builds on: `2026-10-14-liquid-glass-components-design.md` (liquid glass components + WebGL engine)

## Goal

Redesign the whole Glass UI website so it reads as a component library whose glass truly refracts: an animated macOS/iOS-style wallpaper behind everything, and a macOS desktop metaphor (menu bar, dock, windows, widgets) built from the library's own components.

## Decisions (from the user)

1. **Wallpaper:** generated, animated macOS/iOS-style artwork (not photos), with a picker of presets.
2. **Direction:** A — macOS desktop. Home is a desktop of widgets; navigation via menu bar and dock.
3. **Inner pages:** C — System Settings layout: glass sidebar + live preview stage resting on the wallpaper + code/props panel.
4. **Wallpaper renderer:** Canvas 2D, animated, fed to the existing engine as a live backdrop.

## Constraint that shapes the layout

WebGL glass renders on a canvas behind the whole page, so it is only visible where no DOM paints over the wallpaper (see the engine's occlusion rule). Therefore:

- Windows and widgets **tile; they never overlap** each other.
- On desktop-size screens (≥ 1024px wide, ≥ 640px tall) the **document does not scroll**: the menu bar and dock are fixed, and content scrolls inside windows. Nothing slides under the menu bar or dock, so both are WebGL glass.
- On smaller screens the layout stacks and the document scrolls; the menu bar and dock use `webgl={false}` (CSS glass).
- Preview stages have **no background of their own**, so previewed components rest on the wallpaper and get real refraction.

## 1. Wallpaper system — `lib/wallpapers/`

- `presets.ts` — four presets, each with `light` and `dark` palettes and shape parameters:
  - **Sonoma**: warm flowing ribbons (orange, violet, amber) over deep indigo / dawn pink in light.
  - **Aurora**: iOS-style conic colour field (cyan → violet → magenta → amber).
  - **Tahoe**: sky and water blues with soft white highlights.
  - **Graphite**: low-contrast greys with a faint accent band, for reading.
- `render.ts` — `paintWallpaper(ctx, preset, theme, t, width, height)`: pure drawing function (ribbons as filled bezier bands, blobs as blurred radial gradients, subtle noise grain). `t` is time in seconds; motion is slow (full loop ≥ 60 s).
- `use-wallpaper.tsx` — React hook/component `<Wallpaper />` replacing `GridBackground`:
  - Owns an offscreen canvas at half the viewport resolution; draws at ~30 fps via rAF with frame skipping.
  - Registers the canvas with `useLiquidBackdrop(canvas, { base: true, live: true })`.
  - Pauses when `document.visibilityState === "hidden"`; draws a single static frame under `prefers-reduced-motion` or reduced transparency.
  - Also renders a DOM fallback (`data-glass-backdrop`, CSS gradient approximating the preset) for no-WebGL; the provider hides it once the canvas shows the backdrop.
- Selected preset persisted in `localStorage` (`glass-ui:wallpaper`, try/catch, default **Sonoma**) and exposed through a small context: `useWallpaper(): { preset, setPreset, presets }`.
- **Engine change:** live sources re-upload only when the source signals a new frame. `LiquidGlass.setSource(src, { live })` keeps working; add `markSourceDirty()`, which `<Wallpaper />` calls after each paint; with `live: "manual"` the engine uploads only on those calls. This keeps upload + CPU blur at ~30 fps, not 60.

## 2. App shell — `components/shell/`

- `menu-bar.tsx` — top bar: logo, menus (Docs, Components, Blocks, Themes) using `DropdownMenu`, wallpaper picker (dropdown with preset swatches), theme toggle, GitHub stars badge, ⌘K button. Liquid `bar` role.
- `dock.tsx` — bottom-centre dock: Home, Components, Blocks, Themes, Liquid demo. Icons are liquid `control` buttons; hover magnification (CSS `scale` on hover neighbours); active route dot. Tooltips on hover.
- `command-menu.tsx` — ⌘K / Ctrl-K dialog using our `Command` component: groups Components, Docs, Blocks, Wallpapers, Actions (toggle theme, switch material default). Opening/closing via keyboard and the menu bar button.
- `app-frame.tsx` — the non-scrolling desktop frame for ≥ lg screens: `h-dvh overflow-hidden` with menu bar, a content area between bar and dock, and the dock. Below lg: normal flow, CSS glass for bar and dock (`webgl={false}`), dock becomes a bottom tab bar.
- `app/layout.tsx` uses `<LiquidGlassProvider>` + `<WallpaperProvider>` + `<Wallpaper />` + `<AppFrame>`; the old `Header`, `Footer`, `GridBackground`, `canvas-background*`, `gradient-background` are deleted (footer content moves to an About widget and the Settings sidebar foot).

## 3. Pages

### Home `/` — desktop
- Left column (on the wallpaper, no panel): headline "Liquid glass, for the web.", sub-copy, Get started / Browse components buttons, install command chip with copy.
- Right: a tiled widget grid (CSS grid, fixed gaps, no overlap), each widget a liquid `Card`:
  - **Control Center** — Wi-Fi / Bluetooth / Focus `Switch`es, brightness + volume `Slider`s.
  - **Now Playing** — title, artist, scrubber `Slider`, transport `Button`s (icon, clear material).
  - **Weather** — temperature, condition, hourly row.
  - **Calendar** — `Calendar` month view.
  - **Messages** — chat bubbles + `Input` + send `Button`.
  - **Materials** — `Tabs` regular / clear / tinted that switch the material of all widgets live (state in a small context).
  - **About** — one-line pitch, component count, GitHub link (replaces the footer).
- Widgets are interactive (local state only).

### Settings layout — `/components`, `/docs/*`
- Shared layout `app/(settings)/layout.tsx` (route group). It is a row of tiles, not one window, so the preview can rest on bare wallpaper:
  - **Sidebar window** (left, ~260px, full height, scrolls): search `Input` filtering the list; sections Getting started, Customization, then components grouped by category (Inputs, Overlays, Navigation, Data display, Feedback, Layout); active item highlighted (tinted pill).
  - **Detail column** (right, scrolls as a whole) holding the page content.
- `/components`: detail column is a grid of small glass tiles, one per component, each with a live mini-demo (layer 1 on its tile) and a caption; tiles link to the component's docs.
- `/docs/components/[name]`, top to bottom in the detail column:
  - **Header window**: name, description, category badge, Storybook link, material switcher `Tabs` (regular / clear / tinted).
  - **Preview stage**: no window and no background — the demo renders directly on the wallpaper, so it gets layer-0 refraction. Minimum height 320px, content centred.
  - **Code window**: Code / Props / Install tabs, using the existing `CodeBlock` and `InstallationInstructions`.
- `/docs/getting-started` (and `/docs` redirect): prose in one window in the detail column. The customization section becomes its own page `/docs/customization`.
- Below lg the sidebar becomes the list view described under Mobile.

### Blocks — `/blocks`, `/blocks/[block]`
- `/blocks`: Mission Control — a grid of window tiles on the wallpaper, each showing a scaled live block with a caption below.
- `/blocks/[block]`: the block rendered full-size on the wallpaper (left) and a code window (right), side by side.

### Themes — `/themes`
- Appearance pane in the Settings window: wallpaper preset picker (large swatches), light/dark, accent colour, glass variables (wash, blur, rim) with live preview card, CSS export (existing generator).

### `/liquid`
- Kept as the photo showcase; renders inside the shell content area (its photo backdrop overrides the wallpaper while mounted).

### Mobile (< lg)
- Home: widgets stack in one column above the hero copy; document scrolls.
- Dock → bottom tab bar (CSS glass). Menu bar → logo + menu button (sheet with nav, wallpaper, theme).
- Settings window → list view; selecting an item navigates to its page with a back button.

## 4. Component demos — `components/demos/`

- One file per component exporting `{ Demo, code }` (e.g. `components/demos/button.tsx`). Demos accept a `material` prop.
- `components/demos/registry.ts`: `DEMOS: Record<ComponentName, { title, category, description, load }>` where `load` lazy-imports the demo module. Category list fixed: Inputs, Overlays, Navigation, Data display, Feedback, Layout.
- Replaces `components/component-preview.tsx` and `lib/component-examples.ts` (deleted).
- `lib/registry.ts` keeps reading `registry.json` for install metadata.

## Performance

- Wallpaper: half resolution, ≤ 30 fps, paused when hidden; engine uploads only on wallpaper frames.
- Target: home desktop sustains ~60 fps on a recent laptop (Chrome performance panel, 5 s recording, no long tasks > 50 ms from the wallpaper loop).
- Demos lazy-loaded per page.

## Error handling / fallbacks

- No WebGL → no `lg-on`/`lg-ready`; DOM wallpaper fallback + CSS glass; everything readable.
- Reduced transparency → solid panes, static wallpaper.
- Reduced motion → static wallpaper frame, no dock magnification, no press squash.
- localStorage unavailable → default preset each visit.

## Testing

- Unit (vitest): `presets` (every preset has light + dark palettes with valid colours), `paintWallpaper` determinism (same inputs → same draw calls on a recording 2D context stub), demo registry (every `registry.json` component has a demo + category; no orphan demos), command-menu search (matches by name, category, keyword).
- Gates: `tsc`, `pnpm test`, `pnpm build`, `pnpm build-storybook`.
- Visual pass in visible Chrome: every route, light/dark, all four wallpapers, 1440×900 and 390×844; confirm live WebGL counts and no invisible elements; performance recording on home.

## Out of scope

- New components or changes to component APIs.
- New blocks.
- Changes to the registry install format.
