# Glass Customization

Every Glass UI component renders liquid glass by default. You choose how it looks with three props, and restyle the whole library through a handful of CSS variables.

## Materials

| Material | Look | When to use |
|---|---|---|
| `regular` (default) | Frosted, adaptive wash | Most surfaces and controls |
| `clear` | Barely frosted, the most refraction | Over rich imagery, media controls |
| `tinted` | Washed with a colour (the primary colour by default) | Emphasis, selected states, calls to action |

```tsx
<Card>Regular glass</Card>
<Card material="clear">Clear glass</Card>
<Button material="tinted">Primary colour tint</Button>
<Button material="tinted" tint="#3b82f6">Blue tint</Button>
```

## Per-instance override

`glass` overrides the tint colour and frost (0–1) of one component:

```tsx
<Card glass={{ tint: "rgba(139, 92, 246, 0.6)", frost: 0.5 }}>Violet, lightly frosted</Card>
```

`tint` alone adds a light colour wash to `regular` or `clear` glass:

```tsx
<Badge tint="oklch(0.7 0.2 150)">Online</Badge>
```

## Plain styling

Components that had a non-glass look keep it as `variant="default"` (and Button keeps `destructive`, `outline`, `secondary`, `ghost` and `link`). `variant="liquid"` is the default and the only variant that applies `material`.

## Global CSS variables

The CSS look lives in the `.lg` layer of `app/globals.css`. Override these to restyle every component:

```css
:root {
  --lg-rim-hi: rgba(255, 255, 255, 0.8);    /* bright edge of the rim */
  --lg-rim-lo: rgba(255, 255, 255, 0.18);   /* dim edge of the rim */
  --lg-highlight: rgba(255, 255, 255, 0.6); /* inner top highlight */
  --lg-drop: rgba(15, 23, 42, 0.14);        /* drop shadow */
}
.dark {
  --lg-rim-hi: rgba(255, 255, 255, 0.34);
  --lg-rim-lo: rgba(255, 255, 255, 0.06);
  --lg-highlight: rgba(255, 255, 255, 0.16);
  --lg-drop: rgba(0, 0, 0, 0.45);
}

/* Each material sets its wash, blur and saturation */
.lg-regular { --lg-base: rgba(255, 255, 255, 0.42); --lg-blur: 16px; --lg-sat: 180%; }
.dark .lg-regular { --lg-base: rgba(255, 255, 255, 0.07); }
```

The Themes page generates these variables for you.

## Roles

Each component gives its glass a role, which sets its shape and whether WebGL may draw it:

| Role | Shape | WebGL | Components |
|---|---|---|---|
| surface | 28px radius | yes | Card, Alert, EmptyState, Sidebar, Table, Calendar, ChartContainer, Carousel |
| sheet | 34px radius | opt-in (`webgl`) | Dialog, AlertDialog, Sheet, Drawer |
| bar | capsule | yes | TabsList, MenuBar, NavigationMenuList, ButtonGroup, ToggleGroup, Pagination, Breadcrumb, InputGroup |
| control | capsule | yes | Button, Toggle, Input, Textarea, SelectTrigger |
| knob | capsule | yes | Switch and Slider thumbs |
| inline | capsule | never | Checkbox, Radio, Badge, InputOTP slot, Avatar fallback |
| overlay | 20px radius | never | Popover, menus, Select content, HoverCard, Tooltip, Command, toasts |

## WebGL refraction

Inside a `LiquidGlassProvider` (see `components/ui/liquid/README.md`), glass that rests directly on the backdrop is drawn by a shader with real refraction. Pass `webgl={false}` to keep a component on the CSS look, for example when it floats over other content; a sheet can opt in with `webgl` when nothing else covers the backdrop.

## Accessibility

- `prefers-reduced-transparency`: the glass becomes near-opaque and WebGL is off.
- `prefers-reduced-motion`: no press squash or stretch.
- Text keeps `text-foreground` contrast in both themes; tinted glass uses `--primary-foreground`.
