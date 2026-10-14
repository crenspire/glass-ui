# Glass UI

A liquid glass component library inspired by Apple's design language, built with Next.js 16, React 19 and the shadcn registry. Glass that rests on the page's backdrop is drawn by a WebGL shader with real refraction; everything else gets a matching CSS liquid look.

**Live site:** [glass-ui.crenspire.com](https://glass-ui.crenspire.com)

![Glass UI](https://img.shields.io/badge/Glass%20UI-v1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![React](https://img.shields.io/badge/React-19.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)

## ✨ Features

- **49 Liquid Glass Components** - Buttons, cards, dialogs, menus, sliders, tabs and more, all on one glass material
- **Real Refraction** - Inside `LiquidGlassProvider`, glass is drawn by a WebGL shader: refraction, chromatic dispersion and a light-tracking rim
- **Three Materials** - `regular`, `clear` and `tinted`, plus a `tint` colour and per-instance `glass={{ tint, frost }}`
- **Graceful Fallback** - Without WebGL, or with reduced transparency, every component keeps a CSS liquid look
- **Theme Support** - Built-in light/dark mode with automatic theme switching
- **Package Manager Support** - Install with pnpm, yarn, npm, or bun
- **TypeScript** - Fully typed components for better developer experience
- **Accessible** - Built on Radix UI primitives for accessibility
- **Tailwind CSS** - Utility-first styling with CSS variables

## 🚀 Quick Start

### Installation

Install components using the shadcn CLI with your preferred package manager:

**pnpm:**
```bash
pnpm dlx shadcn@latest add @glass-ui/button
```

**yarn:**
```bash
yarn dlx shadcn@latest add @glass-ui/button
```

**npm:**
```bash
npx shadcn@latest add @glass-ui/button
```

**bun:**
```bash
bunx shadcn@latest add @glass-ui/button
```

### Usage

After installation, import and use components in your project:

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Example() {
  return (
    <div>
      <Button effect="glow">
        Click me
      </Button>
      <Card material="clear" gradient animated>
        <CardHeader>
          <CardTitle>Beautiful Card</CardTitle>
        </CardHeader>
        <CardContent>Your content here</CardContent>
      </Card>
    </div>
  )
}
```

> **Note:** The import path depends on your project's component directory configuration. By default, shadcn CLI installs components to `@/components/ui/`.

## 📚 Documentation

Visit the [full documentation](https://glass-ui.crenspire.com) for:
- Complete component reference
- Installation guides
- Customization examples
- Theme configuration
- Glass effect customization

## 🎨 Interactive Playground

Explore and test components interactively with Storybook:

```bash
# Start Storybook
pnpm storybook

# Build Storybook (static)
pnpm build-storybook
```

Storybook provides:
- ✨ Live component previews
- 🎛️ Interactive controls for all props
- 📖 Auto-generated documentation
- ♿ Accessibility testing
- 🌓 Theme switching
- 📱 Responsive viewport testing

Visit `http://localhost:6006` after starting Storybook.

## 🏗️ Architecture

- **Base components** (`components/ui/`) — shadcn-style components with the liquid material: `variant="liquid"` (default) or `"default"`, plus `material`, `tint`, `glass` and `webgl` props.
- **Glass UI components** (`components/ui/glass/`) — the components you install; they wrap the base components and add effects such as glow, shimmer and ripple.
- **Liquid glass engine** (`lib/liquid-glass/`, `components/ui/liquid/`) — the WebGL renderer, `LiquidGlassProvider`, and the `material.ts` helper every component uses.

## 🎨 Customization

### Materials

```tsx
<Card>Regular liquid glass (default)</Card>
<Card material="clear">Clear glass</Card>
<Button material="tinted" tint="#3b82f6">Tinted glass</Button>
<Card glass={{ tint: "rgba(139, 92, 246, 0.6)", frost: 0.5 }}>Custom tint and frost</Card>
```

### Global CSS Variables

```css
:root {
  --lg-rim-hi: rgba(255, 255, 255, 0.8);
  --lg-rim-lo: rgba(255, 255, 255, 0.18);
  --lg-highlight: rgba(255, 255, 255, 0.6);
  --lg-drop: rgba(15, 23, 42, 0.14);
}
.lg-regular { --lg-base: rgba(255, 255, 255, 0.42); --lg-blur: 16px; }
```

See [components/ui/glass/GLASS_CUSTOMIZATION.md](components/ui/glass/GLASS_CUSTOMIZATION.md) for the full reference.

### Liquid Glass (WebGL)

Wrap your app in `LiquidGlassProvider` and glass resting on the backdrop is drawn with real refraction,
dispersion and a light-tracking rim. Everything else keeps the CSS look, as does the whole app when WebGL is
unavailable or the user prefers reduced transparency. See [components/ui/liquid/README.md](components/ui/liquid/README.md).

## 📦 Available Components

### Form Components
- Button, Input, Textarea, Label
- Checkbox, Switch, Radio Group
- Select, Input OTP

### Display Components
- Card, Badge, Avatar, Alert
- Skeleton, Separator, Table

### Overlay Components
- Dialog, Alert Dialog, Popover
- Tooltip, Hover Card, Sheet
- Drawer, Sidebar

### Navigation Components
- Tabs, Accordion, Breadcrumb
- Dropdown Menu, Navigation Menu
- Pagination, Scroll Area

### Data Display
- Calendar, Chart, Command
- Slider, Toggle, Toggle Group

And more! See the [full component list](https://glass-ui.crenspire.com/components).

## 🛠️ Development

### Prerequisites

- Node.js 20+ (CI uses 22)
- pnpm 10

### Setup

```bash
git clone https://github.com/crenspire/glass-ui.git
cd glass-ui
pnpm install

pnpm dev               # documentation site on http://localhost:3000
pnpm storybook         # Storybook on http://localhost:6006
pnpm test              # unit tests (vitest)
pnpm registry:build    # rebuild public/r/*.json from registry.json
```

Running `pnpm build` while `pnpm dev` is running overwrites the dev server's output; restart `pnpm dev` afterwards.

### Project Structure

```
glass-ui/
├── app/                     # Documentation site (Next.js app router, static export)
│   ├── (settings)/          # Components, docs and themes pages
│   └── blocks/              # Blocks gallery
├── components/
│   ├── ui/                  # Base components (liquid material)
│   ├── ui/glass/            # Glass UI components (what users install)
│   ├── ui/liquid/           # LiquidGlassProvider and lens filter
│   ├── demos/               # One live demo + code snippet per component
│   ├── shell/ desktop/ settings/   # Site chrome: menu bar, dock, widgets, settings layout
│   └── blocks/              # Page-level blocks
├── lib/
│   ├── liquid-glass/        # WebGL engine and material helper
│   └── wallpapers/          # Generated, animated wallpapers
├── stories/                 # Storybook stories
├── public/r/                # Built registry served to `shadcn add`
└── registry.json            # Component registry
```

## 🚀 Deployment

The site is a static export hosted on **GitHub Pages** at [glass-ui.crenspire.com](https://glass-ui.crenspire.com).

- `.github/workflows/deploy-pages.yml` runs on every `v*` tag (and manually from the Actions tab). It tests, builds Storybook into `public/storybook`, runs `next build` (which writes `out/`) and publishes `out/` to Pages.
- `public/CNAME` keeps the custom domain; DNS has a `CNAME` record `glass-ui` → `crenspire.github.io`.
- The registry (`/r/*.json`) and Storybook (`/storybook`) are served from the same site, so `pnpm dlx shadcn@latest add @glass-ui/<component>` keeps working.

To release:

```bash
git checkout -b release/x.y.z develop
# bump "version" in package.json, update CHANGELOG.md
git tag -a vx.y.z -m "Glass UI x.y.z"
git push origin release/x.y.z vx.y.z   # the tag triggers the Pages deploy
```

Preview the production build locally:

```bash
pnpm build-storybook && pnpm export-storybook && pnpm build
pnpm start            # serves out/ on http://localhost:3000
```

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [Documentation](https://glass-ui.crenspire.com)
- [GitHub Repository](https://github.com/crenspire/glass-ui)
- [Issue Tracker](https://github.com/crenspire/glass-ui/issues)

## 🙏 Acknowledgments

- Built with [shadcn/ui](https://ui.shadcn.com)
- Powered by [Radix UI](https://www.radix-ui.com)
- Inspired by Apple's design language

---

Made with ❤️ by [Crenspire Technologies](https://crenspire.com)
