# Changelog

## 1.0.0 — 2026-10-14

### Liquid glass
- New WebGL liquid glass engine: refraction, chromatic dispersion, frost and a light-tracking rim, drawn under any element that rests on the page backdrop (`LiquidGlassProvider`).
- Every component now uses one liquid material with `material` (`regular` | `clear` | `tinted`), `tint`, `glass={{ tint, frost }}` and `webgl` props, and a matching CSS look when WebGL is unavailable or the user prefers reduced transparency.
- **Breaking:** the old glass variants (`glass`, `glassSubtle`, `glassSolid`, `frosted`, `fluted`, `crystal`) and the old `glass={{ color, blur, … }}` customization are removed. `variant` is now `liquid` (default) or the component's plain variants. `ScrollArea`, `Separator`, `Skeleton` and `Spinner` no longer take `variant`.
- Registry items now ship their base component and `lib/liquid-glass/material.ts`; internal dependencies use the `@glass-ui/` namespace.

### Website
- Redesigned as a macOS-style desktop over animated generated wallpapers (Sonoma, Aurora, Tahoe, Graphite): menu bar, dock and ⌘K command menu.
- System-Settings layout for components and docs, with live previews resting on the wallpaper and a material switcher.
- Mission Control blocks gallery, Appearance pane with wallpaper picker, and a Customization guide.
- Hosted on GitHub Pages at glass-ui.crenspire.com (static export), replacing Vercel.

### Fixes
- Calendar class names updated for react-day-picker v9.
